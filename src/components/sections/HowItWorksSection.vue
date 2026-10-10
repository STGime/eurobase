<script setup lang="ts">
import { howItWorks } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

</script>

<template>
  <section id="how-it-works" aria-labelledby="heading-how-it-works" class="py-24 bg-paper">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          id="heading-how-it-works"
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
        >
          <AccentCard>
            <div class="text-center">
              <span class="w-12 h-12 rounded-full bg-amber text-ink text-2xl font-bold font-heading mb-3 mx-auto flex items-center justify-center">
                {{ step.step }}
              </span>
              <h3 class="text-ink font-bold text-lg mb-2 font-heading">{{ step.title }}</h3>
              <p class="text-slate text-sm">{{ step.description }}</p>
            </div>
          </AccentCard>
          <!-- Connector arrow -->
          <div v-if="i < 2" class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
            <svg class="w-6 h-6 text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Platform layers -->
      <div>
        <p class="text-slate text-sm mb-4">Under the hood, Eurobase provides:</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="layer in howItWorks.layers"
            :key="layer"
            class="bg-mist rounded-lg px-4 py-3 text-ink text-sm flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-amber" />
            {{ layer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
