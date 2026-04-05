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

### 現況評估

ODP 目前的平台設計語言是高度技術導向的（STAC、Darwin Core、OGC Features）。這不是缺陷，是設計選擇——但它同時也限制了平台能服務的受眾範圍。

擴展受眾的機會不在於簡化現有平台，而在於為不同用途建立不同的入口。同一份資料，給研究者看 schema，給政策人員看摘要，給 ESG 分析師看授權和覆蓋範圍。這個概念叫 audience-specific landing paths，是 2025 年 B2B 數據平台的主流設計模式。

### 三類潛在非研究型用戶評估

**記者 / 科學傳播者 — 潛力：中**
需要「這份資料能說什麼故事」，不是 schema。目前 ODP 無法服務這個需求——沒有敘事入口、沒有視覺化摘要。這個族群規模小，且通常透過研究者中介取得資料，短期不是優先 acquisition 目標。長期機會：與科學媒體（Nature News、Eos）建立資料引用合作關係。

**學生 / 教育者 — 潛力：低（現階段）**
課程需要穩定、有教學設計的資料集，不是原始觀測資料。ODP 資料太原始、文件品質參差不齊，除非主動做教育導向 curation，否則學生會選擇 GBIF 或 Copernicus。觸發條件：當 Hub Ocean 有資源建立「Datasets for Education」策展專區時再評估。

**企業 ESG / 金融分析師 — 潛力：高**
這是 ODP 真正有機會但尚未好好服務的族群。金融機構越來越需要海洋風險數據：漁業崩潰風險、海岸線變化趨勢、MPA 擴張對採礦和航運許可的影響。這個族群有預算、有監管壓力（TNFD、EU Taxonomy）、有明確的資料需求——但他們需要的不是 STAC API，而是報告等級的資料摘要和明確的商業使用授權聲明。

### ESG 分析師的 Persona 草稿（待 v2 正式化）

**Name**: Sofia Chen
**Role**: ESG Data Analyst, asset management firm
**Institution**: Mid-size European asset manager with ocean-exposed portfolio（漁業、航運、海岸房地產）
**Technical literacy**: Medium — Excel, Bloomberg, 基本 GIS；不寫程式
**Primary task**: 為年度 TNFD 報告評估投資組合中的海洋相關自然風險敞口
**Current workaround**: 購買昂貴的第三方 ESG 數據供應商報告，或委託顧問公司做桌面研究
**What she needs from ODP**:
- 明確的商業授權聲明（CC BY 是否允許商業報告引用？）
- 資料的地理覆蓋範圍與她的投資組合地理分佈的重疊程度
- 資料的時間序列長度（用於趨勢分析）
- 機構背書：誰發布這份資料？是否經過同儕審查？
**Quote**: "我不需要下載原始資料。我需要能在投資委員會報告裡引用的東西，而且要能說清楚資料來源為什麼可信。"

### 實現 Audience Expansion 的前提條件

在 ODP 能服務更廣泛受眾之前，需要先完成：

1. **授權明確化**（近期）: 每個資料集的授權說明必須用平語呈現——「可用於商業報告」或「僅限非商業研究」，而不只是 CC license 代碼。這個改變對 Amara（政策）和 Sofia（ESG）都有價值。

2. **Audience-specific entry points**（中期）: 首頁或 catalog 入口提供使用者選擇：「我是研究者」/ 「我是政策制定者」/「我代表企業」——進入不同的 onboarding 路徑，相同的資料，不同的呈現框架。

3. **資料品質分層標示**（中期）: 「已同儕審查」「產業自報數據」「政府官方統計」——給非研究型用戶判斷可信度的依據。

4. **Narrative layer**（長期）: 在技術 catalog 之上建立一層人類可讀的資料故事——「這份聲學資料幫助科學家追蹤南極磷蝦種群，磷蝦是整個南冰洋食物鏈的基礎」。這是記者和教育者入場的前提。

### 對本 Portfolio 的意義

這個分析展示的是超越 UI 設計的產品思維：識別平台現有架構的受眾邊界，並提出具體的擴展路徑和前提條件，而不是籠統地說「應該讓更多人使用」。

作為 Frontend Engineer 候選人，理解這個脈絡意味著在實作 CitationBlock、LicenseBadge、ProviderCredibility 這些元件時，設計決策背後有更大的 audience strategy 支撐。
