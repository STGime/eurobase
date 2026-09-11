<script setup lang="ts">
// Sovereignty Check — landing page + picker UI.
//
// The picker computes a live client-side score for instant feedback
// (no round-trip while the user is toggling). On CTA click, POST
// the selection to the backend to persist + get a stable /r/{hash}
// permalink, then navigate there.

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  vendors,
  vendorsByCategory,
  ratingBadgeClass,
  type Vendor,
  type RatingColor,
} from '@/data/sovereignty'

const router = useRouter()
const groups = vendorsByCategory()

const selected = ref<Set<string>>(new Set())
const severity = ref<'' | 'health' | 'legal' | 'financial' | 'children'>('')
const submitting = ref(false)
const submitError = ref<string | null>(null)

function toggle(slug: string) {
  const next = new Set(selected.value)
  if (next.has(slug)) next.delete(slug)
  else next.add(slug)
  selected.value = next
}

function isPicked(slug: string): boolean {
  return selected.value.has(slug)
}

const picks = computed<Vendor[]>(() => vendors.filter((v) => selected.value.has(v.slug)))

// Client-side score preview — mirrors the backend's Score()
// function so the number the user sees while picking matches what
// the /r/{hash} page will show after submit. Severity promotion +
// worst-dimension-wins are both applied here.
const preview = computed(() => {
  const total = picks.value.length
  if (total === 0) {
    return { overall: 'green' as RatingColor, red: 0, amber: 0, green: 0, exposure: 0 }
  }
  const tighten = severity.value !== ''
  let red = 0
  let amber = 0
  let green = 0
  for (const v of picks.value) {
    let overall: RatingColor = v.ratings.overall
    if (tighten && overall === 'amber') overall = 'red'
    if (overall === 'red') red++
    else if (overall === 'amber') amber++
    else green++
  }
  const exposure = Math.round(((red + 0.5 * amber) / total) * 100)
  const overall: RatingColor = red > 0 ? 'red' : amber > 0 ? 'amber' : 'green'
  return { overall, red, amber, green, exposure }
})

async function submit() {
  if (picks.value.length === 0) return
  submitting.value = true
  submitError.value = null
  try {
    const resp = await fetch('https://api.eurobase.app/platform/public/sovereignty/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendor_slugs: picks.value.map((v) => v.slug),
        severity_modifier: severity.value || undefined,
      }),
    })
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({ error: 'network error' }))
      throw new Error(body.error || `HTTP ${resp.status}`)
    }
    const data = (await resp.json()) as { hash: string }
    if (!data.hash) throw new Error('missing hash in response')
    await router.push(`/sovereignty-check/r/${data.hash}`)
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : String(err)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-navy-deep text-text-white">
    <!-- Hero -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
      <p class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-4">
        ⚠️ Firebase / Supabase EU region is not GDPR-safe
      </p>
      <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-4 font-heading">
        Which parts of your stack can a US authority legally reach?
      </h1>
      <p class="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
        Pick the vendors you use. In 60 seconds you'll see which are subject to the US CLOUD Act
        because of their corporate parent — regardless of which region you configured.
      </p>
      <p class="mt-4 text-sm text-text-muted">
        Free. No signup. The score is shareable via a permalink.
      </p>
    </section>

    <!-- Live preview counter — sticky as the user picks. -->
    <section
      v-if="picks.length > 0"
      class="sticky top-0 z-20 bg-navy-deep/90 backdrop-blur border-b border-navy-light"
    >
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-3 text-sm">
          <span
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            :class="ratingBadgeClass(preview.overall)"
          >
            {{ preview.overall }}
          </span>
          <span class="text-text-white font-semibold">
            {{ preview.exposure }}% exposed
          </span>
          <span class="text-text-muted">
            {{ preview.red }} red · {{ preview.amber }} amber · {{ preview.green }} green
          </span>
        </div>
        <button
          type="button"
          :disabled="submitting || picks.length === 0"
          class="inline-flex items-center px-5 py-2 rounded-lg font-semibold text-sm bg-accent-blue text-white hover:bg-accent-blue-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="submit"
        >
          {{ submitting ? 'Generating report…' : `See my exposure (${picks.length}) →` }}
        </button>
      </div>
      <div v-if="submitError" class="max-w-5xl mx-auto px-4 pb-2 text-sm text-red-300">
        {{ submitError }}
      </div>
    </section>

    <!-- Severity modifier -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="rounded-xl bg-navy-card border border-navy-light p-4 md:p-5">
        <label for="severity" class="block text-sm font-semibold text-text-white mb-2">
          Optional: what kind of data do you process?
        </label>
        <p class="text-xs text-text-muted mb-3">
          Tightens the thresholds — an amber rating promotes to red for regulated data categories.
        </p>
        <select
          id="severity"
          v-model="severity"
          class="w-full max-w-sm rounded-md bg-navy-deep border border-navy-light px-3 py-2 text-sm text-text-white"
        >
          <option value="">Standard business data</option>
          <option value="health">Health (Art. 9 GDPR)</option>
          <option value="legal">Legal / attorney-client (§203 StGB / equivalent)</option>
          <option value="financial">Financial account details</option>
          <option value="children">Children's data</option>
        </select>
      </div>
    </section>

    <!-- Picker grid, grouped by category -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div v-for="group in groups" :key="group.category" class="mb-8">
        <h2 class="text-lg font-semibold text-text-white mb-3 font-heading">
          {{ group.label }}
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <button
            v-for="v in group.vendors"
            :key="v.slug"
            type="button"
            class="rounded-lg border px-3 py-3 text-left transition-colors"
            :class="[
              isPicked(v.slug)
                ? 'bg-accent-blue/10 border-accent-blue text-text-white'
                : 'bg-navy-card border-navy-light text-text-light hover:border-navy-lighter',
            ]"
            :aria-pressed="isPicked(v.slug)"
            @click="toggle(v.slug)"
          >
            <span class="flex items-center gap-2">
              <span
                class="inline-block w-2 h-2 rounded-full"
                :class="{
                  'bg-red-400': v.ratings.overall === 'red',
                  'bg-amber-400': v.ratings.overall === 'amber',
                  'bg-emerald-400': v.ratings.overall === 'green',
                }"
              ></span>
              <span class="text-sm font-medium">{{ v.name }}</span>
            </span>
          </button>
        </div>
      </div>
      <p class="text-xs text-text-muted mt-4">
        Vendor not listed?
        <a
          href="https://github.com/STGime/sovereignty-vendors"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent-blue hover:underline"
        >
          Open a PR
        </a>
        against the public dataset. Every rating cites its source.
        <router-link to="/sovereignty-check/methodology" class="text-accent-blue hover:underline ml-1">
          How ratings are assigned →
        </router-link>
      </p>
    </section>

    <!-- Sticky-bottom footer note -->
    <footer class="border-t border-navy-light bg-navy-card">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-text-muted">
        This is a research aid, not legal advice. The dataset is
        <a
          href="https://github.com/STGime/sovereignty-vendors"
          target="_blank"
          rel="noopener noreferrer"
          class="text-accent-blue hover:underline"
        >open on GitHub</a>
        under MIT.
        This tool runs on <router-link to="/" class="text-accent-blue hover:underline">Eurobase</router-link>.
      </div>
    </footer>
  </main>
</template>
