# Roadmap — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-05 (Phase 6 added)  
> **References**: product/design-decisions.md, research/pain-points.md

---

## Portfolio Scope

What is actually built in this project. Scoped to demonstrate the core design thesis: *leading with decision-critical information reduces friction for all three personas.*

### Phase 1 — Foundation ✅ Complete

**Goal**: Working project scaffold + design system in place before any feature work.

Completed: tokens.css, globals.css, cn.ts, stac.ts, format.ts, router.ts, App.tsx

| Task | Output | Priority |
|---|---|---|
| Vite + React 19 + TypeScript setup | `src/` scaffold | Must |
| Token system implementation | `src/styles/tokens.css` | Must |
| `cn()` utility | `src/lib/cn.ts` | Must |
| STAC API client + types | `src/lib/stac.ts` | Must |
| Format utilities | `src/lib/format.ts` | Must |
| Font loading (DM Serif Display, DM Sans, IBM Plex Mono) | `index.html` | Must |

### Phase 2 — Catalog Page ✅ Complete

**Goal**: A researcher can scan the catalog and assess spatial/temporal fit without clicking into a dataset.

Completed: AppShell, CollectionCard, CollectionGrid, sidebar, search, filter, dark mode

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

### Phase 3 — Dataset Detail Page ✅ Complete

**Goal**: A user who clicks a dataset can answer all fitness-for-purpose questions without scrolling. Access methods are immediately visible. Related datasets extend the discovery flow.

Completed: DetailPage.tsx (collection), DatasetDetailPage.tsx (dataset), mockCollectionData.ts (Aker BioMarine, 25 datasets), mockDatasetData.ts (3 datasets), Code Examples modal, Collection → Dataset hierarchy

**Layout**: Two-column on desktop, single column on mobile (DD-17).

#### Left column (primary content)
| Component | Pain Points | Design Decision |
|---|---|---|
| Hero: title + provider + license + last updated | PP-01, PP-04 | — |
| Flat map (MapLibre + bbox highlight) | PP-02, PP-14 | DD-14 |
| Description (plain language) | PP-15 | — |
| Data types (parsed from description) | PP-06 | — |
| SDG tags (derived from keywords) | PP-18 | DD-19 |
| Keywords | PP-08 | — |
| Citation block (APA + Copy button) | PP-09 | — |

#### Right column — full spec (sticky sidebar)

**1. Key stats** (3 items)
- Region / Coverage / Since

**2. Access panel** (always visible) — DD-18
- STAC API [Copy]
- OGC API [Copy]
- Python SDK [↗ docs]
- R SDK [↗ docs]
- Open in Workspace [↗]

**3. Provider card** — DD-20
- Name + website + contact

**4. Data preview** — DD-22 *(new)*
- Size / Columns / Rows
- (Parsed from STAC description; fallback to "Available on Hub Ocean" when absent)
- [Explore table ↗]
- [Explore map ↗]

**5. Tier badge** — DD-24
- Free (publicly available) / Premium (contact Hub Ocean)
- Derived from license field + keywords

**6. Compliance tags** *(conditional)* — DD-22
- TNFD / CSRD tags displayed if dataset keywords include relevant regulatory terms
- Hidden when no compliance tags are present

#### Bottom
| Component | Pain Points | Design Decision |
|---|---|---|
| Related datasets (same provider → same category → same region, max 6) | PP-20 | DD-21 |

**Pain points addressed**: PP-01, PP-02, PP-03, PP-05, PP-06, PP-09, PP-14, PP-15, PP-17, PP-18, PP-19, PP-20, PP-21, PP-22

**Design decisions applied**: DD-14, DD-17, DD-18, DD-19, DD-20, DD-21, DD-22, DD-23, DD-24

### Phase 4 — Homepage ✅ Complete

**Goal**: Create a landing experience that communicates ODP's value in 30 seconds, provides persona-specific entry points, and delivers the emotional brand promise.

Completed: HomePage.tsx, SciencePage, IndustryPage, GovernancePage, CitizenPage, SolutionLayout

### Phase 5 — Playbar ⏭ Skipped

Out of portfolio scope.

### Phase 6 — Deployment 🔄 In Progress

Vercel deployment pending, README pending.

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
