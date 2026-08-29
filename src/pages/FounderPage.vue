<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import FounderSection from '@/components/sections/FounderSection.vue'

const SITE_ORIGIN = 'https://eurobase.app'
const PAGE_URL = `${SITE_ORIGIN}/founder`
const PAGE_TITLE = 'Stefan Gimeson — Founder, Eurobase | Eurobase'
const PAGE_DESCRIPTION = 'Meet Stefan Gimeson, founder of Eurobase OÜ. Seventeen years shipping product across European regulatory environments — now building the sovereign backend platform for Europe.'
const IMAGE_URL = `${SITE_ORIGIN}/founder-stefan.png`

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

// Snapshot of the tags we mutate so onBeforeUnmount can restore them —
// prevents cross-page leakage of the founder-specific title/OG when the
// user navigates back to a page that doesn't manage its own head.
let saved: Record<string, string | null> | null = null

onMounted(() => {
  const tags: Array<[string, 'name' | 'property', string]> = [
    [PAGE_DESCRIPTION, 'name', 'description'],
    [PAGE_TITLE, 'property', 'og:title'],
    [PAGE_DESCRIPTION, 'property', 'og:description'],
    [PAGE_URL, 'property', 'og:url'],
    [IMAGE_URL, 'property', 'og:image'],
    ['profile', 'property', 'og:type'],
    ['summary_large_image', 'name', 'twitter:card'],
    // Twitter tags fully specified so X unfurls don't mix founder og:* with
    // stale homepage twitter:* (previously omitted, defaulted to homepage).
    [PAGE_TITLE, 'name', 'twitter:title'],
    [PAGE_DESCRIPTION, 'name', 'twitter:description'],
    [IMAGE_URL, 'name', 'twitter:image'],
  ]
  saved = {}
  saved['title'] = document.title
  document.title = PAGE_TITLE
  for (const [value, attr, key] of tags) {
    const el = findOrCreateMeta(attr, key)
    saved[`${attr}:${key}`] = el.getAttribute('content')
    el.setAttribute('content', value)
  }
  const canon = findOrCreateLink('canonical')
  saved['canonical'] = canon.getAttribute('href')
  canon.setAttribute('href', PAGE_URL)
})

onBeforeUnmount(() => {
  if (!saved) return
  const snapshot = saved
  document.title = snapshot['title'] ?? ''
  for (const key of Object.keys(snapshot)) {
    if (key === 'title' || key === 'canonical') continue
    // Split on the FIRST ':' only — keys are `attr:name` where the name
    // itself often contains a ':' (og:title, twitter:card). A plain
    // key.split(':') destructure would truncate `property:og:title` to
    // name='og', match nothing, and silently skip the restore — leaving
    // founder meta on every subsequent page.
    const colonIdx = key.indexOf(':')
    const attr = key.slice(0, colonIdx) as 'name' | 'property'
    const name = key.slice(colonIdx + 1)
    const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
    if (!el) continue
    const original = snapshot[key]
    // If the meta didn't exist before we visited /founder, remove the
    // whole element on unmount — not just its content attribute. An
    // orphaned empty <meta property="og:type"> is still wrong even if
    // it has no value.
    if (original == null) el.remove()
    else el.setAttribute('content', original)
  }
  const canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canon) {
    const canonHref = snapshot['canonical']
    if (canonHref != null) canon.setAttribute('href', canonHref)
  }
  saved = null
})
</script>

<template>
  <main class="pt-16 bg-navy min-h-screen">
    <FounderSection />
  </main>
</template>
