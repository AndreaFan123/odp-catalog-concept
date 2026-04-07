import { RouterProvider, useRouterState, Outlet } from '@tanstack/react-router'
import {
  router,
  catalogRoute, detailRoute, rootRoute, homeRoute, datasetRoute,
  scienceRoute, industryRoute, governanceRoute, citizenRoute,
} from './router'
import { CatalogPage } from './pages/CatalogPage'
import { HomePage } from './pages/HomePage'
import { DetailPage } from './pages/DetailPage'
import { DatasetDetailPage } from './pages/DatasetDetailPage'
import { SciencePage } from './pages/solutions/SciencePage'
import { IndustryPage } from './pages/solutions/IndustryPage'
import { GovernancePage } from './pages/solutions/GovernancePage'
import { CitizenPage } from './pages/solutions/CitizenPage'
import './styles/globals.css'

// ─── Routes that manage their own layout (no shared AppShell) ────────────────
// HomePage and all /solutions/* pages are full-width dark pages that own
// their own navbar. All other routes (catalog, detail, dataset) use the
// AppShell sidebar layout managed by their own page components.

const NO_SHELL_ROUTES = [
  '/',
  '/solutions/science',
  '/solutions/industry',
  '/solutions/governance',
  '/solutions/citizen',
]

// ─── Root layout ─────────────────────────────────────────────────────────────

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isNoShell = NO_SHELL_ROUTES.includes(pathname)

  if (isNoShell) {
    // HomePage and solution pages own their navbar + layout
    return <Outlet />
  }

  // Catalog, detail, dataset pages manage their own AppShell internally
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Outlet />
    </>
  )
}

// ─── Register route components ────────────────────────────────────────────────

rootRoute.update({ component: RootLayout })
homeRoute.update({ component: HomePage })
catalogRoute.update({ component: CatalogPage })
detailRoute.update({ component: DetailPage })
datasetRoute.update({ component: DatasetDetailPage })
scienceRoute.update({ component: SciencePage })
industryRoute.update({ component: IndustryPage })
governanceRoute.update({ component: GovernancePage })
citizenRoute.update({ component: CitizenPage })

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />
}
