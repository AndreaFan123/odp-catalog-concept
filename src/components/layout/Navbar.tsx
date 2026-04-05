import { Link } from '@tanstack/react-router'

/**
 * Navbar — top navigation bar.
 *
 * Height: 56px (--nav-height from style-guide.md)
 * Left:  "ODP Catalog" text logo → links to /
 * Right: concept disclaimer (not interactive)
 *
 * Accessibility:
 * - <nav> landmark with aria-label
 * - Skip-to-main link as first focusable element
 * - Text logo is an <a> (not a <button>) — navigates to home
 */
export function Navbar() {
  return (
    <>
      {/* Skip navigation — visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
        style={{
          backgroundColor: 'var(--color-action-primary-bg)',
          color: 'var(--color-action-primary-text)',
        }}
      >
        Skip to main content
      </a>

      <header
        style={{
          height: 56,
          backgroundColor: 'var(--color-nav-bg)',
          borderBottom: '1px solid color-mix(in srgb, var(--primitive-white) 12%, transparent)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between"
        >
          {/* Logo / home link */}
          <Link
            to="/"
            className="text-sm font-semibold tracking-wide"
            style={{
              color: 'var(--color-nav-accent)',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
            }}
            aria-label="ODP Catalog — return to home"
          >
            ODP Catalog
          </Link>

          {/* Concept disclaimer */}
          <p
            className="text-xs"
            style={{ color: 'var(--color-nav-text)', opacity: 0.6, fontFamily: 'var(--font-sans)' }}
          >
            Concept redesign · Not an official Hub Ocean product
          </p>
        </nav>
      </header>
    </>
  )
}
