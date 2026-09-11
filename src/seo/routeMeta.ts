// Central source of truth for per-route <head> metadata used during
// vite-ssg pre-render. Each generated /route/index.html has its title,
// description, canonical, and OG/Twitter tags rewritten from this
// module before it hits disk — so Googlebot's non-JS parse sees the
// correct per-page metadata instead of index.html's homepage defaults.
//
// Client-side page components still update document.head on SPA
// navigation (via each page's watchEffect); they write the same
// values, so hydration is a no-op. Keep the values here in sync with
// the client-side constants if either changes.

// Relative (not `@/*`) so this module is importable from
// vite.config.ts's Node loader too, which esbuild-bundles config
// before the alias plugin is installed.
import { blog } from '../data/content'
import { comparisons } from '../data/comparisons'
import { vendors as sovereigntyVendors, getVendor as getSovereigntyVendor } from '../data/sovereignty'

const SITE_ORIGIN = 'https://eurobase.app'
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`

export interface RouteMeta {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogType: 'website' | 'article'
}

// Static-route metadata. Homepage (/) is served by index.html's
// defaults and does not need overriding — omit it here so the shell
// values render unchanged. Legal-boilerplate pages (privacy/terms/
// legal) inherit the shell too until they get their own copy.
const staticRouteMeta: Record<string, Omit<RouteMeta, 'canonical' | 'ogType'>> = {
  '/faq': {
    title: 'FAQ — Eurobase (EU-sovereign backend)',
    description:
      'Frequently asked questions about Eurobase: GDPR, CLOUD Act, Supabase and Firebase comparison, pricing, migration, MCP server, auth methods, and the closed beta.',
    ogTitle: 'FAQ — Eurobase (EU-sovereign backend)',
    ogDescription:
      'Frequently asked questions about Eurobase: GDPR, CLOUD Act, Supabase and Firebase comparison, pricing, migration, MCP server, auth methods, and the closed beta.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/security': {
    title: 'Security, vulnerability disclosure & German legal-tech — Eurobase',
    description:
      "Eurobase security model, coordinated vulnerability disclosure policy, and the German legal-tech dossier: §50 BRAO / §257 HGB / §147 AO retention, WORM per-prefix, GoBD, §203 StGB staff declarations, BSI C5 roadmap, ISO 27001 SoA, NIS-2 positioning.",
    ogTitle: 'Security, vulnerability disclosure & German legal-tech — Eurobase',
    ogDescription:
      "Eurobase security model, coordinated vulnerability disclosure policy, and the German legal-tech dossier: §50 BRAO / §257 HGB / §147 AO retention, WORM per-prefix, GoBD, §203 StGB staff declarations, BSI C5 roadmap, ISO 27001 SoA, NIS-2 positioning.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/founder': {
    title: 'Stefan Gimeson — Founder, Eurobase | Eurobase',
    description:
      'Meet Stefan Gimeson, founder of Eurobase OÜ. Seventeen years shipping product across European regulatory environments — now building the sovereign backend platform for Europe.',
    ogTitle: 'Stefan Gimeson — Founder, Eurobase | Eurobase',
    ogDescription:
      'Meet Stefan Gimeson, founder of Eurobase OÜ. Seventeen years shipping product across European regulatory environments — now building the sovereign backend platform for Europe.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/features/dsar': {
    title: 'Automated DSAR for SaaS — GDPR Article 15 + 20 in one click | Eurobase',
    description:
      'One-click DSAR exports built into every Eurobase project. Article 15 (subject access) and Article 20 (data portability). Audit-trailed, EU-sovereign on Scaleway, no middleware to maintain.',
    ogTitle: 'Automated DSAR for SaaS — GDPR Article 15 + 20 in one click | Eurobase',
    ogDescription:
      'One-click DSAR exports built into every Eurobase project. Article 15 (subject access) and Article 20 (data portability). Audit-trailed, EU-sovereign on Scaleway, no middleware to maintain.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/gdpr-readiness': {
    title: 'Free GDPR Backend Readiness Assessment — Eurobase',
    description:
      'Score your backend against 10 concrete GDPR obligations in 3 minutes. Article 15 DSAR, Article 30 RoPA, sub-processor discipline, breach notification, encryption at rest, audit trail, retention, EU residency. No signup. Free.',
    ogTitle: 'Free GDPR Backend Readiness Assessment — Eurobase',
    ogDescription:
      'Score your backend against 10 concrete GDPR obligations in 3 minutes. Article 15 DSAR, Article 30 RoPA, sub-processor discipline, breach notification, encryption at rest, audit trail, retention, EU residency. No signup. Free.',
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/sovereignty-check': {
    title: 'CLOUD Act Exposure Checker — Sovereignty Check | Eurobase',
    description:
      "Free tool: pick your stack, see which vendors a US authority can legally reach under the CLOUD Act — regardless of which region you configured. Open dataset with sources. No signup.",
    ogTitle: 'CLOUD Act Exposure Checker — see which parts of your stack are legally reachable',
    ogDescription:
      "Firebase / Supabase EU region is not GDPR-safe when the corporate parent is US. Pick your stack, get a red/amber/green score for jurisdictional exposure. Free, open dataset.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/sovereignty-check/methodology': {
    title: 'Methodology — Sovereignty Check | Eurobase',
    description:
      "How the CLOUD Act Exposure Checker rates vendors: five orthogonal dimensions (entity control, data location, operational access, subprocessor chain, transfer mechanism), worst-wins rule, severity modifier, conflict-of-interest disclosure. Written for citing.",
    ogTitle: 'Methodology — CLOUD Act Exposure Checker',
    ogDescription:
      "The rating model behind the Sovereignty Check: five dimensions, worst-wins, cited sources, MIT-licensed open dataset.",
    ogImage: DEFAULT_OG_IMAGE,
  },
  '/sovereignty-check/vendors': {
    title: 'Vendor ratings — Sovereignty Check | Eurobase',
    description:
      "Every vendor rating in the open sovereignty-vendors dataset — five-dimension CLOUD Act exposure score with cited sources. EU-hosted alternatives suggested per category.",
    ogTitle: 'Vendor ratings — CLOUD Act exposure by vendor',
    ogDescription:
      "Browse every vendor in the open dataset: red/amber/green sovereignty score, sources, EU alternatives.",
    ogImage: DEFAULT_OG_IMAGE,
  },
}

// Return metadata for a given route path (as vite-ssg would generate,
// e.g. "/", "/blog/foo", "/vs/supabase"), or null if the route should
// keep index.html's shell values verbatim (homepage + legal pages).
export function getRouteMeta(routePath: string): RouteMeta | null {
  // Normalize: strip trailing slash except for root; strip query/hash.
  const cleaned = routePath.replace(/[?#].*$/, '')
  const path = cleaned === '/' ? '/' : cleaned.replace(/\/+$/, '')

  if (path === '/') return null

  const blogMatch = path.match(/^\/blog\/(.+)$/)
  if (blogMatch) {
    const slug = blogMatch[1]!
    const post = blog.posts.find((p) => p.slug === slug)
    if (!post) return null
    const url = `${SITE_ORIGIN}/blog/${post.slug}`
    const title = `${post.title} | Eurobase Blog`
    const image = post.image ? `${SITE_ORIGIN}${post.image}` : DEFAULT_OG_IMAGE
    return {
      title,
      description: post.excerpt,
      canonical: url,
      ogTitle: title,
      ogDescription: post.excerpt,
      ogImage: image,
      ogType: 'article',
    }
  }

  const vsMatch = path.match(/^\/vs\/(.+)$/)
  if (vsMatch) {
    const slug = vsMatch[1]!
    const cmp = comparisons[slug]
    if (!cmp) return null
    const url = `${SITE_ORIGIN}/vs/${cmp.slug}`
    return {
      title: cmp.metaTitle,
      description: cmp.metaDescription,
      canonical: url,
      ogTitle: cmp.metaTitle,
      ogDescription: cmp.metaDescription,
      ogImage: DEFAULT_OG_IMAGE,
      ogType: 'website',
    }
  }

  // Per-vendor SEO pages (/sovereignty-check/vendors/<slug>).
  // Highest-leverage SEO move in the growth spec — 100 vendors →
  // 100 indexed pages targeting "is X GDPR compliant" and
  // "EU alternative to X" queries. Each page's title + description
  // includes the vendor name so long-tail queries have a landing.
  const vendorMatch = path.match(/^\/sovereignty-check\/vendors\/(.+)$/)
  if (vendorMatch) {
    const slug = vendorMatch[1]!
    const v = getSovereigntyVendor(slug)
    if (!v) return null
    const title = `Is ${v.name} GDPR-safe? CLOUD Act exposure and EU alternatives | Eurobase`
    const reason = v.one_line_reason.trim().replace(/\s+/g, ' ')
    const description = `${v.name} — ${v.ratings.overall.toUpperCase()} on the CLOUD Act Exposure Checker. ${reason} ${
      v.eu_alternatives && v.eu_alternatives.length
        ? 'EU alternatives: ' + v.eu_alternatives.join(', ') + '.'
        : ''
    }`.slice(0, 300)
    return {
      title,
      description,
      canonical: `${SITE_ORIGIN}/sovereignty-check/vendors/${v.slug}`,
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_OG_IMAGE,
      ogType: 'article',
    }
  }

  const staticMeta = staticRouteMeta[path]
  if (staticMeta) {
    return {
      ...staticMeta,
      canonical: `${SITE_ORIGIN}${path}`,
      ogType: 'website',
    }
  }

  // Unknown route (e.g. /privacy) — return a canonical pointing at
  // itself so at minimum the URL variant issue is fixed, but keep the
  // shell's title/description (client-side pages don't override those
  // today either).
  return {
    title: '',
    description: '',
    canonical: `${SITE_ORIGIN}${path}`,
    ogTitle: '',
    ogDescription: '',
    ogImage: DEFAULT_OG_IMAGE,
    ogType: 'website',
  }
}

// Enumerate all dynamic routes for vite-ssg's includedRoutes hook.
// Static routes are already enumerated by vite-ssg via the router
// configuration; we only need to expand `:slug` params.
export function getDynamicRoutes(): string[] {
  return [
    ...blog.posts.map((p) => `/blog/${p.slug}`),
    ...Object.keys(comparisons).map((slug) => `/vs/${slug}`),
    ...sovereigntyVendors.map((v) => `/sovereignty-check/vendors/${v.slug}`),
  ]
}
