<script setup lang="ts">
import { market } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import StatCard from '@/components/ui/StatCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="market" aria-labelledby="heading-market" class="py-24 bg-gradient-to-b from-navy to-navy-card/30" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-market"
          subtitle="Market Opportunity"
          :heading="market.headline"
          :description="market.description"
        />
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard
          v-for="(stat, i) in market.stats"
          :key="stat.label"
          v-bind="stat"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
        />
      </div>

      <div
        class="flex flex-col md:flex-row gap-5"
        :class="isVisible ? 'animate-fade-in-up stagger-5' : 'opacity-0'"
      >
        <div class="flex-1 bg-[#1A237E] rounded-lg p-6 border-l-4 border-accent-gold">
          <p class="text-accent-gold font-bold text-xs uppercase tracking-wider mb-2">{{ market.euGap.headline }}</p>
          <p class="text-text-light text-sm leading-relaxed">{{ market.euGap.text }}</p>
        </div>
        <div class="bg-navy-card rounded-lg p-6 flex items-center gap-4 min-w-[200px]">
          <span class="text-5xl font-bold text-accent-red font-heading">{{ market.euGap.stat }}</span>
          <p class="text-text-white text-sm font-bold leading-tight">{{ market.euGap.statLabel }}</p>
        </div>
      </div>

      <!-- Sources -->
      <div
        class="mt-10 pt-6 border-t border-navy-light"
        :class="isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'"
      >
        <p class="text-accent-gold font-bold text-[10px] uppercase tracking-wider mb-3">Sources</p>
        <ol class="space-y-1.5">
          <li
            v-for="source in market.sources"
            :key="source.id"
            class="text-text-muted text-xs flex items-start gap-2"
          >
            <span class="text-text-muted/60 font-mono shrink-0">[{{ source.id }}]</span>
            <a
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-text-light transition-colors underline decoration-text-muted/30 underline-offset-2"
            >{{ source.text }}</a>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
