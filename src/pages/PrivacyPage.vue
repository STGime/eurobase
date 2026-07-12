<script setup lang="ts">
import { legalStrings as ls } from '@/data/legalStrings'
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl md:text-4xl font-bold text-text-white mb-2 font-heading">Privacy Policy</h1>
      <p class="text-text-muted text-sm mb-8">Version {{ ls.documentVersion }} — effective {{ ls.effectiveDate }}</p>

      <div class="space-y-8 text-text-light text-sm leading-relaxed">
        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">1. Introduction</h2>
          <p>
            Eurobase ("we", "us", or "our") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website at eurobase.app (the "Website") or use our backend-as-a-service platform (the "Service").
          </p>
          <p class="mt-3">
            As a European-operated platform, we are fully committed to compliance with the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679) and other applicable European data protection laws.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">2. Data Controller</h2>
          <p>
            The data controller responsible for the processing of your personal data is:
          </p>
          <p class="mt-3">
            {{ ls.legalEntity }}<br />
            {{ ls.registeredAddress }}<br />
            Registry number: {{ ls.registryNumber }}<br />
            VAT: {{ ls.vatNumber }}<br />
            E-Mail: <a :href="`mailto:${ls.supportEmail}`" class="text-accent-blue hover:underline">{{ ls.supportEmail }}</a><br />
            Data Protection Officer: <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a>
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">3. Data We Collect</h2>
          <h3 class="text-text-white font-semibold mt-4 mb-2">3.1 Website Visitors</h3>
          <p>When you visit our Website, we may collect:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>IP address (anonymized where possible)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referral source and page visit history</li>
            <li>Date and time of access</li>
          </ul>

          <h3 class="text-text-white font-semibold mt-4 mb-2">3.2 Signup</h3>
          <p>When you create an account, we collect:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Email address</li>
            <li>Password (stored only as a bcrypt hash)</li>
            <li>Timestamp, IP address, and User-Agent of your click-through acceptance of the Terms and DPA (recorded to the <code>legal_acceptances</code> table for the audit trail required under GDPR Article 7)</li>
          </ul>

          <h3 class="text-text-white font-semibold mt-4 mb-2">3.3 Platform Users</h3>
          <p>When you use the Eurobase Service, we additionally process:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Account information (display name, organisation, if provided)</li>
            <li>Session tokens issued on sign-in</li>
            <li>Usage data and service logs (retained per the retention schedule below)</li>
            <li>Billing information — processed by Mollie B.V. (Netherlands, EU) once paid tiers are active</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">4. Legal Basis for Processing</h2>
          <p>We process your personal data based on the following legal grounds under GDPR Article 6:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li><strong class="text-text-light">Consent (Art. 6(1)(a)):</strong> For marketing communications, the onboarding email drip, and any optional analytics.</li>
            <li><strong class="text-text-light">Contractual necessity (Art. 6(1)(b)):</strong> To provide the Service you requested.</li>
            <li><strong class="text-text-light">Legitimate interest (Art. 6(1)(f)):</strong> For platform security, fraud prevention, and service improvement.</li>
            <li><strong class="text-text-light">Legal obligation (Art. 6(1)(c)):</strong> To comply with applicable tax and commercial laws under Estonian and EU law.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">5. Data Storage &amp; Sovereignty</h2>
          <p>
            All personal data is stored exclusively on European infrastructure operated by EU-owned providers. We do not transfer personal data to countries outside the European Economic Area (EEA) in the ordinary course of providing the Service. Our infrastructure providers (Scaleway, France) are selected specifically to ensure EU-only data residency.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">6. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary for the purposes outlined in this policy. Specifically:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Website access logs: 90 days</li>
            <li>Waitlist entries: until the public launch or until you request deletion</li>
            <li>Account data: for the duration of your account plus 30 days after deletion</li>
            <li>Billing data: as required by Estonian commercial and tax law (up to 7 years for accounting records)</li>
            <li>Legal-acceptance audit rows: 6 years, matching the GDPR Article 7 evidence window</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">7. Your Rights</h2>
          <p>Under the GDPR, you have the following rights regarding your personal data:</p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li><strong class="text-text-light">Right of access (Art. 15):</strong> Request a copy of your personal data</li>
            <li><strong class="text-text-light">Right to rectification (Art. 16):</strong> Correct inaccurate personal data</li>
            <li><strong class="text-text-light">Right to erasure (Art. 17):</strong> Request deletion of your personal data</li>
            <li><strong class="text-text-light">Right to restrict processing (Art. 18):</strong> Limit how we use your data</li>
            <li><strong class="text-text-light">Right to data portability (Art. 20):</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong class="text-text-light">Right to object (Art. 21):</strong> Object to processing based on legitimate interest</li>
            <li><strong class="text-text-light">Right to withdraw consent (Art. 7(3)):</strong> Withdraw consent at any time without affecting prior processing</li>
          </ul>
          <p class="mt-3">
            To exercise any of these rights, contact <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a>. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">8. Cookies</h2>
          <p>
            Our Website uses only technically necessary cookies to ensure proper functionality. We do not use tracking cookies, advertising cookies, or third-party analytics tools that process personal data outside the EU. If we introduce optional cookies in the future, we will obtain your explicit consent before setting them.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">9. Sub-processors</h2>
          <p>
            We use the following sub-processors, all of which are EU-based or contractually bound by EU-adequate transfer mechanisms:
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1 text-text-muted">
            <li>Scaleway SAS (France) — hosting, storage, transactional email, compute, Redis</li>
            <li>Mollie B.V. (Netherlands) — billing (once paid tiers are active)</li>
            <li>Google LLC (US) and GitHub Inc. (US) — OAuth identity verification, only if you choose to sign in via those providers; covered by the EU-US Data Privacy Framework</li>
          </ul>
          <p class="mt-3">
            The current list is published at <a href="/sub-processors" class="text-accent-blue hover:underline">/sub-processors</a>. We notify existing customers 30 days before adding or replacing a sub-processor.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">10. Data Breach Notification</h2>
          <p>
            In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority within 72 hours and inform affected individuals without undue delay, in accordance with GDPR Articles 33 and 34.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">11. Supervisory Authority</h2>
          <p>
            You have the right to lodge a complaint with a data protection supervisory authority. Given our establishment in Estonia, the competent authority for us is:
          </p>
          <p class="mt-3">
            Andmekaitse Inspektsioon (Estonian Data Protection Inspectorate)<br />
            Tatari 39<br />
            10134 Tallinn, Estonia<br />
            <a href="https://www.aki.ee/en" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">www.aki.ee/en</a>
          </p>
          <p class="mt-3">
            You may also lodge a complaint with the supervisory authority in the EU Member State where you habitually reside.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by email at least 30 days before they take effect and by updating the version at the top of this page.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">13. Contact</h2>
          <p>
            For questions about this Privacy Policy or your personal data, contact us at:
          </p>
          <p class="mt-3">
            {{ ls.legalEntity }}<br />
            {{ ls.registeredAddress }}<br />
            General: <a :href="`mailto:${ls.supportEmail}`" class="text-accent-blue hover:underline">{{ ls.supportEmail }}</a><br />
            Data protection: <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a>
          </p>
        </section>
      </div>
    </article>
  </main>
</template>
