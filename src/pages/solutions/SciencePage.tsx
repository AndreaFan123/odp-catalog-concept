/**
 * SciencePage — Sector landing for Marine Researchers.
 *
 * Route: /solutions/science
 * Design: DD-26 (persona routing), DD-27 (IA problem response)
 *
 * Full-width dark layout (no AppShell). Uses SolutionLayout wrapper.
 * Partners marquee: full-width section between main content and footer.
 */

import { useState } from 'react'
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

function IconCloud() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  )
}

function IconDatabase() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  )
}

function IconUsers() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

// ─── Partners marquee ─────────────────────────────────────────────────────────

const COLLABORATORS = [
  'UNESCO',
  'UN Ocean Decade',
  'IMR Norway',
  'NOAA',
  'SINTEF',
  'NTNU',
  'NORCE',
  'NOC',
  'UiT Arctic University',
  'Woods Hole Oceanographic Institution',
  'Iliad Digital Twin of the Ocean',
  'Blue Cloud 2026',
]

function PartnersMarquee() {
  const [paused, setPaused] = useState(false)
  const items = [...COLLABORATORS, ...COLLABORATORS]

  return (
    <section
      aria-label="Science collaborators"
      style={{
        padding: '48px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        SCIENCE COLLABORATORS
      </p>

      {/* Track wrapper — position:relative for fade overlays */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Left fade */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: 120,
            background: 'linear-gradient(to right, #0d1117, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0, top: 0, bottom: 0,
            width: 120,
            background: 'linear-gradient(to left, #0d1117, transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Scrolling track */}
        <div
          className="marquee-track"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'marquee 60s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {items.map((name, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                padding: '0 32px',
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.02em',
                }}
              >
                {name}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  margin: '0 24px',
                  verticalAlign: 'middle',
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SciencePage() {
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
          FOR MARINE RESEARCHERS
        </p>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700,
          color: '#FFFFFF', lineHeight: 1.2, marginBottom: 16,
        }}>
          Save time finding,
          <br />
          accessing, and sharing
          <br />
          ocean data.
        </h1>

        <p style={{
          fontSize: 16, color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.7, marginBottom: 32, maxWidth: 560,
        }}>
          Finding and harmonising ocean data often requires multiple steps,
          lots of computing power, and still leaves critical gaps. ODP
          eliminates these obstacles.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 0 }}>
          <PrimaryButton
            onClick={() => navigate({ to: '/catalog', search: { category: 'biodiversity' } })}
          >
            Browse Scientific Data &rarr;
          </PrimaryButton>
          <SecondaryLink href="https://www.hubocean.earth/scientists-researchers">
            View on Hub Ocean &#8599;
          </SecondaryLink>
        </div>

        <SolutionDivider />

        {/* ── Feature cards ── */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          className="solution-feature-grid"
        >
          <FeatureCard
            icon={<IconCloud />}
            title="Cloud-based access"
            desc="Access data directly in Jupyter — no downloads needed. Analysis-ready from day one."
          />
          <FeatureCard
            icon={<IconDatabase />}
            title="Unique datasets"
            desc="Access rare industrial and scientific data not available anywhere else."
          />
          <FeatureCard
            icon={<IconUsers />}
            title="Collaborative workspace"
            desc="Share data and analysis with colleagues in a cloud-based environment."
          />
        </div>

        <SolutionQuote
          quote={'\u201cThe Ocean Data Platform definitely accelerates things. Instead of weeks, it\u2019s just an hour or so that things take to compute.\u201d'}
          attribution="— Sebastian Menze, Institute of Marine Research"
        />
      </main>

      <PartnersMarquee />
    </SolutionLayout>
  )
}
