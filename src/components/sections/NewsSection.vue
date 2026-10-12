<script setup lang="ts">
import { news } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'

// Home page shows the two newest items only, so the section stays a
// teaser and "Meet Eurobase" is still close to the top.
const latest = [...news.items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <!-- Sits on the same mist ground as SolutionSection directly below,
       so the two read as one continuous band under the white hero. -->
  <section id="news" aria-labelledby="heading-news" class="pt-16 pb-4 bg-mist">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="heading-news"
        :heading="news.headline"
        :description="news.description"
        class="!mb-8"
      />

      <div class="space-y-6">
        <article
          v-for="item in latest"
          :key="item.title"
          class="grid md:grid-cols-[18rem_1fr] lg:grid-cols-[22rem_1fr] rounded-lg bg-paper border border-line shadow-sm overflow-hidden"
        >
          <!-- Teaser is a 4:5 poster with text right up to its edges, so
               it is never cropped: it is shown whole and centred, and
               the column behind it takes the poster's own blue so a
               taller text column doesn't leave visible bars. -->
          <RouterLink :to="item.primaryLink.href" class="flex items-center bg-[#2b4baa]" tabindex="-1" aria-hidden="true">
            <img
              :src="item.image"
              :alt="item.imageAlt"
              width="900"
              height="1129"
              loading="lazy"
              class="w-full h-auto"
            />
          </RouterLink>

          <div class="p-6 sm:p-8">
            <div class="flex flex-wrap items-center gap-3 text-xs mb-3">
              <span class="rounded-full bg-amber/15 text-amber-ink uppercase tracking-wide font-semibold px-2 py-0.5">
                {{ item.tag }}
              </span>
              <time :datetime="item.date" class="text-slate">{{ formatDate(item.date) }}</time>
            </div>

            <h3 class="text-ink font-bold text-2xl font-heading leading-snug mb-4">
              {{ item.title }}
            </h3>

            <p v-for="paragraph in item.paragraphs" :key="paragraph" class="text-slate leading-relaxed mb-3 max-w-3xl">
              {{ paragraph }}
            </p>

            <template v-if="item.steps?.length">
              <p v-if="item.stepsTitle" class="text-ink font-semibold mt-6 mb-3">{{ item.stepsTitle }}</p>
              <ol class="grid lg:grid-cols-2 gap-x-8 gap-y-2">
                <li v-for="(step, i) in item.steps" :key="step" class="flex items-start gap-3 text-sm text-slate">
                  <span class="shrink-0 w-6 h-6 rounded-full bg-amber/15 text-amber-ink font-semibold text-xs flex items-center justify-center">
                    {{ i + 1 }}
                  </span>
                  <span class="pt-0.5">{{ step }}</span>
                </li>
              </ol>
            </template>

            <div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <RouterLink
                :to="item.primaryLink.href"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 bg-amber text-ink hover:bg-amber-hover shadow-lg shadow-amber/30"
              >
                {{ item.primaryLink.label }} &rarr;
              </RouterLink>
              <RouterLink
                v-if="item.secondaryLink"
                :to="item.secondaryLink.href"
                class="text-ink font-semibold text-sm hover:underline"
              >
                {{ item.secondaryLink.label }}
              </RouterLink>
              <a
                v-if="item.videoLink"
                :href="item.videoLink.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-ink font-semibold text-sm hover:underline"
              >
                <span aria-hidden="true" class="w-7 h-7 rounded-full border-[1.5px] border-ink flex items-center justify-center text-[10px] pl-0.5">&#9654;</span>
                {{ item.videoLink.label }}<span class="text-slate text-xs">↗</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
