/**
 * LoadingScreen — Inline loading state shown in the grid area while data loads.
 *
 * Design: "HUB Ocean" logotype with three cyan sinusoidal wave lines.
 *         Transparent background — sits inside the grid area, not full-screen.
 *
 * Accessibility: prefers-reduced-motion disables wave animation.
 * Visibility: controlled by `visible` prop (display: none when false).
 */

// ─── Wave path (two periods, 200px per period → total width 800px) ────────────
//
// Each period: M → peak → trough → next peak
// translateX(-400px) creates a seamless loop over two periods.

function wavePath(cy: number): string {
  const hi = cy - 16
  const lo = cy + 16
  return [
    `M 0,${cy}`,
    `C 50,${hi} 100,${hi} 200,${cy}`,
    `C 300,${lo} 350,${lo} 400,${cy}`,
    `C 450,${hi} 500,${hi} 600,${cy}`,
    `C 700,${lo} 750,${lo} 800,${cy}`,
  ].join(' ')
}

// ─── Keyframe injection ───────────────────────────────────────────────────────

const STYLE_ID = 'odp-loading-keyframes'

function injectKeyframes() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    @media (prefers-reduced-motion: no-preference) {
      @keyframes odp-wave1 {
        from { transform: translateX(0); }
        to   { transform: translateX(-400px); }
      }
      @keyframes odp-wave2 {
        from { transform: translateX(0); }
        to   { transform: translateX(-400px); }
      }
      @keyframes odp-wave3 {
        from { transform: translateX(0); }
        to   { transform: translateX(-400px); }
      }
    }
  `
  document.head.appendChild(style)
}

injectKeyframes()

// ─── Component ────────────────────────────────────────────────────────────────

export interface LoadingScreenProps {
  visible: boolean
}

export function LoadingScreen({ visible }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-label="Loading Ocean Data Platform"
      aria-live="polite"
      style={{
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        width: '100%',
        minHeight: 320,
        padding: '48px 0',
        background: 'transparent',
      }}
    >
      {/* Loading label */}
      <p
        style={{
          margin: 0,
          fontFamily: 'Roboto, sans-serif',
          fontSize: 24,
          letterSpacing: '0.05em',
          color: 'var(--color-text-primary)',
          userSelect: 'none',
        }}
      >
        Loading datasets...
      </p>

      {/* Wave animation */}
      <svg
        width="400"
        height="48"
        viewBox="0 0 400 48"
        aria-hidden="true"
        style={{ overflow: 'hidden', display: 'block', marginTop: -20 }}
      >
        {/* Wave 1 — fastest, fully opaque, strokeWidth 1.5 */}
        <g style={{ animation: 'odp-wave1 2s linear infinite' }}>
          <path
            d={wavePath(24)}
            stroke="#03FFD1"
            strokeWidth="1.5"
            fill="none"
            opacity="1"
          />
        </g>

        {/* Wave 2 — medium speed, half opacity, strokeWidth 1 */}
        <g style={{ animation: 'odp-wave2 3s linear infinite' }}>
          <path
            d={wavePath(28)}
            stroke="#03FFD1"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Wave 3 — slowest, quarter opacity, strokeWidth 0.75 */}
        <g style={{ animation: 'odp-wave3 4s linear infinite' }}>
          <path
            d={wavePath(20)}
            stroke="#03FFD1"
            strokeWidth="0.75"
            fill="none"
            opacity="0.25"
          />
        </g>
      </svg>
    </div>
  )
}
