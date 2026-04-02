# Accessibility Color Audit — Hub Ocean Brand Palette

**Standard:** WCAG 2.1 AA
**Auditor role:** a11y-reviewer
**Date:** 2026-04-02
**Scope:** Color contrast only. Motion, focus, and screen-reader audits are out of scope for this document.

---

## 1. WCAG 2.1 AA Thresholds

| Use case | Minimum ratio |
|---|---|
| Normal text (< 18pt / < 14pt bold) | 4.5:1 |
| Large text (≥ 18pt / ≥ 14pt bold) | 3:1 |
| UI components & graphical objects | 3:1 |

AAA thresholds (7:1 for text, 4.5:1 for large text) are noted where achieved but not required.

---

## 2. Source Palette

| Token name | Hex | Description |
|---|---|---|
| `purple-950` | `#200A3A` | Deepest purple-black (primary background) |
| `purple-800` | `#382066` | Deep purple (secondary background, nav) |
| `purple-600` | `#6918F1` | Brand violet (original) |
| `cyan-400` | `#02FFD1` | Brand cyan (accent, CTA) |
| `gray-300` | `#BBBBBB` | Light gray (secondary text) |
| `gray-200` | `#D8D3D3` | Lighter gray |
| `gray-50` | `#F5F5F5` | Near-white |
| `white` | `#FFFFFF` | Pure white |
| `black` | `#000000` | Pure black |

---

## 3. Contrast Audit

### 3.1 Text on Dark Backgrounds

| Foreground | Background | Ratio | Text AA | Large AA | Notes |
|---|---|---|---|---|---|
| `#F5F5F5` | `#200A3A` | **16.52:1** | ✅ AAA | ✅ AAA | Primary body text on darkest bg |
| `#F5F5F5` | `#382066` | **12.30:1** | ✅ AAA | ✅ AAA | Body text on nav/card bg |
| `#FFFFFF` | `#200A3A` | **18.10:1** | ✅ AAA | ✅ AAA | Pure white, always safe on dark bgs |
| `#FFFFFF` | `#382066` | **13.48:1** | ✅ AAA | ✅ AAA | |
| `#BBBBBB` | `#200A3A` | **9.38:1** | ✅ AAA | ✅ AAA | Acceptable for secondary/metadata text |
| `#BBBBBB` | `#382066` | **6.98:1** | ✅ AA | ✅ AAA | Use only for secondary text; do not use for interactive labels |
| `#02FFD1` | `#200A3A` | **13.92:1** | ✅ AAA | ✅ AAA | Cyan accent text on darkest bg |
| `#02FFD1` | `#382066` | **10.36:1** | ✅ AAA | ✅ AAA | Cyan accent text on nav bg |
| `#6918F1` | `#200A3A` | **2.57:1** | ❌ FAIL | ❌ FAIL | **Brand violet fails on all dark bgs** |
| `#6918F1` | `#382066` | **1.92:1** | ❌ FAIL | ❌ FAIL | **Worst case — avoid entirely as text** |

### 3.2 Text on Light Backgrounds

| Foreground | Background | Ratio | Text AA | Notes |
|---|---|---|---|---|
| `#200A3A` | `#F5F5F5` | **16.52:1** | ✅ AAA | Dark text on light bg for light-mode elements |
| `#200A3A` | `#FFFFFF` | **18.10:1** | ✅ AAA | |
| `#200A3A` | `#02FFD1` | **13.92:1** | ✅ AAA | Dark text on cyan CTA button |
| `#382066` | `#F5F5F5` | **12.30:1** | ✅ AAA | |
| `#6918F1` | `#FFFFFF` | **5.17:1** | ✅ AA | Brand violet is usable as text **only on white** |
| `#6918F1` | `#F5F5F5` | **4.89:1** | ✅ AA | Brand violet passes on near-white |

### 3.3 UI Components (borders, icons, decorative elements — 3:1 threshold)

| Foreground | Background | Ratio | UI AA | Notes |
|---|---|---|---|---|
| `#6918F1` | `#200A3A` | **2.57:1** | ❌ FAIL | Original violet fails as border/icon on dark bg |
| `#6918F1` | `#382066` | **1.92:1** | ❌ FAIL | |
| `#02FFD1` | `#200A3A` | **13.92:1** | ✅ | Cyan is safe for icons and borders |
| `#BBBBBB` | `#200A3A` | **9.38:1** | ✅ | Gray decorative elements are safe |

---

## 4. Problem Summary

### 4.1 Critical: `#6918F1` (brand violet) on dark backgrounds

