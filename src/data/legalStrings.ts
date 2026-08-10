// Central config for legal-page rendering: entity strings, jurisdiction,
// version. Phase A of the public-beta launch plan (see the euroback
// docs/public-beta-launch-plan.md).
//
// Estonia formation completed 2026-07 — the entity is Eurobase OÜ,
// registered at Ahtri 12, Tallinn (E-Residency Hub as local contact
// person, as required for Estonian e-residency companies without a
// resident board member). Registry code lands in a follow-up commit
// once the Äriregister issues it (few days after registration filing).
//
// The jurisdiction / court fields are NOT parameterised — those are
// locked by the choice to incorporate in Estonia.

export interface LegalStrings {
  /** Legal entity name (Estonian OÜ). */
  legalEntity: string
  /** Type of legal entity — private limited company (OÜ). */
  entityType: string
  /** Registered address of the entity (street, city + postal). */
  registeredAddress: string
  /** Estonian commercial-register code (äriregistri kood). */
  registryNumber: string
  /** EU VAT identification number, or a plain-language marker when the
   *  entity is not VAT-registered (e.g. under the Estonian €40k
   *  threshold). */
  vatNumber: string
  /** ISO date effective for the current v2 documents. */
  effectiveDate: string
  /** Locked: Estonia. */
  governingLaw: string
  /** Locked: Harju County Court in Tallinn (Harju Maakohus). */
  courtOfJurisdiction: string
  /** Documents version tag rendered in headers. */
  documentVersion: string
  /** Contact addresses referenced from the pages. */
  supportEmail: string
  noticesEmail: string
  withdrawalEmail: string
  dpoEmail: string
  securityEmail: string
  /** Estonian-law transparency additions (ISTS §4 / good-practice for
   *  e-residency companies). Not strictly required by ISTS but read as
   *  a positive signal by B2B contract reviewers. */
  principalActivity: string
  shareCapital: string
  financialYear: string
  /** Local contact person — required for OÜs whose board members are
   *  not Estonian residents (Estonian Commercial Code §631). */
  contactPerson: string
}

export const legalStrings: LegalStrings = {
  legalEntity: 'Eurobase OÜ',
  entityType: 'Private limited company (osaühing / OÜ)',
  registeredAddress: 'Ahtri 12, Tallinn 15551',
  // Estonian commercial-register code (äriregistri kood), issued by
  // Tartu Maakohus registriosakond. Certified extract nr 5529927 on
  // file. First entry (esmakanne) 2026-07-22.
  registryNumber: '17557586',
  // Eurobase OÜ is below the Estonian VAT threshold (€40,000
  // taxable turnover). It will register for VAT once turnover
  // approaches the threshold; until then this reads as a plain
  // statement rather than a placeholder.
  vatNumber: 'Not VAT-registered (below Estonian €40,000 threshold)',
  // v2 documents came into effect the same day the Estonian entity
  // was registered — one clean anchor point for auditors reviewing
  // consent + governing-law shift.
  effectiveDate: '22 July 2026',

  // Locked by jurisdiction choice — do not parameterise.
  governingLaw: 'the Republic of Estonia',
  courtOfJurisdiction: 'Harju County Court (Harju Maakohus), Tallinn',
  documentVersion: '2.0',

  supportEmail: 'contact@eurobase.app',
  noticesEmail: 'contact@eurobase.app',
  withdrawalEmail: 'contact@eurobase.app',
  // DPO stays on its own address so subject-rights + breach-notice
  // channels are separately monitored from general contact.
  dpoEmail: 'dpo@eurobase.app',
  // Coordinated Vulnerability Disclosure entry point (RFC 9116) —
  // monitored on the same schedule as dpo@; keep independent so
  // security researchers land in a triage queue.
  securityEmail: 'security@eurobase.app',

  principalActivity: 'Software as a Service (SaaS) provider',
  shareCapital: '€1',
  financialYear: '1 January – 31 December',
  contactPerson: 'E-Residency Hub OÜ',
}

// Central source for the versioned-legal-docs base URL. Derived
// from `documentVersion` so a bump to v3 flips every consumer at
// once — SecurityPage's German legal-tech dossier links, any
// future page that references the same doc set, and the blog
// posts that link a specific doc. Reduces the ~22× hardcoded
// STGime/euroback/.../v2/ occurrences to one edit-point.
//
// If the docs ever move off GitHub (e.g. onto a first-party
// /security/docs/ route to avoid the sovereignty-optics of a
// US-owned canonical home for compliance docs), only this const
// needs to change.
export const legalDocsBase = `https://github.com/STGime/euroback/blob/main/docs/legal/v${legalStrings.documentVersion.split('.')[0]}`

// Shape for a single dossier document. Rendered by SecurityPage
// as a hyperlink + one-line note in a `<li v-for>` loop.
export interface LegalDoc {
  label: string
  slug: string
  note: string
}

// German legal-tech dossier + the two Legal-Team-tier backing
// docs. Single source of truth — the SecurityPage lists derive
// their count from `.length`, so a doc added or removed can't
// silently disagree with the surrounding prose ("the five
// documents…").
export const germanLegalTechDocs = {
  dossier: [
    { label: 'BSI C5 roadmap', slug: 'bsi-c5-roadmap.md',
      note: 'target Type-1 attestation 12 months post-launch, phase plan + assessor shortlist.' },
    { label: 'ISO 27001 — Statement of Applicability (draft)', slug: 'iso-27001-soa.md',
      note: '2022 Annex A control coverage, path to certificate.' },
    { label: 'BSI IT-Grundschutz self-declaration', slug: 'grundschutz-self-declaration.md',
      note: 'Basis-Absicherung profile for SME, self-attested until formal ISO 27001.' },
    { label: 'NIS-2 positioning', slug: 'nis2-positioning.md',
      note: 'below employee/revenue thresholds today; voluntary compliance to cascaded obligations; commitment to register on crossing.' },
    { label: 'AI Act positioning', slug: 'ai-act-positioning.md',
      note: 'Eurobase is infrastructure, not an AI system; Customer is the deployer for any high-risk build.' },
  ] as LegalDoc[],
  backing: [
    { label: 'Legal-tech DPA addendum', slug: 'de-legal-tech-addendum.md',
      note: '§203 StGB / §43e BRAO staff-secrecy, §50 BRAO / §257 HGB / §147 AO retention holds, GoBD export.' },
    { label: 'GoBD Verfahrensdokumentation', slug: 'de-gobd-verfahrensdokumentation.md',
      note: 'the process documentation §146 AO expects.' },
  ] as LegalDoc[],
  // Also rendered in the blog post at content.ts (de-legal-tech-
  // backend). Sourced from here to prevent the two prose lists
  // from drifting apart when scope changes (e.g. TR-ESOR moves
  // from non-goal to integration).
  nonGoals: [
    { label: 'beA integration',
      detail: 'application-side (the Anwaltssoftware layer). Not the backend’s concern.' },
    { label: 'TR-ESOR (BSI TR-03125)',
      detail: 'the archive-format standard for long-term signed documents. Customers plug in ArchiSafe/Governikus; Eurobase integrates but does not replace them.' },
    { label: 'DATEV / ELSTER submission',
      detail: 'application-side (the accounting/tax software layer).' },
    { label: 'Actual BSI C5 or ISO 27001 certification',
      detail: 'post-beta. The roadmaps above commit to dated milestones.' },
  ],
}
