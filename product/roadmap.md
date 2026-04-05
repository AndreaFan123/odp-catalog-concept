# Roadmap — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-05  
> **References**: product/design-decisions.md, research/pain-points.md

---

## Portfolio Scope

What is actually built in this project. Scoped to demonstrate the core design thesis: *leading with decision-critical information reduces friction for all three personas.*

### Phase 1 — Foundation (Week 1)
**Goal**: Working project scaffold + design system in place before any feature work.

| Task | Output | Priority |
|---|---|---|
| Vite + React 19 + TypeScript setup | `src/` scaffold | Must |
| Token system implementation | `src/styles/tokens.css` | Must |
| `cn()` utility | `src/lib/cn.ts` | Must |
| STAC API client + types | `src/lib/stac.ts` | Must |
| Format utilities | `src/lib/format.ts` | Must |
| Font loading (DM Serif Display, DM Sans, IBM Plex Mono) | `index.html` | Must |

### Phase 2 — Catalog Page (Week 1–2)
**Goal**: A researcher can scan the catalog and assess spatial/temporal fit without clicking into a dataset.

| Task | ICE | Pain Point | Output |
|---|---|---|---|
| `DatasetCard` component | 9 (3×3×1) | PP-01, PP-02, PP-03, PP-04 | `components/catalog/DatasetCard.tsx` |
| `SpatialThumbnail` (SVG mini-map) | 9 (3×3×1) | PP-02 | `components/catalog/SpatialThumbnail.tsx` |
| `Badge` component (license, keyword) | 8 (3×3×1) | PP-04, PP-08 | `components/ui/Badge.tsx` |
| `Skeleton` component + `CollectionGridSkeleton` | 6 (2×3×1) | — | `components/ui/Skeleton.tsx` |
| `CollectionGrid` layout | 6 (2×3×1) | — | `components/catalog/CollectionGrid.tsx` |
| `CatalogPage` with fetch + states | 9 (3×3×1) | — | `pages/CatalogPage.tsx` |
| Keyword filter (URL-based) | 7 (3×3×1) | PP-08 | State in `CatalogPage` |
| Error + empty states | 5 (2×3×1) | — | Inline in `CatalogPage` |

### Phase 3 — Detail Page (Week 2–3)
**Goal**: A user who clicks a dataset can answer all fitness-for-purpose questions without scrolling.

| Task | ICE | Pain Point | Output |
|---|---|---|---|
| 5-fact hero panel (spatial, temporal, license, count, provider) | 9 (3×3×1) | PP-01, PP-02, PP-03, PP-04, PP-09 | `components/catalog/DatasetHero.tsx` |
| `Timeline` component | 7 (3×2×1) | PP-03 | `components/catalog/Timeline.tsx` |
| Access panel (API, OGC, Vector Tiles — visible, not accordion) | 8 (3×3×1) | PP-05 | `components/catalog/AccessPanel.tsx` |
| `CitationBlock` with copy button | 7 (3×2×1) | PP-04, PP-09 | `components/catalog/CitationBlock.tsx` |
| `OceanMap` (MapLibre GL JS, lazy loaded) | 6 (3×2×1) | PP-02 | `components/catalog/OceanMap.tsx` |
| Column descriptions in tabular preview | 5 (2×2×1) | PP-06 | `components/catalog/TabularPreview.tsx` |
| `DetailPage` with fetch + states | 9 (3×3×1) | — | `pages/DetailPage.tsx` |

### Phase 4 — Polish (Week 3)
**Goal**: The project looks and feels deliberate, not assembled.

| Task | Output |
|---|---|
| Entrance animations (staggered card reveal) | CSS motion tokens |
| Hover micro-interactions on cards | Tailwind transitions |
| Responsive layout (mobile catalog card stacking) | Tailwind breakpoints |
| `Navbar` + `Footer` with concept disclaimer | `components/layout/` |
| `NotFoundPage` | `pages/NotFoundPage.tsx` |
| A11y review pass (all components) | `a11y-reviewer` sign-off |
| README completion | `docs-manager` |

