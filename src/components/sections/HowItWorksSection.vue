<script setup lang="ts">
import { howItWorks } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="how-it-works" aria-labelledby="heading-how-it-works" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-how-it-works"
          subtitle="How It Works"
          :heading="howItWorks.headline"
          :description="howItWorks.description"
        />
      </div>

      <!-- 3-step flow -->
      <div class="grid md:grid-cols-3 gap-6 mb-16">
        <div
          v-for="(step, i) in howItWorks.steps"
          :key="step.step"
          class="relative"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
        >
          <AccentCard :accent-color="step.color" accent-position="top">
            <div class="text-center">
              <span class="text-4xl font-bold font-heading mb-3 block" :style="{ color: step.color }">
                {{ step.step }}
              </span>
              <h3 class="text-text-white font-bold text-lg mb-2 font-heading">{{ step.title }}</h3>
              <p class="text-text-muted text-sm">{{ step.description }}</p>
            </div>
          </AccentCard>
          <!-- Connector arrow -->
          <div v-if="i < 2" class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
            <svg class="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Platform layers -->
      <div :class="isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'">
        <p class="text-text-muted text-sm mb-4">Under the hood, Eurobase provides:</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="layer in howItWorks.layers"
            :key="layer"
            class="bg-navy-card/50 rounded-lg px-4 py-3 text-text-light text-sm flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            {{ layer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
