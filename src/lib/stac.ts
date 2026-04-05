/**
 * stac.ts — Hub Ocean STAC API client
 *
 * Base URL: https://api.hubocean.earth/api/stac
 * Auth: None required. CORS: confirmed open.
 *
 * Known behaviors:
 * - description may contain markdown — never use dangerouslySetInnerHTML
 * - temporal.interval end may be null (open-ended = present)
 * - Some collections have hundreds of bbox entries — always use bbox[0]
 * - keywords may contain duplicates — deduplicate before display
 */

const STAC_BASE = 'https://api.hubocean.earth/api/stac'

// ─── TypeScript Interfaces ───────────────────────────────────────────────────

export interface STACProvider {
  name: string
  description?: string
  url?: string
  roles?: string[]
}

export interface STACLink {
  rel: string
  href: string
  type?: string
  title?: string
}

export interface STACExtent {
  spatial: {
    bbox: number[][]  // [west, south, east, north] — use bbox[0] for display
  }
  temporal: {
    interval: (string | null)[][]  // null end = open-ended / present
  }
}

export interface STACCollection {
  id: string
  type: 'Collection'
  stac_version: string
  title: string
  description: string
  license: string
  keywords: string[]
  extent: STACExtent
  providers: STACProvider[]
  links: STACLink[]
  summaries?: Record<string, unknown>
  assets?: Record<string, unknown>
}

export interface STACCollectionList {
  collections: STACCollection[]
  links: STACLink[]
}

export class STACError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'STACError'
  }
}

// ─── API Client ───────────────────────────────────────────────────────────────

export async function getCollections(): Promise<STACCollection[]> {
  const res = await fetch(`${STAC_BASE}/collections`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new STACError(res.status, `Failed to fetch collections: ${res.status} ${res.statusText}`)
  }
  const data: STACCollectionList = await res.json()
  return data.collections
}

export async function getCollection(id: string): Promise<STACCollection> {
  const res = await fetch(`${STAC_BASE}/collections/${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new STACError(res.status, `Collection not found: ${id} (${res.status})`)
  }
  return res.json() as Promise<STACCollection>
}
