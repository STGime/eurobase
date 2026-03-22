<script setup lang="ts">
import { pricing } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CtaButton from '@/components/ui/CtaButton.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section id="pricing" aria-labelledby="heading-pricing" class="py-24 bg-gradient-to-b from-navy to-navy-card/30" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mx-auto" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-pricing"
          subtitle="Pricing"
          :heading="pricing.headline"
          :description="pricing.description"
          class="mx-auto"
        />
      </div>

      <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div
          v-for="(tier, i) in pricing.tiers"
          :key="tier.name"
          class="relative rounded-lg overflow-hidden"
          :class="[
            tier.highlighted ? 'bg-navy-card ring-2 ring-accent-blue shadow-xl shadow-accent-blue/10' : 'bg-navy-card border border-navy-light',
            isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'
          ]"
        >
          <div v-if="tier.highlighted" class="bg-accent-blue text-white text-xs font-semibold text-center py-1.5">
            Recommended
          </div>
          <div class="p-6 flex flex-col items-center text-center">
            <span class="text-4xl mb-4">{{ tier.icon }}</span>
            <h3 class="text-text-white font-bold text-lg font-heading mb-1">{{ tier.name }}</h3>
            <div class="mb-4">
              <span class="text-2xl font-bold font-heading" :class="tier.price === 'Free' ? 'text-accent-gold' : 'text-text-muted'">{{ tier.price }}</span>
            </div>
            <p class="text-text-muted text-sm leading-relaxed">{{ tier.description }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-12" :class="isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'">
        <p class="text-text-muted text-sm mb-6">Join early access to help shape our pricing and get founder-friendly rates.</p>
        <CtaButton variant="primary" href="#cta">
          Get Early Access
        </CtaButton>
      </div>
    </div>
  </section>
</template>
