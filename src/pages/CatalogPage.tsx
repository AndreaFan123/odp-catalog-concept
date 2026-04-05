import { useEffect, useState, useCallback } from 'react'
import { useWindowWidth, BP_TABLET } from '../lib/useWindowWidth'
import { useSearch, useNavigate } from '@tanstack/react-router'
import type { STACCollection } from '../lib/stac'
import { getCollections } from '../lib/stac'
import { bboxToRegionLabel, getLicenseInfo } from '../lib/format'
import { CATEGORIES, matchesCategory } from '../lib/categories'
import { CollectionGrid } from '../components/catalog/CollectionGrid'
import { AppShell } from '../components/layout/AppShell'
import { UserMenu } from '../components/layout/UserMenu'
import { getSavedIds } from '../components/catalog/DatasetCard'
import { LoadingScreen } from '../components/ui/LoadingScreen'

// ─── Async state pattern ──────────────────────────────────────────────────────

type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// ─── Year range options ───────────────────────────────────────────────────────

const CURRENT_YEAR = new Date().getFullYear()

const YEAR_OPTIONS: { label: string; value: number | null }[] = [
  { label: 'Any', value: null },
  ...Array.from({ length: CURRENT_YEAR - 1979 }, (_, i) => {
    const y = CURRENT_YEAR - i
    return { label: String(y), value: y }
  }),
]

// ─── Inline SVG: Magnifying glass ─────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
    >
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Theme icons ─────────────────────────────────────────────────────────────

function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

// ─── YearSelect ───────────────────────────────────────────────────────────────

interface YearSelectProps {
  id: string
  label: string
  value: number | null
  onChange: (v: number | null) => void
}

function YearSelect({ id, label, value, onChange }: YearSelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value === '' ? null : Number(e.target.value)
          onChange(v)
        }}
        style={{
          height: 40,
          minWidth: 90,
          padding: '0 8px',
          borderRadius: 8,
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          cursor: 'pointer',
          appearance: 'auto',
        }}
      >
        {YEAR_OPTIONS.map((opt) => (
          <option key={opt.label} value={opt.value ?? ''}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// ─── ThemeToggle ─────────────────────────────────────────────────────────────

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onToggle: () => void
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      className="round-button"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        transition: 'border-color 0.15s, color 0.15s',
        flexShrink: 0,
      }}
    >
      {theme === 'dark' ? <IconSun /> : <IconMoon />}
    </button>
  )
}

// ─── Filter logic (client-side) ───────────────────────────────────────────────

