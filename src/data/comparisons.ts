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
    heroHeadline: 'Eurobase vs Supabase',
    heroSubheadline: 'Same Postgres power. Full EU sovereignty. No CLOUD Act. No project pausing.',
    metaTitle: 'Eurobase vs Supabase — EU-Native Postgres Backend Alternative',
    metaDescription: 'Compare Eurobase and Supabase: same PostgreSQL foundation, but Eurobase runs 100% on EU infrastructure with zero CLOUD Act exposure, native GDPR compliance, and no free tier pausing.',
    sections: [
      {
        title: 'Same Foundation, Different Jurisdiction',
        description: 'Both Eurobase and Supabase are built on PostgreSQL with REST APIs, auth, storage, and realtime. The difference is where your data lives and who can access it. Supabase runs on AWS (US), making it subject to the CLOUD Act. Eurobase runs entirely on EU-owned infrastructure.',
      },
      {
        title: 'Why EU Developers Are Switching',
        description: 'If you are building for European users or operating under GDPR, choosing US-hosted infrastructure creates legal uncertainty. Eurobase removes that uncertainty entirely — same developer experience, zero jurisdictional risk.',
      },
    ],
    rows: [
      { feature: 'Database', eurobase: 'PostgreSQL (managed)', competitor: 'PostgreSQL (managed)' },
      { feature: 'Infrastructure', eurobase: 'Scaleway, France (EU-owned)', competitor: 'AWS (US-owned)', highlight: true },
      { feature: 'CLOUD Act Exposure', eurobase: 'None', competitor: 'Yes — US jurisdiction', highlight: true },
      { feature: 'GDPR Compliance', eurobase: 'Native — DPA reports, audit log, data export', competitor: 'Manual setup required' },
      { feature: 'Auth Methods', eurobase: '6 (email, magic link, OAuth, phone SMS)', competitor: '5 (email, magic link, OAuth, phone, SAML on enterprise)' },
      { feature: 'Row-Level Security', eurobase: 'Yes — with preset policies', competitor: 'Yes — manual policy writing' },
      { feature: 'Realtime', eurobase: 'WebSocket subscriptions', competitor: 'WebSocket subscriptions' },
      { feature: 'Edge Functions', eurobase: 'Deno runtime, EU-hosted', competitor: 'Deno runtime, AWS-hosted' },
      { feature: 'Vault / Secrets', eurobase: 'AES-256-GCM encrypted, built-in', competitor: 'Vault available (newer feature)' },
      { feature: 'Free Tier Pausing', eurobase: 'Never — projects stay active', competitor: 'Paused after 7 days inactive', highlight: true },
      { feature: 'Cron Jobs', eurobase: 'Built-in with execution logs', competitor: 'pg_cron extension' },
      { feature: 'Webhooks', eurobase: 'Built-in with HMAC signing', competitor: 'Database webhooks (newer)' },
      { feature: 'CLI', eurobase: '30+ commands', competitor: 'CLI available' },
      { feature: 'Audit Logging', eurobase: 'Built-in — actor, action, IP, timestamp', competitor: 'Not built-in', highlight: true },
      { feature: 'DPA Reports', eurobase: 'Automated', competitor: 'On request' },
      // Migration CLI row — highlight because "how do I get off?" is
      // the first question a Supabase user asks. Coming-soon phrasing
      // matches the SolutionSection badge; keep them in sync when the
      // feature graduates.
      { feature: 'Migration from Supabase', eurobase: 'One-command CLI (coming soon) — DB, auth, storage, functions', competitor: '—', highlight: true },
    ],
    sovereigntyHeadline: 'Data Sovereignty Is Not a Feature Toggle',
    sovereigntyPoints: [
      'Eurobase infrastructure is 100% EU-owned and operated by Scaleway (France). No AWS, no GCP, no Azure.',
      'The US CLOUD Act grants American authorities access to data held by US companies — regardless of server location. Supabase, as a US corporation using AWS, is subject to this.',
      'Eurobase has zero CLOUD Act exposure. Your data stays under EU jurisdiction, full stop.',
      'Built-in DPA reports, sub-processor registry, GDPR data export, and full audit trail — not as paid add-ons, but as core features.',
    ],
    ctaHeadline: 'Ready to Build on Sovereign Infrastructure?',
    ctaDescription: 'Get the same Postgres-powered backend experience — without the jurisdictional risk. Free tier available, no credit card required.',
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
