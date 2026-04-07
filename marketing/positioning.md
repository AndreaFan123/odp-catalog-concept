# Positioning & Growth Strategy — Ocean Data Platform

> **Document status**: Draft v1.1
> **Agent**: marketing-consultant
> **Last updated**: 2026-04-03
> **References**: research/user-personas.md, Hub Ocean Marketing Manager JD

---

## 1. Current Positioning

Hub Ocean describes itself as: *"a non-profit tech foundation dedicated to unlocking the power of data to protect and restore ocean health."*

The Ocean Data Platform is described as: *"a high-performing, cloud-based geospatial platform that provides scientists, experts, and organizations with seamless access to fit-for-purpose ocean data."*

**What's working**: The mission framing is clear and compelling. "Protect and restore ocean health" is a purpose statement that resonates with all three target audiences.

**What's missing**:
- No differentiation from other ocean data repositories (GBIF, OBIS, Copernicus). Why ODP, specifically?
- "Seamless access" is a claim, not a demonstration. The current UI creates friction that the positioning promises to remove.
- The platform speaks to data professionals. It does not yet speak to the policy analyst who needs a citable source, or the industry partner who needs to demonstrate data sharing to regulators.
- There is no community identity. ODP has users; it does not yet have a community.

---

## 2. Target Positioning

When Lena, Marcus, or Amara encounters ODP for the first time, it should feel like:

> *"This is the place ocean data actually comes together — and they've made it possible for me to use it without a data engineering degree."*

The emotional promise is not "we have lots of data." It is **"we removed the barriers that have always stood between you and the data you need."**

This requires the UI and the marketing to make the same promise. A redesigned catalog that shows spatial coverage, temporal range, and license status at a glance makes the "seamless access" claim credible in a way the current UI does not.

---

## 3. Positioning Statements (by persona)

### For Researchers (Lena)
> For marine researchers who waste days tracking down ocean datasets across fragmented repositories, ODP is the unified ocean data catalog that lets you assess, access, and cite data in minutes — because it's built around how researchers actually evaluate data, not just how data is stored.

### For Industry (Marcus)
> For companies that want to share their ocean data openly but struggle to make it discoverable and usable for external partners, ODP is the trusted publishing platform that turns a private dataset into a citable, API-accessible scientific resource — because a non-profit operator provides the neutrality and credibility that industry data sharing requires.

### For Policy (Amara)
> For policy advisors who need credible ocean data to support decision-making but lack the technical background to navigate scientific databases, ODP is the plain-language gateway to authoritative ocean data — because we believe that better ocean policy starts with data that anyone can understand and cite.

---

## 4. Messaging Hierarchy

### Primary message (all audiences)
**"The world's ocean data, made usable."**

This is simple, honest, and makes a specific claim: not just collected, not just stored — *made usable.* This is where the redesign connects to marketing — it is the evidence that the claim is true.

### Secondary messages by persona

**Lena (Researcher)**
- "Find, evaluate, and cite ocean data without leaving your browser"
- "STAC-compliant, FAIR-principles data — meets the standards your institution requires"
- "Open access, open license, open science"

**Marcus (Industry)**
- "Share your data once; make it discoverable everywhere"
- "A non-profit platform your sustainability team can cite in ESG reports"
- "From private dataset to citable scientific resource in minutes"

**Amara (Policy)**
- "Ocean data with the citation you need for your briefing document"
- "Supported by the World Economic Forum, Aker Group, and 27+ global partners"
- "Part of the UN Ocean Decade — the data behind 30×30"

### Proof points (across all personas)
- Real datasets: Aker BioMarine Southern Ocean acoustics, PGS marine mammal observations, Aker BP metocean data
- Institutional credibility: WEF, UN Ocean Decade, Ocean Panel
- Technical credibility: STAC-compliant, FAIR principles, Darwin Core
- Non-profit governance: no vendor lock-in, mission-aligned

---

## 5. Channel Strategy (no paid advertising)

### Lena's discovery path
Lena finds new tools through people she trusts, not platforms.

| Channel | Tactic | Effort | Timeline |
|---|---|---|---|
| Conference presence | Lightning talks at Ocean Sciences, AGU showing ODP in action with a real research use case | High | Annual |
| Preprint citation | When Hub Ocean publishes research using ODP data, cite the platform in methods | Low | Ongoing |
| GitHub | Jupyter notebook examples that reference ODP datasets — discoverable by researchers exploring GitHub | Medium | One-time + maintain |
| Lab Slack/Teams | Researchers share tools in lab communication channels — one satisfied user is the acquisition channel | Zero (organic) | Ongoing |
| Existing user advocacy | Testimonial program: ask Sebastian Menze (IMR Norway) and Brenda Varguez for shareable quotes | Low | Near-term |

### Marcus's discovery path
Marcus finds platforms through working groups and professional networks, not search.

