<script setup lang="ts">
import { founder } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="founder" aria-labelledby="heading-founder" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-founder"
          :subtitle="founder.subtitle"
          :heading="founder.heading"
          :description="`${founder.role} · ${founder.location}`"
        />
      </div>

      <div class="grid md:grid-cols-3 gap-10 items-start">
        <div
          class="md:col-span-1"
          :class="isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'"
        >
          <div class="rounded-xl overflow-hidden bg-navy-card/50 aspect-square">
            <img
              :src="founder.portrait"
              :alt="founder.portraitAlt"
              class="w-full h-full object-cover"
              loading="lazy"
              width="600"
              height="600"
            />
          </div>
        </div>

        <div class="md:col-span-2 space-y-5">
          <p
            v-for="(paragraph, i) in founder.bio"
            :key="i"
            class="text-text-muted text-lg leading-relaxed"
            :class="isVisible ? `animate-fade-in-up stagger-${i + 2}` : 'opacity-0'"
          >
            {{ paragraph }}
          </p>
          <p
            class="text-text-light text-lg leading-relaxed border-l-2 border-accent-gold pl-5 italic"
            :class="isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'"
          >
            {{ founder.personal }}
          </p>
        </div>
      </div>

      <div class="mt-16">
        <h3
          class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-6"
          :class="isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'"
        >
          Previously
        </h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="(job, i) in founder.workHistory"
            :key="`${job.company}-${job.period}`"
            class="bg-navy-card/50 rounded-lg px-5 py-4"
            :class="isVisible ? `animate-fade-in-up stagger-${Math.min(i + 1, 6)}` : 'opacity-0'"
          >
            <div class="flex items-baseline justify-between gap-4 mb-1">
              <span class="text-text-white font-semibold">{{ job.role }}</span>
              <span class="text-text-muted text-xs whitespace-nowrap">{{ job.period }}</span>
            </div>
            <div class="text-text-light text-sm mb-1">{{ job.company }}</div>
            <div class="text-text-muted text-sm">{{ job.note }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
