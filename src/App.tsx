import { RouterProvider } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { router, catalogRoute, detailRoute, rootRoute } from './router'
import { CatalogPage } from './pages/CatalogPage'
import './styles/globals.css'

// ─── Root layout — AppShell handles per-page layout ───────────────────────────

function RootLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Outlet />
    </>
  )
}

// ─── Detail placeholder (Phase 3) ────────────────────────────────────────────

function DetailPlaceholder() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 8,
        textAlign: 'center',
        padding: 32,
      }}
    >
      <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        ODP Catalog Concept
      </p>
      <h1 style={{ color: 'var(--color-text-primary)', fontSize: 24, fontWeight: 600 }}>
        Dataset detail — Phase 3
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
        SpatialThumbnail (md), MetadataPanel, CitationBlock coming next.
      </p>
    </div>
  )
}

// ─── Register route components ────────────────────────────────────────────────

rootRoute.update({ component: RootLayout })
catalogRoute.update({ component: CatalogPage })
detailRoute.update({ component: DetailPlaceholder })

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />
}
