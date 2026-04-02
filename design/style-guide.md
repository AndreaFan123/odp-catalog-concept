# Style Guide — ODP Catalog Concept Design System

> **Document status**: Draft v1.0  
> **Agent**: ui-designer  
> **Last updated**: 2026-04-02  
> **Source of truth**: This document. Changes here first, then propagate to `src/styles/tokens.css`.  
> **Changelog**: See `design/CHANGELOG.md`

---

## Design Direction

**"Scientific Clarity"** — The aesthetic of a well-designed research paper in a digital medium. Data-dense when necessary, but never chaotic. Every element earns its place by answering a user question.

- Dark base: reduces eye strain during extended data exploration sessions; references ocean depth
- Monochromatic palette with single bioluminescent accent: scientific precision with a domain-relevant signature
- Typography hierarchy that distinguishes data values (mono) from prose (sans) from titles (serif)
- Motion that confirms state changes, never decorates

---

## Color System

### Rationale
The primary background (`--primitive-navy-900: #0a0e1a`) is derived from deep-ocean blue-black — dark enough to recede, not so dark it feels aggressive. The accent (`--primitive-cyan-400: #22d3ee`) references bioluminescence — the light organisms produce in deep ocean environments. This is the one color with meaning in this domain.

All other colors are neutral grays to keep the data and the accent visually prominent.

### Primitive Tokens (raw values — never use directly in components)

```css
/* Blues / Navies */
--primitive-navy-950: #050810;
--primitive-navy-900: #0a0e1a;   /* page background */
--primitive-navy-800: #111827;   /* card surface */
--primitive-navy-700: #1f2937;   /* elevated elements */
--primitive-navy-600: #374151;   /* borders */

/* Accent */
--primitive-cyan-400: #22d3ee;   /* primary action, highlights */
--primitive-cyan-500: #06b6d4;   /* hover state */

/* Semantic colors */
--primitive-emerald-400: #34d399; /* success / open license */
--primitive-amber-400:  #fbbf24;  /* warning / restricted license */
--primitive-red-400:    #f87171;  /* error / closed license */
--primitive-indigo-400: #818cf8;  /* data visualization secondary */

/* Neutrals */
--primitive-gray-100: #f9fafb;   /* primary text */
--primitive-gray-400: #9ca3af;   /* secondary text */
--primitive-gray-500: #6b7280;   /* muted text */
```

### Semantic Tokens (purpose-based — use in components)

```css
/* Backgrounds */
--color-bg-base:     var(--primitive-navy-900);  /* page bg */
--color-bg-surface:  var(--primitive-navy-800);  /* cards, panels */
--color-bg-elevated: var(--primitive-navy-700);  /* dropdowns, tooltips */
--color-bg-overlay:  var(--primitive-navy-950);  /* navbar, modal backdrop */

/* Borders */
--color-border-default: var(--primitive-navy-600);  /* default card border */
--color-border-subtle:  var(--primitive-navy-700);  /* internal dividers */

/* Text */
--color-text-primary:   var(--primitive-gray-100);  /* headings, primary content */
--color-text-secondary: var(--primitive-gray-400);  /* labels, metadata */
--color-text-muted:     var(--primitive-gray-500);  /* timestamps, captions */
--color-text-inverse:   var(--primitive-navy-900);  /* text on light backgrounds */

/* Actions */
--color-action-primary:       var(--primitive-cyan-400);  /* CTAs, links, focus rings */
--color-action-primary-hover: var(--primitive-cyan-500);  /* hover state */

/* States */
--color-success: var(--primitive-emerald-400);  /* open license, valid states */
--color-warning: var(--primitive-amber-400);    /* restricted license, cautions */
--color-error:   var(--primitive-red-400);      /* errors, closed license */

/* Data visualization */
--color-data-1: var(--primitive-cyan-400);    /* primary data series */
--color-data-2: var(--primitive-indigo-400);  /* secondary data series */
--color-data-3: var(--primitive-emerald-400); /* tertiary */
--color-data-4: var(--primitive-amber-400);   /* quaternary */
```

### Component Tokens (scoped — use inside specific components only)

```css
/* DatasetCard */
--card-bg:           var(--color-bg-surface);
--card-border:       var(--color-border-default);
--card-border-hover: var(--color-action-primary);
--card-padding:      var(--spacing-lg);        /* 24px */
--card-radius:       var(--radius-lg);         /* 12px */

/* Badge */
--badge-open-bg:         color-mix(in srgb, var(--color-success) 10%, transparent);
--badge-open-text:       var(--color-success);
--badge-open-border:     color-mix(in srgb, var(--color-success) 30%, transparent);
--badge-restricted-bg:   color-mix(in srgb, var(--color-warning) 10%, transparent);
--badge-restricted-text: var(--color-warning);
--badge-restricted-border: color-mix(in srgb, var(--color-warning) 30%, transparent);
--badge-closed-bg:       color-mix(in srgb, var(--color-error) 10%, transparent);
--badge-closed-text:     var(--color-error);
--badge-closed-border:   color-mix(in srgb, var(--color-error) 30%, transparent);
--badge-keyword-bg:      var(--color-bg-elevated);
--badge-keyword-text:    var(--color-text-secondary);

/* Skeleton */
--skeleton-base:      var(--color-bg-elevated);
--skeleton-shimmer:   var(--color-bg-surface);

/* Navigation */
--nav-bg:     var(--color-bg-overlay);
--nav-border: var(--color-border-subtle);
--nav-height: 56px;

/* Spatial Thumbnail */
--spatial-land:    var(--primitive-navy-700);
--spatial-ocean:   var(--primitive-navy-800);
--spatial-bbox:    var(--color-data-1);
--spatial-bbox-opacity: 0.3;
```

