# Wireframe — Dataset Detail Page

> **Agent**: ui-designer  
> **Last updated**: 2026-04-02  
> **User story**: As Lena (researcher), I want to open a dataset and answer "is this fit for my purpose?" within 30 seconds — without scrolling or expanding accordions.

---

## Page Purpose

The detail page must answer five fitness-for-purpose questions above the fold, then provide full technical depth below for users who need it. The information architecture flows from decision-critical → exploratory → technical.

---

## Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ← Back to catalog                                            │
│                                                              │
│ HERO SECTION                                                 │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │                                                          │ │
│ │  [Provider name]  ·  [License Badge]  ·  [Keywords x3]  │ │
│ │                                                          │ │
│ │  Dataset Title                                           │ │
│ │  (DM Serif Display, text-4xl, text-primary)              │ │
│ │                                                          │ │
│ │  ┌──────────────────────┐  ┌────────────────────────┐   │ │
│ │  │ SPATIAL              │  │ TEMPORAL               │   │ │
│ │  │ [Map 320×200px]      │  │ [Timeline bar]         │   │ │
│ │  │ Southern Ocean       │  │ 2011 – 2025            │   │ │
│ │  │ (region label, mono) │  │ 14 years of coverage   │   │ │
│ │  └──────────────────────┘  └────────────────────────┘   │ │
│ │                                                          │ │
│ │  [500K+ files]  ·  [ODC-By 1.0]  ·  [Open for citation] │ │
│ │  (mono, text-sm, secondary)                              │ │
│ │                                                          │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
├───────────────────────────┬──────────────────────────────────┤
│ LEFT COLUMN (60%)         │ RIGHT COLUMN (40%)               │
│                           │                                  │
│ ACCESS PANEL              │ CITATION BLOCK                   │
│ ┌─────────────────────┐   │ ┌──────────────────────────────┐ │
│ │ API                 │   │ │ Cite this dataset             │ │
│ │ [endpoint URL] [📋] │   │ │                              │ │
│ │                     │   │ │ [APA formatted citation       │ │
│ │ OGC Features        │   │ │  block, mono font]           │ │
│ │ [endpoint URL] [📋] │   │ │                              │ │
│ │                     │   │ │ [Copy citation]              │ │
│ │ Vector Tiles        │   │ └──────────────────────────────┘ │
│ │ [endpoint URL] [📋] │   │                                  │
│ └─────────────────────┘   │ PROVIDER                         │
│                           │ ┌──────────────────────────────┐ │
│ ABOUT THIS DATASET        │ │ Aker BioMarine               │ │
│ ┌─────────────────────┐   │ │ [Brief description]          │ │
│ │ [Prose description  │   │ │ [Visit website →]            │ │
│ │  — collapsible if   │   │ └──────────────────────────────┘ │
│ │  over 300 chars]    │   │                                  │
│ └─────────────────────┘   │ ALL KEYWORDS                     │
│                           │ ┌──────────────────────────────┐ │
│ TABULAR DATA PREVIEW      │ │ [keyword] [keyword]          │ │
│ ┌─────────────────────┐   │ │ [keyword] [keyword]          │ │
│ │ Size · Columns · Rows│  │ │ (all keywords, interactive)  │ │
│ │                     │   │ └──────────────────────────────┘ │
│ │ [Column name]       │   │                                  │
│ │ Plain description   │   │                                  │
│ │ [Column name]       │   │                                  │
│ │ Plain description   │   │                                  │
│ └─────────────────────┘   │                                  │
│                           │                                  │
└───────────────────────────┴──────────────────────────────────┘
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

---

## Hero Section — Information Priority

The hero answers all 5 fitness-for-purpose questions before the user scrolls:

| Question | Element | Design detail |
|---|---|---|
| What? | Title (DM Serif Display, 4xl) | Largest element on the page |
| Where? | Spatial map (320×200px) | Interactive MapLibre map with bbox highlighted |
| When? | Timeline bar + year range | "2011 – 2025 · 14 years of coverage" |
| How much? | Record/file count | "500K+ files" in mono below timeline |
| Can I use it? | License badge + description | "Open for citation · CC BY compatible" |

---

## Access Panel

Three access methods presented simultaneously — no accordion, no collapsing:

```
ACCESS THIS DATASET
─────────────────────────────────────────────
API Endpoint
https://api.hubocean.earth/data/7c61c869-...  [📋 Copy]

OGC Features
https://api.hubocean.earth/api/features/...   [📋 Copy]

Vector Tiles
https://api.hubocean.earth/api/tiles/...      [📋 Copy]
─────────────────────────────────────────────
```

Copy button copies the URL to clipboard, shows "Copied!" for 2 seconds, then resets. (DD-05 fix)

---

## Citation Block

```
CITE THIS DATASET
─────────────────────────────────────────────
Aker BioMarine. (2011–2025). Aker BioMarine
EK60, EK80 Echosounder data [Dataset]. Hub
Ocean Ocean Data Platform.
https://app.hubocean.earth/catalog/collection/7c61c869-...

[📋 Copy APA citation]
─────────────────────────────────────────────
```

APA format using: `providers[0].name`, `temporal range`, `title`, `links[rel=alternate].href`

---

## Tabular Data Preview

Replace raw column names with human context:

```
TABULAR DATA PREVIEW          350 KB · 19 columns · 2,200 rows
──────────────────────────────────────────────────────────────
Column               What it contains
────────────────────────────────────────
occurrenceID         Unique ID for each observation record
verbatimIdentification  Species name as originally recorded
scientificName       Standardized species name (Darwin Core)
lifeStage            Life stage: adult (1,606) / juvenile (137)
individualCount      Number of animals observed (1–700)
basisOfRecord        How observed: HumanObservation / MachineObservation
──────────────────────────────────────────────────────────────
[Explore full table →]    [Export to CSV / JSON]
```

Column descriptions are maintained as a lookup table in `lib/format.ts`, seeded with Darwin Core standard field descriptions.

---

## Loading State

Hero section: skeleton blocks matching the layout shape  
Map: grey placeholder box with "Loading map..." text  
Access panel: three skeleton URL bars  
Citation: two skeleton text lines  

Transition: fade in (opacity 0→1, 300ms) when data resolves

---

## Error State

If collection fetch fails:
```
This dataset could not be loaded.

It may have been removed from the catalog or the API is
temporarily unavailable.

[← Back to catalog]  [Try again]
```

---

## Open Questions for product-strategist

1. Should the map be interactive (pan/zoom) or static on the detail page?
2. Should "About this dataset" be collapsible at a character threshold, or always expanded?
3. Is there a meaningful "Related datasets" section for the portfolio scope, given we only have ~2 collections from the public STAC API?
