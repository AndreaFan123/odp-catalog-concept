# Design System Changelog

All significant design system decisions are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

## [2026-04-06]

### [2026-04-06] — API capability confirmed

#### Catalog API diagnostic results

Live testing confirmed the following public API surface:

| Endpoint | Status |
|---|---|
| `GET /api/public/catalog/v1/dataset/{uuid}` | ❌ 404 — not public |
| `GET /api/public/catalog/v1/jsonld/?uuid={uuid}` | ✅ 200 — limited fields |
| STAC `isPartOf` / `collection` rel | ❌ undefined / absent |

#### Features confirmed as unimplementable (public API only)

- **DD-16: Part of Collection** — STAC has no `collection` rel; Catalog API is 404; JSON-LD `isPartOf` is `undefined`. All three candidate endpoints exhausted. Replaced by DD-21 ("More from this provider") on the detail page.
- **DD-22: Tabular metadata** — `num_rows`, `total_byte_size`, `columns` exist only in the Catalog API, which is not publicly accessible. Detail page now shows "Explore the full dataset on Hub Ocean" with [Explore table ↗] and [Explore map ↗] linking to the STAC `alternate` URL.

#### JSON-LD supplementary finding

`isAccessibleForFree` field available at `/api/public/catalog/v1/jsonld/?uuid={uuid}`. Currently returns `true` for all 38 tested datasets — not yet useful for free/premium classification. DD-24 continues to rely on `license` field heuristic.

#### Documents updated

- `product/design-decisions.md` — DD-16, DD-22, DD-24 trade-offs supplemented with confirmed API findings
- `research/ia-analysis.md` — new "Catalog API Diagnostic" section with endpoint table and capability summary

---

### [2026-04-06] — IA analysis completed

#### New document: research/ia-analysis.md

As-Is IA problems identified on hubocean.earth:
- External links (Platform, Datasets) visually indistinguishable from internal nav items
- Sectors has no landing page — four audience segments have no differentiated entry points
- Events & Media mixes 5 content types — Tides of Transparency buried and undiscoverable
- Use Cases and Sectors are parallel nav items rather than a hierarchical claim-to-proof structure

To-Be IA improvements proposed:
- External links moved to utility bar (visually separate from primary nav)
- Sectors renamed to Solutions with a new landing page
- Resources section consolidates all content types with clear classification
- Unresolved: Use Cases should become secondary navigation inside Solutions sub-pages, not a top-level nav item

Platform design implications:
- The platform Dashboard is the fulfillment of the marketing promise, not a repetition of it
- Persona routing (DD-27) receives users at the platform entry point carrying the audience identity the marketing site created
- This establishes the portfolio's strongest design argument: closing the most critical break in the user's end-to-end journey

#### Updated documents
- `product/problem-statement.md` — added "hubocean.earth IA Issues" and "Platform Dashboard Positioning" subsections under "The Real Problem: Information Architecture"
- `product/design-decisions.md` — DD-27 Context expanded with IA analysis basis and portfolio design argument

---

## [2026-04-05]

### [2026-04-05] — Use case analysis → Detail page specification

#### Research
- **user-personas.md**: Added "Detail Page Needs" subsection to all three personas (Lena, Marcus, Amara) — grounded in TGS, Aker BioMarine, Aker BP, ILIAD, and Wallenius Wilhelmsen use cases
- **pain-points.md**: Added PP-17 through PP-20

| ID | Title | Severity | Persona |
|---|---|---|---|
| PP-17 | Access methods hidden inside accordion | High | Marcus, Lena |
| PP-18 | No SDG tags on dataset pages | High | Amara |
| PP-19 | Provider credibility information insufficient | Medium | Marcus, Amara |
| PP-20 | No cross-dataset discovery path | High | Lena, Marcus |

#### Design Decisions
- **DD-17**: Two-column layout for detail page — left: map + content; right: key stats + access + provider (PP-05, PP-17)
- **DD-18**: Access panel always visible, no accordion — STAC API / OGC API / Python SDK / R SDK / Workspace (PP-05, PP-17)
- **DD-19**: SDG tags derived from keywords — surfaces SDG 14 and FAIR alignment without new metadata fields (PP-18)
- **DD-20**: Provider card with trust signals — name + website + dataset count (PP-19)
- **DD-21**: Related datasets section — same provider → same category → same region, max 6 cards (PP-20)

