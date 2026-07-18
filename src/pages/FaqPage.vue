<script setup lang="ts">
import { ref, onMounted, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { faq, faqCategoryOrder } from '@/data/faq'

const route = useRoute()

// Group entries by category, preserving faqCategoryOrder.
const grouped = faqCategoryOrder.map(cat => ({
  category: cat,
  entries: faq.filter(f => f.category === cat),
}))

// Track which panels are open. On mount, open the panel whose id
// matches the URL hash (so /faq#supabase-eu-alternative renders with
// that answer already expanded).
const open = ref<Record<string, boolean>>({})

function toggle(id: string) {
  open.value = { ...open.value, [id]: !open.value[id] }
}

onMounted(() => {
  const hash = route.hash.replace(/^#/, '')
  if (hash) open.value = { ...open.value, [hash]: true }
})

// ── SEO: per-page head + FAQPage JSON-LD ────────────────────────
// Same pattern as BlogPostPage / ComparisonPage. Sets title +
// description + canonical, then emits FAQPage schema rendered from
// the same `faq` array the page shows (with HTML stripped for schema
// text, which Google's rich-result validator prefers).

const SITE_ORIGIN = 'https://eurobase.app'
const PAGE_TITLE = 'FAQ — Eurobase (EU-sovereign backend)'
const PAGE_DESC =
  'Frequently asked questions about Eurobase: GDPR, CLOUD Act, Supabase and Firebase comparison, pricing, migration, MCP server, auth methods, and the closed beta.'
const PAGE_URL = `${SITE_ORIGIN}/faq`

function findOrCreateMeta(attr: 'name' | 'property', key: string): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  return el
}
function findOrCreateLink(rel: string): HTMLLinkElement {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  return el
}
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

let saved: Record<string, string | null> | null = null
let jsonLdEl: HTMLScriptElement | null = null

watchEffect(() => {
  const tags: Array<[string, 'name' | 'property', string]> = [
    [PAGE_DESC, 'name', 'description'],
    [PAGE_TITLE, 'property', 'og:title'],
    [PAGE_DESC, 'property', 'og:description'],
    [PAGE_URL, 'property', 'og:url'],
    ['website', 'property', 'og:type'],
    [PAGE_TITLE, 'name', 'twitter:title'],
    [PAGE_DESC, 'name', 'twitter:description'],
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

  document.title = PAGE_TITLE
  for (const [value, attr, key] of tags) {
    findOrCreateMeta(attr, key).setAttribute('content', value)
  }
  findOrCreateLink('canonical').setAttribute('href', PAGE_URL)

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(f.answer) },
    })),
  }
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script')
    jsonLdEl.setAttribute('type', 'application/ld+json')
    jsonLdEl.setAttribute('data-faq-page', 'true')
    document.head.appendChild(jsonLdEl)
  }
  jsonLdEl.textContent = JSON.stringify(ld)
})

onBeforeUnmount(() => {
  if (saved) {
    document.title = saved.title ?? ''
    const snapshot = saved
    document.head.querySelectorAll<HTMLMetaElement>('meta').forEach(el => {
      const key = el.getAttribute('property')
        ? `property:${el.getAttribute('property')}`
        : `name:${el.getAttribute('name')}`
      if (!(key in snapshot)) return
      const original = snapshot[key]
      if (original == null) el.remove()
      else el.setAttribute('content', original)
    })
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      const originalHref = snapshot['link:canonical']
      if (originalHref == null) canonical.remove()
      else canonical.setAttribute('href', originalHref)
    }
    saved = null
  }
  if (jsonLdEl) {
    jsonLdEl.remove()
    jsonLdEl = null
  }
})
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <!-- Hero -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <RouterLink to="/" class="text-accent-blue text-sm hover:underline mb-6 inline-block">&larr; Back to home</RouterLink>
      <h1 class="text-4xl md:text-5xl font-bold text-text-white mb-4 font-heading leading-tight">
        Frequently asked questions
      </h1>
      <p class="text-xl text-accent-gold max-w-2xl">
        Sovereignty, GDPR, migrations, pricing, the closed beta — the answers most visitors ask before signing up.
      </p>
    </section>

    <!-- Grouped Q&A -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <section
        v-for="group in grouped"
        :key="group.category"
      >
        <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">{{ group.category }}</h2>
        <ul class="space-y-3">
          <li
            v-for="entry in group.entries"
            :key="entry.id"
            :id="entry.id"
            class="bg-navy-card rounded-lg border border-navy-light overflow-hidden"
          >
            <button
              type="button"
              class="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-navy-light/20 transition-colors cursor-pointer"
              :aria-expanded="!!open[entry.id]"
              :aria-controls="`ans-${entry.id}`"
              @click="toggle(entry.id)"
            >
              <span class="text-text-white font-semibold text-base leading-snug">
                {{ entry.question }}
              </span>
              <span
                class="text-accent-blue flex-shrink-0 mt-1 transition-transform"
                :class="open[entry.id] ? 'rotate-180' : ''"
                aria-hidden="true"
              >
                &#9662;
              </span>
            </button>
            <div
              v-if="open[entry.id]"
              :id="`ans-${entry.id}`"
              class="px-5 pb-5 pt-1 border-t border-navy-light/50 text-text-light text-sm leading-relaxed"
              v-html="entry.answer"
            />
          </li>
        </ul>
      </section>
    </div>

    <!-- CTA -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
      <h2 class="text-3xl font-bold text-text-white mb-4 font-heading">Still have a question?</h2>
      <p class="text-text-light mb-8 max-w-xl mx-auto">
        The founder reads every reply. Ping <a href="mailto:founders@eurobase.app" class="text-accent-blue hover:underline">founders@eurobase.app</a>
        or request beta access below.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/#cta" class="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent-blue hover:bg-accent-blue-hover text-white font-semibold transition-colors">
          Get Started Free
        </a>
        <a href="mailto:founders@eurobase.app" class="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-navy-light text-text-light hover:text-text-white hover:border-text-muted transition-colors">
          Talk to the Founders
        </a>
      </div>
    </section>
  </main>
</template>
