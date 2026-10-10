<script setup lang="ts">
import { founder } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'

</script>

<template>
  <section id="founder" aria-labelledby="heading-founder" class="py-24 bg-paper">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          id="heading-founder"
          :heading="founder.heading"
          :description="`${founder.role} · ${founder.location}`"
        />
      </div>

      <div class="grid md:grid-cols-3 gap-10 items-start">
        <div
          class="md:col-span-1"
        >
          <div class="rounded-xl overflow-hidden bg-mist border border-line aspect-square">
            <img
              :src="founder.portrait"
              :alt="founder.portraitAlt"
              class="w-full h-full object-cover"
              loading="lazy"
              width="600"
              height="600"
            />
          </div>
        </div>

        <div class="md:col-span-2 space-y-5">
          <p
            v-for="(paragraph, i) in founder.bio"
            :key="i"
            class="text-slate text-lg leading-relaxed"
          >
            {{ paragraph }}
          </p>
          <p
            class="text-ink text-lg leading-relaxed border-l-2 border-amber pl-5 italic"
          >
            {{ founder.personal }}
          </p>
        </div>
      </div>

      <div class="mt-16">
        <h3
          class="text-amber-ink font-semibold text-sm uppercase tracking-wider mb-6"
        >
          Previously
        </h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="(job, i) in founder.workHistory"
            :key="`${job.company}-${job.period}`"
            class="bg-mist rounded-lg px-5 py-4"
          >
            <div class="flex items-baseline justify-between gap-4 mb-1">
              <span class="text-ink font-semibold">{{ job.role }}</span>
              <span class="text-slate text-xs whitespace-nowrap">{{ job.period }}</span>
            </div>
            <div class="text-ink/80 text-sm mb-1">{{ job.company }}</div>
            <div class="text-slate text-sm">{{ job.note }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
