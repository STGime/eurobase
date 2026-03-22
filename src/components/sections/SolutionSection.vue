<script setup lang="ts">
import { solution } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="solution" aria-labelledby="heading-solution" class="py-24 bg-gradient-to-b from-navy to-navy-card/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref="elementRef">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-solution"
          subtitle="The Solution"
          :heading="solution.headline"
          :description="solution.description"
        />
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AccentCard
          v-for="(feature, i) in solution.features"
          :key="feature.name"
          :accent-color="feature.color"
          accent-position="top"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
        >
          <div class="text-3xl mb-3">{{ feature.icon }}</div>
          <h3 class="text-text-white font-semibold mb-1">{{ feature.name }}</h3>
          <p class="text-text-muted text-sm">{{ feature.description }}</p>
        </AccentCard>
      </div>

      <div
        class="mt-12 text-center"
        :class="isVisible ? 'animate-fade-in-up stagger-7' : 'opacity-0'"
      >
        <p v-for="line in solution.footer" :key="line" class="text-text-light text-lg">
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>
