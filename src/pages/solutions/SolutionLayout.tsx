/**
 * SolutionLayout — Shared layout wrapper for all /solutions/* pages.
 *
 * Provides the same fixed Navbar and dark background as HomePage,
 * plus a consistent footer with a back-to-home link.
 *
 * Also exports shared dark-theme sub-components used by all sector pages:
 *   - FeatureCard
 *   - SolutionDivider
 *   - SolutionQuote
 *   - PrimaryButton
 *   - SecondaryLink
 */

import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'

// ─── Navbar ───────────────────────────────────────────────────────────────────

function SolutionNavbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
        transition: 'background 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(13,17,23,0.92)' : 'rgba(13,17,23,0.6)',
        backdropFilter: 'blur(12px)',
      }}
      className="solution-navbar"
    >
      {/* Left — Hub Ocean logo */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate({ to: '/' })}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate({ to: '/' }) }}
        aria-label="Hub Ocean, go to homepage"
        style={{ cursor: 'pointer' }}
      >
        <img
          src="/assets/HUB-Ocean-logo.webp"
          alt="Hub Ocean"
          style={{ height: 28, display: 'block' }}
        />
      </div>

      {/* Right — Browse Catalog */}
      <button
        type="button"
        onClick={() => navigate({ to: '/catalog' })}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          background: '#03FFD1',
          color: '#0d1117',
          padding: '8px 20px',
          borderRadius: 99,
          fontSize: 14,
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          opacity: btnHovered ? 0.85 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        Browse Catalog
      </button>
    </nav>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function SolutionFooter() {
  const navigate = useNavigate()
  const [backHovered, setBackHovered] = useState(false)

  return (
    <footer
      style={{
        background: '#060a0f',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
      className="solution-footer"
    >
      <button
        type="button"
        onClick={() => navigate({ to: '/' })}
        onMouseEnter={() => setBackHovered(true)}
        onMouseLeave={() => setBackHovered(false)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontSize: 13,
          color: backHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.15s',
        }}
      >
        &larr; Back to home
      </button>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
        Not an official Hub Ocean product
      </span>
    </footer>
  )
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────

export function SolutionLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#ffffff' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SolutionNavbar />
      <div style={{ paddingTop: 64 }}>
        {children}
      </div>
      <SolutionFooter />
    </div>
  )
}

// ─── Shared dark-theme sub-components ────────────────────────────────────────

export interface FeatureCardProps {
  icon: ReactNode
  title: string
  desc: string
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div style={{ color: '#03FFD1', marginBottom: 14 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
        {desc}
      </div>
    </div>
  )
}

export function SolutionDivider() {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        margin: '48px 0',
      }}
    />
  )
}

export function SolutionQuote({
  quote,
  attribution,
}: {
  quote: string
  attribution: string
}) {
  return (
    <blockquote
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderLeft: '3px solid #03FFD1',
        borderRadius: '0 12px 12px 0',
        padding: '24px 28px',
        margin: '48px 0',
      }}
    >
      <p
        style={{
          fontSize: 15,
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.7,
          marginBottom: 12,
        }}
      >
        {quote}
      </p>
      <cite style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontStyle: 'normal' }}>
        {attribution}
      </cite>
    </blockquote>
  )
}

export function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: '#03FFD1',
        color: '#0d1117',
        padding: '12px 24px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 14,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export function SecondaryLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        background: 'transparent',
        border: hovered
          ? '1px solid rgba(255,255,255,0.5)'
          : '1px solid rgba(255,255,255,0.2)',
        color: 'rgba(255,255,255,0.7)',
        padding: '12px 24px',
        borderRadius: 8,
        fontSize: 14,
        textDecoration: 'none',
        transition: 'border-color 0.15s',
        cursor: 'pointer',
      }}
    >
      {children}
    </a>
  )
}
