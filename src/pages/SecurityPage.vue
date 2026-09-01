<script setup lang="ts">
import { watchEffect, onBeforeUnmount } from 'vue'
import { legalDocsBase, germanLegalTechDocs } from '@/data/legalStrings'

// Static page — same SEO / head-management pattern as LegalNoticePage
// and FaqPage. Sets a per-page title, description, canonical, OG /
// Twitter cards, and a schema.org WebPage + Article JSON-LD blob
// pointing at the ISMS.

const SITE_ORIGIN = 'https://eurobase.app'
// Title keeps "vulnerability disclosure" because .well-known/
// security.txt (RFC 9116) publishes /security as the CVD policy URL
// — dropping the phrase would leave researchers landing on a tab
// titled "German legal-tech" with no CVD indication, and Google
// tends to rewrite a title back to the H1 when the two diverge.
const PAGE_TITLE = 'Security, vulnerability disclosure & German legal-tech — Eurobase'
// Kept ≤160 chars (Google SERP cap ~155-160, social cards cut ~200)
// with dossier keywords in the first half so the audience this
// targets sees them in the truncated preview. Long-form goes into
// PAGE_DESC_LONG below for the JSON-LD Article node.
const PAGE_DESC =
  'Eurobase security & German legal-tech dossier: BSI C5 roadmap, ISO 27001 SoA, IT-Grundschutz, NIS2 + AI Act positioning, CVD policy, sub-processor list.'
const PAGE_DESC_LONG =
  'How Eurobase secures customer data: sub-processor list, encryption, incident-response SLAs, Coordinated Vulnerability Disclosure policy, ISMS-lite aligned to NIS2 Article 21 and GDPR Article 32. German legal-tech dossier: BSI C5 roadmap, ISO 27001 SoA, IT-Grundschutz self-declaration, NIS2 + AI Act positioning.'
const PAGE_URL = `${SITE_ORIGIN}/security`

// Bumped for the #316 legal-tech dossier addition so crawlers
// re-index. Keep in sync with public/sitemap.xml's <lastmod> for
// /security.
const PAGE_MODIFIED = '2026-08-10'

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
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': PAGE_URL,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESC,
        inLanguage: 'en',
      },
      {
        '@type': 'Article',
        headline: 'Eurobase security & German legal-tech dossier',
        description: PAGE_DESC_LONG,
        datePublished: '2026-07-22',
        dateModified: PAGE_MODIFIED,
        author: {
          '@type': 'Organization',
          name: 'Eurobase',
        },
      },
    ],
  }
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script')
    jsonLdEl.setAttribute('type', 'application/ld+json')
    jsonLdEl.setAttribute('data-security-page', 'true')
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

