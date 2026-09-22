// Sovereignty Check — vendor DB loader.
//
// Vendor data itself is materialized by scripts/build-sovereignty-data.mjs
// (prebuild step) into ./sovereignty-generated.ts. That indirection
// exists because vite.config.ts imports this module (via routeMeta.ts,
// for dynamic-route enumeration during SSG) in a plain Node context
// where Vite's `import.meta.glob` isn't defined. A pre-built static
// JS module works in both Node config-time and Vite bundle-time.
//
// The backend (internal/sovereignty in euroback) embeds the same
// YAMLs via //go:embed against the same submodule pin. Both sides
// stay in sync by bumping the submodule commit.

import { rawVendors } from './sovereignty-generated'
import type { RatingColor, Vendor } from './sovereignty-types'

export type {
  RatingColor,
  Ratings,
  Vendor,
  Report,
  ReportCard,
  ReportSwap,
} from './sovereignty-types'

function loadVendors(): Vendor[] {
  const out: Vendor[] = [...rawVendors]
  // Deterministic order: overall severity first (red > amber >
  // green), then slug within each bucket. Picker + vendor index
  // both use the same order.
  const rank = (c: RatingColor) => (c === 'red' ? 2 : c === 'amber' ? 1 : 0)
  out.sort((a, b) => {
    const dr = rank(b.ratings.overall) - rank(a.ratings.overall)
    if (dr !== 0) return dr
    return a.slug.localeCompare(b.slug)
  })
  return out
}

export const vendors: Vendor[] = loadVendors()

const bySlug: Map<string, Vendor> = new Map(vendors.map((v) => [v.slug, v]))

export function getVendor(slug: string): Vendor | undefined {
  return bySlug.get(slug)
}

// Category label lookup for the picker + vendor pages. Kept here
// so a new category in the dataset requires touching one file.
export const CATEGORY_LABELS: Record<string, string> = {
  hosting: 'Hosting / cloud',
  db: 'Database',
  baas: 'Backend-as-a-service',
  auth: 'Auth',
  payments: 'Payments',
  email: 'Email',
  analytics: 'Analytics',
  cdn: 'CDN',
  error: 'Error tracking',
  ai: 'AI / LLM',
  ci: 'CI / CD',
  storage: 'Object storage',
  monitoring: 'Monitoring',
  communication: 'Communication',
  other: 'Other',
}

// Grouped by category — used by the picker UI.
export function vendorsByCategory(): { category: string; label: string; vendors: Vendor[] }[] {
  const groups = new Map<string, Vendor[]>()
  for (const v of vendors) {
    const list = groups.get(v.category) ?? []
    list.push(v)
    groups.set(v.category, list)
  }
  return Array.from(groups.entries()).map(([category, vs]) => ({
    category,
    label: CATEGORY_LABELS[category] ?? category,
    vendors: vs,
  }))
}

// Color helpers — used everywhere ratings show up in the UI.
export function ratingBadgeClass(color: RatingColor): string {
  switch (color) {
    case 'red':
      return 'bg-red-600/20 text-red-300 border border-red-500/40'
    case 'amber':
      return 'bg-amber-600/20 text-amber-300 border border-amber-500/40'
    case 'green':
      return 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
  }
}

export function ratingLabel(color: RatingColor): string {
  switch (color) {
    case 'red':
      return 'Red — CLOUD Act exposure'
    case 'amber':
      return 'Amber — mitigations present'
    case 'green':
      return 'Green — EU jurisdiction'
  }
}

// ---- Light-surface helpers (checker landing page) ----------------------
//
// The checker landing page renders on a light background; the
// ratingBadgeClass() variants above are tuned for navy surfaces.

export function ratingChipClass(color: RatingColor): string {
  switch (color) {
    case 'red':
      return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'
    case 'amber':
      return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200'
    case 'green':
      return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
  }
}

export function ratingDotClass(color: RatingColor): string {
  switch (color) {
    case 'red':
      return 'bg-red-500'
    case 'amber':
      return 'bg-amber-400'
    case 'green':
      return 'bg-emerald-500'
  }
}

// Human labels for the transfer_mechanism enum in the vendor schema.
export const TRANSFER_LABELS: Record<string, string> = {
  none: 'No transfer',
  SCCs: 'SCCs',
  'SCCs+TIA': 'SCCs + TIA',
  adequacy: 'Adequacy',
  DPF: 'Data Privacy Framework',
  binding_corporate_rules: 'BCRs',
  unclear: 'Unclear',
}

// Short form for tight spaces (vendor tiles).
export const TRANSFER_SHORT: Record<string, string> = {
  none: 'No transfer',
  SCCs: 'SCCs',
  'SCCs+TIA': 'SCCs + TIA',
  adequacy: 'Adequacy',
  DPF: 'DPF',
  binding_corporate_rules: 'BCRs',
  unclear: 'Unclear',
}

// ISO 3166-1 alpha-2 (or 'EU') → flag emoji via regional indicators.
// 'EU' happens to be a valid pair that renders the EU flag.
export function jurisdictionFlag(code: string): string {
  const cc = code.trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(cc)) return ''
  return String.fromCodePoint(...[...cc].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65))
}

// Aggregate numbers for the checker hero. Derived from the dataset
// at build time so the copy never drifts from the data.
export const datasetStats = (() => {
  let red = 0
  let amber = 0
  let green = 0
  let latest = ''
  const categories = new Set<string>()
  for (const v of vendors) {
    categories.add(v.category)
    if (v.ratings.overall === 'red') red++
    else if (v.ratings.overall === 'amber') amber++
    else green++
    if (v.last_reviewed > latest) latest = v.last_reviewed
  }
  return { total: vendors.length, categories: categories.size, red, amber, green, latest }
})()
