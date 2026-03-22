export const hero = {
  headline: 'Eurobase — The Sovereign BaaS for Europe',
  subheadline: 'Build modern applications with authentication, database, storage, realtime APIs, and serverless — fully EU-native, zero US jurisdiction, zero DevOps.',
  tagline: 'Firebase simplicity. Postgres power. European sovereignty.',
  primaryCta: 'Join the Early Access Program',
  secondaryCta: 'Download the Vision Paper',
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
    { name: 'Authentication', icon: '🔐', color: '#F9A825', description: 'Managed Identity & OAuth' },
    { name: 'Managed PostgreSQL', icon: '🗄️', color: '#1E88E5', description: 'Postgres with Realtime' },
    { name: 'Object Storage', icon: '📦', color: '#43A047', description: 'S3-compatible, secure access control' },
    { name: 'Realtime Subscriptions', icon: '🧩', color: '#8E24AA', description: 'WebSockets, CDC, event streams' },
    { name: 'Serverless Functions', icon: '🔧', color: '#E65100', description: 'Business logic without infrastructure' },
    { name: 'Logging & Monitoring', icon: '📜', color: '#C62828', description: 'Observability built in' },
    { name: 'Developer Dashboard', icon: '🖥️', color: '#1565C0', description: 'A powerful control plane' },
  ],
  footer: ['No DevOps required.', 'No sovereignty compromise.'],
}

export const differentiators = {
  headline: 'Built for Europe. Built for Developers.',
  items: [
    {
      title: '100% EU-Owned',
      description: 'EU-hosted, EU-jurisdiction. No CLOUD Act exposure. Schrems II–safe by design.',
      color: '#1565C0',
    },
    {
      title: 'Zero-DevOps',
      description: 'Postgres, Auth, Storage, Realtime, Functions — ready in seconds.',
      color: '#00897B',
    },
    {
      title: 'GDPR-Native',
      description: 'Region locking, audit logging, retention, automated DPAs.',
      color: '#7B1FA2',
    },
    {
      title: 'Enterprise-Ready',
      description: 'ISO 27001 roadmap, on-prem & private cloud deployable.',
      color: '#E65100',
    },
    {
      title: 'Migration Kit',
      description: 'A painless exit path from Firebase/Supabase that EU companies need.',
      color: '#C62828',
    },
  ],
}

export const developer = {
  headline: 'Build Fast. Stay Sovereign.',
  description: 'Start a project in minutes.',
  code: `const euro = createClient();

await euro.auth.signInWithEmail({
  email: "dev@startup.eu",
  password: "••••••••"
});

const users = await euro.db
  .from("users")
  .select("*");`,
  features: [
    'SQL-based database with row-level security',
    'Modern SDKs for web and mobile',
    'Realtime subscriptions out of the box',
    'Secure object storage',
    'Serverless functions for business logic',
    'Transparent usage metrics',
  ],
  footer: ['No infrastructure tickets.', 'No compliance anxiety.', 'Just build.'],
}

export const enterprise = {
  headline: 'Sovereign Infrastructure Without Compromise',
  description: 'Eurobase is built for organizations that need certainty.',
  features: [
    { name: 'European legal governance', icon: '⚖️' },
    { name: 'Data residency guarantees', icon: '🏛️' },
    { name: 'Compliance documentation', icon: '📋' },
    { name: 'Audit logging', icon: '🔍' },
    { name: 'Role-based access control', icon: '🔑' },
    { name: 'Secure key management', icon: '🛡️' },
    { name: 'Enterprise support and SLAs', icon: '📞' },
  ],
  footer: 'This is backend infrastructure your compliance team can approve.',
  valueProp: [
    { title: 'For Developers', description: 'Launch apps in minutes without touching infrastructure — like Firebase, but privacy-first and EU-native.', color: '#1565C0' },
    { title: 'For Enterprises & GovTech', description: 'A modern backend that satisfies strict EU regulatory, sovereignty, and compliance requirements.', color: '#00695C' },
    { title: 'For the EU Ecosystem', description: 'A sovereign cloud building block keeping sensitive data, AI pipelines, and digital services under EU control.', color: '#4527A0' },
  ],
}

