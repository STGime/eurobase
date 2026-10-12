<script setup lang="ts">
import { usePageTitle } from '@/composables/usePageTitle'
import VideoEmbed from '@/components/ui/VideoEmbed.vue'

// Keep in sync with the '/integrations/lovable' entry in
// src/seo/routeMeta.ts (that one is what crawlers see).
usePageTitle('Lovable with an EU backend: connect Lovable to Eurobase')

const SIGNUP_URL = 'https://console.eurobase.app/login?signup=1'

// The same six steps as Connect → Lovable in the console. If that page
// changes, change this list too.
const steps = [
  {
    title: 'Tell Lovable not to create its own backend',
    body: 'In Lovable open Connectors → Cloud → Manage my agent\'s permissions and set "Enable Cloud" to "Ask each time". If it asks later, say no. If you skip this, the first time you ask for a login screen your users land in Lovable Cloud.',
  },
  {
    title: 'Copy the three .env lines',
    body: 'Connect → Lovable shows VITE_EUROBASE_URL, VITE_EUROBASE_PROJECT_ID and VITE_EUROBASE_PUBLIC_KEY for your project. Copy them into the Lovable project. The public key starts with eb_pk_ and it is the only key that goes in there.',
  },
  {
    title: 'Add the Eurobase skill',
    body: 'Lovable knows supabase-js very well and our SDK not at all, so it needs a short manual. Copy SKILL.md from the Connect page into Project settings → Knowledge. Workspace owners and admins can add it as a workspace skill instead, then all projects have it.',
  },
  {
    title: 'Connect the MCP server',
    body: 'Connectors → + → MCP server. The server URL is https://mcp.eurobase.app/mcp and the authentication is "Bearer token". The Connect page creates the token for you. It only works for this one project, with Developer access, so Lovable can read and create tables there and nothing else.',
  },
  {
    title: 'Allow your app\'s URLs',
    body: 'Paste your Lovable editor URL and your published URL into the Connect page and press "Add to allowed URLs". A Lovable app lives on four or five different addresses and the console adds all of them, so you don\'t have to hunt for them.',
  },
  {
    title: 'Send the first prompt',
    body: 'The Connect page has a first prompt ready to copy. It tells Lovable to use the skill and to use Eurobase instead of Lovable Cloud. Add what you want to build and go.',
  },
]

const notes = [
  {
    q: 'Do I have to be a workspace admin in Lovable?',
    a: 'No. Admin rights are only neccessary if you want the skill in every project of the workspace. For one project you paste SKILL.md into the project Knowledge and that is enough.',
  },
  {
    q: 'Why can\'t I just allow *.lovable.app?',
    a: 'Because anybody can publish an app on lovable.app. A wildcard would let every one of those apps talk to your backend, so we don\'t accept it. You need the exact addresses, and the Connect page works them out for you.',
  },
  {
    q: 'I need to change the token.',
    a: 'Lovable can\'t edit an MCP connection after it is created. Delete the connector and add it again with the new token.',
  },
  {
    q: 'I renamed or unpublished my Lovable app.',
    a: 'Then please remove the old addresses under Auth in the Eurobase console. Somebody else could take the old name later, and you definately don\'t want that address still on your allow list.',
  },
  {
    q: 'Where do secret keys go?',
    a: 'Not into Lovable. Keys that start with eb_sk_ belong in an edge function. The same goes for API keys of other services, like a payment provider.',
  },
]
</script>

<template>
  <main class="pt-24 pb-16 bg-paper min-h-screen">
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <RouterLink to="/" class="text-amber-ink text-sm hover:underline mb-6 inline-block">
        &larr; Back to home
      </RouterLink>
      <p class="text-amber-ink font-semibold text-sm mb-3">Integration: Lovable</p>
      <h1 class="text-4xl md:text-5xl font-bold text-ink mb-5 font-heading leading-tight">
        Build with Lovable, keep the data in Europe
      </h1>
      <p class="text-lg text-slate leading-relaxed max-w-3xl mb-4">
        Lovable normally stores your app's data in Lovable Cloud or in Supabase. Both work well.
        But Lovable Cloud runs on Supabase, Supabase is a US company on AWS, and for a lot of
        European projects that is a problem.
      </p>
      <p class="text-lg text-slate leading-relaxed max-w-3xl">
        You can use Eurobase as the backend instead. The setup is six steps and takes about
        6-7 minutes. I recorded all of it:
      </p>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <VideoEmbed
        youtube-id="pG7lmA7A3aE"
        title="Connect Lovable to Eurobase"
        poster="/blog-lovable-eurobase.jpg"
      />
      <p class="text-sm text-slate mt-3">
        The video only loads from YouTube when you press play.
        <a href="https://youtu.be/pG7lmA7A3aE" target="_blank" rel="noopener noreferrer" class="text-amber-ink hover:underline">Open it on YouTube</a>
        if you prefer that.
      </p>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <h2 class="text-ink font-bold text-2xl font-heading mb-2">The six steps</h2>
      <p class="text-slate mb-8 max-w-3xl">
        You need a Eurobase project first.
        <a :href="SIGNUP_URL" class="text-amber-ink hover:underline">Sign up</a>
        (free, no credit card), create a project and open <strong class="text-ink">Connect → Lovable</strong>.
        That page has all the values below filled in for your project, so keep it open in a second tab.
      </p>

      <ol class="space-y-6">
        <li v-for="(step, i) in steps" :key="step.title" class="flex gap-4">
          <span class="shrink-0 w-8 h-8 rounded-full bg-amber/15 text-amber-ink font-bold text-sm flex items-center justify-center">
            {{ i + 1 }}
          </span>
          <div>
            <h3 class="text-ink font-semibold text-lg mb-1">{{ step.title }}</h3>
            <p class="text-slate leading-relaxed">{{ step.body }}</p>
          </div>
        </li>
      </ol>

      <p class="text-slate mt-8 max-w-3xl">
        After that you work in Lovable like before. Login, database, file uploads, realtime and
        functions run on Eurobase, on Scaleway servers in France.
        The <RouterLink to="/blog/lovable-on-eurobase-eu-backend-setup-guide" class="text-amber-ink hover:underline">blog post</RouterLink>
        goes through the same steps with a bit more background.
      </p>
    </section>

    <section class="bg-mist border-y border-line py-14 mb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-ink font-bold text-2xl font-heading mb-8">Things people ask</h2>
        <dl class="space-y-6">
          <div v-for="note in notes" :key="note.q">
            <dt class="text-ink font-semibold mb-1">{{ note.q }}</dt>
            <dd class="text-slate leading-relaxed max-w-3xl">{{ note.a }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-ink font-bold text-2xl font-heading mb-3">Try it with your next project</h2>
      <p class="text-slate leading-relaxed max-w-3xl mb-6">
        The free tier is enough to build and test a Lovable app. Every project also gets the GDPR
        tools: the <RouterLink to="/features/dsar" class="text-amber-ink hover:underline">one-click data export</RouterLink>,
        the Article 30 report and the audit log. If something in the setup doesn't work, write to
        <a href="mailto:hello@eurobase.app" class="text-amber-ink hover:underline">hello@eurobase.app</a>
        and we will help.
      </p>
      <a
        :href="SIGNUP_URL"
        class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 bg-amber text-ink hover:bg-amber-hover shadow-lg shadow-amber/30"
      >
        Sign up free
      </a>
    </section>
  </main>
</template>
