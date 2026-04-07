/**
 * CitizenPage — Sector landing for Citizen Sea (citizen science app).
 *
 * Route: /solutions/citizen
 * Design: DD-26 (persona routing), DD-27 (IA problem response)
 *
 * Full-width dark layout (no AppShell). Uses SolutionLayout wrapper.
 */

import {
  SolutionLayout,
  FeatureCard,
  SolutionDivider,
  SolutionQuote,
  PrimaryButton,
  SecondaryLink,
} from './SolutionLayout'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconCamera() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconTrendingUp() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CitizenPage() {
  return (
    <SolutionLayout>
      <main
        id="main-content"
        style={{ maxWidth: 960, margin: '0 auto', padding: '80px 48px' }}
        className="solution-main"
      >
        {/* ── Hero ── */}
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#03FFD1', marginBottom: 12,
        }}>
          CITIZEN SEA
        </p>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700,
          color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16,
        }}>
          Be our eyes
          <br />
          on the ocean.
        </h1>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7, marginBottom: 32, maxWidth: 560,
        }}>
          Photograph, upload and log sightings of marine wildlife or marine
          pollution from your phone. Join the world&rsquo;s largest citizen
          science project for ocean health.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <PrimaryButton
            onClick={() => window.open('https://apps.apple.com/no/app/citizen-sea/id6473001342', '_blank')}
          >
            Download on App Store &#8599;
          </PrimaryButton>
          <SecondaryLink href="https://play.google.com/store/apps/details?id=com.hubocean.citizensea">
            Get it on Google Play &#8599;
          </SecondaryLink>
        </div>

        <SolutionDivider />

        {/* ── Feature cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="solution-feature-grid"
        >
          <FeatureCard
            icon={<IconCamera />}
            title="Photograph &amp; log"
            desc="Snap photos of marine wildlife or pollution directly from your phone. Every sighting counts."
          />
          <FeatureCard
            icon={<IconMapPin />}
            title="Geo-tagged sightings"
            desc="Your observations are automatically geo-tagged and added to Hub Ocean's open dataset."
          />
          <FeatureCard
            icon={<IconTrendingUp />}
            title="Real science impact"
            desc="Citizen Sea data feeds directly into research on ocean health, biodiversity, and pollution tracking."
          />
        </div>

        <SolutionQuote
          quote={'\u201cEvery photo tells a story the ocean can\u2019t tell itself. Your sightings fill gaps that no research vessel can reach.\u201d'}
          attribution="— Hub Ocean"
        />

        {/* ── App stats ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 8 }}
          className="solution-feature-grid"
        >
          {[
            { value: 'Free', label: 'Always free to use' },
            { value: 'iOS + Android', label: 'Available on both platforms' },
            { value: 'Open data', label: 'All sightings are FAIR' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                padding: '20px 16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>
    </SolutionLayout>
  )
}
