# Hub Ocean IA Analysis

> **Document status**: Draft v1.0
> **Agent**: research-analyst
> **Date**: 2026-04-06
> **References**: research/user-personas.md, product/problem-statement.md

---

## As-Is IA

The current information architecture of hubocean.earth:

```
hubocean.earth
├── Platform ↗ (external — app.hubocean.earth)
├── Datasets ↗ (external — app.hubocean.earth/catalog)
├── Use Cases
├── Sectors (❌ no landing page)
│   ├── Science & Research
│   ├── Industries & Finance
│   ├── Governance
│   └── Citizen Sea
├── Events & Media /learn (❌ 5 content types mixed)
│   ├── Events Calendar
│   ├── Action Day (one-time event)
│   ├── Tides of Transparency (research report)
│   ├── News /press/news
│   └── Annual Report 2024
├── About
└── Contact
```

---

## As-Is Problem Nodes

### Problem 1: External links mixed into primary navigation

Platform and Datasets are external links (jumping to app.hubocean.earth) but are visually indistinguishable from internal nav items. Users do not know they are about to leave the site when they click.

**Impact**: Broken user experience, reduced trust. Users expecting to stay on hubocean.earth are unexpectedly navigated to the app subdomain with no visual warning.

---

### Problem 2: Sectors has no landing page

Sectors is a dropdown with no landing page. Clicking the top-level "Sectors" item goes nowhere — it is only a container. None of the four audience groups (Science & Research, Industries & Finance, Governance, Citizen Sea) has a dedicated entry point.

**Impact**: Institutional partners with strong case studies — TGS, Aker BioMarine, ILIAD — cannot be systematically discovered through the Sectors structure. Sofia (ESG Finance analyst) and Lena (researcher) have no differentiated entry point.

---

### Problem 3: Events & Media mixes 5 content types

Events Calendar, Action Day (a one-time event), Tides of Transparency (a major research report), News, and Annual Report 2024 are all placed under the same nav item despite being fundamentally different content types.

**Impact**: Tides of Transparency is one of Hub Ocean's most significant research reports, but it is buried inside Events & Media where no one would look for it. High-value research content is effectively undiscoverable.

---

### Problem 4: Use Cases and Sectors are parallel, not hierarchical

Use Cases is an independent top-level nav item, parallel to Sectors. But Use Cases content (TGS, Aker BioMarine, ILIAD) is the concrete evidence that should support each Sectors page — not an independent category.

**Impact**: A user on the Industries & Finance page reads audience descriptions but has no path to the specific case studies that prove Hub Ocean's value to that segment. Proof is separated from claim.

---

## To-Be IA

Proposed improved information architecture:

```
hubocean.earth
├── [utility bar] Platform ↗ · Datasets ↗
│   (visually separate from primary nav)
├── Use Cases
├── Solutions (new landing page added)
│   ├── Science & Research
│   ├── Industries & Finance
│   ├── Governance
│   └── Citizen Sea
├── Resources (new landing page added)
│   ├── News & Press
│   ├── Events & Webinars
│   ├── Reports & Research
│   │   └── Tides of Transparency
│   └── Docs & Tutorials
├── About
└── Contact
```

---

## To-Be Improvement Rationale

### Improvement 1: External links moved to utility bar

Platform ↗ and Datasets ↗ are visually distinct — placed in a utility bar above or below the primary nav. Users can clearly see these will navigate to the app subdomain.

**Effect**: Eliminates unintentional navigation away from the marketing site. Reduces trust friction for first-time visitors.

---

### Improvement 2: Sectors renamed to Solutions with landing page

All four audience segments — Science & Research, Industries & Finance, Governance, Citizen Sea — now have a unified Solutions landing page as their entry point.

**Effect**: Sofia (ESG Finance) can navigate Solutions → Industries & Finance and find TNFD-relevant content, case studies, and data references without scanning 15 undifferentiated sections. Lena (researcher) has a clear entry for academic and scientific datasets.

---

### Improvement 3: Resources consolidates all content types

News & Press, Events & Webinars, Reports & Research, and Docs & Tutorials follow clear classification logic. Tides of Transparency is correctly placed under Reports & Research.

**Effect**: High-value research reports have a discoverable home. Users seeking documentation or research findings can navigate directly without guessing.

