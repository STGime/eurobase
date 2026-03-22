<script setup lang="ts">
import { problem } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="problem" aria-labelledby="heading-problem" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-problem"
          subtitle="The Problem"
          :heading="problem.headline"
          :description="problem.description"
        />
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <AccentCard
          v-for="(point, i) in problem.painPoints"
          :key="i"
          accent-color="#E53935"
          accent-position="left"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 2}` : 'opacity-0'"
        >
          <p :class="point.emphasis ? 'text-accent-red font-semibold' : 'text-text-light'">
            {{ point.text }}
          </p>
        </AccentCard>
      </div>

      <AccentCard
        accent-color="#E53935"
        accent-position="left"
        :class="isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'"
      >
        <p class="text-text-muted mb-4">Developers face a frustrating trade-off:</p>
        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div v-for="(option, i) in problem.tradeoff" :key="i" class="flex items-center gap-3">
            <span class="text-accent-red text-lg">{{ i === 0 ? '⚡' : '🛡️' }}</span>
            <p class="text-text-light">{{ option }}</p>
          </div>
        </div>
        <p class="text-2xl font-bold text-text-white font-heading">{{ problem.conclusion }}</p>
      </AccentCard>
    </div>
  </section>
</template>
