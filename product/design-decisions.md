# Design Decisions — ODP Catalog Concept

> **Document status**: Draft v1.0  
> **Agent**: product-strategist  
> **Last updated**: 2026-04-05 (DD-13–DD-16 added)  
> **References**: research/pain-points.md, research/competitive.md

---

## How to Read This Document

Each decision is tied to a specific pain point (PP-XX) from `research/pain-points.md` and a specific persona. The goal is to make every design choice traceable to a user need — not an aesthetic preference.

---

## DD-01: Lead with 5 structured facts, not a prose description

**Pain point addressed**: PP-01 (information hierarchy inverts user priority)  
**Persona**: All three  
**Context**: The current detail page opens with a prose paragraph that buries decision-critical information. Users must read before they can assess.  
**Options considered**:
- A: Keep prose description, add a summary section above it
- B: Replace the prose description entirely with structured fields
- C: Show 5 structured facts at the top; move prose description to a collapsible "About" section below

**Decision**: Option C  
**Rationale**: Lena needs structured facts (spatial, temporal, license) to assess fit in under 30 seconds. Amara needs plain-language context, which the prose description provides — but only after she's decided to engage. The prose description still has value; it just belongs in a lower-priority position. Option B destroys useful context. Option A improves things marginally but keeps the cognitive load of reading prose first.  
**Trade-offs**: Providers who wrote detailed descriptions may find them deprioritized. This is the correct trade-off — the platform's job is to serve the reader, not reward the writer.

---

## DD-02: Spatial thumbnail on every dataset card

**Pain point addressed**: PP-02 (spatial coverage not immediately visible)  
**Persona**: Lena (Researcher), Amara (Policy)  
**Context**: The catalog listing page shows no spatial information. A researcher scanning 10 datasets to find geographic overlap must click into each one.  
**Options considered**:
- A: Text-only region label (e.g., "Southern Ocean")
- B: Small SVG world map with bbox highlighted
- C: Mapbox tile thumbnail (requires API key, external dependency)

