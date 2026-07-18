<script setup lang="ts">
import { computed } from 'vue'
import { blog } from '@/data/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const { elementRef, isVisible } = useScrollReveal()

// The Supabase-GDPR post is pinned first because "supabase eu*" is
// our highest-intent SEO cluster (per Search Console) and this post
// is the direct answer to it. Rotate this slug as the SEO priority
// shifts. Remaining posts: newest first regardless of order in
// content.ts.
const PINNED_SLUG = 'supabase-gdpr-dpa-eu-region'
const sortedPosts = computed(() => {
  const pinned = blog.posts.find(p => p.slug === PINNED_SLUG)
  const rest = blog.posts
    .filter(p => p.slug !== PINNED_SLUG)
    .sort((a, b) => b.date.localeCompare(a.date))
  return pinned ? [pinned, ...rest] : rest
})

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
