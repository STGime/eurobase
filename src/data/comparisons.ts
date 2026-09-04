export interface ComparisonRow {
  feature: string
  eurobase: string
  competitor: string
  highlight?: boolean
}

export interface ComparisonSection {
  title: string
  description: string
  /** Optional additional paragraphs after `description` — kept optional so
   *  existing comparisons (e.g. firebase) render unchanged. */
  paragraphs?: string[]
  /** Optional bulleted takeaway list under the paragraphs. */
  bullets?: string[]
}

export interface ComparisonFaq {
  question: string
  answer: string
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
  /** Optional visible FAQ — also feeds the FAQPage JSON-LD so the
   *  page can win rich results for the exact-match long-tail queries
   *  Search Console shows the /vs/* pages ranking for. */
  faqs?: ComparisonFaq[]
  ctaHeadline: string
  ctaDescription: string
}

export const comparisons: Record<string, ComparisonData> = {
  supabase: {
    slug: 'supabase',
    competitor: 'Supabase',
    heroHeadline: 'Eurobase vs Supabase: the EU-sovereign Supabase alternative',
    heroSubheadline: 'Same PostgreSQL, same DX — hosted in France, outside the CLOUD Act, GDPR-native, and €25/mo per project once you go live.',
    metaTitle: 'Supabase EU alternative — Eurobase (Scaleway, France, GDPR-native)',
    metaDescription: 'Looking for a Supabase EU alternative? Eurobase runs the same Postgres + auth + storage + realtime stack on Scaleway (France) under Estonian law — no CLOUD Act, no US corporate parent. GDPR-native DPA + DSAR + audit log in every project. Free tier, €25/mo Pro. Migrate from Supabase with one CLI command.',
    sections: [
      {
        title: 'Same foundation, different jurisdiction',
        description:
          'Eurobase and Supabase are both built on PostgreSQL with REST + realtime, auth, storage, edge functions, and vault. The differences are architectural, not superficial: where the bytes physically sit, which corporate parent operates the platform, and which laws bind the operator when a government asks for access.',
        paragraphs: [
          'Supabase Inc. is a Delaware C-corp headquartered in San Francisco, running its managed platform on AWS. Even when you choose a Supabase EU region, the control plane and the parent company remain under US jurisdiction — which is why the CLOUD Act question keeps coming up in regulated procurement.',
          'Eurobase is operated by Eurobase OÜ, an Estonian private limited company registered on 22 July 2026 (registry code 17557586, Ahtri 12, Tallinn). Every processor in the critical path — database, storage, edge functions — is EU-owned and physically in France (Scaleway fr-par). No AWS, no GCP, no Azure. If you are searching for "Supabase Europe" and want the sovereignty answer without the caveats, that combination is what changes.',
        ],
      },
      {
        title: 'Is Supabase GDPR compliant? The 90% answer and the 10% gap',
        description:
          'Yes — Supabase ships a GDPR Data Processing Addendum, offers standard contractual clauses, honours data-processing terms, and lets you pick a Frankfurt region so personal data physically stays in the EEA. For most SaaS teams that is enough to close the compliance ticket. The 10% gap is what your DPO cares about: the CLOUD Act, sub-processor architecture, and DSAR mechanics.',
        paragraphs: [
          "First, the CLOUD Act. A DPA is a contract between you and your processor; it does not override statutes that the processor is subject to. Supabase Inc. is subject to US law, including the CLOUD Act (18 U.S.C. §2713) and FISA §702, which authorise US authorities to compel disclosure of data held by US-headquartered providers regardless of where the data physically sits. The EDPB has been explicit about this in recent guidance: the risk survives EU-region hosting when the provider or an upstream processor is under US jurisdiction. A green tick on a compliance page does not neutralise a Cloud Act warrant.",
          "Second, sub-processor mapping. Under Article 30 of the GDPR you are required to keep a Record of Processing Activities that lists every sub-processor, its role, and the transfer mechanism. Supabase's public sub-processor list includes AWS (US corporation), Vercel (US corporation), and other US-headquartered vendors; each one needs its own transfer analysis in your RoPA. Eurobase's sub-processor list is Scaleway (France), GatewayAPI (Denmark) for SMS, and Mollie (Netherlands) when paid plans switch on — all EU-headquartered, all under EU jurisdiction, and the list is auto-generated in every project's Compliance tab as a downloadable Article 30 record.",
          "Third, DSAR mechanics. GDPR Articles 15 and 20 give data subjects the right to access and port their personal data within 30 days. On Supabase you write the SQL: walk auth.users, join every table with a user_id column, gather Storage files, zip them, deliver, log. Every DSAR is a mini-engineering ticket. Eurobase ships a one-click console export plus an SDK call (eb.auth.exportMyData()) that end-users can trigger themselves — rate-limited, audit-logged, signed download links that expire after 7 days.",
        ],
        bullets: [
          'Physical data residency in the EU: Supabase = yes (with region choice). Eurobase = always, no toggle.',
          'DPA + Standard Contractual Clauses: Supabase = yes. Eurobase = yes.',
          'CLOUD Act exposure through the provider: Supabase = yes (Delaware corp). Eurobase = no.',
          'Sub-processors under EU jurisdiction: Supabase = partial (AWS, Vercel are US). Eurobase = 100%.',
          'Built-in DSAR export (Art. 15 + 20): Supabase = DIY SQL. Eurobase = one click on every tier, free included.',
          'Article 30 RoPA report: Supabase = you write it. Eurobase = auto-generated from live sub-processor registry.',
        ],
      },
      {
        title: 'The Supabase EU region: what physical residency does — and does not — do',
        description:
          'Supabase lets you provision projects in Frankfurt (eu-central-1) or Ireland (eu-west-1). Doing so puts the Postgres primary and the Storage bucket physically inside the EEA, which handles the residency dimension of GDPR. It does not, on its own, answer the CLOUD Act question — because "residency" and "jurisdiction" are different vectors.',
        paragraphs: [
          'Residency is about physical location. Jurisdiction is about which state\'s courts and warrants reach the operator. A Supabase EU-region project keeps your database bytes in Frankfurt, but Supabase Inc. — the entity that operates the control plane, holds the encryption keys, and can execute a "restore this project" command — is a Delaware C-corp answerable to US courts. When the FBI serves a §2703(d) order on Supabase Inc., the location of the disk does not enter the analysis.',
          'The Microsoft France testimony under oath at the French Senate in June 2025 made this concrete: Microsoft France said they cannot guarantee that data stored in their EU regions stays out of US reach, because the Redmond parent can be compelled by a US warrant regardless. The same logic applies to every US-headquartered provider — Supabase, Vercel, MongoDB, Snowflake, Datadog — whether or not they run EU regions.',
          'Eurobase closes this vector by removing the US-parent from the graph. Eurobase OÜ is an Estonian company. Scaleway is a French company (a subsidiary of Iliad, French). GatewayAPI is Danish. Mollie is Dutch. No hop in the critical path goes through a jurisdiction outside the EEA. That is the difference between "our data is in Europe" and "our provider is Europe."',
        ],
      },
      {
        title: 'Looking for a Supabase EU alternative? Three questions that decide it',
        description:
          'The Search Console query "supabase eu alternative" tends to come from two audiences: startups in regulated industries (health, fintech, gov-tech, edu-tech) whose DPO has flagged the CLOUD Act, and enterprises whose procurement checklist added an EU-parent requirement after the 2024–2025 sovereignty wave. Three questions decide whether Eurobase is the right substitute:',
        bullets: [
          '(1) Do you need EU corporate parent, not just EU region? If yes, Eurobase and OVHcloud are the two mainstream managed options. Supabase EU region does not satisfy this filter.',
          '(2) Do you need Postgres + built-in auth + storage + realtime + edge functions in one platform? Eurobase ships all five as a Supabase-compatible surface; OVHcloud Managed Database gives you Postgres only.',
          '(3) Do you need GDPR primitives (DSAR export, RoPA, audit log) built into every tier without paid add-ons? Eurobase ships them free-tier included; Supabase gates advanced compliance features behind Team ($599/mo) and Enterprise plans.',
        ],
        paragraphs: [
          'If the answer to all three is "yes," the honest recommendation is Eurobase. If (2) or (3) are not requirements — for instance, you already run auth in-house and only need a managed Postgres — a bare EU Postgres from Scaleway or OVHcloud is often the cheaper fit. We would rather send you to the right tool than the biggest one.',
          'For teams already deep into Supabase, the migration path is a first-class citizen: the Eurobase CLI ships eurobase import supabase with assess / schema / data / storage / functions subcommands that read your existing project read-only, emit an executable plan, and apply it against a fresh Eurobase project. Auth-users import is the remaining piece and ships next.',
        ],
      },
      {
        title: 'Supabase EU hosting compared to a Europe-native backend',
        description:
          'The search "supabase eu hosting" typically means one of two things: "does Supabase have EU regions?" (yes — Frankfurt and Ireland) or "what does an EU-first alternative to Supabase hosting look like?" (an Estonian-parent operator running exclusively on Scaleway in France, with no US-owned processor in the critical path — Eurobase). Both are valid. The choice depends on which vector you need to close.',
        bullets: [
          'Physical DB region — Supabase: choose Frankfurt or Ireland at project create. Eurobase: always Scaleway fr-par (Paris/France).',
          'Storage region — Supabase: same EU region as the project. Eurobase: always Scaleway Object Storage fr-par.',
          'Edge Functions region — Supabase: multi-region (US + EU). Eurobase: fr-par only.',
          'Control-plane jurisdiction — Supabase: US (Delaware). Eurobase: Estonia.',
          'Sub-processor list — Supabase: mixed (includes AWS, Vercel — US). Eurobase: 100% EU-headquartered.',
          'CLOUD Act reach — Supabase: yes through the parent. Eurobase: no.',
        ],
      },
      {
        title: 'How your app code changes when you move from Supabase to Eurobase',
        description:
          'For most Supabase apps, moving to Eurobase is closer to a config swap than a rewrite. The SDK shape mirrors Supabase intentionally — the goal is that a Supabase engineer feels at home within an hour, not that they learn a new abstraction.',
        paragraphs: [
          'The client SDK import changes from @supabase/supabase-js to @eurobase/sdk. The createClient(url, key) signature is the same. auth.signUp, auth.signInWithPassword, auth.signInWithOAuth, from(table).select(), rpc(fn, args), storage.from(bucket).upload — all present with matching semantics. Row-level security uses PostgreSQL RLS, so policies that worked on Supabase move over with a search-and-replace on the auth.uid() helper (Eurobase uses eb.auth.uid() as a SECURITY DEFINER helper that returns the same UUID shape).',
          'Realtime subscriptions use the same channel-and-filter pattern (channel(name).on("postgres_changes", { event, schema, table, filter })). Edge Functions are Deno with the same std lib and the same request/response signatures — most Supabase functions compile as-is with only the import URL updated. The CLI substitutes 1-for-1 for the day-to-day workflow: eurobase login, eurobase link, eurobase db push, eurobase functions deploy.',
          'The gaps to be honest about: Supabase\'s SAML SSO paid tier is not yet on Eurobase (planned for the Team tier, coming later in 2026). Supabase Vector (pgvector managed) is on Eurobase\'s roadmap for 2027 as part of the sovereign-AI pipeline. Supabase Studio is more polished than the Eurobase console today; parity is a rolling target.',
          'For everything else, the migration CLI (eurobase import supabase) walks assess → schema → data → storage → functions and prints a diff-and-apply plan. Auth-users import is next.',
        ],
      },
      {
        title: 'Pricing side by side',
        description:
          'Supabase Pro is $25/mo per organization with usage-based overages on database, storage, and bandwidth. Eurobase Pro is €25/mo per project with fixed caps at Pro-tier levels; overage is a signal to upgrade to Team rather than a surprise line item.',
        bullets: [
          'Free tier — Supabase: 50k MAU, 500 MB DB, 1 GB storage, 5 GB bandwidth, 200 realtime, pause after 7 days idle. Eurobase: 5k MAU, 512 MB DB, 512 MB storage, 2 GB bandwidth, 50 realtime, pause after 30 days idle. Every feature included; the tighter caps trade for a longer idle window and every-tier GDPR primitives.',
          'Paid tier — Supabase Pro: $25/mo per org, usage-based over 100k MAU / 8 GB DB / 100 GB storage / 250 GB bandwidth. Eurobase Pro: €25/mo per project, fixed 100k MAU / 100 GB storage / 250 GB bandwidth / 10k realtime.',
          'Team tier — Supabase Team: $599/mo per org (SSO, log retention). Eurobase Team: €149/mo per project (dedicated Postgres, PITR, SSO, RBAC, SOC 2). Coming soon.',
          'Billing entity — Supabase: Supabase Inc. (Delaware). Eurobase: Eurobase OÜ (Estonia). Some EU procurement teams treat this as a hard requirement for VAT-reverse-charge simplicity.',
        ],
        paragraphs: [
          'One nuance worth flagging: Supabase counts MAUs per organization while Eurobase counts them per project. If you run many small projects on one Supabase org today, the Eurobase per-project pricing is simpler to reason about but you will pay for each active project rather than pooling MAU. That is a deliberate design choice — every Eurobase project is its own tenant with its own Postgres schema, its own audit log, and its own DSAR export, which matches how regulated teams tend to want to compartmentalise.',
        ],
      },
    ],
    rows: [
      { feature: 'Database', eurobase: 'PostgreSQL 16 (managed, Scaleway RDB)', competitor: 'PostgreSQL (managed)' },
      { feature: 'Direct Postgres connection', eurobase: 'Team & Legal Team tiers (invite-only beta today) — dedicated Postgres with a rotatable postgres:// URL for Payload, Prisma, Drizzle, Directus, psql. SDK/REST-only on Free & Pro (shared cluster).', competitor: 'All tiers — shared or dedicated Postgres URL exposed by default' },
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
      { feature: 'Pricing (paid tier)', eurobase: '€25/mo per project (Pro). Team tier €149/mo (dedicated Postgres) coming soon.', competitor: '$25/mo per organization (Pro) + usage-based overages', highlight: true },
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
    // These are the exact long-tail queries Search Console shows the
    // /vs/supabase page ranking for (positions 8–15). Answering them
    // in FAQPage schema targets a rich result under the SERP link and
    // adds visible depth for on-page reading time. Keep the question
    // strings tight — they appear as-is in Google FAQ dropdowns.
    faqs: [
      {
        question: 'Is Supabase GDPR compliant?',
        answer:
          'Supabase provides a GDPR Data Processing Addendum, standard contractual clauses, and EU-region hosting (Frankfurt, Ireland). That is enough for many use cases. The gap regulated buyers flag is the CLOUD Act: Supabase Inc. is a Delaware corporation using AWS, so US authorities can compel disclosure even for EU-region data. Eurobase closes that vector by having no US corporate parent and no US-headquartered processor in the critical path.',
      },
      {
        question: 'Does Supabase have EU hosting?',
        answer:
          'Yes — Supabase offers Frankfurt (eu-central-1) and Ireland (eu-west-1) as project regions. The database primary, storage bucket, and default edge-function region can all be pinned to the EU. What EU hosting does not solve is the parent-company jurisdiction: Supabase Inc. remains a US entity under the CLOUD Act. Eurobase runs the same Postgres + auth + storage + realtime + functions surface on Scaleway (France) under Estonian law.',
      },
      {
        question: 'Is there a European alternative to Supabase?',
        answer:
          'Yes — Eurobase is a Supabase-shaped platform (Postgres + auth + storage + realtime + edge functions + vault + CLI) hosted exclusively on Scaleway in France, operated by Eurobase OÜ (Estonian registry code 17557586). No US corporate parent, no US-headquartered sub-processor. The SDK mirrors @supabase/supabase-js so a typical Supabase engineer is productive within an hour, and a CLI migration path (eurobase import supabase) handles schema, data, storage, and functions.',
      },
      {
        question: 'Does the CLOUD Act apply to Supabase EU-region deployments?',
        answer:
          'Yes. The CLOUD Act (18 U.S.C. §2713, 2018) applies to the corporate parent, not the disk location. Because Supabase Inc. is a Delaware corporation, US authorities can compel it to produce data it controls regardless of where the bytes physically sit — including EU-region projects. Microsoft France stated this explicitly under oath at the French Senate in June 2025 for the same reason. Eurobase removes this exposure by removing the US-parent hop.',
      },
      {
        question: 'How much does Supabase cost compared to Eurobase?',
        answer:
          'Supabase Pro is $25/mo per organization with usage-based overages on database size, storage, and bandwidth. Eurobase Pro is €25/mo per project with fixed Pro-tier caps (100k MAU, 100 GB storage, 250 GB bandwidth, 10k realtime connections). Supabase Team is $599/mo per org; Eurobase Team is €149/mo per project (coming soon, includes dedicated Postgres + SSO + RBAC). The Free tier compares roughly: Supabase 50k MAU / 500 MB DB with 7-day pause; Eurobase 5k MAU / 512 MB DB with 30-day pause plus every-tier GDPR primitives included free.',
      },
      {
        question: 'Can I migrate from Supabase to Eurobase?',
        answer:
          'Yes. The Eurobase CLI ships eurobase import supabase with subcommands assess, schema, data, storage, and functions. Each subcommand reads your existing Supabase project read-only and either prints a diff-and-apply plan (assess) or applies the change to a fresh Eurobase project. Auth-users import is the remaining piece and ships next. Because the SDK shape mirrors Supabase, most application code moves with just an import change from @supabase/supabase-js to @eurobase/sdk.',
      },
      {
        question: 'Where does Eurobase host my data?',
        answer:
          'Scaleway fr-par (Paris, France) for everything in the critical path: managed PostgreSQL, S3-compatible object storage, and Deno edge functions. No AWS, no GCP, no Azure. Sub-processors outside the critical path — GatewayAPI (Denmark) for SMS, Mollie (Netherlands) for paid billing when it switches on — are also EU-headquartered. The live sub-processor list is available in every project as a downloadable Article 30 RoPA report.',
      },
      {
        question: 'Is Supabase Vault the same as Eurobase Vault?',
        answer:
          'Similar shape, different guarantees. Both give you a key-value secret store queryable from SQL. Eurobase Vault is AES-256-GCM encrypted at rest with a per-tenant key held in Scaleway KMS, and every read/write is emitted to the audit log with actor, IP, and timestamp. Supabase Vault is a newer feature and integrates with Supabase\'s auth surface; the sovereignty distinction is upstream (Scaleway KMS is EU-owned; AWS KMS is US-owned).',
      },
    ],
    ctaHeadline: 'Ready to build on sovereign infrastructure?',
    ctaDescription: 'Same Postgres, same DX, without the jurisdictional risk. Free tier, no credit card. Pro is €25/mo per project when you go live.',
  },
  firebase: {
    slug: 'firebase',
    competitor: 'Firebase',
    heroHeadline: 'Eurobase vs Firebase: the EU-sovereign SQL alternative',
    heroSubheadline: 'SQL instead of NoSQL. Open standards instead of lock-in. Scaleway (France) instead of Google Cloud — and €25/mo per project once you go live.',
    metaTitle: 'Firebase EU alternative — Eurobase (Postgres, Scaleway, GDPR-native)',
    metaDescription: 'Looking for a Firebase EU alternative? Eurobase runs PostgreSQL + auth + storage + realtime + edge functions on Scaleway (France) under Estonian law — no CLOUD Act, no Google Cloud dependency. GDPR-native DPA + DSAR + audit log in every project. Free tier, €25/mo Pro.',
    sections: [
      {
        title: 'Same job, different architecture',
        description:
          'Firebase and Eurobase solve the same problem — auth, database, storage, realtime, serverless functions in one platform — but the architecture underneath is different in two ways that compound: the data model (Firestore NoSQL vs Postgres SQL) and the jurisdiction (Google in the US vs Eurobase OÜ in Estonia running on Scaleway in France).',
        paragraphs: [
          'Google Firebase is operated by Google LLC, a Delaware corporation headquartered in Mountain View, running on Google Cloud Platform. Even when you pick eur3 (Europe multi-region) or europe-west1 for a Firestore instance, the control plane, the encryption keys, and the corporate parent all sit in the United States. That is why the CLOUD Act question keeps coming up for regulated EU procurement — physical residency is not the same as jurisdictional residency.',
          'Eurobase is operated by Eurobase OÜ, an Estonian private limited company registered on 22 July 2026 (registry code 17557586, Ahtri 12, Tallinn). Every processor in the critical path — database, storage, edge functions — is EU-owned and physically in France (Scaleway fr-par). No AWS, no GCP, no Azure. If you are searching for "Firebase Europe" and want the sovereignty answer without the caveats, that combination is what changes.',
        ],
      },
      {
        title: 'Is Firebase GDPR compliant? The 90% answer and the 10% gap',
        description:
          'Yes — Firebase ships a GDPR Data Processing Addendum via Google Cloud, offers Standard Contractual Clauses, and lets you pin Firestore to European multi-region (eur3) or single-region (europe-west1, europe-west3, europe-west6). For most SaaS teams that is enough to close the compliance ticket. The 10% gap is what your DPO cares about: the CLOUD Act, sub-processor architecture, and DSAR mechanics.',
        paragraphs: [
          'First, the CLOUD Act. A DPA is a contract between you and your processor; it does not override statutes the processor is subject to. Google LLC is subject to US law including the CLOUD Act (18 U.S.C. §2713) and FISA §702, which authorise US authorities to compel disclosure of data held by US-headquartered providers regardless of where the data physically sits. The EDPB has been explicit that this risk survives EU-region hosting when the provider or an upstream processor is under US jurisdiction. A green tick on a Google Cloud compliance page does not neutralise a CLOUD Act warrant.',
          "Second, sub-processor mapping. Under Article 30 GDPR you keep a Record of Processing Activities listing every sub-processor, its role, and the transfer mechanism. Google's Firebase sub-processor list is Google-owned services (Google Cloud, Google Ads, Google Analytics for the Analytics SDK, Crashlytics on Fabric infrastructure) — every one under US jurisdiction. Eurobase's sub-processor list is Scaleway (France), GatewayAPI (Denmark) for SMS, and Mollie (Netherlands) for paid billing — all EU-headquartered. The list is auto-generated in every project's Compliance tab as a downloadable Article 30 record.",
          "Third, DSAR mechanics. GDPR Articles 15 and 20 give data subjects the right to access and port their personal data within 30 days. On Firebase you write a Cloud Function that walks every Firestore collection with a userId field, joins Auth via the Admin SDK, fetches Storage objects, zips them, delivers, and logs. Every DSAR is a mini-engineering ticket. Eurobase ships a one-click console export plus an SDK call (eb.auth.exportMyData()) that end-users can trigger themselves — rate-limited, audit-logged, signed download links that expire after 7 days.",
        ],
        bullets: [
          'Physical data residency in the EU: Firebase = yes (with region choice). Eurobase = always, no toggle.',
          'DPA + Standard Contractual Clauses: Firebase = via Google Cloud DPA. Eurobase = yes.',
          'CLOUD Act exposure through the provider: Firebase = yes (Google LLC). Eurobase = no.',
          'Sub-processors under EU jurisdiction: Firebase = no (all Google-owned). Eurobase = 100%.',
          'Built-in DSAR export (Art. 15 + 20): Firebase = DIY Cloud Function. Eurobase = one click on every tier, free included.',
          'Article 30 RoPA report: Firebase = you write it. Eurobase = auto-generated from live sub-processor registry.',
        ],
      },
      {
        title: 'The Firebase EU region: what physical residency does — and does not — do',
        description:
          "Firebase lets you provision Firestore in eur3 (Europe multi-region) or single-region locations like europe-west1 (Belgium), europe-west3 (Frankfurt), and europe-west6 (Zurich). Cloud Storage for Firebase inherits similar EU choices. Doing so puts the data physically inside Europe, which handles the residency dimension of GDPR. It does not, on its own, answer the CLOUD Act question — because 'residency' and 'jurisdiction' are different vectors.",
        paragraphs: [
          "Residency is about physical location. Jurisdiction is about which state's courts and warrants reach the operator. A Firestore eur3 project keeps your document bytes across Belgium and the Netherlands, but Google LLC — the entity that operates the control plane, holds the encryption keys, and can execute an admin operation on your project — is a Delaware corporation answerable to US courts. When the FBI serves a §2703(d) order on Google LLC, the location of the disk does not enter the analysis.",
          'The Microsoft France testimony under oath at the French Senate in June 2025 made this concrete: Microsoft France said they cannot guarantee that data stored in their EU regions stays out of US reach, because the Redmond parent can be compelled by a US warrant regardless. The same logic applies to every US-headquartered provider — Google, Firebase, Vercel, MongoDB, Snowflake, Datadog — whether or not they run EU regions.',
          'Eurobase closes this vector by removing the US-parent from the graph. Eurobase OÜ is Estonian. Scaleway is French (a subsidiary of Iliad). GatewayAPI is Danish. Mollie is Dutch. No hop in the critical path goes through a jurisdiction outside the EEA. That is the difference between "our data is in Europe" and "our provider is Europe."',
        ],
      },
      {
        title: 'Looking for a Firebase EU alternative? Three questions that decide it',
        description:
          "The search 'firebase eu alternative' tends to come from two audiences: startups in regulated industries (health, fintech, gov-tech, edu-tech) whose DPO has flagged the CLOUD Act, and enterprises whose procurement checklist added an EU-parent requirement after the 2024–2025 sovereignty wave. Three questions decide whether Eurobase is the right substitute:",
        bullets: [
          '(1) Do you need EU corporate parent, not just EU region? If yes, Eurobase is one of very few managed BaaS options that satisfies this filter. Firebase EU-region does not.',
          '(2) Do you need auth + database + storage + realtime + edge functions in one platform? Eurobase ships all five as a Firebase-shaped surface; OVHcloud Managed Database gives you Postgres only, and self-hosting the rest is a big lift.',
          '(3) Are you willing to move from Firestore NoSQL to Postgres SQL? For many apps this is a small win (real joins, transactions, indexes on any field). For some — offline-first mobile with deep nested-document reads — Firestore is genuinely different. If the app is document-heavy with deep nesting, sit down with an engineer before switching.',
        ],
        paragraphs: [
          'If the answer to all three is "yes," the honest recommendation is Eurobase. If you have a Flutter app that relies on Firestore\'s offline sync and nested-document listeners in exactly one screen, evaluate the migration cost against the sovereignty benefit — the answer is not automatic.',
          'For teams already deep into Firebase, most of the surface maps cleanly: Auth (Firebase Auth → Eurobase Auth, 6 methods, JWT sessions), Storage (Firebase Storage → S3-compatible bucket with signed URLs), Realtime (Firestore listeners → Postgres LISTEN/NOTIFY + WebSocket subs with row-filter), Functions (Cloud Functions → Deno edge functions). The interesting piece is the data-model migration — see the section below on how your app code changes.',
        ],
      },
      {
        title: 'Firebase EU hosting compared to a Europe-native backend',
        description:
          'The search "firebase eu hosting" typically means one of two things: "does Firebase have EU regions?" (yes — eur3, europe-west1/3/6) or "what does an EU-first alternative to Firebase hosting look like?" (an Estonian-parent operator running exclusively on Scaleway in France, with no US-owned processor in the critical path — Eurobase). Both are valid. The choice depends on which vector you need to close.',
        bullets: [
          'Firestore region — Firebase: choose eur3 multi-region or europe-west1/3/6 single-region at DB create. Eurobase: always Scaleway fr-par (Paris/France), single-region.',
          'Storage region — Firebase: same EU region as the project (with GCS restrictions). Eurobase: always Scaleway Object Storage fr-par.',
          'Cloud Functions region — Firebase: europe-west1/2/3 available. Eurobase: fr-par only.',
          'Control-plane jurisdiction — Firebase: US (Google LLC). Eurobase: Estonia (Eurobase OÜ).',
          'Sub-processor list — Firebase: entirely Google-owned. Eurobase: 100% EU-headquartered.',
          'CLOUD Act reach — Firebase: yes through Google. Eurobase: no.',
        ],
      },
      {
        title: 'NoSQL to SQL: what changes in your app code when you move from Firestore to Postgres',
        description:
          'This is the biggest honest question for Firebase-to-Eurobase migrators. Firebase uses Firestore, a proprietary NoSQL document database with per-collection listeners, sharded queries, and no server-side joins. Eurobase uses PostgreSQL, the same relational engine your DBA has trusted since 1996. Most modern web apps benefit from the switch. A minority of offline-first mobile apps genuinely favour Firestore.',
        paragraphs: [
          "Reads: on Firebase you fetch a collection (db.collection('posts').where('userId', '==', uid).get()); on Eurobase you write SELECT * FROM posts WHERE user_id = auth.uid(). The Eurobase SDK gives you the from(table).select().eq('user_id', uid) shape too, but you also get real SQL — joins, aggregates, window functions, CTEs, full-text search, JSONB, PostGIS. Firestore charges by document read; Postgres charges by query time.",
          'Writes: Firebase transactions are per-document optimistic transactions with a 500-doc batch limit. Postgres transactions are ACID with any table, any row count. If you have ever tried to atomically move a user across two Firestore collections, you have felt the limit.',
          "Realtime: Firestore's snapshot listeners give you a per-document push when anything in the query result changes. Eurobase realtime uses Postgres logical replication surfaced over WebSockets with row-filter — same subscribe-and-render pattern, different engine underneath. Semantics: Firestore delivers full documents; Eurobase delivers row-level change events (INSERT/UPDATE/DELETE with new + old row).",
          'Security: Firestore security rules are a proprietary DSL evaluated on every read. Postgres RLS is SQL policies evaluated as a WHERE clause on every row. Both are declarative and both correctly close the client-trust problem — the choice is which DSL your team already knows.',
          'Offline / mobile: this is where Firestore is genuinely different. The Firebase SDK maintains a local cache with automatic conflict resolution on reconnect. Postgres does not; if you need that, you build it with your own outbox pattern (or use a specialised tool like PowerSync / Electric on top of Postgres). Worth flagging honestly.',
        ],
      },
      {
        title: 'Firebase pricing vs Eurobase pricing',
        description:
          'Firebase Spark (free) covers small apps but caps hard at daily reads/writes and free Cloud Functions invocations. Firebase Blaze (pay-as-you-go) has no fixed monthly base and charges per Firestore read/write/delete plus storage, bandwidth, function invocations, and outbound network — which is where the horror-story bills come from. Eurobase Pro is €25/mo per project with fixed caps; overage is a signal to upgrade to Team rather than a surprise line item.',
        bullets: [
          'Free tier — Firebase Spark: 50k Firestore reads/day, 20k writes/day, 1 GB storage, 10 GB bandwidth. Eurobase: 5k MAU, 512 MB DB, 512 MB storage, 2 GB bandwidth, 50 realtime, every-tier GDPR primitives included.',
          'Paid tier — Firebase Blaze: pay-per-read/write/storage/bandwidth/invocation, no fixed base. Eurobase Pro: €25/mo per project, fixed 100k MAU / 100 GB storage / 250 GB bandwidth / 10k realtime.',
          'Team / enterprise — Firebase: no fixed enterprise tier; you scale via GCP support contracts. Eurobase Team: €149/mo per project (dedicated Postgres, PITR, SSO, RBAC, SOC 2). Coming soon.',
          'Billing entity — Firebase: Google Ireland Limited or Google LLC depending on region. Eurobase: Eurobase OÜ (Estonia). Some EU procurement teams treat this as a hard requirement for VAT-reverse-charge simplicity.',
        ],
        paragraphs: [
          "One nuance worth flagging: Firebase's pay-per-read model can be dramatically cheaper for small apps and dramatically expensive for read-heavy ones (news feeds, dashboards, real-time collaborative tools). Eurobase's fixed per-project pricing is the opposite: predictable at scale, marginally more expensive for near-idle projects. If you are running 10 near-idle side projects on Firebase, Eurobase per-project pricing will feel like a step up; if you have one high-read app on Blaze burning €400/mo, Eurobase Pro at €25/mo is a step down.",
        ],
      },
      {
        title: 'Vendor lock-in: what actually locks you in on Firebase',
        description:
          'Firebase lock-in is not one thing — it is a stack of proprietary primitives that only work inside the Google ecosystem. Migrating away is possible but rarely a config swap. Eurobase is deliberately built on open standards (Postgres, S3 API, JWT, WebSocket, HTTP) so the exit path is a documented migration, not a rewrite.',
        bullets: [
          'Data format — Firestore documents export to a proprietary format; Postgres exports to standard SQL (pg_dump).',
          'Query language — Firestore SDK is unique to Firebase; SQL is a standard learned by every engineer since 1976.',
          'Security rules — Firestore rules are a bespoke DSL; Postgres RLS uses standard SQL boolean expressions.',
          'Realtime — Firestore listeners are unique; Eurobase realtime is Postgres logical replication + WebSocket, both standards.',
          'Auth — Firebase Auth issues Google-branded tokens; Eurobase Auth issues standard JWTs verifiable by any JWKS-aware library.',
          'Storage — Firebase Storage wraps GCS with proprietary URL signing; Eurobase Storage exposes the S3 API used by AWS, MinIO, Ceph, Wasabi, and every other object store.',
          'Functions — Firebase Cloud Functions run only on GCP; Eurobase edge functions are Deno, which runs anywhere Deno runs.',
        ],
      },
    ],
    rows: [
      { feature: 'Database', eurobase: 'PostgreSQL 16 (managed, Scaleway RDB)', competitor: 'Firestore (NoSQL, document)', highlight: true },
      { feature: 'Query Language', eurobase: 'Standard SQL + SDK', competitor: 'Proprietary Firestore SDK only', highlight: true },
      { feature: 'Direct Postgres connection', eurobase: 'Team & Legal Team tiers (invite-only beta today) — dedicated Postgres with a rotatable postgres:// URL for Payload, Prisma, Drizzle, Directus, psql', competitor: 'No direct DB access — Firestore SDK only', highlight: true },
      { feature: 'Infrastructure', eurobase: 'Scaleway, France (EU-owned)', competitor: 'Google Cloud (US-owned)', highlight: true },
      { feature: 'Corporate parent', eurobase: 'Estonian OÜ', competitor: 'US corporation (Google LLC, Delaware)', highlight: true },
      { feature: 'CLOUD Act exposure', eurobase: 'None', competitor: 'Yes — US jurisdiction applies globally', highlight: true },
      { feature: 'Data portability', eurobase: 'pg_dump, standard SQL export', competitor: 'Firestore export (proprietary format)', highlight: true },
      { feature: 'Auth methods', eurobase: 'Email/password, magic link, phone SMS, OAuth (6 providers)', competitor: 'Email, OAuth, phone, anonymous' },
      { feature: 'Row-level security', eurobase: 'PostgreSQL RLS with preset policy shape', competitor: 'Firestore security rules (proprietary DSL)' },
      { feature: 'Realtime', eurobase: 'Postgres logical replication + WebSockets with row-filter', competitor: 'Firestore listeners (per-document push)' },
      { feature: 'Edge functions', eurobase: 'Deno runtime, hosted in France', competitor: 'Cloud Functions (Node/Python, Google Cloud)' },
      { feature: 'Storage', eurobase: 'S3-compatible object storage', competitor: 'Firebase Storage (GCS-backed)' },
      { feature: 'Vault / Secrets', eurobase: 'AES-256-GCM, per-tenant key, built-in', competitor: 'Google Secret Manager (separate GCP service)' },
      { feature: 'Free-tier idle pause', eurobase: 'After 30 days idle; single request wakes it (~30 s). Never on Pro.', competitor: 'No pause — hard daily quotas instead', highlight: true },
      { feature: 'Pricing model', eurobase: 'Predictable per-plan (€25/mo Pro, fixed caps)', competitor: 'Pay-per-read/write/invocation (spike risk)', highlight: true },
      { feature: 'Offline / local cache', eurobase: 'No built-in offline cache (use PowerSync/Electric on top)', competitor: 'Built-in — SDK caches queries and syncs on reconnect', highlight: true },
      { feature: 'Cron jobs', eurobase: 'Built-in scheduler with execution log', competitor: 'Cloud Scheduler (separate GCP service)' },
      { feature: 'Webhooks', eurobase: 'Built-in with HMAC signing + retries', competitor: 'DIY via Cloud Functions' },
      { feature: 'CLI', eurobase: '50+ commands (projects, DB, storage, vault, functions, migrations, cron, webhooks)', competitor: 'Firebase CLI' },
      { feature: 'MCP server (AI IDEs)', eurobase: 'First-class — Claude Code, Cursor, Windsurf, Codex', competitor: 'Community MCP servers' },
      { feature: 'Audit logging', eurobase: 'Built-in — every admin action with actor, IP, timestamp', competitor: 'Cloud Audit Logs (Google Cloud, extra config)', highlight: true },
      { feature: 'DSAR / Article 15 export', eurobase: 'One click — per-user or full-project zip', competitor: 'DIY Cloud Function walking every collection + Auth + Storage' },
      { feature: 'DPA / Article 30 record', eurobase: 'Auto-generated from actual sub-processor registry', competitor: 'On request from Google' },
      { feature: 'Vendor lock-in', eurobase: 'None — Postgres, S3, JWT, WebSocket, Deno', competitor: 'High — Firestore SDK, Rules DSL, Cloud Functions runtime', highlight: true },
    ],
    sovereigntyHeadline: 'Google Cloud is not European infrastructure',
    sovereigntyPoints: [
      'Firebase runs on Google Cloud. Google LLC is a US corporation subject to the CLOUD Act (18 U.S.C. §2713), FISA §702, and other US surveillance statutes.',
      'Even with eur3 or europe-west1/3/6 regions, Google retains operational access to your data and must comply with US government requests — physical residency does not remove jurisdiction.',
      'Eurobase runs on Scaleway (Iliad group, France) — 100% EU-owned. Corporate parent is an Estonian OÜ; every processor in the RoPA is EU-headquartered.',
      'GDPR compliance with Firebase requires SCCs, TIAs, and a US-parent risk analysis in your RoPA. With Eurobase it is the default architecture.',
      'DPA, RoPA, DSAR export, and audit log are built into every Eurobase project on every tier — including Free. Not paywalled.',
    ],
    faqs: [
      {
        question: 'Is Firebase GDPR compliant?',
        answer:
          'Firebase provides a GDPR Data Processing Addendum via Google Cloud, Standard Contractual Clauses, and EU regions for Firestore (eur3, europe-west1/3/6) and Cloud Storage. That is enough for many use cases. The gap regulated buyers flag is the CLOUD Act: Google LLC is a US corporation, so US authorities can compel disclosure even for EU-region data. Eurobase closes that vector by having no US corporate parent and no US-headquartered processor in the critical path.',
      },
      {
        question: 'Does Firebase have EU hosting?',
        answer:
          'Yes — Firestore supports eur3 (Europe multi-region across Belgium and the Netherlands) and single-regions europe-west1 (Belgium), europe-west3 (Frankfurt), europe-west6 (Zurich). Cloud Storage for Firebase and Cloud Functions have similar EU choices. What EU hosting does not solve is the parent-company jurisdiction: Google LLC remains a US entity under the CLOUD Act. Eurobase runs the same auth + database + storage + realtime + functions surface on Scaleway (France) under Estonian law.',
      },
      {
        question: 'Is there a European alternative to Firebase?',
        answer:
          'Yes — Eurobase is a Firebase-shaped platform (auth + Postgres + storage + realtime + edge functions + vault + CLI) hosted exclusively on Scaleway in France, operated by Eurobase OÜ (Estonian registry code 17557586). No US corporate parent, no US-headquartered sub-processor. The trade-off vs Firebase is data-model (SQL instead of NoSQL) rather than sovereignty (which is a strict win).',
      },
      {
        question: 'Does the CLOUD Act apply to Firebase EU-region deployments?',
        answer:
          'Yes. The CLOUD Act (18 U.S.C. §2713, 2018) applies to the corporate parent, not the disk location. Because Google LLC is a Delaware-registered US corporation, US authorities can compel it to produce data it controls regardless of where the bytes physically sit — including eur3 and europe-west1 Firestore instances. Microsoft France stated this explicitly under oath at the French Senate in June 2025 for the same reason. Eurobase removes this exposure by removing the US-parent hop.',
      },
      {
        question: 'How much does Firebase cost compared to Eurobase?',
        answer:
          "Firebase Spark (free) covers small apps but caps at daily read/write and function-invocation quotas. Firebase Blaze is pay-as-you-go: per Firestore read/write/delete, storage GB-month, bandwidth GB, function invocations, and outbound network — which is where the horror-story bills come from. Eurobase Pro is €25/mo per project with fixed Pro-tier caps (100k MAU, 100 GB storage, 250 GB bandwidth). If you run 10 near-idle side projects, Firebase is cheaper. If you have one read-heavy app burning €400/mo on Blaze, Eurobase Pro is a step down.",
      },
      {
        question: 'Can I migrate from Firebase to Eurobase?',
        answer:
          "Yes, but it is a real migration rather than a config swap. The auth, storage, and functions surfaces map cleanly (Firebase Auth → Eurobase Auth, Firebase Storage → S3, Cloud Functions → Deno edge functions). The interesting piece is the data model: Firestore documents move to Postgres tables, which usually simplifies the schema (real joins, transactions, indexes on any field) but requires an ETL script. A migration CLI (eurobase import firebase) is on the roadmap; today the recommended path is a documented manual migration with the Eurobase team's help.",
      },
      {
        question: 'Where does Eurobase host my data?',
        answer:
          'Scaleway fr-par (Paris, France) for everything in the critical path: managed PostgreSQL, S3-compatible object storage, and Deno edge functions. No AWS, no GCP, no Azure. Sub-processors outside the critical path — GatewayAPI (Denmark) for SMS, Mollie (Netherlands) for paid billing when it switches on — are also EU-headquartered. The live sub-processor list is available in every project as a downloadable Article 30 RoPA report.',
      },
      {
        question: "Do I lose Firestore's offline sync when I move to Eurobase?",
        answer:
          "Yes — Firestore's offline cache with automatic conflict resolution is genuinely one of Firebase's strongest features and does not exist out of the box on Postgres. If your app is offline-first mobile with deep nested-document listeners, this is the migration cost you need to price in. Options: (1) accept an online-required flow, (2) build an outbox pattern in the client, or (3) run PowerSync or Electric on top of Eurobase Postgres for offline sync. For online-first web apps this is rarely a blocker.",
      },
    ],
    ctaHeadline: 'Switch from NoSQL to SQL without switching continents',
    ctaDescription: 'Get a modern backend with PostgreSQL, real SQL queries, and full EU sovereignty. Free tier, no credit card required. Pro is €25/mo per project when you go live.',
  },
  appwrite: {
    slug: 'appwrite',
    competitor: 'Appwrite',
    heroHeadline: 'Eurobase vs Appwrite: PostgreSQL vs collections, EU-owned infra vs Appwrite Cloud on AWS',
    heroSubheadline: 'Same open-source spirit, different data model and different infrastructure — Postgres on Scaleway (France) instead of collections on AWS, GDPR-native primitives in every project, €25/mo per project once you go live.',
    metaTitle: 'Appwrite EU alternative — Eurobase (Postgres, Scaleway France, GDPR-native)',
    metaDescription: 'Looking for an Appwrite EU alternative? Eurobase runs PostgreSQL + auth + storage + realtime + edge functions on Scaleway (France) instead of Appwrite Cloud on AWS. Real SQL instead of document collections. GDPR-native DPA + DSAR + audit log in every project. Free tier, €25/mo Pro.',
    sections: [
      {
        title: 'Two open-ish, developer-first stacks — two very different jurisdictional shapes',
        description:
          'Eurobase and Appwrite both aim at the same buyer: a developer who wants an open, batteries-included backend without stitching together auth, storage, functions, and a database from scratch. Both ship auth, storage, functions, realtime, and a data layer. The differences are jurisdictional (where the corporate parent sits, what statutes the infrastructure is subject to) and structural (PostgreSQL as the primary abstraction vs. Appwrite\'s dual document/relational surface via Collections + TablesDB).',
        paragraphs: [
          'Appwrite is open-source (BSD-3-Clause) with a self-host option, plus a managed Appwrite Cloud. The company (Appwrite Code Ltd) is headquartered in Tel Aviv, Israel; Appwrite Cloud runs on AWS, with the EU region on eu-central-1 (Frankfurt). Israel has an EU adequacy decision (Commission Decision 2011/61/EU, renewed in 2024), which handles the transfer mechanism for Israel itself — but the AWS layer is a separate question, because AWS is a Delaware corporation subject to the CLOUD Act regardless of region. If you evaluated Appwrite and preferred it for its data-model breadth or its Flutter-first SDK, the honest question is whether the AWS dependency and the corporate-parent-outside-the-EEA add friction to your compliance posture.',
          'Eurobase is a PostgreSQL platform operated by Eurobase OÜ (Estonian private limited company, registry code 17557586, Ahtri 12, Tallinn), running exclusively on Scaleway in France (fr-par). The critical path — Postgres, S3-compatible object storage, Deno edge functions — is on EU-owned infrastructure, with no adequacy hop required in the corporate-parent analysis. If your team wants relational queries, a real SQL surface, and an EU-native jurisdictional stack, that combination is what Eurobase does specifically.',
        ],
      },
      {
        title: 'Data model: Appwrite\'s dual surface vs Postgres-first — where the differences still matter',
        description:
          'Appwrite\'s model changed materially in 2025. Alongside the original Collections + Documents + Attributes shape, TablesDB introduced a relational surface (tables, rows, columns) with SQL-style constraints, and Appwrite 1.8 (October 2025) added a multi-record ACID Transactions API. Any comparison written against the pre-2025 product is out of date. The remaining differences are real but narrower than they used to be: Postgres depth vs Appwrite\'s dual model, and where the ecosystem meets you.',
        paragraphs: [
          'Appwrite gives you both worlds now: the document metaphor for hierarchical data (Collections) and the relational metaphor for classic joined-tables workloads (TablesDB). The multi-record Transactions API removes the previous "single-document only" constraint. For a lot of app shapes this is genuinely convenient.',
          'PostgreSQL is still a better fit when you need the depth of the mature Postgres surface — window functions with frames, CTEs, materialised views, generated columns, GIN/GiST/BRIN indexes on JSONB, foreign-key cascades with deferrable constraints, serialisable isolation, listen/notify, extensions (pgcrypto, pg_trgm, PostGIS, pgvector on Team-tier). It is also where the majority of open-source data tooling lives natively: Metabase, Superset, dbt, Grafana, PostgREST, Hasura, Directus all speak Postgres without an export step.',
          'The concrete question is whether the additional Postgres depth is load-bearing for your product. If you use CTEs and window functions in analytics queries, if you rely on Postgres-native tooling in your data pipeline, or if a Team-tier customer wants direct psql/postgres:// access for Prisma/Drizzle/Payload/Directus, Eurobase\'s Postgres-first surface is the right fit. If TablesDB\'s relational shape covers your needs and you value the Flutter-first SDK story, Appwrite is a reasonable pick — and the sovereignty conversation reduces to the AWS-underneath-Cloud question.',
        ],
        bullets: [
          'Data model — Appwrite: Collections (documents) + TablesDB (relational rows/columns). Eurobase: PostgreSQL tables, JSONB when you want document-shape inside a row.',
          'Joins across entities — Appwrite: TablesDB supports relationships; complexity for many-way joins still lands on the SQL side. Eurobase: native SQL joins with the full planner.',
          'Multi-record transactions — Appwrite: multi-record ACID Transactions API (since 1.8, Oct 2025). Eurobase: BEGIN/COMMIT across any tables, plus serialisable isolation.',
          'Advanced Postgres — Appwrite: not exposed (CTEs, window functions, extensions live outside the SDK surface). Eurobase: full Postgres surface including pgvector on Team-tier.',
          'Ecosystem — Appwrite: platform-specific SDKs and a growing tool list. Eurobase: every Postgres-native tool works (Metabase, dbt, Grafana, PostgREST, psql).',
          'Direct DB access — Appwrite: not exposed on Cloud (SDK/REST only). Eurobase: Team & Legal Team tiers ship a rotatable postgres:// URL for Prisma / Drizzle / Payload / Directus; SDK/REST-only on Free & Pro.',
        ],
      },
      {
        title: 'Appwrite Cloud EU region: what the AWS dependency actually means',
        description:
          'Appwrite Cloud offers a Frankfurt region built on AWS eu-central-1. Physically, your data sits in Frankfurt. Jurisdictionally, the infrastructure is operated by Amazon Web Services, Inc., a Delaware corporation subject to the CLOUD Act. This is not a criticism of Appwrite — it is the standard trade-off any managed BaaS running on a hyperscaler faces. It is worth naming so procurement can weigh it.',
        paragraphs: [
          'Under the CLOUD Act (18 U.S.C. §2713, 2018), US authorities can compel disclosure of data held by US-headquartered providers or their subsidiaries, regardless of where the bytes physically sit. AWS falls squarely inside that rule. The Microsoft France testimony under oath at the French Senate in June 2025 made the same point about Azure EU regions: physical residency does not neutralise a warrant that reaches the US parent. AWS operates on the same statutory footing.',
          'For most Appwrite Cloud users this is a non-issue — the CLOUD Act only bites when there is a US legal process against your data, and for most consumer or B2B SaaS apps that is a distant tail risk. For teams in regulated sectors (health, legal, gov-tech, some fintech), or teams selling into buyers whose procurement checklist added an EU-parent requirement after the 2024–2025 sovereignty wave, the tail risk becomes a hard filter.',
          'Eurobase runs on Scaleway fr-par (Paris/France), a subsidiary of the French Iliad group. No hop in the critical path goes through a US-headquartered company. That is the difference between "our data is in Europe" and "our provider is Europe."',
        ],
      },
      {
        title: 'Self-hosting Appwrite vs a managed EU alternative',
        description:
          'Appwrite is BSD-3-Clause and genuinely self-hostable. That is a legitimate answer to the sovereignty question — run it on a Scaleway VM, and you have EU-hosted Appwrite with none of the AWS dependency. The trade-off is the operational cost.',
        paragraphs: [
          'Self-hosting Appwrite means you own the Docker Compose stack (MariaDB + Redis in the core, plus the Appwrite services; ClamAV and some other components are optional in current 1.6–1.8 releases — the pre-1.4 InfluxDB dependency is gone), the container image upgrades, the backup and restore, the certificate rotation, the SMTP / OAuth secrets, the intrusion monitoring, the log retention, the disk sizing, and the failover story. For a solo developer or a small team where one person happily does this, self-hosted Appwrite on Scaleway or Hetzner is a fine answer.',
          'For most product teams the calculation is different. The reason people pick a BaaS is to not run infrastructure. Eurobase is a middle path: a managed platform where the operator (Eurobase OÜ) and the underlying cloud (Scaleway) are both EU-owned, and where the operational burden stays with the vendor. If self-hosting Appwrite feels like the right answer but the ongoing on-call is not something the team wants, Eurobase is the version of that decision that keeps the developer experience without the DevOps cost.',
          'Neither answer is wrong. The wrong answer is picking Appwrite Cloud without noticing the AWS dependency, or picking self-hosted Appwrite without pricing the on-call time honestly.',
        ],
      },
      {
        title: 'The GDPR primitives every project ships with',
        description:
          'Regardless of which side of the Appwrite vs Eurobase choice you land on, if you serve EU end-users you own three GDPR obligations that most managed platforms leave as your homework: a Record of Processing Activities (Article 30), Data Subject Access Requests within 30 days (Articles 15 + 20), and an audit trail sufficient for a breach investigation. Eurobase ships all three built-in on every tier, including Free. The point is not that Appwrite is non-compliant — it is that GDPR compliance for a data controller (your app) requires certain artifacts, and Eurobase produces them automatically while Appwrite leaves them as work the developer does.',
        bullets: [
          'DSAR export (Article 15 + 20) — one click per-user or full-project zip, signed download URL that expires after 7 days, audit-logged. Appwrite = DIY.',
          'RoPA report (Article 30) — auto-generated from the live sub-processor registry every time you download it. Appwrite = DIY.',
          'Audit log — every admin action (schema change, user delete, key rotation, DSAR run) with actor, IP, timestamp, tamper-evident hash chain. Appwrite Cloud has activity logs; hash-chained audit is not the default shape.',
          'Sub-processor list — public, machine-readable, one-click download. Same information Appwrite publishes, delivered as a structured Article 30 artifact rather than a marketing page.',
          'End-user self-serve DSAR — eb.auth.exportMyData() lets your signed-in end-users request their own export from your app. Rate-limited, audit-logged, zero engineering per request.',
        ],
      },
      {
        title: 'How your app code changes when you move from Appwrite',
        description:
          'The Appwrite SDK shape is not identical to the Eurobase SDK — the data-model difference means a straight import-swap is not the story. What is true is that the surface areas map cleanly: Appwrite Databases → Eurobase eb.db (with SQL semantics), Appwrite Account → eb.auth, Appwrite Storage → eb.storage, Appwrite Realtime → eb.realtime, Appwrite Functions → eb.functions. The mental model port is short; the query rewrites are the substantive work.',
        paragraphs: [
          'The client SDK import changes from appwrite to @eurobase/sdk. Authentication calls (create account, create session, get session) map one-to-one to eb.auth methods. Storage upload / download / list operations translate cleanly. Realtime subscriptions move from channel strings ("databases.{id}.collections.{id}.documents") to a channel-and-filter shape (channel(name).on("postgres_changes", { event, schema, table, filter })) that is closer to Supabase realtime than to Appwrite realtime — this is one of the transitions that needs handling.',
          'The database calls change most. Appwrite\'s createDocument / getDocument / listDocuments become eb.db.from(\'table\').insert(...) / .select().eq(\'id\', ...) / .select() with SQL filters. The Appwrite Query builder (Query.equal, Query.orderDesc, Query.limit) maps to the Eurobase query builder\'s .eq() / .order() / .limit() with mostly matching semantics. Appwrite\'s Permissions (read/write/create/update/delete on collections) become PostgreSQL RLS policies — Eurobase ships preset policies (owner_access, public_read_owner_write, service_only, read_only) that cover the same common patterns without hand-writing the SQL.',
          'The gaps to be honest about: Eurobase does not ship a first-party Flutter SDK today (JS/TS is the primary; the wire protocol works from any Postgres client or HTTP). We do not have an Appwrite migration CLI — for teams with substantial Appwrite deployments, the current path is a script the developer writes against the Appwrite REST API to read documents and eb.db.insert() them into Postgres tables. If a specific Appwrite Cloud customer wants to migrate at scale we would build the CLI subcommand.',
        ],
      },
      {
        title: 'Pricing side by side (post-September 2025)',
        description:
          'Appwrite repriced Appwrite Cloud in September 2025 — Pro is now $25/mo per project (the previous $15 rate applied per team member, not per organization) with usage-based overages. Eurobase Pro is €25/mo per project with fixed caps. Self-hosted Appwrite is still free plus the operational cost of running the stack.',
        bullets: [
          'Self-hosted — Appwrite: BSD-3-Clause, run it yourself (Docker Compose, MariaDB + Redis + optional components). Eurobase: not self-hostable today.',
          'Free tier — Appwrite Cloud: generous limits (250 concurrent realtime connections, 5 GB bandwidth) alongside functions, storage, and MAU caps. Eurobase: 5k MAU, 512 MB DB, 512 MB storage, 2 GB bandwidth, 50 realtime connections, pause after 30 days idle.',
          'Paid tier — Appwrite Pro: $25/mo per project with usage-based overages. Eurobase Pro: €25/mo per project with fixed caps (100k MAU, 100 GB storage, 250 GB bandwidth, 10k realtime).',
          'Enterprise / Team tier — Appwrite Scale is a custom-priced tier for higher usage and support. Eurobase Team: €149/mo per project (dedicated Postgres, PITR, SSO, RBAC, SOC 2 — invite-only beta today).',
          'Billing entity — Appwrite Cloud: Appwrite Code Ltd (Israel). Eurobase: Eurobase OÜ (Estonia). Both count per project post-Sep 2025.',
        ],
      },
    ],
    rows: [
      { feature: 'Data model', eurobase: 'PostgreSQL (tables, joins, transactions, SQL, JSONB when a row wants document shape)', competitor: 'Collections (documents) + TablesDB (relational rows/columns) — dual surface as of 2025', highlight: true },
      { feature: 'Direct database access', eurobase: 'Team & Legal Team tiers — rotatable postgres:// URL for Prisma, Drizzle, Payload, Directus, psql. Not exposed on Free/Pro (shared cluster).', competitor: 'Not exposed — access via SDK / REST only', highlight: true },
      { feature: 'Infrastructure (managed)', eurobase: 'Scaleway, France (EU-owned)', competitor: 'AWS eu-central-1 (US-owned, Frankfurt region)', highlight: true },
      { feature: 'Self-hosted option', eurobase: 'Not today', competitor: 'BSD-3-Clause, Docker Compose (MariaDB + Redis + optional components)' },
      { feature: 'Corporate parent (managed)', eurobase: 'Estonian OÜ (EU member state)', competitor: 'Appwrite Code Ltd (Tel Aviv, Israel — EU adequacy decision applies); AWS = Delaware corporation', highlight: true },
      { feature: 'CLOUD Act exposure (managed)', eurobase: 'None', competitor: 'Yes — AWS is a US corporation', highlight: true },
      { feature: 'GDPR compliance', eurobase: 'Native — DPA, RoPA, DSAR export, audit log in every project', competitor: 'DPA available; RoPA + DSAR left to the customer' },
      { feature: 'Auth methods', eurobase: 'Email/password, magic link, phone SMS, OAuth (6 providers)', competitor: 'Email/password, magic link, phone SMS, OAuth, anonymous, JWT' },
      { feature: 'Row / document permissions', eurobase: 'PostgreSQL RLS with preset shapes (owner_access, service_only, read_only, …)', competitor: 'Per-document permissions (read / write / update / delete)' },
      { feature: 'Realtime', eurobase: 'WebSocket subscriptions on Postgres changes with row-filter', competitor: 'WebSocket subscriptions on collection events' },
      { feature: 'Edge functions', eurobase: 'Deno runtime, hosted in France (fr-par)', competitor: 'Functions runtime, hosted on AWS' },
      { feature: 'First-party mobile SDKs', eurobase: 'JS/TS today (Flutter / React Native / native iOS / native Android can call the REST endpoints; direct postgres:// wire access is Team/Legal Team only and not intended for mobile clients).', competitor: 'Flutter, React Native, Android, iOS, Apple platforms — first-class', highlight: true },
      { feature: 'Vault / Secrets', eurobase: 'AES-256-GCM, per-tenant key, built-in with audit log', competitor: 'Environment variables per function' },
      { feature: 'Free-tier idle pause', eurobase: 'After 30 days idle; single request wakes it (~30 s). Never on Pro.', competitor: 'No idle pause on Appwrite Cloud Free — different constraint model (usage caps).' },
      { feature: 'Pricing (paid tier)', eurobase: '€25/mo per project (Pro). Team €149/mo (dedicated Postgres, invite-only beta today).', competitor: '$25/mo per project (Pro, post-Sep 2025) + usage-based overages. Scale is custom-priced.', highlight: true },
      { feature: 'Cron jobs', eurobase: 'Built-in scheduler with execution log', competitor: 'Function schedules (cron expression on functions)' },
      { feature: 'Webhooks', eurobase: 'Built-in with HMAC signing + retries', competitor: 'Webhooks for events on collections + auth' },
      { feature: 'CLI', eurobase: '50+ commands (projects, DB, storage, vault, functions, migrations, cron, webhooks)', competitor: 'CLI available' },
      { feature: 'MCP server (AI IDEs)', eurobase: 'First-class — Claude Code, Cursor, Windsurf, Codex', competitor: 'Community MCP servers' },
      { feature: 'Audit logging', eurobase: 'Built-in — every admin action with actor, IP, timestamp, tamper-evident hash chain', competitor: 'Activity logs (not hash-chained by default)', highlight: true },
      { feature: 'DSAR / Article 15 export', eurobase: 'One click — per-user or full-project zip, signed URL expires in 7 days', competitor: 'DIY: read documents by permission + zip yourself' },
      { feature: 'DPA / Article 30 record', eurobase: 'Auto-generated from actual sub-processor registry', competitor: 'DPA on request; RoPA generation left to the customer' },
      { feature: 'Migration from Appwrite', eurobase: 'DIY today: script the Appwrite REST API → eb.db.insert(). CLI subcommand ships when a substantial Appwrite migration is requested.', competitor: '—' },
    ],
    sovereigntyHeadline: 'EU-run BaaS on EU-owned infrastructure',
    sovereigntyPoints: [
      'Eurobase infrastructure is 100 % EU-owned: Scaleway, France (fr-par). No AWS, no GCP, no Azure — not for the DB, not for storage, not for functions.',
      'Appwrite Cloud EU region is on AWS eu-central-1 (Frankfurt). Appwrite Code Ltd is headquartered in Tel Aviv, Israel — an adequacy-decision country under EU law, so Israel-side data transfers are covered — but AWS as the underlying infrastructure is a US corporation subject to the CLOUD Act. Physical residency does not neutralise jurisdictional reach through the AWS parent.',
      'Eurobase has zero CLOUD Act exposure. Corporate parent is an Estonian OÜ; every processor in the RoPA is EU-headquartered.',
      'DPA, RoPA, DSAR export, and audit log are built into every project on every tier. Not paywalled — a legal obligation should not sit behind a $99/mo SKU.',
    ],
    faqs: [
      {
        question: 'Where is Appwrite headquartered?',
        answer:
          'Appwrite Code Ltd is headquartered in Tel Aviv, Israel. Israel has an EU adequacy decision (Commission Decision 2011/61/EU, renewed 2024), so data transfers from the EU to Israel are covered by adequacy rather than requiring Standard Contractual Clauses. The separate question is the infrastructure layer: Appwrite Cloud runs on AWS, and AWS is a Delaware corporation subject to the CLOUD Act. For regulated buyers doing a DPIA, the specific thing to name is the AWS layer.',
      },
      {
        question: 'Where does Appwrite Cloud host my data?',
        answer:
          'Appwrite Cloud offers a Frankfurt region on AWS eu-central-1. Physically your data sits in Frankfurt. Jurisdictionally the operator of the underlying infrastructure is Amazon Web Services, Inc. (Delaware corporation), which is subject to the CLOUD Act. Eurobase runs the equivalent surface (auth, database, storage, realtime, functions) on Scaleway (France) — an EU-owned operator with no US parent in the chain.',
      },
      {
        question: 'Is there a Postgres-based alternative to Appwrite?',
        answer:
          'Yes — Eurobase is a Postgres-first BaaS with auth, storage, realtime, edge functions, vault, cron, webhooks, and a CLI. The trade-off vs Appwrite is the data model: PostgreSQL tables and SQL instead of collections and attributes. That is a substantive migration when you have deeply nested documents; it is a straightforward one when your entities are naturally relational. If joins across entities, aggregations, or the Postgres analytics ecosystem (Metabase, dbt, Grafana) matter for your app, Eurobase fits.',
      },
      {
        question: 'Can I self-host Eurobase like I can self-host Appwrite?',
        answer:
          'Not today — Eurobase is a managed platform, not a self-hostable one. The reason is that many of the sovereignty and compliance guarantees (audit-log hash chaining, sub-processor registry, DSAR pipeline, per-tenant KMS key management) are operator-side properties that lose their meaning when the user hosts. If self-hosting is a hard requirement, self-hosted Appwrite on Scaleway or Hetzner is a legitimate answer — you own the operational burden, in exchange for full sovereignty control.',
      },
      {
        question: 'Does Eurobase have Flutter or React Native SDKs like Appwrite?',
        answer:
          'Not first-party today — JavaScript/TypeScript is the primary Eurobase SDK. Flutter and React Native apps use Eurobase via the REST endpoints and, for direct Postgres access on Team/Legal Team, via any Postgres client library. Appwrite has invested heavily in Flutter and native-mobile SDKs, and if that developer experience is the top decision factor, that is a legitimate reason to prefer Appwrite. If SQL and EU-owned infrastructure are the top factors, Eurobase is the correct trade-off.',
      },
      {
        question: 'Can I migrate from Appwrite to Eurobase?',
        answer:
          'Not with a one-command CLI today. The path is: write a small script against the Appwrite REST API to read documents from your collections, map them to Postgres tables, and use eb.db.from(table).insert() to load them. Because collections and tables are not one-to-one (documents can be arbitrarily nested; tables have fixed columns), part of the migration is a schema design pass. If a Team-tier customer wants to migrate substantial Appwrite data at scale, we build the CLI subcommand — the pattern is already there in the eurobase import supabase implementation.',
      },
      {
        question: 'Where does Eurobase host my data?',
        answer:
          'Scaleway fr-par (Paris, France) for everything in the critical path: managed PostgreSQL, S3-compatible object storage, and Deno edge functions. No AWS, no GCP, no Azure. Sub-processors outside the critical path — GatewayAPI (Denmark) for SMS, Mollie (Netherlands) for paid billing — are also EU-headquartered. The live sub-processor list is available in every project as a downloadable Article 30 RoPA report.',
      },
    ],
    ctaHeadline: 'Postgres, EU-owned, and no AWS in the chain',
    ctaDescription: 'A Supabase-shaped surface on an Appwrite-adjacent scope, without the AWS dependency and with GDPR primitives built into every tier. Free tier, no credit card. Pro is €25/mo per project when you go live.',
  },

  // Narrow-intent landing pages carved out of the main /vs/supabase
  // page so exact-match queries have a dedicated answer. Search
  // Console (Sep 2026) shows "supabase gdpr" 51 imp, "is supabase
  // gdpr compliant" 45 imp, "supabase dpa" 57 imp — all with no
  // dedicated page currently ranking. Content deliberately does NOT
  // duplicate /vs/supabase (that page compares features); these
  // answer the *legal* question directly and expand on the specific
  // artefact (GDPR compliance posture vs. the DPA document itself).

  'supabase-gdpr': {
    slug: 'supabase-gdpr',
    competitor: 'Supabase',
    heroHeadline: 'Is Supabase GDPR compliant? A DPO-eye view of what is covered and what is not',
    heroSubheadline: 'Yes — Supabase ships a Data Processing Addendum and EU regions. The gap most compliance teams flag is jurisdictional: Supabase Inc. is a Delaware corporation subject to the CLOUD Act, so a DPA cannot fully close the vector. Here is what that means in practice, and how a fully EU-native alternative closes it.',
    metaTitle: 'Is Supabase GDPR compliant? — the DPO view (2026)',
    metaDescription: 'Short answer: yes, with a caveat. Supabase provides a DPA, SCCs and EU regions — but Supabase Inc. is a US corporation under the CLOUD Act. Full DPO-view of what a Supabase deployment covers under GDPR, and where an EU-native alternative fits.',
    sections: [
      {
        title: 'The short answer',
        description:
          'Yes, Supabase is GDPR compliant in the sense every compliance workflow uses that phrase: it signs a Data Processing Addendum, offers Standard Contractual Clauses, publishes a sub-processor list, and lets you pin projects to Frankfurt or Ireland so personal data physically stays in the EEA. For most SaaS teams that closes the ticket.',
        paragraphs: [
          'The reason "is Supabase GDPR compliant?" keeps appearing in Search Console is that compliance-literate buyers know the ticket-close and the DPO-review are different conversations. The DPO cares about three things a marketing "GDPR ✓" badge cannot cover: the operator\'s corporate jurisdiction, the concrete DSAR fulfilment path, and the Article 30 Record of Processing Activities you have to maintain yourself.',
          'This page is the honest DPO-view of Supabase against those three axes — what it covers, what it delegates back to you, and where a fully EU-native alternative like Eurobase changes the answer.',
        ],
      },
      {
        title: 'What a Supabase deployment covers under GDPR',
        description:
          'Supabase\'s public compliance surface, as of 2026, is genuinely solid for a US-headquartered vendor. If your risk model treats US jurisdiction as acceptable and your DPO signs off on Standard Contractual Clauses, most of GDPR closes cleanly.',
        bullets: [
          'Article 28 (Processor) — signed DPA available, with SCCs as the transfer mechanism.',
          'Article 32 (Security of processing) — encryption at rest and in transit, MFA on the console, audit-friendly logging.',
          'Article 33/34 (Breach notification) — commitment to notify without undue delay.',
          'Physical residency — Frankfurt (eu-central-1) or Ireland (eu-west-1) project regions hold DB, storage, and default edge-function bytes inside the EEA.',
          'Sub-processor list — published; you can subscribe to change notices.',
        ],
      },
      {
        title: 'The CLOUD Act problem a DPA cannot override',
        description:
          'Article 44+ of the GDPR requires that international transfers only happen when the destination provides "essentially equivalent" protection. Since the CJEU Schrems II decision (July 2020), the EDPB has held that a transfer mechanism (SCCs, EU-US DPF) is only valid where the recipient can actually resist compelled disclosure — which providers subject to CLOUD Act and FISA §702 cannot.',
        paragraphs: [
          'The CLOUD Act (18 U.S.C. §2713, 2018) empowers US authorities to compel a US-headquartered provider to produce data it "possesses, custody, or control" of — regardless of the physical location of the disks. The disk-in-Frankfurt argument does not enter the analysis; only the corporate parent does. Supabase Inc. is a Delaware C-corp. Vercel (a Supabase sub-processor) is a Delaware C-corp. AWS (Supabase infrastructure) is a Washington corporation. Each is a valid target.',
          'This was underlined publicly when Microsoft France testified under oath at the French Senate in June 2025 that they cannot guarantee EU data stays out of US reach when the parent is compellable. The same reasoning applies to every US-parented provider in the RoPA. The DPA is a contract; the CLOUD Act is a statute — statutes win.',
          'For most private-sector SaaS deployments that risk is theoretical enough to accept. For regulated buyers — healthcare, fintech, gov-tech, legal-tech, education, defence — it is often disqualifying. If your DPO has flagged this vector, no combination of DPA + EU region + SCCs solves it. The only fix is removing the US-parent hop, which is what an EU-native processor like Eurobase is for.',
        ],
      },
      {
        title: 'DSAR mechanics — where the compliance burden lands on your team',
        description:
          'GDPR Articles 15 (right of access) and 20 (right to portability) give data subjects a right to their personal data on a 30-day clock. On Supabase, the mechanics are yours to build: walk auth.users, join every table with a user_id column, gather Storage files, zip them, deliver, audit-log. Every DSAR is an engineering ticket.',
        paragraphs: [
          'Industry surveys put the average cost of a self-served DSAR around $1,500 and 8–12 hours of engineering per request. Request volume has grown roughly 246% over 2023-2025 in EU-facing SaaS. The load is real. Supabase does not gate this poorly — they simply do not ship a DSAR primitive; every Supabase deployment writes it themselves or buys a third-party privacy-ops layer.',
          'Eurobase treats DSAR as first-class product surface. eb.auth.exportMyData() lets an end-user trigger their own export from your app. The console has one-click per-user and full-project export. Every export is audit-logged with actor, IP, and timestamp; download links are signed and expire after 7 days. Same 30-day statutory clock, but the fulfilment is a click instead of a sprint.',
        ],
      },
      {
        title: 'Article 30 RoPA — the record you have to keep either way',
        description:
          'Article 30 requires every controller (and processor) to maintain a Record of Processing Activities: purpose of processing, categories of data subjects, categories of personal data, recipients, transfers, retention. This applies whether or not you use Supabase, Eurobase, or roll your own.',
        paragraphs: [
          'On Supabase you write it yourself, keep it current when sub-processors change, and re-export it whenever your DPO asks. The Supabase sub-processor list is the source; the RoPA is your document.',
          'On Eurobase the sub-processor registry is a live database table (sub_processors), and every project\'s Compliance tab renders a downloadable Article 30 RoPA report that pulls from that table plus your Project-level processing metadata. Add a new sub-processor via migration → the RoPA report updates on next download; email project owners get notified 30 days before activation (per DPA § objection window).',
        ],
      },
      {
        title: 'If your DPO says "no US parent" — the practical checklist',
        description:
          'When the compliance filter includes "EU corporate parent" as a hard requirement, the market shortens. Here is the practical decision path we\'ve seen in regulated-industry procurement over 2024–2026:',
        bullets: [
          '(1) Do you need Postgres only? OVHcloud Managed Database and Scaleway Managed Database both give you sovereign Postgres with no auth / storage / realtime layer. Cheapest fit if you already own the rest.',
          '(2) Do you need the full Supabase-shaped surface? Eurobase is the mainstream managed option (Estonian OÜ operator, Scaleway fr-par infrastructure, DSAR + RoPA + audit-log first-class).',
          '(3) Do you need SOC 2 Type II attestation today? Eurobase has SOC 2 on the Team-tier roadmap; if the attestation is a procurement blocker right now, Supabase Team ($599/mo) already ships it — but you\'d be trading the sovereignty answer for the paperwork.',
          '(4) Do you need self-host? PocketBase (SQLite) or Nhost (Postgres) are the mainstream options. Ops burden yours.',
        ],
      },
    ],
    rows: [
      { feature: 'Signed DPA', eurobase: 'Yes — published at /legal/dpa, no counter-signature required for standard terms', competitor: 'Yes — DPA available on request or via dashboard' },
      { feature: 'Standard Contractual Clauses', eurobase: 'Not required (intra-EU transfer)', competitor: 'Required for non-EEA transfers; EU-US Data Privacy Framework used where available' },
      { feature: 'Corporate parent jurisdiction', eurobase: 'Estonia (EU member state)', competitor: 'United States (Delaware)', highlight: true },
      { feature: 'CLOUD Act exposure', eurobase: 'None', competitor: 'Yes — parent is a US corporation', highlight: true },
      { feature: 'Sub-processor list — % EU', eurobase: '100% (Scaleway/FR, GatewayAPI/DK, Mollie/NL)', competitor: 'Partial (AWS/US, Vercel/US, others)' },
      { feature: 'Article 30 RoPA', eurobase: 'Auto-generated per project from live sub-processor registry', competitor: 'You maintain manually' },
      { feature: 'Article 15/20 DSAR export', eurobase: 'One-click per-user and full-project — every tier', competitor: 'You build the SQL + join pipeline' },
      { feature: 'Tamper-evident audit log', eurobase: 'Hash-chained, every admin action, actor + IP + timestamp — every tier', competitor: 'Available on paid tier (log retention)' },
      { feature: 'Breach notification commitment', eurobase: 'Yes — DPA § 6', competitor: 'Yes — DPA § 6' },
      { feature: 'DPO contact address', eurobase: 'dpo@eurobase.app', competitor: 'privacy@supabase.io' },
    ],
    sovereigntyHeadline: 'GDPR is a system, not a checkbox',
    sovereigntyPoints: [
      'A signed DPA answers Article 28. It does not answer whether the operator can resist a compelled-disclosure order — that is a jurisdiction question.',
      'EU-region hosting answers physical residency. It does not answer parent jurisdiction — a Delaware corp with EU disks is still compellable in Delaware.',
      'Eurobase removes the US-parent hop entirely: Estonian OÜ operator, 100% EU-headquartered sub-processors, EU-only bytes.',
      'DSAR, RoPA, audit log — the primitives GDPR requires you to keep — are first-class product surfaces on every tier, not paid add-ons.',
    ],
    faqs: [
      {
        question: 'Is Supabase GDPR compliant?',
        answer:
          'Yes, in the ordinary sense — Supabase provides a Data Processing Addendum, Standard Contractual Clauses, EU regions (Frankfurt and Ireland), and a published sub-processor list. That is enough to close the compliance ticket for most SaaS deployments. The DPO-level caveat is the CLOUD Act: Supabase Inc. is a Delaware corporation, and no contract between you and Supabase can override the statute that lets US authorities compel Supabase to produce data. For regulated buyers where "EU corporate parent" is a hard requirement, this is why an EU-native alternative such as Eurobase is worth evaluating.',
      },
      {
        question: 'Does Supabase have a DPA?',
        answer:
          'Yes. Supabase Inc. publishes a GDPR Data Processing Addendum and offers Standard Contractual Clauses as the transfer mechanism for EU personal data flowing to US infrastructure. It is available via the Supabase dashboard for paid plans and on request otherwise. See our dedicated page on the Supabase DPA for what it does and does not cover.',
      },
      {
        question: 'Does Supabase\'s EU region solve the CLOUD Act issue?',
        answer:
          'No. Pinning a project to Frankfurt or Ireland keeps the physical bytes inside the EEA, which satisfies the residency dimension of GDPR. It does not solve the jurisdictional dimension — Supabase Inc. remains a Delaware C-corp compellable under US law regardless of where its customers\' data physically sits. The Microsoft France Senate testimony (June 2025) put this on the public record: EU-region hosting operated by a US parent cannot guarantee data stays out of US reach.',
      },
      {
        question: 'What does GDPR Article 30 require?',
        answer:
          'Article 30 requires every controller (and processor) to maintain a Record of Processing Activities (RoPA) — a live document listing: purpose of each processing operation, categories of data subjects and personal data, recipients (including sub-processors), any international transfers with their legal basis, envisaged retention periods, and a general description of technical/organisational security measures. Supabase gives you the raw ingredients (sub-processor list, DPA); you assemble and maintain the RoPA. Eurobase auto-generates the Article 30 RoPA report per project from a live sub-processors table.',
      },
      {
        question: 'Can I fulfil a DSAR on Supabase in 30 days?',
        answer:
          'Yes, but the mechanics are yours. Supabase does not ship a Data Subject Access Request primitive: to answer Article 15 (right of access) or Article 20 (portability), you walk auth.users, join every table that references the user_id, gather any Storage files owned by that user, zip the whole thing, hand it off with a signed download link, and log the fulfilment. Industry benchmarks put this at 8–12 engineering hours per request. Eurobase ships one-click DSAR export in the console and eb.auth.exportMyData() in the SDK — same 30-day statutory clock, one-click fulfilment.',
      },
      {
        question: 'Is there a GDPR-native Supabase alternative?',
        answer:
          'Yes — Eurobase. Same Postgres + auth + storage + realtime + edge functions surface, operated by Eurobase OÜ (Estonian registry code 17557586, Ahtri 12, Tallinn), running exclusively on Scaleway fr-par (France). No US corporate parent, no US-headquartered sub-processor in the critical path. DSAR export, Article 30 RoPA, tamper-evident audit log, and sub-processor registry are first-class product surfaces on every tier including Free. Migration from Supabase uses the eurobase import supabase CLI.',
      },
    ],
    ctaHeadline: 'Skip the CLOUD Act homework',
    ctaDescription: 'Eurobase gives you the same Supabase-shaped platform under Estonian law, with GDPR primitives — DSAR, RoPA, audit log — built into every tier. Free tier, no credit card. Pro is €25/mo per project.',
  },

  'supabase-dpa': {
    slug: 'supabase-dpa',
    competitor: 'Supabase',
    heroHeadline: 'Supabase DPA — what it covers, what it does not, and where an EU-native alternative fits',
    heroSubheadline: 'Supabase provides a signed GDPR Data Processing Addendum with Standard Contractual Clauses. A DPA is essential — but it is a contract, not a shield against statutes. Here is how the Supabase DPA works, what your legal team should check for, and why regulated buyers still want an EU-parent processor.',
    metaTitle: 'Supabase DPA — anatomy, SCCs, sub-processors, gaps (2026)',
    metaDescription: 'Supabase DPA explained: how to sign it, what the Standard Contractual Clauses cover, which sub-processors it lists, and the CLOUD Act gap a DPA cannot fix. Plus how the Eurobase DPA differs for EU-parent procurement requirements.',
    sections: [
      {
        title: 'What a DPA is (and what it is not)',
        description:
          'A Data Processing Addendum is the Article 28 contract between you (the controller) and your processor. It defines the scope of processing, the security obligations, the sub-processor rules, breach-notification timelines, transfer mechanisms for non-EEA destinations, and the return/deletion of data at end of contract.',
        paragraphs: [
          'What a DPA is not: an override of statutes that bind the processor. If your processor is subject to the CLOUD Act, FISA §702, or a national-security letter regime, the DPA cannot promise the operator will refuse a lawful order in the jurisdiction that binds them. This is why "we have a DPA" and "we are outside US reach" are different claims.',
          'The distinction matters for procurement. A private-sector B2B SaaS with private-sector customers can usually accept SCCs + DPA as sufficient. A processor of health, legal, defence, or public-sector data often cannot — because the sectoral rules (BRAO for German lawyers, GoBD for German tax records, HDS for French health) add residency-plus-jurisdiction obligations on top of GDPR.',
        ],
      },
      {
        title: 'How to sign the Supabase DPA',
        description:
          'Supabase Inc. makes their GDPR Data Processing Addendum available via the dashboard for paid plans; a copy is also linked from the compliance page. It is a click-to-accept contract for the standard terms; custom modifications (e.g., additional data-subject notification obligations, insurance requirements) are negotiated separately for Enterprise tier.',
        bullets: [
          'Access — dashboard → Organization Settings → Data Processing Agreement (paid plans).',
          'Format — click-to-accept for standard terms; PDF export available.',
          'Counter-signature — not required for standard terms; required for custom modifications.',
          'Effective date — the date you click accept.',
          'Retention — Supabase retains the accepted version and the ID of the accepting user for audit.',
        ],
      },
      {
        title: 'Standard Contractual Clauses in the Supabase DPA',
        description:
          'Because Supabase Inc. is a US entity and AWS (its infrastructure provider) is also US, personal data flowing to a Supabase project is deemed transferred to a non-adequate country under GDPR Chapter V. The transfer mechanism the Supabase DPA uses is the EU Commission\'s 2021 Standard Contractual Clauses (Module 2: controller to processor), with the EU-US Data Privacy Framework as the primary basis where the processor is DPF-certified.',
        paragraphs: [
          'The SCCs impose specific obligations on the recipient: notify the controller if requests from public authorities are received (Clause 15), assist with data-subject rights (Clause 10), use only approved sub-processors (Clause 9), and undergo audits (Clause 8.9). All of this is standard and well-tested.',
          'What SCCs cannot do post-Schrems-II is guarantee that a US authority will not compel disclosure through the CLOUD Act or a §2703(d) order. The CJEU\'s Schrems II decision (July 2020) held that SCCs alone are insufficient where the recipient country\'s law does not provide "essentially equivalent" protection to GDPR. The EDPB\'s 2021 supplementary-measures guidance made clear that transfers to CLOUD-Act-reachable providers require additional technical measures (typically end-to-end encryption where the operator has no key access) — which for a managed BaaS like Supabase is not achievable end-to-end.',
        ],
      },
      {
        title: 'Sub-processor list under the Supabase DPA',
        description:
          'Article 28 requires the processor to disclose sub-processors, obtain the controller\'s authorisation, and provide notice of changes so the controller can object. The Supabase sub-processor list is public and includes:',
        bullets: [
          'Amazon Web Services, Inc. (US) — compute, storage, database hosting.',
          'Vercel Inc. (US) — dashboard and marketing site.',
          'GitHub, Inc. (US, Microsoft subsidiary) — code hosting for CI/CD.',
          'Stripe, Inc. (US) — payment processing.',
          'A rotating list of communications and analytics providers, most US-headquartered.',
        ],
        paragraphs: [
          'For an EU controller, every sub-processor is another entry in your Article 30 RoPA and another transfer that needs its own basis. If your legal team objects to any of these on jurisdictional grounds, your options under the DPA are: object during the 30-day notice window (Supabase may or may not accommodate) or terminate the service. There is no "select only EU sub-processors" toggle.',
          'Eurobase\'s sub-processor list is fully EU-headquartered: Scaleway SAS (France) for hosting/database/storage/edge functions, GatewayAPI (Denmark) for SMS, Mollie B.V. (Netherlands) for paid billing. The list is auto-generated from a live database table and exposed as a downloadable Article 30 RoPA report.',
        ],
      },
      {
        title: 'Article 28 (processor) vs Article 30 (RoPA) — two different obligations',
        description:
          'The DPA satisfies Article 28. It does not satisfy Article 30. Both apply, and they are frequently conflated in compliance-page marketing copy — including sometimes on our own pages.',
        paragraphs: [
          'Article 28 is the processor contract — the DPA. Signed once, updated when material terms change. Both Supabase and Eurobase provide it.',
          'Article 30 is the Record of Processing Activities you maintain. It lists purposes, categories of data, sub-processors with transfer basis, retention periods. It updates whenever your sub-processor set or processing purposes change. Supabase gives you the raw ingredients; you assemble the record. Eurobase generates the report automatically from a live sub-processors table in every project\'s Compliance tab.',
          'A "DPA report" is an ambiguous term — sometimes it means "give me the signed DPA PDF", sometimes it means "give me the Article 30 RoPA for our deployment". Our own product surfaces have historically named these inconsistently; we corrected the DSAR & Compliance card copy in September 2026 to clarify that the auto-generated report is a RoPA (Article 30), not a DPA (Article 28).',
        ],
      },
      {
        title: 'When the Supabase DPA is enough, and when it is not',
        description:
          'Ranking based on regulated-industry procurement patterns we have seen over 2024–2026:',
        bullets: [
          'Consumer SaaS, US-first, EU users welcome — Supabase DPA + SCCs + EU region is typically enough. Ship it.',
          'B2B SaaS selling to European SMBs, no regulated data — same as above, usually.',
          'Health/legal/fintech/defence/gov-tech — the DPO usually flags "EU parent" as a hard requirement, and no DPA closes the CLOUD Act vector. Eurobase or an EU-parent alternative is the honest recommendation.',
          'German legal-tech (Kanzlei, RA-Micro adjacent) — §203 StGB, §43e BRAO, §257 HGB, §147 AO all layer sectoral requirements that go beyond GDPR. Eurobase Legal Team tier is in closed beta specifically for this segment.',
        ],
      },
    ],
    rows: [
      { feature: 'DPA available', eurobase: 'Yes — published at /legal/dpa, no login required to read', competitor: 'Yes — dashboard (paid), on request otherwise' },
      { feature: 'Counter-signature for standard terms', eurobase: 'Not required — the /legal/dpa page IS the contract at signup', competitor: 'Click-to-accept in dashboard' },
      { feature: 'Standard Contractual Clauses', eurobase: 'Not required (intra-EU transfer)', competitor: 'Required — SCCs Module 2, DPF where applicable' },
      { feature: 'Sub-processor jurisdiction', eurobase: '100% EU (FR / DK / NL)', competitor: 'Mixed — AWS/Vercel/GitHub/Stripe are US', highlight: true },
      { feature: 'Sub-processor change notice window', eurobase: '30 days (per DPA §)', competitor: '30 days (per DPA §)' },
      { feature: 'Auto-generated Article 30 RoPA report', eurobase: 'Yes — per project, downloadable JSON + PDF', competitor: 'No — you maintain manually' },
      { feature: 'DSAR (Art. 15/20) mechanism in DPA', eurobase: 'Referenced + one-click in-product export', competitor: 'Referenced — mechanism you build' },
      { feature: 'Data-return / deletion at contract end', eurobase: '30-day export window, 90-day backup purge', competitor: '90-day access, then deletion' },
      { feature: 'Breach notification', eurobase: 'Without undue delay, ≤72h to controller', competitor: 'Without undue delay' },
      { feature: 'CLOUD Act reach through processor', eurobase: 'None', competitor: 'Yes — Delaware parent + US sub-processors', highlight: true },
    ],
    sovereigntyHeadline: 'A DPA is a contract. A statute is a statute.',
    sovereigntyPoints: [
      'Supabase Inc. publishes a solid Article 28 DPA. So does every other reputable US processor. Where their DPA cannot help you is in the jurisdiction they operate under.',
      'The CLOUD Act (2018) and FISA §702 bind the operator regardless of contract terms. The Microsoft France Senate testimony (June 2025) made this explicit and public.',
      'Eurobase\'s DPA is signed under Estonian law, executed by Eurobase OÜ (registry 17557586), against sub-processors that are all EU-headquartered. No US hop, no CLOUD Act reach.',
      'DPA + Article 30 RoPA + Article 15/20 DSAR are all first-class product surfaces, not paid add-ons.',
    ],
    faqs: [
      {
        question: 'Does Supabase have a DPA?',
        answer:
          'Yes. Supabase Inc. publishes a GDPR Data Processing Addendum with Standard Contractual Clauses. It is accessible from the dashboard for paid plans and on request otherwise. It is a click-to-accept contract for standard terms; Enterprise-tier customers negotiate custom modifications.',
      },
      {
        question: 'How do I get the Supabase DPA signed?',
        answer:
          'On a paid plan, open the Supabase dashboard → Organization Settings → Data Processing Agreement, review the terms, and click accept. The dashboard records the accepting user and the acceptance timestamp for audit. For Free-tier or pre-signup review, request a copy from privacy@supabase.io.',
      },
      {
        question: 'Does the Supabase DPA include Standard Contractual Clauses?',
        answer:
          'Yes. Because Supabase Inc. is a US entity, personal data flows to a non-adequate country under GDPR Chapter V. The DPA incorporates the EU Commission\'s 2021 Standard Contractual Clauses (Module 2: controller to processor) as the transfer mechanism, with the EU-US Data Privacy Framework used where the processor is DPF-certified. Since Schrems II (2020), SCCs alone are not sufficient where the recipient country\'s law permits compelled disclosure — supplementary measures may be required for high-sensitivity data.',
      },
      {
        question: 'Is a Supabase DPA enough for GDPR compliance?',
        answer:
          'For most SaaS deployments, yes — the DPA + SCCs + EU-region hosting closes the standard compliance ticket. For regulated deployments (healthcare, legal, fintech, defence, gov-tech), the DPO typically flags the CLOUD Act as an unclosed vector, because a DPA is a contract and the CLOUD Act is a statute — statutes override. In that case an EU-parent processor like Eurobase is the practical answer.',
      },
      {
        question: 'Which sub-processors does Supabase list in its DPA?',
        answer:
          'The Supabase sub-processor list includes Amazon Web Services (US) for infrastructure, Vercel (US) for dashboard, GitHub (US, Microsoft) for code hosting, Stripe (US) for payments, and a rotating list of communications and analytics providers, most of which are US-headquartered. Under Article 30 each of these adds a transfer-mechanism entry to your RoPA.',
      },
      {
        question: 'What DPA does Eurobase provide?',
        answer:
          'Eurobase\'s DPA is published at /legal/dpa — no login required to read. It is signed by Eurobase OÜ (Estonian registry code 17557586, Ahtri 12, Tallinn) as processor. Because operations are intra-EU (Estonian operator, French sub-processor), no SCCs or DPF are required. The sub-processor list is fully EU-headquartered (Scaleway/FR, GatewayAPI/DK, Mollie/NL) and auto-exposed as a downloadable Article 30 RoPA report in every project\'s Compliance tab.',
      },
    ],
    ctaHeadline: 'A DPA that does not need a CLOUD Act footnote',
    ctaDescription: 'Eurobase\'s DPA is signed under Estonian law, executed against 100% EU-headquartered sub-processors. Postgres, auth, storage, realtime, edge functions — all EU-native. Free tier, no credit card. Pro is €25/mo per project.',
  },
}
