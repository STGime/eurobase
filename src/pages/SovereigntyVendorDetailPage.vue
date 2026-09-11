<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getVendor, ratingBadgeClass, ratingLabel, CATEGORY_LABELS, type Vendor } from '@/data/sovereignty'
import { usePageTitle } from '@/composables/usePageTitle'

const route = useRoute()
const vendor = computed<Vendor | undefined>(() => getVendor(String(route.params.slug ?? '')))

// Per-vendor tab title on SPA nav — matches the SEO title emitted
// by routeMeta.ts for the pre-rendered HTML so the two paths agree.
const DEFAULT_TITLE = 'Vendor — Sovereignty Check | Eurobase'
usePageTitle(DEFAULT_TITLE)
watchEffect(() => {
  if (import.meta.env.SSR) return
  const v = vendor.value
  if (!v) return
  document.title = `Is ${v.name} GDPR-safe? CLOUD Act exposure and EU alternatives | Eurobase`
})
</script>

<template>
  <main class="min-h-screen bg-navy-deep text-text-white">
    <section class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-link to="/sovereignty-check/vendors" class="text-accent-blue text-sm hover:underline mb-6 inline-block">
        &larr; All vendors
      </router-link>

      <div v-if="!vendor" class="rounded-xl bg-red-900/20 border border-red-500/40 p-6">
        <h1 class="text-xl font-bold mb-2">Vendor not found</h1>
        <p class="text-red-200">
          We don't have this vendor in the dataset yet.
          <a href="https://github.com/STGime/sovereignty-vendors" class="text-accent-blue hover:underline" target="_blank" rel="noopener">
            Open a PR to add it →
          </a>
        </p>
      </div>

      <template v-else>
        <div class="flex items-center gap-3 flex-wrap mb-2">
          <h1 class="text-3xl md:text-4xl font-bold font-heading">{{ vendor.name }}</h1>
          <span
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            :class="ratingBadgeClass(vendor.ratings.overall)"
          >
            {{ vendor.ratings.overall }}
          </span>
        </div>
        <p class="text-text-muted mb-6">
          {{ CATEGORY_LABELS[vendor.category] ?? vendor.category }} · Reviewed {{ vendor.last_reviewed }}
        </p>

        <div v-if="vendor.self_disclosure" class="mb-6 rounded-lg bg-amber-900/20 border border-amber-500/40 p-4 text-sm text-amber-100">
          <strong class="block mb-1 uppercase tracking-wider text-xs">Conflict of interest disclosure</strong>
          Eurobase OÜ maintains the sovereignty-vendors dataset and is graded on it. If you think this rating is too generous,
          <a href="https://github.com/STGime/sovereignty-vendors/issues" class="text-accent-blue hover:underline" target="_blank" rel="noopener">open an issue</a>.
          Grading ourselves green while denying others the same grade would destroy the dataset's credibility.
        </div>

        <p class="text-base text-text-light leading-relaxed mb-8">
          {{ vendor.one_line_reason.trim() }}
        </p>

        <!-- Facts table -->
        <div class="rounded-xl bg-navy-card border border-navy-light overflow-hidden mb-8">
          <dl class="divide-y divide-navy-light">
            <div class="grid grid-cols-3 gap-2 p-4 text-sm">
              <dt class="text-text-muted">Contracting entity</dt>
              <dd class="col-span-2">{{ vendor.contracting_entity }}</dd>
            </div>
            <div class="grid grid-cols-3 gap-2 p-4 text-sm">
              <dt class="text-text-muted">Ultimate parent</dt>
              <dd class="col-span-2">{{ vendor.ultimate_parent }} ({{ vendor.parent_jurisdiction }})</dd>
            </div>
            <div v-if="vendor.hosting_regions?.length" class="grid grid-cols-3 gap-2 p-4 text-sm">
              <dt class="text-text-muted">Hosting regions</dt>
              <dd class="col-span-2">{{ vendor.hosting_regions.join(', ') }}</dd>
            </div>
            <div v-if="vendor.subprocessors?.length" class="grid grid-cols-3 gap-2 p-4 text-sm">
              <dt class="text-text-muted">Subprocessors</dt>
              <dd class="col-span-2">
                <router-link
                  v-for="(s, i) in vendor.subprocessors"
                  :key="s"
                  :to="`/sovereignty-check/vendors/${s}`"
                  class="text-accent-blue hover:underline"
                >{{ s }}<span v-if="i < (vendor.subprocessors!.length - 1)">, </span></router-link>
              </dd>
            </div>
            <div v-if="vendor.transfer_mechanism" class="grid grid-cols-3 gap-2 p-4 text-sm">
              <dt class="text-text-muted">Transfer mechanism</dt>
              <dd class="col-span-2">{{ vendor.transfer_mechanism }}</dd>
            </div>
            <div v-if="vendor.operational_access_regions?.length" class="grid grid-cols-3 gap-2 p-4 text-sm">
              <dt class="text-text-muted">Operational access from</dt>
              <dd class="col-span-2">{{ vendor.operational_access_regions.join(', ') }}</dd>
            </div>
          </dl>
        </div>

        <!-- Five dimensions -->
        <h2 class="text-lg font-semibold font-heading mb-3">Rating by dimension</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div v-for="[label, key] in ([
            ['Entity control','entity_control'],
            ['Data location','data_location'],
            ['Operational access','operational_access'],
            ['Subprocessor chain','subprocessor_chain'],
            ['Transfer mechanism','transfer_mechanism'],
          ] as const)" :key="key"
            class="rounded-lg border p-3 text-sm"
            :class="ratingBadgeClass(vendor.ratings[key])">
            <div class="text-xs uppercase tracking-wider opacity-80">{{ label }}</div>
            <div class="mt-1 font-semibold">{{ ratingLabel(vendor.ratings[key]) }}</div>
          </div>
        </div>

        <!-- EU alternatives -->
        <template v-if="vendor.eu_alternatives?.length">
          <h2 class="text-lg font-semibold font-heading mb-3">EU alternatives</h2>
          <div class="flex flex-wrap gap-2 mb-8">
            <router-link
              v-for="alt in vendor.eu_alternatives"
              :key="alt"
              :to="`/sovereignty-check/vendors/${alt}`"
              class="inline-flex items-center px-3 py-1 rounded-full bg-navy-card border border-navy-light text-sm hover:border-accent-blue transition-colors"
            >{{ getVendor(alt)?.name ?? alt }}</router-link>
          </div>
        </template>

        <!-- Sources -->
        <h2 class="text-lg font-semibold font-heading mb-3">Sources</h2>
        <ul class="list-disc list-inside space-y-1 text-sm text-text-light mb-8">
          <li v-for="src in vendor.sources" :key="src">
            <a
              v-if="src.startsWith('http')"
              :href="src"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-blue hover:underline break-all"
            >{{ src }}</a>
            <span v-else class="text-text-muted">{{ src }}</span>
          </li>
        </ul>

        <div v-if="vendor.notes" class="rounded-lg bg-navy-card border border-navy-light p-4 text-sm text-text-light">
          <strong class="block mb-1 uppercase tracking-wider text-xs">Note</strong>
          {{ vendor.notes.trim() }}
        </div>

        <p class="mt-8 text-xs text-text-muted">
          Disagree with this rating?
          <a
            :href="`https://github.com/STGime/sovereignty-vendors/issues/new?title=[${vendor.slug}]%20dispute`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-accent-blue hover:underline"
          >Open an issue on GitHub</a>
          — we review disputes publicly. Not legal advice.
        </p>
      </template>
    </section>
  </main>
</template>
