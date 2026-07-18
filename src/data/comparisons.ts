export interface ComparisonRow {
  feature: string
  eurobase: string
  competitor: string
  highlight?: boolean
}

export interface ComparisonSection {
  title: string
  description: string
}

export interface ComparisonData {
  slug: string
  competitor: string
  heroHeadline: string
  heroSubheadline: string
  metaTitle: string
  metaDescription: string
  sections: ComparisonSection[]
  rows: ComparisonRow[]
  sovereigntyHeadline: string
  sovereigntyPoints: string[]
  ctaHeadline: string
  ctaDescription: string
}

export const comparisons: Record<string, ComparisonData> = {
  supabase: {
    slug: 'supabase',
    competitor: 'Supabase',
    heroHeadline: 'Eurobase vs Supabase: the EU-sovereign alternative',
    heroSubheadline: 'Same PostgreSQL, same DX — hosted in France, outside the CLOUD Act, GDPR-native, and €19/mo per project once you go live.',
    metaTitle: 'Eurobase vs Supabase — EU-sovereign Postgres backend alternative',
    metaDescription: 'Supabase runs on AWS; Eurobase runs on Scaleway in France with zero US jurisdiction. Same Postgres + auth + storage + realtime. GDPR-native, DPA in one click, EU-only sub-processors. Free tier, €19/mo Pro.',
    sections: [
      {
        title: 'Same foundation, different jurisdiction',
        description: 'Eurobase and Supabase are both built on PostgreSQL with REST + realtime, auth, storage, edge functions, and vault. The difference is where the bytes sit and which laws bind the operator. Supabase runs on AWS in the US; Eurobase runs on Scaleway in France, operated by an Estonian OÜ with no US corporate parent.',
      },
      {
        title: 'Why the CLOUD Act matters even when your data is "in Europe"',
        description: 'A US-region deployment does not remove US jurisdiction. Under the CLOUD Act (2018) and FISA §702, US authorities can compel a US-headquartered provider to hand over data it controls anywhere in the world — including data stored in the EU. Microsoft France told the French Senate under oath in 2025 that they cannot guarantee EU data stays out of that reach. Eurobase removes the question by removing the exposure: EU corporate parent, EU infrastructure, no US-owned processor in the critical path.',
      },
    ],
    rows: [
      { feature: 'Database', eurobase: 'PostgreSQL 16 (managed, Scaleway RDB)', competitor: 'PostgreSQL (managed)' },
      { feature: 'Infrastructure', eurobase: 'Scaleway, France (EU-owned)', competitor: 'AWS (US-owned)', highlight: true },
      { feature: 'Corporate parent', eurobase: 'Estonian OÜ', competitor: 'US corporation (Delaware)', highlight: true },
      { feature: 'CLOUD Act exposure', eurobase: 'None', competitor: 'Yes — US jurisdiction applies globally', highlight: true },
      { feature: 'GDPR compliance', eurobase: 'Native — DPA, RoPA, DSAR export, audit log in every project', competitor: 'DPA on request; DSAR + RoPA left to the customer' },
      { feature: 'Auth methods', eurobase: 'Email/password, magic link, phone SMS, OAuth (6 providers)', competitor: 'Email/password, magic link, phone SMS, OAuth, SAML (paid)' },
      { feature: 'Row-Level Security', eurobase: 'PostgreSQL RLS with preset policy shape (is_service_role() OR …)', competitor: 'PostgreSQL RLS — write your own policies' },
      { feature: 'Realtime', eurobase: 'WebSocket subscriptions with row-filter', competitor: 'WebSocket subscriptions with row-filter' },
      { feature: 'Edge functions', eurobase: 'Deno runtime, hosted in France', competitor: 'Deno runtime, hosted on AWS' },
      { feature: 'Vault / Secrets', eurobase: 'AES-256-GCM, per-tenant key, built-in', competitor: 'Vault available (newer feature)' },
      // Free-tier pause language must stay in sync with Phase B
      // (migration 000075 + idle-pause worker). Eurobase = "paused
      // after 30 days" on Free, "never" on Pro. Same shape as
      // Supabase — the differentiator is the days count and the
      // sub-second wake path, not the presence/absence of pause.
      { feature: 'Free-tier idle pause', eurobase: 'After 30 days idle; single request wakes it (~30 s). Never on Pro.', competitor: 'After 7 days idle. Never on Pro.', highlight: true },
      { feature: 'Pricing (paid tier)', eurobase: '€19/mo per project (Pro). Team tier €149/mo (dedicated Postgres) coming soon.', competitor: '$25/mo per organization (Pro) + usage-based overages', highlight: true },
      { feature: 'Cron jobs', eurobase: 'Built-in scheduler with execution log', competitor: 'pg_cron extension' },
      { feature: 'Webhooks', eurobase: 'Built-in with HMAC signing + retries', competitor: 'Database webhooks (newer)' },
      { feature: 'CLI', eurobase: '50+ commands (projects, DB, storage, vault, functions, migrations, cron, webhooks)', competitor: 'CLI available' },
      { feature: 'MCP server (AI IDEs)', eurobase: 'First-class — Claude Code, Cursor, Windsurf, Codex', competitor: 'Community MCP servers' },
      { feature: 'Audit logging', eurobase: 'Built-in — every admin action with actor, IP, timestamp', competitor: 'Not built-in', highlight: true },
      { feature: 'DSAR / Article 15 export', eurobase: 'One click — per-user or full-project zip', competitor: 'DIY: write SQL + join across tables + zip yourself' },
      { feature: 'DPA / Article 30 record', eurobase: 'Auto-generated from actual sub-processor registry', competitor: 'On request' },
      // Migration CLI status (as of 2026-07): assess, schema, data,
      // storage, functions all landed (PRs #268, #270, #272, #276,
      // #277). auth-users import is the remaining piece. Keep this
      // row in sync with internal/cli/migrate_supabase_*.go.
      { feature: 'Migration from Supabase', eurobase: 'eurobase import supabase — schema, data, storage, functions (auth users next)', competitor: '—', highlight: true },
    ],
    sovereigntyHeadline: 'Sovereignty is not a feature toggle',
    sovereigntyPoints: [
      'Eurobase infrastructure is 100 % EU-owned: Scaleway, France (fr-par). No AWS, no GCP, no Azure — not for the DB, not for storage, not for functions.',
      'The US CLOUD Act (2018) and FISA §702 grant American authorities access to data held by US companies regardless of server location. Supabase Inc., as a Delaware corporation using AWS, is subject to both.',
      'Eurobase has zero CLOUD Act exposure. Corporate parent is an Estonian OÜ; every processor in the RoPA is EU-headquartered.',
      'DPA, RoPA, DSAR export, and audit log are built into every project on every tier. Not paywalled — a legal obligation should not sit behind a $99/mo SKU.',
    ],
    ctaHeadline: 'Ready to build on sovereign infrastructure?',
    ctaDescription: 'Same Postgres, same DX, without the jurisdictional risk. Free tier, no credit card. Pro is €19/mo per project when you go live.',
  },
  firebase: {
    slug: 'firebase',
    competitor: 'Firebase',
    heroHeadline: 'Eurobase vs Firebase',
    heroSubheadline: 'SQL instead of NoSQL. Open standards instead of lock-in. EU infrastructure instead of Google Cloud.',
    metaTitle: 'Eurobase vs Firebase — EU-Native SQL Backend Alternative',
    metaDescription: 'Compare Eurobase and Firebase: PostgreSQL vs Firestore, open standards vs vendor lock-in, EU sovereignty vs Google Cloud. Same speed, better architecture.',
    sections: [
      {
        title: 'SQL vs NoSQL — The Architecture Difference',
        description: 'Firebase uses Firestore, a proprietary NoSQL document database with its own query language. Eurobase uses PostgreSQL — the most trusted relational database in the world. Your data is queryable with standard SQL, exportable with pg_dump, and portable to any Postgres host.',
      },
      {
        title: 'No Vendor Lock-in',
        description: 'Firebase ties you to Google Cloud. Firestore data, Cloud Functions, Firebase Auth — they only work within the Google ecosystem. Eurobase uses standard Postgres, S3-compatible storage, and JWT auth. You can migrate away at any time.',
      },
    ],
    rows: [
      { feature: 'Database', eurobase: 'PostgreSQL (SQL, relational)', competitor: 'Firestore (NoSQL, document)', highlight: true },
      { feature: 'Query Language', eurobase: 'Standard SQL', competitor: 'Proprietary Firestore SDK', highlight: true },
      { feature: 'Infrastructure', eurobase: 'Scaleway, France (EU-owned)', competitor: 'Google Cloud (US-owned)', highlight: true },
      { feature: 'CLOUD Act Exposure', eurobase: 'None', competitor: 'Yes — Google is US corporation' },
      { feature: 'Data Portability', eurobase: 'pg_dump, standard SQL export', competitor: 'Firestore export (proprietary format)', highlight: true },
      { feature: 'Auth Methods', eurobase: '6 (email, magic link, OAuth, phone SMS)', competitor: 'Email, OAuth, phone, anonymous' },
      { feature: 'Row-Level Security', eurobase: 'PostgreSQL RLS policies', competitor: 'Firestore security rules (proprietary)' },
      { feature: 'Realtime', eurobase: 'WebSocket subscriptions', competitor: 'Firestore listeners' },
      { feature: 'Functions', eurobase: 'Deno edge functions (EU-hosted)', competitor: 'Cloud Functions (Google Cloud)' },
      { feature: 'Storage', eurobase: 'S3-compatible object storage', competitor: 'Firebase Storage (GCS-backed)' },
      { feature: 'Vault / Secrets', eurobase: 'AES-256-GCM encrypted vault', competitor: 'Google Secret Manager (separate service)' },
      { feature: 'GDPR Compliance', eurobase: 'Native — DPA, audit, export', competitor: 'Manual — DPA on request from Google' },
      { feature: 'Pricing Model', eurobase: 'Predictable per-plan', competitor: 'Pay-per-read/write (can spike unexpectedly)' },
      { feature: 'Vendor Lock-in', eurobase: 'None — standard protocols', competitor: 'High — proprietary APIs throughout', highlight: true },
    ],
    sovereigntyHeadline: 'Google Cloud Is Not European Infrastructure',
    sovereigntyPoints: [
      'Firebase runs on Google Cloud. Google is a US corporation subject to the CLOUD Act, FISA, and other US surveillance laws.',
      'Even with eu-west data regions, Google retains operational access to your data and must comply with US government requests.',
      'Eurobase runs on Scaleway — a French, EU-owned cloud provider. No US parent company, no US jurisdiction.',
      'GDPR compliance with Firebase requires legal gymnastics (SCCs, TIAs). With Eurobase, it is the default architecture.',
    ],
    ctaHeadline: 'Switch from NoSQL to SQL Without Switching Continents',
    ctaDescription: 'Get a modern backend with PostgreSQL, real SQL queries, and full EU sovereignty. Free tier, no credit card required.',
  },
}
