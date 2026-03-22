<script setup lang="ts">
import { ref } from 'vue'
import { cta } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import WaitingListModal from '@/components/WaitingListModal.vue'

const { elementRef, isVisible } = useScrollReveal()
const showModal = ref(false)
</script>

<template>
  <section id="cta" aria-labelledby="heading-cta" class="py-24 bg-gradient-to-b from-navy to-navy-footer relative overflow-hidden" ref="elementRef">
    <!-- Background accents -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <p class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-4">Get Started</p>
        <h2 id="heading-cta" class="text-3xl md:text-4xl font-bold text-text-white mb-4 font-heading">
          {{ cta.headline }}
        </h2>
        <p class="text-text-muted text-lg mb-8">
          {{ cta.description }}
        </p>
      </div>

      <div
        class="max-w-md mx-auto mb-8"
        :class="isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'"
      >
        <button
          class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25"
          @click="showModal = true"
        >
          {{ cta.primaryCta }}
        </button>
      </div>

      <!-- Trust badges -->
      <div
        class="mt-12 flex flex-wrap items-center justify-center gap-6"
        :class="isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'"
      >
        <span class="text-xs text-text-muted flex items-center gap-1.5">
          <span class="text-accent-green">&#10003;</span> 100% EU-Owned
        </span>
        <span class="text-xs text-text-muted flex items-center gap-1.5">
          <span class="text-accent-green">&#10003;</span> GDPR-Native
        </span>
        <span class="text-xs text-text-muted flex items-center gap-1.5">
          <span class="text-accent-green">&#10003;</span> No CLOUD Act Exposure
        </span>
        <span class="text-xs text-text-muted flex items-center gap-1.5">
          <span class="text-accent-green">&#10003;</span> Schrems II-Safe
        </span>
      </div>
    </div>

    <WaitingListModal :open="showModal" source="cta" @close="showModal = false" />
  </section>
</template>
