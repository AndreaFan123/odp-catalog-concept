/**
 * DatasetDetailPage — Individual dataset detail view.
 *
 * Route: /datasets/:id
 * Data source: mockDatasetData.ts (Hub Ocean Catalog API v2 — auth required,
 * stored as static mock for portfolio use).
 *
 * Layout (mirrors DetailPage DD-17):
 *   Sticky toolbar (ThemeToggle + UserMenu)
 *   Back button (full width, above grid)
 *   Two-column grid: 1fr 360px on desktop (≥1024px), 1fr on tablet/mobile
 *     Left:  title + badges, description, keywords, citation
 *     Right: Data Contents card (files/size/formats) + metadata card
 *            (Part of Collection, Provider, License)
 */

import { useState } from 'react'
import { useParams, useNavigate, Link } from '@tanstack/react-router'
import { AppShell } from '../components/layout/AppShell'
import { UserMenu } from '../components/layout/UserMenu'
import { getMockDataset } from '../lib/mockDatasetData'
import type { MockDataset } from '../lib/mockDatasetData'
import { useWindowWidth, BP_TABLET, BP_DESKTOP } from '../lib/useWindowWidth'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(0)} MB`
  return `${Math.round(bytes / 1e3)} KB`
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--color-text-primary)',
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  )
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        fontSize: 14,
        fontFamily: 'var(--font-sans)',
        lineHeight: 1.6,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 140,
          color: 'var(--color-text-secondary)',
          fontSize: 13,
        }}
      >
        {label}
      </span>
      <span style={{ color: 'var(--color-text-primary)' }}>{children}</span>
    </div>
  )
}

function DatasetNotFound({ id }: { id: string }) {
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 16,
        padding: 32,
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 16, color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
        Dataset not found.
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
        ID: {id}
      </p>
      <button
        type="button"
        onClick={() => void navigate({ to: '/catalog' })}
        style={{
          fontSize: 14,
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-sidebar-accent)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        ← Back to catalog
      </button>
    </div>
  )
}

// ─── DatasetContent ───────────────────────────────────────────────────────────

function DatasetContent({ dataset }: { dataset: MockDataset }) {
  const navigate = useNavigate()
  const width = useWindowWidth()
  const isMobile = width < BP_TABLET
  const isTablet = width < BP_DESKTOP
  const [citationCopied, setCitationCopied] = useState(false)
  const [uuidCopied, setUuidCopied] = useState(false)
  const [codeExamplesHovered, setCodeExamplesHovered] = useState(false)

  const { tabular_metadata, collection, provider, license, citations, tags } = dataset
  const files = tabular_metadata.files
  const formats = Object.entries(files.formats)
  const isPublished = dataset.publish_status === 'published'

  const citationText = citations[0]?.text ?? ''

  const handleCopyCitation = () => {
    void navigator.clipboard.writeText(citationText).then(() => {
      setCitationCopied(true)
      setTimeout(() => setCitationCopied(false), 2000)
    })
  }

  const handleCopyUUID = () => {
    void navigator.clipboard.writeText(dataset.id).then(() => {
      setUuidCopied(true)
      setTimeout(() => setUuidCopied(false), 2000)
    })
  }

  return (
    <div
      style={{
        width: '100%',
        padding: isMobile ? '20px 16px' : '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Back button — full width, above grid */}
      <button
        type="button"
        onClick={() => void navigate({
          to: '/collections/$id',
          params: { id: collection.id },
        })}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text-secondary)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          alignSelf: 'flex-start',
        }}
      >
        <span style={{ fontSize: 16 }}>←</span>
        <span>Back to {collection.name}</span>
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
        {/* ── Left column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Title + badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '2px 8px',
                  borderRadius: 99,
                  border: `1px solid ${isPublished ? 'var(--color-license-open-border)' : 'var(--color-border)'}`,
                  backgroundColor: isPublished ? 'var(--color-license-open-bg)' : 'var(--color-surface-elevated)',
                  color: isPublished ? 'var(--color-license-open-text)' : 'var(--color-text-muted)',
                }}
              >
                {dataset.publish_status}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 99,
                  padding: '2px 8px',
                }}
              >
                Dataset
              </span>
            </div>
            <h1
              style={{
                fontSize: isMobile ? 22 : 28,
                fontWeight: 700,
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              {dataset.name}
            </h1>
          </div>

          {/* Data Contents */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {/* File data badge */}
            <span
              style={{
                alignSelf: 'flex-start',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 99,
                backgroundColor: 'var(--color-surface-elevated)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              File data
            </span>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  FILES
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
                  {files.num_files.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                  SIZE
                </span>
                <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)' }}>
                  {formatBytes(files.total_byte_size)}
                </span>
              </div>
            </div>

            {/* Formats */}
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                FORMATS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {formats.map(([fmt, info]) => (
                  <div
                    key={fmt}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontFamily: 'var(--font-mono)',
                          padding: '1px 7px',
                          borderRadius: 4,
                          backgroundColor: 'var(--color-surface-elevated)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {fmt}
                      </span>
                      <span style={{ fontSize: 13, fontFamily: 'var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                        {info.count.toLocaleString()} file{info.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                      {formatBytes(info.total_size)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <SectionLabel>About this dataset</SectionLabel>
            <p
              style={{
                fontSize: 15,
                fontFamily: 'var(--font-sans)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {dataset.description}
            </p>
          </div>

          {/* Keywords */}
          {tags.length > 0 && (
            <div>
              <SectionLabel>Keywords</SectionLabel>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 4,
                      padding: '3px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Citation */}
          {citationText && (
            <div>
              <SectionLabel>Citation</SectionLabel>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  padding: '14px 44px 14px 16px',
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {citationText}
                </p>
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  aria-label="Copy citation"
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: citationCopied ? 'var(--color-sidebar-accent)' : 'var(--color-text-secondary)',
                    background: 'none',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'color 0.15s',
                    padding: 0,
                  }}
                >
                  {citationCopied ? (
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-sans)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      Copied!
                    </span>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right column (sticky) ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: isTablet ? 'static' : 'sticky',
            top: 64,
          }}
        >
          {/* USE THIS DATASET panel */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <SectionLabel>Use this dataset</SectionLabel>

            {/* UUID row */}
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                  marginBottom: 6,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                UUID
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-surface-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 6,
                    padding: '6px 10px',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {dataset.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyUUID}
                  aria-label="Copy UUID"
                  style={{
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: uuidCopied ? 'var(--color-sidebar-accent)' : 'var(--color-text-secondary)',
                    background: 'none',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'color 0.15s',
                    padding: 0,
                  }}
                >
                  {uuidCopied ? (
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-sans)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      Copied!
                    </span>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--color-border)', marginBottom: 16 }} />

            {/* SDK links */}
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-muted)',
                  marginBottom: 12,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Python &amp; R SDK
              </div>

              {/* Python SDK */}
              <a
                href="https://docs.hubocean.earth/python_sdk/intro/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                    Python SDK
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                    docs.hubocean.earth/python_sdk
                  </div>
                </div>
                <span style={{ fontSize: 16, color: 'var(--color-text-muted)', flexShrink: 0, paddingLeft: 8 }}>↗</span>
              </a>

              {/* R SDK */}
              <a
                href="https://docs.hubocean.earth/r_sdk/intro/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-border)',
                  textDecoration: 'none',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', fontFamily: 'var(--font-sans)' }}>
                    R SDK
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                    docs.hubocean.earth/r_sdk
                  </div>
                </div>
                <span style={{ fontSize: 16, color: 'var(--color-text-muted)', flexShrink: 0, paddingLeft: 8 }}>↗</span>
              </a>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--color-border)', marginBottom: 12 }} />

            {/* Code Examples button */}
            <button
              type="button"
              onMouseEnter={() => setCodeExamplesHovered(true)}
              onMouseLeave={() => setCodeExamplesHovered(false)}
              style={{
                width: '100%',
                background: 'transparent',
                border: `1px solid ${codeExamplesHovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: 8,
                padding: 10,
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                color: codeExamplesHovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 12,
                transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>&lt;/&gt;</span>
              Show Code Examples
            </button>

            {/* Divider */}
            <div style={{ borderTop: '1px solid var(--color-border)', margin: '16px 0 0' }} />

            {/* Open in Workspace CTA */}
            <a
              href={`https://app.hubocean.earth/catalog/dataset/${dataset.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: 'var(--color-accent)',
                color: '#0d1117',
                borderRadius: 8,
                padding: 12,
                fontSize: 14,
                fontWeight: 600,
                width: '100%',
                textAlign: 'center',
                textDecoration: 'none',
                marginTop: 12,
                fontFamily: 'var(--font-sans)',
              }}
            >
              Open in Workspace ↗
            </a>
          </div>

          {/* Metadata card */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <MetaRow label="Part of Collection">
              <Link
                to="/collections/$id"
                params={{ id: collection.id }}
                style={{
                  color: 'var(--color-sidebar-accent)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {collection.name} ↗
              </Link>
            </MetaRow>
            <MetaRow label="Provider">{provider.name}</MetaRow>
            <MetaRow label="License">
              <a
                href={license.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-sidebar-accent)', textDecoration: 'none' }}
              >
                {license.name}
              </a>
              {' '}— {license.text}
            </MetaRow>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── DatasetDetailPage ────────────────────────────────────────────────────────

export function DatasetDetailPage() {
  const { id } = useParams({ from: '/datasets/$id' })

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('odp-theme') as 'light' | 'dark') ?? 'light'
    } catch {
      return 'light'
    }
  })

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('odp-theme', next) } catch { /* ignore */ }
  }

  const dataset = getMockDataset(id)

  return (
    <AppShell>
      {/* Toolbar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 16px',
          height: 48,
          gap: 8,
        }}
      >
        {/* Theme toggle */}
        <button
          type="button"
          onClick={handleThemeToggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
            fontSize: 16,
          }}
        >
          {theme === 'dark' ? '☀︎' : '☽'}
        </button>
        <UserMenu onCategoryChange={() => {}} />
      </div>

      {/* Content */}
      <main id="main-content">
        {dataset ? (
          <DatasetContent dataset={dataset} />
        ) : (
          <DatasetNotFound id={id} />
        )}
      </main>
    </AppShell>
  )
}
