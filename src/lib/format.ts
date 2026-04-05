/**
 * format.ts — Pure display formatting utilities
 *
 * All functions are pure (no side effects, no external deps).
 * Input shapes match the Hub Ocean STAC API response.
 * Reference: .claude/skills/geo-data-viz.md, .claude/skills/stac-api.md
 */

import type { STACCollection } from './stac'

// ─── Spatial ─────────────────────────────────────────────────────────────────

/**
 * Convert a STAC bbox to a human-readable region label.
 * bbox format: [west, south, east, north] in WGS84 decimal degrees.
 * Always call with bbox[0] — some collections have hundreds of entries.
 */
export function bboxToRegionLabel(
  bbox: [number, number, number, number],
): string {
  const [west, south, east, north] = bbox
  const latSpan = north - south
  const lngSpan = Math.abs(east - west)

  if (latSpan > 140 && lngSpan > 300) return 'Global'
  if (south < -70) return 'Antarctica'
  if (south < -50 && north < -30) return 'Southern Ocean'
  if (north > 70) return 'Arctic Ocean'
  if (west > -5 && east < 40 && north > 50) return 'Norwegian / North Sea'
  if (west > 90 && east < 180 && north > 0) return 'North Pacific'
  if (west > -80 && east < 20 && south > -40 && north < 40) return 'Atlantic'
  if (west > 20 && east < 130 && south > -40 && north < 30) return 'Indian Ocean'

  // Fallback: coordinate range label
  const latStr = (lat: number, isNorth: boolean) =>
    `${Math.abs(lat).toFixed(0)}°${lat >= 0 ? (isNorth ? 'N' : 'N') : 'S'}`
  return `${latStr(south, false)} – ${latStr(north, true)}`
}

// ─── Temporal ─────────────────────────────────────────────────────────────────

/**
 * Format a collection's temporal extent as "YYYY – YYYY" or "YYYY – Present".
 * Returns 'Unknown' if no interval is defined.
 */
export function formatTemporalRange(collection: STACCollection): string {
  const interval = collection.extent?.temporal?.interval?.[0]
  if (!interval) return 'Unknown'

  const [start, end] = interval
  const startYear = start ? new Date(start).getFullYear() : null
  const endYear = end ? new Date(end).getFullYear() : null

  if (!startYear) return 'Unknown'
  if (!endYear) return `${startYear} – Present`
  if (startYear === endYear) return String(startYear)
  return `${startYear} – ${endYear}`
}

/**
 * Format a collection's temporal extent as a duration string.
 * e.g. "14 years of coverage", "8 months of coverage", "Ongoing"
 */
export function formatTemporalDuration(collection: STACCollection): string {
  const interval = collection.extent?.temporal?.interval?.[0]
  if (!interval) return 'Unknown coverage'

  const [start, end] = interval
  if (!start) return 'Unknown coverage'

  const startMs = new Date(start).getTime()
  const endMs = end ? new Date(end).getTime() : Date.now()
  const diffMs = endMs - startMs

  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25))
  const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44))

  if (!end) {
    if (years >= 1) return `${years} year${years !== 1 ? 's' : ''} · Ongoing`
    if (months >= 1) return `${months} month${months !== 1 ? 's' : ''} · Ongoing`
    return 'Ongoing'
  }

  if (years >= 1) return `${years} year${years !== 1 ? 's' : ''} of coverage`
  if (months >= 1) return `${months} month${months !== 1 ? 's' : ''} of coverage`
  return 'Less than 1 month'
}

// ─── License ─────────────────────────────────────────────────────────────────

export interface LicenseInfo {
  /** Short human-readable label — shown in Badge, e.g. "CC BY 4.0" */
  label: string
  /** True if data is openly licensed (CC BY, ODC-By, CC0, EMODnet Open) */
  open: boolean
  /** True if commercial use is permitted */
  commercial: boolean
}

/**
 * Keys are lowercase versions of STAC license strings.
 * getLicenseInfo() normalises input with .toLowerCase() before lookup,
 * so "CC-BY-4.0" and "cc-by-4.0" both resolve correctly.
 * Source: actual Hub Ocean STAC API responses (2026-04-03).
 */
const LICENSE_MAP: Record<string, LicenseInfo> = {
  'odc-by-1.0':                            { label: 'ODC-By 1.0',         open: true,  commercial: true  },
  'odbl-1.0':                              { label: 'ODbL 1.0',            open: true,  commercial: true  },
  'cc-by-4.0':                             { label: 'CC BY 4.0',           open: true,  commercial: true  },
  'attribution-4.0-international-cc-by-4.0': { label: 'CC BY 4.0',        open: true,  commercial: true  },
  'cc-by-sa-4.0':                          { label: 'CC BY-SA 4.0',        open: true,  commercial: true  },
  'cc-by-nc-4.0':                          { label: 'CC BY-NC 4.0',        open: false, commercial: false },
  'cc-by-nc-sa-4.0':                       { label: 'CC BY-NC-SA 4.0',     open: false, commercial: false },
  'cc0-1.0':                               { label: 'CC0 / Public Domain', open: true,  commercial: true  },
  'emodnet_open':                          { label: 'EMODnet Open',         open: true,  commercial: true  },
  'proprietary':                           { label: 'Proprietary',          open: false, commercial: false },
  'gebco-terms-and-conditions':            { label: 'GEBCO',               open: false, commercial: false },
  'other':                                 { label: 'Custom',               open: false, commercial: false },
}

/**
 * Return structured license info for a STAC license string.
 * Lookup is case-insensitive. Falls back to { open: false, commercial: false }
 * for unknown licenses so they render as the most restrictive badge variant.
 */
export function getLicenseInfo(license: string): LicenseInfo {
  if (!license) {
    return { label: 'No license', open: false, commercial: false }
  }
  const key = license.toLowerCase()
  if (LICENSE_MAP[key]) return LICENSE_MAP[key]
  const fallbackLabel = license.length > 15 ? license.slice(0, 15) + '…' : license
  return { label: fallbackLabel, open: false, commercial: false }
}

// ─── Record Count ─────────────────────────────────────────────────────────────

/**
 * Format a raw record count to a human-readable string.
 * e.g. 1000 → "1K", 2200000 → "2.2M", 500 → "500"
 */
export function formatRecordCount(count: number): string {
  if (!Number.isFinite(count) || count < 0) return 'Unknown'
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(count)
}