#### Roadmap
- **Phase 3 (Detail Page)** fully specified with two-column layout, component list, and pain point / design decision cross-references

#### Sources
TGS use case · Aker BioMarine use case · Aker BP press release · ILIAD use case · Wallenius Wilhelmsen TNFD report

---

### [2026-04-05] — Focus state unified; Sidebar redesign; Loading inline; Spotify UX refactor; responsive layout; a11y improvements; DD-13–16

### Added

- **A11y**: Focus state unified — global `*:focus-visible` now uses 3px solid outline at 3px offset; Token: `--color-focus-ring: #047857` (light, 5.8:1 on white ✅) / `--color-focus-ring: #03FFD1` (dark, 8.9:1 on `#121212` ✅)
- **A11y**: `.round-button` CSS class added — circular buttons (UserMenu, ThemeToggle) use box-shadow to simulate focus ring with `border-radius: 50%`
- **A11y**: Card focus ring strengthened — `.dataset-card:focus-visible` changed to `box-shadow: 0 0 0 3px --color-bg, 0 0 0 6px --color-focus-ring` (previously 2px/4px)
- **A11y**: Removed inline `style={{ outline: 'none' }}` from search input and UserMenu avatar, allowing global CSS focus styles to take effect
- **A11y**: `svg[aria-hidden="true"]` replaces the overly broad `svg:focus-visible { outline: none }` rule
- **UI**: Sidebar collapse icon changed to panel icon (rectangular frame + left divider line SVG); expanded state shows icon on the right; collapsed state shows icon centered with logo fully hidden
- **UI**: Sidebar light mode redesigned — background changed from `#1a0832` to `#f5f5f5`; text colors `#111111` / `#535353` / `#a0a0a0`; active dot uses `--color-sidebar-accent: #0A7055`
- **UI**: Sidebar header theme-aware logo switching — light: `ODP-Logo-Light.svg` (fill `#200A3A`) + `#f5f5f5` background; dark: `ODP-Logo.svg` (white) + `#000000` background
- **Assets**: Added `ODP-Logo-Light.svg` (deep purple logo for light mode sidebar)
- **UI**: LoadingScreen changed to inline — displays only within the grid area; sidebar and toolbar remain visible during loading; text changed to "Loading datasets..."
- **UI**: Loading animation — three cyan sine waves; period 200px (extended from 140px); speed 2s / 3s / 4s; amplitude ±16px; keyframe `translateX(-400px)`; `prefers-reduced-motion` supported

- **UI**: AppShell component — Spotify-style two-column layout with collapsible sidebar (220px ↔ 60px), LIBRARY + BROWSE sections, external footer links, mobile bottom tab bar, category bottom sheet (DD-10)
- **UI**: Responsive breakpoints — desktop auto-fill grid (minmax 260px), tablet 3-column, mobile 2-column; sidebar auto-collapse on tablet; hidden on mobile (DD-10)
- **UI**: DatasetCard redesigned — square map cover (SpatialThumbnail size="cover"), license badge overlay, provider · year meta, region tag. Save button (♡) with localStorage persistence
- **UI**: SpatialThumbnail `size="cover"` variant — fills container, global bbox "Global" label, point data halo, rx=3 continent rects
- **UI**: YearFilter chip row — All time / Since 2020 / 2015 / 2010 / 2000; URL-driven via `?since=` param; AND-combined with keyword + category filters
- **A11y**: Skip link (`href="#main-content"`) added to RootLayout; `.skip-link` CSS in globals.css
- **A11y**: `.dataset-card:focus-visible` — 3px solid cyan outline (13.94:1 contrast)
- **A11y**: Save button touch target upgraded to 44×44px (36px visual circle) per WCAG 2.5.5
- **A11y**: `design/a11y-color-audit.md` Section 9 — Card Grid A11y Review; A11Y-06/07/08 opened
- **Product**: DD-13 — DatasetCard removes SpatialThumbnail, uses region badge instead
- **Product**: DD-14 — Detail page uses MapLibre GL JS flat map
- **Product**: DD-15 — Light mode first, dark mode deferred; sidebar retains #200A3A brand color
- **Product**: DD-16 — Type filter replaced by Collection relationship display on card and detail page
- **Router**: `since` search param added to `CatalogSearch`; `validateSearch` handles string/number coercion

