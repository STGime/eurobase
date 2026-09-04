/**
 * FAQ — single source of truth.
 *
 * Two consumers today:
 *   1. `/faq` — the visible FaqPage.vue renders these as an accordion.
 *   2. `index.html` — hand-written FAQPage JSON-LD in the head.
 *
 * (2) is duplicated because index.html is a static file (Vite dev
 * doesn't transform it against our TS modules). If you edit an entry
 * here, mirror it into the JSON-LD blob in index.html — the header
 * comment on that blob points here.
 *
 * Ordering is intentional: sovereignty first (highest-intent SERPs),
 * then Supabase-alternative cluster, then product/pricing/logistics.
 * Reorder only if Search Console analysis says so.
 */

export interface FaqEntry {
  /** Deep-link anchor (kebab-case, appended to /faq#) */
  id: string
  question: string
  /** HTML — inline links/code are OK. Kept short (2-4 sentences) so
   *  the on-page accordion stays skimmable and the schema summary
   *  stays under Google's rich-result guideline. */
  answer: string
  /** Group heading in the on-page render. */
  category:
    | 'Sovereignty & compliance'
    | 'Supabase alternative'
    | 'Product & pricing'
    | 'Getting started'
}

export const faq: FaqEntry[] = [
  // ── Sovereignty & compliance ──────────────────────────────────
  {
    id: 'gdpr-compliant',
    category: 'Sovereignty & compliance',
    question: 'Is Eurobase GDPR-compliant?',
    answer:
      'Yes. GDPR-native by design, not as an add-on. Every project ships one-click DSAR exports (Article 15 + 20), an Article 30 Record-of-Processing auto-generated from your live configuration, a tamper-evident audit log with actor / IP / timestamp, and a per-project sub-processor registry. All data is stored on 100% EU-owned infrastructure (Scaleway, France) — zero US CLOUD Act exposure.',
  },
  {
    id: 'cloud-act',
    category: 'Sovereignty & compliance',
    question: 'What is the CLOUD Act and why does it matter for a US-region deployment?',
    answer:
      'The US CLOUD Act (2018) lets US authorities compel a US-headquartered provider to hand over data anywhere in the world — including data stored in the EU. Picking a US provider\'s "EU region" moves the bytes physically but does not remove the jurisdiction. Microsoft France <a href="/blog/supabase-gdpr-dpa-eu-region" class="text-accent-blue hover:underline">testified under oath to the French Senate</a> in 2025 that they cannot guarantee EU data stays out of that reach. Eurobase removes the exposure by using an Estonian OÜ parent and Scaleway-only infrastructure.',
  },
  {
    id: 'data-location',
    category: 'Sovereignty & compliance',
    question: 'Where is my data stored?',
    answer:
      'Scaleway <code class="text-accent-gold">fr-par</code> (Paris, France). Postgres, S3-compatible object storage, and Deno edge functions all run on Scaleway. No AWS, no GCP, no Azure in the critical path. Every sub-processor in our Record of Processing Activities is EU-headquartered.',
  },
  {
    id: 'dsar-cost',
    category: 'Sovereignty & compliance',
    question: 'How much does a manual DSAR fulfilment cost?',
    answer:
      'Around $1,500 per request per industry surveys — typically 8–12 hours of engineering time exporting CSVs, searching support tools, and stitching application logs. Volume is up 246% in two years. Eurobase replaces the manual workflow with a one-click console export and a SDK call (<code class="text-accent-gold">eb.auth.exportMyData()</code>) that lets end-users self-serve, rate-limited and audited.',
  },
  {
    id: 'legal-entity',
    category: 'Sovereignty & compliance',
    question: 'Who is the contracting legal entity, and does it have any non-EU parent or subsidiary?',
    answer:
      'Contracting entity: <strong>Eurobase OÜ</strong>, Estonian private limited company, registry code 17557586, Ahtri 12, Tallinn 15551. Not VAT-registered under Estonian VAT Act §19 (below the €40k threshold). <strong>No parent company, no subsidiaries, no non-EU entity.</strong> Sole shareholder is the founder. Every sub-processor in the RoPA is EU-headquartered.',
  },
  {
    id: 'dpa',
    category: 'Sovereignty & compliance',
    question: 'Do you provide a signable DPA and an up-to-date sub-processor list?',
    answer:
      'Yes. DPA v2 is signable at <a href="/legal" class="text-accent-blue hover:underline">/legal</a>. The sub-processor list is auto-generated per project in the console Compliance tab as an Article 30 report (downloadable PDF, updated on every configuration change). No email tickets, no stale spreadsheets.',
  },
  {
    id: 'operator-access',
    category: 'Sovereignty & compliance',
    question: 'When can your team access customer data, and can I audit it?',
    answer:
      'Our team is three people, all physically in the EU. Every operator SQL call goes through an authenticated pool that writes to <code class="text-accent-gold">public.data_access_log</code> — every query stamped with actor, source IP, and active Postgres role. You see that table from your own console (Audit tab). We do not process your data content for any purpose other than platform operation. No support-tooling shortcuts that bypass the audit log.',
  },

  // ── Supabase alternative ──────────────────────────────────────
  {
    id: 'supabase-eu-alternative',
    category: 'Supabase alternative',
    question: 'Is there a Supabase alternative in the EU?',
    answer:
      'Yes — Eurobase. Same Postgres foundation, same auth + storage + realtime + edge-functions surface, same SDK shape. The difference is the corporate parent (Estonian OÜ vs Delaware) and the infrastructure floor (Scaleway in France vs AWS). See the <a href="/vs/supabase" class="text-accent-blue hover:underline">full comparison</a>.',
  },
  {
    id: 'supabase-eu-region-gdpr',
    category: 'Supabase alternative',
    question: 'Is a Supabase EU-region deployment enough for GDPR?',
    answer:
      'It gets you physical data residency in the EEA and a standard SCC-based DPA — a competent baseline, but not immunity from the CLOUD Act. Because Supabase Inc. is a Delaware corporation using AWS, US authorities can compel data access even for EU-region deployments. <a href="/blog/supabase-gdpr-dpa-eu-region" class="text-accent-blue hover:underline">Read the full post →</a>',
  },
  {
    id: 'supabase-gdpr-compliant',
    category: 'Supabase alternative',
    question: 'Is Supabase GDPR compliant?',
    answer:
      'Yes in the ordinary sense — Supabase ships a signed DPA, Standard Contractual Clauses, EU regions (Frankfurt, Ireland), and a published sub-processor list. That closes the ticket for most SaaS deployments. The DPO-level caveat is jurisdictional: Supabase Inc. is a Delaware corporation, so US authorities can compel disclosure under the CLOUD Act even for EU-region projects — a DPA is a contract and cannot override that statute. See the <a href="/vs/supabase-gdpr" class="text-accent-blue hover:underline">DPO-eye analysis</a> for what a Supabase deployment covers under Articles 28/30/32 and where an EU-native alternative fits.',
  },
  {
    id: 'supabase-dpa',
    category: 'Supabase alternative',
    question: 'Does Supabase have a DPA?',
    answer:
      'Yes. Supabase Inc. publishes a GDPR Data Processing Addendum with Standard Contractual Clauses (Module 2 controller-to-processor, 2021 SCCs). Available via the Supabase dashboard for paid plans and on request otherwise; click-to-accept for standard terms, negotiated for Enterprise. Post-Schrems II, SCCs alone are not sufficient where the recipient country\'s law permits compelled disclosure. See <a href="/vs/supabase-dpa" class="text-accent-blue hover:underline">the DPA anatomy</a> for the sub-processor list, the Article 28 vs 30 distinction, and how the Eurobase DPA (Estonian law, no SCCs required) compares.',
  },
  {
    id: 'migrate-from-supabase',
    category: 'Supabase alternative',
    question: 'How do I migrate from Supabase to Eurobase?',
    answer:
      'Use the CLI: <code class="text-accent-gold">eurobase import supabase assess</code> for a read-only report against your existing project, then <code class="text-accent-gold">eurobase import supabase schema | data | storage | functions</code> to move each surface. Auth-user import is next. Reads your Supabase project directly and emits an executable plan; no rewrites on your app code.',
  },
  {
    id: 'supabase-js-compat',
    category: 'Supabase alternative',
    question: 'My app is built on the supabase-js client. Do I have to rewrite my client layer?',
    answer:
      'The honest picture on three levels. (1) <strong>Shape-parity</strong>: <code class="text-accent-gold">@eurobase/sdk</code> mirrors <code class="text-accent-gold">@supabase/supabase-js</code> deliberately — same <code class="text-accent-gold">.from(table).select().eq()</code> chain, same <code class="text-accent-gold">.channel(name).on(\'postgres_changes\', …)</code> subscribe shape, same auth methods. In practice this is search-replace on imports + package name, not a rewrite of query call sites. (2) <strong>Drop-in <code class="text-accent-gold">supabase-js</code> wire-compat</strong> (same package name, no code change at all) is on the roadmap as a shim package — it removes the "young company" objection entirely. If this would move you off the fence, tell us — customer signal drives the priority. (3) <strong>Zero-SDK escape hatch on Team tier</strong>: a direct Postgres <code class="text-accent-gold">DATABASE_URL</code> means Payload, Prisma, Drizzle, or any Postgres client works without any Eurobase-specific code — the reversibility guarantee then covers your app code too, not just your data.',
  },
  {
    id: 'why-not-firebase',
    category: 'Supabase alternative',
    question: 'How is Eurobase different from Firebase?',
    answer:
      'Firebase uses Firestore (proprietary NoSQL) on Google Cloud. Eurobase uses PostgreSQL (standard SQL) on Scaleway. No vendor lock-in, no proprietary query language, no Google-owned processor. <a href="/vs/firebase" class="text-accent-blue hover:underline">Full Firebase comparison →</a>',
  },

  // ── Product & pricing ─────────────────────────────────────────
  {
    id: 'features',
    category: 'Product & pricing',
    question: 'What features does Eurobase include?',
    answer:
      'Auth (6 methods: email/password, magic link, phone SMS OTP, 6 OAuth providers), managed PostgreSQL 16 with Row-Level Security, S3-compatible object storage, WebSocket realtime with row-filter, Deno edge functions, AES-256 vault, cron scheduler, webhooks with HMAC signing + retries, MCP server, and a 50+ command CLI. Compliance (DSAR export, RoPA, audit log) is built into every project.',
  },
  {
    id: 'pricing',
    category: 'Product & pricing',
    question: 'How much does Eurobase cost?',
    answer:
      'Free for personal projects, learning, and development — non-commercial use only (5,000 monthly active users, 512 MB storage, 2 GB bandwidth, 50 realtime connections, every feature). €25/mo per project on Pro for commercial use (100,000 MAU, 100 GB storage, 250 GB bandwidth, 10,000 realtime cxns, BYO SMTP, quota alerts, never pauses). A Team tier with dedicated Postgres per project is €149/mo (coming soon).',
  },
  {
    id: 'free-tier-noncommercial',
    category: 'Product & pricing',
    question: 'What counts as "non-commercial" on the Free tier?',
    answer:
      'Personal projects, learning, coursework, homelab experiments, open-source side projects, and development / staging environments — all fine on Free. Commercial use includes: production apps with paying users, revenue-generating side businesses, client / agency work, and internal tools of a commercial entity — those need Pro or higher. If we spot commercial use on a Free project, we\'ll email the account owner and give 14 days to upgrade before restricting the project. No surprises; we\'ll always tell you first.',
  },
  {
    id: 'free-tier-pause',
    category: 'Product & pricing',
    question: 'Do Free-tier projects really pause?',
    answer:
      'After 30 days without a request, yes. On the next request the project wakes automatically (about 30 s on the first request; instant thereafter). Pro projects never pause. The pause is on the API + realtime + edge-function surface, not the DB — no cold start work.',
  },
  {
    id: 'auth-methods',
    category: 'Product & pricing',
    question: 'Which authentication methods are supported?',
    answer:
      'Email/password, magic-link email, phone SMS OTP, and six OAuth providers (Google, GitHub, LinkedIn, Apple, Microsoft, Discord). SAML is on the roadmap for the Team tier. All methods are on every tier — no paid gating for basic auth.',
  },
  {
    id: 'backups-pitr',
    category: 'Product & pricing',
    question: 'Are automatic backups and point-in-time recovery included?',
    answer:
      'Free and Pro projects share a pooled Postgres cluster (Scaleway Managed Database, France) with cluster-level snapshots (daily, 7-day retention). Restores go through support. <strong>Per-project point-in-time recovery, second-level precision, and console-triggered restore land on the Team tier</strong> — Team gets dedicated Postgres per project with daily scheduled backups (7-day retention), a 7-day PITR window, and 1 restore per calendar month included (snapshot-based or PITR — either counts against the same cap). Legal Team keeps 30-day scheduled backup retention as part of the compliance premium. On every tier, <code class="text-accent-gold">eurobase db dump</code> produces a standard <code class="text-accent-gold">pg_dump</code> you can export anywhere at any time — that is the first-line reversibility guarantee independent of us.',
  },
  {
    id: 'overage-pricing',
    category: 'Product & pricing',
    question: 'What happens if I exceed the Pro-tier storage or bandwidth caps?',
    answer:
      'No overnight blackout — that is a business-risk pattern paying customers can\'t manage, and one of the clearest pieces of feedback from beta users. The Pro-tier overage policy for public beta: (1) email alerts at 75% and 100% of the storage / bandwidth caps. (2) A 14-day soft-grace window where writes continue and the console shows the overage banner — enough time to upgrade to Team, buy an add-on capacity block, or optimise. (3) Only after the grace window does the affected module hard-block writes — and even then <strong>reads always continue</strong>. Team tier (dedicated Postgres per project + elastic storage tier) removes the caps entirely and is the recommended path for photo/video-heavy or streaming workloads. We do <strong>not</strong> meter per-GB overage on Pro — no surprise line items.',
  },
  {
    id: 'realtime-connections',
    category: 'Product & pricing',
    question: 'How is the "10,000 realtime connections" cap counted?',
    answer:
      'Active concurrent WebSocket connections. No hard limit on messages/second or connection duration today, but soft fair-use at ~100 msg/s per connection and ~1M msg/s per project — raiseable on request. Practical connection duration is bounded by TCP keepalive + our load-balancer idle timeout (600 s).',
  },
  {
    id: 'byo-storage',
    category: 'Product & pricing',
    question: 'Can I point Eurobase at my own S3 bucket (BYO storage)?',
    answer:
      'Not today. BYO S3 is on the Team-tier roadmap — it needs per-tenant credentials + audit-path rewiring. No firm date yet. In the meantime, our object storage runs on Scaleway (Paris, France) with the same sovereignty guarantees as the rest of the platform.',
  },
  {
    id: 'sla',
    category: 'Product & pricing',
    question: 'What SLA do you commit to per tier?',
    answer:
      'Free: no commitment. Pro: 99.5%/month, support response within 24h business hours. Team: 99.9%/month, response within 4h. No automatic downtime credits today — honest reflection of team size at launch. Credits land with the Team tier opening.',
  },
  {
    id: 'continuity',
    category: 'Product & pricing',
    question: 'What happens to my data — and my app code — if Eurobase ceases operations?',
    answer:
      '<strong>Data reversibility (four lines of defence).</strong> (1) <em>Standard formats</em>: Postgres + S3-compatible = migration to any host (Scaleway direct, OVH, Aiven, self-hosted) is documented, not a rewrite. (2) <em>Export CLI</em>: <code class="text-accent-gold">eurobase export</code> produces a full dump (schema + data + storage + functions). (3) <em>Open source at v1</em>: we commit to open-sourcing the code under a permissive licence at v1 (targeted end 2026); self-hosting becomes a real Plan B. (4) On shutdown: 90-day notice + 90 additional days of read-only service to finalise export.<br><br><strong>App-code reversibility — the point our earlier answer missed.</strong> Data reversibility does not cover the client layer if your app is bound to a proprietary SDK. Two mitigations: (a) <code class="text-accent-gold">@eurobase/sdk</code> is shape-parity with <code class="text-accent-gold">supabase-js</code>, so migrating away is search-replace on imports, not query-site rewrites (see the <a href="#supabase-js-compat" class="text-accent-blue hover:underline">SDK compatibility FAQ</a>). (b) On <strong>Team tier</strong>, the direct <code class="text-accent-gold">DATABASE_URL</code> means your app can talk to Postgres with Payload / Prisma / Drizzle / <code class="text-accent-gold">psql</code> — no Eurobase code in the client at all — so migration is a hostname change. That is the strongest reversibility guarantee we ship today.',
  },
  {
    id: 'team-size-funding',
    category: 'Product & pricing',
    question: 'How big is the Eurobase team, and how are you funded?',
    answer:
      'Core team: founder + two long-term freelancers, all EU-based. Bootstrapped, with EU-Sovereign-Cloud grant applications in flight and preliminary angel conversations. We are honest about being in the 6-12 month "can it survive" window. The way to size that risk is not our reassurances — it is the reversibility guarantee (Postgres dump + open-source at v1 + standard S3). If we sink, you migrate to Scaleway direct in a weekend with the export CLI.',
  },

  // ── Getting started ───────────────────────────────────────────
  {
    id: 'closed-beta',
    category: 'Getting started',
    question: 'Is Eurobase in production or still in beta?',
    answer:
      'In production and open to everyone. Signup is open at <a href="https://console.eurobase.app" class="text-accent-blue hover:underline">console.eurobase.app</a>, with paid Pro live since August 2026. The platform surface — auth, DB, storage, realtime, functions, vault, cron, webhooks, MCP, CLI, compliance — is built and running. Team and Legal Team tiers remain invite-only for now (email <a href="mailto:contact@eurobase.app" class="text-accent-blue hover:underline">contact@eurobase.app</a>).',
  },
  {
    id: 'signup',
    category: 'Getting started',
    question: 'How do I sign up?',
    answer:
      'Instant signup at <a href="https://console.eurobase.app" class="text-accent-blue hover:underline">console.eurobase.app</a> — no credit card required for Free, €25/mo per project for Pro. Team and Legal Team tiers are invite-only for now.',
  },
  {
    id: 'sdk-languages',
    category: 'Getting started',
    question: 'Which languages / frameworks does the SDK support?',
    answer:
      'The primary SDK is JavaScript/TypeScript (works in browsers, Node, Deno, Bun, edge runtimes). REST + Postgres wire-protocol access means any language with an HTTP or Postgres client works. A dedicated Go SDK ships alongside the CLI for CI use.',
  },
  {
    id: 'mcp-support',
    category: 'Getting started',
    question: 'Does Eurobase support AI IDEs like Claude Code or Cursor?',
    answer:
      'Yes — first-class support via a hosted MCP server. Claude Code, Codex, Cursor, and Windsurf can list tables, run SQL, manage the vault, and invoke functions directly against your project. Setup is one JSON snippet per IDE. <a href="/blog/eurobase-mcp-server-ai-native-sovereign-backend" class="text-accent-blue hover:underline">Read the MCP post →</a>',
  },
]

/** Ordered category list for the on-page render — matches the order
 *  of first appearance in the `faq` array so a reorder there flows
 *  through automatically. */
export const faqCategoryOrder: FaqEntry['category'][] = [
  'Sovereignty & compliance',
  'Supabase alternative',
  'Product & pricing',
  'Getting started',
]
