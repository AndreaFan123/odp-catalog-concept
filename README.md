# ODP Catalog Concept

A design study and working prototype that reimagines the [Hub Ocean Ocean Data Platform](https://app.hubocean.earth/catalog) catalog experience — built as part of an application for the Frontend Engineer role at Hub Ocean.

---

## What Is This?

The Ocean Data Platform (ODP) is a real, production product. This project is not a fork of it — it is a concept that asks: *what would the dataset catalog experience look like if it were designed around how users evaluate data, rather than how data is stored?*

The core thesis: the current ODP catalog detail page buries decision-critical information (spatial coverage, temporal range, license) inside technical prose and collapsed accordions. Three distinct user groups — researchers, industry data managers, and policy analysts — cannot quickly answer "is this dataset fit for my purpose?" The redesign leads with those answers.

This repo demonstrates the full process: user research → product decisions → design system → working implementation. All data is fetched live from Hub Ocean's public STAC API.

---

## Repo Structure

This project is organized as a design process, not just a codebase. Each directory tells part of the story:

```
├── research/           User research and competitive analysis
│   ├── user-personas.md    Three personas derived from Hub Ocean's user groups
│   ├── pain-points.md      11 specific UX problems with the current ODP UI
│   └── competitive.md      What GBIF, OBIS, Copernicus, Pangaea, BCO-DMO do better
│
├── product/            Product decisions
│   ├── problem-statement.md    The specific gap this redesign addresses
│   ├── design-decisions.md     Every design choice traced to a user need
│   └── roadmap.md              Portfolio scope vs. production vision (honestly scoped)
│
├── design/             Design system
│   ├── style-guide.md          Token architecture, typography, components
│   ├── CHANGELOG.md            Every token and component change logged
│   └── wireframes/             Annotated layout descriptions for each page
│
├── marketing/          Growth strategy
│   └── positioning.md          Non-profit positioning, channel strategy, onboarding journeys
│
└── src/                Working React implementation
    ├── components/     Self-built UI components (no component library)
    ├── lib/            STAC API client, formatting utilities
    ├── pages/          CatalogPage and DetailPage
    └── styles/         Design token system (CSS custom properties + Tailwind)
```

---

## Why This Project?

Hub Ocean's Frontend Engineer JD asks for "a strong portfolio showing interaction design + visual design craft" and engineers who can "reduce complexity in data-heavy workflows through clear interface design."

I started by reading the JD, then registered for the platform and spent time with it as each of the three user types described in `research/user-personas.md`. The pain points I found are real — they come from actually using the product, not guessing. The design decisions in this project are responses to those specific frictions.

The marketing strategy (`marketing/positioning.md`) responds to the simultaneously open Marketing Manager JD, which asks for the same core skill: translating complex data products into clear value for diverse audiences. The UI and the marketing are solving the same problem from different directions.

---

## Running Locally

```bash
# Prerequisites: Node.js 20+, pnpm

git clone https://github.com/af/odp-catalog-concept
cd odp-catalog-concept

pnpm install
pnpm dev
```

The app fetches data live from `https://api.hubocean.earth/api/stac/collections` — no API key required.

---

## Tech Stack

| | |
|---|---|
| Framework | Vite + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + custom token system |
| Routing | React Router v7 |
| Maps | MapLibre GL JS + OpenStreetMap |
| Package manager | pnpm |
| UI components | Self-built (no component library) |

---

## Design System

The project follows 2025 industry-standard token architecture (W3C DTCG specification):

```
Primitive tokens → Semantic tokens → Component tokens
```

All tokens are defined in `src/styles/tokens.css` as CSS custom properties. `design/style-guide.md` documents every token with its rationale. `design/CHANGELOG.md` logs every change.

No hexadecimal values appear in component files — only token references.

---

## Agent Architecture (Claude Code)

This project was built using a multi-agent Claude Code setup. The `.claude/` directory contains:

- **8 specialized agents** — orchestrator, research analyst, product strategist, marketing consultant, UI designer, frontend engineer, accessibility reviewer, docs manager
- **5 skills** — STAC API conventions, React best practices, design system governance, non-profit writing tone, geospatial data visualization

Each agent has a defined role, reads `CLAUDE.md` for project context, and produces output in its designated directory. This architecture ensures that research informs product decisions, product decisions inform design, and design is implemented consistently.

---

## Concept Disclaimer

This is a portfolio concept project. It is not affiliated with or endorsed by Hub Ocean. The visual identity is intentionally distinct from Hub Ocean's current branding. All ocean data is fetched from Hub Ocean's public STAC API under its open license terms.

Built by [Andrea Fan](https://github.com/af) · April 2026
