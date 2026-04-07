# Design Decisions — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-05 (DD-17–DD-26 added)  
> **References**: research/pain-points.md, research/competitive.md

---

## How to Read This Document

Each decision is tied to a specific pain point (PP-XX) from `research/pain-points.md` and a specific persona. The goal is to make every design choice traceable to a user need — not an aesthetic preference.

---

## DD-01: Lead with 5 structured facts, not a prose description

**Pain point addressed**: PP-01 (information hierarchy inverts user priority)  
**Persona**: All three  
**Context**: The current detail page opens with a prose paragraph that buries decision-critical information. Users must read before they can assess.  
**Options considered**:
- A: Keep prose description, add a summary section above it
- B: Replace the prose description entirely with structured fields
- C: Show 5 structured facts at the top; move prose description to a collapsible "About" section below

**Decision**: Option C  
**Rationale**: Lena needs structured facts (spatial, temporal, license) to assess fit in under 30 seconds. Amara needs plain-language context, which the prose description provides — but only after she's decided to engage. The prose description still has value; it just belongs in a lower-priority position. Option B destroys useful context. Option A improves things marginally but keeps the cognitive load of reading prose first.  
**Trade-offs**: Providers who wrote detailed descriptions may find them deprioritized. This is the correct trade-off — the platform's job is to serve the reader, not reward the writer.

---

## DD-02: Spatial thumbnail on every dataset card

**Pain point addressed**: PP-02 (spatial coverage not immediately visible)  
**Persona**: Lena (Researcher), Amara (Policy)  
**Context**: The catalog listing page shows no spatial information. A researcher scanning 10 datasets to find geographic overlap must click into each one.  
**Options considered**:
- A: Text-only region label (e.g., "Southern Ocean")
- B: Small SVG world map with bbox highlighted
- C: Mapbox tile thumbnail (requires API key, external dependency)