| Channel | Tactic | Effort | Timeline |
|---|---|---|---|
| Sustainability working groups | Present ODP at offshore industry ESG forums as the neutral platform for data sharing commitments | High | Annual |
| ESG reporting alignment | Document how ODP publication satisfies common sustainability reporting requirements (GRI, SASB) | Medium | One-time |
| Partner network | Aker Group, TGS, Aker BioMarine as reference customers — peer-to-peer referrals are the strongest signal | Low (relationship) | Ongoing |
| LinkedIn | Case studies showing data shared on ODP → used by researchers → cited in publications | Low | Monthly |

### Amara's discovery path
Amara's trust chain runs through institutions, not platforms.

| Channel | Tactic | Effort | Timeline |
|---|---|---|---|
| UN Ocean Decade network | Position ODP as the data infrastructure for Ocean Decade commitments | High (relationships) | Ongoing |
| NGO mailing lists | Guest posts in newsletters for ocean conservation NGOs (WWF, Oceana, IUCN) | Medium | Quarterly |
| Government briefings | When ODP data is used in policy documents, ensure the platform is credited and linked | Low (downstream) | Ongoing |
| Trusted referrals | One policy advisor who successfully cites ODP data recommends it to three colleagues — design this chain deliberately | Low | Ongoing |

---

## 6. Onboarding Journey Map

The critical gap for all three personas is between **"I found ODP"** and **"I successfully used ODP data in my work."** The following maps the ideal first 5 minutes for each persona.

### Lena's first 5 minutes

```
Hears about ODP from a colleague at Ocean Sciences
  ↓
Opens app.hubocean.earth/catalog
  ↓
Sees dataset cards with spatial thumbnails — immediately scans for Southern Ocean coverage
  ↓ (redesign fix: PP-02)
Clicks Aker BioMarine dataset card
  ↓
Hero panel shows: Southern Ocean · 2011–2025 · 14 years · ODC-By 1.0 (open for citation)
  ↓ (redesign fix: PP-01, PP-03, PP-04)
Copies API endpoint from Access panel
  ↓ (redesign fix: PP-05)
Opens her Jupyter notebook and pastes the endpoint
  ↓
Returns to ODP next week with a colleague
```

**Current friction point**: Between "opens catalog" and "finds relevant dataset" — currently requires clicking into multiple datasets and reading prose descriptions.  
**Redesign fix**: Spatial thumbnails and year ranges on catalog cards.

### Marcus's first 5 minutes

```
Directed to ODP by Aker Group sustainability team
  ↓
Opens his published dataset's detail page (shared via direct link)
  ↓
Verifies: spatial coverage is rendering correctly, license is visible, access panel shows all three endpoints
  ↓ (redesign fix: PP-05)
Shares the URL with a research partner who needs access
  ↓
Partner opens the page, copies the API endpoint without contacting Marcus
  ↓
Marcus sees in his email that a researcher has accessed the data
[Production scope: usage notification]
```

**Current friction point**: No way to verify how the published dataset appears to external users.  
**Future fix**: Publisher preview mode (production scope).

### Amara's first 5 minutes

```
Receives an ODP link from a colleague in a UN working group
  ↓
Opens the PGS marine mammal dataset
  ↓
Hero panel: "Visual and acoustic observations of whales, dolphins, and turtles offshore Brazil, 2008–2023"
  ↓ (redesign fix: PP-01 — plain language description first)
Reads: "Free to use in publications · CC BY-NC 4.0"
  ↓ (redesign fix: PP-04)
Copies the APA citation from the Citation Block
  ↓ (redesign fix: competitive gap from Pangaea)
Pastes into her briefing document
  ↓
Sends the link to two other policy colleagues
```

**Current friction point**: Between "opens dataset" and "confirms citability" — currently requires reading technical prose and decoding a license string.  
**Redesign fix**: License badge with plain-language description; Citation Block.

---

## 7. Community Flywheel

The most sustainable growth model for a non-profit data platform is a community flywheel:

```
Researchers use ODP data
  ↓
They publish papers citing ODP
  ↓
Papers are found by other researchers → new users
  ↓
Some researchers upload their own data to ODP
  ↓
More datasets → more value → more users
  ↓
Industry partners see citation frequency → agree to share more data
  ↓
More data → higher platform credibility → cited in policy documents
  ↓
Policy citations → government institutional adoption
  ↓
Institutional adoption → more funding → more features → more data
```

**The flywheel starts with researchers.** Every product and marketing decision that reduces friction for Lena ultimately drives the entire flywheel.

### Flywheel accelerators

**Citation tracking**: Build a simple dashboard showing how many publications have cited ODP datasets (using DOI tracking). This is both a metric and a marketing asset — show it prominently to industry partners considering data sharing.

