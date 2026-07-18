<script setup lang="ts">
import { computed } from 'vue'
import { blog } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { elementRef, isVisible } = useScrollReveal()

// Strict newest-first ordering. We used to pin a specific slug on top
// to promote a high-intent SEO piece, but chronological order is
// clearer for readers and stops old posts overshadowing new drops.
// If we ever want to re-pin, restore PINNED_SLUG + the two-array
// concat here (git history has the shape).
const sortedPosts = computed(() =>
  [...blog.posts].sort((a, b) => b.date.localeCompare(a.date)),
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <section id="blog" aria-labelledby="heading-blog" class="py-24 bg-navy" ref="elementRef">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center" :class="isVisible ? 'animate-fade-in-up' : 'opacity-0'">
        <SectionHeading
          id="heading-blog"
          subtitle="Blog"
          :heading="blog.headline"
          :description="blog.description"
          class="mx-auto"
        />
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <RouterLink
          v-for="(post, i) in sortedPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="group bg-navy-card rounded-lg border border-navy-light overflow-hidden hover:border-accent-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/5"
          :class="isVisible ? `animate-fade-in-up stagger-${i + 1}` : 'opacity-0'"
        >
          <div class="p-6">
            <div class="flex items-center gap-3 text-xs text-text-muted mb-3">
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span>·</span>
              <span>{{ post.readTime }}</span>
            </div>
            <h3 class="text-text-white font-bold text-lg font-heading mb-3 group-hover:text-accent-blue transition-colors leading-snug">
              {{ post.title }}
            </h3>
            <p class="text-text-muted text-sm leading-relaxed mb-4">
              {{ post.excerpt }}
            </p>
            <span class="text-accent-blue text-sm font-semibold group-hover:underline">
              Read more &rarr;
            </span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
