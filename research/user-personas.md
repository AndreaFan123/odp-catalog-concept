# User Personas — Ocean Data Platform

> **Document status**: Draft v1.0  
> **Agent**: research-analyst  
> **Last updated**: 2026-04-02  
> **Informs**: pain-points.md, design-decisions.md, positioning.md

---

## How These Personas Were Developed

These personas are grounded in three sources:
1. Hub Ocean's own language in their Frontend Engineer and Marketing Manager JDs — which explicitly name researchers, industry partners, and policy actors as target users
2. The public STAC API response, which reveals what data actually exists on the platform and who is likely producing and consuming it
3. The current ODP dataset detail UI (screenshot, April 2026), which shows what friction real users encounter today

These are informed hypotheses, not ethnographic research. They should be validated with real user interviews if this project moves to production.

---

## Persona 1: The Marine Researcher

**Name**: Dr. Lena Hartmann  
**Role**: Postdoctoral researcher in marine ecology  
**Institution**: University research institute (mid-sized, EU-based)  
**Technical literacy**: High — comfortable with Python, R, Jupyter notebooks, APIs  

### What she's trying to DO on ODP

Lena is preparing a grant proposal on Southern Ocean biodiversity. She needs to assess whether ODP has acoustic data that overlaps with her study area (60°S–75°S) and time window (2015–2023). She has about 20 minutes before her next meeting.

Her task is not "explore the platform." Her task is: **"Does this specific dataset cover my study area and period? Can I cite it in my methods section?"**

### What she does today without ODP

She emails colleagues. She checks PANGAEA, OBIS, and BCO-DMO separately. She sometimes finds the data exists but can't access it without institutional affiliation. This process takes days, not minutes.

### What frustrates her about the current ODP UI

- The dataset description is a prose paragraph. She has to read 4–5 sentences before she can determine geographic coverage.
- The spatial map appears only after scrolling — and even then, it's a Mapbox tile that doesn't clearly highlight the dataset's actual coverage extent.
- The temporal range is listed as ISO timestamps (`2011-02-11T15:44:02Z`) — she has to mentally parse these into years.
- The license (`odc-by-1.0`) is displayed as a raw string. She doesn't know if this allows her to cite and redistribute derived results in a journal.
- The tabular data preview shows raw column names (`verbatimIdentification`, `occurrenceID`) without explanation of what they mean in scientific terms.

### What success looks like in 30 seconds

Lena opens the Aker BioMarine dataset card and immediately sees:
- A small map with the Southern Ocean bbox highlighted
- "2011 – 2025 · 14 years of coverage"
- "CC BY compatible — citable in publications"
- "Includes depth profiles, species ID, vessel tracklines"

She doesn't need to read a paragraph. She knows in 15 seconds this is worth investigating further.

### Her quote

> "I don't need the platform to explain the ocean to me. I need it to tell me, quickly and honestly, whether this data is fit for my purpose."

---

## Persona 2: The Industry Data Manager

**Name**: Marcus Lindqvist  
**Role**: Environmental data manager at an offshore energy company  
**Institution**: Mid-large energy company operating in Nordic and North Sea waters  
**Technical literacy**: Medium-high — understands data formats, APIs, GIS; not a developer  

### What he's trying to DO on ODP

Marcus's company is sharing metocean data from six North Sea platforms as part of a sustainability reporting initiative. He needs to verify that the published dataset is appearing correctly in the catalog, check its metadata completeness, and confirm that external partners can find and access it without contacting him directly.

His secondary task: find comparable datasets from other operators to benchmark his company's data quality and coverage.

### What he does today without ODP

His company publishes data through internal portals with limited external visibility. Sharing with research partners means email threads and manual access grants. He has no way to know if anyone is actually using the data they publish.

### What frustrates him about the current ODP UI

- After publishing a dataset, there's no clear confirmation of what external users will see. The "publisher view" and "user view" feel the same — no feedback loop.
- Finding comparable datasets requires knowing the right keywords. There's no "similar datasets" or "from the same region" suggestion.
- The "Use Dataset" section (API / OGC Features / Vector Tiles) is collapsed by default — it's the most important section for external partners, and it's hidden.
- There's no visible usage indicator ("downloaded by 12 researchers") that would justify continued investment in data sharing internally.

