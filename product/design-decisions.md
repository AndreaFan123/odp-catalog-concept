# Design Decisions — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-02  
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

## Decisions Deferred to Production Scope

The following decisions are explicitly out of scope for this portfolio project:

- **Dark/light mode toggle**: The design uses dark mode throughout. A production system would implement mode switching via `[data-theme]` attribute and semantic token overrides.
- **Internationalization**: English only for this concept. Production would require i18n for at minimum Norwegian and English given Hub Ocean's Oslo headquarters.
- **Authentication states**: The concept shows the public, unauthenticated view. Authenticated states (private datasets, workspace access) are production scope.
- **BibTeX citation format**: APA only in this concept. BibTeX toggle is production scope.
- **Pagination / infinite scroll**: The STAC API returns all collections in one response. Pagination is production scope for when the catalog grows.
