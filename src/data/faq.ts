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
      'Right now, request early access at <a href="/#cta" class="text-accent-blue hover:underline">/#cta</a>. Once public beta opens (imminent), signup is instant with no credit card required. Beta users get founder-friendly pricing locked in for the Pro tier.',
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
