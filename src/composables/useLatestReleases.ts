import { onMounted, reactive } from 'vue'

// Latest released versions of the SDK and the CLI, from the platform
// (GET /v1/meta/releases — the gateway reads npm and the CLI's releases and
// caches them, so visitors' browsers never contact those). Pages are
// pre-rendered, so the fallback below is what the HTML carries; the live
// versions replace it in the browser.
export const FALLBACK_SDK_VERSION = '0.13.1'
export const FALLBACK_CLI_VERSION = '0.7.1'

const API_URL =
  (import.meta.env.VITE_RELEASES_API as string | undefined) ||
  'https://api.eurobase.app/v1/meta/releases'

const VERSION = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/

const state = reactive({
  sdk: FALLBACK_SDK_VERSION,
  cli: FALLBACK_CLI_VERSION,
  sdkUrl: 'https://www.npmjs.com/package/@eurobase/sdk',
  cliUrl: 'https://github.com/STGime/homebrew-tap/releases/latest',
  live: false,
})

let requested = false

export function useLatestReleases() {
  onMounted(() => {
    if (requested) return
    requested = true
    fetch(API_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (!body) return
        if (body.sdk && VERSION.test(body.sdk.version)) {
          state.sdk = body.sdk.version
          if (typeof body.sdk.url === 'string' && body.sdk.url.startsWith('https://')) state.sdkUrl = body.sdk.url
        }
        if (body.cli && VERSION.test(body.cli.version)) {
          state.cli = body.cli.version
          if (typeof body.cli.url === 'string' && body.cli.url.startsWith('https://')) state.cliUrl = body.cli.url
        }
        state.live = true
      })
      .catch(() => {
        // Offline or blocked: the fallback versions stay.
      })
  })
  return state
}
