<script setup lang="ts">
import { useLatestReleases } from '@/composables/useLatestReleases'

defineProps<{ variant?: 'light' | 'dark' }>()
const rel = useLatestReleases()
</script>

<template>
  <div
    :class="[
      'rounded-lg px-4 py-3 text-sm space-y-2',
      variant === 'dark' ? 'bg-white/5 text-text-muted' : 'bg-white border border-black/10 text-slate',
    ]"
    aria-label="Latest releases"
  >
    <p :class="['font-semibold', variant === 'dark' ? 'text-text-white' : 'text-ink']">Latest releases</p>
    <p>
      <a :href="rel.sdkUrl" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">JavaScript SDK {{ rel.sdk }}</a>
      <br />
      <code class="font-mono text-xs">npm install @eurobase/sdk@latest</code>
    </p>
    <p>
      <a :href="rel.cliUrl" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2">CLI {{ rel.cli }}</a>
      <br />
      <code class="font-mono text-xs">brew install stgime/tap/eurobase</code>
      <span class="text-xs"> · update: </span><code class="font-mono text-xs">brew upgrade stgime/tap/eurobase</code>
    </p>
  </div>
</template>
