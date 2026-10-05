<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { dsar } from '@/data/content'
import StatCard from '@/components/ui/StatCard.vue'

const SITE_ORIGIN = 'https://eurobase.app'
const PAGE_URL = `${SITE_ORIGIN}/features/dsar`
const PAGE_TITLE = 'Automated DSAR for SaaS — GDPR Article 15 + 20 in one click | Eurobase'
const PAGE_DESCRIPTION = 'One-click DSAR exports built into every Eurobase project. Article 15 (subject access) and Article 20 (data portability). Audit-trailed, EU-sovereign on Scaleway, no middleware to maintain.'

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

onMounted(() => {
  const tags: Array<[string, 'name' | 'property', string]> = [
    [PAGE_DESCRIPTION, 'name', 'description'],
    [PAGE_TITLE, 'property', 'og:title'],
    [PAGE_DESCRIPTION, 'property', 'og:description'],
    [PAGE_URL, 'property', 'og:url'],
    ['website', 'property', 'og:type'],
    [PAGE_TITLE, 'name', 'twitter:title'],
    [PAGE_DESCRIPTION, 'name', 'twitter:description'],
  ]

  saved = { title: document.title }
  for (const [, attr, key] of tags) {
    const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    saved[`${attr}:${key}`] = el ? el.getAttribute('content') : null
  }
  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  saved['link:canonical'] = canonical ? canonical.getAttribute('href') : null

  document.title = PAGE_TITLE
  for (const [value, attr, key] of tags) {
    findOrCreateMeta(attr, key).setAttribute('content', value)
  }
  findOrCreateLink('canonical').setAttribute('href', PAGE_URL)

  // Page-scoped JSON-LD — gives the DSAR feature its own rich-result hook.
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Eurobase',
      applicationCategory: 'DeveloperApplication',
      featureList: [
        'Automated DSAR exports (GDPR Article 15 + 20)',
        'Article 30 records-of-processing report',
        'Tamper-evident audit log (hash chain)',
        'Per-project sub-processor registry',
        'EU-sovereign infrastructure (Scaleway, France)',
      ],
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
        { '@type': 'ListItem', position: 2, name: 'Features', item: `${SITE_ORIGIN}/features/dsar` },
        { '@type': 'ListItem', position: 3, name: 'Automated DSAR', item: PAGE_URL },
      ],
    },
  }
  jsonLdEl = document.createElement('script')
  jsonLdEl.setAttribute('type', 'application/ld+json')
  jsonLdEl.setAttribute('data-dsar-feature-page', 'true')
  jsonLdEl.textContent = JSON.stringify(ld)
  document.head.appendChild(jsonLdEl)
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
  <main class="pt-24 pb-16 bg-paper min-h-screen">
    <!-- Hero -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <RouterLink to="/" class="text-amber-ink text-sm hover:underline mb-6 inline-block">
        &larr; Back to home
      </RouterLink>
      <p class="text-amber-ink font-semibold text-xs uppercase tracking-wider mb-3">
        Feature · {{ dsar.subtitle }}
      </p>
      <h1 class="text-4xl md:text-5xl font-bold text-ink mb-4 font-heading leading-tight">
        {{ dsar.headline }}
      </h1>
      <p class="text-lg text-slate leading-relaxed max-w-3xl">
        {{ dsar.description }}
      </p>
    </section>

    <!-- Cost -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex items-baseline gap-3 mb-2">
        <span class="text-red-ink font-semibold text-xs uppercase tracking-wider">The Cost</span>
        <h2 class="text-ink font-bold text-2xl font-heading">{{ dsar.cost.title }}</h2>
      </div>
      <p class="text-slate mb-6 max-w-3xl">{{ dsar.cost.description }}</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          v-for="stat in dsar.cost.stats"
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
          :detail="stat.detail"
          :color="stat.color"
          :footnote="stat.footnote"
        />
      </div>
      <p class="text-xs text-slate mt-4">
        <sup>[{{ dsar.cost.footnoteSource.id }}]</sup>
        <a :href="dsar.cost.footnoteSource.url" class="hover:text-amber-ink underline ml-1">
          {{ dsar.cost.footnoteSource.text }}
        </a>
      </p>
    </section>

    <!-- Gap -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex items-baseline gap-3 mb-2">
        <span class="text-amber-ink font-semibold text-xs uppercase tracking-wider">The Gap</span>
        <h2 class="text-ink font-bold text-2xl font-heading">{{ dsar.gap.title }}</h2>
      </div>
      <p class="text-slate mb-6 max-w-3xl">{{ dsar.gap.description }}</p>
      <div class="rounded-lg bg-mist overflow-hidden border border-line">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-line/40">
              <th class="text-left text-slate font-semibold px-4 py-3 w-1/4">Platform</th>
              <th class="text-left text-slate font-semibold px-4 py-3 w-1/3">Built-in DSAR?</th>
              <th class="text-left text-slate font-semibold px-4 py-3">What you do instead</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in dsar.gap.rows"
              :key="row.name"
              :class="[
                i % 2 ? 'bg-line/30' : '',
                row.supported ? 'bg-green-ink/5' : '',
              ]"
            >
              <td class="px-4 py-3 font-medium border-t border-line"
                :class="row.supported ? 'text-green-ink' : 'text-ink'"
              >
                {{ row.name }}
              </td>
              <td class="px-4 py-3 border-t border-line"
                :class="row.supported ? 'text-green-ink font-semibold' : 'text-red-ink'"
              >
                <span class="mr-2">{{ row.supported ? '✓' : '✗' }}</span>{{ row.status }}
              </td>
              <td class="px-4 py-3 text-slate border-t border-line">{{ row.detail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Solution -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex items-baseline gap-3 mb-2">
        <span class="text-amber-ink font-semibold text-xs uppercase tracking-wider">The Answer</span>
        <h2 class="text-ink font-bold text-2xl font-heading">{{ dsar.solution.title }}</h2>
      </div>
      <p class="text-slate mb-6 max-w-3xl">{{ dsar.solution.description }}</p>
      <div class="grid md:grid-cols-2 gap-5">
        <div
          v-for="bullet in dsar.solution.bullets"
          :key="bullet.title"
          class="relative rounded-lg bg-mist overflow-hidden"
        >
          <div class="absolute left-0 top-0 w-1 h-full bg-amber" />
          <div class="p-6 flex gap-3">
            <span class="text-amber-ink text-lg leading-none mt-0.5">✓</span>
            <div>
              <p class="text-ink font-semibold mb-1">{{ bullet.title }}</p>
              <p class="text-slate text-sm leading-relaxed">{{ bullet.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API surface -->
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <h2 class="text-ink font-bold text-2xl font-heading mb-4">In code</h2>
      <p class="text-slate mb-6 max-w-3xl">
        End-users can self-serve. Operators can trigger a per-user or full-project export from the console or the platform API. All paths are audit-logged.
      </p>
      <div class="rounded-lg bg-mist border border-line overflow-hidden">
        <pre class="p-6 text-sm text-slate leading-relaxed overflow-x-auto"><code>// Article 15 — end-user exports their own data via the SDK
const { data: req } = await eb.auth.exportMyData('json')

// Article 20 — operator triggers a per-user export (single subject)
POST /platform/projects/{id}/compliance/exports/user
  { "user_id": "..." }

// Article 20 — operator triggers a full-project export (every table + auth + storage)
POST /platform/projects/{id}/compliance/exports</code></pre>
      </div>
    </section>

    <!-- CTA -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-ink mb-4 font-heading">Built in. Audit-trailed. EU-only.</h2>
      <p class="text-slate mb-8 max-w-xl mx-auto">
        Sign up in a minute and stop hand-rolling DSAR responses the fortnight before launch.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://console.eurobase.app/login?signup=1"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-amber hover:bg-amber-hover text-ink font-semibold transition-colors"
        >
          Sign up free
        </a>
        <RouterLink
          to="/blog/compliance-tab-dsar-ropa-audit-log"
          class="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-line text-slate hover:text-ink hover:border-slate transition-colors"
        >
          Read: The $1,500 GDPR Tax
        </RouterLink>
      </div>
    </section>
  </main>
</template>
