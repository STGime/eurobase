<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { comparisons } from '@/data/comparisons'

const route = useRoute()
const comparison = computed(() => comparisons[route.params.slug as string])
</script>

<template>
  <main class="pt-24 pb-16 bg-navy min-h-screen">
    <template v-if="comparison">
      <!-- Hero -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <RouterLink to="/" class="text-accent-blue text-sm hover:underline mb-6 inline-block">&larr; Back to home</RouterLink>
        <h1 class="text-4xl md:text-5xl font-bold text-text-white mb-4 font-heading leading-tight">
          {{ comparison.heroHeadline }}
        </h1>
        <p class="text-xl text-accent-gold max-w-2xl">{{ comparison.heroSubheadline }}</p>
      </section>

      <!-- Context sections -->
      <section v-for="(section, i) in comparison.sections" :key="i" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 class="text-2xl font-bold text-text-white mb-3 font-heading">{{ section.title }}</h2>
        <p class="text-text-light leading-relaxed">{{ section.description }}</p>
      </section>

      <!-- Comparison Table -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">Feature Comparison</h2>
        <div class="overflow-x-auto rounded-lg border border-navy-light">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-navy-light/50">
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-1/3">Feature</th>
                <th class="text-left text-accent-blue font-semibold px-4 py-3 w-1/3">Eurobase</th>
                <th class="text-left text-text-muted font-semibold px-4 py-3 w-1/3">{{ comparison.competitor }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in comparison.rows"
                :key="i"
                :class="[
                  i % 2 ? 'bg-navy-light/10' : '',
                  row.highlight ? 'bg-accent-blue/5' : '',
                ]"
              >
                <td class="px-4 py-3 text-text-white font-medium border-t border-navy-light/30">{{ row.feature }}</td>
                <td class="px-4 py-3 text-accent-green border-t border-navy-light/30">{{ row.eurobase }}</td>
                <td class="px-4 py-3 text-text-muted border-t border-navy-light/30">{{ row.competitor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sovereignty Section -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="bg-navy-card rounded-xl p-8 border border-navy-light">
          <h2 class="text-2xl font-bold text-text-white mb-6 font-heading">{{ comparison.sovereigntyHeadline }}</h2>
          <ul class="space-y-4">
            <li v-for="(point, i) in comparison.sovereigntyPoints" :key="i" class="flex items-start gap-3">
              <span class="text-accent-blue mt-1 text-xs flex-shrink-0">&#9656;</span>
              <span class="text-text-light leading-relaxed">{{ point }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- CTA -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-text-white mb-4 font-heading">{{ comparison.ctaHeadline }}</h2>
        <p class="text-text-light mb-8 max-w-xl mx-auto">{{ comparison.ctaDescription }}</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#cta" class="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent-blue hover:bg-accent-blue-hover text-white font-semibold transition-colors">
            Get Started Free
          </a>
          <a href="mailto:founders@eurobase.app" class="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-navy-light text-text-light hover:text-text-white hover:border-text-muted transition-colors">
            Talk to the Founders
          </a>
        </div>
      </section>
    </template>

    <!-- Not found -->
    <div v-else class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
      <h1 class="text-2xl font-bold text-text-white mb-4">Comparison not found</h1>
      <RouterLink to="/" class="text-accent-blue hover:underline">Back to home</RouterLink>
    </div>
  </main>
</template>
