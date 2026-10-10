<script setup lang="ts">
import { differentiators } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

</script>

<template>
  <section id="differentiators" aria-labelledby="heading-differentiators" class="py-24 bg-paper">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <SectionHeading
          id="heading-differentiators"
          :heading="differentiators.headline"
        />
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <AccentCard
          v-for="(item, i) in differentiators.items"
          :key="item.title"
         
         
        >
          <h3 class="text-ink font-bold text-sm mb-2 font-heading">{{ item.title }}</h3>
          <p class="text-slate text-xs leading-relaxed">{{ item.description }}</p>
        </AccentCard>
      </div>
    </div>
  </section>
</template>