### What success looks like

Marcus can open his published dataset, see exactly what a first-time visitor would see, confirm the spatial coverage is rendering correctly, and share a direct link with a research partner knowing they'll be able to understand and access the data without his help.

### His quote

> "We made the decision to share this data openly. Now I need to be able to show my management that someone is actually using it — and that it's easy for them to do so."

---

## Persona 3: The Policy Analyst

**Name**: Amara Diallo  
**Role**: Ocean policy advisor at an international NGO  
**Institution**: Ocean-focused NGO working with governments on marine protected areas (30×30 initiative)  
**Technical literacy**: Low-medium — comfortable with Excel, GIS viewers, reports; not a data engineer  

### What she's trying to DO on ODP

Amara is preparing a briefing for a government delegation on marine protected area coverage in the Western Indian Ocean. She's heard that ODP has biodiversity observation data relevant to her region. She needs to understand: what data exists, what it shows, and whether it can be cited in a policy document.

She is not going to download a CSV and run an analysis. She needs to understand the data well enough to either cite it or pass it to a data analyst colleague.

### What she does today without ODP

She relies on published reports, IUCN databases, and colleagues at research institutions. Getting raw data is often blocked by format complexity or institutional barriers. She frequently has to say "the data exists but I can't get to it in a usable form."

### What frustrates her about the current ODP UI

- The platform feels designed for people who already know what STAC, Darwin Core, or OGC Features are. She doesn't, and there's no explanation.
- Dataset descriptions are written for a technical audience. The Aker BioMarine dataset says "EK60 and EK80 echosounder data" — she has no idea what this means or why it matters.
- There's no narrative context: "Here's what this data tells us about the Southern Ocean ecosystem." It's all schema, no story.
- The "Explore map" and "Explore table" actions are labeled with (Beta) tags — this makes her uncertain whether the tools are reliable enough to cite.
- She can't tell who produced the data, whether the organization is credible, or whether the data has been peer-reviewed or validated.

### What success looks like

Amara opens a dataset on marine mammal observations in the Indian Ocean and sees:
- A human-readable summary: "Visual and acoustic observations of whales, dolphins, and turtles recorded offshore Brazil by PGS vessels, 2008–2023"
- A map showing coverage relative to known MPAs
- A clear provenance statement: "Published by PGS, processed to Darwin Core format, available on OBIS/GBIF"
- A license statement she can read: "Free to use in publications and policy documents"

She can copy the dataset citation and paste it directly into her briefing document.

### Her quote

> "I know the data I need exists somewhere. My problem is I can never get from 'this data exists' to 'I can use this in my work' without needing a data scientist to translate for me."

---

## Cross-Persona Insights

### The shared frustration

All three personas share one fundamental problem: **they cannot determine fitness-for-purpose without significant effort.**

- Lena can't quickly verify spatial and temporal coverage
- Marcus can't confirm his data is presenting correctly to external users
- Amara can't understand what the data means without domain knowledge she doesn't have

This is the problem the redesign must solve first.

### What each persona needs above all else

| Persona | Primary need | Current gap |
|---|---|---|
| Lena (Researcher) | Assess fit quickly, with precision | Information buried in prose and raw metadata |
| Marcus (Industry) | Verify and validate published data | No publisher-perspective view or usage signals |
| Amara (Policy) | Understand data in plain language | Platform assumes technical literacy |

### Acquisition channel implications

These personas are not reachable through the same channels:

| Persona | Where they discover new tools |
|---|---|
| Lena | Conference talks (Ocean Sciences, AGU), preprint citations, lab Slack/Teams |
| Marcus | Industry working groups, sustainability reporting frameworks, partner referrals |
| Amara | NGO networks, UN working groups, government briefings, trusted colleagues |

None of these are paid digital advertising channels. All require **trust-based, community-driven discovery** — which directly informs the marketing strategy in `positioning.md`.

---

## What's Missing from These Personas

These personas do not yet cover:
- **Educators and students** — likely a growing segment as ODP expands
- **Journalists and science communicators** — underserved by current UI, high potential for platform awareness
- **Internal Hub Ocean team members** — who use the platform daily and have different needs from external users

These should be considered in a v2 of this document.
