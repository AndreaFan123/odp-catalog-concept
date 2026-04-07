---
title: Homepage — Design Specification
author: interaction-designer
date: 2026-04-05
status: Draft v1.0
references: product/design-decisions.md, research/user-personas.md, design/style-guide.md
---

# Homepage — Design Specification

## 1. Design Goals

- Users understand what ODP is within 30 seconds of landing
- All three personas (Lena, Marcus, Amara) have a clear, distinct entry point
- Brand feel: ocean + data + technology — emotional before functional
- The page makes a promise; the catalog fulfils it

## 2. Page Architecture

```
┌─────────────────────────────────────────────┐
│  Navbar (fixed, transparent → #200A3A)       │
├─────────────────────────────────────────────┤
│  Section 1: Hero                             │
│  Full-viewport, animated world map bg        │
├─────────────────────────────────────────────┤
│  Section 2: By the Numbers                   │
│  3 stats, dark bg (#1a1a2e)                  │
├─────────────────────────────────────────────┤
│  Section 3: Explore by Category              │
│  2×3 grid of category cards                  │
├─────────────────────────────────────────────┤
│  Section 4: Featured Datasets                │
│  3 DatasetCard components (live data)        │
├─────────────────────────────────────────────┤
│  Section 5: How It Works                     │
│  3-step horizontal flow                      │
├─────────────────────────────────────────────┤
│  Section 6: Who Uses ODP                     │
│  3 persona cards                             │
├─────────────────────────────────────────────┤
│  Section 7: Footer                           │
└─────────────────────────────────────────────┘
```

## 3. Navbar

**Behaviour**: Fixed to the top of the viewport at all times.

| State | Background | Box-shadow |
|---|---|---|
| At top (scroll = 0) | `transparent` | none |
| Scrolled (scroll ≥ 60px) | `#200A3A` | `0 1px 0 rgba(255,255,255,0.08)` |

Transition: `background 0.3s ease, box-shadow 0.3s ease`

**Left**: ODP Logo (white version — `ODP-Logo.svg`)
**Right**: `[Browse Catalog]` button
- Background: `#03FFD1`
- Color: `#111111`
- Border-radius: `20px`
- Padding: `8px 20px`
- Font-weight: `600`

## 4. Section 1 — Hero

**Design intent (Apple × Spotify)**: One sentence, maximum impact. No features listed. The visual does the work — the world's data, alive on screen.

**Layout**: `height: 100vh`, centred content, full-width animated background

### 4.1 Copy

| Element | Content |
|---|---|
| Headline | "The world's ocean data, made usable." |
| Subline | "38 public datasets from leading research institutions and industry. Open, FAIR, and ready to explore." |

**Headline typography**: Roboto 700, 56px desktop / 36px mobile, `color: #ffffff`, `letter-spacing: -0.02em`, `max-width: 720px`

**Subline typography**: Roboto 400, 18px desktop / 16px mobile, `color: rgba(255,255,255,0.75)`, `max-width: 560px`

### 4.2 CTAs

| Button | Style | Label |
|---|---|---|
| Primary | `background: #03FFD1`, `color: #111111`, `border-radius: 24px`, `padding: 14px 28px`, `font-weight: 600` | `Browse Catalog →` |
| Secondary | Ghost: `border: 1px solid rgba(255,255,255,0.3)`, `color: #ffffff`, same sizing | `Learn how it works` |

Gap between buttons: `16px`

### 4.3 Background

- World SVG map: ocean fill `#0d1117`, land fill `#1c2b3a`
- 8–12 cyan data-point dots at approximate dataset geographic locations
- Each dot: `width: 8px`, `height: 8px`, `border-radius: 50%`, `background: #03FFD1`
- Radial gradient overlay: `radial-gradient(ellipse at 50% 60%, transparent 30%, #0d1117 90%)` — vignette effect grounding the content area

See Section 11 for dot animation specification.

## 5. Section 2 — By the Numbers

**Design intent**: Big numbers are the fastest trust signal in any data product. No prose, no explanation — the numbers speak.

**Background**: `#1a1a2e`
**Padding**: `80px 0`
**Layout**: 3-column flex, `gap: 48px`, centred

| Stat | Number | Descriptor |
|---|---|---|
| Datasets | `38` | "From krill acoustics to coral reefs" |
| Years | `14` | "Longest dataset spans 2011–2025" |
| Open | `100%` | "All public datasets are freely accessible" |

**Number typography**: Roboto 700, 64px, `color: #03FFD1`
**Descriptor typography**: Roboto 400, 14px, `color: rgba(255,255,255,0.5)`
**Gap between number and descriptor**: `8px`

