<script setup lang="ts">
import { pricing } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { elementRef, isVisible } = useScrollReveal()

// Cell classes for the per-tier matrix. Beta = green italic;
// "Coming soon" = amber italic; "Invite-only beta" reuses the
// green Beta styling because it is the same claim ("in customers'
// hands under a private invite gate"). Everything else renders
// as text-white plain. Empty cells fall through to an em-dash.
function cellClass(value: string | undefined): string {
  if (!value) return 'text-text-muted'
  if (value === 'Beta' || value === 'Invite-only beta') {
    return 'text-accent-green italic'
  }
  if (value === 'Coming soon') return 'text-amber-300 italic'
  return 'text-text-white'
}

function cellText(value: string | undefined): string {
  return value ?? '—'
}
</script>

<template>
  <section id="pricing" aria-labelledby="heading-pricing" class="py-24 bg-gradient-to-b from-navy to-navy-card/30" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mx-auto" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-pricing"
          subtitle="Pricing"
          :heading="pricing.headline"
          :description="pricing.description"
          class="mx-auto"
        />
      </div>

      <!-- Tier cards. Grid keeps 3-col at md and steps to 4-col at
           lg once Legal Team lands as the 4th tier — 4 cards at
           md is too cramped for the description copy. -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div
          v-for="(tier, i) in pricing.tiers"
          :key="tier.name"
          class="relative rounded-lg overflow-hidden flex flex-col"
          :class="[
            tier.highlighted ? 'bg-navy-card ring-2 ring-accent-blue shadow-xl shadow-accent-blue/10' : 'bg-navy-card border border-navy-light',
            isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'
          ]"
        >
          <div v-if="tier.highlighted" class="bg-accent-blue text-white text-xs font-semibold text-center py-1.5">
            Recommended
          </div>
          <!-- Coming-soon badge — mirrors the pattern used on the
               SolutionSection's "Supabase Migration" card so it reads
               visually the same across the site. -->
          <span
            v-if="'comingSoon' in tier && tier.comingSoon"
            class="absolute top-3 right-3 rounded-full bg-amber-500/15 text-amber-300 text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5"
          >
            Coming soon
          </span>
          <!-- Closed-beta badge — green rather than amber to
               visually differentiate "in customers' hands under a
               private invite gate" from "not yet built". -->
          <span
            v-if="'closedBeta' in tier && tier.closedBeta"
            class="absolute top-3 right-3 rounded-full bg-accent-green/15 text-accent-green text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5"
          >
            Closed beta
          </span>
          <div class="p-6 flex flex-col items-center text-center flex-1">
            <span class="text-4xl mb-4">{{ tier.icon }}</span>
            <h3 class="text-text-white font-bold text-lg font-heading mb-1">{{ tier.name }}</h3>
            <div class="mb-4">
              <span class="text-2xl font-bold font-heading" :class="tier.price === 'Free' ? 'text-accent-gold' : 'text-text-muted'">{{ tier.price }}</span>
            </div>
            <p class="text-text-muted text-sm leading-relaxed">{{ tier.description }}</p>
            <RouterLink
              v-if="'learnMoreHref' in tier && tier.learnMoreHref"
              :to="tier.learnMoreHref"
              class="mt-4 text-accent-blue text-sm font-semibold hover:underline"
            >
              {{ tier.learnMoreLabel ?? 'Learn more' }} →
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Built-for line. The legal-tech link goes to the dossier
           at /security#de-legaltech; see comment in content.ts.
           RouterLink so the SPA scroll-to-hash behaviour kicks in. -->
      <p
        class="text-center text-text-muted text-sm mt-10"
        :class="isVisible ? 'animate-fade-in-up stagger-5' : 'opacity-0'"
      >
        <span class="text-text-white font-semibold">{{ pricing.builtFor.lead }}</span>
        <template v-for="(a, i) in pricing.builtFor.audiences" :key="a.label">
          <template v-if="i > 0">{{ i === pricing.builtFor.audiences.length - 1 ? ', and ' : ', ' }}</template>
          <template v-else> </template>
          <RouterLink
            v-if="a.href"
            :to="a.href"
            class="text-accent-blue hover:underline"
          >{{ a.label }}</RouterLink>
          <span v-else>{{ a.label }}</span>
        </template>.
      </p>

      <!-- Shipped-recently callout. Data-driven from content.ts so
           the ledger stays honest and current without touching the
           component. -->
      <div
        class="mt-12 max-w-4xl mx-auto rounded-lg border border-navy-light bg-navy-card/60 p-6"
        :class="isVisible ? 'animate-fade-in-up stagger-5' : 'opacity-0'"
      >
        <h3 class="text-text-white font-heading font-bold text-lg mb-4">{{ pricing.recentShipments.heading }}</h3>
        <ul class="space-y-2">
          <li v-for="item in pricing.recentShipments.items" :key="item.label" class="flex gap-3 text-sm">
            <span class="text-accent-blue shrink-0 mt-0.5">▸</span>
            <span>
              <RouterLink
                v-if="item.href"
                :to="item.href"
                class="font-semibold text-text-white hover:text-accent-blue hover:underline"
              >{{ item.label }}</RouterLink>
              <span v-else class="font-semibold text-text-white">{{ item.label }}</span>
              <span class="text-text-muted"> — {{ item.detail }}</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- Per-tier feature matrix. Beta cells render green italic;
           "Coming soon" cells render amber italic — matches the
           source-of-truth SvelteKit pricing table so a customer
           comparing the two doesn't see visual drift. Legal-tech
           retention rows are the German-market copy the sales
           conversation with a Kanzlei buyer needs; §257 HGB /
           §147 AO split (10y books, 6y letters) is preserved. -->
      <div
        class="mt-14 max-w-6xl mx-auto"
        :class="isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'"
      >
        <h3 class="text-text-white font-heading font-bold text-xl text-center mb-6">{{ pricing.matrix.heading }}</h3>
        <div class="overflow-x-auto rounded-lg border border-navy-light bg-navy-card/40">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-navy-light bg-navy-card/60">
                <th class="text-left px-4 py-3 text-text-muted font-semibold min-w-[16rem]">Feature</th>
                <th
                  v-for="tier in pricing.matrix.tiers"
                  :key="tier"
                  class="px-4 py-3 text-center text-text-white font-heading font-bold"
                >{{ tier }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="cat in pricing.matrix.categories" :key="cat.title">
                <tr class="bg-navy-card/40">
                  <td :colspan="pricing.matrix.tiers.length + 1" class="px-4 py-2 text-text-muted uppercase tracking-wide text-xs font-semibold">
                    {{ cat.title }}
                  </td>
                </tr>
                <tr
                  v-for="row in cat.rows"
                  :key="row.feature"
                  class="border-t border-navy-light/50"
                >
                  <td class="px-4 py-3 text-text-light align-top">{{ row.feature }}</td>
                  <td
                    v-for="(value, colIdx) in row.values"
                    :key="colIdx"
                    class="px-4 py-3 text-center align-top"
                    :class="cellClass(value)"
                  >{{ cellText(value) }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>

      <div class="text-center mt-12" :class="isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'">
        <p class="text-text-muted text-sm mb-6">Free tier, no credit card required. Upgrade to Pro any time from the console.</p>
        <a
          href="https://console.eurobase.app/login?signup=1"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25"
        >
          Sign up free
        </a>
      </div>
    </div>
  </section>
</template>
