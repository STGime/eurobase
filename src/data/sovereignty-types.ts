// Types-only module — imported by both sovereignty.ts (the runtime
// loader) and sovereignty-generated.ts (the prebuild-emitted vendor
// data). Split out so the generated file can be imported from
// vite.config.ts's Node context without pulling in Vite-only APIs.

export type RatingColor = 'red' | 'amber' | 'green'

export interface Ratings {
  entity_control: RatingColor
  data_location: RatingColor
  operational_access: RatingColor
  subprocessor_chain: RatingColor
  transfer_mechanism: RatingColor
  overall: RatingColor
}

export interface Vendor {
  slug: string
  name: string
  category: string
  contracting_entity: string
  ultimate_parent: string
  parent_jurisdiction: string
  entity_jurisdiction: string
  hosting_regions?: string[]
  subprocessors?: string[]
  eu_alternatives?: string[]
  transfer_mechanism?: string
  operational_access_regions?: string[]
  ratings: Ratings
  one_line_reason: string
  sources: string[]
  last_reviewed: string
  notes?: string | null
  self_disclosure?: boolean
}

// Persisted-report shapes. Mirrors the JSON emitted by the Go
// backend's internal/sovereignty package. Kept here (not inlined in
// the report page) so drift with the backend is visible in one
// place: change these when internal/sovereignty/score.go changes.
export interface ReportCard {
  slug: string
  name: string
  category: string
  overall: RatingColor
  one_line_reason: string
  parent_jurisdiction: string
  ratings: Ratings
  self_disclosure?: boolean
}

export interface ReportSwap {
  from_slug: string
  category: string
  alternatives: string[]
}

export interface Report {
  hash: string
  overall: RatingColor
  exposure_percent: number
  red_count: number
  amber_count: number
  green_count: number
  severity_modifier?: string
  cards: ReportCard[]
  alternatives: ReportSwap[]
  unknown_slugs?: string[]
  created_at: string
}