Count-up animation on viewport entry — see Section 11.3.

## 6. Section 3 — Explore by Category

**Design intent**: Give users a structured discovery path that feels like browsing a music library, not querying a database.

**Layout**:
- Desktop: `display: grid`, `grid-template-columns: repeat(3, 1fr)`, `gap: 24px`
- Tablet: same, `gap: 16px`
- Mobile: `display: flex`, `overflow-x: auto`, `gap: 12px`, `scroll-snap-type: x mandatory`

**Category cards**:

| Icon | Category | Route |
|---|---|---|
| 🐋 | Biodiversity & Species | `/catalog?category=biodiversity` |
| 🌊 | Ocean Physics | `/catalog?category=ocean-physics` |
| 🪸 | Coral & Reef | `/catalog?category=coral` |
| 🎵 | Acoustics & Fisheries | `/catalog?category=acoustics` |
| 🛡️ | Marine Protected Areas | `/catalog?category=mpa` |
| ⚙️ | Industry & Offshore | `/catalog?category=industry` |

**Card anatomy**:
```
┌──────────────────────────────┐
│  [icon 32px]                 │
│                              │
│  Category Name               │
│  N datasets                  │
└──────────────────────────────┘
```

**Card tokens**:
- Background: `var(--color-surface-secondary)` (adapts to theme)
- Border: `1px solid var(--color-border)`
- Border-radius: `12px`
- Padding: `24px`
- Icon: 32px SVG, `color: var(--color-accent)`
- Category name: Roboto 500, 16px, `var(--color-text-primary)`
- Dataset count: Roboto 400, 13px, `var(--color-text-muted)`

**Hover state**: `translateY(-4px)`, `box-shadow: 0 8px 24px rgba(0,0,0,0.15)`, border-color → `var(--color-accent)`, `transition: 0.15s ease`

**Implementation note**: Dataset counts derived from `getCollections()` + `matchesCategory()` from `src/lib/categories.ts` — no additional API call required.

## 7. Section 4 — Featured Datasets

**Design intent**: Show real data immediately. The catalog's credibility is its content.

**Layout**: 3-column grid of `DatasetCard` components
**Data**: First 3 results from `getCollections()` — same call as CatalogPage, sliced client-side
**Footer**: `"Explore all 38 datasets →"` — right-aligned, `color: var(--color-accent)`, links to `/catalog`

## 8. Section 5 — How It Works

**Design intent**: Remove anxiety about technical complexity. Three steps, plain language, zero jargon. The access step explicitly says "no login required" — this removes the single biggest barrier for new users.

**Layout**: 3-column horizontal, arrow separators between columns
**Arrow**: `"→"`, `color: var(--color-text-muted)`, `font-size: 24px`, `align-self: center`

| Step | Title | Body | Icon |
|---|---|---|---|
| 1 | Discover | "Browse 38 curated ocean datasets from leading institutions" | Magnifying glass |
| 2 | Explore | "View spatial coverage, temporal range, and data types at a glance" | Map with bounding box |
| 3 | Access | "Connect via STAC API, Python SDK, or OGC API — no login required" | Code brackets |

**Icon**: 32px inline SVG, `color: var(--color-accent)`
**Title**: Roboto 600, 16px, `var(--color-text-primary)`
**Body**: Roboto 400, 14px, `var(--color-text-secondary)`, `max-width: 200px`

## 9. Section 6 — Who Uses ODP

**Design intent (Spotify lens)**: Each persona card is a mirror. Users should see themselves, not a user story. The copy is written from the user's perspective, not the platform's.

**Layout**: 3-column grid

| Icon | Audience | Body | CTA | Route |
|---|---|---|---|---|
| 🔬 | Researchers | "Find FAIR-standard datasets with temporal and spatial fit assessment" | Browse scientific datasets → | `/catalog?category=biodiversity` |
| 🏭 | Industry | "Access metocean, acoustic, and environmental monitoring data" | Explore industry data → | `/catalog?category=industry` |
| 🏛️ | Policy & Governance | "Cite open datasets for SDG 14 and 30×30 reporting" | Find policy-relevant data → | `/catalog?category=mpa` |

**Card design**: Same surface/border tokens as category cards.
**CTA link**: `color: var(--color-accent)`, `font-weight: 500`, `font-size: 14px`

## 10. Section 7 — Footer

```
ODP Catalog — Concept Redesign
Data via Hub Ocean public STAC API · Not an official Hub Ocean product.

[GitHub ↗]    [Hub Ocean ↗]    [Documentation ↗]
```

