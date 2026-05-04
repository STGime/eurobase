export const hero = {
  headline: 'Eurobase — The Sovereign BaaS for Europe',
  subheadline: 'Auth, database, storage, realtime, functions, cron, vault, webhooks, and CLI — fully EU-native, zero US jurisdiction, zero DevOps.',
  tagline: 'Firebase simplicity. Postgres power. European sovereignty. Early access opens May 2026.',
  primaryCta: 'Get Started Free in May',
  secondaryCta: 'Explore the Platform',
}

export const problem = {
  headline: 'Europe Builds on Infrastructure It Doesn\'t Control',
  description: 'Modern applications depend on backend platforms for authentication, databases, storage, and serverless logic. Today, most of these platforms are operated by non-European companies and subject to foreign jurisdiction — even when data is stored in Europe.',
  painPoints: [
    { text: 'For startups, this may seem invisible.', emphasis: false },
    { text: 'For regulated industries, it is a growing risk.', emphasis: true },
  ],
  tradeoff: [
    'Choose world-class developer experience',
    'Choose legal certainty and data sovereignty',
  ],
  conclusion: 'Europe deserves both.',
}

export const solution = {
  headline: 'Meet Eurobase',
  description: 'Eurobase is a fully European-operated backend platform designed to give developers everything they need to build modern applications — without infrastructure complexity and without exposure to non-European jurisdiction.',
  features: [
    { name: 'Authentication', icon: '\uD83D\uDD10', color: '#F9A825', description: '6 methods: email/password, magic links, OAuth (Google, GitHub, LinkedIn, Apple), phone SMS OTP' },
    { name: 'Managed PostgreSQL', icon: '\uD83D\uDDC4\uFE0F', color: '#1E88E5', description: 'REST API, SQL editor, row-level security, schema management, full-text search' },
    { name: 'Object Storage', icon: '\uD83D\uDCE6', color: '#43A047', description: 'S3-compatible with signed URLs, metadata, and folder navigation' },
    { name: 'Realtime', icon: '\uD83E\uDDE9', color: '#8E24AA', description: 'WebSocket subscriptions with INSERT/UPDATE/DELETE change events' },
    { name: 'Edge Functions', icon: '\uD83D\uDD27', color: '#E65100', description: 'Deno runtime with DB triggers, scheduling, and versioning' },
    { name: 'Vault & Secrets', icon: '\uD83D\uDEE1\uFE0F', color: '#00897B', description: 'AES-256-GCM encrypted key-value store' },
    { name: 'Cron Jobs', icon: '\u23F0', color: '#C62828', description: 'SQL and RPC scheduling with execution logs' },
    { name: 'Webhooks', icon: '\uD83D\uDD17', color: '#6A1B9A', description: 'Event-driven delivery with retry logic and HMAC signing' },
    { name: 'CLI Tool', icon: '\u2328\uFE0F', color: '#1565C0', description: '30+ commands for projects, database, storage, vault, functions, and migrations' },
    { name: 'MCP Server', icon: '🤖', color: '#3949AB', description: 'AI IDE integration (Claude Code, Cursor, Codex, Windsurf): list tables, run SQL, manage Vault, invoke functions' },
    { name: 'Audit & Compliance', icon: '📋', color: '#AD1457', description: 'GDPR export, DPA reports, sub-processor registry, full action logging' },
  ],
  footer: ['No DevOps required.', 'No sovereignty compromise.'],
}

export const differentiators = {
  headline: 'Built for Europe. Built for Developers.',
  items: [
    {
      title: '100% EU-Owned',
      description: 'EU-hosted, EU-jurisdiction. No CLOUD Act exposure. Schrems II\u2013safe by design.',
      color: '#1565C0',
    },
    {
      title: 'Zero-DevOps',
      description: 'Postgres, Auth, Storage, Functions, Cron, Vault \u2014 production-ready in seconds.',
      color: '#00897B',
    },
    {
      title: 'GDPR-Native',
      description: 'Audit logging, automated DPA reports, GDPR data export, sub-processor registry.',
      color: '#7B1FA2',
    },
    {
      title: 'Enterprise-Ready',
      description: 'Team RBAC, encrypted vault, audit trail, row-level security, rate limiting.',
      color: '#E65100',
    },
    {
      title: 'Open & Portable',
      description: 'Standard Postgres, S3 storage, REST APIs \u2014 no proprietary lock-in.',
      color: '#C62828',
    },
  ],
}

export const developer = {
  headline: 'Build Fast. Stay Sovereign.',
  description: 'Start a project in minutes.',
  code: `const euro = createClient();

// Sign in with OAuth
await euro.auth.signInWithOAuth({ provider: "google" });

// Query your database
const users = await euro.db
  .from("users")
  .select("*");

// Subscribe to realtime changes
euro.realtime.subscribe("orders", (event) => {
  console.log(event.type, event.row);
});

// Upload a file
await euro.storage
  .from("avatars")
  .upload("profile.png", file);`,
  features: [
    'SQL database with row-level security and full-text search',
    '6 auth methods including OAuth and phone SMS OTP',
    'Realtime WebSocket subscriptions',
    'S3-compatible object storage with signed URLs',
    'Deno edge functions with DB triggers and cron',
    'Encrypted vault for secrets and API keys',
    'Webhooks with retry logic and HMAC signing',
    'CLI with 30+ commands for full platform control',
    'Team collaboration with owner/admin/member roles',
  ],
  footer: ['No infrastructure tickets.', 'No compliance anxiety.', 'Just build.'],
}

