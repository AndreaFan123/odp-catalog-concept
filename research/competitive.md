# Competitive Analysis — Ocean Data Platform

> **Document status**: Draft v1.0  
> **Agent**: research-analyst  
> **Last updated**: 2026-04-02  
> **Informs**: product/design-decisions.md, design/wireframes/

---

## Scope

Five platforms that share ODP's core mission: making scientific or environmental data discoverable and accessible. Each is analyzed for one thing done well, one ODP opportunity, and one specific UI pattern worth referencing.

---

## 1. GBIF — Global Biodiversity Information Facility

**What it is**: Global open-access repository for species occurrence data. 2.7 billion occurrence records. Primary audience: biodiversity researchers, conservationists.

**What they do better than ODP**:  
Dataset cards immediately show occurrence count, taxonomic group icons, and a small map thumbnail — answering "what, how many, and where" in under 3 seconds without any click. The card-level information density is exceptionally well-calibrated for researcher needs.

**ODP opportunity**:  
GBIF serves a narrower, more homogeneous audience (biodiversity researchers). ODP serves researchers, industry, and policy — three audiences with fundamentally different information needs. ODP has the opportunity to design for audience diversity in a way GBIF has never needed to.

**UI pattern to reference**:  
GBIF's dataset card layout: small map thumbnail (left, ~80×60px), title, occurrence count in large type, taxonomic breadcrumb, and a single "Explore" CTA. Every element earns its space. Apply this economy of information to the ODP DatasetCard component.

---

## 2. OBIS — Ocean Biodiversity Information System

**What it is**: Global repository for marine species distribution data. Built on Darwin Core standard. Often feeds into GBIF.

**What they do better than ODP**:  
OBIS dataset pages include a "Data quality" section that explicitly lists what's present, what's missing, and what's flagged as uncertain — before showing the data itself. This directly addresses the researcher concern: "can I trust this data for my use case?" It turns data provenance from a footnote into a feature.

**ODP opportunity**:  
ODP's STAC metadata includes license, provider, and temporal/spatial extent — all quality-relevant signals. ODP does not currently surface these as a coherent "fitness-for-purpose" assessment. A consolidated quality/trust panel on the detail page would differentiate ODP significantly.

**UI pattern to reference**:  
OBIS's "Quality flags" section: a compact grid of green/amber/red indicators with short labels ("Coordinates valid", "Date valid", "Taxonomy matched"). Consider a simplified version for ODP: "Spatial coverage: confirmed", "Temporal range: complete", "License: commercially usable".

---

## 3. Copernicus Marine Service (CMEMS)

**What it is**: EU's marine data service providing satellite and model oceanographic data. Highly technical, primarily serves operational oceanography and climate research.

**What they do better than ODP**:  
Copernicus has a dedicated "Product User Manual" for each dataset — a human-written document explaining what the data represents, how it was produced, known limitations, and example use cases. It transforms a technical dataset into a usable scientific resource. Researchers cite Copernicus data with confidence because the documentation removes ambiguity.

**ODP opportunity**:  
ODP's dataset descriptions are provider-supplied and variable in quality — some are detailed, some are minimal. ODP could introduce a lightweight structured description template that prompts providers to answer key user questions: "What does this data measure?", "What are the known limitations?", "Who has used this data?" This would dramatically improve Amara's ability to assess citability.

**UI pattern to reference**:  
Copernicus's variable/parameter list: each measured variable is listed with its standard name, unit, and a one-sentence plain-language description. For ODP's tabular data preview, apply this pattern to column headers — show the column name plus a brief description of what it means.

---

## 4. Pangaea — Publisher for Earth & Environmental Science

**What it is**: German data repository specializing in earth and environmental science datasets. Strong in oceanography, geology, atmospheric science.

**What they do better than ODP**:  
Pangaea's citation block is the most prominent element on every dataset page — above the fold, styled as a blockquote, formatted exactly as it would appear in a reference list. Researchers can copy the citation in one click. This solves Lena's and Amara's core need: "I want to use this data, how do I cite it?"

**ODP opportunity**:  
ODP currently has no citation helper. Given that Hub Ocean's mission includes enabling research and policy use of ocean data, making data citable should be a first-class feature. A formatted citation block with a copy button on the detail page would directly serve both Lena and Amara.

**UI pattern to reference**:  
Pangaea's one-click citation block: a formatted citation string (APA/BibTeX toggle), a copy button, and a DOI badge. Implement this as a `CitationBlock` component on the ODP detail page. The STAC API already provides all necessary fields (title, provider, date, license, id).

---

## 5. BCO-DMO — Biological and Chemical Oceanography Data Management Office

**What it is**: US-based repository specifically for biological and chemical oceanographic data from NSF-funded research. Highly specialized, deep curation.

**What they do better than ODP**:  
BCO-DMO shows a "Related datasets" panel on every dataset page, surfacing other datasets from the same project, cruise, or principal investigator. This keeps researchers in a productive discovery flow — finding one relevant dataset often leads to three more.

**ODP opportunity**:  
ODP has collection-level organization in its STAC structure (collections contain items). The `links` field in the STAC response already includes a `rel: "items"` link. ODP could use this to surface "Other datasets in this collection" or "From the same provider" on the detail page, without requiring any additional API infrastructure.

**UI pattern to reference**:  
BCO-DMO's related datasets sidebar: a compact list of 3–5 related dataset titles with their temporal range and a "View" link. Implement as a `RelatedDatasets` component using the provider name from the current collection to filter the catalog.

---

## Summary: Design Opportunities

| Opportunity | Source | Component to Build |
|---|---|---|
| Card-level spatial thumbnail | GBIF | `SpatialThumbnail` in `DatasetCard` |
| Trust / quality signal panel | OBIS | `QualityPanel` on detail page |
| Column-level plain-language descriptions | Copernicus | Enhanced `TabularPreview` |
| One-click citation block | Pangaea | `CitationBlock` on detail page |
| Related datasets discovery | BCO-DMO | `RelatedDatasets` sidebar |

These five components, combined with the information hierarchy fix from `pain-points.md PP-01`, form the core of the redesign's value proposition.
