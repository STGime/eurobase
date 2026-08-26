<script setup lang="ts">
import { hero } from '@/data/content'
import HeroGlobe from '@/components/HeroGlobe.vue'
import heroImage from '@/assets/images/hero-network.webp'
</script>

<template>
  <section id="hero" aria-labelledby="hero-heading" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-navy via-navy to-accent-blue/10" />
    <img :src="heroImage" alt="Abstract network visualization representing European backend infrastructure" class="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-lighten" loading="eager" />
    <div class="absolute top-1/4 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
    <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />

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
            class="inline-block mb-6 animate-fade-in-up"
          >
            <img
              alt="Eurobase - The Sovereign BaaS for Europe | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1191233&amp;theme=light&amp;t=1787728446785"
            />
          </a>

          <p class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-in-up">
            🇪🇺 EU-Native Backend-as-a-Service
          </p>
          <h1 id="hero-heading" class="text-4xl md:text-5xl lg:text-6xl font-bold text-text-white leading-tight mb-6 font-heading animate-fade-in-up stagger-1">
            {{ hero.headline }}
          </h1>
          <p class="text-lg text-text-light leading-relaxed mb-4 animate-fade-in-up stagger-2">
            {{ hero.subheadline }}
          </p>
          <p class="text-accent-gold font-medium mb-6 animate-fade-in-up stagger-3">
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
          <p class="mb-8 animate-fade-in-up stagger-3">
            <RouterLink
              to="/security#de-legaltech"
              class="inline-flex items-center gap-2 text-sm font-semibold text-text-white bg-accent-green/15 hover:bg-accent-green/25 border border-accent-green/40 rounded-full px-4 py-2 transition-colors"
            >
              <span class="text-accent-green">New</span>
              <span class="text-text-light">·</span>
              <span>Legal Team tier — §50 BRAO / §257 HGB / §147 AO retention, closed beta for German legal-tech.</span>
              <span class="text-accent-green">→</span>
            </RouterLink>
          </p>
          <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
            <a
              href="https://console.eurobase.app/login?signup=1"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25"
            >
              {{ hero.primaryCta }}
            </a>
          </div>
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
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-yellow/30 text-[11px] text-accent-yellow whitespace-nowrap" style="top: -6%; left: 50%; transform: translateX(-50%)">🔐 Auth</div>
            <!-- ~51° -->
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-blue/30 text-[11px] text-accent-blue whitespace-nowrap" style="top: 12%; right: -8%">🗄️ Database</div>
            <!-- ~103° -->
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-green/30 text-[11px] text-accent-green whitespace-nowrap" style="top: 50%; right: -14%; transform: translateY(-50%)">📦 Storage</div>
            <!-- ~154° -->
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-purple/30 text-[11px] text-accent-purple whitespace-nowrap" style="bottom: 6%; right: -4%">🧩 Realtime</div>
            <!-- ~206° -->
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-orange/30 text-[11px] text-accent-orange whitespace-nowrap" style="bottom: 6%; left: -4%">🔧 Functions</div>
            <!-- ~257° -->
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-dark-red/30 text-[11px] text-accent-dark-red whitespace-nowrap" style="top: 50%; left: -14%; transform: translateY(-50%)">📜 Logging</div>
            <!-- ~309° -->
            <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-teal/30 text-[11px] text-accent-teal whitespace-nowrap" style="top: 12%; left: -8%">🖥️ Dashboard</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gold accent line at top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-accent-gold" />
  </section>
</template>
