<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import FooterSection from '@/components/layout/FooterSection.vue'
import ContactWidget from '@/components/layout/ContactWidget.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <FooterSection />
  <ContactWidget />
</template>
