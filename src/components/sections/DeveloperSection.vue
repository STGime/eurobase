<script setup lang="ts">
import { developer } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="developers" aria-labelledby="heading-developers" class="py-24 bg-gradient-to-b from-navy to-navy-card/30" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-developers"
          subtitle="For Developers"
          :heading="developer.headline"
          :description="developer.description"
        />
      </div>

      <div class="grid lg:grid-cols-2 gap-10 items-start">
        <div :class="isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'">
          <CodeBlock :code="developer.code" />
        </div>

        <div>
          <ul class="space-y-4">
            <li
              v-for="(feature, i) in developer.features"
              :key="feature"
              class="flex items-start gap-3"
              :class="isVisible ? `animate-fade-in-up stagger-${i + 2}` : 'opacity-0'"
            >
              <span class="text-accent-green mt-0.5">&#10003;</span>
              <span class="text-text-light">{{ feature }}</span>
            </li>
          </ul>

          <div
            class="mt-8 space-y-1"
            :class="isVisible ? 'animate-fade-in-up stagger-7' : 'opacity-0'"
          >
            <p v-for="line in developer.footer" :key="line" class="text-text-muted text-sm italic">
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