---

## Unresolved Gap

### The Use Cases / Solutions relationship remains unclear

In the To-Be IA, Use Cases remains a top-level nav item, parallel to Solutions. The ideal architecture is:

```
Solutions (audience routing entry)
  ↓ each sector page, at bottom
  → "See how others use it"
  → Use Cases (concrete case evidence)
```

Use Cases should be the proof layer for Solutions, not an independent nav category.

**Recommendation**: Remove Use Cases from primary nav. Integrate as secondary navigation at the bottom of each Solutions sub-page (Science & Research, Industries & Finance, etc.). This resolves the claim-to-proof gap identified in Problem 4.

---

## Implications for Platform Redesign

### Marketing and platform are two separate problems

hubocean.earth (marketing) and app.hubocean.earth (platform) are architecturally separate. This project focuses on the platform's catalog experience. However, this IA analysis clarifies the mental model users arrive with: what they expect when they enter the platform, and from which audience segment they are coming.

### Platform Dashboard should fulfill marketing's promise

If a user enters from Solutions → Industries & Finance, they arrive expecting TNFD and ESG-relevant data.

If a user enters from Solutions → Science & Research, they arrive expecting FAIR-compliant scientific datasets.

Our persona routing design decision (DD-27) addresses this at the platform level: after entering the catalog, users are not left to guess where to start. The platform's homepage delivers on the audience promise made by the marketing site.

### The platform homepage's positioning

The platform's / (Dashboard) is not a second marketing page. It is the fulfillment of the marketing promise:

> Marketing promises: "This platform has the data you need."
> Platform delivers: "Welcome. Based on your needs, start here."

This confirms our design decision: the platform homepage is built around persona routing, not marketing content repetition.

---

## Portfolio Design Argument

This IA analysis establishes the strongest single argument in this portfolio project:

**We are not just improving the catalog's visual design. We are addressing the most critical break in the user's journey from marketing site to platform — the moment when a user arrives at the catalog with a clear audience identity but no corresponding entry point.**

Hub Ocean's marketing site creates four audience segments (Sectors) but fails to route them into the platform. Our platform homepage resolves this at the product level: persona routing receives users where the marketing site leaves them.

This is traceable, testable, and grounded in real IA evidence.

---

## Catalog API Diagnostic (2026-04-06)

**Method**: Live API testing against the Hub Ocean public endpoints.

### Endpoints Tested

| Endpoint | Status | Notes |
|---|---|---|
| `GET /api/stac/collections` | ✅ 200 | 38 collections returned |
| `GET /api/stac/collections/{uuid}` | ✅ 200 | Full STAC collection metadata |
| `GET /api/stac/collections/{uuid}/items` | ✅ 200 | All 38 collections have `items` rel |
| `GET /api/public/catalog/v1/dataset/{uuid}` | ❌ 404 | Not publicly accessible |
| `GET /api/public/catalog/v1/jsonld/?uuid={uuid}` | ✅ 200 | Limited fields |

### JSON-LD Available Fields

```
@context, @type, @id, name, description, url,
version, keywords, isAccessibleForFree
```

### JSON-LD Unavailable

- `isPartOf` → `undefined` — parent collection relationship not exposed

### STAC Link Types (all 38 collections)

All collections have exactly these non-navigation rels: `items`, `alternate`

No collection has: `child`, `collection`, `derived_from`, `related`, or any other relationship rel.

### Conclusions

Hub Ocean's Catalog API is not publicly accessible. Only the STAC API and JSON-LD endpoint are available without authentication. The JSON-LD endpoint provides largely overlapping information with STAC, with `isAccessibleForFree` as the sole additional field — though in current testing all 38 datasets return `true`, so the field does not yet differentiate premium datasets.

### Public API Capability Summary

| Feature | Available | Endpoint |
|---|---|---|
| Collection metadata | ✅ | STAC `/collections` |
| Items endpoint | ✅ | STAC `/collections/{id}/items` |
| Hub Ocean catalog link | ✅ | STAC `alternate` rel |
| Part of Collection | ❌ | No endpoint provides this |
| Tabular metadata (rows/columns/bytes) | ❌ | Catalog API not public |
| isAccessibleForFree | ✅ | JSON-LD (all `true` currently) |
