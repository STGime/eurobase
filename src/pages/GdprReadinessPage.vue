<!--
  /gdpr-readiness — free GDPR Backend Readiness assessment.
  10 questions, client-side scoring, on-page report with per-question
  Eurobase coverage. No email capture backend today — the "email me
  the report" CTA opens a mailto: with a summary; a proper form
  endpoint is deferred (see the follow-up note in the PR body).
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { assessmentQuestions, scoreBand } from '@/data/gdprReadiness'

type Stage = 'intro' | 'questions' | 'report'

const SITE_ORIGIN = 'https://eurobase.app'
const PAGE_URL = `${SITE_ORIGIN}/gdpr-readiness`

const stage = ref<Stage>('intro')
const questionIndex = ref(0)
const answers = ref<Record<string, number>>({})

// Fallback to [0] keeps the computed value definite for TS strict-null
// mode; questionIndex.value is bounded by answer() so this fallback
// never actually renders.
const currentQuestion = computed(
  () => assessmentQuestions[questionIndex.value] ?? assessmentQuestions[0]!,
)
const progressPct = computed(
  () => Math.round(((questionIndex.value + 1) / assessmentQuestions.length) * 100),
)

const totalScore = computed(() =>
  Object.values(answers.value).reduce((sum, points) => sum + points, 0),
)
const band = computed(() => scoreBand(totalScore.value))

// Gaps = questions where the user's answer scored <= 1. Those are the
// items highlighted in the report with Eurobase's coverage.
const gaps = computed(() =>
  assessmentQuestions
    .filter((q) => (answers.value[q.id] ?? 0) <= 1)
    .map((q) => ({
      question: q,
      userPoints: answers.value[q.id] ?? 0,
    })),
)