function applyFilters(
  collections: STACCollection[],
  keyword?: string,
  region?: string,
  license?: string,
  category?: string,
  fromYear?: number | null,
  toYear?: number | null,
): STACCollection[] {
  return collections.filter((c) => {
    if (keyword) {
      const kw = keyword.toLowerCase()
      const inTitle = c.title?.toLowerCase().includes(kw) ?? false
      const inDesc = c.description?.toLowerCase().includes(kw) ?? false
      const inKeywords = c.keywords?.some((k) => k.toLowerCase().includes(kw)) ?? false
      if (!inTitle && !inDesc && !inKeywords) return false
    }

    if (region) {
      const bbox = c.extent?.spatial?.bbox?.[0] as [number, number, number, number] | undefined
      if (!bbox) return false
      const label = bboxToRegionLabel(bbox)
      if (!label.toLowerCase().includes(region.toLowerCase())) return false
    }

    if (license) {
      const info = getLicenseInfo(c.license)
      if (license === 'open' && !info.open) return false
      if (license === 'restricted' && info.open) return false
      if (license === 'closed' && (info.open || info.commercial)) return false
    }

    if (category && category !== 'all' && category !== 'saved' && category !== 'mydata') {
      const cat = CATEGORIES.find((entry) => entry.id === category)
      if (cat && !matchesCategory(c, cat)) return false
    }

    if (fromYear != null || toYear != null) {
      const interval = c.extent?.temporal?.interval?.[0]
      const startYear = interval?.[0] ? new Date(interval[0]).getFullYear() : null
      const endYear = interval?.[1]
        ? new Date(interval[1]).getFullYear()
        : new Date().getFullYear()
      if (fromYear != null && endYear < fromYear) return false
      if (toYear != null && startYear != null && startYear > toYear) return false
    }

    return true
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CatalogPage() {
  const { keyword, region, license, from, to } = useSearch({ from: '/' })
  const navigate = useNavigate()

  const windowWidth = useWindowWidth()
  const isMobile = windowWidth < BP_TABLET

  const [state, setState] = useState<AsyncState<STACCollection[]>>({ status: 'loading' })
  const [fetchId, setFetchId] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  // Theme state — persisted to localStorage, respects OS preference on first load
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('odp-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('odp-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const fromYear = from ?? null
  const toYear = to ?? null

  const handleFromYearChange = (value: number | null) => {
    void navigate({ to: '/', search: (prev) => ({ ...prev, from: value ?? undefined }) })
  }

  const handleToYearChange = (value: number | null) => {
    void navigate({ to: '/', search: (prev) => ({ ...prev, to: value ?? undefined }) })
  }

  const hasActiveFilters = !!(keyword || region || license || from || to || activeCategory !== 'all')

  const handleReset = () => {
    setActiveCategory('all')
    void navigate({ to: '/', search: {} })
  }

  useEffect(() => {
    let cancelled = false

    getCollections()
      .then((data) => {
        if (!cancelled) setState({ status: 'success', data })
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: 'error',
            error: err instanceof Error ? err : new Error('Unknown error'),
          })
        }
      })

    return () => { cancelled = true }
  }, [fetchId])

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || undefined
    void navigate({ to: '/', search: (prev) => ({ ...prev, keyword: value }) })
  }

  const allCollections = state.status === 'success' ? state.data : []
  const totalCount = allCollections.length

  // Saved: filter by localStorage ids (year filter also applies)
  const savedFiltered = activeCategory === 'saved'
    ? allCollections.filter((c) => getSavedIds().includes(c.id))
    : null

  const filtered = savedFiltered !== null
    ? applyFilters(savedFiltered, keyword, region, license, undefined, fromYear, toYear)
    : applyFilters(allCollections, keyword, region, license, activeCategory, fromYear, toYear)

  const headingMap: Record<string, string> = {
    all:           'All Datasets',
    saved:         'Saved Datasets',
    mydata:        'My Data',
    biodiversity:  'Biodiversity & Species',
    'ocean-physics': 'Ocean Physics',
    coral:         'Coral & Reef',
    acoustics:     'Acoustics & Fisheries',
    mpa:           'Marine Protected Areas',
    industry:      'Industry & Offshore',
  }
  const heading = headingMap[activeCategory] ?? activeCategory

  return (
    <AppShell
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    >
      {/* ── Toolbar ────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: 8,
          marginBottom: 24,
          width: '100%',
        }}
      >
        {/* 1. Search input */}
        <div style={{ position: 'relative', flex: '1 1 auto', maxWidth: isMobile ? 'calc(100% - 92px)' : 400 }}>
          <label htmlFor="catalog-search" className="sr-only">Search datasets</label>
          <SearchIcon />
          <input
            id="catalog-search"
            type="search"
            placeholder="Search datasets…"
            aria-label="Search datasets"
            value={keyword ?? ''}
            onChange={handleKeywordChange}
            style={{
              width: '100%',
              height: 40,
              paddingLeft: 36,
              paddingRight: 12,
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 2–5. Year range + Reset (desktop: inline; mobile: own row via flex-wrap) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flex: isMobile ? '1 1 100%' : '0 0 auto',
            order: isMobile ? 1 : 0,
          }}
        >
          <YearSelect id="year-from" label="From year" value={fromYear} onChange={handleFromYearChange} />
          <span aria-hidden="true" style={{ color: 'var(--color-text-muted)', fontSize: 13, userSelect: 'none' }}>—</span>
          <YearSelect id="year-to" label="To year" value={toYear} onChange={handleToYearChange} />
          {hasActiveFilters && (
            <button
              type="button"
              aria-label="Reset all filters"
              onClick={handleReset}
              style={{
                height: 40,
                padding: '0 14px',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              Reset
            </button>
          )}
        </div>

        {/* 6. Spacer */}
        {!isMobile && <div style={{ flex: 1 }} aria-hidden="true" />}

        {/* 7. Mode switcher */}
        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        {/* 8. Guest user avatar */}
        <UserMenu onCategoryChange={setActiveCategory} />
      </div>

      {/* Page heading */}
      <header style={{ marginBottom: 16 }}>
        <h1
          style={{
            fontSize: isMobile ? 16 : 28,
            fontWeight: isMobile ? 600 : 700,
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 4,
          }}
        >
          {heading}
        </h1>
        <p
          style={{
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-muted)',
          }}
        >
          {state.status === 'success'
            ? `${filtered.length} of ${totalCount} datasets`
            : state.status === 'loading'
              ? ''
              : 'Hub Ocean Ocean Data Platform'}
        </p>
      </header>

      {/* Screen reader filter summary */}
      {(keyword || region || license || activeCategory !== 'all' || fromYear != null || toYear != null) && (
        <p className="sr-only" role="status" aria-live="polite">
          Filters active.{' '}
          {state.status === 'success'
            ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}.`
            : ''}
        </p>
      )}

      {/* Loading */}
      {state.status === 'loading' && (
        <LoadingScreen visible={true} />
      )}

      {/* Error */}
      {state.status === 'error' && (
        <div
          style={{
            borderRadius: 12,
            padding: 32,
            textAlign: 'center',
            border: '1px solid var(--color-feedback-error-text)',
            backgroundColor: 'var(--color-surface)',
          }}
          role="alert"
        >
          <p style={{ color: 'var(--color-text-primary)', fontWeight: 500, marginBottom: 4 }}>
            Unable to load the catalog.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 16 }}>
            The Ocean Data Platform API may be temporarily unavailable.
          </p>
          <button
            type="button"
            onClick={() => {
              setState({ status: 'loading' })
              setFetchId((n) => n + 1)
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-text)',
            }}
          >
            Try again
          </button>
        </div>
      )}

      {/* My Data — empty state */}
      {state.status === 'success' && activeCategory === 'mydata' && (
        <div
          style={{
            padding: '48px 0',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
          }}
          role="status"
        >
          <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: 'var(--color-text-primary)' }}>
            My Data is available with an account
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
            Sign in to Hub Ocean to access private datasets and workspace data.
          </p>
        </div>
      )}

      {/* Saved — empty state when nothing saved */}
      {state.status === 'success' && activeCategory === 'saved' && filtered.length === 0 && (
        <div
          style={{
            padding: '48px 0',
            textAlign: 'center',
          }}
          role="status"
        >
          <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: 'var(--color-text-primary)' }}>
            No saved datasets yet
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-text-muted)' }}>
            Click the ♡ on any dataset card to save it here.
          </p>
        </div>
      )}

      {/* Success — normal grid */}
      {state.status === 'success' && activeCategory !== 'mydata' && (
        activeCategory !== 'saved' || filtered.length > 0
      ) && (
        <CollectionGrid collections={filtered} />
      )}
    </AppShell>
  )
}