### Phase 5 — Spotify UX (Week 4)
**Goal**: Elevate the catalog experience from "database list" to "data experience platform" — embodying Hub Ocean's own positioning as "the Spotify of ocean data."

| Task | Status | Output | Priority |
|---|---|---|---|
| Light mode first (DD-15) | ✅ Done | `styles/tokens.css` | Must |
| Sidebar layout (DD-10) | ✅ Done | `components/layout/AppShell.tsx` | Must |
| Card removes map thumbnail, uses region badge (DD-13) | ✅ Done | `components/catalog/DatasetCard.tsx` | Must |
| Focus state unified (WCAG 2.4.11 Non-text Contrast AA) | ✅ Done | `styles/globals.css`, `styles/tokens.css` | Must |
| Sidebar collapse icon redesign (panel icon) | ✅ Done | `components/layout/AppShell.tsx` | Should |
| Sidebar light mode redesign (light background + theme-aware logo) | ✅ Done | `components/layout/AppShell.tsx`, `assets/ODP-Logo-Light.svg` | Should |
| Loading animation inline (within grid area, not full-screen overlay) | ✅ Done | `components/catalog/LoadingScreen.tsx` | Should |
| Detail page flat map (DD-14) | Pending | `components/catalog/OceanMap.tsx` | Must |
| Dark mode toggle | Pending | `AppShell` header button | Should |
| Playbar UI (static) | Pending | `components/player/Playbar.tsx` | Should |
| Waveform animation (time-series data) | Pending | `components/player/WaveAnimation.tsx` | Should |
| Geographic point animation (spatial data) | Pending | `components/player/MapAnimation.tsx` | Should |
| Onboarding survey modal | Pending | `components/onboarding/OnboardingModal.tsx` | Should |
| localStorage preference persistence | Pending | `src/lib/preferences.ts` | Should |

---

## Production Vision

What this becomes with a full team, real users, and a proper timeline. Included to show product maturity — the ability to distinguish "what's a good demo" from "what's a good product."

### Near-term (0–3 months post-launch)
- **Authentication + private datasets**: Authenticated users see their private datasets alongside public ones; publishers have a distinct view
- **Usage metrics for publishers**: Marcus's dataset shows download count, API call frequency, top referring institutions
- **Dark/light mode**: `[data-theme]` toggle using semantic token overrides
- **BibTeX citation format**: Toggle between APA and BibTeX in `CitationBlock`
- **Related datasets**: Surface other datasets from the same provider or collection on detail page

### Medium-term (3–9 months)
- **Keyword taxonomy**: Curated keyword ontology replacing free-text tags; enables more reliable filtering
- **Advanced search**: Filter by spatial bounding box (draw on map), temporal range slider, license type
- **Dataset quality indicators**: Structured quality assessment (completeness, temporal resolution, coordinate precision) visible on cards
- **Collection-level pages**: Hub pages for "Aker BioMarine datasets" or "Southern Ocean data" as editorial discovery paths

### Long-term (9+ months)
- **Workspace integration**: "Open in Jupyter" button that pre-loads the dataset into an ODP workspace
- **Multilingual support**: Norwegian + English at minimum, given Hub Ocean's Oslo base and global scientific audience
- **Contribution workflow**: Guided dataset upload with structured description template that prompts providers to answer user questions
- **API usage analytics dashboard**: For Hub Ocean team to understand which datasets and access patterns are most common

---

## ICE Scoring Reference

| Score | Meaning |
|---|---|
| 3 | High impact / high confidence / low effort |
| 2 | Medium |
| 1 | Low impact / low confidence / high effort |

ICE = Impact × Confidence × (4 - Effort) — higher is better.  
Portfolio scope: build anything with ICE ≥ 6.
