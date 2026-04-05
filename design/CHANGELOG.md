# Design System Changelog

All significant design system decisions are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

## [2026-04-05] — Focus state unified; Sidebar redesign; Loading inline; Spotify UX refactor; responsive layout; a11y improvements; DD-13–16

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
