/**
 * GovernancePage — Sector landing for Ocean Governance & Policy.
 *
 * Route: /solutions/governance
 * Design: DD-26 (persona routing), DD-27 (IA problem response)
 *
 * Full-width dark layout (no AppShell). Uses SolutionLayout wrapper.
 */

import { useNavigate } from '@tanstack/react-router'
import {
  SolutionLayout,
  FeatureCard,
  SolutionDivider,
  SolutionQuote,
  PrimaryButton,
  SecondaryLink,
} from './SolutionLayout'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconGlobe() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconLayers() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function IconLink() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GovernancePage() {
  const navigate = useNavigate()

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
          FOR OCEAN GOVERNANCE
        </p>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700,
          color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16,
        }}>
          Accelerating ocean protection
          <br />
          through data.
        </h1>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7, marginBottom: 32, maxWidth: 560,
        }}>
          The world is racing toward 30&times;30 &mdash; protecting 30% of the
          ocean by 2030. ODP gives marine spatial planners and policymakers the
          data they need to act.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <PrimaryButton
            onClick={() => navigate({ to: '/catalog', search: { category: 'mpa' } })}
          >
            Explore MPA Data &rarr;
          </PrimaryButton>
          <SecondaryLink href="https://www.hubocean.earth/governance">
            Contact us &#8599;
          </SecondaryLink>
        </div>

        <SolutionDivider />

        {/* ── Feature cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="solution-feature-grid"
        >
          <FeatureCard
            icon={<IconGlobe />}
            title="30×30 support"
            desc="Data and tools for creating, managing, and monitoring Marine Protected Areas worldwide."
          />
          <FeatureCard
            icon={<IconLayers />}
            title="Best available data"
            desc="Aggregated biodiversity, habitat, and species data from trusted global sources."
          />
          <FeatureCard
            icon={<IconLink />}
            title="Safe Haven approach"
            desc="Secure, neutral, multi-cloud infrastructure for ocean data that crosses borders and generations."
          />
        </div>

        <SolutionQuote
          quote='"To truly deliver on global commitments, we must close critical data gaps."'
          attribution="— Hub Ocean"
        />
      </main>
    </SolutionLayout>
  )
}
