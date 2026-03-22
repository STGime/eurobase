<script setup lang="ts">
import { vision } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="vision" aria-labelledby="heading-vision" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-vision"
          subtitle="The Vision"
          :heading="vision.headline"
          :description="vision.description"
          class="mx-auto"
        />
      </div>

      <div class="relative">
        <!-- Timeline line -->
        <div class="hidden lg:block absolute left-0 right-0 top-6 h-0.5 bg-navy-light" />

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(milestone, i) in vision.milestones"
            :key="milestone.phase"
            :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
          >
            <!-- Timeline dot -->
            <div class="hidden lg:flex items-center justify-center mb-6">
              <div class="w-3 h-3 rounded-full bg-accent-gold ring-4 ring-navy" />
            </div>

            <div class="bg-navy-card rounded-lg p-5 border border-navy-light h-full">
              <span class="text-accent-gold font-bold text-xs uppercase tracking-wider">{{ milestone.phase }}</span>
              <h3 class="text-text-white font-bold mt-2 mb-3 font-heading">{{ milestone.title }}</h3>
              <ul class="space-y-2">
                <li v-for="item in milestone.items" :key="item" class="text-text-muted text-sm flex items-start gap-2">
                  <span class="text-accent-blue mt-1 text-xs">&#9656;</span>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
