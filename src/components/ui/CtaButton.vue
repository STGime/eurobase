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
      ? 'border-[1.5px] border-ink text-ink hover:bg-ink/5'
      : 'bg-amber text-ink hover:bg-amber-hover shadow-lg shadow-amber/30'"
  >
    <slot />
  </a>
</template>
