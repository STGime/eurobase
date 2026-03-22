<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  subtitle?: string
  heading: string
  description?: string
  id?: string
}>()

const headingId = computed(() => props.id || props.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
</script>

<template>
  <header class="mb-12 max-w-3xl">
    <p v-if="subtitle" class="text-accent-gold font-semibold text-sm uppercase tracking-wider mb-3">
      {{ subtitle }}
    </p>
    <h2 :id="headingId" class="text-3xl md:text-4xl font-bold text-text-white mb-4 font-heading">
      {{ heading }}
    </h2>
    <p v-if="description" class="text-text-muted text-lg leading-relaxed">
      {{ description }}
    </p>
  </header>
</template>