export const enterprise = {
  headline: 'Sovereign Infrastructure Without Compromise',
  description: 'Eurobase is built for organizations that need certainty.',
  features: [
    { name: 'European legal governance', icon: '\u2696\uFE0F' },
    { name: 'Data residency guarantees', icon: '\uD83C\uDFDB\uFE0F' },
    { name: 'Automated DPA reports and sub-processor registry', icon: '\uD83D\uDCCB' },
    { name: 'Full audit trail with actor, action, IP, timestamp', icon: '\uD83D\uDD0D' },
    { name: 'Team members with owner/admin/member roles', icon: '\uD83D\uDD11' },
    { name: 'AES-256 encrypted vault for secrets and API keys', icon: '\uD83D\uDEE1\uFE0F' },
    { name: 'Row-level security with preset policies', icon: '\uD83D\uDD12' },
  ],
  footer: 'This is backend infrastructure your compliance team can approve.',
  valueProp: [
    { title: 'For Developers', description: 'Launch apps in minutes without touching infrastructure \u2014 like Firebase, but privacy-first and EU-native.', color: '#1565C0' },
    { title: 'For Enterprises & GovTech', description: 'A modern backend that satisfies strict EU regulatory, sovereignty, and compliance requirements.', color: '#00695C' },
    { title: 'For the EU Ecosystem', description: 'A sovereign cloud building block keeping sensitive data, AI pipelines, and digital services under EU control.', color: '#4527A0' },
  ],
}

export const market = {
  headline: 'The Sovereignty Shift Has Begun',
  description: 'The BaaS market is booming \u2014 and Europe has zero sovereign options.',
  stats: [
    { value: '$8.4B', label: 'Global BaaS Market (2024)', detail: '\u2192 $31.1B by 2030', color: '#1565C0', footnote: 1 },
    { value: '24.3%', label: 'BaaS Market CAGR', detail: '2024\u20132030 growth rate', color: '#00897B', footnote: 1 },
    { value: '$177B', label: 'EU Cloud Market (2025)', detail: '\u2192 $525B by 2032', color: '#7B1FA2', footnote: 2 },
    { value: '72%', label: 'EU Businesses Prioritize Sovereignty', detail: 'in vendor selection', color: '#E65100', footnote: 3 },
  ],
  sources: [
    { id: 1, text: 'Research & Markets \u2014 "Backend-as-a-Service Market Size, Share & Forecast to 2030"', url: 'https://www.researchandmarkets.com/report/baas' },
    { id: 2, text: 'Fortune Business Insights \u2014 "Europe Cloud Computing Market Size, Share | Growth [2032]"', url: 'https://www.fortunebusinessinsights.com/europe-cloud-computing-market-113911' },
    { id: 3, text: 'Impossible Cloud \u2014 "Cloud Storage Cost Comparison Europe 2025" (citing industry survey data)', url: 'https://impossiblecloud.com/magazine/cloud-storage-cost-comparison-europe' },
  ],
  euGap: {
    headline: 'THE EU GAP',
    text: 'US hyperscalers control >70% of Europe\'s cloud infrastructure. There is no EU-native BaaS platform. Every major option \u2014 Firebase, Supabase, Amplify \u2014 is US-owned, US-hosted, and subject to the CLOUD Act.',
    stat: '0',
    statLabel: 'EU-native BaaS platforms exist today',
  },
}

export const howItWorks = {
  headline: 'One Platform. Complete Backend.',
  description: 'Developers interact with a single dashboard and API.',
  steps: [
    { step: '01', title: 'Sign Up', description: 'Create your Eurobase project in seconds. No credit card required.', color: '#1565C0' },
    { step: '02', title: 'Build', description: 'Use our SDK to add auth, database, storage, functions, and more to your app.', color: '#00897B' },
    { step: '03', title: 'Deploy', description: 'Ship to production with EU-native infrastructure. Zero DevOps.', color: '#7B1FA2' },
  ],
  layers: [
    'Authentication (6 methods including OAuth and phone SMS)',
    'Managed PostgreSQL with row-level security',
    'Realtime WebSocket subscriptions',
    'S3-compatible object storage',
    'Deno serverless functions with triggers',
    'Cron scheduling and webhooks',
    'Encrypted vault and audit logging',
    'Developer CLI and SDK',
  ],
}

