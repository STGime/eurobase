import type { RouteRecordRaw, RouterScrollBehavior, Router } from 'vue-router'

// Routes-only module — vite-ssg creates the Router instance itself
// (client: web history; server-render: memory history) so we hand it
// the routes array + scrollBehavior. The old default export was a
// pre-built Router which vite-ssg can't rehost server-side; nothing
// else in the app imports that default now.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/PrivacyPage.vue'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/pages/TermsPage.vue'),
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('@/pages/LegalNoticePage.vue'),
  },
  // Preserve inbound SEO links to the old German-conventional URL —
  // the entity is now Estonian, but existing backlinks and Search
  // Console history point at /impressum. 301 to /legal so link equity
  // consolidates and users still land somewhere useful.
  {
    path: '/impressum',
    redirect: '/legal',
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('@/pages/BlogPostPage.vue'),
  },
  {
    path: '/vs/:slug',
    name: 'comparison',
    component: () => import('@/pages/ComparisonPage.vue'),
  },
  {
    path: '/features/dsar',
    name: 'feature-dsar',
    component: () => import('@/pages/DsarFeaturePage.vue'),
  },
  {
    path: '/gdpr-readiness',
    name: 'gdpr-readiness',
    component: () => import('@/pages/GdprReadinessPage.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/FaqPage.vue'),
  },
  {
    path: '/security',
    name: 'security',
    component: () => import('@/pages/SecurityPage.vue'),
  },
  {
    path: '/founder',
    name: 'founder',
    component: () => import('@/pages/FounderPage.vue'),
  },
]

export const scrollBehavior: RouterScrollBehavior = (to) => {
  // No-op during SSG — vite-ssg's `mock: true` installs a jsdom
  // window that does NOT implement scrollTo, and vue-router calls
  // scrollBehavior once per rendered route, so without this guard
  // every build logs 163 "Not implemented" warnings. `typeof window`
  // wouldn't work (the mock defines it); use vite's SSR sentinel.
  if (import.meta.env.SSR) return false
  if (to.hash) {
    return { el: to.hash, behavior: 'smooth' }
  }
  return { top: 0, behavior: 'smooth' }
}

// Client-only afterEach — vite-ssg calls the setup fn with a router
// instance on both client + server, and its `mock: true` gives us a
// jsdom `window`, so a `typeof window` guard would run this during
// SSG too (and log "Not implemented: Window's scrollTo" per route).
// Use vite's SSR sentinel instead.
export function installClientNavGuards(router: Router) {
  if (import.meta.env.SSR) return
  router.afterEach((to) => {
    if (!to.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  })
}
