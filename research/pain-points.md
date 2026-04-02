# Pain Points — Ocean Data Platform

> **Document status**: Draft v1.0  
> **Agent**: research-analyst  
> **Last updated**: 2026-04-02  
> **Source**: Current ODP dataset detail UI (screenshot, April 2026) + STAC API response analysis  
> **Informs**: product/problem-statement.md, product/design-decisions.md, design/style-guide.md

---

## How to Read This Document

Pain points are organized by severity. Each entry maps to at least one persona from `research/user-personas.md` and references a specific, observable UI element — not a general impression. The goal is to make every pain point actionable for design.

---

## Critical

### PP-01: Information hierarchy inverts user priority

**Persona**: All three (Lena, Marcus, Amara)  
**UI Element**: Dataset detail page — the prose description block  
**User Impact**: Users who need to assess fitness-for-purpose (geographic coverage, time range, license) must read through 4–8 sentences of technical prose before finding that information. Lena abandons datasets that may be relevant. Amara cannot assess citability without scrolling.  
**Evidence**: In the PGS Biota dataset screenshot, the Overview paragraph occupies the entire upper-left viewport before any structured metadata appears. The most decision-critical fields (spatial coverage, temporal range, license) are subordinate to the narrative description.  
**Severity**: Critical

---

### PP-02: Spatial coverage is not immediately visible

**Persona**: Lena (Researcher), Amara (Policy)  
**UI Element**: Dataset detail page — the Mapbox map in the right column  
**User Impact**: Lena's primary question on any dataset is "does this cover my study area?" The map is the correct answer — but it requires scrolling on most viewports and does not appear on the catalog card at all. A researcher scanning 10 datasets to find geographic overlap cannot do this efficiently.  
**Evidence**: The Mapbox map in the screenshot is positioned below "Use Dataset" accordions in the right column. On a 1280px viewport, the map is below the fold. The catalog card view provides zero spatial information.  
**Severity**: Critical

---

### PP-03: Temporal range is machine-readable, not human-readable

**Persona**: Lena (Researcher), Marcus (Industry)  
**UI Element**: Dataset detail page — temporal interval display  
**User Impact**: The STAC API returns timestamps as ISO 8601 strings (`2011-02-11T15:44:02Z`). If the UI displays these raw values, users must mentally parse year, month, and day before understanding the dataset's time coverage. For a researcher assessing whether data overlaps with their 2018–2022 study window, this is unnecessary friction.  
**Evidence**: STAC API confirmed response format: `"interval": [["2011-02-11T15:44:02Z", "2025-08-30T05:54:46Z"]]`. Human-readable transformation (2011 – 2025, 14 years) is not applied in current catalog.  
**Severity**: Critical

---

## High

### PP-04: License string is opaque

**Persona**: Lena (Researcher), Amara (Policy)  
**UI Element**: Dataset detail page — Metadata section, License field  
**User Impact**: Lena needs to know if she can cite and redistribute derived results in a journal. Amara needs to know if she can quote this data in a government briefing. The raw string `odc-by-1.0` or `CC-BY-NC-4.0` answers neither question without external research. A researcher who cannot quickly confirm citability will move on to a dataset they understand.  
**Evidence**: Screenshot shows `License: CC-BY-NC 4.0` with a small info icon — no plain-language explanation of what this means for publication or policy use.  
**Severity**: High

---

### PP-05: "Use Dataset" section is collapsed by default

**Persona**: Marcus (Industry), Lena (Researcher)  
**UI Element**: Dataset detail page — the "Use Dataset" accordion (API / OGC Features / Vector Tiles)  
**User Impact**: For Marcus, the API endpoint is the most important thing on the page — it determines whether he can point partners to this dataset programmatically. For Lena, the API access path determines whether she can pull data into her Jupyter notebook. Both users must discover that this section exists and expand it manually. This is the primary action the platform exists to enable, yet it requires more effort than reading the description.  
**Evidence**: Screenshot shows three collapsed accordion items (API, OGC Features, Vector Tiles) with no visible content until expanded. No visual emphasis differentiates this section from Tags or Metadata.  
**Severity**: High

---

### PP-06: Tabular data preview shows raw schema, not human context

