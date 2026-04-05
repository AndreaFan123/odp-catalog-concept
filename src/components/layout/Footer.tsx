/**
 * Footer — site-wide footer.
 *
 * Provides provenance and authorship context.
 * External link to Hub Ocean catalog opens in new tab with
 * rel="noopener noreferrer" (security best practice).
 */
export function Footer() {
  return (
    <footer
      className="text-center py-6 mt-auto"
      style={{ borderTop: '1px solid var(--color-border-subtle)' }}
    >
      <p
        className="text-xs mb-1"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
      >
        Data via{' '}
        <a
          href="https://catalogue.hubocean.earth"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-text-accent)' }}
        >
          Hub Ocean public STAC API
        </a>
      </p>
      <p
        className="text-xs"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-sans)' }}
      >
        Built by Andrea Fan ·{' '}
        <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          odp-catalog-concept
        </span>
      </p>
    </footer>
  )
}
