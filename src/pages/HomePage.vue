<script setup lang="ts">
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
