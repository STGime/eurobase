<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// Floating "Contact" widget for the marketing site. Renders a small
// pill in the bottom-right corner on every page (via App.vue); click
// opens a compact modal with name (optional) + email + message.
// Submit POSTs to the public /platform/public/contact endpoint, which
// rate-limits by IP + email and fires a Discord ping to ops.
//
// Deliberately no client-side email format validation beyond
// non-empty presence — the server owns the strict validator
// (mail.ParseAddress + canonicalisation) and returns field-specific
// 400s. Any client-side second guess drifts from the server contract
// over time.

// API base — env override so `npm run dev` doesn't ping production
// Discord. Wire VITE_CONTACT_API in a .env.local for staging or a
// tunneled backend.
const API_URL =
  (import.meta.env.VITE_CONTACT_API as string | undefined) ||
  'https://api.eurobase.app/platform/public/contact'

const open = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const errorMsg = ref<string | null>(null)

const name = ref('')
const email = ref('')
const message = ref('')

// Focus target when the modal opens — email input gets focus so a
// keyboard user can start typing immediately.
const emailInputEl = ref<HTMLInputElement | null>(null)

// Track the DOM element that had focus before opening so we can
// restore focus on close — required-for-aria-modal correctness.
let previouslyFocused: HTMLElement | null = null

// Success timer needs to be tracked so a manual close-then-reopen
// doesn't get snapped shut by the stale timer, and so unmount doesn't
// leak it. Cleared in closeWidget, resetForm, and onBeforeUnmount.
let successTimer: ReturnType<typeof setTimeout> | null = null
function clearSuccessTimer() {
  if (successTimer !== null) {
    clearTimeout(successTimer)
    successTimer = null
  }
}

async function openWidget() {
  previouslyFocused = (document.activeElement as HTMLElement) ?? null
  open.value = true
  errorMsg.value = null
  // Body-scroll lock while the modal is up — matters most on the
  // mobile bottom-sheet layout where the page underneath can scroll
  // past the widget.
  document.body.style.overflow = 'hidden'
  await nextTick()
  emailInputEl.value?.focus()
}

function closeWidget() {
  open.value = false
  clearSuccessTimer()
  document.body.style.overflow = ''
  // Restore focus to whatever launched the modal (usually the "Contact
  // us" trigger button). Fire-and-forget — if the element is gone,
  // the browser silently no-ops.
  if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
    previouslyFocused.focus()
  }
  previouslyFocused = null
  // Preserve the draft in state if the user closes without sending
  // — reopening restores what they typed. Only cleared on a real
  // successful submit (via resetForm).
}

function resetForm() {
  name.value = ''
  email.value = ''
  message.value = ''
  submitted.value = false
  errorMsg.value = null
  clearSuccessTimer()
}

