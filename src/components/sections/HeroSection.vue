<script setup lang="ts">
import { hero } from '@/data/content'
import HeroGlobe from '@/components/HeroGlobe.vue'
</script>

<template>
  <!-- Dropped `min-h-screen flex items-center` — was reserving a full viewport and
       vertically centering content, which left large dark padding between the CTA row
       and the next section on tall displays. Inner div's py-32 keeps the hero visually
       generous without wasting viewport. -->
  <section id="hero" aria-labelledby="hero-heading" class="relative overflow-hidden bg-paper">
    <!-- Light ground + a faint amber radial wash behind the globe column.
         Replaces the dark navy gradient + hero-network.webp underlay of
         the pre-Daylight design. -->
    <div class="absolute inset-0 bg-paper" />
    <div class="absolute inset-0" style="background: radial-gradient(640px 360px at 82% 12%, rgba(255, 179, 0, 0.10), transparent 65%)" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <!--
            Product Hunt — live-launch featured badge. Swapped in on
            2026-08-26 (launch day) from the pre-launch "get notified"
            pill. The badge points at the product page with PH's own
            badge-attribution UTM string, so upvote flows attribute
            back to this placement in PH's dashboard.
          -->
          <a
            href="https://www.producthunt.com/products/eurobase?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-eurobase"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mb-6"
          >
            <img
              alt="Eurobase - The Sovereign, GDPR-Native BaaS for Europe | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1191233&amp;theme=light&amp;t=1787728446785"
            />
          </a>

          <!-- Positioning eyebrow — the fear before the fix. Replaces
               the earlier "EU-Native Backend-as-a-Service" line which
               was a feature statement, not a hook. What converts is a
               fear the buyer already half-knows plus a fix they can
               act on. Fear here, fix in the H1 + subheadline below.
               Same line permeates every marketing surface (comparison
               pages, blog canonical intros, /vs/*). Say it a hundred
               times. -->
          <p class="text-amber-ink font-semibold text-sm mb-4">
            Firebase / Supabase EU region is not GDPR-safe
          </p>
          <h1 id="hero-heading" class="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-6 font-heading">
            {{ hero.headline }}
          </h1>
          <p class="text-lg text-slate leading-relaxed mb-4">
            {{ hero.subheadline }}
          </p>
          <p class="text-amber-ink font-medium mb-6">
            {{ hero.tagline }}
          </p>
          <!-- Hero "what's actually new" pill. DSAR is no longer the
               new thing — it now lives in the differentiators grid
               (card 3, right after Zero-DevOps). This slot promotes
               the current shipment: the Legal Team tier for German
               legal-tech, in closed beta. Points at the dossier
               section on /security so the click resolves to the
               dated, evidence-backed page rather than the marketing
               pricing block. -->
          <p class="mb-8">
            <RouterLink
              to="/security#de-legaltech"
              class="inline-flex items-center gap-2 text-sm font-semibold text-ink bg-green-ink/5 hover:bg-green-ink/10 border border-green-ink/30 rounded-full px-4 py-2 transition-colors"
            >
              <span class="text-green-ink">New</span>
              <span class="text-slate">·</span>
              <span>Legal Team tier — §50 BRAO / §257 HGB / §147 AO retention, closed beta for German legal-tech.</span>
              <span class="text-green-ink">→</span>
            </RouterLink>
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="https://console.eurobase.app/login?signup=1"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-amber text-ink hover:bg-amber-hover shadow-lg shadow-amber/30"
            >
              {{ hero.primaryCta }}
            </a>
          </div>
          <!-- Secondary links to the two free lead-gen tools. Positioned
               below the primary CTA (not competing with the "Sign up
               free" button) but visible above the fold — the whole point
               of a lead-gen tool is that undecided visitors see it early,
               not that they find it in the footer. /sovereignty-check
               (vendor-level CLOUD Act audit, 60 seconds) and
               /gdpr-readiness (backend-level 10-question quiz, 3 minutes)
               answer the two adjacent questions that come up before a
               procurement conversation, so they sit next to each other. -->
          <p class="mt-4 text-sm text-slate">
            Not ready to sign up? Try a free check first:
            <RouterLink
              to="/sovereignty-check"
              class="text-amber-ink hover:text-ink font-medium underline underline-offset-4 decoration-amber/60 hover:decoration-amber transition-colors"
            >
              Which of your vendors can a US authority legally reach?
            </RouterLink>
            (60 seconds), or
            <RouterLink
              to="/gdpr-readiness"
              class="text-amber-ink hover:text-ink font-medium underline underline-offset-4 decoration-amber/60 hover:decoration-amber transition-colors"
            >
              score your backend's GDPR exposure
            </RouterLink>
            (3 minutes, 10 questions). No email required either way.
          </p>
        </div>

        <div class="hidden lg:flex justify-center">
          <!-- Wrapper positions the seven feature chips around the globe
               (Auth / Database / Storage / Realtime / Functions /
               Logging / Dashboard). Chips sit on the same 420px stage
               as the canvas but at percentages that keep them clear of
               the sphere so the globe's amber Europe glow reads. -->
          <div class="relative w-[420px] h-[420px] max-w-full">
            <HeroGlobe />
            <!-- 0° top -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="top: -6%; left: 50%; transform: translateX(-50%)">Auth</div>
            <!-- ~51° -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="top: 12%; right: -8%">Database</div>
            <!-- ~103° -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="top: 50%; right: -14%; transform: translateY(-50%)">Storage</div>
            <!-- ~154° -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="bottom: 6%; right: -4%">Realtime</div>
            <!-- ~206° -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="bottom: 6%; left: -4%">Functions</div>
            <!-- ~257° -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="top: 50%; left: -14%; transform: translateY(-50%)">Logging</div>
            <!-- ~309° -->
            <div class="absolute px-2.5 py-1 bg-paper rounded-full border border-line shadow-sm text-[11px] font-medium text-ink whitespace-nowrap" style="top: 12%; left: -8%">Dashboard</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gold accent line at top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-amber" />
  </section>
</template>
