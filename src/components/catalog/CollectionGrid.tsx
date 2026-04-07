import type { STACCollection } from '../../lib/stac'
import { CollectionCard } from './CollectionCard'
import { DatasetCardSkeleton } from '../ui/Skeleton'

export interface CollectionGridProps {
  collections: STACCollection[]
  onKeywordClick?: (keyword: string) => void
}

// Grid columns are controlled by globals.css .collection-grid
// (responsive: auto-fill desktop, 2-col mobile)
const GRID_CLASS = 'collection-grid'

/**
 * CollectionGrid — responsive dataset grid.
 *
 * Auto-fill grid: 280px minimum column width, fills available space.
 * At 1280px: ~3 columns. At 768px: ~2 columns. At 400px: 1 column.
 *
 * Empty state: shown when collections array is empty (after filtering).
 */

function EmptyState({ hasFilters }: { hasFilters?: boolean }) {
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
      role="status"
      aria-live="polite"
    >
      <p
        className="text-base mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        No collections match your current filters.
      </p>
      <p
        className="text-sm"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {hasFilters
          ? 'Try removing a filter to see more results.'
          : 'No collections are currently available.'}
      </p>
    </div>
  )
}

export function CollectionGrid({ collections, onKeywordClick }: CollectionGridProps) {
  if (collections.length === 0) {
    return (
      <div className={GRID_CLASS}>
        <EmptyState hasFilters />
      </div>
    )
  }

  return (
    <div className={GRID_CLASS} role="feed" aria-label="Collection catalog">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          onKeywordClick={onKeywordClick}
        />
      ))}
    </div>
  )
}

/**
 * CollectionGridSkeleton — 6-card loading placeholder.
 * Shown immediately while getCollections() is in flight.
 * Parent must expose a live region announcing "Loading datasets…"
 */
export function CollectionGridSkeleton() {
  return (
    <div className={GRID_CLASS} aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <DatasetCardSkeleton key={i} />
      ))}
    </div>
  )
}
