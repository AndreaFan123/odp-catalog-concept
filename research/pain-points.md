# Pain Points — Ocean Data Platform

> **Document status**: Draft v1.1
> **Agent**: research-analyst
> **Last updated**: 2026-04-05
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

### PP-12: Filter tool interaction and semantics are unclear

**Persona**: All three personas (Lena, Marcus, Amara)
**UI Element**: Catalog page — left-side filter sidebar (interactive globe map, Date Range inputs)
**User Impact**: Users default to keyword search only because the globe map looks like a decorative element rather than an interactive tool, and the purpose of the date inputs is ambiguous (does this filter by data time range or publication date?). Most users never discover that location and time filters exist unless they actively investigate — meaning their search results are always the full unfiltered list without geographic or temporal constraints applied.
**Evidence**: The existing ODP catalog UI screenshot (2026-04-03) shows: the globe map has no cursor hint, no usage instructions, and no visual affordance; the Date Range shows only blank yyyy/mm/dd input fields with no indication that this filters the dataset time range.
**Root cause**: Progressive disclosure is incompletely implemented — the functionality exists but is invisible to users, with no cues indicating "there are more filtering tools here."
**Severity**: High

---

### PP-13: Citation implementation is inconsistent

**Persona**: Lena (Researcher), Amara (Policy), Sofia (ESG)
**UI Element**: Dataset detail page — Citation block
**User Impact**: The citation block is present on some datasets (e.g., the North Pacific whale distribution dataset) but completely absent on others. Format and placement are also inconsistent — users cannot predict where to find citation information and must search for it each time. For Amara and Sofia, the absence of a citation is equivalent to the dataset being unusable — they will not manually assemble a citation format themselves.
**Evidence**: Screenshot comparison shows the North Pacific dataset has a Citation block (with a DOI link), but the PGS biota dataset screenshot has none. The two instances also differ in placement and format.
**Root cause**: Citation is likely an optional field supplied by the provider, rather than a structured field the platform enforces.
**Severity**: High

---

### PP-14: Map displays vessel tracklines instead of coverage extent

**Persona**: Lena (Researcher), Amara (Policy)
**UI Element**: Dataset detail page — right-column Mapbox map
**User Impact**: The North Pacific whale distribution dataset map shows a vessel route running from Asia to the Americas rather than the actual geographic coverage of the data. Users cannot determine from the map "which specific part of the North Pacific does this data cover?" Lena needs to confirm whether the data includes her study region (e.g., a specific latitude range), but the map cannot answer that question. This problem is more fundamental than the map being "below the fold" — even when the map is visible, it is displaying the wrong information.
**Evidence**: The screenshot shows a thin line on the Mapbox map extending from East Asia to South America. This is a vessel trackline, not a bbox coverage extent.
**Root cause**: The map likely renders raw geometry data (point locations or tracklines) directly, rather than computing and visualizing coverage from the STAC extent.spatial.bbox field.
**Severity**: Critical — displaying incorrect information is more dangerous than displaying no information

---

### PP-15: Technical field name abbreviations have no plain-language descriptions

**Persona**: Amara (Policy), Sofia (ESG)
**UI Element**: Dataset detail page — Tabular data field preview
**User Impact**: The North Pacific dataset's field names include `sst_sd`, `bathy`, `sla`, `bathy_sd`, and `PPupper200m`. These scientific abbreviations are completely opaque to users without an oceanography background. Even Lena, if she is outside this specific sub-discipline, would need to look up that `sla` means sea level anomaly. Amara and Sofia will abandon the dataset immediately upon seeing this table, even if it fully meets their needs.
**Evidence**: The screenshot shows field names `geometry`, `longitude`, `sst_sd`, `bathy`, `sla`, `bathy_sd`, `PPupper200m`, and `sst` with no explanatory text alongside them.
**Root cause**: Field names come directly from the raw data schema. The platform provides no mechanism for providers to add human-readable descriptions, and no feature to automatically map fields to descriptions from standard vocabularies (such as CF Conventions).
**Severity**: High

---

---

### PP-17: Access methods hidden inside accordion

**Persona**: Marcus, Lena
**Severity**: High
**Context**: Hub Ocean's "Use Dataset" section defaults to collapsed. Users must actively expand it to see API endpoints and SDK information.
**Impact**: The most important action on the detail page — accessing the data — is hidden behind an interaction that requires users to know it exists. Users who don't expand the accordion may conclude the platform lacks API access entirely.
**Evidence**: The Aker BP use case positions API access as a core value proposition: "explore and combine with other datasets." Hiding the access entry point directly undermines this value claim.

---

### PP-18: No SDG tags on dataset pages

