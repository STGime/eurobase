<script setup lang="ts">
// Sovereignty Check — landing page + picker UI.
//
// The picker computes a live client-side score for instant feedback
// (no round-trip while the user is toggling). On CTA click, POST
// the selection to the backend to persist + get a stable /r/{hash}
// permalink, then navigate there.
//
// Layout: a navy hero band (the site nav is fixed + transparent with
// white text, so the top of every page has to stay dark), then a
// light content area for the picker itself.

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  vendors,
  vendorsByCategory,
  ratingChipClass,
  ratingDotClass,
  jurisdictionFlag,
  datasetStats,
  TRANSFER_SHORT,
  type Vendor,
  type RatingColor,
} from '@/data/sovereignty'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('CLOUD Act Exposure Checker — Sovereignty Check | Eurobase')

const router = useRouter()
const groups = vendorsByCategory()

const selected = ref<Set<string>>(new Set())
const severity = ref<'' | 'health' | 'legal' | 'financial' | 'children'>('')
const query = ref('')
const submitting = ref(false)
const submitError = ref<string | null>(null)

const SEVERITY_OPTIONS = [
  { value: '', label: 'Standard business data' },
  { value: 'health', label: 'Health (Art. 9 GDPR)' },
  { value: 'legal', label: 'Legal / attorney-client' },
  { value: 'financial', label: 'Financial account details' },
  { value: 'children', label: "Children's data" },
] as const

// Roving arrow keys for the severity radiogroup, matching the native
// <select> it replaced: Left/Up and Right/Down move selection and focus,
// Home/End jump to the ends. Roving tabindex: Tab lands on the selected
// option, arrows move within the group.
function onSeverityKeydown(e: KeyboardEvent, index: number) {
  const last = SEVERITY_OPTIONS.length - 1
  let next: number | null = null
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = last
  if (next === null) return
  e.preventDefault()
  const opt = SEVERITY_OPTIONS[next]
  if (!opt) return
  severity.value = opt.value
  const group = (e.currentTarget as HTMLElement).parentElement
  const buttons = group?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
  buttons?.[next]?.focus()
}

function toggle(slug: string) {
  const next = new Set(selected.value)
  if (next.has(slug)) next.delete(slug)
  else next.add(slug)
  selected.value = next
}

function isPicked(slug: string): boolean {
  return selected.value.has(slug)
}

function clearAll() {
  selected.value = new Set()
}

const picks = computed<Vendor[]>(() => vendors.filter((v) => selected.value.has(v.slug)))

// Search narrows the grid to matching vendors; categories with no
// hits disappear so the page stays short while typing.
const visibleGroups = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return groups
  return groups
    .map((g) => ({
      ...g,
      vendors: g.vendors.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.slug.toLowerCase().includes(q) ||
          v.ultimate_parent.toLowerCase().includes(q) ||
          g.label.toLowerCase().includes(q),
      ),
    }))
    .filter((g) => g.vendors.length > 0)
})

// Per-category rating tally for the section header.
function tally(list: Vendor[]): [RatingColor, number][] {
  const t: Record<RatingColor, number> = { red: 0, amber: 0, green: 0 }
  for (const v of list) t[v.ratings.overall]++
  return [['red', t.red], ['amber', t.amber], ['green', t.green]]
}

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

