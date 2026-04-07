# User Personas — Ocean Data Platform

> **Document status**: Draft v1.2
> **Agent**: research-analyst
> **Last updated**: 2026-04-05
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
**Institution**: Institute of Marine Research (IMR), Norway — a Hub Ocean partner institution
**Technical literacy**: High — comfortable with Python, R, Jupyter notebooks, APIs; actively uses LLM tools (ChatGPT, Perplexity) for literature synthesis and exploratory data analysis

### What she's trying to DO on ODP

Lena is validating a Southern Ocean krill population model using acoustic survey data from Aker BioMarine's research vessels. She needs to confirm the dataset covers her study area (60°S–75°S) and time window (2015–2023), and that she can cite it in her methods section.

Her task is not "explore the platform." Her task is: **"Does this specific dataset cover my study area and period? Can I cite it in my methods section?"**

She already uses LLM tools to draft literature reviews and pre-process data pipelines. She wonders whether ODP's data could feed directly into these workflows — or whether she'll be back to copy-pasting metadata by hand.

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

#### Detail Page Needs

When Lena clicks into a dataset, she needs to answer fitness-for-purpose questions quickly:

- **Data type** — Is this CTD, acoustic, biological observation, or current data?
- **Temporal coverage** — Is the time range long enough? (e.g. TGS 2008–2023, Aker BioMarine 10-year series)
- **Spatial overlap** — Does the geographic coverage intersect her study area?
- **FAIR compliance** — Is the data findable, accessible, interoperable, and reusable?
- **Access method** — How does she access it via Python or R SDK?
- **Citation history** — Have other researchers cited or used this dataset?

**Use case basis:** TGS data doubled the volume of comparable data in OBIS. Aker BioMarine acoustic data enables scientists to study krill distribution in relation to climate change. Both datasets derive their scientific value from long time series and consistent methodology — details Lena cannot assess without a well-structured detail page.

---

## Persona 2: The Industry Data Manager

### Sub-persona: Persona 2A — Marcus Lindqvist (Data User)

**Name**: Marcus Lindqvist
**Role**: Environmental data manager at an offshore energy company
**Institution**: Aker BP or TGS — Hub Ocean industry partners with active data contributions to ODP
**Technical literacy**: Medium-high — understands data formats, APIs, GIS; not a developer

### What he's trying to DO on ODP

Marcus's company is sharing metocean data from six North Sea platforms as part of a sustainability reporting initiative. He needs to verify that the published dataset is appearing correctly in the catalog, check its metadata completeness, and confirm that external partners can find and access it without contacting him directly.

His secondary task: find comparable datasets from other operators to benchmark his company's data quality and coverage.

He also has a new deadline: the annual sustainability report is due in six weeks, and the ESG chapter must include evidence of open data contributions. His legal team wants to cite specific datasets that are publicly accessible — "shared in good faith" — as proof of corporate transparency.

### What he does today without ODP

His company publishes data through internal portals with limited external visibility. Sharing with research partners means email threads and manual access grants. He has no way to know if anyone is actually using the data they publish.

He found ODP through the Ocean Data Action Coalition working group, where his company is a member. He expected the platform to make the "data-sharing story" easy to communicate externally.

### What frustrates him about the current ODP UI

- After publishing a dataset, there's no clear confirmation of what external users will see. The "publisher view" and "user view" feel the same — no feedback loop.
- Finding comparable datasets requires knowing the right keywords. There's no "similar datasets" or "from the same region" suggestion.
- The "Use Dataset" section (API / OGC Features / Vector Tiles) is collapsed by default — it's the most important section for external partners, and it's hidden.
- There's no visible usage indicator ("downloaded by 12 researchers") that would justify continued investment in data sharing internally.

### What success looks like

Marcus can open his published dataset, see exactly what a first-time visitor would see, confirm the spatial coverage is rendering correctly, and share a direct link with a research partner knowing they'll be able to understand and access the data without his help.

### His quote

> "We made the decision to share this data openly. Now I need to be able to show my management that someone is actually using it — and that it's easy for them to do so."

#### Detail Page Needs

Marcus evaluates datasets for operational integration. His detail page questions are:

- **Update frequency** — Is the data real-time, near-real-time, or static?
- **Combinability** — Can this dataset be joined with other datasets in his pipeline?
- **License** — What are the terms? Is commercial use permitted?
- **Provider credibility** — Who published this, and are they a trusted source?
- **Access method** — How does he connect via OGC API or STAC API?

