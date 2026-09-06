<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProblemSection from '@/components/sections/ProblemSection.vue'
import SolutionSection from '@/components/sections/SolutionSection.vue'
import DsarSection from '@/components/sections/DsarSection.vue'
import DifferentiatorsSection from '@/components/sections/DifferentiatorsSection.vue'
import DeveloperSection from '@/components/sections/DeveloperSection.vue'
import EnterpriseSection from '@/components/sections/EnterpriseSection.vue'
import MarketSection from '@/components/sections/MarketSection.vue'
import HowItWorksSection from '@/components/sections/HowItWorksSection.vue'
import PricingSection from '@/components/sections/PricingSection.vue'
import BlogSection from '@/components/sections/BlogSection.vue'
import CtaSection from '@/components/sections/CtaSection.vue'

// SSG side-effect: when a user lands on a non-home route (say
// /vs/supabase — pre-rendered with its own <title>), each sibling
// page's watchEffect snapshots the CURRENT document.title as the
// "site default" for restore-on-unmount. Result: SPA-navigating back
// to /, the sibling page's onBeforeUnmount restores its own title
// instead of the homepage one. Fix by having HomePage re-assert the
// shell defaults on mount, so /-nav always converges on the right
// title regardless of entry point.
const HOME_TITLE = 'Eurobase — GDPR-Native EU Alternative to Supabase & Firebase'
const HOME_DESC =
  'GDPR-native EU Supabase alternative. One-click DSAR, Article 30 RoPA, audit trail. Postgres, auth, storage, realtime, edge functions — hosted in France. Free tier, €25/mo Pro.'

onMounted(() => {
  document.title = HOME_TITLE
  const desc = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (desc) desc.setAttribute('content', HOME_DESC)
  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', 'https://eurobase.app/')
})
</script>

<template>
  <main>
    <HeroSection />
    <!-- SolutionSection moved to slot 2 so first-scroll shows features
         (Postgres, auth, storage, realtime, edge functions, vault…) —
         Problem section stays in the flow one down for the "why this
         matters" beat after the reader sees the surface. -->
    <SolutionSection />
    <ProblemSection />
    <DsarSection />
    <DifferentiatorsSection />
    <DeveloperSection />
    <EnterpriseSection />
    <MarketSection />
    <HowItWorksSection />
    <PricingSection />
    <BlogSection />
    <CtaSection />
  </main>
</template>
