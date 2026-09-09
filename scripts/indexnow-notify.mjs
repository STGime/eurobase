#!/usr/bin/env node
// IndexNow push — actively notify Bing / DuckDuckGo (via Bing) /
// Yandex / Ecosia (via Bing) / Yep / Naver / Seznam of every URL in
// our sitemap after a successful deploy. Complements Google Search
// Console (which we register separately at
// search.google.com/search-console); IndexNow is the Microsoft-led
// "push, don't wait for the crawler" protocol.
//
// Runs post-deploy from .github/workflows/marketing-deploy-scaleway.yml.
// Failure is non-fatal — a downed IndexNow endpoint shouldn't block
// the marketing deploy from marking success, so the workflow calls
// this with `continue-on-error: true`. Exit codes:
//    0 — success (200/202 from api.indexnow.org)
//    1 — network or parse error (workflow keeps going, ops sees the log)
//
// Verify locally: `npm run build && node scripts/indexnow-notify.mjs --dry-run`

import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// The IndexNow key file must be served at
// https://eurobase.app/${KEY}.txt with body == KEY. That file lives
// in public/${KEY}.txt so vite copies it into dist/ on build, nginx
// serves it, and IndexNow's ownership check passes. Rotating the
// key means changing BOTH this constant AND the filename — do
// nothing else until search engines have re-verified.
const INDEXNOW_KEY = '1089efee4e22c7bbb677b67862a5845c'
const HOST = 'eurobase.app'
// sitemap.xml is a hand-maintained static asset in public/ — vite
// copies it into dist/ verbatim at build time. Read it straight from
// the checkout so this script can run on a bare CI runner without a
// vite build first (saves ~3-5 min per deploy).
const SITEMAP_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'sitemap.xml',
)

// api.indexnow.org is Microsoft's aggregator — one submission fans
// out to every participating engine. Bing also accepts direct hits
// at www.bing.com/indexnow; using the aggregator avoids per-engine
// endpoint drift.
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

function log(msg) {
  console.log(`[indexnow] ${msg}`)
}
function warn(msg) {
  console.warn(`[indexnow] ${msg}`)
}

// decodeXmlEntities handles the 5 XML-predefined entities that can
// legally appear inside a <loc> body per the sitemap protocol. Any
// URL containing `&` (e.g. `?utm=x&utm_content=y`) is escaped to
// `&amp;` in the sitemap, and submitting the escaped form to
// IndexNow would signal a URL that doesn't exist. Numeric character
// references (`&#38;`, `&#x26;`) also handled for completeness even
// though our vite-emitted sitemap doesn't use them today.
function decodeXmlEntities(s) {
  return s
    .replace(/&#([0-9]+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&') // MUST be last — decoded output can't be re-scanned
}

function parseSitemap(xml) {
  // Deliberate: don't pull in a full XML parser for a
  // fixed-shape sitemap that we generate ourselves. Regex against
  // <loc>...</loc>. If we ever hand off sitemap generation to a
  // third-party or add nested <sitemapindex>, switch to a real
  // parser.
  const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
  return matches.map((m) => decodeXmlEntities(m[1]))
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')

  let xml
  try {
    xml = await readFile(SITEMAP_PATH, 'utf8')
  } catch (err) {
    warn(`could not read ${SITEMAP_PATH}: ${err.message}`)
    process.exit(1)
  }

  const parsed = parseSitemap(xml)
  if (parsed.length === 0) {
    warn('sitemap.xml parsed but zero <loc> entries found — refusing to submit')
    process.exit(1)
  }

  // Single-pass hostname partition. Everything not under HOST goes
  // into `stray` and is logged so a rogue external URL surfaces at
  // deploy time rather than silently wasting IndexNow quota. Also
  // avoids the duplicated inverse-predicate pattern the review round
  // flagged.
  const submitUrls = []
  const stray = []
  for (const u of parsed) {
    try {
      if (new URL(u).hostname === HOST) submitUrls.push(u)
      else stray.push(u)
    } catch {
      stray.push(u)
    }
  }
  if (stray.length > 0) {
    warn(`${stray.length} non-${HOST} URL(s) in sitemap; skipping — first: ${stray[0]}`)
  }
  if (submitUrls.length === 0) {
    warn(`sitemap has ${parsed.length} entries but zero belong to ${HOST} — refusing to submit`)
    process.exit(1)
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: submitUrls,
  }

  log(`submitting ${submitUrls.length} URLs to ${INDEXNOW_ENDPOINT}`)

  if (dryRun) {
    log('--dry-run: payload preview:')
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  let res
  try {
    res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    warn(`network error: ${err.message}`)
    process.exit(1)
  }

  const body = await res.text().catch(() => '')

  // IndexNow returns 200 (accepted) or 202 (accepted, being
  // processed). 4xx = our fault (bad key, malformed body, mismatched
  // host). 5xx = their fault. Log everything the aggregator sends
  // back — the body is short and useful.
  if (res.status === 200 || res.status === 202) {
    log(`OK: HTTP ${res.status} ${body ? `(${body.slice(0, 200)})` : ''}`)
    return
  }

  warn(`HTTP ${res.status} ${res.statusText}: ${body.slice(0, 500)}`)
  process.exit(1)
}

main().catch((err) => {
  warn(`unexpected error: ${err.stack || err.message}`)
  process.exit(1)
})
