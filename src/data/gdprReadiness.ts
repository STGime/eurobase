// Question set for the /gdpr-readiness assessment quiz.
//
// Ten questions, each with 3–4 answer options weighted 0–3. Total
// score 0–30. The report categorises into three bands:
//   0–14  High risk        — multiple GDPR obligations left as DIY
//   15–22 Partial coverage — the common "we have a DPA, DSAR is manual" state
//   23–30 Good posture     — GDPR primitives are already automated or well-covered
//
// Every question has a `eurobaseCovers` block that appears in the
// report when the user's answer scored low — the pitch is that
// Eurobase automates that specific obligation. Written to be
// factually correct about our capabilities so a DPO reading the
// report cannot flag it as marketing spin.

export interface AssessmentOption {
  label: string
  points: 0 | 1 | 2 | 3
}

export interface AssessmentQuestion {
  id: string
  category: string
  question: string
  helper?: string
  options: AssessmentOption[]
  /** What Eurobase does about this obligation, shown in the report when
   *  the user's own answer scored below the "good" threshold (points <= 1).
   */
  eurobaseCovers: string
  /** Link to the relevant Eurobase docs / feature page (optional). */
  learnMoreHref?: string
  learnMoreLabel?: string
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'residency',
    category: 'Data residency',
    question: 'Where does your backend physically store your users\' personal data?',
    helper: 'This is about the physical location of the database and object storage — not the corporate parent (see next question).',
    options: [
      { label: 'Anywhere the provider defaults to (often US)', points: 0 },
      { label: 'We picked an EU region on a global provider (AWS eu-central-1, GCP europe-west, Azure North Europe)', points: 2 },
      { label: 'EU-only infrastructure from an EU-headquartered provider (Scaleway, OVH, Hetzner)', points: 3 },
      { label: 'I\'m not sure', points: 0 },
    ],
    eurobaseCovers:
      'Eurobase runs entirely on Scaleway in France (fr-par). Every project\'s Postgres, object storage, and edge functions are physically in the EU, no toggle required. Physical residency is one dimension of GDPR — see the next question for the other one.',
    learnMoreHref: '/security',
    learnMoreLabel: 'How Eurobase handles residency',
  },
  {
    id: 'jurisdiction',
    category: 'Jurisdictional exposure',
    question: 'Is the corporate parent of your backend provider subject to the US CLOUD Act?',
    helper: 'The CLOUD Act (18 U.S.C. §2523, 2018) lets US authorities compel disclosure by US-headquartered companies regardless of where data physically sits. This is separate from residency.',
    options: [
      { label: 'Yes — provider is US-headquartered (Supabase, Firebase, MongoDB Atlas, Vercel, most hyperscalers)', points: 0 },
      { label: 'Partially — the provider is EU but the underlying infrastructure is US-owned (AWS, GCP, Azure)', points: 1 },
      { label: 'No — provider AND infrastructure are EU-headquartered', points: 3 },
      { label: 'I\'m not sure', points: 0 },
    ],
    eurobaseCovers:
      'Eurobase OÜ is an Estonian company. Scaleway is French (subsidiary of the Iliad group). GatewayAPI is Danish; Mollie is Dutch. No hop in the critical path goes through a US-headquartered provider. Corporate-parent jurisdiction is the CLOUD Act vector the EDPB has repeatedly flagged for regulated-industry procurement.',
    learnMoreHref: '/vs/supabase',
    learnMoreLabel: 'CLOUD Act reach through the parent',
  },
  {
    id: 'subprocessors',
    category: 'Article 30 — Records of Processing',
    question: 'Do you maintain a live Record of Processing Activities (RoPA) listing every sub-processor with their jurisdiction and transfer mechanism?',
    helper: 'Article 30 of the GDPR requires this. In an audit, the DPO or supervisory authority will ask for it in writing.',
    options: [
      { label: 'No RoPA today', points: 0 },
      { label: 'Yes — a spreadsheet we update manually a few times a year', points: 1 },
      { label: 'Yes — a document generator that pulls from a manually-curated source of truth', points: 2 },
      { label: 'Yes — auto-generated from the live sub-processor registry of our platform', points: 3 },
    ],
    eurobaseCovers:
      'Every Eurobase project can download an Article 30 RoPA report auto-generated from the live sub-processor registry (Scaleway for infra, GatewayAPI for SMS, Mollie for billing). When we add a processor, the RoPA updates automatically. No spreadsheet drift.',
    learnMoreHref: '/features/dsar',
    learnMoreLabel: 'Article 30 automation',
  },
  {
    id: 'dsar-mechanism',
    category: 'Article 15 / 20 — Data Subject Access',
    question: 'When an end-user submits a DSAR ("give me a copy of my data"), how does your team fulfil it?',
    helper: 'GDPR requires you respond within 30 days. In practice most engineering teams underestimate the recurring cost.',
    options: [
      { label: 'We\'d write custom SQL and zip the results by hand for each request', points: 0 },
      { label: 'We have a runbook + partial scripts but each DSAR still needs engineering time', points: 1 },
      { label: 'A dashboard exports for us but end-users can\'t self-serve', points: 2 },
      { label: 'End-users can self-serve their own export from our app, rate-limited and audit-logged', points: 3 },
    ],
    eurobaseCovers:
      'Eurobase ships one-click DSAR export in the console (per-user or full-project zip, signed URLs that expire in 7 days) plus a first-class SDK call (eb.auth.exportMyData()) that your app can expose to end-users directly. Rate-limited to 1 per user per 24h by default; every export lands in the audit log.',
    learnMoreHref: '/features/dsar',
    learnMoreLabel: 'One-click DSAR export',
  },
  {
    id: 'audit-trail',
    category: 'Article 5(1)(f) / 32 — Accountability',
    question: 'Do you have a tamper-evident audit log of admin actions (schema changes, user deletions, key rotations, DSAR runs)?',
    helper: 'Article 32 requires appropriate security measures; a common ask in breach investigations is "who did what and when."',
    options: [
      { label: 'No structured audit log', points: 0 },
      { label: 'Application logs go somewhere, but no dedicated audit trail', points: 1 },
      { label: 'A dedicated audit table with actor / timestamp / IP', points: 2 },
      { label: 'A hash-chained audit trail (each row hashes the previous — deletion or reorder is detectable)', points: 3 },
    ],
    eurobaseCovers:
      'Every admin action on Eurobase (project changes, schema DDL, user deletions, API key rotations, DSAR runs) lands in a hash-chained audit log with actor, IP, and timestamp. Deletion or reorder of an entry is detectable by re-verifying the chain — the schema is published in every project.',
    learnMoreHref: '/security',
    learnMoreLabel: 'Audit-log design',
  },
  {
    id: 'retention',
    category: 'Article 5(1)(e) — Storage limitation',
    question: 'How do you enforce data-retention limits (auto-delete or archive when the lawful basis expires)?',
    helper: 'Article 5(1)(e) says you must not store personal data longer than necessary for the purpose it was collected for.',
    options: [
      { label: 'No automated retention today — manual cleanup on request', points: 0 },
      { label: 'A cron job we wrote deletes records after a fixed period per table', points: 1 },
      { label: 'Retention policies per table with soft-delete + purge, plus WORM for the records that must not be deletable', points: 3 },
    ],
    eurobaseCovers:
      'Eurobase supports per-table retention policies (auto-delete after N days, soft-delete + purge, WORM per-prefix for records that must not be deletable — used by the Legal Team tier for BRAO / HGB / AO retention). Retention configuration is versioned and audit-logged.',
    learnMoreHref: '/legal',
    learnMoreLabel: 'Retention + WORM',
  },
  {
    id: 'breach',
    category: 'Article 33 — Breach notification',
    question: 'Could you detect a data-exfiltration event and notify your supervisory authority within 72 hours?',
    helper: 'Article 33 gives you 72 hours from awareness of a personal-data breach to notify the DPA.',
    options: [
      { label: 'Probably not — no dedicated monitoring for anomalous data access', points: 0 },
      { label: 'Yes for authentication anomalies; unclear for direct DB access', points: 1 },
      { label: 'Yes — we have alerts on both auth and read/write anomalies, plus an incident runbook', points: 3 },
    ],
    eurobaseCovers:
      'Eurobase surfaces auth events, admin actions, and rate-limit violations through the audit log and Grafana / Prometheus. A breach-detection runbook is being formalised as part of the SOC 2 track (2026-2027). If you enable the platform-audit webhook, every anomaly can trigger your own SIEM.',
  },
  {
    id: 'transfer-mechanism',
    category: 'Chapter V — International transfers',
    question: 'If any of your processors is outside the EEA, which transfer mechanism do you rely on?',
    helper: 'Post-Schrems-II, Standard Contractual Clauses are contractual but require a case-by-case assessment. The safest posture is "no transfers."',
    options: [
      { label: 'Standard Contractual Clauses (SCCs) with US processors, no supplementary measures', points: 0 },
      { label: 'SCCs with US processors + supplementary measures (encryption, jurisdictional argument)', points: 1 },
      { label: 'Adequacy decision (UK, Switzerland, etc.) for the specific processors that are outside the EEA', points: 2 },
      { label: 'No transfers — every processor in our RoPA is inside the EEA', points: 3 },
    ],
    eurobaseCovers:
      'Every Eurobase sub-processor is inside the EEA (France, Denmark, Netherlands). No Chapter V transfer mechanism is needed for the platform itself — a substantial simplification vs the SCC + supplementary-measure workload that a US-provider stack imposes.',
  },
  {
    id: 'dpia',
    category: 'Article 35 — DPIA',
    question: 'For processing likely to result in high risk to data subjects, do you have a Data Protection Impact Assessment on file?',
    helper: 'Article 35 triggers when processing is systematic, large-scale, includes sensitive data, or uses new tech. Most B2C apps meet at least one trigger.',
    options: [
      { label: 'No DPIA today', points: 0 },
      { label: 'A DPIA exists but is not linked to the specific processing operations', points: 1 },
      { label: 'A DPIA per high-risk processing operation, reviewed annually', points: 3 },
    ],
    eurobaseCovers:
      'The Eurobase DPA download bundles a DPIA template pre-populated with our sub-processor list, security measures, and residency attestations — the parts of a DPIA that describe *our* processing. Your DPIA covers your own controller-side processing; the platform-side content is provided so you\'re not writing it from a blank page.',
    learnMoreHref: '/legal',
    learnMoreLabel: 'DPIA template',
  },
  {
    id: 'key-sovereignty',
    category: 'Encryption key sovereignty',
    question: 'Who controls the encryption key that would let a third party decrypt your data at rest?',
    helper: 'If your provider holds the KEK and their jurisdiction can compel its use, the encryption does not add jurisdictional protection.',
    options: [
      { label: 'The provider — we don\'t control the key', points: 0 },
      { label: 'The provider, but they publish an "envelope encryption" model with a per-tenant DEK', points: 1 },
      { label: 'We do — Bring-Your-Own-Key with a KMS we control', points: 3 },
    ],
    eurobaseCovers:
      'Eurobase Vault today uses per-tenant AES-256-GCM keys held in Scaleway KMS (an EU-owned KMS). Full BYOK against a customer-controlled Scaleway Key Manager key is on the roadmap for Team / Legal Team customers with strict regulator-mandated key sovereignty — see the SOC 2 / Legal Team documentation for the current shape and the roadmap.',
    learnMoreHref: '/legal',
    learnMoreLabel: 'Legal Team tier',
  },
]

export function scoreBand(total: number): {
  band: 'high-risk' | 'partial' | 'good'
  title: string
  summary: string
} {
  if (total <= 14) {
    return {
      band: 'high-risk',
      title: 'High risk',
      summary:
        'Multiple GDPR obligations are currently being handled manually or not at all. In a supervisory-authority audit or a DSAR-heavy quarter, this posture is likely to cost engineering time and legal exposure. The good news: most of the gaps below can be closed by moving the plumbing to a platform that ships them by default.',
    }
  }
  if (total <= 22) {
    return {
      band: 'partial',
      title: 'Partial coverage',
      summary:
        'You have the foundational compliance work in place (DPA, some residency, some audit) but several obligations are still landing as one-off engineering tickets when they should be automated. The specific gaps below are the highest-leverage things to close — each saves DPO or engineering time on every incident, not just the current one.',
    }
  }
  return {
    band: 'good',
    title: 'Good posture',
    summary:
      'Your GDPR posture is strong. The specific items flagged below are areas where you could still tighten — often the difference between "we could satisfy an audit" and "the audit is a formality" is the audit-log tamper-evidence and the automated Article 30 report. If you\'re building on a US-headquartered provider today, the residency / jurisdiction split is worth a separate look regardless of your score.',
  }
}