**Use case basis:** Aker BP has shared metocean data since 2021, explicitly to let scientists, engineers, and industry users "explore and combine with other datasets." The CEO statement — "The real value comes from combining datasets" — defines Marcus's primary evaluation criteria. He needs the access panel and provider context immediately, not buried under scroll.

---

## Persona 2B: Erik Hansen
**Role:** Industry Sustainability Lead (Data Contributor)
**Organization:** TGS / Aker BioMarine / large marine industry companies
**Location:** Norway / Global

**Background:**
Responsible for the company's ESG and ocean data sharing programmes. Wants to contribute company-collected ocean data (acoustic, metocean, biological observation) to the scientific community while gaining FAIR standardisation and increased visibility.

**Goals:**
- Upload and standardise company data to ODP as FAIR data
- Gain brand exposure and trust signals from data sharing
- Support SDG 14 commitments
- Enable the scientific community to discover and use company data

**Pain points:**
- The catalog has no clear "How to share your data" entry point (PP-23)
- Unclear how data contributions will be displayed once uploaded
- No visibility into who is using the contributed data

**Quote:**
> "We want to inspire other companies to get involved in sharing data to support SDG14."
> — Sandy Spørck, TGS

**Behaviour:**
- Engages with Hub Ocean at the platform level, not just as a data consumer
- Decision-making is driven by brand and CSR value, not technical capability
- Needs a clear, low-friction contribution pathway

---

## Persona 3: The Policy Analyst

**Name**: Amara Diallo
**Role**: Ocean policy advisor and data access coordinator
**Institution**: UN Ocean Decade Corporate Data Group (CDG) — Hub Ocean is a named participant in this working group, listed on their website
**Technical literacy**: Low-medium — comfortable with Excel, GIS viewers, reports; not a data engineer

### What she's trying to DO on ODP

Amara is building the progress report for the 30×30 target — the global commitment to protect 30% of the ocean by 2030. She needs to find citable MPA (marine protected area) coverage data to support the report's claims about current protection levels.

She is not going to download a CSV and run an analysis. She needs to understand the data well enough to either cite it or pass it to a data analyst colleague.

She already knows Hub Ocean is an Ocean Panel partner and a member of the Ocean Data Action Coalition. She specifically came to ODP because of that institutional credibility — but once she's on the platform, she can't find any reference to it. There's no "about this platform" context, no affiliation badge, no signal that this data comes from a vetted institutional source. She's not sure she can cite it in an official UN document without that provenance.

### What she does today without ODP

She relies on published reports, IUCN databases, and colleagues at research institutions. Getting raw data is often blocked by format complexity or institutional barriers. She frequently has to say "the data exists but I can't get to it in a usable form."

### What frustrates her about the current ODP UI

- The platform feels designed for people who already know what STAC, Darwin Core, or OGC Features are. She doesn't, and there's no explanation.
- Dataset descriptions are written for a technical audience. The Aker BioMarine dataset says "EK60 and EK80 echosounder data" — she has no idea what this means or why it matters.
- There's no narrative context: "Here's what this data tells us about the Southern Ocean ecosystem." It's all schema, no story.
- The "Explore map" and "Explore table" actions are labeled with (Beta) tags — this makes her uncertain whether the tools are reliable enough to cite.
- She can't tell who produced the data, whether the organization is credible, or whether the data has been peer-reviewed or validated.
- **New frustration**: She knows Hub Ocean is a member of the Ocean Panel's Ocean Data Action Coalition — that's why she's here. But the platform UI shows no trace of this institutional affiliation. There's no "Hub Ocean is a UN Ocean Decade partner" statement, no coalition badge, no link to their governance page. She can't cite ODP as an authoritative source in a UN document if she can't confirm its institutional standing from within the platform itself.

### What success looks like

Amara opens a dataset on marine mammal observations in the Indian Ocean and sees:
- A human-readable summary: "Visual and acoustic observations of whales, dolphins, and turtles recorded offshore Brazil by PGS vessels, 2008–2023"
- A map showing coverage relative to known MPAs
- A clear provenance statement: "Published by PGS, processed to Darwin Core format, available on OBIS/GBIF"
- A license statement she can read: "Free to use in publications and policy documents"

She can copy the dataset citation and paste it directly into her briefing document.

### Her quote

> "I know the data I need exists somewhere. My problem is I can never get from 'this data exists' to 'I can use this in my work' without needing a data scientist to translate for me."

#### Detail Page Needs

Amara evaluates datasets for policy relevance and citability. Her detail page questions are:

