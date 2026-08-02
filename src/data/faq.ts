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
    id: 'migrate-from-supabase',
    category: 'Supabase alternative',
    question: 'How do I migrate from Supabase to Eurobase?',
    answer:
      'Use the CLI: <code class="text-accent-gold">eurobase import supabase assess</code> for a read-only report against your existing project, then <code class="text-accent-gold">eurobase import supabase schema | data | storage | functions</code> to move each surface. Auth-user import is next. Reads your Supabase project directly and emits an executable plan; no rewrites on your app code.',
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
      'Free while you prototype (5,000 monthly active users, 512 MB storage, 2 GB bandwidth, 50 realtime connections, every feature). €19/mo per project on Pro (100,000 MAU, 100 GB storage, 250 GB bandwidth, 10,000 realtime cxns, BYO SMTP, quota alerts, never pauses). A Team tier with dedicated Postgres per project is €149/mo (coming soon).',
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
      'Free and Pro projects share a pooled Postgres cluster (Scaleway Managed Database, France) with cluster-level snapshots (daily, 7-day retention). Restores go through support. <strong>Per-project point-in-time recovery, second-level precision, and console-triggered restore land on the Team tier</strong> — Team gets dedicated Postgres per project, which is what PITR requires. On every tier, <code class="text-accent-gold">eurobase db dump</code> produces a standard <code class="text-accent-gold">pg_dump</code> you can export anywhere at any time — that is the first-line reversibility guarantee independent of us.',
  },
  {
    id: 'overage-pricing',
    category: 'Product & pricing',
    question: 'What happens if I exceed the Pro-tier storage or bandwidth caps?',
    answer:
      'Pro is deliberately predictable — past the 100 GB storage / 250 GB bandwidth caps, the affected module goes read-only until upgrade or the meter resets. We do <strong>not</strong> meter per-GB overage on Pro. For workloads that need elastic storage or high egress (photo/video-heavy modules, streaming), we recommend the Team tier or a bespoke contract — contact us directly.',
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
    question: 'What happens to my data if Eurobase ceases operations?',
    answer:
      'Three lines of defence. (1) <strong>Standard format</strong>: Postgres + S3-compatible = migration to any host (OVH, Scaleway direct, self-hosted) is a documented path, not a rewrite. (2) <strong>Export CLI</strong>: <code class="text-accent-gold">eurobase export</code> produces a full dump (schema + data + storage + functions). (3) <strong>Open source at v1</strong>: we commit to open-sourcing the code under a permissive licence at v1 release (targeted end 2026); self-hosting becomes a real Plan B. On shutdown: 90-day notice + 90 additional days of read-only service to finalise export.',
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
      'Closed beta since early 2026, with real users building on the platform daily. Public beta opens once the Estonia corporate formation completes (July 2026). The platform surface — auth, DB, storage, realtime, functions, vault, cron, webhooks, MCP, CLI, compliance — is built and running in production.',
  },
  {
    id: 'signup',
    category: 'Getting started',
    question: 'How do I sign up?',
    answer:
      'Public beta is open — instant signup at <a href="https://console.eurobase.app" class="text-accent-blue hover:underline">console.eurobase.app</a>, no credit card required for Free. Pro (€19/mo per project) opens for card payment mid-August 2026 once Mollie KYC finalises.',
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
