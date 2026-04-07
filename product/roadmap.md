# Roadmap — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-05 (Phase 6 added)  
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

### Phase 3 — Dataset Detail Page (Week 2–3)
**Goal**: A user who clicks a dataset can answer all fitness-for-purpose questions without scrolling. Access methods are immediately visible. Related datasets extend the discovery flow.

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

### Phase 6 — Homepage (Week 4–5)
**Goal**: Create a landing experience that communicates ODP's value in 30 seconds, provides persona-specific entry points, and delivers the emotional brand promise of "the Spotify of ocean data."

**Design principles** (DD-28, DD-27):
- Task-oriented, not feature-oriented (DD-28)
- Persona routing is the core function (DD-27)
- Restraint: 5 sections, not 15

**Layout**: Full-width, no sidebar. Dedicated `Navbar` component (transparent → `#200A3A` on scroll).

#### Five-section spec

**Section 1 — Hero**

| Component | Description | Priority |
|---|---|---|
| `HeroSection` | Full-width world map animation with data-point light pulses. Headline: "The world's ocean data, made usable." Single CTA: [Browse the Catalog →] | Must |

**Section 2 — Numbers** (DD-25)

| Number | Label |
|---|---|
| 3% | Of ocean biodiversity data comes from industry |
| 38 | Public datasets and growing |
| 0 | Login required |

Component: `StatCounter` with count-up animation on scroll entry.

**Section 3 — Browse by category**

| Component | Description | Priority |
|---|---|---|
| `CategoryGrid` | 6 category cards. Dataset count per category calculated dynamically from STAC API. Click navigates to `/catalog?category={id}`. | Must |

**Section 4 — Who uses ODP** (DD-26, DD-27)

| Persona card | Destination |
|---|---|
| Researchers | `/catalog?category=biodiversity` |
| Industry (user) | `/catalog?category=industry` |
| ESG & Finance | `/catalog?category=mpa` |
| Data Contributors | `https://app.hubocean.earth` (external) |

Component: `PersonaCards`. Four cards including Sofia. Each links directly to its corresponding entry point.

**Section 5 — Footer**

| Component | Description | Priority |
|---|---|---|
| `HomeFooter` | Minimal. Label: "Concept redesign · Not an official product". API attribution, GitHub + Hub Ocean links. | Must |

#### Animation requirements

| Animation | Trigger | Duration | Notes |
|---|---|---|---|
| Hero dot pulse | CSS `@keyframes`, always on | 2–4s per dot, random phase | Breathing effect — opacity + scale + box-shadow |
| Section entrance | `IntersectionObserver` (threshold 0.15) | 0.5s ease-out-expo | `opacity: 0→1`, `translateY: 20px→0`, child stagger 0.1s |
| Count-up (stats) | `IntersectionObserver`, fires once | 1.5s ease-out-cubic | `rAF` loop, `Math.floor` interpolation |
| Navbar transition | `scroll` event (≥60px) | 0.3s ease | `transparent` → `#200A3A` |
| Card hover | CSS `:hover` | 0.15s ease | `translateY(-4px)` + shadow |
| CTA hover | CSS `:hover` | 0.15s ease | `scale(1.02)` + cyan glow |
| prefers-reduced-motion | CSS media query | 0.01ms all durations | Final states shown immediately |

#### Router changes

| Before | After |
|---|---|
| `/` → `CatalogPage` (AppShell) | `/` → `HomePage` (no AppShell) |
| — | `/catalog` → `CatalogPage` (AppShell) |

#### New files

| File | Description |
|---|---|
| `src/pages/HomePage.tsx` | Page component, orchestrates all home sections |
| `src/components/home/HeroSection.tsx` | World map bg + dots + headline + CTA |
| `src/components/home/StatCounter.tsx` | Count-up stats (3% / 38 / 0) |
| `src/components/home/CategoryGrid.tsx` | 6 category cards with live counts |
| `src/components/home/PersonaCards.tsx` | 4 persona entry-point cards |
| `src/components/layout/HomeNavbar.tsx` | Transparent-to-dark fixed navbar |

#### Design decisions applied

DD-10 (Spotify UX pattern), DD-15 (light mode first), DD-19 (SDG tags — referenced in persona card copy), DD-25 (3% Problem narrative — Numbers section), DD-26 (four persona cards — ESG & Finance added), DD-27 (persona routing as primary navigation), DD-28 (homepage is task-oriented, not feature-oriented)

#### Wireframe reference

`design/wireframes/home-page.md`

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
