# Wireframe — Catalog Page

> **Agent**: ui-designer  
> **Last updated**: 2026-04-02  
> **User story**: As Lena (researcher), I want to scan available datasets and quickly identify which ones cover my study area and time window, so I can decide which ones to investigate further.

---

## Page Purpose

The catalog page is the discovery layer. Its job is to help users answer one question as fast as possible: **"Is there a dataset here that might fit my needs?"**

Success means a user can scan 10 dataset cards and form a preliminary shortlist in under 60 seconds — without clicking into any individual dataset.

---

## Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR (56px)                                                │
│ [ODP Concept logo]                    [GitHub link]         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ PAGE HEADER                                                  │
│ Ocean Data Catalog          (DM Serif Display, text-2xl)     │
│ [N] datasets from Hub Ocean (DM Sans, text-sm, muted)        │
│                                                              │
│ FILTER BAR                                                   │
│ [🔍 Search datasets...]  [All regions ▾]  [All licenses ▾]  │
│                                                              │
│ ACTIVE FILTERS (if any)                                      │
│ [krill ×]  [Southern Ocean ×]                               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ COLLECTION GRID (CSS Grid, 3 cols at 1280px, 2 at 768px)    │
│                                                              │
│ ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│ │ DatasetCard    │  │ DatasetCard    │  │ DatasetCard    │  │
│ └────────────────┘  └────────────────┘  └────────────────┘  │
│                                                              │
│ ┌────────────────┐  ┌────────────────┐  ...                  │
│ │ DatasetCard    │  │ DatasetCard    │                        │
│ └────────────────┘  └────────────────┘                        │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
│ Concept project — not an official Hub Ocean product          │
│ Data via Hub Ocean STAC API · Built by Andrea Fan            │
└──────────────────────────────────────────────────────────────┘
```

---

## DatasetCard Layout (expanded)

```
┌──────────────────────────────────────────────┐
│                              [License Badge]  │
│  ┌──────────────┐                            │
│  │ Spatial      │  Dataset Title             │
│  │ Thumbnail    │  (DM Serif Display, xl)    │
│  │ 80 × 60px    │                            │
│  │ SVG mini-map │  Description — max 2 lines │
│  └──────────────┘  truncated with ellipsis   │
│                                              │
│  [Region] · [Year range] · [N files/records] │
│  (IBM Plex Mono, text-xs, text-muted)        │
│                                              │
│  [keyword] [keyword] [keyword]  +N more      │
│  (IBM Plex Mono, text-xs)                    │
└──────────────────────────────────────────────┘
```

**Card states**:
- **Default**: `--card-border` (navy-600), no shadow
- **Hover**: `--card-border-hover` (cyan-400), subtle shadow `0 4px 16px rgba(34, 211, 238, 0.08)`
- **Focus** (keyboard): cyan outline 2px, offset 2px
- **Loading**: Skeleton matching card shape exactly

---

## Filter Bar Behavior

**Search input**:
- Filters by title and description (client-side, no API call)
- Debounced 300ms
- Clear button appears when input has value

**Region dropdown**:
- Options derived from `bboxToRegionLabel()` applied to all collections
- "All regions" default
- Selecting a region filters the grid client-side

**License dropdown**:
- Options: All licenses / Open (commercial use OK) / Restricted (non-commercial) / Any
- Filters using `getLicenseInfo()` from `src/lib/format.ts`

**Active filters**:
- Each active filter shown as a dismissible pill below the filter bar
- Clicking a keyword on a card adds it as an active filter (PP-08 fix)
- "Clear all" link appears when any filter is active

---

## Loading State

All 8–12 cards show as `DatasetCardSkeleton` simultaneously. Skeletons render immediately; real cards replace them as data resolves (single fetch, so transition is quick).

Staggered entrance animation after data loads:
- Cards animate in with `opacity 0→1` + `translateY 8px→0`
- Stagger delay: 50ms per card (cards 1–6 only; cards 7+ animate without delay to avoid waiting)

---

## Empty State

When filters produce no results:
```
┌──────────────────────────────────────────────┐
│                                              │
│  No datasets match "coral reef" in Indian    │
│  Ocean.                                      │
│                                              │
│  Try removing a filter or [browse all        │
│  datasets].                                  │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Error State

When the STAC API fetch fails:
```
Unable to load the catalog.

The Ocean Data Platform API may be temporarily unavailable.
[Try again] or visit api.hubocean.earth directly.
```

---

## Open Questions for product-strategist

1. Should the page show a count of total results ("Showing 12 of 12 datasets") even when unfiltered?
2. Is there a "featured" or "recently added" section above the grid, or is everything treated equally?
3. Should the filter bar be sticky (follow scroll) or static?
