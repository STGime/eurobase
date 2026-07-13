<script setup lang="ts">
import { legalStrings as ls } from '@/data/legalStrings'
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl md:text-4xl font-bold text-text-white mb-2 font-heading">Terms &amp; Conditions</h1>
      <p class="text-text-muted text-sm mb-8">Version {{ ls.documentVersion }} — effective {{ ls.effectiveDate }}</p>

      <div class="space-y-8 text-text-light text-sm leading-relaxed">
        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">1. Scope &amp; Provider</h2>
          <p>
            These Terms &amp; Conditions ("Terms") govern your use of the Eurobase website at eurobase.app (the "Website") and the Eurobase backend-as-a-service platform (the "Service"), operated by:
          </p>
          <p class="mt-3">
            {{ ls.legalEntity }}<br />
            {{ ls.registeredAddress }}<br />
            Registry number: {{ ls.registryNumber }}<br />
            VAT: {{ ls.vatNumber }}<br />
            E-Mail: <a :href="`mailto:${ls.supportEmail}`" class="text-accent-blue hover:underline">{{ ls.supportEmail }}</a>
          </p>
          <p class="mt-3">
            By accessing the Website or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Website or Service.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">2. Service Description</h2>
          <p>
            Eurobase provides a European-native backend-as-a-service platform offering authentication, managed PostgreSQL databases, object storage, realtime data subscriptions, and serverless functions. The Service is hosted exclusively on European infrastructure under EU jurisdiction.
          </p>
          <p class="mt-3">
            The Service is currently in public beta. Access is open, but features, availability, and specifications are subject to change during this phase.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">3. Public Beta</h2>
          <p>
            The Service is offered as a public beta. By using it, you acknowledge that:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>The Service is provided "as is" during the beta phase.</li>
            <li>Features may be incomplete, changed, or removed without notice.</li>
            <li>Data stored during beta may not be preserved for the general release; the general-availability launch may require a fresh Project.</li>
            <li>No uptime guarantees or SLAs apply during beta.</li>
            <li>We may reset, downgrade, or migrate any Project as part of platform preparation for general availability, with at least 14 days' notice before a reset that affects Customer Data. Export tooling remains available throughout that window.</li>
            <li>We may limit, suspend, or terminate beta access at any time.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">4. User Accounts</h2>
          <p>
            To use the Service, you must create an account with accurate and complete information. You are responsible for:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>
          <p class="mt-3">
            We reserve the right to suspend or terminate accounts that violate these Terms or are used for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">5. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Distribute malware, spam, or harmful content</li>
            <li>Attempt to gain unauthorized access to systems or data</li>
            <li>Interfere with the integrity or performance of the Service</li>
            <li>Use the Service for cryptocurrency mining without prior authorization</li>
            <li>Store or process data in violation of GDPR or other applicable data protection laws</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">6. Data Ownership &amp; Processing</h2>
          <p>
            You retain full ownership of all data you store on the Eurobase platform ("Customer Data"). We do not access, use, or share your Customer Data except as necessary to provide the Service, as required by law, or as described in our Privacy Policy.
          </p>
          <p class="mt-3">
            Where we process personal data on your behalf, we act as a data processor under GDPR Article 28. A Data Processing Agreement (DPA) applies whenever you process personal data via the Service. The current DPA is available on request from <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a>; a self-service copy will be published at /dpa alongside the general-availability launch.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">7. Data Sovereignty</h2>
          <p>
            All Customer Data is stored and processed exclusively within the European Economic Area (EEA) on infrastructure operated by EU-owned providers. We do not transfer Customer Data to non-EU jurisdictions in the ordinary course of providing the Service.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">8. Pricing &amp; Payment</h2>
          <p>
            The Service is offered in multiple tiers as described on our pricing page. All prices are stated in Euros (EUR) and are exclusive of applicable value-added tax (VAT) unless stated otherwise.
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Free tier: no payment required; subject to usage limits and idle-pause after 30 days without activity.</li>
            <li>Paid tiers: billed monthly or annually; payment due in advance.</li>
            <li>Usage overages are billed at the rates published on the pricing page.</li>
            <li>We reserve the right to change pricing with 30 days' written notice.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">9. Availability &amp; Support</h2>
          <p>
            We aim to maintain high availability for the Service but do not guarantee uninterrupted access. Planned maintenance will be announced in advance where possible. Service Level Agreements (SLAs) are available for higher tiers as those launch.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">10. Intellectual Property</h2>
          <p>
            The Eurobase platform, including its software, design, documentation, and trademarks, is the intellectual property of Eurobase. You may not copy, modify, distribute, or reverse-engineer any part of the Service without our prior written consent.
          </p>
          <p class="mt-3">
            You retain all intellectual property rights in your Customer Data and any applications you build using the Service.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Eurobase shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, profits, or business opportunities, arising from your use of or inability to use the Service.
          </p>
          <p class="mt-3">
            Our total aggregate liability for any claims arising under these Terms shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">12. Termination</h2>
          <p>
            Either party may terminate this agreement at any time. Upon termination:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>You may export your Customer Data for 30 days following termination.</li>
            <li>After the 30-day export period, your Customer Data will be permanently deleted.</li>
            <li>Any outstanding payments remain due.</li>
          </ul>
          <p class="mt-3">
            We may terminate or suspend your access immediately if you violate these Terms.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">13. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms are governed by the law of {{ ls.governingLaw }}. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the {{ ls.courtOfJurisdiction }}.
          </p>
          <p class="mt-3">
            For consumers within the EU, mandatory consumer protection provisions of your country of residence shall apply where they provide greater protection. Consumers may also use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">https://ec.europa.eu/consumers/odr</a>.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">14. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Material changes will be communicated via email or a notice on the Website at least 30 days before they take effect. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">15. Contact</h2>
          <p>
            For questions about these Terms, contact us at:
          </p>
          <p class="mt-3">
            {{ ls.legalEntity }}<br />
            {{ ls.registeredAddress }}<br />
            E-Mail: <a :href="`mailto:${ls.supportEmail}`" class="text-accent-blue hover:underline">{{ ls.supportEmail }}</a><br />
            Data protection: <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a>
          </p>
        </section>
      </div>
    </article>
  </main>
</template>
