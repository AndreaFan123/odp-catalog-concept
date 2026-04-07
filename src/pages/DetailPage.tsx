/**
 * DetailPage — Dataset detail view (DD-17, DD-14, DD-07, DD-18, DD-20, DD-21, DD-22).
 *
 * Layout: two-column on desktop (1fr 360px), single column on tablet/mobile.
 * Left: hero, map, description, keywords, citation, related datasets.
 * Right (sticky): key stats, access panel, provider card, data preview.
 */

import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { getCollection, getCollections } from '../lib/stac'
import type { STACCollection } from '../lib/stac'
import {
  bboxToRegionLabel,
  formatTemporalRange,
  formatTemporalDuration,
  getLicenseInfo,
} from '../lib/format'
import { AppShell } from '../components/layout/AppShell'
import { UserMenu } from '../components/layout/UserMenu'
import { DatasetCard as _DatasetCard } from '../components/catalog/DatasetCard'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { useWindowWidth, BP_TABLET, BP_DESKTOP } from '../lib/useWindowWidth'
import { getMockCollection } from '../lib/mockCollectionData'
import type { CatalogDataset } from '../lib/mockCollectionData'
import { getMockDataset } from '../lib/mockDatasetData'

// ─── AsyncState ───────────────────────────────────────────────────────────────

type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--color-text-primary)',
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  )
}

// ─── SmallCopyButton ──────────────────────────────────────────────────────────

function SmallCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      style={{
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: copied ? 'var(--color-sidebar-accent)' : 'var(--color-text-secondary)',
        background: 'none',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'color 0.15s',
        padding: 0,
      }}
    >
      {copied ? (
        <span style={{ fontSize: 11, fontFamily: 'var(--font-sans)', fontWeight: 600, whiteSpace: 'nowrap' }}>
          Copied!
        </span>
      ) : (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )}
    </button>
  )
}

// ─── KeyStat ──────────────────────────────────────────────────────────────────

function KeyStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          fontSize: 12,
          fontFamily: 'var(--font-sans)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 500,
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-primary)',
          lineHeight: 1.2,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {sub}
        </div>
      )}
    </div>
  )
}

// ─── AccessItem ───────────────────────────────────────────────────────────────

interface AccessItemProps {
  label: string
  display: string
  href?: string
  copyText?: string
  isLast?: boolean
}

function AccessItem({ label, display, href, copyText, isLast }: AccessItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '10px 0',
        borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {label}
        </div>
        <div
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-secondary)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: 180,
          }}
        >
          {display}
        </div>
      </div>
      {copyText ? (
        <SmallCopyButton text={copyText} />
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-sidebar-accent)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          ↗
        </a>
      ) : null}
    </div>
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

// ─── DetailPage ───────────────────────────────────────────────────────────────