export const market = {
  headline: 'The Sovereignty Shift Has Begun',
  description: 'The BaaS market is booming — and Europe has zero sovereign options.',
  stats: [
    { value: '$8.4B', label: 'Global BaaS Market (2024)', detail: '→ $31.1B by 2030', color: '#1565C0', footnote: 1 },
    { value: '24.3%', label: 'BaaS Market CAGR', detail: '2024–2030 growth rate', color: '#00897B', footnote: 1 },
    { value: '$177B', label: 'EU Cloud Market (2025)', detail: '→ $525B by 2032', color: '#7B1FA2', footnote: 2 },
    { value: '72%', label: 'EU Businesses Prioritize Sovereignty', detail: 'in vendor selection', color: '#E65100', footnote: 3 },
  ],
  sources: [
    { id: 1, text: 'Research & Markets — "Backend-as-a-Service Market Size, Share & Forecast to 2030"', url: 'https://www.researchandmarkets.com/report/baas' },
    { id: 2, text: 'Fortune Business Insights — "Europe Cloud Computing Market Size, Share | Growth [2032]"', url: 'https://www.fortunebusinessinsights.com/europe-cloud-computing-market-113911' },
    { id: 3, text: 'Impossible Cloud — "Cloud Storage Cost Comparison Europe 2025" (citing industry survey data)', url: 'https://impossiblecloud.com/magazine/cloud-storage-cost-comparison-europe' },
  ],
  euGap: {
    headline: 'THE EU GAP',
    text: 'US hyperscalers control >70% of Europe\'s cloud infrastructure. There is no EU-native BaaS platform. Every major option — Firebase, Supabase, Amplify — is US-owned, US-hosted, and subject to the CLOUD Act.',
    stat: '0',
    statLabel: 'EU-native BaaS platforms exist today',
  },
}

export const howItWorks = {
  headline: 'One Platform. Complete Backend.',
  description: 'Developers interact with a single dashboard and API.',
  steps: [
    { step: '01', title: 'Sign Up', description: 'Create your Eurobase project in seconds. No credit card required.', color: '#1565C0' },
    { step: '02', title: 'Build', description: 'Use our SDK to add auth, database, storage, and functions to your app.', color: '#00897B' },
    { step: '03', title: 'Deploy', description: 'Ship to production with EU-native infrastructure. Zero DevOps.', color: '#7B1FA2' },
  ],
  layers: [
    'Authentication and identity services',
    'Managed PostgreSQL with fine-grained access control',
    'Realtime data pipelines',
    'Secure object storage',
    'Serverless execution environments',
    'Monitoring and analytics',
  ],
}

export const pricing = {
  headline: 'Built to Grow With You',
  description: 'We\'re still finalizing our pricing — but one thing is certain: Eurobase will always have a generous free tier. No surprises, no bait-and-switch.',
  tiers: [
    {
      name: 'Free',
      price: 'Free',
      description: 'For side projects, prototyping, and getting started — always free, no credit card required',
      icon: '🚀',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: 'Coming soon',
      description: 'For growing teams and production apps that need more power and priority support',
      icon: '⚡',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Coming soon',
      description: 'For regulated industries and large organizations requiring dedicated infrastructure and compliance tooling',
      icon: '🏢',
      highlighted: false,
    },
  ],
}

export const vision = {
  headline: 'Building Europe\'s Developer Cloud',
  description: 'Eurobase is more than a backend platform.',
  milestones: [
    { phase: 'Now', title: 'Core Platform', items: ['Auth, Database, Storage, Functions', 'Developer dashboard', 'SDK for web & mobile'] },
    { phase: '2027', title: 'Enterprise & Compliance', items: ['ISO 27001 certification', 'On-premise deployments', 'Advanced audit tooling'] },
    { phase: '2028', title: 'Sovereign AI', items: ['European vector storage', 'Privacy-first AI pipelines', 'Compliance automation'] },
    { phase: 'Vision', title: 'EU Developer Cloud', items: ['Full sovereign cloud stack', 'Multi-region EU deployment', 'Marketplace ecosystem'] },
  ],
}

export const cta = {
  headline: 'Join the Next Generation of European Infrastructure',
  description: 'Be part of the founding community shaping Europe\'s sovereign backend platform.',
  primaryCta: 'Request Early Access',
  secondaryCta: 'Talk to the Founders',
}

export const nav = {
  links: [
    { label: 'Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'For Developers', href: '#developers' },
    { label: 'Market', href: '#market' },
    { label: 'Pricing', href: '#pricing' },
  ],
}
