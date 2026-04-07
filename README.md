# ODP Catalog Concept

A concept redesign of the Hub Ocean Ocean Data Platform catalog experience, built as a portfolio project for the Hub Ocean Frontend Engineer role.

**Live demo**: [Vercel URL — coming soon]
**Built by**: Andrea Fan

---

## What This Is

A full product design and development exercise demonstrating:

- User research & persona development
- Information architecture analysis
- Product decision-making with trade-offs
- React frontend implementation
- API integration and limitation handling

---

## The Design Problem

Hub Ocean's current platform has three core IA issues identified through research:

1. **No Sector landing pages** — 4 audiences with no clear entry point
2. **Key content buried 2–3 levels deep** — The 3% Problem and TNFD data are in sub-pages
3. **No persona routing** — 38 collections with no guidance on where to start

**Our solution**: Persona routing as the primary navigation pattern, with dedicated Sector landing pages for each audience.

---

## Pages & Routes

| Route | Page | Type |
|-------|------|------|
| `/` | HomePage | Marketing |
| `/solutions/science` | SciencePage | Marketing |
| `/solutions/industry` | IndustryPage | Marketing |
| `/solutions/governance` | GovernancePage | Marketing |
| `/solutions/citizen` | CitizenPage | Marketing |
| `/catalog` | CatalogPage | Platform |
| `/collections/:id` | DetailPage | Platform |
| `/datasets/:id` | DatasetDetailPage | Platform |

---

## Data Sources

**Public STAC API** (no auth required):
`https://api.hubocean.earth/api/stac/collections`
→ 38 collections, flat structure

**Mock data** (derived from authenticated Catalog API):
- Aker BioMarine EK60 collection (25 datasets, sourced from `/api/catalog/v2/data-collections/{id}`)
- 3 individual datasets (sourced from `/api/public/catalog/v1/dataset/{id}`)

**API limitations discovered**:
- STAC API is flat — no Collection/Dataset hierarchy
- Catalog API v2 requires Bearer token (401)
- Dataset-level features (tabular metadata, file listings) require authentication

---

## Demo Walkthrough

To explore the full Collection → Dataset hierarchy, follow this path:

1. Go to **Catalog** (`/catalog`)
2. Find and click **"Aker BioMarine EK60, EK80 Echosounder data"**
3. On the Collection detail page, scroll to **"Datasets in this Collection"**
4. Click **"Aker BioMarine Antarctic Provider 2022"** or **"Aker BioMarine Saga Sea 2022"** to view the Dataset detail page

These two datasets are powered by mock data sourced from Hub Ocean's authenticated Catalog API, demonstrating the full Collection → Dataset UX flow that is not possible with the public STAC API alone.

Other collections in the catalog use live data from the public STAC API.

---

## Tech Stack

- Vite + React 19 + TypeScript (strict)
- TanStack Router v1
- Tailwind CSS v4
- world-atlas + topojson-client
- pnpm

---

## Development Approach

Built with AI-assisted development (Claude Code + Claude.ai).

**AI helped with**:
- React component implementation
- TypeScript boilerplate
- CSS styling details

**Done manually**:
- User research & 4 persona development
- IA analysis (As-Is vs To-Be)
- 31 design decisions with rationale
- STAC API capability analysis
- Collection vs Dataset hierarchy decisions
- API limitation identification & fallbacks
- Product strategy and prioritization

---

## Research & Design Docs

All research and design decisions are documented in the `/research` and `/product` directories:

- `research/user-personas.md` — 4 personas
- `research/pain-points.md` — PP-01 to PP-23
- `research/ia-analysis.md` — IA As-Is/To-Be
- `product/problem-statement.md`
- `product/design-decisions.md` — DD-01 to DD-31
- `design/style-guide.md`

---

## Not an Official Hub Ocean Product

This is a personal portfolio project. All data is sourced from Hub Ocean's public STAC API. Mock data is derived from the authenticated Catalog API (accessed via personal account for research purposes only).
