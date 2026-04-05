/**
 * DatasetCard — Spotify-style card (DD-10).
 *
 * Layout:
 *   Top: 16:9 map cover (SpatialThumbnail size="cover")
 *        — save button top-left (♡)
 *   Bottom: title (2-line clamp), meta (provider · year), region tag,
 *           license ("ODC-By 1.0 · Open")
 */

import { useState, useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useWindowWidth, BP_TABLET } from '../../lib/useWindowWidth'
import type { STACCollection } from '../../lib/stac'
import { bboxToRegionLabel, getLicenseInfo } from '../../lib/format'
import { cn } from '../../lib/cn'
import { SpatialThumbnail } from './SpatialThumbnail'

// ─── localStorage helpers ──────────────────────────────────────────────────────

const SAVED_KEY = 'odp-saved-datasets'

function getSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

function toggleSavedId(id: string): boolean {
  const ids = getSavedIds()
  const index = ids.indexOf(id)
  if (index === -1) {
    ids.push(id)
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids))
    return true
  } else {
    ids.splice(index, 1)
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids))
    return false
  }
}

// ─── Exported helper for catalog filtering ────────────────────────────────────

export { getSavedIds }

// ─── SaveButton ───────────────────────────────────────────────────────────────

function SaveButton({ collectionId }: { collectionId: string }) {
  const [saved, setSaved] = useState(() => getSavedIds().includes(collectionId))
  const [hovered, setHovered] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const nowSaved = toggleSavedId(collectionId)
    setSaved(nowSaved)
  }, [collectionId])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      const nowSaved = toggleSavedId(collectionId)
      setSaved(nowSaved)
    }
  }, [collectionId])

  return (
    <button
      type="button"
      className="save-button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={saved ? `Remove from saved` : `Save dataset`}
      aria-pressed={saved}
      style={{
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 10,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: 'none',
        background: hovered ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: saved ? '#03FFD1' : 'rgba(255,255,255,0.9)',
        transition: 'background 0.15s, color 0.15s',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {saved ? (
          <path
            d="M8 13.5s-6-3.8-6-7.5C2 4 3.5 2.5 5.5 2.5c1 0 2 .5 2.5 1.3.5-.8 1.5-1.3 2.5-1.3C12.5 2.5 14 4 14 6c0 3.7-6 7.5-6 7.5z"
            fill="currentColor"
          />
        ) : (
          <path
            d="M8 13.5s-6-3.8-6-7.5C2 4 3.5 2.5 5.5 2.5c1 0 2 .5 2.5 1.3.5-.8 1.5-1.3 2.5-1.3C12.5 2.5 14 4 14 6c0 3.7-6 7.5-6 7.5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )}
      </svg>
    </button>
  )
}

// ─── DatasetCard ──────────────────────────────────────────────────────────────

export interface DatasetCardProps {
  collection: STACCollection
  className?: string
  onKeywordClick?: (keyword: string) => void
}

function getProviderName(collection: STACCollection): string | null {
  const host = collection.providers?.find((p) =>
    p.roles?.includes('host') || p.roles?.includes('producer'),
  )
  return host?.name ?? collection.providers?.[0]?.name ?? null
}

function getStartYear(collection: STACCollection): number | null {
  const start = collection.extent?.temporal?.interval?.[0]?.[0]
  if (!start) return null
  return new Date(start).getFullYear()
}

export function DatasetCard({
  collection,
  className,
  onKeywordClick: _onKeywordClick,
}: DatasetCardProps) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const isMobile = useWindowWidth() < BP_TABLET

  const bbox = collection.extent?.spatial?.bbox?.[0] as
    | [number, number, number, number]
    | undefined

  const regionLabel = bbox ? bboxToRegionLabel(bbox) : null
  const licenseInfo = getLicenseInfo(collection.license)

  const providerName = getProviderName(collection)
  const startYear = getStartYear(collection)
  const metaParts = [providerName, startYear?.toString()].filter(Boolean)

  const handleCardClick = () => {
    void navigate({ to: '/collections/$id', params: { id: collection.id } })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCardClick()
    }
  }

  return (
    <article
      className={cn('dataset-card', className)}
      style={{
        backgroundColor: hovered
          ? 'var(--color-surface-elevated)'
          : 'var(--color-surface)',
        padding: 0,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        borderRadius: 8,
        overflow: 'hidden',
      }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="article"
    >
      {/* Map cover — 16:9 on desktop, fixed 100px on mobile */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          ...(isMobile ? { height: 100 } : { aspectRatio: '16/9' }),
          overflow: 'hidden',
          backgroundColor: '#0d1117',
          flexShrink: 0,
        }}
      >
        {/* Map fills cover absolutely */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {bbox ? (
            <SpatialThumbnail
              bbox={bbox}
              label={regionLabel ?? collection.title ?? collection.id}
              size="cover"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              No spatial data
            </div>
          )}
        </div>

        {/* Save button — top-left, above map */}
        <SaveButton collectionId={collection.id} />
      </div>

      {/* Info section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: isMobile ? 10 : '14px 16px' }}>
        {/* Title */}
        <div
          style={{
            fontSize: isMobile ? 13 : 15,
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {collection.title || collection.id}
        </div>

        {/* Provider · Year */}
        {metaParts.length > 0 && (
          <div
            style={{
              fontSize: isMobile ? 11 : 13,
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-secondary)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {metaParts.join(' · ')}
          </div>
        )}

        {/* Region tag */}
        {regionLabel && (
          <div
            style={{
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
            }}
          >
            {regionLabel}
          </div>
        )}

        {/* License — label · Open / Restricted */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'baseline',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            marginTop: 'auto',
          }}
        >
          <span style={{ color: 'var(--color-text-muted)' }}>
            {licenseInfo.label}
          </span>
          <span style={{ color: 'var(--color-text-muted)' }}>·</span>
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
      </div>
    </article>
  )
}
