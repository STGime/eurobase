<script setup lang="ts">
import { developer } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import CtaButton from '@/components/ui/CtaButton.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="developers" aria-labelledby="heading-developers" class="py-24 bg-mist" ref="elementRef">
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
        <div class="min-w-0" :class="isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'">
          <CodeBlock :code="developer.code" />
        </div>

        <div class="min-w-0">
          <ul class="space-y-4">
            <li
              v-for="(feature, i) in developer.features"
              :key="feature"
              class="flex items-start gap-3"
              :class="isVisible ? `animate-fade-in-up stagger-${i + 2}` : 'opacity-0'"
            >
              <span class="text-green-ink mt-0.5">&#10003;</span>
              <span class="text-ink">{{ feature }}</span>
            </li>
          </ul>

          <div
            class="mt-8 space-y-1"
            :class="isVisible ? 'animate-fade-in-up stagger-7' : 'opacity-0'"
          >
            <p v-for="line in developer.footer" :key="line" class="text-slate text-sm italic">
              {{ line }}
            </p>
          </div>

          <div
            class="mt-8"
            :class="isVisible ? 'animate-fade-in-up stagger-7' : 'opacity-0'"
          >
            <CtaButton variant="secondary" href="https://console.eurobase.app/docs">
              Read the docs &rarr;
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
