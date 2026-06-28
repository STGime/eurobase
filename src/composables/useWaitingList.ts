import { ref } from 'vue'
import { neon } from '@neondatabase/serverless'

const dbUrl = import.meta.env.VITE_NEON_DATABASE_URL
const sql = dbUrl ? neon(dbUrl) : null

export type UserType = 'solo_developer' | 'startup' | 'smb' | 'enterprise' | 'agency' | 'other'

export const userTypeOptions: { value: UserType; label: string }[] = [
  { value: 'solo_developer', label: 'Solo Developer' },
  { value: 'startup', label: 'Startup' },
  { value: 'smb', label: 'SMB (Small/Medium Business)' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'agency', label: 'Agency / Consultancy' },
  { value: 'other', label: 'Other' },
]

export function useWaitingList() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const alreadyRegistered = ref(false)

  async function submit(email: string, userType: UserType, source = 'cta') {
    error.value = null
    success.value = false
    alreadyRegistered.value = false

    if (!email || !email.includes('@')) {
      error.value = 'Please enter a valid email address.'
      return
    }

    if (!userType) {
      error.value = 'Please select your user type.'
      return
    }

    loading.value = true

    try {
      if (!sql) {
        error.value = 'Waiting list is temporarily unavailable. Please try again later.'
        return
      }
      await sql`
        INSERT INTO waiting_list (email, user_type, source)
        VALUES (${email}, ${userType}, ${source})
      `
      success.value = true
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('23505') || msg.toLowerCase().includes('unique') || msg.toLowerCase().includes('duplicate')) {
        alreadyRegistered.value = true
        success.value = true
      } else {
        error.value = 'Something went wrong. Please try again.'
        console.error('Waiting list error:', e)
      }
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    error.value = null
    success.value = false
    alreadyRegistered.value = false
  }

  return { loading, error, success, alreadyRegistered, submit, reset }
}