// NIS2 Article 21 control matrix — declaratively rendered from the
// same source of truth as the ISMS-lite so a copy edit is one place.
interface Nis2Row {
  id: string
  requirement: string
  status: 'shipped' | 'partial' | 'roadmap'
  notes: string
}
const nis2Rows: Nis2Row[] = [
  { id: 'a', requirement: 'Risk analysis + information system security policies', status: 'shipped', notes: 'Written ISMS-lite; risk register reviewed annually.' },
  { id: 'b', requirement: 'Incident handling', status: 'shipped', notes: 'Console-side data-breach register with 24h / 72h SLA workflow; internal on-call rota + runbooks.' },
  { id: 'c', requirement: 'Business continuity + crisis management', status: 'shipped', notes: 'Documented RTO/RPO; hourly Postgres backups + nightly cross-region snapshot; quarterly DR drill.' },
  { id: 'd', requirement: 'Supply-chain security', status: 'shipped', notes: 'Public sub-processor register with region + CLOUD-Act flags; 30-day advance notice on additions.' },
  { id: 'e', requirement: 'Security in acquisition, development, maintenance + vulnerability handling', status: 'shipped', notes: 'Dependabot, static analysis, mandatory PR review, staged rollouts; CVD policy below.' },
  { id: 'f', requirement: 'Policies to assess effectiveness of the risk-management measures', status: 'partial', notes: 'Annual ISMS review + post-incident review formalised; independent audit deferred to ISO 27001 track.' },
  { id: 'g', requirement: 'Basic cyber hygiene practices + cybersecurity training', status: 'shipped', notes: 'Applies at hiring; formalised in HR-security section of the ISMS.' },
  { id: 'h', requirement: 'Cryptography and encryption policies', status: 'shipped', notes: 'TLS 1.3 in transit; AES-256 at rest; AES-256-GCM vault; HMAC-SHA256 signing with domain separation.' },
  { id: 'i', requirement: 'HR security, access control, asset management', status: 'shipped', notes: 'Six-role Postgres split; per-tenant role isolation; PATs with expiry; superadmin flag not self-servable.' },
  { id: 'j', requirement: 'Multi-factor authentication, secured comms, secured internal systems', status: 'roadmap', notes: 'Platform TOTP + WebAuthn planned for Team tier (Q4 2026). Tenant end-user MFA via OAuth today.' },
]
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Hero -->
      <section class="mb-16">
        <RouterLink to="/" class="text-accent-blue text-sm hover:underline mb-6 inline-block">&larr; Back to home</RouterLink>
        <h1 class="text-4xl md:text-5xl font-bold text-text-white mb-4 font-heading leading-tight">Security, vulnerability disclosure &amp; German legal-tech</h1>
        <p class="text-xl text-accent-gold max-w-3xl">
          How we secure the platform, where our controls sit against EU NIS2 Article 21 and GDPR Article 32, how to responsibly report a security issue, and the dated <RouterLink :to="{ hash: '#de-legaltech' }" class="text-accent-gold underline underline-offset-4 hover:text-accent-blue">German legal-tech dossier</RouterLink> (BSI C5 / ISO 27001 / IT-Grundschutz / NIS2 / AI Act).
        </p>
      </section>

      <!-- TL;DR -->
      <section class="mb-16">
        <div class="bg-accent-blue/5 border border-accent-blue/30 rounded-xl p-6">
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">TL;DR</h2>
          <ul class="space-y-2 text-text-light text-sm">
            <li class="flex gap-2"><span class="text-accent-blue">▸</span> All customer data lives on Scaleway <strong>fr-par</strong> (Paris, France). No US-owned processor in the critical path.</li>
            <li class="flex gap-2"><span class="text-accent-blue">▸</span> Corporate parent is <strong>Eurobase OÜ</strong> (Estonian commercial-register code 17557586). No US corporate parent means no CLOUD Act or FISA §702 reach.</li>
            <li class="flex gap-2"><span class="text-accent-blue">▸</span> Encryption in transit is TLS 1.3; at rest is AES-256; secrets vault is AES-256-GCM per-tenant; signing is HMAC-SHA256 with domain separation.</li>
            <li class="flex gap-2"><span class="text-accent-blue">▸</span> Data-breach and cyber-incident SLAs align with GDPR Article 33 and NIS2 Article 23 — 24 h early warning, 72 h notification, 1-month final report.</li>
            <li class="flex gap-2"><span class="text-accent-blue">▸</span> Written ISMS-lite governs the platform — <a href="https://github.com/STGime/euroback/blob/main/docs/legal/v2/isms.md" target="_blank" rel="noopener" class="text-accent-blue hover:underline">public, versioned</a>.</li>
            <li class="flex gap-2"><span class="text-accent-blue">▸</span> Report a security issue: <a href="mailto:security@eurobase.app" class="text-accent-blue hover:underline">security@eurobase.app</a> — response within 3 business days.</li>
          </ul>
        </div>
      </section>

      <!-- NIS2 & scope -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">NIS2 &amp; regulatory posture</h2>
        <p class="text-text-light leading-relaxed mb-4">
          Eurobase OÜ is currently below the size threshold for direct NIS2 applicability (fewer than 50 employees AND less than €10&nbsp;M annual turnover). Cloud computing service providers of our size are, per Article 2(1), not directly obligated entities under NIS2. We adopt the controls anyway because our customers do rely on us at that standard.
        </p>
        <p class="text-text-light leading-relaxed mb-4">
          When Eurobase crosses the threshold, we will register with the Estonian national CSIRT (<a href="https://ria.ee/en" target="_blank" rel="noopener" class="text-accent-blue hover:underline">RIA</a> / CERT-EE) and issue an updated ISMS reflecting our new status as an important entity.
        </p>
        <p class="text-text-light leading-relaxed mb-4">
          GDPR compliance is not conditional on the size threshold. GDPR Articles 32 (security of processing) and 33 (breach notification) apply from day one, and are governed by our published <a href="/legal" class="text-accent-blue hover:underline">Privacy Policy</a>, <a href="/faq" class="text-accent-blue hover:underline">FAQ</a>, and DPA.
        </p>
        <p class="text-text-light leading-relaxed">
          German legal-tech / Steuerberater / regulated-industry customers: see the <RouterLink :to="{ hash: '#de-legaltech' }" class="text-accent-blue hover:underline">German legal-tech dossier</RouterLink> for BSI C5 / ISO 27001 / IT-Grundschutz / NIS2 / AI Act positioning.
        </p>
      </section>

      <!-- NIS2 Article 21 matrix -->
      <section id="nis2-matrix" class="mb-16 scroll-mt-20">
        <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">NIS2 Article 21 control matrix</h2>
        <p class="text-text-light leading-relaxed mb-6">
          The ten risk-management measures required by Article 21(2). Status reflects the platform as of the ISMS effective date — 22 July 2026.
        </p>
        <div class="overflow-x-auto rounded-lg border border-navy-light">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-navy-light/50">
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-12">§</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-72">Requirement</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-24">Status</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in nis2Rows" :key="row.id" class="border-t border-navy-light/30">
                <td class="px-4 py-3 text-text-muted font-mono text-xs">(2)({{ row.id }})</td>
                <td class="px-4 py-3 text-text-white font-medium">{{ row.requirement }}</td>
                <td class="px-4 py-3">
                  <span
                    v-if="row.status === 'shipped'"
                    class="inline-block rounded-full bg-accent-green/15 text-accent-green text-[11px] uppercase tracking-wide font-semibold px-2 py-0.5"
                  >Shipped</span>
                  <span
                    v-else-if="row.status === 'partial'"
                    class="inline-block rounded-full bg-accent-blue/15 text-accent-blue text-[11px] uppercase tracking-wide font-semibold px-2 py-0.5"
                  >Partial</span>
                  <span
                    v-else
                    class="inline-block rounded-full bg-amber-500/15 text-amber-300 text-[11px] uppercase tracking-wide font-semibold px-2 py-0.5"
                  >Roadmap</span>
                </td>
                <td class="px-4 py-3 text-text-light">{{ row.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Encryption -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">Encryption</h2>
        <div class="overflow-x-auto rounded-lg border border-navy-light">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-navy-light/50">
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-60">Surface</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3">Algorithm</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody class="text-text-light">
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Data in transit — all HTTP</td><td class="px-4 py-3">TLS 1.3 (1.2 fallback)</td><td class="px-4 py-3">HSTS 1-year max-age.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Data at rest — Postgres</td><td class="px-4 py-3">AES-256</td><td class="px-4 py-3">Scaleway managed disk encryption.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Data at rest — Object storage</td><td class="px-4 py-3">AES-256 (SSE-S3)</td><td class="px-4 py-3">Scaleway managed.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Vault secrets</td><td class="px-4 py-3">AES-256-GCM, per-tenant key</td><td class="px-4 py-3">Application-layer envelope; key rotated per major release.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">JWT session tokens</td><td class="px-4 py-3">HMAC-SHA256</td><td class="px-4 py-3">Kubernetes Secret; never logged.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Webhook signing</td><td class="px-4 py-3">HMAC-SHA256</td><td class="px-4 py-3">Per-webhook secret; timestamp in signed payload for replay protection.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Unsubscribe tokens</td><td class="px-4 py-3">HMAC-SHA256</td><td class="px-4 py-3">Domain-separated from JWT via SHA-256 derivation.</td></tr>
              <tr class="border-t border-navy-light/30"><td class="px-4 py-3 font-medium text-text-white">Password storage</td><td class="px-4 py-3">bcrypt cost 12</td><td class="px-4 py-3">Platform + tenant end-user passwords alike.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Incident SLAs -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">Incident-response SLAs</h2>
        <p class="text-text-light leading-relaxed mb-4">
          Aligned with GDPR Article 33 and NIS2 Article 23. Timing is measured from the moment Eurobase becomes aware of the incident.
        </p>
        <ul class="space-y-3 text-text-light leading-relaxed">
          <li class="flex gap-3"><span class="text-accent-blue font-mono text-sm mt-1 min-w-16">6 h</span><span><strong>Internal early warning.</strong> Incident opened; on-call founder acknowledges.</span></li>
          <li class="flex gap-3"><span class="text-accent-blue font-mono text-sm mt-1 min-w-16">24 h</span><span><strong>Customer early warning.</strong> Notice that a significant incident has occurred, where customer-facing impact is suspected.</span></li>
          <li class="flex gap-3"><span class="text-accent-blue font-mono text-sm mt-1 min-w-16">72 h</span><span><strong>Formal incident notification.</strong> Notice to affected customers with initial assessment and known-facts summary. Regulatory notification when GDPR Article 33 thresholds are met — to the Estonian Data Protection Inspectorate (<em>Andmekaitse Inspektsioon</em>).</span></li>
          <li class="flex gap-3"><span class="text-accent-blue font-mono text-sm mt-1 min-w-16">30 d</span><span><strong>Final report.</strong> Root cause, corrective actions, lessons learned. Anonymised post-mortem published on <a href="/#blog" class="text-accent-blue hover:underline">/blog</a> if impact was material.</span></li>
        </ul>
      </section>

      <!-- CVD -->
      <section id="cvd" class="mb-16 scroll-mt-20">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">Coordinated Vulnerability Disclosure</h2>
        <p class="text-text-light leading-relaxed mb-4">
          If you believe you have found a security vulnerability in the Eurobase platform, please report it to <a href="mailto:security@eurobase.app" class="text-accent-blue hover:underline">security@eurobase.app</a>.
        </p>
        <p class="text-text-light leading-relaxed mb-4">
          <strong>What to include:</strong> a description of the issue, the affected surface (URL, API endpoint, CLI command, etc.), reproduction steps, and any suggested mitigation. Attach proof-of-concept material as needed.
        </p>
        <p class="text-text-light leading-relaxed mb-4">
          <strong>Our commitments:</strong>
        </p>
        <ul class="space-y-2 text-text-light leading-relaxed list-disc list-inside mb-4">
          <li>Acknowledgement of receipt within 3 business days.</li>
          <li>Initial assessment within 10 business days.</li>
          <li>Fix or documented mitigation within 90 days of confirmation for high/critical; 180 days for medium.</li>
          <li>Public disclosure coordinated with the reporter.</li>
          <li>Public credit for the reporter, on request.</li>
          <li>No legal action against good-faith researchers who follow this policy.</li>
        </ul>
        <p class="text-text-light leading-relaxed mb-4">
          <strong>Please do not:</strong>
        </p>
        <ul class="space-y-2 text-text-light leading-relaxed list-disc list-inside">
          <li>Access, modify, or delete data belonging to other customers.</li>
          <li>Conduct denial-of-service testing without prior written consent.</li>
          <li>Publicly disclose the vulnerability before an agreed coordination window.</li>
          <li>Use social engineering against Eurobase staff or contractors.</li>
        </ul>
        <p class="text-text-light leading-relaxed mt-4">
          Machine-readable pointer at <a href="/.well-known/security.txt" class="text-accent-blue hover:underline"><code class="text-accent-gold">/.well-known/security.txt</code></a> (RFC 9116).
        </p>
      </section>

      <!-- ISMS -->
      <section id="isms" class="mb-16 scroll-mt-20">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">ISMS-lite</h2>
        <p class="text-text-light leading-relaxed mb-4">
          The full written Information Security Management System is public and versioned in the Eurobase source repository:
        </p>
        <p class="mb-4">
          <a href="https://github.com/STGime/euroback/blob/main/docs/legal/v2/isms.md" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-lg bg-navy-light/30 hover:bg-navy-light/60 border border-navy-light px-4 py-2 text-text-white text-sm transition-colors">
            <span>📄</span>
            <span><code class="text-accent-gold">docs/legal/v2/isms.md</code></span>
            <span class="text-accent-blue">→</span>
          </a>
        </p>
        <p class="text-text-light leading-relaxed">
          Reviewed annually and after every significant incident. Version 2.0, effective 22 July 2026, approved by the sole board member of Eurobase OÜ.
        </p>
      </section>

      <!-- German legal-tech (#316) — data-driven from legalStrings so
           a doc added / removed can't leave the "five documents" prose
           lying. scroll-mt-20 keeps the H2 clear of the fixed 64px
           navbar when arrived at via #de-legaltech. -->
      <section id="de-legaltech" class="mb-16 scroll-mt-20">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">German legal-tech</h2>
        <ul class="space-y-3 text-text-light mb-6">
          <li v-for="doc in germanLegalTechDocs.dossier" :key="doc.slug" class="flex gap-2">
            <span class="text-accent-blue shrink-0">▸</span>
            <span>
              <a :href="`${legalDocsBase}/${doc.slug}`" target="_blank" rel="noopener" class="text-accent-blue hover:underline">{{ doc.label }}</a>
              — {{ doc.note }}
            </span>
          </li>
        </ul>
        <h3 class="text-lg font-semibold text-text-white mb-2 mt-6">Legal Team tier backing docs</h3>
        <ul class="space-y-3 text-text-light mb-6">
          <li v-for="doc in germanLegalTechDocs.backing" :key="doc.slug" class="flex gap-2">
            <span class="text-accent-blue shrink-0">▸</span>
            <span>
              <a :href="`${legalDocsBase}/${doc.slug}`" target="_blank" rel="noopener" class="text-accent-blue hover:underline">{{ doc.label }}</a>
              — {{ doc.note }}
            </span>
          </li>
        </ul>
      </section>

      <!-- Sub-processors + related -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-4 font-heading">Related documents</h2>
        <ul class="space-y-3 text-text-light">
          <li>▸ <a href="/legal" class="text-accent-blue hover:underline">Legal notice</a> — company details published under Estonian ISTS §4.</li>
          <li>▸ <a href="/privacy" class="text-accent-blue hover:underline">Privacy policy</a> — GDPR notice, sub-processor list, DSAR contact.</li>
          <li>▸ <a href="/terms" class="text-accent-blue hover:underline">Terms &amp; conditions</a>.</li>
          <li>▸ <a href="/features/dsar" class="text-accent-blue hover:underline">One-click DSAR</a> — how the export works.</li>
          <li>▸ <a href="/faq" class="text-accent-blue hover:underline">FAQ</a> — sovereignty, migration, GDPR questions.</li>
        </ul>
      </section>

    </article>
  </main>
</template>