**Persona**: Amara
**Severity**: High
**Context**: Multiple use cases explicitly reference SDG 14 (Life Below Water) as the motivation and framework for data sharing. The dataset detail page has no SDG-related tags or links.
**Impact**: Amara cannot filter or identify datasets that support specific SDG targets. She must read full dataset descriptions and infer SDG relevance manually — a high-friction process incompatible with policy workflow timelines.
**Evidence**: TGS, ILIAD, and Wallenius Wilhelmsen TNFD report all cite SDG 14 alignment. None of this is surfaced on the current detail page.

---

### PP-19: Provider credibility information insufficient

**Persona**: Marcus, Amara
**Severity**: Medium
**Context**: Provider names like Aker BP, TGS, and GEBCO are themselves trust signals. However, the detail page displays only a plain text name with no background information, website link, or contact details.
**Impact**: Users cannot quickly assess the authority or credibility of a data source. Marcus needs this to justify data integration decisions internally. Amara needs institutional context to cite the source appropriately in policy documents.
**Evidence**: The Aker BP press release and TGS use case both rely on institutional reputation as a credibility signal. The platform does not surface this signal.

---

### PP-20: No cross-dataset discovery path

**Persona**: Lena, Marcus
**Severity**: High
**Context**: The Aker BP CEO states: "The real value comes from combining datasets." TGS combines marine biota with oceanographic data. ILIAD's core value proposition is data fusion. Yet the detail page offers no "related datasets" or "common combinations" entry point.
**Impact**: After finding one dataset, users have no path to discover complementary data. This breaks the discovery flow at the moment of highest intent — when a user has already identified a relevant dataset and is most likely to want more.
**Evidence**: All four major use cases (TGS, Aker BioMarine, Aker BP, ILIAD) describe multi-dataset workflows as the primary mode of value creation.

---

### PP-21: No distinction between free tier and premium tier

**Personas:** Sofia, Marcus 2A
**Severity:** High

**Context:**
ODP hosts both publicly available free datasets and paid premium data products (e.g. Ocean Sensitive Areas). The current catalog does not clearly indicate which datasets are premium.

**User impact:**
Users do not know that some data requires payment, or incorrectly assume all datasets are free. Sofia may invest time exploring a dataset only to discover it is gated.

**Evidence:**
Ocean Sensitive Areas is explicitly a premium tier product, but its presentation in the catalog is indistinguishable from free datasets.

**Root cause:**
License field and keywords are not surfaced as a tier indicator in the catalog UI.

---

### PP-22: No TNFD / CSRD regulatory tags or filters

**Persona:** Sofia
**Severity:** High

**Context:**
Financial institutions and industry companies need data that supports TNFD and CSRD compliance. The catalog has no regulatory framework labels or filters.

**User impact:**
Sofia cannot quickly find "TNFD-aligned ocean sensitive area data". She must open each dataset individually to determine relevance, which is not scalable for an ESG reporting workflow.

**Root cause:**
STAC metadata does not natively include regulatory compliance tags; no mapping from existing keywords to compliance frameworks has been implemented.

---

### PP-23: No data contribution pathway in the catalog

**Persona:** Erik
**Severity:** Medium

**Context:**
Erik wants to contribute company-collected data, but the catalog only presents existing datasets. There is no clear "How to share your data" entry point visible to contributors.

**User impact:**
Potential data contributors cannot find the contribution path. The platform misses an opportunity to grow its dataset collection through industry partnerships.

**Root cause:**
The catalog is designed around consumption, not contribution. Contributor onboarding exists elsewhere on hubocean.earth but is not linked from the catalog.

---

## Cross-Cutting Insight

All 22 pain points trace back to a single root cause:

> **The current ODP UI is designed for users who already know what they're looking for and understand the domain vocabulary. It does not serve users who are evaluating fitness-for-purpose.**

This is the design thesis the redesign must address. The solution is not to remove technical depth — Lena needs it. The solution is to **layer information**: lead with the most decision-critical facts in plain language, and reveal technical depth progressively for users who want it.

This principle maps directly to Hub Ocean's JD requirement: *"reduce complexity in data-heavy workflows through clear interface design."*

**2026-04-03 update**: Live testing of the ODP platform revealed three additional issues (PP-13, PP-14, PP-15). **2026-04-05 update**: Three further pain points added (PP-21, PP-22, PP-23) following the addition of Persona 4 (Sofia Chen) and Persona 2B (Erik Hansen) to the user research. PP-14 is particularly significant — a map displaying incorrect information (a trackline instead of coverage extent) is more dangerous than displaying no information, because it can cause users to make incorrect judgments about dataset applicability. This reinforces the decision to use the STAC bbox rather than raw geometry in the SpatialThumbnail and OceanMap component designs (see design-decisions.md DD-02).
