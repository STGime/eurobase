<script setup lang="ts">
// Sovereignty Check — persisted report at /sovereignty-check/r/:hash.
//
// SSR-friendly: on first paint we fetch the report from the backend
// (developer pool, /platform/public/sovereignty/report/{hash}). If
// the hash is bad or the report is gone we show a not-found panel
// with a link back to the picker.
//
// Layout mirrors the checker landing page: a navy hero band (the site
// nav is fixed + transparent with white text) carrying the score, then
// a light content area with square vendor tiles.

import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  ratingChipClass,
  ratingDotClass,
  jurisdictionFlag,
  getVendor,
  CATEGORY_LABELS,
  type Report,
  type ReportCard,
  type RatingColor,
} from '@/data/sovereignty'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('Shared report — Sovereignty Check | Eurobase')

const route = useRoute()
const report = ref<Report | null>(null)
const error = ref<string | null>(null)
const loading = ref(true)
const copied = ref(false)

const hash = computed(() => String(route.params.hash ?? ''))

const SEVERITY_LABELS: Record<string, string> = {
  health: 'Health data (Art. 9 GDPR)',
  legal: 'Legal / attorney-client',
  financial: 'Financial account details',
  children: "Children's data",
}

const DIMENSIONS = [
  ['Entity', 'entity_control'],
  ['Location', 'data_location'],
  ['Access', 'operational_access'],
  ['Subproc', 'subprocessor_chain'],
  ['Transfer', 'transfer_mechanism'],
] as const

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

// Worst first, so the vendors that produced the score lead the grid.
// Stable within a bucket (keeps the order the user picked in).
const sortedCards = computed<ReportCard[]>(() => {
  const rank = (c: RatingColor) => (c === 'red' ? 0 : c === 'amber' ? 1 : 2)
  return [...(report.value?.cards ?? [])].sort((a, b) => rank(a.overall) - rank(b.overall))
})

function pct(n: number): string {
  const total = report.value?.cards.length ?? 0
  return total === 0 ? '0%' : `${(n / total) * 100}%`
}

function displayReason(card: ReportCard): string {
  // Prefer the on-card reason (persisted); fall back to the vendor
  // DB if the persisted card didn't include it. Historical rows
  // from before a schema tweak might not have the field.
  if (card.one_line_reason) return card.one_line_reason.trim()
  const v = getVendor(card.slug)
  return v?.one_line_reason?.trim() ?? ''
}

// The persisted card carries the jurisdiction; the parent's name
// comes from the current dataset (falls back to the jurisdiction
// alone for a vendor that has since left the dataset).
function ownerLine(card: ReportCard): string {
  return getVendor(card.slug)?.ultimate_parent.trim() ?? card.parent_jurisdiction
}

function categoryLabel(key: string): string {
  return CATEGORY_LABELS[key] ?? key
}

