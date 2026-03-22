<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useWaitingList, userTypeOptions } from '@/composables/useWaitingList'
import type { UserType } from '@/composables/useWaitingList'

const props = defineProps<{
  open: boolean
  source?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const email = ref('')
const userType = ref<UserType | ''>('')
const emailInput = ref<HTMLInputElement | null>(null)

const { loading, error, success, alreadyRegistered, submit, reset } = useWaitingList()

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    reset()
    email.value = ''
    userType.value = ''
    await nextTick()
    emailInput.value?.focus()
  }
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}

async function handleSubmit() {
  if (!userType.value) {
    error.value = 'Please select your user type.'
    return
  }
  await submit(email.value, userType.value as UserType, props.source ?? 'cta')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @keydown="handleKeydown"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <!-- Modal -->
        <div
          class="relative w-full max-w-md bg-navy-card border border-navy-light rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
          role="dialog"
          aria-modal="true"
          :aria-label="success ? 'Signup confirmed' : 'Join the waiting list'"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 text-text-muted hover:text-text-white transition-colors z-10"
            @click="emit('close')"
            aria-label="Close"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Success State -->
          <div v-if="success" class="p-8 text-center">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-green/10 flex items-center justify-center">
              <svg class="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-text-white mb-2 font-heading">
              {{ alreadyRegistered ? "You're already on the list!" : "You're on the list!" }}
            </h3>
            <p class="text-text-muted text-sm">
              {{ alreadyRegistered
                ? "We already have your email. We'll reach out when eurobase is ready."
                : "Thanks for signing up! We'll notify you when eurobase launches."
              }}
            </p>
            <button
              class="mt-6 px-6 py-2.5 bg-accent-blue text-white rounded-lg text-sm font-semibold hover:bg-accent-blue-hover transition-colors"
              @click="emit('close')"
            >
              Got it
            </button>
          </div>

          <!-- Form State -->
          <div v-else class="p-8">
            <h3 class="text-xl font-bold text-text-white mb-1 font-heading">Join the Waiting List</h3>
            <p class="text-text-muted text-sm mb-6">Be the first to know when eurobase launches.</p>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="wl-email" class="block text-sm text-text-light mb-1.5">Email</label>
                <input
                  id="wl-email"
                  ref="emailInput"
                  v-model="email"
                  type="email"
                  required
                  placeholder="you@startup.eu"
                  class="w-full bg-navy border border-navy-light rounded-lg px-4 py-2.5 text-text-white placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label for="wl-user-type" class="block text-sm text-text-light mb-1.5">I am a…</label>
                <select
                  id="wl-user-type"
                  v-model="userType"
                  required
                  class="w-full bg-navy border border-navy-light rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-shadow appearance-none"
                  :class="userType ? 'text-text-white' : 'text-text-muted'"
                >
                  <option value="" disabled>Select your type</option>
                  <option
                    v-for="opt in userTypeOptions"
                    :key="opt.value"
                    :value="opt.value"
                    class="text-text-white bg-navy-card"
                  >
                    {{ opt.label }}
                  </option>
                </select>
              </div>

              <!-- Error message -->
              <p v-if="error" class="text-accent-red text-sm" role="alert">{{ error }}</p>

              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 bg-accent-blue text-white rounded-lg font-semibold text-sm hover:bg-accent-blue-hover transition-colors shadow-lg shadow-accent-blue/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ loading ? 'Joining…' : 'Join the Waiting List' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