function pct(n: number): string {
  const total = picks.value.length
  return total === 0 ? '0%' : `${(n / total) * 100}%`
}

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
  <main class="min-h-screen bg-slate-50 text-slate-900">
    <!-- Hero: stays navy so the fixed, transparent site nav is readable. -->
    <section class="relative overflow-hidden bg-navy text-white">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -top-32 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-accent-blue/30 blur-3xl"></div>
        <div class="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-accent-gold/15 blur-3xl"></div>
      </div>
      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14 text-center">
        <p class="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-gold mb-6">
          <span aria-hidden="true">⚠️</span>
          Firebase / Supabase EU region is not GDPR-safe
        </p>
        <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-4 font-heading">
          Which parts of your stack can a US authority legally reach?
        </h1>
        <p class="text-lg md:text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
          Pick the vendors you use. In 60 seconds you'll see which are subject to the US CLOUD Act
          because of their corporate parent — regardless of which region you configured.
        </p>
        <p class="mt-4 text-sm text-text-muted">
          Free. No signup. Every rating cites its source. The score is shareable via a permalink.
        </p>

        <!-- Dataset stats, derived from the data at build time. -->
        <dl class="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div class="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
            <dt class="text-[11px] uppercase tracking-wider text-text-muted">Vendors rated</dt>
            <dd class="mt-1 text-xl md:text-2xl font-bold font-heading">{{ datasetStats.total }}</dd>
          </div>
          <div class="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
            <dt class="text-[11px] uppercase tracking-wider text-text-muted">Categories</dt>
            <dd class="mt-1 text-xl md:text-2xl font-bold font-heading">{{ datasetStats.categories }}</dd>
          </div>
          <div class="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
            <dt class="text-[11px] uppercase tracking-wider text-text-muted">Ratings</dt>
            <dd class="mt-1 flex items-center gap-3 text-sm font-semibold">
              <span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-red-500"></span>{{ datasetStats.red }}</span>
              <span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>{{ datasetStats.amber }}</span>
              <span class="inline-flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>{{ datasetStats.green }}</span>
            </dd>
          </div>
          <div class="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
            <dt class="text-[11px] uppercase tracking-wider text-text-muted">Last reviewed</dt>
            <dd class="mt-1 text-xl md:text-2xl font-bold font-heading tabular-nums">{{ datasetStats.latest }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Sticky toolbar: search + live score + CTA. Sits directly under the
         fixed nav; --nav-h is defined in assets/main.css and consumed by NavBar.vue. -->
    <section class="sticky top-[var(--nav-h)] z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 md:gap-5 flex-wrap">
        <label class="relative flex-1 min-w-[12rem]">
          <span class="sr-only">Search vendors</span>
          <svg class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
          </svg>
          <input
            v-model="query"
            type="search"
            :placeholder="`Search ${datasetStats.total} vendors — name, parent company, category…`"
            class="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
          />
        </label>

        <div class="flex items-center gap-3 text-sm" aria-live="polite">
          <template v-if="picks.length > 0">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
              :class="ratingChipClass(preview.overall)"
            >
              {{ preview.overall }}
            </span>
            <span class="font-semibold text-slate-900 tabular-nums">{{ preview.exposure }}% exposed</span>
            <span class="hidden sm:flex h-2 w-28 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
              <span class="bg-red-500" :style="{ width: pct(preview.red) }"></span>
              <span class="bg-amber-400" :style="{ width: pct(preview.amber) }"></span>
              <span class="bg-emerald-500" :style="{ width: pct(preview.green) }"></span>
            </span>
            <button type="button" class="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer" @click="clearAll">
              Clear {{ picks.length }}
            </button>
          </template>
          <span v-else class="hidden sm:inline text-slate-500">Pick the vendors you use</span>
        </div>

        <button
          type="button"
          :disabled="submitting || picks.length === 0"
          class="inline-flex items-center px-5 py-2 rounded-lg font-semibold text-sm bg-accent-blue text-white shadow-md shadow-accent-blue/25 hover:bg-accent-blue-hover transition-colors disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
          @click="submit"
        >
          {{ submitting ? 'Generating report…' : `See my exposure${picks.length ? ` (${picks.length})` : ''} →` }}
        </button>
      </div>
      <div v-if="submitError" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 text-sm text-red-600">
        {{ submitError }}
      </div>
    </section>

    <!-- Controls: severity + category jump list -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div class="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 md:p-6">
        <div class="md:flex md:items-start md:justify-between md:gap-8">
          <div class="md:max-w-xs">
            <h2 class="text-sm font-semibold text-slate-900">What kind of data do you process?</h2>
            <p class="mt-1 text-xs text-slate-500">
              Optional. Regulated categories tighten the thresholds: an amber rating promotes to red.
            </p>
          </div>
          <div class="mt-3 md:mt-0 flex flex-wrap gap-2" role="radiogroup" aria-label="Data category">
            <button
              v-for="(opt, i) in SEVERITY_OPTIONS"
              :key="opt.value"
              type="button"
              role="radio"
              :aria-checked="severity === opt.value"
              :tabindex="severity === opt.value ? 0 : -1"
              @keydown="onSeverityKeydown($event, i)"
              class="rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors cursor-pointer"
              :class="severity === opt.value
                ? 'bg-navy text-white ring-navy'
                : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50'"
              @click="severity = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <nav class="mt-6 flex flex-wrap gap-2" aria-label="Jump to category">
        <a
          v-for="g in groups"
          :key="g.category"
          :href="`#cat-${g.category}`"
          class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-200 hover:ring-accent-blue hover:text-accent-blue transition-colors"
        >
          {{ g.label }}
          <span class="text-slate-400 tabular-nums">{{ g.vendors.length }}</span>
        </a>
      </nav>
    </section>

    <!-- Picker grid, grouped by category -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div
        v-for="group in visibleGroups"
        :id="`cat-${group.category}`"
        :key="group.category"
        class="mb-12 scroll-mt-[calc(var(--nav-h)+5rem)]"
      >
        <div class="flex items-baseline justify-between gap-4 mb-4">
          <h2 class="text-xl font-bold font-heading text-slate-900">
            {{ group.label }}
            <span class="ml-1 text-sm font-medium text-slate-400 tabular-nums">{{ group.vendors.length }}</span>
          </h2>
          <p class="hidden sm:flex items-center gap-3 text-xs text-slate-500 tabular-nums">
            <span v-for="[color, n] in tally(group.vendors)" :key="color" class="inline-flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full" :class="ratingDotClass(color)"></span>{{ n }}
            </span>
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <div v-for="v in group.vendors" :key="v.slug" class="group relative">
          <button
            type="button"
            class="flex h-full w-full md:aspect-square flex-col overflow-hidden rounded-2xl border-2 bg-white p-3.5 text-left shadow-sm transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40"
            :class="isPicked(v.slug)
              ? 'border-accent-blue bg-blue-50/60 shadow-md shadow-accent-blue/10'
              : 'border-slate-200 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5'"
            :aria-pressed="isPicked(v.slug)"
            :title="v.one_line_reason.trim()"
            @click="toggle(v.slug)"
          >
            <!-- Top row: rating + selection state -->
            <span class="flex items-center justify-between gap-2">
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                :class="ratingChipClass(v.ratings.overall)"
              >
                {{ v.ratings.overall }}
              </span>
              <span
                class="flex h-5 w-5 items-center justify-center rounded-full border transition-colors"
                :class="isPicked(v.slug)
                  ? 'border-accent-blue bg-accent-blue text-white'
                  : 'border-slate-300 bg-white text-transparent group-hover:border-slate-400'"
                aria-hidden="true"
              >
                <svg class="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m5 10 3.5 3.5L15 7" />
                </svg>
              </span>
            </span>

            <!-- Name + owner -->
            <span class="mt-3 text-[15px] font-semibold leading-snug text-slate-900 line-clamp-2">{{ v.name }}</span>
            <span class="mt-1 block text-xs text-slate-500 truncate">
              <span aria-hidden="true">{{ jurisdictionFlag(v.parent_jurisdiction) }}</span>
              <span class="sr-only">Parent jurisdiction {{ v.parent_jurisdiction }}.</span>
              {{ v.ultimate_parent.trim() }}
            </span>

            <!-- Why: the dataset's one-line reason, clamped. -->
            <span class="mt-2 text-[11px] leading-snug text-slate-500 line-clamp-3">{{ v.one_line_reason.trim() }}</span>

            <!-- Bottom: facts -->
            <span class="mt-auto pt-2 pr-14 md:pr-0 flex flex-wrap items-center gap-1.5 text-[11px] leading-none">
              <span v-if="v.transfer_mechanism" class="rounded-md bg-slate-100 px-1.5 py-1 text-slate-600">
                {{ TRANSFER_SHORT[v.transfer_mechanism] ?? v.transfer_mechanism }}
              </span>
              <span v-if="v.eu_alternatives?.length" class="rounded-md bg-emerald-50 px-1.5 py-1 text-emerald-700">
                {{ v.eu_alternatives.length }} EU alt{{ v.eu_alternatives.length === 1 ? '' : 's' }}
              </span>
              <span v-else-if="v.hosting_regions?.length" class="rounded-md bg-slate-100 px-1.5 py-1 text-slate-600">
                {{ v.hosting_regions.length }} region{{ v.hosting_regions.length === 1 ? '' : 's' }}
              </span>
            </span>

          </button>
          <!-- Details link: a sibling of the toggle (a link inside a
               button is invalid HTML) and a real URL for crawlers. -->
          <router-link
            :to="`/sovereignty-check/vendors/${v.slug}`"
            class="absolute bottom-3 right-3 rounded bg-white/90 px-1.5 py-0.5 text-[11px] font-medium text-slate-400 hover:text-accent-blue md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 transition-opacity"
            :aria-label="`${v.name}: rating details and sources`"
          >
            Details ↗
          </router-link>
          </div>
        </div>
      </div>

      <p v-if="visibleGroups.length === 0" class="rounded-2xl bg-white border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
        No vendor matches “{{ query }}”.
        <a href="https://github.com/STGime/sovereignty-vendors" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">Open a PR</a>
        to add it to the public dataset.
      </p>

      <!-- Bottom CTA mirror — 112 vendors is a long scroll, so repeat
           the submit at the end so the user doesn't have to scroll back up. -->
      <div class="mt-4 rounded-2xl bg-navy text-white p-6 md:p-8 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p class="text-lg font-semibold font-heading">
            {{ picks.length ? `${picks.length} vendor${picks.length === 1 ? '' : 's'} selected` : 'Nothing selected yet' }}
          </p>
          <p class="mt-1 text-sm text-text-light">
            {{ picks.length ? `Preview: ${preview.exposure}% exposed — get the full report with EU alternatives.` : 'Tick the vendors in your stack above to get a shareable exposure report.' }}
          </p>
        </div>
        <button
          type="button"
          :disabled="submitting || picks.length === 0"
          class="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-sm bg-accent-blue text-white shadow-lg shadow-accent-blue/25 hover:bg-accent-blue-hover transition-colors disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer"
          @click="submit"
        >
          {{ submitting ? 'Generating report…' : `See my exposure${picks.length ? ` (${picks.length})` : ''} →` }}
        </button>
      </div>

      <p class="text-xs text-slate-500 mt-6">
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
        <router-link to="/sovereignty-check/vendors" class="text-accent-blue hover:underline ml-1">
          Browse all vendors →
        </router-link>
      </p>
    </section>

    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500">
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
