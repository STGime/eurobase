import { onBeforeUnmount, onMounted } from 'vue'

// Minimal SPA tab-title updater. vite-ssg rewrites <title> per route
// at build time (via routeMeta.ts → onPageRendered), so a hard-load
// or a crawler visit already sees the right title. On client-side
// SPA navigation, however, index.html's <title> stays stuck on the
// homepage default — this composable fixes that by updating
// document.title on mount and restoring the previous value on
// unmount.
//
// Meta / og / twitter tags are NOT updated here on purpose: crawlers
// consume the pre-rendered HTML, and mid-session tag mutation just
// pollutes DOM without adding real SEO. If a page later needs
// JSON-LD or dynamic og:image (per-vendor cards, say), extend this
// composable or roll a page-local watchEffect as FaqPage does.
export function usePageTitle(title: string) {
  if (import.meta.env.SSR) return
  let saved: string | null = null
  onMounted(() => {
    saved = document.title
    document.title = title
  })
  onBeforeUnmount(() => {
    if (saved !== null) document.title = saved
  })
}
