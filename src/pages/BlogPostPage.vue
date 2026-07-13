<script setup lang="ts">
import { computed, watchEffect, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { blog } from '@/data/content'

const route = useRoute()
const post = computed(() => blog.posts.find(p => p.slug === route.params.slug))

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ── SEO: per-post head management ────────────────────────────────────────────
// No @unhead / @vueuse/head installed, so we drive document.head directly.
// Why we bother: without this, every /blog/* route inherits index.html's
// homepage <title> and <meta description> verbatim, so Google indexes every
// post under the same title. With this, each post advertises its own title,
// excerpt, canonical URL, OG/Twitter image, and Article JSON-LD — visible to
// link previews (Slack/X/LinkedIn), to Google's structured-data crawl, and
// to RSS-shaped consumers.
//
// We snapshot the original values of every tag we touch on mount and restore
// them on unmount, so SPA navigation away from a post leaves the rest of the
// site exactly as it was. The JSON-LD <script> is a one we own, so we just
// create / remove it.

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

// Saved on the first watchEffect run so we can restore on unmount.
let saved: Record<string, string | null> | null = null
let jsonLdEl: HTMLScriptElement | null = null

watchEffect(() => {
  const p = post.value
  if (!p) return

  const url = `${SITE_ORIGIN}/blog/${p.slug}`
  const image = p.image ? `${SITE_ORIGIN}${p.image}` : `${SITE_ORIGIN}/og-image.png`
  const title = `${p.title} | Eurobase Blog`
  const description = p.excerpt

  const tags: Array<[string, 'name' | 'property', string]> = [
    [description, 'name', 'description'],
    [title, 'property', 'og:title'],
    [description, 'property', 'og:description'],
    [url, 'property', 'og:url'],
    ['article', 'property', 'og:type'],
    [image, 'property', 'og:image'],
    [p.date, 'property', 'article:published_time'],
    [p.author, 'property', 'article:author'],
    [title, 'name', 'twitter:title'],
    [description, 'name', 'twitter:description'],
    [image, 'name', 'twitter:image'],
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

  // Article structured data — gives Google a rich-result-eligible card.
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.excerpt,
    image,
    datePublished: p.date,
    dateModified: p.date,
    author: { '@type': 'Person', name: p.author },
    publisher: {
      '@type': 'Organization',
      name: 'Eurobase',
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/eurobase-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  if (!jsonLdEl) {
    jsonLdEl = document.createElement('script')
    jsonLdEl.setAttribute('type', 'application/ld+json')
    jsonLdEl.setAttribute('data-blog-post', 'true')
    document.head.appendChild(jsonLdEl)
  }
  jsonLdEl.textContent = JSON.stringify(ld)
})

onBeforeUnmount(() => {
  if (saved) {
    document.title = saved.title ?? ''
    // restore each meta tag's content, or remove tags we created
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

function renderTable(block: string): string {
  const rows = block.trim().split('\n').filter(r => !r.match(/^\|[\s-:|]+\|$/))
  if (rows.length < 1) return block
  const parse = (row: string) => row.split('|').slice(1, -1).map(c => c.trim())
  const headers = parse(rows[0]!)
  const body = rows.slice(1).map(parse)
  return `<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse">
    <thead><tr>${headers.map(h => `<th class="text-left text-text-white font-semibold px-4 py-3 border-b border-navy-light bg-navy-light/30">${h}</th>`).join('')}</tr></thead>
    <tbody>${body.map((row, i) => `<tr class="${i % 2 ? 'bg-navy-light/10' : ''}">${row.map(c => `<td class="px-4 py-2.5 text-text-light border-b border-navy-light/50">${c}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`
}

function renderMarkdown(md: string): string {
  // Handle tables first
  md = md.replace(/((?:^\|.+\|$\n?)+)/gm, (match) => {
    if (match.includes('|---') || match.includes('| ---')) return renderTable(match)
    return match
  })
  return md
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-text-white mt-10 mb-4 font-heading">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-white">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-blue hover:underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-text-light text-sm"><span class="text-accent-blue mt-1 text-xs">&#9656;</span><span>$1</span></li>')
    .replace(/((?:<li[^]*?<\/li>\n?)+)/g, '<ul class="space-y-2 my-4">$1</ul>')
    .replace(/(?:^|\n)(?!<[hulod])((?:.(?!\n\n))+.)/g, (match) => {
      const trimmed = match.trim()
      if (trimmed.startsWith('<')) return match
      return `\n<p class="text-text-light leading-relaxed mb-4">${trimmed}</p>`
    })
}
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <article v-if="post" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <RouterLink to="/#blog" class="text-accent-blue text-sm hover:underline mb-4 inline-block">&larr; Back to blog</RouterLink>
        <h1 class="text-3xl md:text-4xl font-bold text-text-white mb-4 font-heading leading-tight">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-4 text-text-muted text-sm">
          <span>{{ post.author }}</span>
          <span>·</span>
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span>·</span>
          <span>{{ post.readTime }}</span>
        </div>
      </div>

      <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full rounded-lg mb-8" />

      <div class="prose-eurobase" v-html="renderMarkdown(post.content)" />

      <div v-if="post.references.length" class="mt-12 pt-8 border-t border-navy-light">
        <h3 class="text-text-white font-bold text-lg font-heading mb-4">References</h3>
        <ol class="space-y-2">
          <li v-for="(ref, i) in post.references" :key="i" class="text-sm text-text-muted">
            <span class="text-text-light mr-1">[{{ i + 1 }}]</span>
            <a :href="ref.url" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">
              {{ ref.label }}
            </a>
          </li>
        </ol>
      </div>
    </article>

    <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
      <h1 class="text-2xl font-bold text-text-white mb-4">Post not found</h1>
      <RouterLink to="/#blog" class="text-accent-blue hover:underline">Back to blog</RouterLink>
    </div>
  </main>
</template>
