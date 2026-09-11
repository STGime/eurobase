<script setup lang="ts">
import { computed, ref } from 'vue'
import { vendors, CATEGORY_LABELS, ratingBadgeClass } from '@/data/sovereignty'
import { usePageTitle } from '@/composables/usePageTitle'

usePageTitle('Vendor ratings — Sovereignty Check | Eurobase')

const filter = ref('')

const filtered = computed(() => {
  const q = filter.value.trim().toLowerCase()
  if (!q) return vendors
  return vendors.filter(
    (v) =>
      v.slug.toLowerCase().includes(q) ||
      v.name.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      (CATEGORY_LABELS[v.category] ?? '').toLowerCase().includes(q),
  )
})
</script>

<template>
  <main class="min-h-screen bg-navy-deep text-text-white">
    <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link to="/sovereignty-check" class="text-accent-blue text-sm hover:underline mb-6 inline-block">
        &larr; Back to the checker
      </router-link>
      <h1 class="text-3xl md:text-4xl font-bold font-heading mb-2">Vendor ratings</h1>
      <p class="text-text-light mb-6 max-w-2xl">
        Every vendor in the open
        <a href="https://github.com/STGime/sovereignty-vendors" class="text-accent-blue hover:underline" target="_blank" rel="noopener">sovereignty-vendors dataset</a>.
        Click any name for the sources, the one-line reason, and the five-dimension breakdown.
      </p>

      <input
        v-model="filter"
        type="search"
        placeholder="Filter by name or category…"
        class="w-full max-w-md rounded-md bg-navy-card border border-navy-light px-3 py-2 text-sm text-text-white mb-6"
      />

      <ul class="divide-y divide-navy-light border border-navy-light rounded-lg bg-navy-card">
        <li v-for="v in filtered" :key="v.slug" class="p-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <router-link :to="`/sovereignty-check/vendors/${v.slug}`" class="text-base font-semibold hover:underline">
              {{ v.name }}
            </router-link>
            <span class="ml-2 text-xs text-text-muted">{{ CATEGORY_LABELS[v.category] ?? v.category }}</span>
            <p class="mt-1 text-sm text-text-light max-w-2xl">{{ v.one_line_reason.trim() }}</p>
          </div>
          <span
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            :class="ratingBadgeClass(v.ratings.overall)"
          >
            {{ v.ratings.overall }}
          </span>
        </li>
        <li v-if="!filtered.length" class="p-6 text-center text-text-muted text-sm">No matches.</li>
      </ul>
    </section>
  </main>
</template>
