/**
 * SpatialThumbnail — SVG mini-map with real world coastlines.
 *
 * Data source: world-atlas@2 countries-110m.json (via jsDelivr CDN)
 * Projection:  equirectangular
 *   toX(lng) = (lng + 180) / 360 * W
 *   toY(lat) = (90 − lat) / 180 * H
 *
 * size variants:
 *   thumb  — 72×52px fixed (card list / inline use)
 *   cover  — 100%×100%, viewBox 300×200, fills parent container
 *
 * Topology is fetched once and cached at module level.
 * Always dark — never follows light/dark theme.
 */

import { useEffect, useState } from 'react'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, Geometry, GeoJsonProperties, FeatureCollection } from 'geojson'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SpatialThumbnailProps {
  /** STAC bbox: [west, south, east, north] in WGS84 decimal degrees */
  bbox: [number, number, number, number]
  /** Human-readable region label — used in aria-label */
  label: string
  /** thumb = 72×52px fixed | cover = 100%×100% responsive */
  size?: 'thumb' | 'cover'
}

// ─── Topology cache ───────────────────────────────────────────────────────────

const WORLD_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

let cachedTopology: Topology | null = null
let fetchPromise: Promise<Topology> | null = null

function getTopology(): Promise<Topology> {
  if (cachedTopology) return Promise.resolve(cachedTopology)
  if (fetchPromise) return fetchPromise
  fetchPromise = fetch(WORLD_URL)
    .then(r => r.json() as Promise<Topology>)
    .then(data => {
      cachedTopology = data
      return data
    })
  return fetchPromise
}

// ─── Coordinate helpers ───────────────────────────────────────────────────────

function toX(lng: number, W: number): number {
  return ((lng + 180) / 360) * W
}

function toY(lat: number, H: number): number {
  return ((90 - lat) / 180) * H
}

function ringToPath(coords: number[][], W: number, H: number): string {
  if (coords.length < 2) return ''
  return (
    coords
      .map((pt: number[], i: number) => {
        const x = toX(pt[0], W).toFixed(1)
        const y = toY(pt[1], H).toFixed(1)
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ') + ' Z'
  )
}

function geoToPath(
  f: Feature<Geometry, GeoJsonProperties>,
  W: number,
  H: number
): string | null {
  const geo = f.geometry
  if (!geo) return null

  if (geo.type === 'Polygon') {
    return (geo.coordinates as number[][][]).map((ring: number[][]) => ringToPath(ring, W, H)).join(' ')
  }
  if (geo.type === 'MultiPolygon') {
    return (geo.coordinates as number[][][][])
      .map((polygon: number[][][]) => polygon.map((ring: number[][]) => ringToPath(ring, W, H)).join(' '))
      .join(' ')
  }
  return null
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SpatialThumbnail({
  bbox,
  label,
  size = 'thumb',
}: SpatialThumbnailProps) {
  const isCover = size === 'cover'
  const W = isCover ? 300 : 72
  const H = isCover ? 200 : 52

  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    let cancelled = false
    getTopology().then(topology => {
      if (cancelled) return
      const result = feature(
        topology,
        topology.objects.countries as GeometryCollection
      ) as FeatureCollection<Geometry, GeoJsonProperties>
      const ps = result.features
        .map((f: Feature<Geometry, GeoJsonProperties>) => geoToPath(f, W, H))
        .filter((d: string | null): d is string => d !== null && d.length > 0)
      setPaths(ps)
    })
    return () => { cancelled = true }
  }, [W, H])

  // ─── bbox geometry ──────────────────────────────────────────────────────────
  const isGlobal = bbox[0] <= -179 && bbox[2] >= 179
  const isPoint =
    !isGlobal &&
    Math.abs(bbox[2] - bbox[0]) < 1 &&
    Math.abs(bbox[3] - bbox[1]) < 1

  const x1 = toX(bbox[0], W)
  const y1 = toY(bbox[3], H)
  const x2 = toX(bbox[2], W)
  const y2 = toY(bbox[1], H)
  const bw = Math.max(4, x2 - x1)
  const bh = Math.max(4, y2 - y1)
  const cx = x1 + bw / 2
  const cy = y1 + bh / 2

  const filterId = `glow-${size}`
  const ariaLabel = `Spatial coverage: ${label}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={isCover ? 'xMidYMid slice' : 'xMidYMid meet'}
      width={isCover ? '100%' : W}
      height={isCover ? '100%' : H}
      role="img"
      aria-label={ariaLabel}
      style={{ display: 'block' }}
    >
      <title>{ariaLabel}</title>

      <defs>
        <filter id={filterId}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. 海洋背景 — 永遠深色，不跟隨 theme */}
      <rect width={W} height={H} fill="#0d1117" aria-hidden="true" />

      {/* 2. 陸地（真實海岸線輪廓） — 單色，無邊界線 */}
      <g aria-hidden="true">
        {paths.map((d, i) => (
          <path key={i} d={d} fill="#1c2b3a" stroke="none" />
        ))}
      </g>

      {/* 3. bbox highlight — 唯一強調色 */}
      {isGlobal ? (
        <text
          x={W / 2}
          y={H / 2 + 5}
          textAnchor="middle"
          fill="#03FFD1"
          opacity="0.5"
          fontSize={W * 0.06}
          fontFamily="Roboto Mono, monospace"
          letterSpacing="0.1em"
          aria-hidden="true"
        >
          GLOBAL
        </text>
      ) : isPoint ? (
        <g aria-hidden="true">
          <circle
            cx={cx}
            cy={cy}
            r={W / 20}
            fill="#03FFD1"
            opacity="0.15"
            filter={`url(#${filterId})`}
          />
          <circle
            cx={cx}
            cy={cy}
            r={4}
            fill="#03FFD1"
            opacity="0.9"
            filter={`url(#${filterId})`}
          />
        </g>
      ) : (
        <rect
          x={x1}
          y={y1}
          width={bw}
          height={bh}
          fill="rgba(3,255,209,0.12)"
          stroke="#03FFD1"
          strokeWidth={isCover ? 1.5 : 1}
          rx="2"
          filter={`url(#${filterId})`}
          aria-hidden="true"
        />
      )}
    </svg>
  )
}
