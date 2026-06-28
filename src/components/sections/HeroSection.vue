<script setup lang="ts">
import { ref } from 'vue'
import { hero } from '@/data/content'
import CtaButton from '@/components/ui/CtaButton.vue'
import WaitingListModal from '@/components/WaitingListModal.vue'
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
          <div class="relative animate-float">
            <div class="w-[360px] h-[360px] relative">
              <!-- Outer ring -->
              <div class="absolute inset-0 rounded-full border-2 border-accent-blue/20 animate-[spin_20s_linear_infinite]" />
              <!-- Inner rings -->
              <div class="absolute inset-8 rounded-full border border-accent-gold/15" />
              <div class="absolute inset-20 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/10 backdrop-blur" />
              <!-- 7 service nodes positioned around the circle (evenly at ~51° intervals) -->
              <!-- 0° = top -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-yellow/30 text-[11px] text-accent-yellow" style="top: 2%; left: 50%; transform: translateX(-50%)">🔐 Auth</div>
              <!-- ~51° -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-blue/30 text-[11px] text-accent-blue" style="top: 14%; right: 2%; transform: translateX(0)">🗄️ Database</div>
              <!-- ~103° -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-green/30 text-[11px] text-accent-green" style="top: 52%; right: -4%; transform: translateY(-50%)">📦 Storage</div>
              <!-- ~154° -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-purple/30 text-[11px] text-accent-purple" style="bottom: 8%; right: 8%">🧩 Realtime</div>
              <!-- ~206° -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-orange/30 text-[11px] text-accent-orange" style="bottom: 8%; left: 8%">🔧 Functions</div>
              <!-- ~257° -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-dark-red/30 text-[11px] text-accent-dark-red" style="top: 52%; left: -4%; transform: translateY(-50%)">📜 Logging</div>
              <!-- ~309° -->
              <div class="absolute px-2.5 py-1 bg-navy-card rounded-full border border-accent-teal/30 text-[11px] text-accent-teal" style="top: 14%; left: 2%">🖥️ Dashboard</div>
              <!-- Center logo -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <span class="text-2xl font-bold text-text-white font-heading">euro</span><span class="text-2xl font-bold text-accent-gold font-heading">base</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gold accent line at top -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-accent-gold" />

    <WaitingListModal :open="showModal" source="hero" @close="showModal = false" />
  </section>
</template>
