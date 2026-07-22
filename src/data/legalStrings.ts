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

  principalActivity: 'Software as a Service (SaaS) provider',
  shareCapital: '€1',
  financialYear: '1 January – 31 December',
  contactPerson: 'E-Residency Hub OÜ',
}
