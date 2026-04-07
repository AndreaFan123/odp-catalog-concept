/**
 * router.ts — TanStack Router v1 route tree
 *
 * Routes:
 *   /                      Homepage (full-page dark landing)
 *   /catalog               Catalog (dataset grid + search + filters)
 *   /collections/:id       Dataset detail
 *
 * Search params (catalog route):
 *   keyword  string  Free-text search against title/description/keywords
 *   region   string  Region label filter (matches bboxToRegionLabel output)
 *   license  string  License tier filter: 'open' | 'restricted' | 'closed'
 *   category string  Category id filter (matches CATEGORIES ids)
 *   from     number  Temporal filter — year start
 *   to       number  Temporal filter — year end
 *
 * URL-based filter state supports deep-linking and back-button navigation.
 * TanStack Router's validateSearch ensures type-safe, serializable params.
 */

import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'

// ─── Root route ───────────────────────────────────────────────────────────────

export const rootRoute = createRootRoute({
  component: Outlet,
})

// ─── Homepage route ( / ) ─────────────────────────────────────────────────────

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  // component assigned in App.tsx
})

// ─── Catalog route ( /catalog ) ───────────────────────────────────────────────

export interface CatalogSearch {
  keyword?: string
  region?: string
  license?: string
  category?: string
  from?: number
  to?: number
}

function coerceYear(v: unknown): number | undefined {
  if (typeof v === 'number' && v > 0) return v
  if (typeof v === 'string' && v) {
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

export const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    keyword: typeof search.keyword === 'string' && search.keyword
      ? search.keyword
      : undefined,
    region: typeof search.region === 'string' && search.region
      ? search.region
      : undefined,
    license: typeof search.license === 'string' && search.license
      ? search.license
      : undefined,
    category: typeof search.category === 'string' && search.category
      ? search.category
      : undefined,
    from: coerceYear(search.from),
    to: coerceYear(search.to),
  }),
  // component assigned in App.tsx via lazy() once CatalogPage is built
})

// ─── Detail route ( /collections/$id ) ───────────────────────────────────────

export const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/collections/$id',
  // component assigned in App.tsx via lazy() once DetailPage is built
})

// ─── Dataset route ( /datasets/$id ) ─────────────────────────────────────────

export const datasetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/datasets/$id',
  // component assigned in App.tsx
})

// ─── Solutions routes ( /solutions/* ) ───────────────────────────────────────

export const scienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/science',
})

export const industryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/industry',
})

export const governanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/governance',
})

export const citizenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/solutions/citizen',
})

// ─── Route tree ───────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  homeRoute,
  catalogRoute,
  detailRoute,
  datasetRoute,
  scienceRoute,
  industryRoute,
  governanceRoute,
  citizenRoute,
])

export const router = createRouter({ routeTree })

// ─── Type registration (enables useSearch, useParams type inference) ──────────

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