**Dataset DOIs**: Every published dataset gets a DOI. This is already in ODP's roadmap and is the single highest-leverage action for researcher adoption. A citable dataset is a shareable dataset.

**"Used in research" badge**: When an ODP dataset is cited in a publication, surface that on the dataset detail page: "Cited in 3 publications." This is social proof for Amara (credibility) and Marcus (ROI on data sharing).

**Contributor spotlights**: Monthly feature on the Hub Ocean website/newsletter: "This month's dataset: [organization] shared [X] acoustic observations from [region], which has already been accessed by [N] researchers." Makes data sharing tangible and rewarding for Marcus.

---

## 8. Audience Expansion — Beyond Researchers

### Current State Assessment

ODP's current platform design language is highly technical (STAC, Darwin Core, OGC Features). This is not a flaw — it is a deliberate design choice — but it simultaneously limits the range of audiences the platform can serve.

The opportunity for audience expansion does not lie in simplifying the existing platform. It lies in building different entry points for different purposes. The same data presented as a schema for researchers, as a summary for policy advisors, and as a license and coverage summary for ESG analysts. This concept is called audience-specific landing paths, and it is the dominant design pattern for B2B data platforms as of 2025.

### Assessment of Three Potential Non-Research User Groups

**Journalists / Science Communicators — Potential: Medium**
They need "what story does this data tell," not a schema. ODP cannot currently serve this need — there is no narrative entry point and no visualization summary. This group is small and typically obtains data through researcher intermediaries, making them a low-priority acquisition target in the near term. Long-term opportunity: establish data citation partnerships with science media outlets (Nature News, Eos).

**Students / Educators — Potential: Low (at this stage)**
Curricula require stable, pedagogically designed datasets, not raw observational data. ODP's data is too raw and documentation quality is too inconsistent — unless Hub Ocean actively curates an education-oriented collection, students will choose GBIF or Copernicus instead. Trigger condition: reassess when Hub Ocean has resources to build a "Datasets for Education" curated section.

**Corporate ESG / Financial Analysts — Potential: High**
This is the group ODP has a genuine opportunity to serve but has not yet addressed well. Financial institutions increasingly need ocean risk data: fishery collapse risk, coastline change trends, and the impact of MPA expansion on mining and shipping permits. This group has budget, regulatory pressure (TNFD, EU Taxonomy), and clearly defined data needs — but what they need is not a STAC API; it is report-grade data summaries and explicit commercial use license statements.

### ESG Analyst Persona Draft (to be formalized in v2)

**Name**: Sofia Chen
**Role**: ESG Data Analyst, asset management firm
**Institution**: Mid-size European asset manager with an ocean-exposed portfolio (fisheries, shipping, coastal real estate)
**Technical literacy**: Medium — Excel, Bloomberg, basic GIS; does not write code
**Primary task**: Assess ocean-related natural risk exposure in the portfolio for the annual TNFD report
**Current workaround**: Purchases expensive third-party ESG data vendor reports, or commissions consulting firms for desktop research
**What she needs from ODP**:
- Clear commercial license statements (does CC BY permit citation in commercial reports?)
- The degree of overlap between a dataset's geographic coverage and her portfolio's geographic distribution
- The length of the dataset's time series (for trend analysis)
- Institutional endorsement: who published this data, and has it been peer-reviewed?
**Quote**: "I don't need to download raw data. I need something I can cite in an investment committee report, with a clear explanation of why the source is credible."

### Prerequisites for Achieving Audience Expansion

Before ODP can serve a broader audience, the following must be completed:

1. **License clarification** (near-term): Every dataset's license must be presented in plain language — "Permitted for use in commercial reports" or "Non-commercial research use only" — not just a CC license code. This change has value for both Amara (policy) and Sofia (ESG).

2. **Audience-specific entry points** (medium-term): The homepage or catalog entry provides users with a choice — "I am a researcher" / "I am a policy maker" / "I represent a business" — leading into different onboarding paths presenting the same data in different frameworks.

3. **Tiered data quality labeling** (medium-term): "Peer-reviewed," "Industry self-reported," "Official government statistics" — giving non-research users a basis for judging credibility.

4. **Narrative layer** (long-term): A human-readable data story layer built on top of the technical catalog — "This acoustic data helps scientists track Antarctic krill populations, which are the foundation of the entire Southern Ocean food chain." This is a prerequisite for journalists and educators to engage with the platform.

### Implications for This Portfolio

This analysis demonstrates product thinking that goes beyond UI design: identifying the audience boundaries of the platform's current architecture and proposing concrete expansion paths and prerequisites, rather than vaguely asserting "more people should be able to use this."

As a Frontend Engineer candidate, understanding this context means that when implementing components such as CitationBlock, LicenseBadge, and ProviderCredibility, each design decision is backed by a larger audience strategy.
