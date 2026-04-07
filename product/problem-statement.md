# Problem Statement — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-02  
> **References**: research/user-personas.md, research/pain-points.md

---

## 1. Current Situation

The Ocean Data Platform (ODP) is a technically capable, production-grade geospatial data catalog. It exposes real ocean datasets — echosounder acoustics, marine mammal observations, offshore metocean measurements — through a STAC-compliant API and a web interface.

The current catalog UI succeeds at one thing: presenting all available metadata for a dataset. It fails at a different, more important thing: helping users decide whether a dataset is worth their time.

The information architecture of the current dataset detail page prioritizes completeness over decision-support. A user who opens a dataset page is shown:

1. A prose description (variable in quality, written for a technical audience)
2. A metadata table (license, provider)
3. A tags section (display-only)
4. A "Use Dataset" accordion (collapsed by default)
5. A spatial map (below the fold on most viewports)
6. A temporal range (in ISO timestamp format)
7. A raw tabular schema preview

This order reflects how data is stored, not how users think. Users need to answer one question first: **"Is this dataset fit for my purpose?"** The current UI makes that question hard to answer quickly.

---

## 2. The Gap

Three distinct user groups approach ODP with the same fundamental need — evaluating fitness-for-purpose — but each expresses it differently:

**Lena (Marine Researcher)** needs to determine in under 2 minutes whether a dataset covers her study area and period, uses a license compatible with journal publication, and contains the variables her analysis requires. She cannot afford to investigate datasets that fail on any of these dimensions.

**Marcus (Industry Data Manager)** needs to verify that his organization's published dataset is presenting correctly to external visitors, and that the access path (API, OGC, Vector Tiles) is immediately findable for partners. He also needs usage signals to justify continued data sharing investment internally.

**Amara (Policy Analyst)** needs to understand what a dataset represents in plain language, confirm it is from a credible source, and obtain a citable reference — all without needing to understand STAC, Darwin Core, or what an echosounder is.

**The gap**: The current UI serves none of these needs efficiently. It is optimized for users who already know what they're looking for, not users who are evaluating whether they should look further.

---

## 3. Our Thesis

A redesigned catalog experience that leads with decision-critical information — spatial coverage, temporal range, license, and provider credibility — before technical depth, will:

1. Reduce the time-to-decision for researchers evaluating dataset fit
2. Increase confidence in data citability for policy users who lack technical background
3. Surface the access path (API/SDK) as a primary action rather than a hidden accordion
4. Create a discovery flow that keeps users engaged through related datasets and keyword filtering

The redesign does not remove technical depth. It layers it: the most important facts come first, in plain language, and full technical metadata remains available for users who want it.

---

## 4. Success Metrics

These are hypothetical metrics — what we would measure if this were a production deployment:

| Metric | Baseline (estimated) | Target |
|---|---|---|
| Time-to-first-meaningful-action (API copy, download click) | ~90 seconds | < 30 seconds |
| Bounce rate on dataset detail page | ~60% | < 40% |
| % of users who expand "Use Dataset" accordion | ~25% | N/A (accordion replaced) |
| User-reported confidence in dataset citability (survey) | Unknown | Establish baseline |
| Return visit rate (same user, different datasets) | Unknown | Establish baseline |

**For this portfolio project**, success is demonstrated qualitatively: a Hub Ocean engineer reviewing this repo should be able to look at the redesigned DatasetCard and detail page and immediately identify how each design decision reduces a specific friction from `research/pain-points.md`.

---

## The Real Problem: Information Architecture

### Hub Ocean's Fundamental IA Issues

Hub Ocean's website and platform are trying to do two things simultaneously: convince new users to join, and help returning users find what they need quickly. The result is that neither is done well enough.

**Symptom 1: Critical information buried at the second and third level**

- The "3% Problem" (only 3% of ocean biodiversity data comes from industry) is the core reason Hub Ocean exists — but it is buried in the /ocean-industries-finance subpage, not on the homepage.
- TNFD / CSRD compliance features are buried three levels deep (Industries → Finance section).
- Sofia (ESG Analyst) — a primary target persona — is not addressed anywhere on the homepage.
- The premium tier exists but is never clearly explained.

**Symptom 2: No persona routing**

After entering the catalog, 38 datasets are presented in a flat list with no guidance such as "if you're an ESG analyst, start here." Every user must navigate from scratch.

**Symptom 3: Persuasion and use are conflated**

The landing page tries to persuade users to sign up, but the information architecture makes it hard for users who are ready to use the platform to find what they need:

New user:
  Homepage → sees many feature descriptions
  → cannot find a concrete answer to "what does this do for me?"
  → leaves

Returning user:
  Homepage → has to re-read marketing content
  → then navigates to catalog
  → inefficient

### Our Design Argument

**Surface critical information to the first level. Use persona routing to guide users.**

Design goal: help the right person find the right entry point within 10 seconds — rather than showing every user the same marketing content.

Our solution:

```
Homepage (first level)
↓
"Who are you?" (4 persona cards)
↓
Researchers
  → /catalog?category=biodiversity

Industry (data user)
  → /catalog?category=industry

ESG / Finance
  → /catalog?category=mpa
  + explanation of TNFD-relevant datasets

Industry (data contributor)
  → Hub Ocean data sharing page
  (out of our scope, but a clear exit point is provided)
```

This design simultaneously addresses:
- PP-12 (opaque filters)
- PP-18 (no SDG labels)
- PP-21 (no free vs premium distinction)
- PP-22 (no TNFD labels)
- New: no persona routing

---

### hubocean.earth IA Issues

Based on IA analysis (research/ia-analysis.md), the Hub Ocean marketing site has four core IA problems:

**1. External links mixed into primary navigation**
Users do not know that Platform and Datasets will navigate them away from the site. The nav items look identical to internal pages.

**2. Sectors has no landing page**
The four audience segments (Science & Research, Industries & Finance, Governance, Citizen Sea) have no dedicated entry points. High-value case studies (TGS, Aker BioMarine, ILIAD) cannot be systematically discovered through the Sectors structure.

**3. Events & Media mixes 5 content types**
The Tides of Transparency research report — one of Hub Ocean's most significant publications — is buried inside Events & Media, making it effectively undiscoverable.

**4. Use Cases and Sectors are parallel, not hierarchical**
Case study evidence (Use Cases) is separated from audience claims (Sectors), when the correct architecture would make Use Cases the proof layer inside each Sectors sub-page.

---

### Platform Dashboard Positioning

The platform's / (Dashboard) is the fulfillment of the marketing site's promise, not a repetition of marketing content.

Users arrive from the marketing site carrying a specific audience identity. The platform's persona routing (DD-27) receives them at the platform entry point and routes them toward the data most relevant to their needs — resolving the disconnect the marketing site creates when it segments audiences but fails to carry that segmentation into the platform.

This is the strongest design argument in this project: **we are not only improving the catalog's visual design; we are closing the most critical gap in the user's end-to-end journey from marketing site to platform.**