export function DetailPage() {
  const { id } = useParams({ from: '/collections/$id' })
  const navigate = useNavigate()
  const width = useWindowWidth()
  const isTablet = width < BP_DESKTOP
  const isMobile = width < BP_TABLET

  const [state, setState] = useState<AsyncState<STACCollection>>({ status: 'loading' })
  const [, setAllCollections] = useState<STACCollection[]>([])
  const [descExpanded, setDescExpanded] = useState(false)
  const [keywordsExpanded, setKeywordsExpanded] = useState(false)
  const [datasetsExpanded, setDatasetsExpanded] = useState(false)

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('odp-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('odp-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  // Fetch the target collection + all collections in parallel
  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })

    Promise.all([getCollection(id), getCollections()])
      .then(([collection, all]) => {
        if (cancelled) return
        setState({ status: 'success', data: collection })
        setAllCollections(all)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setState({ status: 'error', error: err instanceof Error ? err : new Error(String(err)) })
      })

    return () => { cancelled = true }
  }, [id])

  // ─── Loading / Error ────────────────────────────────────────────────────────

  if (state.status === 'loading') {
    return (
      <AppShell activeCategory="" onCategoryChange={() => {}}>
        <LoadingScreen visible={true} />
      </AppShell>
    )
  }

  if (state.status === 'error') {
    return (
      <AppShell activeCategory="" onCategoryChange={() => {}}>
        <div style={{ padding: 32, textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-primary)', marginBottom: 16 }}>
            Could not load this dataset.
          </p>
          <button
            type="button"
            onClick={() => void navigate({ to: '/catalog' })}
            style={{
              fontSize: 14,
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-sidebar-accent)',
              background: 'none',
              border: '1px solid var(--color-sidebar-accent)',
              borderRadius: 6,
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Back to catalog
          </button>
        </div>
      </AppShell>
    )
  }

  const collection = state.data

  // ─── Derived values ─────────────────────────────────────────────────────────

  const bbox = collection.extent?.spatial?.bbox?.[0] as [number, number, number, number] | undefined
  const regionLabel = bbox ? bboxToRegionLabel(bbox) : null
  const licenseInfo = getLicenseInfo(collection.license)
  const providerName = collection.providers?.[0]?.name ?? 'Hub Ocean'
  const interval = collection.extent?.temporal?.interval?.[0]
  const startYear = interval?.[0] ? new Date(interval[0]).getFullYear() : null
  const altLink = collection.links?.find((l) => l.rel === 'alternate')?.href ?? ''
  const itemsLink = collection.links?.find((l) => l.rel === 'items')?.href ?? ''

  const keywords = Array.from(new Set(collection.keywords ?? []))

  // Mock datasets from Catalog API v2 (requires auth — stored as static mock)
  const mockCollection = getMockCollection(collection.id)
  const allDatasets = mockCollection?.datasets ?? []
  const DATASET_LIMIT = 8
  const visibleDatasets: CatalogDataset[] = datasetsExpanded
    ? allDatasets
    : allDatasets.slice(0, DATASET_LIMIT)

  // Description truncation
  const TRUNCATE_AT = 300
  const descFull = collection.description ?? ''
  const descNeedsTruncation = descFull.length > TRUNCATE_AT
  const descDisplay = descNeedsTruncation && !descExpanded
    ? descFull.slice(0, TRUNCATE_AT) + '…'
    : descFull

  // Data preview: show only if description mentions size/format hints
  const hasDataPreview = /rows|columns|mb|gb|records/i.test(descFull)

  // Bbox coordinate display
  const bboxLabel = bbox
    ? `${bbox[0].toFixed(1)},${bbox[1].toFixed(1)} → ${bbox[2].toFixed(1)},${bbox[3].toFixed(1)}`
    : ''

  // ─── Right column (sticky panel) ────────────────────────────────────────────

  const rightColumn = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Key stats panel */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12,
          }}
        >
          <KeyStat
            label="Region"
            value={regionLabel ?? '—'}
            sub={bboxLabel}
          />
          <KeyStat
            label="Coverage"
            value={formatTemporalRange(collection)}
            sub={formatTemporalDuration(collection)}
          />
          <KeyStat
            label="Since"
            value={startYear ? String(startYear) : '—'}
          />
        </div>
      </div>

      {/* Access panel */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <SectionLabel>Access this dataset</SectionLabel>

        <AccessItem
          label="STAC API"
          display={itemsLink || 'Not available'}
          copyText={itemsLink || undefined}
        />
        <AccessItem
          label="Hub Ocean Catalog"
          display={altLink || 'Not available'}
          href={altLink || undefined}
        />
        <AccessItem
          label="Python SDK"
          display="docs.hubocean.earth"
          href="https://docs.hubocean.earth/python_sdk"
        />
        <AccessItem
          label="R SDK"
          display="docs.hubocean.earth"
          href="https://docs.hubocean.earth/r_sdk"
          isLast
        />

        <a
          href={altLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            borderRadius: 8,
            padding: 12,
            fontSize: 14,
            fontWeight: 600,
            textAlign: 'center',
            textDecoration: 'none',
            marginTop: 12,
          }}
        >
          Open in Workspace ↗
        </a>
      </div>

      {/* Provider card */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
        }}
      >
        <SectionLabel>Provider</SectionLabel>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 8,
          }}
        >
          {providerName}
        </div>
        {collection.providers?.[0]?.description && (
          <div
            style={{
              fontSize: 14,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            {collection.providers[0].description}
          </div>
        )}
        {collection.providers?.[0]?.url && (
          <a
            href={collection.providers[0].url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              color: 'var(--color-sidebar-accent)',
              textDecoration: 'none',
            }}
          >
            Visit website ↗
          </a>
        )}
      </div>

      {/* Data preview panel — only shown when description hints at structured data */}
      {hasDataPreview && (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <SectionLabel>Data preview</SectionLabel>
          <p
            style={{
              fontSize: 13,
              color: 'var(--color-text-secondary)',
              marginBottom: 12,
              lineHeight: 1.6,
            }}
          >
            Explore the full dataset on Hub Ocean
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href={altLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-sidebar-accent)',
                border: '1px solid var(--color-sidebar-accent)',
                borderRadius: 6,
                padding: '6px 12px',
                textDecoration: 'none',
              }}
            >
              Explore table ↗
            </a>
            <a
              href={altLink || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-sidebar-accent)',
                border: '1px solid var(--color-sidebar-accent)',
                borderRadius: 6,
                padding: '6px 12px',
                textDecoration: 'none',
              }}
            >
              Explore map ↗
            </a>
          </div>
        </div>
      )}
    </div>
  )

  // ─── Main content ────────────────────────────────────────────────────────────

  return (
    <AppShell activeCategory="" onCategoryChange={() => {}}>
      <div style={{ paddingTop: 0 }}>

        {/* Toolbar (sticky) */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backgroundColor: 'var(--color-bg)',
            marginLeft: isMobile ? -16 : -32,
            marginRight: isMobile ? -16 : -32,
            padding: isMobile ? '12px 16px' : '16px 32px',
            marginBottom: 24,
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <UserMenu onCategoryChange={() => {}} />
          </div>
        </div>

        {/* Back button */}
        <button
          type="button"
          onClick={() => void navigate({ to: '/catalog' })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-secondary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginBottom: 24,
          }}
        >
          ← Back to catalog
        </button>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1fr 360px',
            gap: 40,
            alignItems: 'start',
          }}
        >
          {/* ── Left column ──────────────────────────────────────── */}
          <div>

            {/* Hero section */}
            <h1
              style={{
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 700,
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.3,
                marginBottom: 12,
              }}
            >
              {collection.title || collection.id}
            </h1>

            {/* Meta row: provider · license · open/restricted */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                marginBottom: 24,
              }}
            >
              <span>{providerName}</span>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span>{licenseInfo.label}</span>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <span
                style={{
                  color: licenseInfo.open
                    ? 'var(--color-license-open-text)'
                    : 'var(--color-license-restricted-text)',
                }}
              >
                {licenseInfo.open ? 'Open' : 'Restricted'}
              </span>
            </div>

            {/* Description section */}
            <div style={{ marginBottom: 32 }}>
              <SectionLabel>About this dataset</SectionLabel>
              <p
                style={{
                  fontSize: 15,
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                  whiteSpace: 'pre-line',
                  margin: 0,
                }}
              >
                {descDisplay}
              </p>
              {descNeedsTruncation && (
                <button
                  type="button"
                  onClick={() => setDescExpanded((v) => !v)}
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-sidebar-accent)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span style={{ textDecoration: 'underline' }}>
                    {descExpanded ? 'Show less' : 'Show more'}
                  </span>
                </button>
              )}
            </div>

            {/* Datasets section — from mock Catalog API v2 data */}
            {allDatasets.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                {/* Section header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <SectionLabel>Datasets in this collection</SectionLabel>
                    <span style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 99,
                      padding: '2px 8px',
                      fontSize: 11,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-secondary)',
                      marginTop: -10,
                    }}>
                      {allDatasets.length} datasets
                    </span>
                  </div>
                  {altLink && (
                    <a
                      href={altLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 13, color: 'var(--color-sidebar-accent)', textDecoration: 'none', flexShrink: 0 }}
                    >
                      View all on Hub Ocean ↗
                    </a>
                  )}
                </div>

                {/* Dataset rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {visibleDatasets.map((ds) => (
                    <DatasetRow key={ds.id} dataset={ds} />
                  ))}
                </div>

                {/* Show all button */}
                {allDatasets.length > DATASET_LIMIT && (
                  <button
                    type="button"
                    onClick={() => setDatasetsExpanded((v) => !v)}
                    style={{
                      marginTop: 10,
                      fontSize: 13,
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-sidebar-accent)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span style={{ textDecoration: 'underline' }}>
                      {datasetsExpanded ? 'Show less' : `Show all ${allDatasets.length} datasets`}
                    </span>
                  </button>
                )}

                {/* Attribution note */}
                <p style={{
                  marginTop: 8,
                  fontSize: 11,
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}>
                  Dataset listing sourced from Hub Ocean Catalog API v2. Full access requires authentication.
                </p>
              </div>
            )}

            {/* Keywords section */}
            {keywords.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <SectionLabel>Keywords</SectionLabel>
                <div
                  style={{
                    maxHeight: keywordsExpanded ? 'none' : 96,
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  {keywords.map((kw) => (
                    <KeywordPill
                      key={kw}
                      keyword={kw}
                      onClick={() => void navigate({ to: '/catalog', search: { keyword: kw } })}
                    />
                  ))}
                </div>
                {keywords.length > 8 && (
                  <button
                    type="button"
                    onClick={() => setKeywordsExpanded((v) => !v)}
                    style={{
                      marginTop: 8,
                      fontSize: 13,
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--color-sidebar-accent)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span style={{ textDecoration: 'underline' }}>
                      {keywordsExpanded ? 'Show less' : `Show more (${keywords.length} keywords)`}
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* Related datasets */}
            {/* {related.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <SectionLabel>More from this provider</SectionLabel>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 12,
                  }}
                >
                  {related.map((c) => (
                    <DatasetCard key={c.id} collection={c} />
                  ))}
                </div>
              </div>
            )} */}
          </div>

          {/* ── Right column ─────────────────────────────────────── */}
          <div style={{ position: isTablet ? 'static' : 'sticky', top: 24 }}>
            {rightColumn}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

// ─── KeywordPill (local — hover state via React) ──────────────────────────────

function KeywordPill({ keyword, onClick }: { keyword: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 99,
        padding: '4px 12px',
        fontSize: 12,
        fontFamily: 'var(--font-sans)',
        color: hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        cursor: 'pointer',
        transition: 'border-color 0.15s, color 0.15s',
      }}
    >
      {keyword}
    </button>
  )
}

// ─── DatasetRow ────────────────────────────────────────────────────────────────

function DatasetRow({ dataset }: { dataset: CatalogDataset }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const isPublished = dataset.publish_status === 'published'
  const hasMock = getMockDataset(dataset.id) !== null

  const handleClick = () => {
    if (hasMock) {
      void navigate({ to: '/datasets/$id', params: { id: dataset.id } })
    } else {
      window.open(
        `https://app.hubocean.earth/catalog/dataset/${dataset.id}`,
        '_blank',
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${hasMock ? 'View' : 'Open'} dataset: ${dataset.name}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-sidebar-accent)' : 'var(--color-border)'}`,
        borderRadius: 8,
        padding: '12px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Left: name + status badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <span style={{
          fontSize: 14,
          fontWeight: 500,
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text-primary)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
          {dataset.name}
        </span>
        <span style={{
          flexShrink: 0,
          padding: '2px 8px',
          borderRadius: 99,
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          backgroundColor: isPublished ? 'var(--color-license-open-bg)' : 'var(--color-surface-elevated)',
          color: isPublished ? 'var(--color-license-open-text)' : 'var(--color-text-muted)',
          border: `1px solid ${isPublished ? 'var(--color-license-open-border)' : 'var(--color-border)'}`,
        }}>
          {dataset.publish_status}
        </span>
      </div>

      {/* Right: internal (→) or external (↗) arrow */}
      <span style={{
        fontSize: 14,
        color: hasMock ? 'var(--color-accent)' : 'var(--color-text-muted)',
        flexShrink: 0,
        transition: 'color 0.15s',
      }}>
        {hasMock ? '→' : '↗'}
      </span>
    </div>
  )
}
