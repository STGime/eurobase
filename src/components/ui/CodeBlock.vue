<script setup lang="ts">
defineProps<{
  code: string
}>()
</script>

<template>
  <div class="rounded-lg bg-[#0B1A2B] border border-navy-light overflow-hidden">
    <div class="flex items-center gap-1.5 px-4 py-2.5 bg-navy-footer/50 border-b border-navy-light">
      <span class="w-3 h-3 rounded-full bg-accent-red/60" />
      <span class="w-3 h-3 rounded-full bg-accent-gold/60" />
      <span class="w-3 h-3 rounded-full bg-accent-green/60" />
      <span class="ml-2 text-text-muted text-xs">eurobase.ts</span>
    </div>
    <pre class="p-5 text-sm leading-relaxed overflow-x-auto"><code class="text-text-light">{{ code }}</code></pre>
  </div>
</template>