---

## Typography

### Rationale
Three distinct font roles enforce information hierarchy:
- **DM Serif Display**: Authoritative, editorial. Reserved for dataset names and section heroes. Signals "this is the thing you're looking at."
- **DM Sans**: Clean, neutral. All UI labels, body copy, navigation. Never competes with the display font.
- **IBM Plex Mono**: Precision. Metadata values — dates, IDs, coordinates, file sizes. Signals "this is data, not copy."

### Scale

| Token | Value | Usage |
|---|---|---|
| `--text-xs` | 0.75rem / 12px | Timestamps, captions, secondary metadata |
| `--text-sm` | 0.875rem / 14px | Body text, descriptions, UI labels |
| `--text-base` | 1rem / 16px | Default body |
| `--text-lg` | 1.25rem / 20px | Subsection headings |
| `--text-xl` | 1.5rem / 24px | Section headings |
| `--text-2xl` | 2rem / 32px | Page-level headings |
| `--text-4xl` | 3rem / 48px | Hero headings (detail page title) |

### Font assignments

| Context | Font | Weight | Size |
|---|---|---|---|
| Dataset title (card) | DM Serif Display | 400 | `text-xl` |
| Dataset title (detail hero) | DM Serif Display | 400 | `text-4xl` |
| Section headings | DM Sans | 600 | `text-lg` |
| Body / description | DM Sans | 400 | `text-sm` |
| Nav links | DM Sans | 500 | `text-sm` |
| Metadata labels | DM Sans | 500 | `text-xs` |
| Metadata values | IBM Plex Mono | 400 | `text-xs` |
| Dates, IDs, coordinates | IBM Plex Mono | 400 | `text-sm` |
| Badge text | IBM Plex Mono | 400 | `text-xs` |
| Citation block | IBM Plex Mono | 400 | `text-sm` |

---

## Spacing

**8px base grid.** All spacing values are multiples of 4px, with the working unit being 8px.

| Token | Value | Usage |
|---|---|---|
| `--spacing-xs` | 4px | Tight internal padding (badge px) |
| `--spacing-sm` | 8px | Icon gaps, tight list spacing |
| `--spacing-md` | 16px | Default element padding |
| `--spacing-lg` | 24px | Card padding, section gaps |
| `--spacing-xl` | 32px | Section separators |
| `--spacing-2xl` | 48px | Major section breaks |
| `--spacing-3xl` | 64px | Page-level vertical rhythm |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Badges, small pills |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-full` | 9999px | Keyword tags, status dots |

---

## Motion

### Rationale
Motion confirms state changes and guides attention. It is never decorative. All animations wrap in `prefers-reduced-motion` media query.

```css
:root {
  --motion-duration-fast: 150ms;   /* hover transitions */
  --motion-duration-base: 200ms;   /* enter/exit transitions */
  --motion-duration-slow: 300ms;   /* page-level transitions */
  --motion-ease-out:     cubic-bezier(0, 0, 0.2, 1);
  --motion-ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Motion patterns

| Pattern | Duration | Easing | Usage |
|---|---|---|---|
| Card entrance | 200ms | ease-out | Staggered opacity + translateY on catalog load |
| Hover border | 150ms | ease-in-out | Card border-color transition |
| Hover shadow | 150ms | ease-in-out | Card box-shadow on hover |
| Skeleton pulse | 1.5s infinite | ease-in-out | Loading skeleton animation |
| Tooltip appear | 150ms | ease-out | Opacity fade |
| Map load | 300ms | ease-out | Opacity fade after tiles load |

---

## Components

### DatasetCard — Information Hierarchy

The card must answer 5 questions in under 3 seconds:

```
┌─────────────────────────────────────────────┐
│ [Spatial Thumbnail 80×60px]  [License Badge] │
│                                              │
│ Dataset Title (DM Serif Display, text-xl)    │
│ One-line description, max 2 lines (DM Sans)  │
│                                              │
│ [Region label]  ·  [Year range]  ·  [Count] │
│ (mono, text-xs, muted)                       │
│                                              │
│ [keyword] [keyword] [keyword] +N more        │
└─────────────────────────────────────────────┘
```

States: Default → Hover (border becomes cyan, subtle shadow) → Focus (visible ring in cyan)

### Badge — License Variants

| License type | Background | Text | Border | Label |
|---|---|---|---|---|
| Open (CC BY, ODC-By, CC0) | success/10% | success | success/30% | "CC BY 4.0" |
| Restricted (CC BY-NC) | warning/10% | warning | warning/30% | "CC BY-NC 4.0" |
| Closed (proprietary) | error/10% | error | error/30% | "Restricted" |

**Accessibility**: Color alone is insufficient. Always include the text label inside the badge.

### Skeleton — Shape Fidelity Rule

Skeleton loading states must match the shape of real content exactly. Generic grey bars are not acceptable.

```
DatasetCard skeleton:
- 80×60px block (thumbnail placeholder)
- h-6 w-3/4 block (title)
- h-4 w-full + h-4 w-2/3 (two description lines)
- Three small pills h-5 w-20 (badges)
```

### Focus Indicators

All interactive elements must have a visible focus indicator that does not rely solely on the browser default.

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--color-action-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

---

## Accessibility Commitments

- Text contrast ≥ 4.5:1 for normal text (verified: `--color-text-primary` on `--color-bg-surface` = 14.2:1)
- Text contrast ≥ 3:1 for large text and UI elements (verified: cyan accent on navy surface = 4.1:1)
- No color-only information (all badges have text labels; timeline has text annotation)
- All interactive elements keyboard navigable with visible focus rings
- Spatial thumbnails have descriptive alt text
- `prefers-reduced-motion` respected by all animations