function answer(points: number) {
  answers.value[currentQuestion.value.id] = points
  if (questionIndex.value < assessmentQuestions.length - 1) {
    questionIndex.value += 1
  } else {
    stage.value = 'report'
    // Nudge scroll to top so the report is visible from the start.
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function restart() {
  answers.value = {}
  questionIndex.value = 0
  stage.value = 'intro'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// mailto: fallback for "email me the report" — good enough for MVP.
// Follow-up work: a real form endpoint that stores the score + gaps
// so we can follow up with prospective customers (see #480 PR body).
const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`My Eurobase GDPR Readiness score: ${totalScore.value}/30`)
  const lines = [
    `GDPR Backend Readiness — ${band.value.title} (${totalScore.value}/30)`,
    '',
    band.value.summary,
    '',
    'Gaps flagged:',
    ...gaps.value.map((g) => `- ${g.question.category}: ${g.question.question}`),
    '',
    `Report URL: ${PAGE_URL}`,
  ]
  return `mailto:?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
})

// Per-route meta (client-side, matches ComparisonPage pattern).
// Restored on unmount so navigating away doesn't leave stale head tags.
type SavedMeta = Record<string, string | null> & { title?: string }
let saved: SavedMeta | null = null

function findOrCreateMeta(attr: string, key: string): HTMLMetaElement {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (existing) return existing
  const el = document.createElement('meta')
  el.setAttribute(attr, key)
  document.head.appendChild(el)
  return el
}

function findOrCreateLink(rel: string): HTMLLinkElement {
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (existing) return existing
  const el = document.createElement('link')
  el.setAttribute('rel', rel)
  document.head.appendChild(el)
  return el
}

onMounted(() => {
  const title = 'Free GDPR Backend Readiness Assessment — Eurobase'
  const description =
    'Score your backend on 10 GDPR obligations in 3 minutes: residency, jurisdiction, DSAR, RoPA, audit trail, retention, breach notification, transfers, DPIA, and key sovereignty. Get a per-question diagnosis.'
  const image = `${SITE_ORIGIN}/og-image.png`

  const tags: Array<[string, 'name' | 'property', string]> = [
    [description, 'name', 'description'],
    [title, 'property', 'og:title'],
    [description, 'property', 'og:description'],
    [PAGE_URL, 'property', 'og:url'],
    ['website', 'property', 'og:type'],
    [image, 'property', 'og:image'],
    [title, 'name', 'twitter:title'],
    [description, 'name', 'twitter:description'],
    [image, 'name', 'twitter:image'],
    ['summary_large_image', 'name', 'twitter:card'],
  ]

  if (!saved) {
    saved = { title: document.title }
    for (const [, attr, key] of tags) {
      const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
      saved[`${attr}:${key}`] = el ? el.getAttribute('content') : null
    }
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    saved['link:canonical'] = canonical ? canonical.getAttribute('href') : null
  }

  document.title = title
  for (const [value, attr, key] of tags) {
    findOrCreateMeta(attr, key).setAttribute('content', value)
  }
  findOrCreateLink('canonical').setAttribute('href', PAGE_URL)
})

onBeforeUnmount(() => {
  if (saved) {
    document.title = saved.title ?? ''
    const snapshot = saved
    document.head.querySelectorAll<HTMLMetaElement>('meta').forEach((el) => {
      const key = el.getAttribute('property') ? `property:${el.getAttribute('property')}` : `name:${el.getAttribute('name')}`
      if (!(key in snapshot)) return
      const original = snapshot[key]
      if (original == null) el.remove()
      else el.setAttribute('content', original)
    })
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical && snapshot['link:canonical'] != null) {
      canonical.setAttribute('href', snapshot['link:canonical'] as string)
    }
    saved = null
  }
})
</script>

<template>
  <main class="min-h-screen bg-navy text-text-light">
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- Intro -->
      <div v-if="stage === 'intro'" class="text-center">
        <p class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-4">Free assessment · 3 minutes · no signup</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-white mb-6 font-heading leading-tight">
          Score your backend on 10 GDPR obligations
        </h1>
        <p class="text-lg text-text-light leading-relaxed mb-6">
          A quick DPO-checklist read of your current backend: residency, jurisdiction, DSAR mechanics, RoPA maintenance, audit trail, retention, breach notification, transfers, DPIA, and encryption-key sovereignty. Each question is one click; each gap comes with a specific fix.
        </p>
        <p class="text-sm text-text-light/70 mb-8">
          No email required. No account. The score is computed in your browser and never leaves it unless you choose to email it to yourself at the end.
        </p>
        <button
          @click="stage = 'questions'"
          class="inline-flex items-center gap-2 rounded-lg bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-6 py-3 text-base transition-colors shadow-lg shadow-accent-blue/25"
        >
          Start the assessment
          <span aria-hidden="true">→</span>
        </button>
        <p class="text-xs text-text-light/60 mt-6">
          Adapted from EDPB checklists and the Article 30 / 33 / 35 obligation set.
        </p>
      </div>

      <!-- Questions -->
      <div v-else-if="stage === 'questions'">
        <div class="mb-6">
          <div class="flex justify-between text-xs uppercase tracking-wider text-text-light/70 mb-2">
            <span>Question {{ questionIndex + 1 }} of {{ assessmentQuestions.length }}</span>
            <span>{{ progressPct }}%</span>
          </div>
          <div class="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              class="h-full bg-accent-blue transition-all duration-300"
              :style="{ width: `${progressPct}%` }"
            />
          </div>
        </div>

        <p class="text-accent-gold text-sm uppercase tracking-wider font-semibold mb-3">
          {{ currentQuestion.category }}
        </p>
        <h2 class="text-2xl sm:text-3xl font-bold text-text-white mb-3 font-heading leading-snug">
          {{ currentQuestion.question }}
        </h2>
        <p v-if="currentQuestion.helper" class="text-sm text-text-light/80 mb-8 leading-relaxed">
          {{ currentQuestion.helper }}
        </p>

        <div class="space-y-3">
          <button
            v-for="(opt, i) in currentQuestion.options"
            :key="i"
            @click="answer(opt.points)"
            class="w-full text-left rounded-lg border border-white/15 hover:border-accent-blue hover:bg-white/5 focus:border-accent-blue focus:bg-white/5 focus:outline-none transition-all px-5 py-4 text-text-white"
          >
            {{ opt.label }}
          </button>
        </div>

        <button
          v-if="questionIndex > 0"
          @click="questionIndex -= 1"
          class="mt-6 text-sm text-text-light/70 hover:text-text-light transition-colors"
        >
          ← Back to previous question
        </button>
      </div>

      <!-- Report -->
      <div v-else-if="stage === 'report'" class="text-left">
        <p class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-4 text-center">Your GDPR posture</p>
        <div class="text-center mb-8">
          <div class="text-6xl sm:text-7xl font-bold text-text-white font-heading mb-2">
            {{ totalScore }}<span class="text-text-light/60 text-3xl sm:text-4xl">/30</span>
          </div>
          <p
            class="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
            :class="{
              'bg-red-500/20 text-red-300': band.band === 'high-risk',
              'bg-amber-500/20 text-amber-300': band.band === 'partial',
              'bg-emerald-500/20 text-emerald-300': band.band === 'good',
            }"
          >
            {{ band.title }}
          </p>
        </div>

        <p class="text-lg text-text-light leading-relaxed mb-10">
          {{ band.summary }}
        </p>

        <div v-if="gaps.length > 0" class="mb-10">
          <h2 class="text-xl font-bold text-text-white mb-4 font-heading">
            Gaps flagged — and how Eurobase covers each one
          </h2>
          <div class="space-y-6">
            <div
              v-for="{ question: q } in gaps"
              :key="q.id"
              class="rounded-lg bg-white/5 border border-white/10 p-5"
            >
              <p class="text-xs uppercase tracking-wider text-accent-gold font-semibold mb-2">
                {{ q.category }}
              </p>
              <h3 class="text-base font-semibold text-text-white mb-3">{{ q.question }}</h3>
              <p class="text-sm text-text-light leading-relaxed mb-3">
                <span class="font-semibold text-accent-blue">How Eurobase handles it:</span>
                {{ q.eurobaseCovers }}
              </p>
              <RouterLink
                v-if="q.learnMoreHref"
                :to="q.learnMoreHref"
                class="inline-flex items-center gap-1 text-sm text-accent-blue hover:text-accent-blue/80 transition-colors"
              >
                {{ q.learnMoreLabel ?? 'Learn more' }} →
              </RouterLink>
            </div>
          </div>
        </div>

        <div v-else class="mb-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-5 text-emerald-100">
          <p class="font-semibold mb-1">Nothing flagged.</p>
          <p class="text-sm leading-relaxed">
            Every answer scored in the "good" range. If you're building on a US-headquartered provider today, the residency / jurisdiction split (questions 1 and 2) is worth a separate look regardless of your score.
          </p>
        </div>

        <div class="rounded-lg bg-accent-blue/10 border border-accent-blue/30 p-6 mb-8">
          <h2 class="text-xl font-bold text-text-white mb-2 font-heading">
            Building on Eurobase closes most of these gaps automatically
          </h2>
          <p class="text-sm text-text-light leading-relaxed mb-4">
            Every project ships with Article 30 RoPA generation, one-click DSAR export, a hash-chained audit log, and EU-only sub-processors — regardless of tier. Free is genuinely free; Pro is €19/mo per project.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              href="https://console.eurobase.app/login?signup=1"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-5 py-3 transition-colors"
            >
              Sign up free →
            </a>
            <a
              :href="mailtoHref"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 hover:border-white/40 text-text-white font-semibold px-5 py-3 transition-colors"
            >
              Email me this report
            </a>
          </div>
        </div>

        <button
          @click="restart"
          class="text-sm text-text-light/70 hover:text-text-light transition-colors"
        >
          ← Take the assessment again
        </button>
      </div>
    </section>
  </main>
</template>
