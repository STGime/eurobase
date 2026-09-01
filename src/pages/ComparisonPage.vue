<script setup lang="ts">
import { computed, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { comparisons } from '@/data/comparisons'

const route = useRoute()
const comparison = computed(() => comparisons[route.params.slug as string])

// ── SEO: per-comparison head management ─────────────────────────────────────
// Same shape as BlogPostPage.vue. Without this the /vs/* routes inherit
// index.html's homepage title + description, so Google indexes every
// comparison under one meta pair and rank suffers (Search Console showed
// avg position 10 for "supabase eu*" queries — see the SEO audit). With
// this each comparison advertises its own title, description, canonical,
// OG/Twitter cards, plus a schema.org WebPage + FAQPage JSON-LD blob so
// Google can render rich results.

const SITE_ORIGIN = 'https://eurobase.app'

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

let saved: Record<string, string | null> | null = null
let jsonLdEl: HTMLScriptElement | null = null

watchEffect(() => {
  const c = comparison.value
  if (!c) return

  const url = `${SITE_ORIGIN}/vs/${c.slug}`
  const image = `${SITE_ORIGIN}/og-image.png`
  const title = c.metaTitle
  const description = c.metaDescription

  const tags: Array<[string, 'name' | 'property', string]> = [
    [description, 'name', 'description'],
    [title, 'property', 'og:title'],
    [description, 'property', 'og:description'],
    [url, 'property', 'og:url'],
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
  findOrCreateLink('canonical').setAttribute('href', url)

  // WebPage + FAQPage schema. FAQPage answers the highest-intent
  // Search Console queries directly ("supabase eu alternative",
  // "supabase gdpr dpa eu region official") so Google can render
  // an FAQ rich result under the /vs/* link. When the comparison
  // ships an `faqs` array we source from that (single source of
  // truth with the visible FAQ section); otherwise we fall back to
  // a generic set so existing comparisons (firebase) still emit
  // schema.
  const faqEntities = (c.faqs && c.faqs.length > 0
    ? c.faqs
    : [
        {
          question: `Is ${c.competitor} GDPR-compliant?`,
          answer: `${c.competitor} offers a DPA and EU region options, but as a US-headquartered company using US-owned infrastructure it remains subject to the CLOUD Act and FISA §702. That means US authorities can compel data access even for EU-region deployments. Eurobase removes this exposure by using an Estonian corporate parent and Scaleway (France) infrastructure exclusively.`,
        },
        {
          question: `Can I migrate from ${c.competitor} to Eurobase?`,
          answer: `Yes. The Eurobase CLI ships eurobase import ${c.slug} with subcommands for schema, data, storage, and functions. Auth-users import is next. Migrations run against your existing ${c.competitor} project read-only and emit an executable plan.`,
        },
        {
          question: 'Where does Eurobase host my data?',
          answer: 'Scaleway fr-par (Paris, France). Postgres, S3-compatible object storage, and edge functions all run on Scaleway. No AWS, no GCP, no Azure in the critical path.',
        },
        {
          question: 'How much does Eurobase cost?',
          answer: 'Free for personal projects, learning, and development — non-commercial use only (5,000 MAU, 512 MB storage, 2 GB bandwidth, 50 realtime connections). €25/mo per project on Pro for commercial use. A Team tier with dedicated Postgres is €149/mo (coming soon).',
        },
      ]).map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  }))

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        inLanguage: 'en',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Eurobase',
          url: SITE_ORIGIN,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqEntities,
      },
    ],
  }
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script')
    jsonLdEl.setAttribute('type', 'application/ld+json')
    jsonLdEl.setAttribute('data-comparison', 'true')
    document.head.appendChild(jsonLdEl)
  }
  jsonLdEl.textContent = JSON.stringify(ld)
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
    <template v-if="comparison">
      <!-- Hero -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <RouterLink to="/" class="text-accent-blue text-sm hover:underline mb-6 inline-block">&larr; Back to home</RouterLink>
        <h1 class="text-4xl md:text-5xl font-bold text-text-white mb-4 font-heading leading-tight">
          {{ comparison.heroHeadline }}
        </h1>
        <p class="text-xl text-accent-gold max-w-2xl">{{ comparison.heroSubheadline }}</p>
      </section>

      <!-- Context sections -->
      <section v-for="(section, i) in comparison.sections" :key="i" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 class="text-2xl font-bold text-text-white mb-3 font-heading">{{ section.title }}</h2>
        <p class="text-text-light leading-relaxed">{{ section.description }}</p>
        <!-- Optional extra paragraphs (long-form comparisons carry
             multiple to hit depth targets Google needs to move
             /vs/* pages from page 2 to page 1). -->
        <p
          v-for="(para, pi) in section.paragraphs || []"
          :key="`p-${pi}`"
          class="text-text-light leading-relaxed mt-4"
        >
          {{ para }}
        </p>
        <!-- Optional takeaway bullets. Rendered as a simple list so
             the H2 above it can act as a scannable answer for the
             query the section targets. -->
        <ul
          v-if="section.bullets && section.bullets.length"
          class="mt-4 space-y-2"
        >
          <li
            v-for="(bullet, bi) in section.bullets"
            :key="`b-${bi}`"
            class="flex items-start gap-3 text-text-light leading-relaxed"
          >
            <span class="text-accent-blue mt-1 text-xs flex-shrink-0">&#9656;</span>
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </section>

      <!-- Comparison Table -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">Feature comparison</h2>
        <div class="overflow-x-auto rounded-lg border border-navy-light">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-navy-light/50">
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-1/3">Feature</th>
                <th class="text-left text-accent-blue font-semibold px-4 py-3 w-1/3">Eurobase</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-1/3">{{ comparison.competitor }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in comparison.rows"
                :key="i"
                :class="[
                  i % 2 ? 'bg-navy-light/10' : '',
                  row.highlight ? 'bg-accent-blue/5' : '',
                ]"
              >
                <td class="px-4 py-3 text-text-white font-medium border-t border-navy-light/30">{{ row.feature }}</td>
                <td class="px-4 py-3 text-accent-green border-t border-navy-light/30">{{ row.eurobase }}</td>
                <td class="px-4 py-3 text-text-muted border-t border-navy-light/30">{{ row.competitor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sovereignty Section -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="bg-navy-card rounded-xl p-8 border border-navy-light">
          <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">{{ comparison.sovereigntyHeadline }}</h2>
          <ul class="space-y-4">
            <li v-for="(point, i) in comparison.sovereigntyPoints" :key="i" class="flex items-start gap-3">
              <span class="text-accent-blue mt-1 text-xs flex-shrink-0">&#9656;</span>
              <span class="text-text-light leading-relaxed">{{ point }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Visible FAQ — same content as the FAQPage JSON-LD so
           Google sees them aligned. These questions are drawn
           directly from Search Console long-tails ("is supabase
           gdpr compliant", "supabase eu alternative", etc.), so
           each Q&A is both a user answer and a targeted SEO H3. -->
      <section
        v-if="comparison.faqs && comparison.faqs.length"
        class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">
          {{ comparison.competitor }} vs Eurobase — FAQ
        </h2>
        <div class="space-y-6">
          <div
            v-for="(faq, i) in comparison.faqs"
            :key="i"
            class="bg-navy-card rounded-xl p-6 border border-navy-light"
          >
            <h3 class="text-lg font-semibold text-text-white mb-3 font-heading">
              {{ faq.question }}
            </h3>
            <p class="text-text-light leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </section>

      <!-- Related reading — internal links help SEO and give visitors
           the next step in their evaluation journey. -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">Related reading</h2>
        <ul class="space-y-3">
          <li>
            <RouterLink to="/blog/supabase-migration-cli" class="text-accent-blue hover:underline">
              Move off Supabase in one CLI command — what the migrator does and why teams are asking now &rarr;
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/blog/supabase-gdpr-dpa-eu-region" class="text-accent-blue hover:underline">
              Supabase GDPR + DPA: what an EU-region deployment actually gets you &rarr;
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/blog/compliance-tab-dsar-ropa-audit-log" class="text-accent-blue hover:underline">
              The $1,500 GDPR Tax: Why DSAR fulfilment belongs in your platform &rarr;
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/blog/ai-kill-switch-eu-sovereignty" class="text-accent-blue hover:underline">
              The AI kill-switch and the case for EU sovereignty &rarr;
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/features/dsar" class="text-accent-blue hover:underline">
              How the one-click DSAR feature works &rarr;
            </RouterLink>
          </li>
        </ul>
      </section>

      <!-- CTA -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-text-white mb-4 font-heading">{{ comparison.ctaHeadline }}</h2>
        <p class="text-text-light mb-8 max-w-xl mx-auto">{{ comparison.ctaDescription }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#cta" class="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent-blue hover:bg-accent-blue-hover text-white font-semibold transition-colors">
            Get Started Free
          </a>
          <a href="mailto:founders@eurobase.app" class="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-navy-light text-text-light hover:text-text-white hover:border-text-muted transition-colors">
            Talk to the Founders
          </a>
        </div>
      </section>
    </template>

    <!-- Not found -->
    <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
      <h1 class="text-2xl font-bold text-text-white mb-4">Comparison not found</h1>
      <RouterLink to="/" class="text-accent-blue hover:underline">Back to home</RouterLink>
    </div>
  </main>
</template>