export const pricing = {
  headline: 'Built to Grow With You',
  description: 'Transparent pricing with a generous free tier. No surprises, no bait-and-switch. Early access users get founder-friendly pricing.',
  tiers: [
    {
      name: 'Free',
      price: 'Free',
      description: '50,000 database rows, 500 MB storage, 2 projects, all auth methods included. No credit card required.',
      icon: '\uD83D\uDE80',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: 'Coming soon',
      description: '5,000,000 database rows, 50 GB storage, unlimited projects, priority support.',
      icon: '\u26A1',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      description: 'Dedicated infrastructure, custom limits, SLA and compliance tooling.',
      icon: '\uD83C\uDFE2',
      highlighted: false,
    },
  ],
}

export const vision = {
  headline: 'Building Europe\'s Developer Cloud',
  description: 'Eurobase is more than a backend platform.',
  milestones: [
    { phase: 'Now', title: 'Complete Backend Platform', items: ['Auth (6 methods), Database (REST + SQL + RLS), Storage, Realtime', 'Edge Functions, Vault, Cron, Webhooks, Audit Log', 'CLI, Team Collaboration, Console Dashboard'] },
    { phase: 'May 2026', title: 'Public Early Access', items: ['Free tier opens to all developers', 'SDK v1 and documentation', 'Community support'] },
    { phase: '2026\u20132027', title: 'Enterprise & Scale', items: ['Billing via Mollie', 'GraphQL API, image transforms', 'Custom domains, self-hosting'] },
    { phase: '2027+', title: 'Sovereign AI & Beyond', items: ['ISO 27001 certification', 'On-premise deployments', 'European vector storage and AI pipelines'] },
  ],
}

export const cta = {
  headline: 'Join the Next Generation of European Infrastructure',
  description: 'Early access opens May 2026. Join now for priority access and founder-friendly pricing.',
  primaryCta: 'Request Early Access',
  secondaryCta: 'Talk to the Founders',
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  image?: string
  content: string
  references: { label: string; url: string }[]
}

