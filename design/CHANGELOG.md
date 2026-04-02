# Design System Changelog

All significant design system decisions are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

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
