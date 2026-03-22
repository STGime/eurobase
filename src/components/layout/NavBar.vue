<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { nav } from '@/data/content'
import WaitingListModal from '@/components/WaitingListModal.vue'

const route = useRoute()
const router = useRouter()
const { y } = useWindowScroll()
const { scrollToSection } = useSmoothScroll()
const mobileMenuOpen = ref(false)
const showModal = ref(false)

function handleNav(href: string) {
  mobileMenuOpen.value = false
  const sectionId = href.replace('#', '')
  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${sectionId}` })
  } else {
    scrollToSection(sectionId)
  }
}

function handleLogoClick() {
  if (route.path !== '/') {
    router.push('/')
  } else {
    scrollToSection('hero')
  }
}

function openModal() {
  mobileMenuOpen.value = false
  showModal.value = true
}
</script>

<template>
  <nav
    aria-label="Main navigation"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="y > 50 ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="#" class="inline-block" @click.prevent="handleLogoClick">
          <span class="text-xl font-bold text-text-white font-heading">euro</span><span class="text-xl font-bold text-accent-gold font-heading">base</span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="link in nav.links"
            :key="link.href"
            :href="link.href"
            class="text-sm text-text-muted hover:text-text-white transition-colors"
            @click.prevent="handleNav(link.href)"
          >
            {{ link.label }}
          </a>
          <button
            class="inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25"
            @click="openModal"
          >
            Get Early Access
          </button>
        </div>

        <button
          class="md:hidden text-text-light p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="md:hidden bg-navy-card border-t border-navy-light">
        <div class="px-4 py-4 space-y-3">
          <a
            v-for="link in nav.links"
            :key="link.href"
            :href="link.href"
            class="block text-sm text-text-muted hover:text-text-white transition-colors py-2"
            @click.prevent="handleNav(link.href)"
          >
            {{ link.label }}
          </a>
          <button
            class="w-full text-center mt-3 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25"
            @click="openModal"
          >
            Get Early Access
          </button>
        </div>
      </div>
    </Transition>
  </nav>

  <WaitingListModal :open="showModal" source="nav" @close="showModal = false" />
</template>
