<script setup lang="ts">
import { enterprise } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AccentCard from '@/components/ui/AccentCard.vue'

</script>

<template>
  <section id="enterprise" aria-labelledby="heading-enterprise" class="py-24 bg-paper">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <SectionHeading
          id="heading-enterprise"
          :heading="enterprise.headline"
          :description="enterprise.description"
        />
      </div>

      <div class="grid md:grid-cols-2 gap-10 mb-12">
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="(feature, i) in enterprise.features"
            :key="feature.name"
            class="flex items-center gap-4 bg-mist rounded-lg px-5 py-4"
          >
            <span class="text-ink">{{ feature.name }}</span>
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <p
            class="text-slate text-lg leading-relaxed mb-8"
          >
            Modernize your applications while keeping sensitive data within European jurisdiction.
          </p>
          <p
            class="text-amber-ink font-semibold text-lg"
          >
            {{ enterprise.footer }}
          </p>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <AccentCard
          v-for="(prop, i) in enterprise.valueProp"
          :key="prop.title"
         
         
        >
          <h3 class="text-ink font-bold mb-2 font-heading">{{ prop.title }}</h3>
          <p class="text-slate text-sm">{{ prop.description }}</p>
        </AccentCard>
      </div>
    </div>
  </section>
</template>
