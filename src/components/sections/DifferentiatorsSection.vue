<script setup lang="ts">
import { differentiators } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="differentiators" aria-labelledby="heading-differentiators" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-differentiators"
          subtitle="Why Eurobase"
          :heading="differentiators.headline"
        />
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <AccentCard
          v-for="(item, i) in differentiators.items"
          :key="item.title"
          :accent-color="item.color"
          accent-position="top"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
        >
          <h3 class="text-text-white font-bold text-sm mb-2 font-heading">{{ item.title }}</h3>
          <p class="text-text-muted text-xs leading-relaxed">{{ item.description }}</p>
        </AccentCard>
      </div>
    </div>
  </section>
</template>