export const blog = {
  headline: 'From the Blog',
  description: 'Thoughts on European data sovereignty, cloud infrastructure, and building for developers.',
  posts: [
    {
      slug: 'europes-digital-sovereignty-problem',
      title: 'Europe\'s Digital Sovereignty Problem: We Built Our Startups on American Soil',
      excerpt: 'US hyperscalers control around 70% of the European cloud market. For EU startups and SMBs, this isn\'t just a vendor preference — it\'s a structural dependency.',
      date: '2026-03-05',
      author: 'Stefan Gimeson',
      readTime: '5 min read',
      content: `Every European startup faces the same invisible problem: the infrastructure they build on doesn't belong to them — and it never will.

## The Numbers Tell a Clear Story

US hyperscalers — AWS, Azure, and Google Cloud — control around 70% of the European cloud market. European providers hold just 15%, a share that dropped from 29% in 2017, according to Synergy Research Group.

For EU startups and SMBs, this isn't just a vendor preference — it's a structural dependency.

## Look at Your Own Stack

Think about the tools you rely on every day:

- **Authentication?** Google OAuth or Auth0 (Okta, US)
- **Database?** AWS RDS, Google Cloud SQL, or MongoDB Atlas (US)
- **Object storage?** Amazon S3 or Google Cloud Storage
- **Payments?** Stripe (US)
- **Email?** SendGrid (Twilio, US) or AWS SES

Every critical layer runs on infrastructure governed by US law — including the CLOUD Act, which grants US authorities access to data stored by American companies, regardless of where the servers physically sit.

## This Isn't About Anti-American Sentiment

It's about resilience.

When a single executive order can affect data access for millions of European businesses, we have a supply chain problem — not a technology problem. The GDPR set the rules. The Schrems II ruling reinforced them. But most European companies still build their entire backend on US-controlled infrastructure.

## The Vibe Coding Boom Makes It Worse

Thousands of apps are being built daily with AI tools like Cursor, Bolt, and Lovable. Developers are shipping faster than ever. But where does that code deploy? Straight to US clouds. Every vibe-coded app deepens Europe's dependency without the developer even thinking about it.

## European Alternatives Exist

Providers like Hetzner, OVHcloud, Scaleway, and Clever Cloud offer real European infrastructure. But they need customers who actively choose sovereignty alongside convenience.

The question for every EU founder: **What happens to your business if the rules change overnight?**

## We're Building the Answer

That's why we created Eurobase — a fully EU-native Backend-as-a-Service platform. Think Firebase or Supabase, but 100% EU-owned, EU-hosted, and CLOUD Act-immune.

Auth, Postgres, Storage, Realtime, Serverless Functions — all on European infrastructure. Zero DevOps. GDPR by design, not as an afterthought.

If you're a developer, founder, or enterprise decision-maker who needs a sovereign backend — we'd love to hear from you. [Join the early access program](/#cta).`,
      references: [
        { label: 'Synergy Research Group — European cloud providers: local market share now holds steady at 15%', url: 'https://www.srgresearch.com/articles/european-cloud-providers-local-market-share-now-holds-steady-at-15' },
        { label: 'EUR-Lex — General Data Protection Regulation (GDPR)', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
        { label: 'U.S. Congress — CLOUD Act (H.R. 4943)', url: 'https://www.congress.gov/bill/115th-congress/house-bill/4943' },
      ],
    },
    {
      slug: 'four-ways-to-run-server-side-code',
      title: 'Four Ways to Run Server-Side Code on Eurobase: When to Pick Which',
      excerpt: 'Cron Jobs, RPC, Database Triggers, and Edge Functions all live on Eurobase. They look similar from a distance but each has a specific job. Today we shipped the missing UI for the fourth, and a comparison table so you stop guessing.',
      date: '2026-04-29',
      author: 'Stefan Gimeson',
      readTime: '5 min read',
      image: '/blog-four-functions.jpg',
      content: `Eurobase has four distinct surfaces for running server-side code, and confusing them is a productivity tax. The SDK shape is similar enough that you can convince yourself \`eb.functions.invoke\` and \`eb.db.rpc\` are interchangeable. They are not. Today we shipped the missing piece — a UI for native PostgreSQL **Database Triggers** — and along with it a clean taxonomy so you pick the right tool the first time.

## The four kinds

**Cron Jobs.** Scheduled SQL or RPC, fired by a cron expression. Runs without a caller, on its own. Use it for daily cleanup of expired sessions, weekly digest aggregation, archiving old rows.

**RPC Functions.** Reusable PostgreSQL functions (SQL or PL/pgSQL) you call by name from your app. \`eb.db.rpc('cleanup_expired_sessions')\` runs the function inside the database in a single round-trip. Use it for atomic multi-statement DB logic — a check-and-decrement, a computed leaderboard, a complex aggregate.

**Database Triggers** (the new bit). PL/pgSQL functions bound to a row event on a table — INSERT, UPDATE, DELETE, TRUNCATE. They fire automatically when your app writes a row. Use them for invariants that must hold at all costs: a max-N-rows-per-user constraint, auto-stamping \`updated_at\`, mirroring inserts into an audit table. The trigger runs inside the same transaction as the write, so if it raises, the write rolls back.

**Edge Functions.** Serverless TypeScript / JavaScript in a Deno container, completely outside the database. Use them when you need the JS ecosystem or external HTTP — payment provider webhooks, sending email, calling an image-processing API, custom OAuth flows.

## A mental model that works

Cron Jobs are **scheduled SQL**. RPC is **callable SQL**. Triggers are **reactive SQL**. Edge Functions are **everything else**. The first three all live inside Postgres and share its transactional model. Edge Functions are a separate runtime that talks to your database the way your app does.

## What's new in the console

Until today, you could create a function that returns \`trigger\` (it lived in \`pg_proc\`), but there was no UI to attach it to a table. The only way was to crack open the SQL editor and run \`CREATE TRIGGER\` by hand. Today's release adds a **Triggers** panel under each table on the Database tab — same accordion shape as the existing Indexes panel. Pick a function from the picker, set timing (BEFORE / AFTER), events (INSERT / UPDATE / DELETE / TRUNCATE), and granularity (FOR EACH ROW / FOR EACH STATEMENT), optionally a WHEN clause, and click Create. The trigger is wired up in one round-trip.

We also rewrote the docs around this. The "Server-side logic in Eurobase" section now has a four-column comparison table covering language, transactional semantics, where each one is managed, use-case examples, and a "pick when" row — so the next time you wonder "should this be RPC or an Edge Function?", the answer is one click away.

## Sovereign by default

All four runtimes stay inside Europe. Cron, RPC, and Triggers run inside your project's PostgreSQL instance on Scaleway in France. Edge Functions run in the same Scaleway cluster. The platform never routes server-side execution through non-EU infrastructure — sovereign by design, GDPR-native by default.

## Where to read more

- Full comparison table and per-runtime walkthrough: <a href="https://console.eurobase.app/docs#edge-functions">console.eurobase.app/docs → Edge Functions chapter</a>
- The new Triggers panel: open any table on the Database tab in your project, scroll past the row data, expand the **Triggers** strip below **Indexes**.
- Don't have a Eurobase project yet? [Request beta access](/#cta).

If you've been hand-rolling triggers via the SQL editor or wondering whether your "send confirmation email" logic belongs in an RPC or an Edge Function, the answers are now built into the platform. Ship faster, with the right tool.`,
      references: [
        { label: 'Eurobase Console — Documentation', url: 'https://console.eurobase.app/docs' },
        { label: 'PostgreSQL — CREATE TRIGGER', url: 'https://www.postgresql.org/docs/current/sql-createtrigger.html' },
        { label: 'PostgreSQL — Trigger Procedures (PL/pgSQL)', url: 'https://www.postgresql.org/docs/current/plpgsql-trigger.html' },
        { label: 'Eurobase — The Sovereign BaaS for Europe', url: 'https://eurobase.app' },
      ],
    },
    {
      slug: 'eurobase-mcp-server-ai-native-sovereign-backend',
      title: 'Eurobase Now Speaks MCP: AI-Native Backend Operations, Sovereign by Default',
      excerpt: 'Claude Code, Codex, Cursor, and Windsurf can now operate your Eurobase project directly — list tables, run SQL, manage Vault, invoke functions — through a hosted MCP server that never leaves EU soil.',
      date: '2026-04-28',
      author: 'Stefan Gimeson',
      readTime: '5 min read',
      image: '/blog-mcp-launch.jpg',
      content: `AI coding assistants have spent the last two years getting better at writing code. The next leap is them getting better at operating the systems that code runs on. As of this week, Eurobase ships a hosted Model Context Protocol (MCP) server so your assistant can do exactly that — and it does it without leaving European jurisdiction.

## What Just Shipped

A live MCP endpoint at \`https://mcp.eurobase.app/mcp\`, plus a "Connect" tab in the console that generates the right snippet for every major AI IDE: Claude Code, Codex, Cursor, Windsurf, or any client that speaks the open Streamable-HTTP MCP transport.

Once configured, your assistant gains 15 tools that map onto the platform API:

- **Projects** — list and inspect every Eurobase project you can access
- **Database** — list tables, describe schemas, run SQL, create tables
- **Auth** — list end-users registered in a project
- **Storage** — list files, generate signed download URLs
- **Vault** — list, read, and write encrypted secrets
- **Functions** — list and invoke edge functions
- **Status** — health-check the API

These aren't suggestions the model writes for you. They're tool calls the assistant executes in real time. Asking "how many users signed up to LexVault this week?" no longer means generating a SELECT for you to copy into the SQL editor — the assistant runs the query itself, gets the number back, and tells you the answer.

## Why This Matters

There's a real difference between teaching an AI about your project and letting it operate on your project. A \`CLAUDE.md\` or \`.cursorrules\` file (which Eurobase also generates for you, schema-aware) gives the model context. MCP gives it agency.

That distinction shows up the moment you're doing real work. The assistant can:

- Inspect schema before writing migration code, instead of guessing column names
- Verify a query returned what it expected, not just that it compiled
- Rotate a Vault secret as part of fixing a leaked credential, in the same session
- Run a function and read its output back into the conversation
- Cross-check user counts and storage usage before recommending a plan upgrade

The agent stops being a code generator and starts being a junior engineer with read access to your live system.

## The Sovereignty Angle

Most MCP servers shipped this year run on US infrastructure. The leading vibe-coding platforms route their tool calls through AWS, Cloudflare, or Vercel. Even when the model itself is hosted elsewhere, the tool plane is American — and every list-tables call, every SQL statement, every secret read is a request that could be subpoenaed under the CLOUD Act.

Eurobase's MCP server runs on Scaleway in Paris, behind the same EU-only ingress as the rest of the platform. Tool calls never traverse a US-controlled network path. The only data your AI vendor ever sees is what the model itself reads in the conversation transcript — not the underlying queries, schemas, or secrets.

If you've moved your backend to Eurobase for sovereignty reasons, your AI tooling can now match. No bolted-on US dependency at the agent layer.

## Personal Access Tokens, Designed for Bots

We didn't want to ship MCP and tell users "just paste your console JWT into a config file." JWTs are a bad fit for tooling: short-lived, no naming, no revocation, and they carry every claim your account has — including superadmin if you happen to be one.

So we shipped Personal Access Tokens alongside the MCP server. Mint one in **Account → Personal Access Tokens** with a name ("my laptop", "ci-prod") and an optional expiry. The plaintext is shown once on creation; only the SHA-256 hash is persisted.

PATs are deliberately scoped down from a console login:

- **Authenticate as you** across every project you own or are a member of — full SDK and platform-API surface, scoped by RLS and project roles like any other request.
- **Never carry superadmin rights**, even when minted by a superadmin. Platform admin endpoints are unreachable through a PAT — a leaked token can't reach the cross-tenant surface.
- **Cannot mint other tokens.** Token creation requires an authenticated console session. Limits the blast radius of a single leaked PAT.
- **Cannot change passwords or delete the account.**

Revocation is immediate and per-token. Last-used timestamps surface in the UI so inactive tokens are easy to spot and clean up.

## The MCP-vs-SDK-vs-Migrations Rule

Once an agent has both MCP tools and SDK awareness, the question becomes when to use which. The generated \`CLAUDE.md\` and \`AGENTS.md\` files now embed an explicit rule the assistant reads on every session:

- **SDK** — code written into the application that runs in production at request-time, scoped by end-user RLS. Use it for everything the deployed app does on behalf of its users.
- **MCP** — tool calls the agent makes during a coding session, scoped by your PAT. Default to read-only: SELECT, describe, list. Use it to inspect the live system.
- **Migrations** — durable schema changes, version-controlled, reviewed in PR, replayed in CI on every environment.

Concretely: a schema change of any kind goes in a migration file under \`migrations/\`, never as a silent \`mcp__eurobase__db_execute_sql\` call against the live DB. If the change isn't checked into git, it doesn't exist on staging or in any teammate's branch — and that path produces real outages.

The rule is tight enough that the assistant follows it without prompting. We tested it.

## Try It in Two Minutes

1. Sign in to **console.eurobase.app**.
2. Open **Account → Personal Access Tokens** and click **New token**.
3. Open any of your projects, go to **Connect**, and copy the snippet for your IDE.
4. \`export EUROBASE_PAT=eb_pat_...\` in your shell, then run the snippet.

That's it. Open Claude Code (or Cursor, or Codex, or Windsurf) and ask it about your project. It will reach in, look around, and answer.

## What's Next

Tool coverage is where we expect the most rapid iteration based on beta feedback. Webhook management, edge-function deployment, and signed-URL upload are queued. Read-only audit-log access is too — useful for "what changed in the last hour?" debugging conversations.

If you're a beta tester building with AI, this is the piece you've been asking for. If you've been waiting for sovereign AI tooling that doesn't quietly route through the US, it's here.

[Sign in to your console](https://console.eurobase.app) to mint a PAT and connect, or [request beta access](/#cta) if you don't have a project yet.`,
      references: [
        { label: 'Model Context Protocol — Specification', url: 'https://modelcontextprotocol.io' },
        { label: 'Eurobase — The Sovereign BaaS for Europe', url: 'https://eurobase.app' },
        { label: 'Anthropic — Introducing the Model Context Protocol', url: 'https://www.anthropic.com/news/model-context-protocol' },
        { label: 'U.S. Congress — CLOUD Act (H.R. 4943)', url: 'https://www.congress.gov/bill/115th-congress/house-bill/4943' },
      ],
    },
    {
      slug: 'first-beta-testers-are-building-on-eurobase',
      title: 'First Beta Testers Are Building on Eurobase — Here\'s What\'s Ready',
      excerpt: 'This week we onboard the first beta testers onto Eurobase. A full backend platform — auth, Postgres, storage, realtime, edge functions, vault, cron, webhooks — running entirely on EU infrastructure.',
      date: '2026-04-24',
      author: 'Stefan Gimeson',
      readTime: '4 min read',
      image: '/blog-beta-testers.png',
      content: `This week marks a milestone for Eurobase: our first beta testers are getting access to the platform. Real developers, building real applications, on a fully European backend stack.

## What's Already Built

Eurobase isn't a landing page with a waitlist. It's a working platform. Here's what beta testers get access to today:

**Authentication** — Email/password, magic links, and OAuth with Google, GitHub, LinkedIn, Apple, and Microsoft. JWT-based sessions with refresh tokens, anon keys for public client access, and service keys for server-side operations.

**Managed PostgreSQL** — A full Postgres database per project with a REST API, SQL editor, and row-level security with preset policies. Schema management through the console or the SDK's DDL endpoint.

**Object Storage** — S3-compatible file storage with signed URLs, metadata, and folder navigation. Upload limits of 10 MB (Free) or 50 MB (Pro).

**Realtime** — WebSocket subscriptions for INSERT, UPDATE, and DELETE events. Up to 100 concurrent connections on Free, 10,000 on Pro.

**Edge Functions** — Deploy serverless TypeScript/JavaScript functions with environment variables, JWT verification, and versioning. 3 functions on Free, 25 on Pro.

**Vault** — AES-256-GCM encrypted key-value store for secrets, API keys, and sensitive configuration.

**Cron Jobs** — Schedule SQL queries and RPC calls with execution logs.

**Webhooks** — Event-driven HTTP delivery with retry logic and HMAC signing. 3 endpoints on Free, unlimited on Pro.

**Compliance Tooling** — Automated DPA reports, sub-processor registry, and audit logging with actor, action, IP, and timestamp.

**Console Dashboard** — A full web console for managing projects, databases, auth, storage, functions, vault, cron, webhooks, users, API keys, team members, and compliance reports.

**JavaScript SDK** — A client library covering auth, database, storage, realtime, vault, functions, and schema management.

**CLI** — Command-line tooling for projects, database operations, storage, vault, functions, and migrations.

## Both Plans Are Free During Beta

We're offering both the Free and Pro tiers at no cost during the beta period. No credit card, no trial expiration. This isn't a limited demo — beta testers get full access to every feature across both plans.

Here's how the plans compare:

| | Free | Pro |
|---|---|---|
| Database | 500 MB | 5 GB |
| Storage | 1 GB | 50 GB |
| Bandwidth | 5 GB | 100 GB |
| Monthly active users | 10,000 | 100,000 |
| Projects | 2 | 10 |
| Edge Functions | 3 | 25 |
| Webhooks | 3 | Unlimited |
| Log retention | 1 day | 30 days |

## 100% EU Infrastructure

Every byte runs on Scaleway in France. No AWS, no GCP, no Azure, no Cloudflare. No US cloud services, period. The entire stack — compute, database, storage, DNS — operates under EU jurisdiction. There is no CLOUD Act exposure.

This isn't a wrapper around US infrastructure with an EU label. It's a platform built from scratch to be sovereign by architecture, not by policy.

## Shape the Roadmap

Beta testers aren't just users — they're co-creators. We're actively building based on feedback from the people who use the platform. Upcoming features like GraphQL API, image transforms, custom domains, and self-hosting will be shaped directly by what beta testers need.

If you've ever wanted a feature in Firebase or Supabase but couldn't get it prioritized — this is your chance to influence a platform from day one.

## Why This Matters

Europe's developers deserve backend infrastructure that doesn't come with jurisdictional risk attached. Every Firebase project, every Supabase instance, every AWS-backed service is governed by US law — regardless of where the server sits.

Eurobase exists because we believe European software should be built on European infrastructure. Not as a political statement, but as an engineering decision.

## Join the Beta

If you're a developer, founder, or team that wants to build on sovereign EU infrastructure — we're onboarding testers now. Free and Pro plans, full platform access, direct line to the team building it.

[Request access today](/#cta).`,
      references: [
        { label: 'Eurobase — The Sovereign BaaS for Europe', url: 'https://eurobase.app' },
        { label: 'Scaleway — European Cloud Provider', url: 'https://www.scaleway.com' },
        { label: 'U.S. Congress — CLOUD Act (H.R. 4943)', url: 'https://www.congress.gov/bill/115th-congress/house-bill/4943' },
      ],
    },
    {
      slug: 'adequacy-carousel-four-level-test',
      title: 'The Adequacy Carousel: Why Your EU Data Strategy Shouldn\'t Depend on the Next US Privacy Framework',
      excerpt: 'The EU-US Data Privacy Framework was upheld in September 2025, appealed in October 2025, and goes back to the CJEU in 2026. Even Max Schrems thinks the appeal will fail on standing alone — but the underlying tension between EU privacy law and US surveillance law is structural, and we\'ll be back here in three years either way. A four-level test that gives you a sovereignty answer the next adequacy framework can\'t take away.',
      date: '2026-05-04',
      author: 'Stefan Gimeson',
      readTime: '6 min read',
      image: '/blog-adequacy-carousel.jpg',
      content: `Three dates the EU privacy world is watching:

- **3 September 2025** — the General Court of the European Union upholds the EU-US Data Privacy Framework.
- **31 October 2025** — the framework is appealed to the Court of Justice.
- **Sometime in 2026** — the CJEU rules.

Even Max Schrems, whose organisation noyb filed the appeal, has publicly said he expects it to fail on standing grounds — dismissed before the merits are reached. That doesn't end the cycle. Schrems' broader position is that the only durable answer in 2026 is data localisation, and the legal history backs him up.

If your stack depends on the answer the CJEU lands on, this post is for you.

## A short legal timeline

To understand why we're here a fourth time, the timeline matters:

- **2000–2015 — Safe Harbor**. The original framework letting US companies receive EU personal data. The CJEU strikes it down in *Schrems I* (2015) after Edward Snowden's disclosures show what FISA §702 actually does.
- **2016–2020 — Privacy Shield**. The replacement. Same idea, fresh paint. Struck down in *Schrems II* (2020) on essentially the same grounds: EU privacy law and US surveillance law remain in genuine tension, and a self-certification framework can't bridge it.
- **2023 — Data Privacy Framework (DPF)**. The third attempt, adopted by the European Commission in July 2023. Most US-incorporated SaaS providers — Vercel, Supabase, Stripe, Datadog, OpenAI, GitHub — now point at the DPF as their legal basis for receiving EU personal data.
- **3 September 2025** — *Latombe v. Commission* (T-553/23). The General Court upholds the DPF: at the time of adoption, the US offered "adequate" protection.
- **31 October 2025**. noyb files an appeal to the CJEU.
- **2026**. The CJEU rules. Schrems himself has said the appeal will probably fall on standing grounds — but the underlying tension is unchanged, and recent structural changes to US oversight bodies (the Privacy and Civil Liberties Oversight Board, the Federal Trade Commission) are already raising fresh questions about whether the redress mechanisms the DPF relies on still function.

Three frameworks in twenty-five years. Two struck down. One contested. The cycle has been about three to five years long since 2000, and the gap between cycles is not getting longer.

## What's at stake if the DPF falls

Your stack does not go offline. The DPF is a paperwork instrument, not a packet filter. But every US-incorporated vendor in your processing record needs new contractual scaffolding within weeks — and the speed of that scaffolding is the part the executive summaries leave out.

In 2020, when *Schrems II* invalidated Privacy Shield overnight, tens of thousands of EU companies spent the next eighteen months rebuilding their transfer paperwork: signing Standard Contractual Clauses with each vendor, performing Transfer Impact Assessments per processing activity, mapping where their end-users' data physically routes through which subprocessor in which country, and either accepting the residual risk or migrating workloads. Some did it fast. Many didn't, and quietly carried unresolved transfer risk for the next two years.

If the DPF is struck, the same exercise repeats. If the DPF is upheld but the political ground under it keeps shifting, the exercise still repeats — just on a slower clock.

The thing that makes any of this *not* your problem is if the question of cross-Atlantic transfer doesn't apply to your stack in the first place.

## A four-level test for any vendor

When you next evaluate a backend or a cloud, ordered easiest to hardest:

**L1 — Data residency.** The bytes physically sit in an EU data centre. This is the minimum, and it's what most "we have an EU region" stories deliver. It addresses latency for EU users and a narrow, surface-level reading of GDPR Art. 44 (cross-border transfers).

**L2 — Legal jurisdiction.** The entity that controls the bytes is established in the EU and answers to EU courts first. This is the level the entire DPF debate is fundamentally about. If your provider is EU-jurisdiction, the adequacy carousel is not your problem — there is no transatlantic transfer to argue about.

**L3 — Ownership.** The provider's parent company and capital structure sit in the EU. This guards against an M&A event or a board decision elsewhere flipping the answer overnight. A vendor that's L2 today but acquired by a non-EU buyer next year is back at L1 the day the deal closes.

**L4 — Operational independence.** The provider's support staff, sub-processors, backup pipelines, log analytics and payment partners all stay in the EU too. This is the level where most "sovereign cloud" claims fall over: a support engineer in California opens a customer ticket attachment, a backup silently replicates to us-east-1, an observability vendor ingests log lines containing end-user emails. None of that is hostile — it's just operational drift. But it's what an EU regulator looks at when they look hard.

## What each level actually protects

| Level | Threat it neutralises |
|---|---|
| L1 — Residency | Latency for EU users; the surface-level Art. 44 question |
| L2 — Jurisdiction | The adequacy carousel; foreign-jurisdiction subpoenas regardless of country |
| L3 — Ownership | M&A and board-level decisions made outside the EU reaching down into your stack |
| L4 — Operational independence | The quiet, embarrassing leaks: support tooling, backup replication, log analytics, third-party widgets |

Each level builds on the last. Earning L1 is not a failure; it's the right level for some workloads. The point of the test is to make the choice deliberate.

## Apply the test to a typical "EU stack"

A common modern EU-region stack, rated honestly:

| Vendor | Role | One-line fact | Level |
|---|---|---|---|
| Vercel | Hosting | US-incorporated; EU regions available; edge runs through US-controlled infrastructure | L1 |
| Supabase | Backend-as-a-Service | US-incorporated; can be deployed in eu-central-1 (AWS Frankfurt); parent and ownership US | L1 |
| AWS Frankfurt | Underlying cloud | US-incorporated parent; EU region; entity is subject to US legal process | L1 |
| Stripe | Payments | US-incorporated; EU operations through Stripe Payments Europe Ltd (Ireland) | L1–L2 |
| Twilio | SMS | US-incorporated; EU regions available for some products | L1 |
| Datadog | Observability | US-incorporated; EU region offered; pipeline managed from US | L1 |
| GitHub | Code | US-incorporated (Microsoft); no EU jurisdiction option | L1 |

This is not a hit piece. It's the maths. Most of the modern developer toolkit is L1 — and that's a deliberate choice you can make if the trade-offs are worth it. The point is to know.

## Where Eurobase sits

We built the platform to clear all four levels by default:

- **L1**: yes. Compute, database, storage, and email all run on Scaleway in France (DC-PAR1 / DC-PAR2).
- **L2**: yes. Eurobase is a French entity. (Currently in registration; SIRET will publish on the imprint page on incorporation.)
- **L3**: yes. EU-owned cap-table by design; structure published on incorporation.
- **L4**: substantially. All sub-processors are EU-based by default — Scaleway in France, GatewayAPI in Denmark, Mollie in the Netherlands when paid plans launch. Google and GitHub OAuth are opt-in per project, off by default, and any active sub-processor surfaces in your live compliance report so you always know your data map.

Want to verify any of this? The compliance report inside any Eurobase project lists every active sub-processor, its jurisdiction, its certifications, and the data categories it sees. It's generated from the same database the platform uses to run — not a static page that drifts from reality.

## The take-away

The four-level test is vendor-agnostic. Print it, take it to your CTO, your CISO, and your legal counsel. Whichever provider you end up picking, ask them where they sit on each level. They should be able to answer in two sentences. If they need a paragraph, that's information too.

Adequacy frameworks come and go. Where your vendor is established does not.

If you'd like a backend that's L4 by default, [join the early access programme](/#cta).`,
      references: [
        { label: 'noyb — Appeal of the EU-US Data Privacy Framework to the CJEU', url: 'https://noyb.eu/en/eu-us-data-transfers-time-prepare-more-trouble-come' },
        { label: 'European Commission — EU-US data transfers (DPF status)', url: 'https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en' },
        { label: 'Court of Justice of the EU — Case C-311/18 (Schrems II), 16 July 2020', url: 'https://curia.europa.eu/juris/liste.jsf?num=C-311/18' },
        { label: 'General Court — Case T-553/23 (Latombe v. Commission), 3 September 2025', url: 'https://curia.europa.eu/juris/liste.jsf?num=T-553/23' },
        { label: 'Eurobase — Compliance reporting in your project console', url: 'https://console.eurobase.app' },
      ],
    },
  ] as BlogPost[],
}

export const nav = {
  links: [
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'For Developers', href: '#developers' },
    { label: 'Market', href: '#market' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
  ],
}