**Decision**: Option B — SVG mini-map  
**Rationale**: A text label ("Southern Ocean") is ambiguous and requires geographic knowledge to interpret. A visual bbox on a world outline communicates extent, position, and scale simultaneously — and works for Amara who may not know where the Southern Ocean is. Option C introduces a paid dependency and external API call for every card render, which is inappropriate for a catalog listing page with many cards. SVG is self-contained, fast, and accessible with proper alt text.  
**Trade-offs**: SVG world outlines are simplified and imprecise for complex multi-bbox datasets (like Aker BP's hundreds of point locations). Handle gracefully by showing the union bbox or a text fallback for point datasets.

---

## DD-03: Human-readable temporal range as a primary display element

**Pain point addressed**: PP-03 (temporal range is machine-readable)  
**Persona**: Lena, Marcus  
**Context**: STAC API returns ISO timestamps. Displaying them raw requires mental parsing.  
**Options considered**:
- A: Show ISO timestamp with tooltip showing year range
- B: Show year range only ("2011 – 2025")
- C: Show year range + duration + a visual timeline bar

**Decision**: Option C on detail page, Option B on catalog card  
**Rationale**: On the catalog card, space is limited — "2011 – 2025" communicates the essential fact efficiently. On the detail page, the timeline bar adds "14 years of coverage" context that helps Lena compare datasets by recency and duration without arithmetic. The ISO timestamp remains available in the raw metadata section for users who need it.  
**Trade-offs**: Duration calculation requires JavaScript date math — edge cases include open-ended ranges (null end date) and single-year datasets.

---

## DD-04: License badge with plain-language tooltip

**Pain point addressed**: PP-04 (license string is opaque)  
**Persona**: Lena, Amara  
**Context**: License strings like `odc-by-1.0` or `CC-BY-NC-4.0` are not self-explanatory.  
**Options considered**:
- A: Show raw license string
- B: Show human-readable label ("CC BY-NC 4.0") with link to license page
- C: Show color-coded badge + human label + tooltip explaining commercial use and attribution requirements

**Decision**: Option C  
**Rationale**: Amara cannot open an external license page during a 20-minute briefing preparation. She needs the answer inline. The tooltip answers: "Can I use this in a publication? Yes. Can my NGO use this commercially? No." Two boolean answers cover 90% of use cases for Lena and Amara. The color-coding (green = open, amber = restricted, red = proprietary) enables scanning across multiple cards.  
**Trade-offs**: Color alone is insufficient for accessibility — the badge must include the text label. Color is a reinforcing signal, not the primary one.

---

## DD-05: "Use Dataset" is a persistent panel, not a collapsed accordion

**Pain point addressed**: PP-05 (Use Dataset collapsed by default)  
**Persona**: Marcus, Lena  
**Context**: The API access path is the primary action the platform exists to enable. Hiding it in an accordion inverts the importance hierarchy.  
**Options considered**:
- A: Keep accordion, move it above the fold
- B: Replace accordion with a persistent panel showing all three access methods (API, OGC, Vector Tiles)
- C: Single prominent "Access Data" button that expands to show options

**Decision**: Option B  
**Rationale**: Marcus needs to verify that all three access paths are working and findable for his partners. Lena needs the API endpoint she can copy directly into her notebook. Both users know what they want — they should not need to discover it. Option C requires an extra click that adds no value. Option A is an improvement but still suggests these are secondary options.  
**Trade-offs**: A persistent panel takes more vertical space. This is the correct trade-off — the access panel is the point of the page.

---

## DD-06: Keywords are interactive filters

**Pain point addressed**: PP-08 (tags not interactive)  
**Persona**: Lena  
**Context**: Keywords like "krill", "Southern Ocean", "acoustic" are natural discovery vectors. Currently display-only.  
**Options considered**:
- A: Keep as display-only pills
- B: Make keywords link to catalog filtered by that keyword
- C: Make keywords clickable, update catalog URL with filter parameter

**Decision**: Option C  
**Rationale**: Option C preserves browser history (back button works), supports sharing filtered catalog URLs, and aligns with how researchers use keyword-based discovery. Lena clicking "krill" should see all krill-related datasets — this is the most natural next step after finding one relevant dataset.  
**Trade-offs**: Requires implementing URL-based filter state in the catalog page. Worth the effort; this is how all professional data catalogs work (GBIF, Pangaea).

---

## DD-07: Citation block on detail page

**Pain point addressed**: PP-04 (partially), PP-09 (provider credibility)  
**Persona**: Lena, Amara  
**Context**: Competitive analysis (Pangaea) shows that a formatted, copyable citation is a primary need for research and policy users. STAC metadata provides all necessary fields.  
**Options considered**:
- A: Show provider name only
- B: Show provider name + link to provider website
- C: Show formatted citation block with copy button (APA format using STAC fields)

**Decision**: Option C  
**Rationale**: Amara's workflow ends at "I need a citable reference." If she cannot get this from ODP in one click, she goes elsewhere. A formatted citation block removes the final barrier to adoption for policy users. The STAC `title`, `providers`, `links` (for URL), and temporal data provide everything needed for an APA-style citation. The copy button reduces the citation from a multi-step process to a single action.  
**Trade-offs**: Citation format preferences vary (APA vs. BibTeX vs. Chicago). Start with APA as the broadest academic standard; add BibTeX toggle in production scope.

---

## DD-08: No UI component library — self-built design system

**Pain point addressed**: (Design craft signal, not a user pain point)  
**Persona**: Hub Ocean hiring team  
**Context**: The JD explicitly requires "strong portfolio showing interaction design + visual design craft." Using shadcn/ui or MUI would demonstrate component consumption, not design authorship.  
**Options considered**:
- A: Use shadcn/ui (pre-built accessible components, faster)
- B: Use MUI (comprehensive, opinionated)
- C: Build all components from scratch using Tailwind + design token system

**Decision**: Option C  
**Rationale**: Every component in this project is an opportunity to demonstrate design judgment. The Badge component's color-coding decision, the Skeleton component's shape fidelity, the DatasetCard's information hierarchy — these are the portfolio's argument. Using a library would outsource these decisions to someone else's design system. The constraint is also realistic: a small team like Hub Ocean likely maintains their own component system, and demonstrating the ability to build and govern one is directly relevant.  
**Trade-offs**: More implementation time. `clsx` + `tailwind-merge` are the only allowed utilities. Accessibility must be implemented manually — `a11y-reviewer` sign-off required for every component.

---

## DD-09: Filter discovery driven by card content, not sidebar instructions

**Pain point addressed**: PP-12
**Persona**: All three personas
**Context**: The existing ODP filter sidebar is opaque to users. Users must actively discover that filters exist before they can use them, which means most people only use keyword search.
**Options considered**:
- A: Add explanatory text and usage prompts to the filter sidebar
- B: Integrate region and date filtering into the search box placeholder
- C: Make the region label, temporal range, and keywords on each dataset card into clickable filter triggers — users discover filtering from the content itself
**Decision**: Option C, combined with active filter chips below the search box to show currently applied filters
**Rationale**: Consistent with the logic of DD-06 (keyword interactivity). Let the data guide discovery rather than relying on UI instructional text. Lena clicking the "Southern Ocean" region label immediately sees all Southern Ocean datasets; Amara clicking the "CC BY 4.0" badge filters to datasets she can cite. This pattern is intuitive regardless of a user's technical level.
**Trade-offs**: Requires URL-based filter state to support multiple simultaneous filters (keyword + region + license + temporal). TanStack Router's validateSearch handles this requirement.

---

## DD-10: Spotify-inspired UX as core design metaphor

**Pain point addressed**: PP-12 (opaque filters), PP-01 (information hierarchy)
**Persona**: All three personas
**Context**: Hub Ocean officially positions itself as "the Spotify of ocean data." The UI should genuinely embody this positioning rather than remaining a database list.
**Options considered**:
- A: Keep the existing list-based UI and only improve information hierarchy
- B: Adopt a dashboard layout (Netflix/YouTube-style grid with categories)
- C: Adopt the Spotify desktop app UX architecture: fixed left sidebar + dark-themed base + light/dark mode toggle + square card covers

**Decision**: Option C
**Rationale**: A dark background makes the SpatialThumbnail's cyan bbox highlight the visual focus, directly addressing the spatial visibility problem in PP-02. The Spotify-style left sidebar keeps category navigation permanently visible, resolving the filter opacity problem in PP-12 — users do not need to "discover" that filters exist; they are always there. Square cover images give each dataset a visual identity rather than reducing it to a row of text. A light/dark mode toggle provides an optimal reading experience across different usage contexts (lab monitors vs. presentation environments).
**Trade-offs**: Dark-theme design requires stricter contrast review for accessibility. All components must pass `a11y-reviewer` sign-off in both dark and light modes.

---

## DD-11: "Play" button — letting users experience data rather than just viewing it

**Pain point addressed**: PP-02 (spatial coverage not immediately intuitive), PP-01 (information hierarchy)
**Persona**: Amara (Policy), Lena (Researcher)
**Context**: Spotify's core UX insight is the "preview" — letting users experience content without needing to understand the technical details first. ODP can do the same: let users "feel" what a dataset contains without downloading it.
**Options considered**:
- A: Display only a static map and numeric summary
- B: Link out to an external data visualization tool
- C: Add a "Play" button to each dataset card that triggers a bottom playbar and a corresponding animated data visualization

**Decision**: Option C (Portfolio scope implements static Playbar UI + 2 animation types first)
**Rationale**: Transforms "data exploration" into "data experience," allowing non-technical users to intuitively understand what a dataset represents. Animation logic varies by data type: time-series data → waveform animation (like an audio waveform visualizer); geographic coverage data → data points appearing progressively on a map; acoustic data (e.g., Aker BioMarine) → spectrogram animation. The bottom playbar displays the dataset name, coverage, and timeline. This is a differentiating feature that no current ocean data platform offers.
**Trade-offs**: Requires designing different animation logic for each data type. Portfolio scope implements 2 types first: time-series waveform (WaveAnimation) + geographic point data (MapAnimation). Acoustic spectrogram animation is deferred to production scope.

---

## DD-12: Onboarding survey → personalized catalog

**Pain point addressed**: PP-12 (opaque filters)
**Persona**: New users (the first-visit state of all three personas)
**Context**: New users arrive at the catalog facing 40+ datasets with no clear starting point. The existing platform assumes users already know what they are looking for.
**Options considered**:
- A: Display a "Getting Started" help page
- B: Change the default sort order to "most downloaded"
- C: Show a 3-question onboarding modal on first visit that pre-applies filters based on answers and persists user preferences

**Decision**: Option C (Portfolio scope implements modal + localStorage preference persistence first)
**Rationale**: Three questions are sufficient to cover the primary use-case differences across all three personas: "What is your primary purpose?" (research / policy / technical integration), "Which ocean region interests you most?" (global / specific region), and "Do you need a license that permits free commercial use?" (yes / unsure / no). The answers map directly to the existing filter system with no additional backend required. localStorage preference persistence means returning users do not need to answer again. This pattern transforms the catalog from a "database" into a "personalized assistant."
**Trade-offs**: The modal must be skippable (non-forced), and preferences must be retrievable from the UI after skipping. Portfolio scope does not include an account system; preferences live only in localStorage and reset when browser data is cleared.

---

## DD-13: DatasetCard removes map thumbnail, uses region badge instead

**Pain point addressed**: PP-02 (spatial coverage not immediately intuitive)
**Persona**: Lena, Amara
**Context**: At the small card size, the SpatialThumbnail's continent shapes are nearly unrecognizable. The thumbnail fails to convey any geographic information and instead adds visual noise.
**Options considered**:
- A: Keep the map thumbnail but increase card size
- B: Remove the map thumbnail and use a plain-text region badge (e.g., "Southern Ocean", "North Sea", "Global")
- C: Replace the map with a color block, using ocean-blue hues keyed by region

**Decision**: Option B
**Rationale**: A text region label communicates geographic information faster and more reliably than a blurry map thumbnail. This aligns with the conclusion from the GBIF competitive analysis (research/competitive.md): GBIF uses text-based region filters, not thumbnails. The map experience is reserved for the detail page, where a larger size makes it meaningful. Amara immediately understands "Southern Ocean"; a fuzzy map rectangle requires interpretation.
**Trade-offs**: Loses the visual geographic affordance, but gains cleaner information delivery and faster card rendering (removes SVG calculation).

---

## DD-14: Detail page uses a flat map (MapLibre GL JS)

**Pain point addressed**: PP-02 (spatial coverage not immediately intuitive)
**Persona**: Lena, Marcus
**Context**: The detail page requires a high-quality map to display a dataset's spatial extent so users can assess geographic coverage.
**Options considered**:
- A: Use a 3D globe view
- B: Use a flat map (MapLibre GL JS + OpenStreetMap tiles)
- C: An enlarged version of the SpatialThumbnail SVG

**Decision**: Option B — MapLibre GL JS flat map
**Rationale**: A flat map directly answers the user's question: "Where does this data cover?" The bbox highlight comes from the STAC spatial extent, not raw geometry — this resolves PP-02. MapLibre is free and open source with no API key required. Option C (a large SVG) lacks detail (coastlines, islands, country borders) and cannot serve the detail page use case.
**Trade-offs**: Loses the visual impact of a 3D globe, but gains accurate and legible spatial information. MapLibre requires lazy loading to avoid affecting catalog page performance.

---

## DD-15: Light mode first, dark mode deferred

**Pain point addressed**: (Design language alignment — not a direct user pain point)
**Persona**: Hub Ocean hiring team
**Context**: The original plan was to use a dark theme matching Spotify (DD-10), but the Hub Ocean platform itself uses light mode. Dark-theme designs require additional contrast work in accessibility review.
**Options considered**:
- A: Full dark theme (aligned with Spotify)
- B: Light mode as primary, with the sidebar retaining the deep purple brand color (#200A3A)
- C: User-switchable light/dark mode

**Decision**: Option B — Light mode first
**Rationale**: Aligns with the actual design language of the Hub Ocean platform while the sidebar's dark background (#200A3A) preserves brand recognition. Light mode is easier to pass WCAG AA review. Dark mode is deferred as a follow-up feature (listed as a Should item in Roadmap Phase 5).
**Trade-offs**: Reduces the visual impact of the Spotify metaphor, but improves design credibility and maintainability.

---

## DD-16: Type filter replaced by Collection relationship display

**Pain point addressed**: PP-11 (no related dataset discovery mechanism)
**Persona**: Lena (Researcher), Marcus (Publisher)
**Context**: The Hub Ocean platform's current Type filter provides a "Dataset / Data Collection" checkbox that requires users to understand the platform's internal architectural categories. This is system-concept leakage into the UI: ordinary users do not need to — and should not need to — understand what a "STAC Collection" is in order to find the data they need.

However, Collections have genuine user value; they simply need to be surfaced differently:
- After Lena finds a relevant dataset, she naturally wants to know: "What other similar data does this provider have?"
- When Marcus publishes data, he deliberately organizes related datasets into a Collection and wants users to discover all of them together.

**Options considered**:
- A: Keep the existing checkbox filter (Dataset / Data Collection)
- B: Remove the type classification concept entirely and show only a flat dataset list
- C: Remove the filter checkbox; instead show a "Part of Collection" relationship entry point on the card and detail page, letting users discover related content from the content itself rather than from a filter taxonomy

**Decision**: Option C
**Rationale**: Option A requires users to understand the system architecture before they can filter — this is a UI anti-pattern. Filters should answer "what do I want to find," not "which internal type does this data belong to?" Option B abandons the value of Collections entirely. Option C preserves the core function of Collections as a discovery path while removing the unnecessary cognitive burden of understanding the classification architecture.

Concrete implementation: a small "Part of [Collection Name]" tag in the lower-right corner of the dataset card; clicking it surfaces the other datasets in that collection. This directly addresses PP-11 (no related dataset discovery mechanism): users naturally move from one dataset to the other members of the same Collection without needing to understand the underlying architecture.

**Trade-offs**: Requires that the collection relationship data in the STAC `links` field is correctly populated. Portfolio scope shows a static text label ("Part of [collection title]") without building a full collection browsing page. The collection browsing page is deferred to roadmap medium-term (existing Collection-level pages entry).

**2026-04-06 final confirmation:**
Three endpoints tested for parent collection data — all returned negative:
- `STAC API links` — no `collection` rel found across all 38 collections
- `/api/public/catalog/v1/dataset/{uuid}` — 404, not publicly accessible
- `/api/public/catalog/v1/jsonld/?uuid={uuid}` — 200, but `isPartOf` is `undefined`

DD-16's "Part of Collection" feature cannot be implemented within the public API surface. The detail page uses "More from this provider" (DD-21) as the replacement discovery mechanism.

---

## DD-17: Two-column layout for detail page

**Pain point addressed**: PP-05, PP-17
**Persona**: Lena, Marcus, Amara
**Status**: Decided

**Context**: Hub Ocean's current detail page is a single-column linear layout. Users must scroll past the map and description to reach access methods and citation — assuming they have the patience to read sequentially.

**Decision**: Adopt a two-column layout for the dataset detail page:
- **Left column (primary content)**: Map + description + data types + SDG tags + keywords + citation
- **Right column (fixed sidebar)**: Key stats + Access panel + Provider card

**Rationale**: The two-column layout makes geographic coverage and access methods simultaneously visible without scrolling. This directly addresses the quick-assessment needs of all three personas. Lena needs spatial and temporal fit at a glance. Marcus needs the access panel immediately. Amara needs provider context and citation without hunting.

---

## DD-18: Access panel always visible (no accordion)

**Pain point addressed**: PP-05, PP-17
**Persona**: Marcus, Lena
**Status**: Decided

**Context**: Hub Ocean collapses the "Use Dataset" section by default. This hides the most important action — accessing the data — behind a disclosure widget.

**Decision**: The access panel is always expanded and displays all access methods:
- STAC API endpoint [Copy]
- OGC API endpoint [Copy]
- Python SDK [↗ docs]
- R SDK [↗ docs]
- Open in Workspace [↗]

**Rationale**: API access is the core value proposition of the platform. TGS, Aker BioMarine, and Aker BP use cases all describe API-based data sharing as the primary delivery mechanism. Hiding this behind an accordion contradicts the platform's stated mission of making ocean data accessible.

---

## DD-19: SDG tags derived from keywords

**Pain point addressed**: PP-18
**Persona**: Amara
**Status**: Decided

**Context**: Multiple use cases cite SDG 14 (Life Below Water) as the motivation for data sharing. The current detail page has no SDG-related tags or links.

**Decision**: Derive SDG tags from the dataset's `keywords` field. If keywords include terms such as "SDG", "SDG14", "sustainable", "life below water", or "FAIR", display matching tags:
- 🌊 SDG 14: Life Below Water
- 📊 FAIR Data Standard

Display location: below the description, above general keywords.

**Rationale**: TGS, ILIAD, and Wallenius Wilhelmsen TNFD report all explicitly cite SDG 14 alignment as a driver for data publication. Amara requires SDG-mapped data for policy reporting. Keyword derivation is a pragmatic zero-configuration approach — no new metadata field required from providers.

---

## DD-20: Provider card with trust signals

**Pain point addressed**: PP-19
**Persona**: Marcus, Amara
**Status**: Decided

**Context**: Provider names (Aker BP, TGS, GEBCO) function as trust signals, but the current detail page renders only a plain text string with no supporting context.

**Decision**: The Provider section on the detail page displays:
- Provider name (bold)
- Provider website link [↗]
- Number of datasets from this provider
- Contact link (if available in STAC metadata)

Provider logo is omitted unless a reliable logo source is available — avoid broken images.

**Rationale**: Marcus requires credibility assessment before approving data integration. Amara requires institutional context for citation in policy documents. Both needs are served by surfacing the provider's public identity, not just their name.

---

## DD-21: Related datasets section

**Pain point addressed**: PP-20
**Persona**: Lena, Marcus
**Status**: Decided

**Context**: The Aker BP CEO states: "The real value comes from combining datasets." TGS combines marine biota with oceanographic data. ILIAD's core value is data fusion. The current platform offers no cross-dataset discovery path from a detail page.

**Decision**: Display a Related Datasets section at the bottom of the detail page. Priority order:
1. Other datasets from the same provider
2. Other datasets in the same category
3. Other datasets covering the same geographic region

Limit to 6 cards maximum. Render using the same DatasetCard component as the catalog grid.

**Rationale**: Users who reach a detail page have the highest intent of any catalog interaction. Offering related datasets at this moment extends discovery and surfaces the combinatorial value that multiple use cases identify as the platform's core differentiator.

---

## DD-22: Data preview stats in right column

**Pain points addressed**: PP-01, PP-15
**Personas**: Lena, Marcus
**Context**: Hub Ocean's tabular data preview is buried at the bottom of the detail page. Users must scroll a long way to see data scale (size, columns, rows). Yet these three numbers are the key signals Lena and Marcus use to judge fit-for-purpose.
**Decision**: Add a Data preview section below the Access panel in the detail page right column:

- Size (MB / GB)
- Columns (number of fields)
- Rows (number of records)
- [Explore table ↗] (link to Hub Ocean)
- [Explore map ↗] (link to Hub Ocean)

We do not implement our own tabular preview — we link directly to the Hub Ocean original page.

**Rationale**: Data scale is a rapid-judgment signal:
- 750.9 MB + 19.7K rows → this is real data, not an empty dataset
- 87 columns → the data is rich

Users should not need to scroll to decide whether it's worth exploring further.

**Trade-offs**: The STAC API does not directly expose size/columns/rows. These must be parsed from the `description` field, or the section displays a fallback: "Available on Hub Ocean".

**2026-04-06 confirmation:**
`tabular_metadata` (containing `num_rows`, `total_byte_size`, `columns`) exists only in the Catalog API at `/api/public/catalog/v1/dataset/{uuid}`. This endpoint returns 404 and is not publicly accessible. Rows, columns, and byte size cannot be retrieved from any public API.

Detail page implementation adjusted: the Data preview panel shows "Explore the full dataset on Hub Ocean" with [Explore table ↗] and [Explore map ↗] buttons linking to the STAC `alternate` URL. The panel is conditionally displayed only when the `description` field contains size-hint keywords (rows, columns, MB, GB, records).

---

## DD-23: Distinction between Explore map and detail page map

**Pain point addressed**: PP-14
**Persona**: Lena
**Context**: Hub Ocean surfaces two maps:
1. The 3D globe at the top of the detail page — shows bbox spatial coverage
2. The Explore map (further down) — shows actual data point locations

Users do not understand the difference and assume both display the same information.

**Decision**: Our detail page implements a single map only — a flat MapLibre map showing the bbox highlight, clearly labelled "Spatial coverage". Exploration of actual data points links out to Hub Ocean's Explore map.

Below the map, add a one-line explanation:
> "Showing spatial coverage extent. Explore actual data points on Hub Ocean ↗"

**Rationale**: Avoid conflating two different kinds of geographic information. Each visual element should communicate exactly one thing clearly.

---

## DD-24: Free vs premium tier badge

**Pain point addressed:** PP-21
**Personas:** Sofia, Marcus A

**Context:**
ODP hosts both free (publicly available) and premium (contact Hub Ocean) datasets. The current catalog does not distinguish between the two. Sofia and Marcus A cannot tell whether a dataset requires payment without opening it.

**Decision:**
Add a tier badge to dataset cards and the detail page:

- **Free** — publicly available, no account required
- **Premium** — contact Hub Ocean to access

**Derivation logic (from STAC metadata):**
- `license: "other"` + `keywords` includes `"premium"` → Premium tier
- All other datasets → Free tier

**Rationale:**
Sofia should not need to click through to each dataset to discover it is gated. The tier badge surfaces this information at the card level, reducing wasted exploration time.

**Trade-offs:**
The derivation logic is heuristic — it depends on Hub Ocean consistently tagging premium datasets with the `"premium"` keyword. A fallback label ("Contact Hub Ocean") should be shown when classification is ambiguous.

**2026-04-06 supplementary finding:**
The JSON-LD endpoint (`/api/public/catalog/v1/jsonld/?uuid={uuid}`) exposes an `isAccessibleForFree` field that could serve as a secondary signal for free/premium classification. However, in current testing all datasets return `isAccessibleForFree: true`, which means the field does not yet differentiate premium datasets. The `license` field heuristic remains the primary derivation method until Hub Ocean populates `isAccessibleForFree` with accurate values for premium-gated datasets.

---

## DD-25: "3% Problem" narrative on the homepage

**Context:**
Hub Ocean's core narrative is that only 3% of publicly available ocean biodiversity data comes from industry. This is more emotionally resonant than "38 datasets" and immediately communicates the platform's mission.

**Decision:**
Replace the homepage Numbers section with three statistics:

| Number | Label |
|--------|-------|
| 3% | Of ocean biodiversity data comes from industry |
| 38 | Public datasets and growing |
| 0 | Login required |

**Rationale:**
"3%" is the number that explains *why this platform exists* in a single glance. It speaks directly to Sofia (ESG — why ocean data matters to finance) and Erik (data contributor — why sharing matters). "0 login required" addresses the access friction pain point (PP-07) at the top of the funnel.

---

## DD-26: Four persona cards on the homepage

**Persona:** Sofia (new)

**Context:**
The homepage "Who uses ODP" section currently features three persona cards (Researchers, Industry, Policy). The addition of Persona 4 (Sofia — ESG & Finance) warrants a fourth card.

**Decision:**
Expand the "Who uses ODP" section from 3 to 4 cards:

| Card | Headline | Body | CTA |
|------|----------|------|-----|
| Researchers | Ocean Scientists & Researchers | Access validated, open ocean data for climate, biodiversity, and ecosystem research. | Explore datasets → |
| Industry (User) | Industry Data Teams | Find metocean, acoustic, and environmental data to support operations and compliance. | Browse by category → |
| Policy | Policy & Conservation | Track ocean health indicators and support evidence-based environmental policy. | View collections → |
| ESG & Finance *(new)* | ESG Analysts & Finance Teams | Assess nature-related risks with TNFD-aligned ocean data. Map operations against sensitive marine habitats. | Explore nature risk data → `/catalog?category=mpa` |

---

## DD-27: Persona routing as primary navigation

**Pain points addressed:** PP-12, PP-18, PP-21, PP-22, PP-23
**Personas:** All four (Lena, Marcus 2A, Erik 2B, Sofia)

**Context:**
Hub Ocean's most fundamental IA problem is that persuasion and utility are conflated, with no differentiated entry points for different personas. After entering the catalog, 38 datasets are presented in a flat list with no task-oriented guidance.

**IA analysis basis (research/ia-analysis.md):**
The Hub Ocean marketing site's Sectors structure has no landing page — the four audience segments have no differentiated entry points. Use Cases and Sectors exist as parallel nav items rather than a hierarchical claim-to-proof relationship.

Our platform persona routing resolves at the product level what the marketing site does not: after entering the catalog, users are routed toward the right data based on their audience identity, without needing to reconstruct that identity from scratch.

This is the portfolio's strongest design argument: **we are not only improving the catalog's visual design; we are addressing the most critical break in the user's journey from marketing site to platform — the moment when a user arrives at the catalog with a clear audience identity but no corresponding entry point.**

**Decision:**
The homepage's core function is persona routing, not feature description. Four persona cards, each linking directly to a corresponding catalog filter or external resource:

| Persona card | Destination | Key message |
|---|---|---|
| Researchers | `/catalog?category=biodiversity` | FAIR data, spatial fit, temporal range |
| Industry (user) | `/catalog?category=industry` | Metocean, acoustic, ESG reporting |
| ESG & Finance | `/catalog?category=mpa` | TNFD compliance, nature-sensitive areas, CSRD reporting |
| Industry (contributor) | `https://app.hubocean.earth` (external) | Upload data, FAIR standardisation, SDG 14 commitment |

**Rationale:**
Get the right person to the right entry point within 10 seconds. This directly addresses Hub Ocean's most fundamental IA problem: critical information buried at the second and third level, with no persona routing.

**Trade-offs:**
Users must be able to self-identify their persona quickly. Card labels must be clear enough that users know which to choose. Four cards risk indecision if the labels are ambiguous — copy must be tested.

---

## DD-28: Homepage is task-oriented, not feature-oriented

**Context:**
Hub Ocean's landing page has approximately 15 sections covering feature descriptions, mission, use cases, news, and more — but lacks a design that starts from user tasks.

**Decision:**
Our homepage answers a single question: "What do you want to do here?"

Five sections, each serving that question:

| Section | Purpose |
|---|---|
| Hero | "What is this" (one sentence) |
| Numbers | "Why it matters" (3% problem) |
| Browse by category | "What data is available" |
| Persona routing | "Where should you start" |
| Footer | "This is a concept, not an official product" |

Deliberately excluded:
- How it works (users are already on the platform)
- Mission statement (belongs on a marketing page)
- Latest news (out of scope)
- Partner logos (out of scope)

**Rationale:**
Restraint is a signal of design quality. 15 sections dilute the weight of every message. 5 sections give each message enough room to breathe.

---

## Decisions Deferred to Production Scope

The following decisions are explicitly out of scope for this portfolio project:
- **Internationalization**: English only for this concept. Production would require i18n for at minimum Norwegian and English given Hub Ocean's Oslo headquarters.
- **Authentication states**: The concept shows the public, unauthenticated view. Authenticated states (private datasets, workspace access) are production scope.
- **BibTeX citation format**: APA only in this concept. BibTeX toggle is production scope.
- **Pagination / infinite scroll**: The STAC API returns all collections in one response. Pagination is production scope for when the catalog grows.
