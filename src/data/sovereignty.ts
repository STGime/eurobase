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