**Decision**: Option B — SVG mini-map  
**Rationale**: A text label ("Southern Ocean") is ambiguous and requires geographic knowledge to interpret. A visual bbox on a world outline communicates extent, position, and scale simultaneously — and works for Amara who may not know where the Southern Ocean is. Option C introduces a paid dependency and external API call for every card render, which is inappropriate for a catalog listing page with many cards. SVG is self-contained, fast, and accessible with proper alt text.  
**Trade-offs**: SVG world outlines are simplified and imprecise for complex multi-bbox datasets (like Aker BP's hundreds of point locations). Handle gracefully by showing the union bbox or a text fallback for point datasets.

---

## DD-03: Human-readable temporal range as a primary display element

**Pain point addressed**: PP-03 (temporal range is machine-readable)  
**Persona**: Lena, Marcus  
**Context**: STAC API returns ISO timestamps. Displaying them raw requires mental parsing.  
**Options considered**:
- A: Show ISO timestamp with tooltip showing year range
- B: Show year range only ("2011 – 2025")
- C: Show year range + duration + a visual timeline bar

**Decision**: Option C on detail page, Option B on catalog card  
**Rationale**: On the catalog card, space is limited — "2011 – 2025" communicates the essential fact efficiently. On the detail page, the timeline bar adds "14 years of coverage" context that helps Lena compare datasets by recency and duration without arithmetic. The ISO timestamp remains available in the raw metadata section for users who need it.  
**Trade-offs**: Duration calculation requires JavaScript date math — edge cases include open-ended ranges (null end date) and single-year datasets.

---

## DD-04: License badge with plain-language tooltip

**Pain point addressed**: PP-04 (license string is opaque)  
**Persona**: Lena, Amara  
**Context**: License strings like `odc-by-1.0` or `CC-BY-NC-4.0` are not self-explanatory.  
**Options considered**:
- A: Show raw license string
- B: Show human-readable label ("CC BY-NC 4.0") with link to license page
- C: Show color-coded badge + human label + tooltip explaining commercial use and attribution requirements

**Decision**: Option C  
**Rationale**: Amara cannot open an external license page during a 20-minute briefing preparation. She needs the answer inline. The tooltip answers: "Can I use this in a publication? Yes. Can my NGO use this commercially? No." Two boolean answers cover 90% of use cases for Lena and Amara. The color-coding (green = open, amber = restricted, red = proprietary) enables scanning across multiple cards.  
**Trade-offs**: Color alone is insufficient for accessibility — the badge must include the text label. Color is a reinforcing signal, not the primary one.

---

## DD-05: "Use Dataset" is a persistent panel, not a collapsed accordion

**Pain point addressed**: PP-05 (Use Dataset collapsed by default)  
**Persona**: Marcus, Lena  
**Context**: The API access path is the primary action the platform exists to enable. Hiding it in an accordion inverts the importance hierarchy.  
**Options considered**:
- A: Keep accordion, move it above the fold
- B: Replace accordion with a persistent panel showing all three access methods (API, OGC, Vector Tiles)
- C: Single prominent "Access Data" button that expands to show options

**Decision**: Option B  
**Rationale**: Marcus needs to verify that all three access paths are working and findable for his partners. Lena needs the API endpoint she can copy directly into her notebook. Both users know what they want — they should not need to discover it. Option C requires an extra click that adds no value. Option A is an improvement but still suggests these are secondary options.  
**Trade-offs**: A persistent panel takes more vertical space. This is the correct trade-off — the access panel is the point of the page.

---

## DD-06: Keywords are interactive filters

**Pain point addressed**: PP-08 (tags not interactive)  
**Persona**: Lena  
**Context**: Keywords like "krill", "Southern Ocean", "acoustic" are natural discovery vectors. Currently display-only.  
**Options considered**:
- A: Keep as display-only pills
- B: Make keywords link to catalog filtered by that keyword
- C: Make keywords clickable, update catalog URL with filter parameter

**Decision**: Option C  
**Rationale**: Option C preserves browser history (back button works), supports sharing filtered catalog URLs, and aligns with how researchers use keyword-based discovery. Lena clicking "krill" should see all krill-related datasets — this is the most natural next step after finding one relevant dataset.  
**Trade-offs**: Requires implementing URL-based filter state in the catalog page. Worth the effort; this is how all professional data catalogs work (GBIF, Pangaea).

---

## DD-07: Citation block on detail page

**Pain point addressed**: PP-04 (partially), PP-09 (provider credibility)  
**Persona**: Lena, Amara  
**Context**: Competitive analysis (Pangaea) shows that a formatted, copyable citation is a primary need for research and policy users. STAC metadata provides all necessary fields.  
**Options considered**:
- A: Show provider name only
- B: Show provider name + link to provider website
- C: Show formatted citation block with copy button (APA format using STAC fields)

**Decision**: Option C  
**Rationale**: Amara's workflow ends at "I need a citable reference." If she cannot get this from ODP in one click, she goes elsewhere. A formatted citation block removes the final barrier to adoption for policy users. The STAC `title`, `providers`, `links` (for URL), and temporal data provide everything needed for an APA-style citation. The copy button reduces the citation from a multi-step process to a single action.  
**Trade-offs**: Citation format preferences vary (APA vs. BibTeX vs. Chicago). Start with APA as the broadest academic standard; add BibTeX toggle in production scope.

---

## DD-08: No UI component library — self-built design system

**Pain point addressed**: (Design craft signal, not a user pain point)  
**Persona**: Hub Ocean hiring team  
**Context**: The JD explicitly requires "strong portfolio showing interaction design + visual design craft." Using shadcn/ui or MUI would demonstrate component consumption, not design authorship.  
**Options considered**:
- A: Use shadcn/ui (pre-built accessible components, faster)
- B: Use MUI (comprehensive, opinionated)
- C: Build all components from scratch using Tailwind + design token system

**Decision**: Option C  
**Rationale**: Every component in this project is an opportunity to demonstrate design judgment. The Badge component's color-coding decision, the Skeleton component's shape fidelity, the DatasetCard's information hierarchy — these are the portfolio's argument. Using a library would outsource these decisions to someone else's design system. The constraint is also realistic: a small team like Hub Ocean likely maintains their own component system, and demonstrating the ability to build and govern one is directly relevant.  
**Trade-offs**: More implementation time. `clsx` + `tailwind-merge` are the only allowed utilities. Accessibility must be implemented manually — `a11y-reviewer` sign-off required for every component.

---

## DD-09: Filter 透過 card 內容引導發現，而非側欄說明

**Pain point addressed**: PP-12
**Persona**: 所有三個 persona
**Context**: 現有 ODP 的 filter 側欄對使用者不透明。使用者需要主動發現 filter 的存在才能使用它，導致大多數人只用關鍵字搜尋。
**Options considered**:
- A: 在 filter 側欄加上說明文字和操作提示
- B: 把地區和時間整合進搜尋框 placeholder
- C: 讓 dataset card 上的 region label、temporal range、keywords 都是可點擊的 filter 觸發器——使用者從內容本身發現篩選的存在
**Decision**: Option C，搭配搜尋框下方的 active filter chips 顯示目前已套用的篩選條件
**Rationale**: 符合 DD-06（keywords 互動）的一致邏輯。讓資料引導發現，而非依賴 UI 說明文字。Lena 點擊「Southern Ocean」region label 就能看到所有南極海資料；Amara 點擊「CC BY 4.0」badge 就能篩選出她可以引用的資料集。這個模式對所有技術程度的使用者都直覺。
**Trade-offs**: 需要 URL-based filter state 支援多個同時啟用的 filter（keyword + region + license + temporal）。TanStack Router 的 validateSearch 可以處理這個需求。

---

## DD-10: Spotify-inspired UX as core design metaphor

**Pain point addressed**: PP-12（filter 不透明）、PP-01（資訊層級）
**Persona**: 所有三個 persona
**Context**: Hub Ocean 官方將自己定位為「the Spotify of ocean data」。我們的 UI 應該真正體現這個定位，而不只是一個資料庫列表。
**Options considered**:
- A: 維持現有列表式 UI，僅改善資訊層級
- B: 採用 dashboard 風格（Netflix/YouTube 格狀分類）
- C: 採用 Spotify desktop app 的 UX 架構：左側固定 sidebar + 深色主題 base + light/dark mode toggle + 正方形 card 封面

**Decision**: Option C
**Rationale**: 深色背景讓 SpatialThumbnail 的 cyan bbox highlight 成為視覺主角，直接解決 PP-02 的空間可見性問題。Spotify 模式的左側 sidebar 讓 category navigation 永遠可見，解決 PP-12 的 filter 不透明問題——用戶不需要「發現」filter 的存在，它就在那裡。正方形封面圖強制每個 dataset 有一個視覺身份，而不是一排文字。Light/dark mode toggle 讓不同使用情境（實驗室螢幕 vs 簡報環境）都有最佳閱讀體驗。
**Trade-offs**: 深色主題設計在 a11y 上需要更嚴格的對比度審查。所有元件需通過 `a11y-reviewer` 在深色和淺色兩種模式下的審核。

---

## DD-11: "Play" button — 讓用戶體驗資料而非只查看資料

**Pain point addressed**: PP-02（空間覆蓋不直覺）、PP-01（資訊層級）
**Persona**: Amara（Policy），Lena（Researcher）
**Context**: Spotify 的核心 UX 洞察是「試聽」——讓用戶在不需要理解技術細節的情況下體驗內容。ODP 可以做同樣的事：讓用戶在不下載資料的情況下「感受」dataset 的內容。
**Options considered**:
- A: 只顯示靜態地圖和數字摘要
- B: 連結到外部資料視覺化工具
- C: 在 dataset card 加入「Play」按鈕，觸發底部 playbar 和對應的資料動畫視覺

**Decision**: Option C（Portfolio scope 先實作靜態 Playbar UI + 2 種動畫類型）
**Rationale**: 把「資料探索」變成「資料體驗」，讓非技術用戶能直覺理解一個 dataset 代表什麼。動畫邏輯依資料類型而異：時間序列資料 → 波形動畫（像音波視覺化）；地理覆蓋資料 → 地圖上的資料點逐漸出現；聲學資料（如 Aker BioMarine）→ 頻譜動畫。底部 playbar 顯示 dataset 名稱、覆蓋範圍、時間軸。這是目前所有海洋資料平台都沒有做的差異化功能。
**Trade-offs**: 需要針對每種資料類型設計不同的動畫邏輯。Portfolio scope 先實作 2 種：時間序列波形（WaveAnimation）+ 地理點資料（MapAnimation）。聲學頻譜動畫列入 production scope。

---

## DD-12: Onboarding 問卷 → 個人化 catalog

**Pain point addressed**: PP-12（filter 不透明）
**Persona**: 新用戶（所有三個 persona 的首次使用狀態）
**Context**: 新用戶到達 catalog 時面對 40+ 個 dataset，不知道從何開始。現有平台假設用戶知道自己要找什麼。
**Options considered**:
- A: 顯示 "Getting Started" 說明頁面
- B: 預設排序改為「最多下載」
- C: 首次訪問顯示 3 個問題的 onboarding modal，根據答案預套用 filter 並記憶偏好

**Decision**: Option C（Portfolio scope 先實作 modal + localStorage 偏好儲存）
**Rationale**: 三個問題足以覆蓋三個 persona 的主要用途差異：「你的主要目的是什麼？」（研究 / 政策 / 技術整合）、「你最感興趣的海洋區域？」（全球 / 特定區域）、「你需要可免費商業使用的授權嗎？」（是 / 不確定 / 否）。答案直接對應到現有的 filter 系統，無需額外後端支援。localStorage 偏好儲存讓回訪用戶不需要重新回答。這個模式讓 catalog 從「資料庫」變成「個人化助理」。
**Trade-offs**: Modal 必須可以 skip（不強迫），且 skip 後要能從 UI 重新觸發偏好設定。Portfolio scope 不含帳號系統，偏好僅存在 localStorage（清除瀏覽器資料後重置）。

---

## DD-13: DatasetCard 移除地圖縮圖，改用 region badge

**Pain point addressed**: PP-02（空間覆蓋不直覺）
**Persona**: Lena, Amara
**Context**: SpatialThumbnail 在 card 小尺寸下大陸形狀辨識度接近零，無法傳遞任何地理資訊，反而造成視覺雜訊。
**Options considered**:
- A: 維持地圖縮圖，加大 card 尺寸
- B: 移除地圖縮圖，改用純文字 region badge（如「Southern Ocean」「North Sea」「Global」）
- C: 用色塊代替地圖（海洋藍色系依 region 分色）

**Decision**: Option B
**Rationale**: 文字 region label 比模糊的地圖縮圖更能快速傳遞地理資訊。這與 GBIF competitive analysis 的結論一致（research/competitive.md）：GBIF 用文字 region filter，不用縮圖。地圖體驗保留給 detail page，在大尺寸下才有意義。Amara 看到「Southern Ocean」立刻理解；看到一個模糊地圖矩形，反而需要思考。
**Trade-offs**: 失去視覺上的地理直覺，但換來更清晰的資訊傳遞和更快的 card 渲染（移除 SVG 計算）。

---

## DD-14: Detail page 使用平面地圖（MapLibre GL JS）

**Pain point addressed**: PP-02（空間覆蓋不直覺）
**Persona**: Lena, Marcus
**Context**: Detail page 需要一個高品質的地圖來展示 dataset 的 spatial extent，讓用戶能評估地理覆蓋範圍。
**Options considered**:
- A: 使用 3D 地球（globe view）
- B: 使用平面地圖（MapLibre GL JS + OpenStreetMap tiles）
- C: 放大版 SpatialThumbnail SVG

**Decision**: Option B — MapLibre GL JS flat map
**Rationale**: 平面地圖直接回答用戶問題：「這份資料覆蓋了哪裡？」bbox highlight 來自 STAC 正確的 spatial extent，不是原始 geometry（解決 PP-02）。MapLibre 是免費、開源，不需要 API key。Option C（大型 SVG）缺乏細節（海岸線、島嶼、國家邊界），無法支援 detail page 的使用情境。
**Trade-offs**: 失去 3D 地球的視覺震撼感，換來準確且可辨識的空間資訊。MapLibre 需要 lazy loading 避免影響 catalog page 性能。

---

## DD-15: Light mode 優先，dark mode 之後補

**Pain point addressed**: （設計語言對齊，非直接 user pain point）
**Persona**: Hub Ocean hiring team
**Context**: 原本考慮跟 Spotify 一樣使用深色主題（DD-10），但 Hub Ocean platform 實際是 light mode。深色主題在 a11y 審查中需要額外的對比度工作。
**Options considered**:
- A: 全深色主題（跟 Spotify 對齊）
- B: 以 light mode 為主，sidebar 維持深紫（Hub Ocean brand color #200A3A）
- C: 用戶可切換 light/dark

**Decision**: Option B — Light mode 優先
**Rationale**: 對齊 Hub Ocean platform 實際設計語言，同時 sidebar 的深色（#200A3A）保留品牌識別度。Light mode 更容易通過 WCAG AA 審查。Dark mode 作為之後的功能補充（列入 Roadmap Phase 5 的 Should 項目）。
**Trade-offs**: Spotify 定位的視覺震撼感降低，但設計的可信度和可維護性提升。

---

## DD-16: Type filter 改為 Collection 關聯顯示

**Pain point addressed**: PP-11（無相關 dataset 發現機制）
**Persona**: Lena（Researcher），Marcus（Publisher）
**Context**: Hub Ocean 現有平台的 Type filter 提供「Dataset / Data Collection」checkbox，要求用戶理解平台的內部架構分類。這是系統概念洩漏到 UI：一般用戶不需要也不應該需要理解「STAC Collection」是什麼，才能找到他們需要的資料。

然而，Collection 本身有真實的用戶價值，只是應該以不同方式呈現：
- Lena 找到一個相關 dataset 後，自然想知道「同一個 provider 還有哪些類似資料？」
- Marcus 發布資料時，有意識地把相關 dataset 組織成 Collection，希望用戶能一次發現全部

**Options considered**:
- A: 維持現有 checkbox filter（Dataset / Data Collection）
- B: 完全移除 type 分類概念，只顯示扁平 dataset 列表
- C: 移除 filter checkbox，改為在 card 和 detail page 上顯示「Part of Collection」關聯入口，讓用戶從內容發現關聯，而非從 filter 架構

**Decision**: Option C
**Rationale**: Option A 要求用戶先理解系統架構才能篩選，這是 UI anti-pattern——filter 應該回答「我想找什麼」，不是「這份資料屬於哪個內部類型」。Option B 完全放棄 Collection 的價值。Option C 保留了 Collection 作為「發現路徑」的核心功能，同時移除了「理解分類架構」這個不必要的認知負擔。

具體實作：在 dataset card 右下角顯示「Part of [Collection Name]」的小標籤，點擊後顯示該 collection 的其他 dataset。這直接解決 PP-11（無相關 dataset 發現機制）：用戶從一個 dataset 自然滑向同一個 Collection 的其他成員，不需要理解背後的架構。

**Trade-offs**: 需要 STAC `links` 欄位裡的 collection 關聯資料正確存在。Portfolio scope 先顯示靜態文字標籤（「Part of [collection title]」），不做完整的 collection 瀏覽頁面。Collection 瀏覽頁列入 roadmap medium-term（現有 Collection-level pages 條目）。

---

## Decisions Deferred to Production Scope

The following decisions are explicitly out of scope for this portfolio project:
- **Internationalization**: English only for this concept. Production would require i18n for at minimum Norwegian and English given Hub Ocean's Oslo headquarters.
- **Authentication states**: The concept shows the public, unauthenticated view. Authenticated states (private datasets, workspace access) are production scope.
- **BibTeX citation format**: APA only in this concept. BibTeX toggle is production scope.
- **Pagination / infinite scroll**: The STAC API returns all collections in one response. Pagination is production scope for when the catalog grows.
