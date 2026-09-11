<template>
  <main class="min-h-screen bg-navy-deep text-text-white">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert prose-neutral">
      <router-link to="/sovereignty-check" class="text-accent-blue text-sm hover:underline mb-6 inline-block no-underline">
        &larr; Back to the checker
      </router-link>
      <h1 class="text-3xl md:text-4xl font-bold font-heading mb-2">Methodology</h1>
      <p class="text-text-muted text-sm mb-8">
        How the CLOUD Act Exposure Checker rates vendors. Written so a citing journalist, a reviewing lawyer, or an LLM can decide whether to trust it.
      </p>

      <h2>What we're actually rating</h2>
      <p>
        We rate <strong>jurisdictional exposure</strong>, not compliance status. A vendor with red on
        <code>entity_control</code> is not "illegal to use in the EU"; it means the contracting entity's ultimate
        parent falls under a legal regime (in practice, the US CLOUD Act or FISA §702) that can compel access to
        customer data regardless of where the servers sit.
      </p>

      <h2>Five dimensions</h2>
      <p>Every vendor is scored on five orthogonal questions:</p>
      <ol>
        <li>
          <strong>Entity control.</strong> Who is the vendor's ultimate parent? A US-incorporated parent is red;
          an EU subsidiary of a US parent is still red (the parent's jurisdiction reaches through the sub).
        </li>
        <li>
          <strong>Data location.</strong> Where does customer data actually rest, including backups and logs? An
          "EU region" on a US-owned cloud is amber, not green — the region setting mitigates location risk but
          not entity risk.
        </li>
        <li>
          <strong>Operational access.</strong> Which countries' staff can access production data for support and
          SRE? This is the most-overlooked cross-border transfer channel.
        </li>
        <li>
          <strong>Subprocessor chain.</strong> Is there a US hyperscaler underneath? An EU-owned vendor running
          on AWS still inherits AWS's exposure.
        </li>
        <li>
          <strong>Transfer mechanism.</strong> What legal instrument is claimed for the transfer — SCCs+TIA,
          adequacy decision, Data Privacy Framework, or none needed at all?
        </li>
      </ol>

      <h2>Worst dimension wins</h2>
      <p>
        The overall rating is the worst color across the five dimensions. A vendor with green data-location but
        red entity-control is still overall red. This is enforced by the CI validator in the
        <a href="https://github.com/STGime/sovereignty-vendors" target="_blank" rel="noopener noreferrer">public dataset</a> —
        a PR that grades a vendor amber overall when any dimension is red gets rejected before merge.
      </p>

      <h2>Severity modifier</h2>
      <p>
        The picker's optional data-sensitivity dropdown (health, legal, financial, children) tightens the
        thresholds by promoting any amber card to red. Handled purely at scoring time; the vendor DB stays
        unchanged. Rationale: an amber "some mitigations present" reading is not enough when you're processing
        Article 9 GDPR categories or attorney-client-privileged material.
      </p>

      <h2>Sources and last review</h2>
      <p>
        Every entry cites at least one source (vendor DPA, docs page, DPA annex, court filing). Every entry
        carries a <code>last_reviewed</code> date; the dataset's CI flags entries older than 180 days as stale.
        Disputes are opened as GitHub issues on the dataset repo and resolved publicly.
      </p>

      <h2>Conflict of interest</h2>
      <p>
        Eurobase OÜ maintains this dataset and Eurobase itself is graded on it. Our own vendor entry carries a
        <code>self_disclosure: true</code> flag; the frontend renders a visible banner on Eurobase's vendor page.
        If you think our self-rating is too generous, please open an issue — grading ourselves green while
        denying others the same grade would destroy the dataset the first time someone noticed.
      </p>

      <h2>What this is not</h2>
      <ul>
        <li>Not legal advice. Talk to your DPO or counsel.</li>
        <li>Not a certification. This is a research aid.</li>
        <li>Not per-SKU. We rate a vendor as a whole; SKU-level nuances (e.g. AWS European Sovereign Cloud) go in the vendor's <code>notes</code>.</li>
        <li>Not exhaustive. Not every vendor is in the dataset yet. PRs welcome.</li>
      </ul>

      <h2>Framing</h2>
      <p>Language on this site is deliberate:</p>
      <ul>
        <li>✅ "Legal exposure under the CLOUD Act"</li>
        <li>✅ "Subject to US surveillance statutes"</li>
        <li>❌ "Not GDPR compliant"</li>
        <li>❌ "Illegal to use in the EU"</li>
      </ul>
      <p>
        The distinction matters. Every rating is disputed by someone. Careful language keeps the disputes about
        the facts.
      </p>

      <h2>License and use</h2>
      <p>
        The dataset is MIT-licensed. You can fork it, cite it, embed it. Attribution appreciated, not required.
      </p>
    </article>
  </main>
</template>

<style scoped>
.prose h2 {
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 600;
}
.prose p,
.prose li {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  color: rgb(203 213 225);
}
.prose ol,
.prose ul {
  padding-left: 1.5rem;
}
.prose a {
  color: rgb(96 165 250);
}
.prose a:hover {
  text-decoration: underline;
}
.prose code {
  padding: 0 0.25rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  font-size: 0.9em;
}
</style>
