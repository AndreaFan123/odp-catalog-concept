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
