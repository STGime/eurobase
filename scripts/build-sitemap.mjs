#!/usr/bin/env node
// Prebuild step — writes public/sitemap.xml from every route that's
// pre-rendered by vite-ssg + every publicly indexable file (llms.txt).
//
// Why not vite-ssg's own sitemap plugin: we need per-route
// changefreq + priority hints tuned for SEO, and vite-ssg's plugin
// emits a uniform default. Hand-maintaining sitemap.xml drifted
// (missed 4 recent blog posts + all 65 sovereignty-check pages when
// the tool shipped), so this script is the fix.
//
// Blog + comparisons are extracted by regex from the TS source
// modules — a plain-Node script can't `import` .ts, and the shape is
// stable + linear enough that a regex hit is fine. If content.ts
// ever moves the slug into a computed getter, revisit.
//
// Run automatically via the `prebuild` and `predev` npm scripts.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = dirname(HERE)
const SITE_ORIGIN = 'https://eurobase.app'
const OUT = join(ROOT, 'public', 'sitemap.xml')

// Today's date, YYYY-MM-DD. Vendor / blog pages use their own dates
// where we can extract them; everything else uses today.
const TODAY = new Date().toISOString().slice(0, 10)

// Curated static-route metadata. Every non-generated route lives
// here so priority + changefreq hints stay hand-tuned.
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: TODAY },
  { path: '/features/dsar', changefreq: 'monthly', priority: '0.95', lastmod: TODAY },
  { path: '/gdpr-readiness', changefreq: 'monthly', priority: '0.95', lastmod: TODAY },
  { path: '/sovereignty-check', changefreq: 'monthly', priority: '0.95', lastmod: TODAY },
  { path: '/sovereignty-check/methodology', changefreq: 'monthly', priority: '0.9', lastmod: TODAY },
  { path: '/sovereignty-check/vendors', changefreq: 'weekly', priority: '0.9', lastmod: TODAY },
  { path: '/faq', changefreq: 'monthly', priority: '0.85', lastmod: TODAY },
  { path: '/founder', changefreq: 'monthly', priority: '0.85', lastmod: TODAY },
  { path: '/security', changefreq: 'monthly', priority: '0.85', lastmod: TODAY },
  { path: '/privacy', changefreq: 'yearly', priority: '0.6', lastmod: TODAY },
  { path: '/terms', changefreq: 'yearly', priority: '0.6', lastmod: TODAY },
  { path: '/legal', changefreq: 'yearly', priority: '0.6', lastmod: TODAY },
  // Static txt files served from public/ verbatim.
  { path: '/llms.txt', changefreq: 'weekly', priority: '0.7', lastmod: TODAY },
  { path: '/llms-full.txt', changefreq: 'weekly', priority: '0.7', lastmod: TODAY },
]

// Extract blog posts from src/data/content.ts. Each post has a
// `slug: '...'` and a `date: '...'` line; capture both so the
// sitemap's <lastmod> reflects the post's real publish date.
//
// Cross-checks the two-field regex against a slug-only count so a
// future schema change (e.g. a post that flips `date:` above `slug:`)
// fails LOUD rather than silently dropping from the sitemap.
function extractBlog() {
  const src = readFileSync(join(ROOT, 'src', 'data', 'content.ts'), 'utf8')
  const posts = []
  // Non-greedy: match each post's slug + date. Requires slug BEFORE
  // date within the same object literal, which every current post
  // satisfies; the length-check below catches drift.
  const re = /slug:\s*'([a-z0-9-]+)'[\s\S]*?date:\s*'(\d{4}-\d{2}-\d{2})'/g
  let m
  while ((m = re.exec(src)) !== null) {
    posts.push({ slug: m[1], date: m[2] })
  }
  // Belt-and-braces: count blog post slugs a second way and assert
  // parity. Blog posts live at 6-space indent inside the `posts:`
  // array, which distinguishes them from interface field defaults
  // and other slug-shaped strings elsewhere in the file.
  const slugOnly = src.match(/^      slug: '[a-z0-9-]+'/gm) ?? []
  if (posts.length !== slugOnly.length) {
    throw new Error(
      `content.ts: blog regex found ${posts.length} slug+date pairs but ` +
        `${slugOnly.length} standalone slugs — schema may have drifted. ` +
        `Update scripts/build-sitemap.mjs regex.`,
    )
  }
  return posts
}

// Extract comparison slugs from src/data/comparisons.ts. Each entry
// has a `slug: '...'` inside its object body.
function extractComparisons() {
  const src = readFileSync(join(ROOT, 'src', 'data', 'comparisons.ts'), 'utf8')
  const out = []
  const re = /slug:\s*'([a-z0-9-]+)'/g
  let m
  while ((m = re.exec(src)) !== null) {
    out.push(m[1])
  }
  return out
}

// Vendor slugs from the sovereignty-vendors submodule. Uses
// last_reviewed as the lastmod so a data refresh in that YAML shows
// up as a sitemap ping.
function extractVendors() {
  const dir = join(ROOT, 'src', 'data', 'sovereignty-vendors', 'vendors')
  const files = readdirSync(dir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
  const out = []
  for (const f of files.sort()) {
    const data = parseYaml(readFileSync(join(dir, f), 'utf8'))
    if (data && typeof data.slug === 'string') {
      // Force string coercion: if a future yaml parser mode returned
      // a Date object for last_reviewed (YAML 1.1 timestamp casting),
      // `.toISOString()` would land as a garbled datetime in XML.
      // Validate the shape we actually want.
      const raw = String(data.last_reviewed ?? '')
      const lastmod = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : TODAY
      out.push({ slug: data.slug, lastmod })
    }
  }
  return out
}

function xmlEntry({ path, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${SITE_ORIGIN}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const entries = []
for (const r of staticRoutes) entries.push(xmlEntry(r))
for (const p of extractBlog()) {
  entries.push(
    xmlEntry({
      path: `/blog/${p.slug}`,
      lastmod: p.date,
      changefreq: 'monthly',
      priority: '0.8',
    }),
  )
}
for (const slug of extractComparisons()) {
  entries.push(
    xmlEntry({
      path: `/vs/${slug}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.9',
    }),
  )
}
for (const v of extractVendors()) {
  entries.push(
    xmlEntry({
      path: `/sovereignty-check/vendors/${v.slug}`,
      lastmod: v.lastmod,
      changefreq: 'monthly',
      // 0.8 (matches blog posts) not 0.7 — these ARE the SEO surface
      // for "is X GDPR safe" and "EU alternative to X" long-tail
      // queries. Vendor index at 0.9 still ranks higher because it's
      // the destination page for category-level searches.
      priority: '0.8',
    }),
  )
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- AUTO-GENERATED by scripts/build-sitemap.mjs — do not hand-edit.
     Add/adjust static routes in the staticRoutes array in that script;
     blog + comparison + vendor entries are extracted from the source
     data on every build. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`
writeFileSync(OUT, xml)
console.log(`✅ wrote ${entries.length} URLs → ${OUT.replace(ROOT + '/', '')}`)