**Persona**: Amara (Policy), Lena (Researcher)  
**UI Element**: Dataset detail page — "Tabular data" section  
**User Impact**: Column names like `verbatimIdentification`, `occurrenceID`, `basisOfRecord` mean nothing to Amara and require domain knowledge even for Lena outside her specialty. The preview communicates "there is data here" but not "here is what this data tells you." A policy analyst looking at this table cannot determine whether the data supports their argument.  
**Evidence**: Screenshot shows raw Darwin Core column headers (`occurrenceID`, `verbatimIdentification`, `scientificName`, `scientificNameID`, `lifeStage`, `individualCount`, `basisOfRecord`) with no explanation of what each field represents or why it matters.  
**Severity**: High

---

### PP-07: No publisher perspective for data contributors

**Persona**: Marcus (Industry)  
**UI Element**: Dataset detail page — entire page  
**User Impact**: Marcus cannot verify how his published dataset appears to an external visitor. There is no "preview as visitor" mode. He cannot see usage metrics (download count, access frequency) that would justify continued data sharing investment to his management. The platform treats publishers and consumers identically, missing a critical feedback loop.  
**Evidence**: STAC API and current ODP UI provide no publisher-specific view, usage statistics, or quality indicators visible to the dataset owner.  
**Severity**: High

---

### PP-08: Tags are not interactive on the detail page

**Persona**: Lena (Researcher), Amara (Policy)  
**UI Element**: Dataset detail page — Tags section  
**User Impact**: Tags like "krill", "Southern Ocean", "acoustic" are natural discovery vectors — clicking them should filter the catalog to related datasets. If they are display-only, they create the expectation of interactivity without delivering it, and miss the opportunity to keep users engaged in discovery.  
**Evidence**: Screenshot shows keyword pills (turtles, acoustic, data sharing, mammals, brazil, observations, industry, darwin core, visual, pgs, whales, biota, industrial data) with no visual affordance indicating they are clickable.  
**Severity**: High

---

## Medium

### PP-09: Provider credibility is not surfaced

**Persona**: Amara (Policy), Lena (Researcher)  
**UI Element**: Dataset detail page — Metadata section, Provider field  
**User Impact**: Amara needs to cite the source in a policy document and confirm it is credible. "PGS" or "Aker BioMarine" are names she may not recognize. Without a brief description of who the provider is and why their data is trustworthy, she cannot make a confident citation decision. Trust signals are a primary conversion factor for non-profit data platforms.  
**Evidence**: Screenshot shows `Provider: PGS` as a plain text field with no link, description, or institutional context.  
**Severity**: Medium

---

### PP-10: Beta labels undermine confidence in exploration tools

**Persona**: Amara (Policy), Lena (Researcher)  
**UI Element**: Dataset detail page — "Explore table (Beta)" and "Explore map (Beta)" buttons  
**User Impact**: For Amara, who is already uncertain whether this platform is reliable enough to cite, a "Beta" label on the primary exploration tools signals instability. She will not use a beta tool in a document going to government decision-makers. For Lena, it raises questions about data integrity in the exploration view.  
**Evidence**: Screenshot shows `Explore table` and `Explore map` with explicit "(Beta)" labels in the Tabular data section.  
**Severity**: Medium

---

### PP-11: No "similar datasets" or contextual discovery

**Persona**: Lena (Researcher), Marcus (Industry)  
**UI Element**: Dataset detail page — entire page  
**User Impact**: A researcher who determines a dataset doesn't quite fit their needs has no path forward except returning to the catalog and starting over. "Related datasets from the same region" or "other Aker BioMarine datasets" would keep users in a productive discovery flow.  
**Evidence**: No related content, recommendation, or collection-level navigation appears on the detail page.  
**Severity**: Medium

---

## Cross-Cutting Insight

All 11 pain points trace back to a single root cause:

> **The current ODP UI is designed for users who already know what they're looking for and understand the domain vocabulary. It does not serve users who are evaluating fitness-for-purpose.**

This is the design thesis the redesign must address. The solution is not to remove technical depth — Lena needs it. The solution is to **layer information**: lead with the most decision-critical facts in plain language, and reveal technical depth progressively for users who want it.

This principle maps directly to Hub Ocean's JD requirement: *"reduce complexity in data-heavy workflows through clear interface design."*
