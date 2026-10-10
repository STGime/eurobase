<script setup lang="ts">
import { cta } from '@/data/content'

</script>

<template>
  <section id="cta" aria-labelledby="heading-cta" class="py-24 bg-ink relative overflow-hidden">
    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div>
        <h2 id="heading-cta" class="text-3xl md:text-4xl font-bold text-text-white mb-4 font-heading">
          {{ cta.headline }}
        </h2>
        <p class="text-text-muted text-lg mb-8">
          {{ cta.description }}
        </p>
      </div>

      <div
        class="max-w-md mx-auto mb-8"
      >
        <a
          href="https://console.eurobase.app/login?signup=1"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-amber text-ink hover:bg-amber-hover shadow-lg shadow-amber/20"
        >
          {{ cta.primaryCta }}
        </a>
      </div>

      <p class="mt-12 text-xs text-text-muted">
        100% EU-owned · GDPR-native · no CLOUD Act exposure · Schrems II-safe
      </p>
    </div>

  </section>
</template>
