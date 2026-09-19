<script setup lang="ts">
import { solution } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="solution" aria-labelledby="heading-solution" class="pt-12 pb-24 bg-gradient-to-b from-navy to-navy-card/30">
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
          <!-- Coming-soon badge for features that have landed in code
               but not yet been validated end-to-end. Kept as a visible
               pill so visitors don't try to use it prematurely and
               there's no surprise when it doesn't appear in the
               console yet. -->
          <span
            v-if="'comingSoon' in feature && feature.comingSoon"
            class="absolute top-3 right-3 rounded-full bg-amber-500/15 text-amber-300 text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5"
          >
            Coming soon
          </span>
          <!-- Cards with an href render their body as an anchor so the
               whole tile is clickable. Without this, the "Source on
               GitHub" card would invite "audit it, PR it" and then
               dead-end with no path to the repo. External-link hint
               emoji sits inline with the title. -->
          <component
            :is="'href' in feature && feature.href ? 'a' : 'div'"
            v-bind="'href' in feature && feature.href ? { href: feature.href, target: '_blank', rel: 'noopener noreferrer', class: 'block hover:opacity-80 transition-opacity' } : {}"
          >
            <div class="text-3xl mb-3">{{ feature.icon }}</div>
            <h3 class="text-text-white font-semibold mb-1">
              {{ feature.name }}<span v-if="'href' in feature && feature.href" class="ml-1 text-text-muted text-xs">↗</span>
            </h3>
            <p class="text-text-muted text-sm">{{ feature.description }}</p>
          </component>
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
