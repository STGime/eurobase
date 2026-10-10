<script setup lang="ts">
import { problem } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'
import StatCard from '@/components/ui/StatCard.vue'

</script>

<template>
  <section id="problem" aria-labelledby="heading-problem" class="py-24 bg-paper">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          id="heading-problem"
          :heading="problem.headline"
          :description="problem.description"
        />
      </div>

      <div class="grid md:grid-cols-3 gap-4 mb-10">
        <StatCard
          v-for="(stat, i) in problem.stats"
          :key="i"
          :value="stat.value"
          :label="stat.label"
          :color="stat.color"
          :footnote="stat.footnote"
        />
      </div>

      <div
        class="rounded-xl bg-paper border border-line shadow-sm p-6 md:p-8 mb-10"
      >
        <p class="text-sm font-semibold uppercase tracking-wide text-amber-ink mb-4">
          Foreign jurisdiction is not theoretical — 2025 made that clear
        </p>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="(r, i) in problem.receipts" :key="i" class="flex gap-3">
            <span class="text-amber-ink text-xl leading-none mt-0.5">▸</span>
            <div>
              <p class="text-ink font-semibold mb-1">
                {{ r.title }}<sup v-if="r.footnote" class="text-slate/70 ml-0.5 text-[10px]">[{{ r.footnote }}]</sup>
              </p>
              <p class="text-slate text-sm leading-relaxed">{{ r.body }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-10">
        <AccentCard
          v-for="(point, i) in problem.painPoints"
          :key="i"
        >
          <div class="flex items-start gap-3">
            <div>
              <p class="text-ink font-semibold mb-2">
                {{ point.title }}<sup v-if="point.footnote" class="text-slate/70 ml-0.5 text-[10px]">[{{ point.footnote }}]</sup>
              </p>
              <p class="text-slate text-sm leading-relaxed">{{ point.text }}</p>
            </div>
          </div>
        </AccentCard>
      </div>

      <AccentCard
      >
        <p class="text-slate mb-4">Every European team hits the same trade-off:</p>
        <div class="grid md:grid-cols-2 gap-4 mb-6">
          <div v-for="(option, i) in problem.tradeoff" :key="i" class="flex items-start gap-3">
            <p class="text-slate">{{ option }}</p>
          </div>
        </div>
        <p class="text-2xl font-bold text-ink font-heading">{{ problem.conclusion }}</p>
      </AccentCard>

      <div
        class="mt-12 pt-6 border-t border-line"
      >
        <p class="text-xs uppercase tracking-wide text-slate mb-3 font-semibold">References</p>
        <ol class="space-y-1.5">
          <li
            v-for="ref in problem.references"
            :key="ref.id"
            class="text-xs text-slate leading-relaxed"
          >
            <span class="text-ink">[{{ ref.id }}]</span>
            <a
              :href="ref.url"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 hover:text-amber-ink transition-colors underline decoration-line hover:decoration-amber"
            >{{ ref.text }}</a>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
