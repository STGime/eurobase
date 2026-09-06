/// <reference types="vite-ssg" />
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
// Relative import (not `@/…`) — vite.config.ts loads before the
// `@/*` alias is installed, so alias resolution isn't available yet.
import { getRouteMeta, getDynamicRoutes } from './src/seo/routeMeta.js'

// vite-ssg reads the same config as vite (via `ssgOptions` field).
// The build script runs `vite-ssg build` (see package.json), which
// starts a Node SSR pass to pre-render one HTML file per route, then
// invokes onPageRendered to rewrite the shell's canonical/title/meta
// for that route before the file is persisted.
//
// The SEO fix this closes: index.html's homepage-shell <link rel="canonical">
// (and title / description / OG) used to be baked into every SPA route.
// Googlebot's initial parse saw /pricing, /vs/supabase, /blog/* all
// claiming rel=canonical → homepage. That's the 24 "Alternate page
// with proper canonical tag" pile in Search Console.

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const config: UserConfig = {
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    formatting: 'minify',
    // Mock window/document during SSG so page components' watchEffect
    // blocks that mutate document.head don't spam ReferenceError
    // warnings. Their mutations are ignored server-side (we own the
    // authoritative shell rewrite via onPageRendered); the same code
    // runs correctly on hydration.
    mock: true,
    // Nested output: /pricing → /pricing/index.html. Matches the
    // canonical URL shape we advertise (no trailing .html) and works
    // with nginx's `try_files $uri $uri/ /index.html` fallback.
    dirStyle: 'nested',
    // vite-ssg by default filters out dynamic (`:slug`) routes. Add
    // them back by enumerating every blog + comparison slug.
    includedRoutes(paths, _routes) {
      // When we provide our own includedRoutes hook, vite-ssg's
      // default `:`-template filter is skipped — so `paths` includes
      // `/blog/:slug` etc. and would emit literal `dist/blog/:slug/…`
      // files. Strip those, then add the expanded slug list.
      const staticOnly = paths.filter((p) => !p.includes(':'))
      const dynamic = getDynamicRoutes()
      const set = new Set([...staticOnly, ...dynamic])
      // Drop the /impressum redirect — pre-rendering a redirect route
      // would emit a shell page at that URL, defeating the 301.
      set.delete('/impressum')
      return [...set]
    },
    // Rewrite the shell's per-page meta before persisting each route.
    // Client-side page components still update document.head on SPA
    // navigation; those writes idempotently overwrite what we set
    // here.
    onPageRendered(route, renderedHTML) {
      const meta = getRouteMeta(route)
      if (!meta) return renderedHTML

      let html = renderedHTML

      // Canonical — always rewrite (this is the primary fix). If the
      // shell tag is missing for any reason, inject one.
      const canonicalTag = `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`
      if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
        html = html.replace(/<link\s+rel="canonical"[^>]*>/i, canonicalTag)
      } else {
        html = html.replace(/<\/head>/i, `  ${canonicalTag}\n  </head>`)
      }

      // Title + description + OG + Twitter — only override when the
      // route-meta module supplied a non-empty value (unknown routes
      // fall through to the shell defaults for these).
      if (meta.title) {
        html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`)
      }
      if (meta.description) {
        html = html.replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
          `<meta name="description" content="${escapeAttr(meta.description)}" />`,
        )
      }
      html = html.replace(
        /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
      )
      if (meta.ogTitle) {
        html = html.replace(
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
          `<meta property="og:title" content="${escapeAttr(meta.ogTitle)}" />`,
        )
        html = html.replace(
          /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
          `<meta name="twitter:title" content="${escapeAttr(meta.ogTitle)}" />`,
        )
      }
      if (meta.ogDescription) {
        html = html.replace(
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
          `<meta property="og:description" content="${escapeAttr(meta.ogDescription)}" />`,
        )
        html = html.replace(
          /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
          `<meta name="twitter:description" content="${escapeAttr(meta.ogDescription)}" />`,
        )
      }
      html = html.replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:image" content="${escapeAttr(meta.ogImage)}" />`,
      )
      html = html.replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:image" content="${escapeAttr(meta.ogImage)}" />`,
      )
      html = html.replace(
        /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:type" content="${meta.ogType}" />`,
      )

      return html
    },
  },
}

export default defineConfig(config)
