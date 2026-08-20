import { ref, onMounted, onUnmounted } from 'vue'

// `threshold: 0` fires as soon as the section's top pixel enters the
// viewport. The previous 0.15 required 15% of the target's total area
// in view — impossible for sections taller than viewport / 0.15 (a
// phone at 800px could never satisfy 15% of a 3000px blog list, so
// the fade-in never fired and every card stayed opacity-0, leaving a
// large empty navy block on mobile between Pricing and Founder).
// Callers can still opt into a higher threshold for short cards.
export function useScrollReveal(threshold = 0) {
  const elementRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    // Fail-open: if IntersectionObserver isn't available (very old
    // browsers, or if a mobile browser gates it in some private
    // mode) render the reveal state immediately rather than leaving
    // content permanently invisible.
    if (typeof IntersectionObserver === 'undefined') {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { elementRef, isVisible }
}
