<script setup lang="ts">
// Estonian Information Society Services Act (Infoühiskonna teenuse
// seadus, ISTS) §4 requires an EU service provider to make the
// following information "easily, directly and permanently accessible"
// to recipients of the service:
//
//   - Name of the service provider
//   - Postal address of its registered seat
//   - E-mail contact
//   - Estonian commercial-register code (äriregistri kood)
//   - VAT identification number where VAT-registered
//   - Supervisory authority + membership details for regulated
//     professions (n/a for us)
//   - Prices, unambiguously (handled on /pricing)
//
// This page is the Estonian-law equivalent of the German Impressum
// we used to publish (the entity is no longer German). English-only:
// the OÜ operates cross-border in English, and none of the German-
// jurisdiction disclosures (TMG §5, RStV §55, VSBG) apply anymore.
import { legalStrings as ls } from '@/data/legalStrings'
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl md:text-4xl font-bold text-text-white mb-8 font-heading">Legal notice</h1>
      <p class="text-text-muted text-sm mb-8">
        Company information published under Estonian Information Society Services Act
        (<em>Infoühiskonna teenuse seadus</em>) §4 and the general E-Commerce Directive
        (2000/31/EC) transparency requirements.
      </p>

      <div class="prose-legal space-y-6 text-text-light text-sm leading-relaxed">
        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Company details</h2>
          <dl class="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-y-1.5 sm:gap-x-6">
            <dt class="text-text-muted">Company name</dt>
            <dd class="text-text-white">{{ ls.legalEntity }}</dd>

            <dt class="text-text-muted">Type of company</dt>
            <dd>{{ ls.entityType }}</dd>

            <dt class="text-text-muted">Principal activity</dt>
            <dd>{{ ls.principalActivity }}</dd>

            <dt class="text-text-muted">Registered address</dt>
            <dd>{{ ls.registeredAddress }}, Estonia</dd>

            <dt class="text-text-muted">Registry code</dt>
            <dd><em class="not-italic text-text-muted">(Estonian commercial register / äriregistri kood)</em> {{ ls.registryNumber }}</dd>

            <dt class="text-text-muted">VAT number</dt>
            <dd>{{ ls.vatNumber }}</dd>

            <dt class="text-text-muted">Share capital</dt>
            <dd>{{ ls.shareCapital }}</dd>

            <dt class="text-text-muted">Financial year</dt>
            <dd>{{ ls.financialYear }}</dd>

            <dt class="text-text-muted">Local contact person</dt>
            <dd>{{ ls.contactPerson }} <span class="text-text-muted">(Estonian Commercial Code §63<sup>1</sup>)</span></dd>
          </dl>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Contact</h2>
          <p>
            General inquiries: <a :href="`mailto:${ls.supportEmail}`" class="text-accent-blue hover:underline">{{ ls.supportEmail }}</a><br />
            Data protection: <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a><br />
            Formal notices: <a :href="`mailto:${ls.noticesEmail}`" class="text-accent-blue hover:underline">{{ ls.noticesEmail }}</a>
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Responsible for the content</h2>
          <p>
            {{ ls.legalEntity }}, at the address above, acting through its board members
            as listed in the Estonian commercial register.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Governing law &amp; jurisdiction</h2>
          <p>
            The operation of this website and the services offered through it are governed by
            the laws of {{ ls.governingLaw }}. Disputes arising out of the service that cannot
            be resolved amicably fall under the exclusive jurisdiction of the
            {{ ls.courtOfJurisdiction }}, without prejudice to the mandatory consumer-protection
            rules of the user's country of residence within the EEA.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Online dispute resolution</h2>
          <p>
            The European Commission provides an Online Dispute Resolution (ODR) platform available at
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">https://ec.europa.eu/consumers/odr/</a>.
            Our contact email is listed above.
          </p>
          <p class="mt-3">
            {{ ls.legalEntity }} is not obliged to, and does not voluntarily participate in,
            alternative dispute-resolution proceedings before a consumer-arbitration board.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Liability for content</h2>
          <p>
            The content of this website is provided by {{ ls.legalEntity }} to the best of our
            knowledge and belief. We assume no liability for the correctness, completeness, or
            topicality of the content, except where required by mandatory law. As an information
            society service provider under Estonian ISTS §§8–11 (transposing Directive 2000/31/EC),
            we are responsible for our own content under general law but are not obliged to
            monitor transmitted or stored third-party information.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Liability for external links</h2>
          <p>
            This website contains links to external third-party websites, whose content we cannot
            control. Responsibility for the content of linked pages rests solely with their
            respective operators. Linked pages were reviewed for possible legal infringements at
            the time of linking; no unlawful content was identifiable. Upon becoming aware of any
            legal infringement, we will remove the link without delay.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Copyright</h2>
          <p>
            The content on this site is subject to the copyright laws of Estonia and applicable
            EU law. Reproduction, adaptation, distribution, or any form of exploitation outside
            the limits of copyright law requires the prior written consent of {{ ls.legalEntity }}
            (or the respective third-party rights-holder for content marked as such). Downloads
            and copies of this site are permitted only for private, non-commercial use.
          </p>
        </section>
      </div>
    </article>
  </main>
</template>
