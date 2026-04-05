import { useState } from 'react'
import { cn } from '../../lib/cn'

export interface BadgeProps {
  variant: 'license-open' | 'license-restricted' | 'license-unknown' | 'keyword'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  'aria-label'?: string
}

/**
 * Badge — license status and keyword tags.
 *
 * Design contract (style-guide.md §Badge):
 * - License variants: colored text + 10% tinted bg + 30% tinted border, 11px Roboto Mono
 * - Keyword variant: secondary text + tag bg + default border, Roboto sans
 * - Color is NEVER the sole information carrier — text label is mandatory
 *
 * Accessibility:
 * - Clickable keyword badges render as <button> with focus-visible matching hover
 * - Non-interactive badges render as <span>
 * - WCAG contrast verified in design/a11y-color-audit.md §8.4
 */

const BASE = 'inline-flex items-center px-2 py-0.5 rounded-full border'

const FONT_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  fontWeight: 500,
}

const FONT_SANS: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 12,
  fontWeight: 400,
}

const VARIANT_STYLES: Record<NonNullable<BadgeProps['variant']>, React.CSSProperties> = {
  'license-open': {
    ...FONT_MONO,
    color: 'var(--color-license-open-text)',
    backgroundColor: 'var(--color-license-open-bg)',
    borderColor: 'var(--color-license-open-border)',
  },
  'license-restricted': {
    ...FONT_MONO,
    color: 'var(--color-license-restricted-text)',
    backgroundColor: 'var(--color-license-restricted-bg)',
    borderColor: 'var(--color-license-restricted-border)',
  },
  'license-unknown': {
    ...FONT_MONO,
    color: 'var(--color-license-unknown-text)',
    backgroundColor: 'var(--color-license-unknown-bg)',
    borderColor: 'var(--color-license-unknown-border)',
  },
  'keyword': {
    ...FONT_SANS,
    color: 'var(--color-text-secondary)',
    backgroundColor: 'var(--color-tag-bg)',
    borderColor: 'var(--color-border-default)',
  },
}

const KEYWORD_ACTIVE: React.CSSProperties = {
  color: 'var(--color-text-accent)',
  borderColor: 'var(--color-border-accent)',
}

export function Badge({ variant, children, className, onClick, 'aria-label': ariaLabel }: BadgeProps) {
  const [active, setActive] = useState(false)
  const isInteractive = variant === 'keyword' && onClick !== undefined
  const baseStyle = VARIANT_STYLES[variant]
  const style = isInteractive && active ? { ...baseStyle, ...KEYWORD_ACTIVE } : baseStyle

  if (isInteractive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(BASE, 'cursor-pointer transition-colors duration-150', className)}
        style={style}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        {children}
      </button>
    )
  }

  return (
    <span
      className={cn(BASE, className)}
      style={baseStyle}
    >
      {children}
    </span>
  )
}
