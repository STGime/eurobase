// Central config for legal-page rendering: entity strings, jurisdiction,
// version. Phase A of the public-beta launch plan (see the euroback
// docs/public-beta-launch-plan.md).
//
// Company formation in Estonia is in flight. Until the registered
// entity name / address / registry number / VAT number are final, all
// four appear as placeholders on the rendered pages. That's a
// documented choice — the legal *shape* (Estonia jurisdiction, DPA v2,
// beta window) lands now; the entity-specific *strings* land in one
// follow-up commit once formation completes. Overriding is a matter of
// filling in the four TODO fields below and rebuilding.
//
// The jurisdiction / court fields are NOT placeholders — those are
// locked by the choice to incorporate in Estonia and don't change
// with the entity name.

export interface LegalStrings {
  /** Legal entity name — will be the Estonian OÜ once formation completes. */
  legalEntity: string
  /** Registered address of the entity. */
  registeredAddress: string
  /** Estonian commercial-register code (registry number). */
  registryNumber: string
  /** EU VAT ID once VAT-registered. */
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
}

export const legalStrings: LegalStrings = {
  // TODO(formation): fill these four in when the Estonian OÜ is
  // registered. Keep the {{…}} placeholder syntax so anything that
  // renders them mid-flight is visibly incomplete rather than silently
  // wrong.
  legalEntity: '{{LEGAL_ENTITY}}',
  registeredAddress: '{{REGISTERED_ADDRESS}}',
  registryNumber: '{{REGISTRY_NUMBER}}',
  vatNumber: '{{VAT_NUMBER}}',
  effectiveDate: '{{EFFECTIVE_DATE}}',

  // Locked by jurisdiction choice — do not parameterise.
  governingLaw: 'the Republic of Estonia',
  courtOfJurisdiction: 'Harju County Court (Harju Maakohus), Tallinn',
  documentVersion: '2.0',

  supportEmail: 'hello@eurobase.app',
  noticesEmail: 'hello@eurobase.app',
  withdrawalEmail: 'hello@eurobase.app',
  dpoEmail: 'dpo@eurobase.app',
}
