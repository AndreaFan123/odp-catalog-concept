import { cn } from '../../lib/cn'

export interface SkeletonProps {
  className?: string
}

/**
 * Skeleton — shape-fidelity loading placeholder.
 *
 * Shape fidelity rule (style-guide.md §Skeleton):
 * Generic grey bars are not acceptable. Each skeleton must match
 * the exact shape of the real content it represents.
 *
 * Animation: pulse shimmer. Disabled via prefers-reduced-motion.
 * Colors: --skeleton-base / --skeleton-shimmer from tokens.
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('rounded animate-pulse', className)}
      style={{
        backgroundColor: 'var(--color-skeleton-base)',
      }}
      aria-hidden="true"
    />
  )
}

/**
 * DatasetCardSkeleton — exact shape replica of DatasetCard.
 *
 * Layout mirrors DatasetCard (style-guide.md §DatasetCard):
 * - Thumbnail block (72×52px, matches SpatialThumbnail sm)
 * - License badge pill (right-aligned)
 * - Title (h-6, w-3/4)
 * - Description (two lines: full + 2/3)
 * - Metadata row (three small items)
 * - Keyword pills (three small pills)
 *
 * The entire card is aria-hidden — screen readers should wait
 * for real content. The parent should expose a live region
 * ("Loading datasets…") to communicate loading state.
 */
export function DatasetCardSkeleton() {
  return (
    <div
      className="rounded-xl p-6 border"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border-default)',
      }}
      aria-hidden="true"
    >
      {/* Row 1: thumbnail + license badge */}
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="w-[72px] h-[52px] rounded-md" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>

      {/* Row 2: title */}
      <Skeleton className="h-6 w-3/4 mb-2 rounded" />

      {/* Row 3: description (2 lines) */}
      <Skeleton className="h-4 w-full mb-1.5 rounded" />
      <Skeleton className="h-4 w-2/3 mb-4 rounded" />

      {/* Row 4: metadata row */}
      <div className="flex gap-3 mb-4">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>

      {/* Row 5: keyword pills */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>
  )
}
