import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
      path: '/impressum',
      name: 'impressum',
      component: () => import('@/pages/ImpressumPage.vue'),
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
      path: '/faq',
      name: 'faq',
      component: () => import('@/pages/FaqPage.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  if (!to.hash) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
})

export default router