async function submit(e: Event) {
  e.preventDefault()
  if (submitting.value) return

  errorMsg.value = null
  const trimmedEmail = email.value.trim()
  const trimmedMessage = message.value.trim()

  if (!trimmedEmail || !trimmedMessage) {
    errorMsg.value = 'Email and message are both required.'
    return
  }

  submitting.value = true
  try {
    const body: Record<string, string> = {
      email: trimmedEmail,
      message: trimmedMessage,
    }
    const trimmedName = name.value.trim()
    if (trimmedName) body.name = trimmedName

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 201) {
      submitted.value = true
      // Reset the input state after a short delay so the "sent"
      // confirmation reads for a beat before the widget auto-hides.
      // Timer is tracked so manual close-then-reopen doesn't fire a
      // stale close on the new session (reviewer finding).
      clearSuccessTimer()
      successTimer = setTimeout(() => {
        successTimer = null
        resetForm()
        closeWidget()
      }, 2400)
      return
    }

    // 400: validation. 429: rate limit. Everything else: generic.
    let apiMsg = ''
    try {
      const j = await res.json()
      if (j?.error) apiMsg = String(j.error)
    } catch {
      /* body was not json; fall through */
    }
    if (res.status === 429) {
      errorMsg.value = apiMsg || 'Too many messages — please try again later.'
    } else if (res.status === 400) {
      errorMsg.value = apiMsg || 'Please check the form and try again.'
    } else {
      errorMsg.value = apiMsg || 'Something went wrong. Please try again.'
    }
  } catch {
    errorMsg.value = 'Network error — please check your connection and try again.'
  } finally {
    submitting.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  // Skip while an IME composition is active (CJK / Vietnamese /
  // dead-key input) — Escape during composition means "cancel this
  // half-typed character", not "close the modal".
  if (e.isComposing || e.keyCode === 229) return
  if (e.key === 'Escape' && open.value) {
    closeWidget()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearSuccessTimer()
  // Belt-and-braces: restore body scroll on route-change unmount too,
  // in case the widget goes away while open.
  if (open.value) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <!-- Floating trigger — visible on every marketing page via App.vue.
       Hidden while the modal is open so it doesn't overlay itself. -->
  <button
    v-show="!open"
    type="button"
    aria-label="Contact us"
    class="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 hover:bg-accent-blue/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
    @click="openWidget"
  >
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
    Contact us
  </button>

  <!-- Modal — semi-opaque backdrop, closable by clicking outside,
       Escape, or the × button. Traps nothing (small form, quick
       flow) but focuses the email input on open. -->
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-end sm:p-6"
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-widget-title"
  >
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeWidget"></div>

    <div class="relative w-full max-w-sm rounded-2xl bg-navy-light border border-white/10 shadow-2xl p-5 space-y-4">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 id="contact-widget-title" class="text-lg font-semibold text-text-white font-heading">
            Send us a message
          </h2>
          <p class="mt-1 text-xs text-text-light/70">
            Questions, feedback, procurement — we read every one.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close"
          class="rounded-md p-1 text-text-light/60 hover:text-text-white hover:bg-white/5 transition-colors"
          @click="closeWidget"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Success state -->
      <div
        v-if="submitted"
        class="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200"
        role="status"
      >
        <p class="font-medium">Message sent — thanks.</p>
        <p class="mt-1 text-emerald-200/80">
          We'll get back to you at the email you provided.
        </p>
      </div>

      <!-- Form -->
      <form v-else class="space-y-3" @submit="submit" novalidate>
        <div>
          <label for="cw-name" class="block text-xs font-medium text-text-light/80 mb-1">
            Name <span class="text-text-light/40 font-normal">(optional)</span>
          </label>
          <input
            id="cw-name"
            v-model="name"
            type="text"
            maxlength="200"
            autocomplete="name"
            class="w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-text-white placeholder:text-text-light/40 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
          />
        </div>

        <div>
          <label for="cw-email" class="block text-xs font-medium text-text-light/80 mb-1">
            Email
          </label>
          <input
            id="cw-email"
            ref="emailInputEl"
            v-model="email"
            type="email"
            required
            maxlength="254"
            autocomplete="email"
            placeholder="you@company.eu"
            class="w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-text-white placeholder:text-text-light/40 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/50"
          />
        </div>

        <div>
          <label for="cw-message" class="block text-xs font-medium text-text-light/80 mb-1">
            Message
          </label>
          <textarea
            id="cw-message"
            v-model="message"
            required
            rows="4"
            maxlength="5000"
            placeholder="What's on your mind?"
            class="w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-text-white placeholder:text-text-light/40 focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue/50 resize-none"
          ></textarea>
          <p class="mt-1 text-[10px] text-text-light/40 text-right">
            {{ message.length }} / 5000
          </p>
        </div>

        <p v-if="errorMsg" class="text-xs text-red-400" role="alert">
          {{ errorMsg }}
        </p>

        <div class="flex items-center justify-between gap-3 pt-1">
          <p class="text-[10px] text-text-light/50 leading-tight">
            By sending you accept our
            <a
              href="/privacy"
              target="_blank"
              rel="noopener"
              class="underline hover:text-text-light/80"
            >privacy notice</a>.
          </p>
          <button
            type="submit"
            :disabled="submitting"
            class="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-4 py-2 text-sm font-medium text-white hover:bg-accent-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-light"
          >
            <svg
              v-if="submitting"
              class="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ submitting ? 'Sending…' : 'Send' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
