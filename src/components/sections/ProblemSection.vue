<script setup lang="ts">
import { problem } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'
import StatCard from '@/components/ui/StatCard.vue'

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

      <div class="grid md:grid-cols-3 gap-4 mb-10">
        <StatCard
          v-for="(stat, i) in problem.stats"
          :key="i"
          :value="stat.value"
          :label="stat.label"
          :color="stat.color"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 2}` : 'opacity-0'"
        />
      </div>

      <div
        class="rounded-xl bg-navy-card border border-white/10 p-6 md:p-8 mb-10"
        :class="isVisible ? 'animate-fade-in-up stagger-5' : 'opacity-0'"
      >
        <p class="text-sm font-semibold uppercase tracking-wide text-accent-yellow mb-4">
          Foreign jurisdiction is not theoretical — 2026 made that clear
        </p>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(r, i) in problem.receipts" :key="i" class="flex gap-3">
            <span class="text-accent-yellow text-xl leading-none mt-0.5">▸</span>
            <div>
              <p class="text-text-white font-semibold mb-1">{{ r.title }}</p>
              <p class="text-text-light text-sm leading-relaxed">{{ r.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <AccentCard
          v-for="(point, i) in problem.painPoints"
          :key="i"
          accent-color="#E53935"
          accent-position="left"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 2}` : 'opacity-0'"
        >
          <div class="flex items-start gap-3">
            <span class="text-2xl leading-none mt-0.5" aria-hidden="true">{{ point.icon }}</span>
            <div>
              <p class="text-text-white font-semibold mb-2">{{ point.title }}</p>
              <p class="text-text-light text-sm leading-relaxed">{{ point.text }}</p>
            </div>
          </div>
        </AccentCard>
      </div>

      <AccentCard
        accent-color="#E53935"
        accent-position="left"
        :class="isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'"
      >
        <p class="text-text-muted mb-4">Every European team hits the same trade-off:</p>
        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div v-for="(option, i) in problem.tradeoff" :key="i" class="flex items-start gap-3">
            <span class="text-accent-red text-lg mt-0.5">{{ i === 0 ? '⚡' : '🛡️' }}</span>
            <p class="text-text-light">{{ option }}</p>
          </div>
        </div>
        <p class="text-2xl font-bold text-text-white font-heading">{{ problem.conclusion }}</p>
      </AccentCard>
    </div>
  </section>
</template>
