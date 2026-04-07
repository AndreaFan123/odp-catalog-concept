/**
 * IndustryPage — Sector landing for Ocean Industry & Finance.
 *
 * Route: /solutions/industry
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

function IconShield() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconShare() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function IconChart() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IndustryPage() {
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
          FOR OCEAN INDUSTRY &amp; FINANCE
        </p>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700,
          color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16,
        }}>
          Turn ocean data into
          <br />
          strategic advantage.
        </h1>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7, marginBottom: 32, maxWidth: 560,
        }}>
          Only 3% of public ocean biodiversity data comes from industry. ODP
          helps companies share data, meet TNFD/CSRD requirements, and access
          nature-risk insights.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <PrimaryButton
            onClick={() => navigate({ to: '/catalog', search: { category: 'industry' } })}
          >
            Explore Industry Data &rarr;
          </PrimaryButton>
          <SecondaryLink href="https://www.hubocean.earth/ocean-industries-finance">
            Learn about sharing &#8599;
          </SecondaryLink>
        </div>

        <SolutionDivider />

        {/* ── Feature cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="solution-feature-grid"
        >
          <FeatureCard
            icon={<IconShield />}
            title="TNFD &amp; CSRD ready"
            desc="Nature-related risk data aligned with disclosure frameworks. Map operations against sensitive marine habitats."
          />
          <FeatureCard
            icon={<IconShare />}
            title="Secure data sharing"
            desc="Share your operational data with the scientific community while maintaining competitive advantages."
          />
          <FeatureCard
            icon={<IconChart />}
            title="Ocean Sensitive Areas"
            desc="Premium aggregated data on ecosystems, habitats, and species migration routes — analysis ready."
          />
        </div>

        <SolutionQuote
          quote='"We hope to inspire other companies to get involved in sharing data to support SDG14."'
          attribution="— Sandy Spørck, TGS"
        />
      </main>
    </SolutionLayout>
  )
}
