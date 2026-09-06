import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior, installClientNavGuards } from './router'
import './assets/main.css'

// ViteSSG bootstrap. Same App + routes; the difference is that this
// factory runs on the server during `vite-ssg build` to pre-render
// one HTML file per route (with correct per-route canonical/title
// injected in vite.config.ts's onPageRendered), then hydrates on the
// client. Client-side navigation behavior is unchanged.
export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router }) => {
    installClientNavGuards(router)
  },
)
