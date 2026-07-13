<script setup lang="ts">
import { dsar } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'
import StatCard from '@/components/ui/StatCard.vue'

const { elementRef, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="automated-dsar"
    aria-labelledby="heading-dsar"
    class="py-24 bg-gradient-to-b from-navy-card/30 to-navy"
    ref="elementRef"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-dsar"
          :subtitle="dsar.subtitle"
          :heading="dsar.headline"
          :description="dsar.description"
        />
      </div>

      <!-- Cost of DIY DSAR -->
      <div class="mb-12" :class="isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'">
        <div class="flex items-baseline gap-3 mb-2">
          <span class="text-accent-red font-semibold text-xs uppercase tracking-wider">The Cost</span>
          <h3 class="text-text-white font-bold text-xl font-heading">{{ dsar.cost.title }}</h3>
        </div>
        <p class="text-text-muted mb-6 max-w-3xl">{{ dsar.cost.description }}</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            v-for="stat in dsar.cost.stats"
            :key="stat.label"
            :value="stat.value"
            :label="stat.label"
            :detail="stat.detail"
            :color="stat.color"
            :footnote="stat.footnote"
          />
        </div>
        <p class="text-xs text-text-muted mt-4">
          <sup>[{{ dsar.cost.footnoteSource.id }}]</sup>
          <a :href="dsar.cost.footnoteSource.url" class="hover:text-accent-blue underline ml-1">
            {{ dsar.cost.footnoteSource.text }}
          </a>
        </p>
      </div>

      <!-- The Gap on other platforms -->
      <div class="mb-12" :class="isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'">
        <div class="flex items-baseline gap-3 mb-2">
          <span class="text-accent-gold font-semibold text-xs uppercase tracking-wider">The Gap</span>
          <h3 class="text-text-white font-bold text-xl font-heading">{{ dsar.gap.title }}</h3>
        </div>
        <p class="text-text-muted mb-6 max-w-3xl">{{ dsar.gap.description }}</p>
        <div class="rounded-lg bg-navy-card overflow-hidden border border-navy-light">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-navy-light/40">
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-1/4">Platform</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-1/3">Built-in DSAR?</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3">What you do instead</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in dsar.gap.rows"
                :key="row.name"
                :class="[
                  i % 2 ? 'bg-navy-light/10' : '',
                  row.supported ? 'bg-accent-green/5' : '',
                ]"
              >
                <td class="px-4 py-3 font-medium border-t border-navy-light/30"
                  :class="row.supported ? 'text-accent-green' : 'text-text-white'"
                >
                  {{ row.name }}
                </td>
                <td class="px-4 py-3 border-t border-navy-light/30"
                  :class="row.supported ? 'text-accent-green font-semibold' : 'text-accent-red'"
                >
                  <span class="mr-2">{{ row.supported ? '✓' : '✗' }}</span>{{ row.status }}
                </td>
                <td class="px-4 py-3 text-text-muted border-t border-navy-light/30">{{ row.detail }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Eurobase solution -->
      <div :class="isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'">
        <div class="flex items-baseline gap-3 mb-2">
          <span class="text-accent-blue font-semibold text-xs uppercase tracking-wider">The Answer</span>
          <h3 class="text-text-white font-bold text-xl font-heading">{{ dsar.solution.title }}</h3>
        </div>
        <p class="text-text-muted mb-6 max-w-3xl">{{ dsar.solution.description }}</p>
        <div class="grid md:grid-cols-2 gap-5">
          <AccentCard
            v-for="(bullet, i) in dsar.solution.bullets"
            :key="bullet.title"
            accent-color="#1565C0"
            accent-position="left"
            :class="isVisible ? `animate-fade-in-up stagger-${i + 3}` : 'opacity-0'"
          >
            <div class="flex gap-3">
              <span class="text-accent-blue text-lg leading-none mt-0.5">✓</span>
              <div>
                <p class="text-text-white font-semibold mb-1">{{ bullet.title }}</p>
                <p class="text-text-muted text-sm leading-relaxed">{{ bullet.body }}</p>
              </div>
            </div>
          </AccentCard>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <a
            :href="dsar.solution.primaryCta.href"
            class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25 transition-all duration-200"
          >
            {{ dsar.solution.primaryCta.label }}
          </a>
          <RouterLink
            :to="dsar.solution.secondaryCta.href"
            class="text-sm font-semibold text-accent-gold hover:underline"
          >
            {{ dsar.solution.secondaryCta.label }} →
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
