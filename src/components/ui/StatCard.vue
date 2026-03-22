<script setup lang="ts">
import { ref, watch } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps<{
  value: string
  label: string
  detail?: string
  color: string
  footnote?: number
}>()

const { elementRef, isVisible } = useScrollReveal()
const displayValue = ref(props.value)

watch(isVisible, (visible) => {
  if (!visible) return
  const numMatch = props.value.match(/[\d.]+/)
  if (!numMatch) return
  const target = parseFloat(numMatch[0])
  const prefix = props.value.slice(0, props.value.indexOf(numMatch[0]))
  const suffix = props.value.slice(props.value.indexOf(numMatch[0]) + numMatch[0].length)
  const duration = 1200
  const startTime = performance.now()

  function animate(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = target * eased
    const formatted = target % 1 === 0 ? Math.round(current).toString() : current.toFixed(1)
    displayValue.value = `${prefix}${formatted}${suffix}`
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})
</script>

<template>
  <div
    ref="elementRef"
    class="relative rounded-lg bg-navy-card overflow-hidden p-6"
  >
    <div class="absolute top-0 left-0 w-full h-1" :style="{ backgroundColor: color }" />
    <p class="text-4xl md:text-5xl font-bold font-heading mb-2" :style="{ color }">
      {{ displayValue }}
    </p>
    <p class="text-text-light text-sm">{{ label }}<sup v-if="footnote" class="text-text-muted ml-0.5 text-[10px]">[{{ footnote }}]</sup></p>
    <p v-if="detail" class="text-xs font-semibold mt-2 text-accent-green">{{ detail }}</p>
  </div>
</template>