**Problem:** The original brand violet (#6918F1) has insufficient luminance contrast against both dark purple backgrounds. At 2.57:1 on `#200A3A` and 1.92:1 on `#382066`, it fails all WCAG thresholds — text, large text, and UI components.

**Root cause:** Both the violet and the dark purple sit in a similar mid-to-dark luminance band. The hue contrast is visually striking but does not translate to sufficient lightness contrast.

**Why this matters for ODP:** The catalog serves researchers, scientists, and government users — groups that include people with low vision, color vision deficiency (particularly red-green, which does not affect blue-violet discrimination but does depend on luminance contrast). Using violet decoratively where it carries meaning (e.g., active nav state, focus ring) would create inaccessible experiences.

---

## 5. Resolution

### 5.1 Strategy: Lightened violet for dark-background usage

Rather than abandoning the brand violet, we derive a lightened variant by increasing HSL lightness until the 3:1 UI component threshold is met against `#200A3A`. This preserves brand identity while meeting compliance.

| Variant | Hex | Ratio on `#200A3A` | Ratio on `#382066` | Passes |
|---|---|---|---|---|
| Original | `#6918F1` | 2.57:1 | 1.92:1 | ❌ |
| L=64% | `#9852F4` | 4.16:1 | 3.10:1 | ✅ UI only (3:1) — marginal on `#382066` |
| L=72% | `#B582F7` | 6.01:1 | 4.47:1 | ✅ UI + large text |
| L=80% | `#D4B3FA` | 8.92:1 | 6.63:1 | ✅ All text (AAA on `#200A3A`) |

**Decision:** Introduce two adjusted violet tokens:

- **`purple-400` = `#B582F7`** — used for UI elements (icons, borders, badges) and large/heading text on dark backgrounds. Achieves 6.01:1 on `#200A3A` (AA for all text) and 4.47:1 on `#382066` (AA for all text).
- **`purple-600` = `#6918F1`** — retained in the primitive palette but **restricted** to use on white/near-white backgrounds only, where it achieves 5.17:1 (AA).

**What we do NOT do:** We do not use `#6918F1` anywhere on dark backgrounds, even decoratively. Decorative elements that convey no meaning are exempt from WCAG contrast requirements, but in a data catalog, most color usage conveys state (hover, active, tag category) — so the exemption rarely applies.

### 5.2 Cyan `#02FFD1` — no adjustment needed

Cyan achieves 13.92:1 on `#200A3A` and 10.36:1 on `#382066`. It is safe for all uses including small body text, though it should be used purposefully (CTAs, data highlights) rather than as body text color, for visual hierarchy reasons.

---

## 6. Approved Color Pairings

The following pairings are approved for use in the design system. Any pairing not listed here must be audited before use.

### Dark UI (primary surface)
| Text/element color | Background | Ratio | Use |
|---|---|---|---|
| `#F5F5F5` | `#200A3A` | 16.52:1 | Body text, labels |
| `#FFFFFF` | `#200A3A` | 18.10:1 | Headings, emphasis |
| `#BBBBBB` | `#200A3A` | 9.38:1 | Secondary/metadata text |
| `#02FFD1` | `#200A3A` | 13.92:1 | CTA text, active indicators |
| `#B582F7` | `#200A3A` | 6.01:1 | Tags, badges, decorative borders |
| `#200A3A` | `#02FFD1` | 13.92:1 | Text on cyan button |

### Secondary surface
| Text/element color | Background | Ratio | Use |
|---|---|---|---|
| `#F5F5F5` | `#382066` | 12.30:1 | Body text |
| `#FFFFFF` | `#382066` | 13.48:1 | Headings |
| `#BBBBBB` | `#382066` | 6.98:1 | Secondary text only |
| `#02FFD1` | `#382066` | 10.36:1 | Accent elements |
| `#B582F7` | `#382066` | 4.47:1 | Tags, icons |

### Light surfaces (modal overlays, print, light-mode fallback)
| Text/element color | Background | Ratio | Use |
|---|---|---|---|
| `#200A3A` | `#FFFFFF` | 18.10:1 | Body text |
| `#200A3A` | `#F5F5F5` | 16.52:1 | Body text |
| `#6918F1` | `#FFFFFF` | 5.17:1 | Brand violet text/icons on white |
| `#200A3A` | `#02FFD1` | 13.92:1 | Button label on cyan |

---

## 7. Open Items

| ID | Issue | Owner | Priority | Status |
|---|---|---|---|---|
| A11Y-01 | Focus ring color not yet audited — needs 3:1 against adjacent colors | a11y-reviewer | High | Open |
| A11Y-02 | Error/warning/success semantic colors not yet defined | ui-designer | High | **Resolved 2026-04-02** |
| A11Y-03 | `#D8D3D3` has no defined use cases — audit if adopted | a11y-reviewer | Low | Open |

### A11Y-02 Resolution

Feedback colors defined and verified in `src/styles/tokens.css` (Layer 1 primitives + Layer 2 semantic):

| Color | Hex | Usage pattern | Ratio | Result |
|---|---|---|---|---|
| Success | `#34d399` | Text on `#200A3A` | 9.37:1 | ✅ AA |
| Success | `#34d399` | Text on `#382066` | 6.97:1 | ✅ AA |
| Success badge | `#200A3A` on `#34d399` | Label on badge bg | 9.37:1 | ✅ AA |
| Warning badge | `#200A3A` on `#fbbf24` | Label on badge bg | 10.79:1 | ✅ AA |
| Error badge | `#200A3A` on `#f87171` | Label on badge bg | 6.51:1 | ✅ AA |
| Info | `#02FFD1` on `#200A3A` | Text on dark bg | 13.92:1 | ✅ AA |

Badge pattern: dark text (`--color-text-on-feedback: #200a3a`) on colored pill background.
Inline text pattern: colored text on dark surface background.
Both patterns pass WCAG 2.1 AA at minimum 4.5:1 for normal text.
