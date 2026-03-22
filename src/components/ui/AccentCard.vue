<script setup lang="ts">
defineProps<{
  accentColor?: string
  accentPosition?: 'top' | 'left'
}>()
</script>

<template>
  <div class="relative rounded-lg bg-navy-card overflow-hidden">
    <div
      v-if="accentColor"
      class="absolute"
      :class="accentPosition === 'left' ? 'left-0 top-0 w-1 h-full' : 'top-0 left-0 h-1 w-full'"
      :style="{ backgroundColor: accentColor }"
    />
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>
