<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  href?: string
}>()
</script>

<template>
  <a
    :href="href ?? '#'"
    class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer"
    :class="variant === 'secondary'
      ? 'border border-accent-blue text-accent-blue hover:bg-accent-blue/10'
      : 'bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25'"
  >
    <slot />
  </a>
</template>
