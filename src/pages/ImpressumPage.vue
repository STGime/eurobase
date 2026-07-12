<script setup lang="ts">
// Impressum-equivalent for an Estonian OÜ. Estonia doesn't require a
// German-style TMG-mandated Impressum, but many EU visitors expect
// this page at /impressum and we want the German-speaking audience to
// find it. We keep the German-language conventions where they still
// apply (headings, dispute-resolution note) and drop the TMG/RStV
// citations since we're not established in Germany.
import { legalStrings as ls } from '@/data/legalStrings'
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl md:text-4xl font-bold text-text-white mb-8 font-heading">Impressum / Legal notice</h1>

      <div class="prose-legal space-y-6 text-text-light text-sm leading-relaxed">
        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Company details</h2>
          <p>
            {{ ls.legalEntity }}<br />
            {{ ls.registeredAddress }}<br />
            Estonia
          </p>
          <p class="mt-3">
            Estonian commercial register (Äriregister) code: {{ ls.registryNumber }}<br />
            EU VAT: {{ ls.vatNumber }}
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Contact</h2>
          <p>
            E-Mail: <a :href="`mailto:${ls.supportEmail}`" class="text-accent-blue hover:underline">{{ ls.supportEmail }}</a><br />
            Data protection: <a :href="`mailto:${ls.dpoEmail}`" class="text-accent-blue hover:underline">{{ ls.dpoEmail }}</a>
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Responsible for the content</h2>
          <p>
            {{ ls.legalEntity }}<br />
            {{ ls.registeredAddress }}
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">EU-Streitschlichtung / EU Online Dispute Resolution</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit /
            The European Commission provides an Online Dispute Resolution platform:
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-accent-blue hover:underline">https://ec.europa.eu/consumers/odr/</a>.
          </p>
          <p>Our email address is listed above.</p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Consumer dispute resolution</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            We are not obliged, nor do we voluntarily participate, in alternative dispute-resolution proceedings before a consumer arbitration board.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Liability for content</h2>
          <p>
            The content of this website is provided by {{ ls.legalEntity }} to the best of our knowledge and belief. We assume no liability for the correctness, completeness, or topicality of the content, except where required by mandatory law. As a service provider, we are responsible for our own content under general law but are not obliged under Estonian law implementing Directive 2000/31/EC to monitor transmitted or stored third-party information.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Liability for links</h2>
          <p>
            Our offering contains links to external third-party websites, whose content we cannot control. We therefore cannot assume any liability for that external content. Responsibility for the content of linked pages rests solely with their respective operators. The linked pages were reviewed for possible legal infringements at the time of linking; no unlawful content was identifiable at that time. Permanent content monitoring of the linked pages is not reasonable without specific evidence of a legal infringement. Upon becoming aware of any legal infringements, we will remove such links without delay.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-text-white mb-3 font-heading">Copyright</h2>
          <p>
            The content on this site is subject to the copyright laws of Estonia and applicable EU law. Reproduction, adaptation, distribution, or any form of exploitation outside the limits of copyright law requires the written consent of the respective author or creator. Downloads and copies of this site are permitted only for private, non-commercial use.
          </p>
        </section>
      </div>
    </article>
  </main>
</template>
