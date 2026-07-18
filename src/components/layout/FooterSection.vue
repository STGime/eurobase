<script setup lang="ts">
</script>

<template>
  <footer aria-label="Site footer" class="bg-navy-footer border-t border-navy-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div class="md:col-span-1">
          <RouterLink to="/" class="inline-block mb-4">
            <span class="text-xl font-bold text-text-white font-heading">euro</span><span class="text-xl font-bold text-accent-gold font-heading">base</span>
          </RouterLink>
          <p class="text-text-muted text-sm leading-relaxed">
            The sovereign backend platform for Europe. Built with privacy and compliance at the core.
          </p>
          <div class="mt-4 flex items-center gap-2">
            <span class="text-xs bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">EU-Native</span>
            <span class="text-xs bg-accent-gold/20 text-accent-gold px-2 py-1 rounded">GDPR-Ready</span>
          </div>
        </div>

        <div>
          <h4 class="text-text-white font-semibold text-sm mb-4">Product</h4>
          <ul class="space-y-2">
            <li><a href="/#solution" class="text-text-muted text-sm hover:text-text-white transition-colors">Features</a></li>
            <li><a href="/#pricing" class="text-text-muted text-sm hover:text-text-white transition-colors">Pricing</a></li>
            <li><a href="/#developers" class="text-text-muted text-sm hover:text-text-white transition-colors">Documentation</a></li>
            <li><a href="/#vision" class="text-text-muted text-sm hover:text-text-white transition-colors">Roadmap</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-text-white font-semibold text-sm mb-4">Compare</h4>
          <ul class="space-y-2">
            <li><RouterLink to="/vs/supabase" class="text-text-muted text-sm hover:text-text-white transition-colors">Eurobase vs Supabase</RouterLink></li>
            <li><RouterLink to="/vs/firebase" class="text-text-muted text-sm hover:text-text-white transition-colors">Eurobase vs Firebase</RouterLink></li>
            <li><RouterLink to="/faq" class="text-text-muted text-sm hover:text-text-white transition-colors">FAQ</RouterLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-text-white font-semibold text-sm mb-4">Company</h4>
          <ul class="space-y-2">
            <li><a href="/#enterprise" class="text-text-muted text-sm hover:text-text-white transition-colors">Enterprise</a></li>
            <li><a href="/#market" class="text-text-muted text-sm hover:text-text-white transition-colors">Market</a></li>
            <li><a href="mailto:hello@eurobase.app" class="text-text-muted text-sm hover:text-text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-text-white font-semibold text-sm mb-4">Legal</h4>
          <ul class="space-y-2">
            <li><RouterLink to="/privacy" class="text-text-muted text-sm hover:text-text-white transition-colors">Privacy Policy</RouterLink></li>
            <li><RouterLink to="/terms" class="text-text-muted text-sm hover:text-text-white transition-colors">Terms &amp; Conditions</RouterLink></li>
            <li><RouterLink to="/legal" class="text-text-muted text-sm hover:text-text-white transition-colors">Legal notice</RouterLink></li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-navy-light flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-text-muted text-xs">
          &copy; {{ new Date().getFullYear() }} Eurobase. All rights reserved. European-owned and operated.
        </p>
        <p class="text-text-muted text-xs">
          All layers sourced from EU-owned or EU-hosted providers — zero US CLOUD Act exposure.
        </p>
      </div>
    </div>
  </footer>
</template>