### Changed

- **`src/styles/tokens.css`**: Dark-first semantic defaults (Spotify palette: `#121212` bg, `#1E1E1E` surface, `#282828` elevated); `[data-theme="light"]` override added; `--color-text-muted` upgraded from `#727272` (3.46:1 ❌) to `#A0A0A0` (5.68:1 ✅); simplified aliases `--color-bg`, `--color-surface`, `--color-border`, `--color-accent`
- **`src/styles/globals.css`**: `.collection-grid` responsive breakpoints; `.dataset-card:focus-visible`; `.skip-link`
- **`src/App.tsx`**: RootLayout simplified to `<Outlet>`; skip link added; Navbar removed (replaced by AppShell sidebar)

### Fixed

- **A11y**: `--color-text-muted` contrast failure (#727272 at 3.46:1 on #1E1E1E) — upgraded to #A0A0A0

### Product Decisions

| Decision | Summary |
|---|---|
| DD-13 | Card removes SpatialThumbnail (illegible at small size) — region badge instead |
| DD-14 | Detail page flat map (MapLibre) — accurate spatial info over 3D visual impact |
| DD-15 | Light mode first — aligns with Hub Ocean platform language; dark mode deferred |
| DD-16 | No Type filter checkbox — Collection relationship shown as discovery entry on card/detail |

### [2026-04-05] — Detail page spec — right column complete

#### Design Decisions

**DD-22: Data preview stats in right column**
- Added Data preview section below Access panel in the detail page right column
- Surfaces Size / Columns / Rows parsed from STAC `description` field
- Fallback text "Available on Hub Ocean" when values are absent
- [Explore table] and [Explore map] links out to Hub Ocean (no in-app tabular preview)
- Addresses PP-01 (data quality signals) and PP-15 (buried preview)

**DD-23: Two-map distinction — bbox coverage vs actual data points**
- Detail page implements a single flat MapLibre map labelled "Spatial coverage"
- Actual data point exploration links to Hub Ocean's Explore map
- In-map caption: "Showing spatial coverage extent. Explore actual data points on Hub Ocean"
- Addresses PP-14 (map confusion)

#### Spec

**Phase 3 right column spec finalised**
- Right column order confirmed: Key stats → Access panel (DD-18) → Provider card (DD-20) → Data preview (DD-22)
- Roadmap updated to reflect complete right column spec

#### Evaluation

**Hub Ocean tabular preview evaluation**
- Strengths: column statistics, dual table/map view
- Issues: buried below the fold, column names have no explanation, distinction between the two maps is unclear

---

### Research expanded — new persona and pain points (2026-04-05)

**New findings from hubocean.earth analysis**

- **3% Problem:** Only 3% of ocean biodiversity data comes from industry — core platform narrative adopted for homepage (DD-25)
- **Persona 4 — Sofia Chen (ESG / Nature Finance):** ESG Analyst at DNB / Wallenius Wilhelmsen; drives TNFD and CSRD compliance reporting; requires citable, TNFD-aligned ocean data without writing code
- **Persona 2 split:** Marcus (2A, data user) and Erik Hansen (2B, data contributor / sustainability lead)
- **Premium tier:** Ocean Sensitive Areas and similar products are gated; the catalog does not currently distinguish free from premium (PP-21)
- **Regulatory gap:** No TNFD / CSRD labels or filters in the catalog (PP-22)
- **Contribution gap:** No "share your data" entry point visible in the catalog (PP-23)

**Research updates**

- `research/user-personas.md` — Persona 4 (Sofia Chen) added; Marcus split into Persona 2A / Persona 2B (Erik Hansen)
- `research/pain-points.md` — PP-21, PP-22, PP-23 added

**Design decisions**

- DD-24: Free vs premium tier badge on dataset cards and detail page
- DD-25: "3% Problem" statistic added to homepage Numbers section
- DD-26: Homepage "Who uses ODP" expanded to 4 persona cards (Researchers / Industry / Policy / ESG & Finance)

**Sources**

- hubocean.earth/ocean-industries-finance
- Wallenius Wilhelmsen TNFD disclosure case
- DNB Nature Finance case
- TGS / Sandy Sporck quote on SDG 14 data sharing

---

### Core design argument established (2026-04-05)

**Problem statement updated**

Added new section: "The Real Problem: Information Architecture"

Documents Hub Ocean's three fundamental IA issues:
1. Critical information buried at the second and third level (the "3% Problem" is not on the homepage; TNFD/CSRD features are three levels deep; Sofia persona is unaddressed on the homepage; premium tier is never explained)
2. No persona routing — 38 datasets in a flat list with no task-oriented guidance
3. Persuasion and utility conflated — new users cannot answer "what does this do for me?"; returning users must re-read marketing content to reach the catalog

**Design decisions**

- **DD-27: Persona routing as primary navigation**
  Homepage core function is routing, not feature description. Four persona cards link directly to: `/catalog?category=biodiversity` (Researchers), `/catalog?category=industry` (Industry users), `/catalog?category=mpa` (ESG & Finance, with TNFD context), and Hub Ocean data sharing (Industry contributors). Addresses PP-12, PP-18, PP-21, PP-22, PP-23.

- **DD-28: Homepage is task-oriented, not feature-oriented**
  Five sections only: Hero / Numbers / Browse by category / Persona routing / Footer. Deliberately excludes: How it works, Mission statement, Latest news, Partner logos. Restraint as a signal of design quality.

**Roadmap**

- Phase 6 homepage spec updated to reflect DD-27 and DD-28 as core design principles
- Five-section structure finalised: Hero → Numbers → Browse by category → Who uses ODP → Footer

**Design argument summary**

Get the right person to the right entry point within 10 seconds — rather than showing every user the same marketing content. This is the strongest single design argument in the project, because it names a real structural flaw in the existing Hub Ocean IA and proposes a focused, testable solution.

---

## [2026-04-03] — Design system corrected to match platform; personas v1.1; PP-12–15; DD-09; positioning Section 8

### Added

- Design system: token system corrected — removed `#382066` (`--primitive-purple-800`, landing page color not in platform); added proper light/dark mode token pairs (`--color-surface-primary/secondary`, `--color-text-primary/secondary/muted`); dark mode now derives from platform light mode (gray-900 scale), not landing page palette; `--color-nav-bg` introduced as always-dark token (#200A3A, both modes)
- Design system: removed landing page colors `#6918F1` (`--primitive-purple-600`) and `#b582f7` (`--primitive-purple-400`, `--primitive-purple-200`)
- Design system: added platform UI colors `#796C89` (`--primitive-gray-purple-600`, UI only — fails text AA) and `#8F849C` (`--primitive-gray-purple-400`, text AA ✅)
- Design system: fonts changed from DM Serif Display / DM Sans / IBM Plex Mono → Roboto / Roboto Mono (platform match)
- Design system: `index.html` updated with Google Fonts preconnect + Roboto load
- A11y: new audit Section 8 in `design/a11y-color-audit.md` — platform colors; A11Y-04 and A11Y-05 opened
- Research: personas updated to v1.1 — grounded in real Hub Ocean partner institutions (IMR, Aker BP/TGS, UN Ocean Decade CDG), AI-native behaviors added to Lena, ESG reporting pressure added to Marcus, institutional credibility gap added to Amara
- Research: pain point PP-12 — filter tool interaction and semantics unclear, discovered from live ODP testing
- Product: design decision DD-09 — clickable card labels as filter triggers, replacing invisible sidebar affordances
- Marketing: positioning.md Section 8 — Audience Expansion beyond researchers; ESG analyst persona draft (Sofia Chen); prerequisite conditions for serving non-research audiences
- Research: PP-13 added — Citation implementation inconsistent across datasets (High)
- Research: PP-14 added — Map displays vessel tracklines instead of coverage bbox (Critical)
- Research: PP-15 added — Technical field names have no plain-language descriptions (High)
- Research: Cross-Cutting Insight updated — PP-14 noted as reinforcing DD-02 bbox-first map design

## [0.3.0] — 2026-04-02

### Added

- **`src/styles/globals.css`** — Tailwind v4 entry point.
  - `@theme` block maps all semantic tokens to Tailwind utility classes (bg, text, border, action, feedback, focus groups).
  - Global `body` defaults: bg-base background, text-body color, system font stack, antialiasing.
  - `::selection` styled with cyan bg + dark text (13.92:1 — AA ✅).
  - `::-webkit-scrollbar` styled to match surface/border tokens.
  - `@layer base :focus-visible` — 2px solid `--color-focus-ring` (cyan) at 2px offset. Keyboard-only via `:focus:not(:focus-visible)` reset.
  - `@media (prefers-reduced-motion: reduce)` — collapses all animation/transition durations to 0.01ms; sets scroll-behavior to auto.

### Changed

- **`src/styles/tokens.css`** — Rebuilt as definitive three-layer system.
  - Layer 1 (Primitive): all nine brand colors + `purple-400 (#b582f7)`, `purple-200`, `cyan-500` (hover variant), feedback scale (`green-400`, `amber-400`, `red-400`). Restricted values annotated inline.
  - Layer 2 (Semantic): surface, text, border, interactive, focus, feedback (A11Y-02 resolved), tag, and skeleton token groups.
  - Layer 3 (Component): card, badge (success/warning/error/info), nav, search, map panel, button (primary/secondary/ghost), skeleton.
  - Every token carries inline contrast ratio comment against its expected background.

- **`design/a11y-color-audit.md`** — Section 7: A11Y-02 marked **Resolved**; resolution details and verified ratios appended.

### Design Decisions

| Decision | Rationale |
|---|---|
| Badge pattern uses dark text (#200a3a) on colored feedback bg | All four feedback colors achieve ≥ 6.51:1 with dark label — safer than attempting light text, and avoids per-color text adjustments |
| Skeleton tokens reference bg-base + bg-surface only | No additional colors needed; shimmer effect via opacity or animation, not a new hue |
| `prefers-reduced-motion` uses 0.01ms not 0 | Some JS libraries check `getComputedStyle` duration — 0.01ms trips the "effectively disabled" check without breaking those libraries |

## [0.1.0] — 2026-04-02

### Added

- **`src/styles/tokens.css`** — Initial three-layer design token system (primitive → semantic → component).
  - Primitive layer defines the nine Hub Ocean brand colors as raw values.
  - Semantic layer assigns purpose-driven roles (surface, text, border, interactive, feedback, tags).
  - Component layer scopes tokens for dataset card, navigation, search bar, map panel, and button variants.

- **`design/a11y-color-audit.md`** — Full WCAG 2.1 AA contrast audit of the Hub Ocean brand palette.
  - All pairings tested against primary (`#200A3A`) and secondary (`#382066`) dark surfaces.
  - Brand violet `#6918F1` found non-compliant on all dark backgrounds (2.57:1 max).
  - Adjusted violet `#B582F7` (L=72% HSL) introduced as `--primitive-purple-400` — achieves 6.01:1 on `#200A3A` and 4.47:1 on `#382066` (AA for all text and UI components).
  - `#6918F1` retained in primitive palette but restricted to white/near-white surfaces only (5.17:1 on `#FFFFFF`).
  - Approved pairing table published for dark UI, secondary surface, and light surface contexts.

### Design Decisions

| Decision | Rationale |
|---|---|
| Lightened violet `#B582F7` instead of dropping brand color | Preserves brand identity while meeting compliance; avoids cyan-only palette which risks feeling cold/clinical for a public-facing data platform |
| `#6918F1` retained as primitive but not used in semantic tokens | Allows future use in Figma swatches and light-mode layouts without risking accidental dark-bg usage at the code level |
| Feedback colors (success/warning/error) left as placeholders | Requires dedicated audit session — these colors carry semantic meaning and must meet 3:1 as UI components AND 4.5:1 as text labels |
| Focus ring assigned to `--primitive-cyan-400` pending full audit | Cyan is the highest-contrast option available (13.92:1) and is safe as a temporary value; A11Y-01 tracks the adjacent-element audit |

### Open Items

| ID | Description |
|---|---|
| A11Y-01 | Focus ring audit against adjacent element colors (button fill, card border) |
| A11Y-02 | Define and audit feedback/status color set (error, warning, success, info) |
| A11Y-03 | Audit `#D8D3D3` before assigning any semantic use |