- **SDG alignment** — Which Sustainable Development Goals does this dataset support?
- **Existing use cases** — Has this data been cited in policy or regulatory contexts?
- **Citation format** — How does she correctly cite this dataset in a report?
- **FAIR governance** — Does the data meet open data standards required for policy use?
- **Provider identity** — Who published this, and what is their institutional standing?

**Use case basis:** TGS explicitly links their data contribution to SDG 14 (Life Below Water). ILIAD emphasizes science-based decision-making and support for legal and regulatory requirements. Wallenius Wilhelmsen's TNFD report requires citable, traceable data sources. Amara cannot serve these needs if SDG tags, citation blocks, and provider context are absent or hard to find.

---

## Persona 4: Sofia Chen
**Role:** ESG Analyst / Nature Finance
**Organization:** DNB / Wallenius Wilhelmsen / large financial institutions or shipping companies
**Location:** Oslo, Norway / Global

**Background:**
Responsible for the company's nature-related risk assessments and ESG reporting, with requirements to comply with TNFD (Taskforce on Nature-related Financial Disclosures) and CSRD (Corporate Sustainability Reporting Directive). Has limited technical knowledge of marine ecosystems but needs citable, standardised data to support reports.

**Goals:**
- Assess the proximity of company operations to ocean-sensitive areas (whale migration routes, coral reefs, MPAs)
- Identify TNFD-aligned, citable data sources
- Generate quantified nature-related risk metrics
- Meet CSRD reporting requirements

**Pain points:**
- Does not know which datasets meet TNFD standards
- Cannot understand technical field names (PP-15)
- Cannot find data citations and DOIs (PP-13)
- Cannot tell which datasets are free tier vs premium tier (PP-21)
- Needs cross-dataset analysis but the platform provides no guidance (PP-22)

**Quote:**
> "I need to know where our ships operate relative to sensitive marine habitats — but I can't spend weeks finding and cleaning data just to answer a TNFD disclosure question."

**Behaviour:**
- Does not write code; requires a no-code interface
- Prioritises license and citation information
- Most interested in integrated data products such as "Ocean Sensitive Areas"
- Needs a report format that can be exported to PDF

**Detail page needs:**
- Free / Premium tier badge visible without clicking through
- TNFD / CSRD compliance tags on relevant datasets
- DOI and citation block prominently displayed
- Direct link to Hub Ocean for further exploration

---

## Cross-Persona Insights

### The shared frustration

All four primary personas share one fundamental problem: **they cannot determine fitness-for-purpose without significant effort.**

- Lena can't quickly verify spatial and temporal coverage
- Marcus (2A) can't confirm his data is presenting correctly to external users
- Amara can't understand what the data means without domain knowledge she doesn't have
- Sofia can't identify which datasets meet TNFD/CSRD standards or are freely available

This is the problem the redesign must solve first.

### What each persona needs above all else

| Persona | Primary need | Current gap |
|---|---|---|
| Lena (Researcher) | Assess fit quickly, with precision | Information buried in prose and raw metadata |
| Marcus 2A (Industry — Data User) | Verify and validate published data | No publisher-perspective view or usage signals |
| Erik 2B (Industry — Data Contributor) | Clear contribution pathway and visibility | No "share your data" entry point or usage feedback |
| Amara (Policy) | Understand data in plain language | Platform assumes technical literacy |
| Sofia (ESG / Nature Finance) | Regulatory-aligned, citable data with tier clarity | No TNFD/CSRD tags, no free vs premium distinction |

### Acquisition channel implications

These personas are not reachable through the same channels:

| Persona | Where they discover new tools |
|---|---|
| Lena | Conference talks (Ocean Sciences, AGU), preprint citations, lab Slack/Teams |
| Marcus / Erik | Ocean Data Action Coalition working group, industry sustainability reporting frameworks, partner referrals |
| Amara | UN Ocean Decade networks, NGO networks, government briefings, trusted colleagues |
| Sofia | TNFD/CSRD implementation forums, ESG practitioner networks, financial sector sustainability working groups |

None of these are paid digital advertising channels. All require **trust-based, community-driven discovery** — which directly informs the marketing strategy in `positioning.md`.

---

## What's Missing from These Personas

These personas do not yet cover:
- **Educators and students** — likely a growing segment as ODP expands
- **Journalists and science communicators** — underserved by current UI, high potential for platform awareness
- **Internal Hub Ocean team members** — who use the platform daily and have different needs from external users

These should be considered in a v2 of this document.
