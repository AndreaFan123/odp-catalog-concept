/**
 * UserMenu — Guest user avatar button with a simple popover.
 *
 * Shows a 36×36 avatar circle.
 * Click opens a popover with: user info block, Sign in link, About link.
 * Popover closes on outside click.
 */

import { useState, useEffect, useRef } from 'react'

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconExternal() {
  return (
    <svg aria-hidden="true" focusable="false" width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M8 1h3v3M11 1L6.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── UserMenu ─────────────────────────────────────────────────────────────────

interface UserMenuProps {
  onCategoryChange: (category: string) => void
}

export function UserMenu({ onCategoryChange: _onCategoryChange }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const [hovered, setHovered] = useState(false)

  return (
    <div ref={containerRef} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Avatar trigger */}
      <button
        type="button"
        className="round-button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Guest user menu"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          border: `2px solid ${hovered || open ? 'var(--color-accent)' : 'transparent'}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-accent-text)',
          fontSize: 13,
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          boxShadow: hovered || open ? '0 0 0 3px rgba(3,255,209,0.2)' : 'none',
          transition: 'box-shadow 0.15s',
          flexShrink: 0,
        }}
      >
        G
      </button>

      {/* Popover */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 220,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: '12px 0',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 100,
          }}
          role="dialog"
          aria-label="Guest user options"
        >
          {/* User info block */}
          <div style={{ padding: '4px 16px 12px', borderBottom: '1px solid var(--color-border)', marginBottom: 4 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                marginBottom: 8,
              }}
              aria-hidden="true"
            >
              G
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
              Guest User
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', marginTop: 2 }}>
              Not signed in
            </div>
          </div>

          {/* Sign in link */}
          <PopoverLink
            href="https://app.hubocean.earth"
            label="Sign in to Hub Ocean"
          />

          {/* About link */}
          <PopoverLink
            href="#"
            label="About this concept"
          />
        </div>
      )}
    </div>
  )
}

// ─── PopoverLink ──────────────────────────────────────────────────────────────

function PopoverLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={href === '#' ? undefined : '_blank'}
      rel={href === '#' ? undefined : 'noopener noreferrer'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '10px 16px',
        fontSize: 14,
        fontFamily: 'var(--font-sans)',
        color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        background: hovered ? 'var(--color-surface-elevated)' : 'none',
        textDecoration: 'none',
        transition: 'color 0.1s, background 0.1s',
      }}
    >
      {label}
      <IconExternal />
    </a>
  )
}
