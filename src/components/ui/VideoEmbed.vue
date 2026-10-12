<script setup lang="ts">
import { ref } from 'vue'

// Click-to-play YouTube player. Until the visitor presses play we
// show our own poster image and nothing is requested from Google;
// after the click the player loads from youtube-nocookie.com. On a
// site that sells EU data sovereignty, a third-party iframe that
// fires on page load would be the wrong default.
defineProps<{
  youtubeId: string
  title: string
  poster: string
}>()

const playing = ref(false)
</script>

<template>
  <div class="relative aspect-video rounded-lg overflow-hidden bg-ink border border-line shadow-sm">
    <iframe
      v-if="playing"
      :src="`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`"
      :title="title"
      class="absolute inset-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowfullscreen
    />
    <button
      v-else
      type="button"
      class="group absolute inset-0 w-full h-full cursor-pointer"
      :aria-label="`Play video: ${title}`"
      @click="playing = true"
    >
      <img :src="poster" alt="" class="absolute inset-0 w-full h-full object-cover" />
      <span class="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors" />
      <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-amber text-ink shadow-lg shadow-ink/40 flex items-center justify-center text-2xl pl-1 group-hover:bg-amber-hover transition-colors">
        &#9654;
      </span>
      <span class="absolute left-3 bottom-3 rounded bg-ink/80 text-paper text-xs px-2 py-1">
        Plays from YouTube
      </span>
    </button>
  </div>
</template>
