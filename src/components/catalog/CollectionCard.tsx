/**
 * CollectionCard — compact list card for catalog grid (DD-10).
 *
 * Layout (fixed 200px height):
 *   Row 1: collection-type badge + license badge
 *   Row 2: title (2-line clamp)
 *   Row 3: provider · year
 *   Row 4: region badge + dataset count
 *   Row 5: keyword pills (max 4 + "+N" overflow)
 *
 * No map thumbnail. Hover: translateY(-2px) + accent border.
 */

import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { STACCollection } from '../../lib/stac'
import { bboxToRegionLabel, getLicenseInfo } from '../../lib/format'
import { MOCK_COLLECTIONS } from '../../lib/mockCollectionData'

// ─── localStorage helpers ──────────────────────────────────────────────────────

const SAVED_KEY = 'odp-saved-datasets'

export function getSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as string[]) : []
  } catch {
    return []
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function getDatasetCount(collectionId: string): number | null {
  const mock = MOCK_COLLECTIONS[collectionId]
  return mock ? mock.datasets.length : null
}

// ─── CollectionCard ───────────────────────────────────────────────────────────

export interface CollectionCardProps {
  collection: STACCollection
  className?: string
  onKeywordClick?: (keyword: string) => void
}

export function CollectionCard({ collection, onKeywordClick }: CollectionCardProps) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const bbox = collection.extent?.spatial?.bbox?.[0] as
    | [number, number, number, number]
    | undefined

  const regionLabel = bbox ? bboxToRegionLabel(bbox) : null
  const licenseInfo = getLicenseInfo(collection.license)
  const providerName = getProviderName(collection)
  const startYear = getStartYear(collection)
  const metaParts = [providerName, startYear?.toString()].filter(Boolean)
  const keywords: string[] = collection.keywords ?? []
  const visibleKeywords = keywords.slice(0, 4)
  const overflowCount = keywords.length - visibleKeywords.length
  const datasetCount = getDatasetCount(collection.id)

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
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      role="article"
      style={{
        height: 200,
        backgroundColor: hovered ? 'var(--color-surface-elevated)' : 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-sidebar-accent)' : 'var(--color-border)'}`,
        borderRadius: 8,
        padding: '14px 16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        overflow: 'hidden',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.15s ease, border-color 0.15s ease, background-color 0.15s',
      }}
    >
      {/* Row 1: badges */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        <span
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: 4,
            padding: '1px 6px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Collection
        </span>
        <span
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            color: licenseInfo.open
              ? 'var(--color-license-open-text)'
              : 'var(--color-license-restricted-text)',
            backgroundColor: licenseInfo.open
              ? 'var(--color-license-open-bg)'
              : 'var(--color-license-restricted-bg)',
            borderRadius: 4,
            padding: '1px 6px',
          }}
        >
          {licenseInfo.label}
        </span>
      </div>

      {/* Row 2: title */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          color: 'var(--color-text-primary)',
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {collection.title || collection.id}
      </div>

      {/* Row 3: provider · year */}
      {metaParts.length > 0 && (
        <div
          style={{
            fontSize: 12,
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-secondary)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            flexShrink: 0,
          }}
        >
          {metaParts.join(' · ')}
        </div>
      )}

      {/* Row 4: region + dataset count */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
        {regionLabel && (
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-border)',
              borderRadius: 4,
              padding: '1px 6px',
            }}
          >
            {regionLabel}
          </span>
        )}
        {datasetCount !== null && (
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-muted)',
            }}
          >
            {datasetCount} dataset{datasetCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Row 5: keyword pills */}
      {visibleKeywords.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 4,
            flexWrap: 'wrap',
            overflow: 'hidden',
            maxHeight: 24,
            marginTop: 'auto',
            flexShrink: 0,
          }}
        >
          {visibleKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onKeywordClick?.(kw)
              }}
              style={{
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 3,
                padding: '1px 5px',
                cursor: onKeywordClick ? 'pointer' : 'default',
                lineHeight: '16px',
              }}
            >
              {kw}
            </button>
          ))}
          {overflowCount > 0 && (
            <span
              style={{
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
                lineHeight: '18px',
              }}
            >
              +{overflowCount}
            </span>
          )}
        </div>
      )}
    </article>
  )
}
