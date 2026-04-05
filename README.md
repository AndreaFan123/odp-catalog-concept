# ODP Catalog — Concept Redesign

A portfolio project redesigning the Ocean Data Platform catalog experience.
**Not an official Hub Ocean product.**

## Design Rationale

Hub Ocean describes itself as "the Spotify of ocean data."
This concept takes that metaphor seriously:

- Spotify-inspired sidebar navigation
- Dataset cards as "album covers" with spatial map thumbnails
- Light/dark mode (platform-aligned)
- Keyboard accessible throughout (WCAG AA)

## Key Design Decisions

| # | Decision | Rationale |
|---|---|---|
| DD-10 | Spotify UX pattern | Hub Ocean's own metaphor, applied rigorously |
| DD-11 | Dataset loading animation | Data as experience |
| DD-13 | No map thumbnail on cards | Too small to be useful |
| DD-14 | Flat map on detail page | 3D globe distorts area perception |
| DD-15 | Light mode first | Matches the live ODP platform |
| DD-16 | Collection relationship filter, not type filter | Discovery flow > taxonomy |

Full decision log: [product/design-decisions.md](product/design-decisions.md)

## Tech Stack

- **Framework**: Vite + React 19 + TypeScript (strict)
- **Router**: TanStack Router v1
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Spatial maps**: world-atlas + topojson-client
- **Package manager**: pnpm

## Research & Design Docs

| Document | Contents |
|---|---|
| [research/user-personas.md](research/user-personas.md) | Three primary user archetypes |
| [research/pain-points.md](research/pain-points.md) | Friction points in current ODP UI |
| [research/competitive.md](research/competitive.md) | Competitive landscape analysis |
| [product/design-decisions.md](product/design-decisions.md) | Decision log with rationale |
| [product/roadmap.md](product/roadmap.md) | Feature phases and status |
| [design/style-guide.md](design/style-guide.md) | Token architecture, typography, color |
| [design/a11y-color-audit.md](design/a11y-color-audit.md) | WCAG AA contrast audit |
| [marketing/positioning.md](marketing/positioning.md) | Non-profit positioning strategy |

## Live API

Data sourced from the Hub Ocean public STAC API — no authentication required:

```
https://api.hubocean.earth/api/stac/collections
```

38 collections available as of April 2026.

## Disclaimer

This is an independent concept redesign for portfolio purposes.
Not affiliated with or endorsed by Hub Ocean.
