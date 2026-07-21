<script setup lang="ts">
import { ref } from 'vue'
import { hero } from '@/data/content'
import CtaButton from '@/components/ui/CtaButton.vue'
import WaitingListModal from '@/components/WaitingListModal.vue'
import HeroGlobe from '@/components/HeroGlobe.vue'
import heroImage from '@/assets/images/hero-network.webp'

const showModal = ref(false)
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
          <p class="mb-8 animate-fade-in-up stagger-3">
            <a
              href="#automated-dsar"
              class="inline-flex items-center gap-2 text-sm font-semibold text-text-white bg-accent-purple/15 hover:bg-accent-purple/25 border border-accent-purple/40 rounded-full px-4 py-2 transition-colors"
            >
              <span class="text-accent-gold">New</span>
              <span class="text-text-light">·</span>
              <span>One-click GDPR DSAR exports — built in, audit-trailed, EU-only.</span>
              <span class="text-accent-gold">→</span>
            </a>
          </p>
          <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
            <button
              class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25"
              @click="showModal = true"
            >
              {{ hero.primaryCta }}
            </button>
          </div>
        </div>

        <div class="hidden lg:flex justify-center">
          <HeroGlobe />
        </div>
      </div>
    </div>

    <!-- Gold accent line at top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-accent-gold" />

    <WaitingListModal :open="showModal" source="hero" @close="showModal = false" />
  </section>
</template>
