<script setup lang="ts">
import { enterprise } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="enterprise" aria-labelledby="heading-enterprise" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-enterprise"
          subtitle="For Enterprises"
          :heading="enterprise.headline"
          :description="enterprise.description"
        />
      </div>

      <div class="grid md:grid-cols-2 gap-10 mb-12">
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="(feature, i) in enterprise.features"
            :key="feature.name"
            class="flex items-center gap-4 bg-navy-card/50 rounded-lg px-5 py-4"
            :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
          >
            <span class="text-2xl">{{ feature.icon }}</span>
            <span class="text-text-light">{{ feature.name }}</span>
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <p
            class="text-text-muted text-lg leading-relaxed mb-8"
            :class="isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'"
          >
            Modernize your applications while keeping sensitive data within European jurisdiction.
          </p>
          <p
            class="text-accent-gold font-semibold text-lg"
            :class="isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'"
          >
            {{ enterprise.footer }}
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <AccentCard
          v-for="(prop, i) in enterprise.valueProp"
          :key="prop.title"
          :accent-color="prop.color"
          accent-position="top"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 5}` : 'opacity-0'"
        >
          <h3 class="text-text-white font-bold mb-2 font-heading">{{ prop.title }}</h3>
          <p class="text-text-muted text-sm">{{ prop.description }}</p>
        </AccentCard>
      </div>
    </div>
  </section>
</template>