function createdOn(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
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
      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <router-link to="/sovereignty-check" class="inline-flex items-center gap-1 text-sm text-text-light hover:text-white transition-colors">
          &larr; Score another stack
        </router-link>

        <div v-if="loading" class="py-16 text-center text-text-muted" aria-live="polite">Loading report…</div>

        <!-- Error state: the hero shrinks to its heading; the card itself
             renders on the light surface below so it doesn't carry the
             hero's decorative weight. -->
        <div v-else-if="error" class="mt-6 pb-2">
          <p class="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-3">Shared exposure report</p>
          <h1 class="text-3xl md:text-4xl font-bold font-heading">Report unavailable</h1>
        </div>

        <template v-else-if="report">
          <div class="mt-6 md:flex md:items-end md:justify-between md:gap-8">
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-accent-gold mb-3">Shared exposure report</p>
              <div class="flex items-center gap-4 flex-wrap">
                <h1 class="text-5xl md:text-7xl font-bold font-heading leading-none tabular-nums">
                  {{ report.exposure_percent }}%
                </h1>
                <div>
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider"
                    :class="ratingChipClass(report.overall)"
                  >
                    {{ report.overall }}
                  </span>
                  <p class="mt-2 text-lg text-text-light">
                    of this stack is reachable by a US authority
                  </p>
                </div>
              </div>
              <p v-if="report.severity_modifier" class="mt-3 text-sm text-text-muted">
                Thresholds tightened for
                <strong class="text-text-light">{{ SEVERITY_LABELS[report.severity_modifier] ?? report.severity_modifier }}</strong>:
                amber ratings count as red.
              </p>
            </div>

            <div class="mt-6 md:mt-0 flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-blue/25 hover:bg-accent-blue-hover transition-colors cursor-pointer"
                @click="copyLink"
              >
                {{ copied ? '✓ Link copied' : 'Copy shareable link' }}
              </button>
              <router-link
                to="/sovereignty-check"
                class="inline-flex items-center rounded-lg bg-white/10 ring-1 ring-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
              >
                Score another stack
              </router-link>
            </div>
          </div>

          <!-- Score breakdown -->
          <div class="mt-8 rounded-xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5">
            <div class="flex h-2.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <span class="bg-red-500" :style="{ width: pct(report.red_count) }"></span>
              <span class="bg-amber-400" :style="{ width: pct(report.amber_count) }"></span>
              <span class="bg-emerald-500" :style="{ width: pct(report.green_count) }"></span>
            </div>
            <dl class="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <dt class="text-[11px] uppercase tracking-wider text-text-muted">Vendors scored</dt>
                <dd class="mt-0.5 text-xl font-bold font-heading tabular-nums">{{ report.cards.length }}</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-wider text-text-muted">Red · CLOUD Act exposure</dt>
                <dd class="mt-0.5 flex items-center gap-2 text-xl font-bold font-heading tabular-nums"><span class="h-2.5 w-2.5 rounded-full bg-red-500"></span>{{ report.red_count }}</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-wider text-text-muted">Amber · mitigations</dt>
                <dd class="mt-0.5 flex items-center gap-2 text-xl font-bold font-heading tabular-nums"><span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>{{ report.amber_count }}</dd>
              </div>
              <div>
                <dt class="text-[11px] uppercase tracking-wider text-text-muted">Green · EU jurisdiction</dt>
                <dd class="mt-0.5 flex items-center gap-2 text-xl font-bold font-heading tabular-nums"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>{{ report.green_count }}</dd>
              </div>
            </dl>
          </div>
        </template>
      </div>
    </section>

    <section v-if="error && !loading" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <div class="rounded-2xl bg-white border border-red-200 shadow-sm p-6 md:p-8 max-w-2xl">
        <p class="text-base text-slate-700">{{ error }}</p>
        <p class="mt-2 text-sm text-slate-500">
          Reports are kept by their permalink hash. If you got this link from someone, ask them to re-share it, or score your own stack in a minute.
        </p>
        <router-link
          to="/sovereignty-check"
          class="mt-5 inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent-blue text-white shadow-md shadow-accent-blue/25 hover:bg-accent-blue-hover transition-colors"
        >
          Start a fresh check →
        </router-link>
      </div>
    </section>

    <section v-if="report && !loading && !error" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <!-- How to read this — dimension legend -->
      <details class="rounded-2xl bg-white border border-slate-200 shadow-sm" open>
        <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-2 select-none">
          <span class="text-sm font-semibold text-slate-900">How to read the five badges on each vendor</span>
          <span class="text-xs text-slate-400">tap to toggle</span>
        </summary>
        <div class="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <div class="uppercase tracking-wider text-[10px] font-semibold text-slate-400 mb-0.5">Entity</div>
            <div class="text-slate-600">Who ultimately owns the vendor and which government can compel them (US parent = CLOUD Act exposure, regardless of where servers sit).</div>
          </div>
          <div>
            <div class="uppercase tracking-wider text-[10px] font-semibold text-slate-400 mb-0.5">Location</div>
            <div class="text-slate-600">Where your data physically lives at rest. EU region ≠ EU protection if the operator is US-controlled.</div>
          </div>
          <div>
            <div class="uppercase tracking-wider text-[10px] font-semibold text-slate-400 mb-0.5">Access</div>
            <div class="text-slate-600">Which countries' support/SRE staff can reach production data during incidents. Follow-the-sun rotations often mean US or IN access.</div>
          </div>
          <div>
            <div class="uppercase tracking-wider text-[10px] font-semibold text-slate-400 mb-0.5">Subproc</div>
            <div class="text-slate-600">Downstream subprocessors in the delivery chain — chiefly whether AWS / GCP / Azure / Cloudflare is underneath.</div>
          </div>
          <div class="sm:col-span-2">
            <div class="uppercase tracking-wider text-[10px] font-semibold text-slate-400 mb-0.5">Transfer</div>
            <div class="text-slate-600">The legal instrument covering EU→non-EU data transfers (SCCs, DPF, adequacy, or none). Post-Schrems II, SCCs alone aren't a full defence against US surveillance law.</div>
          </div>
        </div>
        <div class="px-5 pb-4 text-xs text-slate-500">
          Each badge is red / amber / green. The overall rating uses the worst dimension (worst-wins).
          <router-link to="/sovereignty-check/methodology" class="text-accent-blue hover:underline">Read the full methodology →</router-link>
        </div>
      </details>

      <!-- Vendor tiles -->
      <div class="mt-10 flex items-baseline justify-between gap-4 mb-4">
        <h2 class="text-xl font-bold font-heading text-slate-900">
          Your stack
          <span class="ml-1 text-sm font-medium text-slate-400 tabular-nums">{{ report.cards.length }}</span>
        </h2>
        <p class="text-xs text-slate-500">Worst rating first</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <article
          v-for="card in sortedCards"
          :key="card.slug"
          class="group relative flex h-full w-full md:aspect-square flex-col overflow-hidden rounded-2xl border-2 bg-white p-3.5 shadow-sm"
          :class="card.overall === 'red' ? 'border-red-200' : card.overall === 'amber' ? 'border-amber-200' : 'border-emerald-200'"
        >
          <div class="flex items-center justify-between gap-2">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              :class="ratingChipClass(card.overall)"
            >
              {{ card.overall }}
            </span>
            <span class="text-[11px] text-slate-400 truncate">{{ categoryLabel(card.category) }}</span>
          </div>

          <h3 class="mt-3 text-[15px] font-semibold leading-snug text-slate-900 line-clamp-2">
            <router-link :to="`/sovereignty-check/vendors/${card.slug}`" class="hover:text-accent-blue transition-colors">
              {{ card.name }}
            </router-link>
          </h3>
          <p class="mt-1 text-xs text-slate-500 truncate">
            <span aria-hidden="true">{{ jurisdictionFlag(card.parent_jurisdiction) }}</span>
            <span class="sr-only">Parent jurisdiction {{ card.parent_jurisdiction }}.</span>
            {{ ownerLine(card) }}
          </p>
          <span
            v-if="card.self_disclosure"
            class="mt-1.5 inline-flex w-fit items-center rounded-full bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            title="Eurobase maintains this dataset and grades itself here — see methodology"
          >
            Self-disclosed COI
          </span>

          <p class="mt-2 text-[11px] leading-snug text-slate-500 line-clamp-3 md:line-clamp-6" :title="displayReason(card)">
            {{ displayReason(card) }}
          </p>

          <!-- Five dimensions -->
          <ul class="mt-auto pt-3 grid grid-cols-5 gap-1" aria-label="Rating by dimension">
            <li
              v-for="[label, key] in DIMENSIONS"
              :key="key"
              class="flex flex-col items-center gap-1 rounded-md bg-slate-50 px-0.5 py-1.5"
              :title="`${label}: ${card.ratings[key]}`"
            >
              <span class="h-2.5 w-2.5 rounded-full" :class="ratingDotClass(card.ratings[key])"></span>
              <span class="text-[8px] leading-none uppercase tracking-wide text-slate-500" aria-hidden="true">
                <span class="sm:hidden">{{ label.charAt(0) }}</span><span class="hidden sm:inline">{{ label }}</span>
              </span>
              <span class="sr-only">{{ label }}: {{ card.ratings[key] }}</span>
            </li>
          </ul>
        </article>
      </div>

      <!-- Swap suggestions -->
      <div v-if="report.alternatives.length" class="mt-12">
        <div class="flex items-baseline justify-between gap-4 mb-4">
          <h2 class="text-xl font-bold font-heading text-slate-900">Swap ideas</h2>
          <p class="text-xs text-slate-500">EU-headquartered options in the same category</p>
        </div>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li
            v-for="swap in report.alternatives"
            :key="swap.from_slug"
            class="rounded-2xl bg-white border border-slate-200 shadow-sm p-4"
          >
            <p class="text-sm text-slate-600">
              Instead of
              <router-link :to="`/sovereignty-check/vendors/${swap.from_slug}`" class="font-semibold text-slate-900 hover:text-accent-blue">
                {{ getVendor(swap.from_slug)?.name ?? swap.from_slug }}
              </router-link>
              <span class="ml-1 text-slate-400">· {{ categoryLabel(swap.category) }}</span>
            </p>
            <div class="mt-2 flex flex-wrap gap-2">
              <router-link
                v-for="alt in swap.alternatives"
                :key="alt"
                :to="`/sovereignty-check/vendors/${alt}`"
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-200 px-3 py-1 text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                <span aria-hidden="true">{{ jurisdictionFlag(getVendor(alt)?.parent_jurisdiction ?? '') }}</span>
                {{ getVendor(alt)?.name ?? alt }}
              </router-link>
            </div>
          </li>
        </ul>
      </div>

      <p v-if="report.unknown_slugs && report.unknown_slugs.length" class="mt-6 text-xs text-slate-500">
        Not scored (not in our dataset yet): {{ report.unknown_slugs.join(', ') }}
      </p>

      <!-- Closing CTA -->
      <div class="mt-12 rounded-2xl bg-navy text-white p-6 md:p-8 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p class="text-lg font-semibold font-heading">Want the green column for your whole backend?</p>
          <p class="mt-1 text-sm text-text-light">
            Eurobase is Postgres, auth, storage and edge functions on EU-owned infrastructure in France. No US parent, no CLOUD Act reach.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <router-link
            to="/"
            class="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm bg-accent-blue text-white shadow-lg shadow-accent-blue/25 hover:bg-accent-blue-hover transition-colors"
          >
            See Eurobase →
          </router-link>
          <router-link
            to="/sovereignty-check"
            class="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/15 transition-colors"
          >
            Score another stack
          </router-link>
        </div>
      </div>

      <p class="mt-8 text-xs text-slate-500">
        Report <code class="rounded bg-slate-200/70 px-1 py-0.5 text-slate-700">{{ report.hash }}</code>
        <template v-if="createdOn(report.created_at)">generated {{ createdOn(report.created_at) }}.</template>
        Not legal advice — this is a research aid.
        <router-link to="/sovereignty-check/methodology" class="text-accent-blue hover:underline">Methodology</router-link>.
      </p>
    </section>

    <footer class="border-t border-slate-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500">
        The dataset is
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