- Background: `#0d1117`
- Primary text: `rgba(255,255,255,0.4)`
- Links: `color: rgba(255,255,255,0.6)`, hover → `rgba(255,255,255,0.9)`
- Padding: `48px 0`

## 11. Animation Specification

### 11.1 Hero data-point dots

**Purpose**: Convey that the world's ocean data is alive and constantly updated. Each dot represents a real dataset's geographic location.

Each dot animates independently with a randomised phase offset to avoid synchronised blinking:

```css
@keyframes dot-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(3, 255, 209, 0.4);
  }
  50% {
    opacity: 1.0;
    transform: scale(1.2);
    box-shadow: 0 0 0 8px rgba(3, 255, 209, 0);
  }
}

.hero-dot {
  animation: dot-pulse var(--duration, 2.5s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
```

Duration range: 2s–4s per dot. Delay range: 0s–2s per dot. Assign via inline CSS custom properties.

### 11.2 Scroll-triggered section entrance

**Purpose**: Guide the user's attention downward as they scroll. Animation follows the reading direction.

Trigger: `IntersectionObserver` with `threshold: 0.15`

```css
.section-enter {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.section-enter.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Child stagger: each direct child adds `0.1s` to its `transition-delay`.

### 11.3 Count-up animation (Section 2)

**Purpose**: Numbers that count up feel earned, not static. Communicates that this data is real and measured.

Trigger: `IntersectionObserver` on the numbers section (fires once).

```javascript
function countUp(el, target, duration = 1500) {
  const start = performance.now()
  const suffix = el.dataset.suffix || ''
  requestAnimationFrame(function tick(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out-cubic
    el.textContent = Math.floor(eased * target) + suffix
    if (progress < 1) requestAnimationFrame(tick)
  })
}
```

Targets: `38` (no suffix), `14` (no suffix), `100` (suffix: `%`)

### 11.4 Navbar scroll transition

```javascript
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.home-navbar')
  nav.classList.toggle('scrolled', window.scrollY >= 60)
})
```

```css
.home-navbar { background: transparent; transition: background 0.3s ease, box-shadow 0.3s ease; }
.home-navbar.scrolled { background: #200A3A; box-shadow: 0 1px 0 rgba(255,255,255,0.08); }
```

### 11.5 Hover animations summary

| Element | Property | Final value | Duration |
|---|---|---|---|
| Category card | `transform` | `translateY(-4px)` | `0.15s ease` |
| Category card | `box-shadow` | `0 8px 24px rgba(0,0,0,0.2)` | `0.15s ease` |
| Primary CTA | `transform` | `scale(1.02)` | `0.15s ease` |
| Primary CTA | `box-shadow` | `0 4px 16px rgba(3,255,209,0.3)` | `0.15s ease` |

### 11.6 prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Count-up: display final value immediately, skip animation.
Hero dots: render at `opacity: 0.7`, `scale: 1`, no pulse, no box-shadow.
Entrance animations: display sections at final state (`opacity: 1`, `translateY: 0`) without transition.

## 12. Router Integration

| Route | Component | Layout |
|---|---|---|
| `/` | `HomePage` | Full-width, no sidebar, `Navbar` component |
| `/catalog` | `CatalogPage` | `AppShell` (sidebar layout) |
| `/collections/:id` | `DetailPage` | `AppShell` (sidebar layout) |

**AppShell** renders only on `/catalog` and `/collections/:id`.
**Navbar** (homepage variant) renders only on `/`.

TanStack Router change: move the existing `/` route to `/catalog`; add a new `/` route pointing to `HomePage`.

## 13. Implementation Notes for frontend-engineer

| Topic | Guidance |
|---|---|
| Hero world map | Use SVG primitives similar to `SpatialThumbnail` — do not import a full mapping library for a decorative background |
| Category counts | Compute client-side from `getCollections()` using `matchesCategory` from `src/lib/categories.ts` — no extra API call |
| Featured datasets | Reuse `DatasetCard` + `getCollections()`, `slice(0, 3)` |
| Animation library | Use CSS `@keyframes` + `IntersectionObserver` — do not add Framer Motion for this scope |
| New files | `src/pages/HomePage.tsx`, `src/components/home/HeroSection.tsx`, `src/components/home/CategoryGrid.tsx`, `src/components/home/StatCounter.tsx`, `src/components/home/HowItWorks.tsx`, `src/components/home/PersonaCards.tsx` |
| Theme support | All tokens use CSS custom properties — light/dark mode is inherited automatically |
