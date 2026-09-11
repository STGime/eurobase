<script setup lang="ts">
// Sovereignty Check — persisted report at /sovereignty-check/r/:hash.
//
// SSR-friendly: on first paint we fetch the report from the backend
// (developer pool, /platform/public/sovereignty/report/{hash}). If
// the hash is bad or the report is gone we show a not-found panel
// with a link back to the picker.

import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ratingBadgeClass,
  getVendor,
  type Report,
  type ReportCard,
} from '@/data/sovereignty'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('Shared report — Sovereignty Check | Eurobase')

const route = useRoute()
const report = ref<Report | null>(null)
const error = ref<string | null>(null)
const loading = ref(true)
const copied = ref(false)

const hash = computed(() => String(route.params.hash ?? ''))

async function load(h: string) {
  loading.value = true
  error.value = null
  report.value = null
  try {
    const resp = await fetch(`https://api.eurobase.app/platform/public/sovereignty/report/${encodeURIComponent(h)}`)
    if (resp.status === 404) {
      error.value = 'This report was not found. It may have been deleted or the link is wrong.'
      return
    }
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({ error: 'network error' }))
      throw new Error(body.error || `HTTP ${resp.status}`)
    }
    report.value = (await resp.json()) as Report
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => load(hash.value))
watch(hash, (h) => h && load(h))

async function copyLink() {
  if (typeof window === 'undefined') return
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Silent — the user can still copy from the address bar.
  }
}

function displayReason(card: ReportCard): string {
  // Prefer the on-card reason (persisted); fall back to the vendor
  // DB if the persisted card didn't include it. Historical rows
  // from before a schema tweak might not have the field.
  if (card.one_line_reason) return card.one_line_reason.trim()
  const v = getVendor(card.slug)
  return v?.one_line_reason?.trim() ?? ''
}
</script>

<template>
  <main class="min-h-screen bg-navy-deep text-text-white">
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
      <router-link to="/sovereignty-check" class="text-accent-blue text-sm hover:underline mb-6 inline-block">
        &larr; Score another stack
      </router-link>

      <div v-if="loading" class="text-text-muted py-16 text-center">Loading report…</div>

      <div v-else-if="error" class="rounded-xl bg-red-900/20 border border-red-500/40 p-6">
        <h1 class="text-xl font-bold mb-2">Report unavailable</h1>
        <p class="text-red-200">{{ error }}</p>
        <router-link to="/sovereignty-check" class="mt-4 inline-block text-accent-blue hover:underline">
          Start a fresh check →
        </router-link>
      </div>

      <template v-else-if="report">
        <div class="flex items-baseline gap-4 flex-wrap mb-2">
          <h1 class="text-4xl md:text-6xl font-bold font-heading leading-tight">
            {{ report.exposure_percent }}% exposed
          </h1>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider"
            :class="ratingBadgeClass(report.overall)"
          >
            {{ report.overall }}
          </span>
        </div>
        <p class="text-text-muted mb-6">
          {{ report.red_count }} red · {{ report.amber_count }} amber · {{ report.green_count }} green
          <template v-if="report.severity_modifier">
            · severity: <strong>{{ report.severity_modifier }}</strong>
          </template>
        </p>

        <!-- Share row -->
        <div class="flex flex-wrap items-center gap-3 mb-8">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-navy-light bg-navy-card px-4 py-2 text-sm hover:bg-navy-lighter transition-colors"
            @click="copyLink"
          >
            {{ copied ? '✓ Link copied' : 'Copy shareable link' }}
          </button>
          <router-link
            to="/sovereignty-check"
            class="inline-flex items-center rounded-lg border border-navy-light bg-navy-card px-4 py-2 text-sm hover:bg-navy-lighter transition-colors"
          >
            Score another stack
          </router-link>
        </div>

        <!-- Vendor cards -->
        <div class="space-y-4">
          <article
            v-for="card in report.cards"
            :key="card.slug"
            class="rounded-xl bg-navy-card border border-navy-light p-5"
          >
            <div class="flex items-start justify-between gap-4 mb-2 flex-wrap">
              <div>
                <router-link :to="`/sovereignty-check/vendors/${card.slug}`" class="text-lg font-semibold hover:underline">
                  {{ card.name }}
                </router-link>
                <span class="ml-2 text-xs text-text-muted">{{ card.category }}</span>
                <span
                  v-if="card.self_disclosure"
                  class="ml-2 inline-flex items-center rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  title="Eurobase maintains this dataset and grades itself here — see methodology"
                >
                  Self-disclosed COI
                </span>
              </div>
              <span
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                :class="ratingBadgeClass(card.overall)"
              >
                {{ card.overall }}
              </span>
            </div>
            <p class="text-sm text-text-light leading-relaxed">
              {{ displayReason(card) }}
            </p>
            <!-- Per-dimension mini-grid -->
            <div class="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div v-for="[label, key] in ([
                ['Entity','entity_control'],
                ['Location','data_location'],
                ['Op access','operational_access'],
                ['Subproc','subprocessor_chain'],
                ['Transfer','transfer_mechanism'],
              ] as const)" :key="key"
                class="rounded-md border px-2 py-1"
                :class="ratingBadgeClass(card.ratings[key])">
                <div class="uppercase tracking-wider text-[10px] opacity-80">{{ label }}</div>
                <div class="font-semibold">{{ card.ratings[key] }}</div>
              </div>
            </div>
          </article>
        </div>

        <!-- Swap suggestions -->
        <div v-if="report.alternatives.length" class="mt-10">
          <h2 class="text-lg font-semibold mb-3 font-heading">Swap ideas</h2>
          <ul class="space-y-2">
            <li v-for="swap in report.alternatives" :key="swap.from_slug" class="rounded-lg bg-navy-card border border-navy-light p-3 text-sm">
              For your <strong class="capitalize">{{ swap.category }}</strong>:
              <span class="text-text-muted">consider</span>
              <span v-for="(alt, i) in swap.alternatives" :key="alt">
                <router-link :to="`/sovereignty-check/vendors/${alt}`" class="text-accent-blue hover:underline">
                  {{ getVendor(alt)?.name ?? alt }}
                </router-link><span v-if="i < swap.alternatives.length - 1">, </span>
              </span>
            </li>
          </ul>
        </div>

        <p v-if="report.unknown_slugs && report.unknown_slugs.length" class="mt-6 text-xs text-text-muted">
          Not scored (not in our dataset yet): {{ report.unknown_slugs.join(', ') }}
        </p>

        <p class="mt-10 text-xs text-text-muted">
          Report <code class="rounded bg-navy-card px-1 py-0.5">{{ report.hash }}</code> generated
          {{ new Date(report.created_at).toISOString().slice(0, 10) }}.
          Not legal advice — this is a research aid.
          <router-link to="/sovereignty-check/methodology" class="text-accent-blue hover:underline">Methodology</router-link>.
        </p>
      </template>
    </section>
  </main>
</template>
