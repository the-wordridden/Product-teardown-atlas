# Figma — Evidence-to-Content Mapping

| | |
|---|---|
| **Stage** | 2B — structural authoring |
| **Session date** | 2026-08-30 |
| **Source of truth** | `research/figma/dossier/` (01, 02, 04–13) |
| **Schema** | `src/schema/` as on disk, incl. ADR-001 |

Where this mapping and any prior conversational summary disagree, the dossier governs.

---

## Classification key

**A — READY TO AUTHOR** · **B — AUTHORABLE WITH QUALIFICATION** · **C — INSUFFICIENT, must remain an evidence gap** · **D — JUDGMENT, requires human analyst decision**

---

## 1. Vitals → `product.json`

| Field | Claim | Class | Evidence | IDs | Boundary | Auth? |
|---|---|---|---|---|---|---|
| slug, name | Identity | FACT | EVIDENCED | — | — | **A** |
| thesis | One-line point of view | JUDGMENT | — | — | Author's framing | **D** |
| founded | 2012 | FACT | EVIDENCED | — | From S010 blog | **A** |
| category | design-collaboration | FACT | EVIDENCED | `cma.market-position.2023` | Corroborated by CMA market definition | **A** |
| stage / ownership | public | FACT | EVIDENCED | — | NYSE: FIG | **A** |
| headquarters | — | — | INSUFFICIENT | — | Not extracted | **C** |
| headcountBand | — | — | INSUFFICIENT | — | Not disclosed in extracted text | **C** |
| platforms | web, api, desktop | FACT | EVIDENCED | — | — | **A** |
| keyMetricIds (≥3) | Headline figures | FACT | EVIDENCED | `revenue.fy2025`, `paid-customers.10k.q2-2026`, `ndr.q2-2026` | — | **A** |

**Blocking:** `headquarters` and `headcountBand` are required non-optional fields with no evidence.

## 2. Problem → `product.json.problem`

| Field | Class | Evidence | Boundary | Auth? |
|---|---|---|---|---|
| beforeState / afterState / wedge | COMPANY CLAIM | PARTIALLY EVIDENCED | Entirely Figma's own 2015 account; no independent pre-2015 source exists | **B** |
| whyNow (trigger: technology) | FACT | EVIDENCED | WebGL demonstration, April 2011, per S003 | **A** |

Authorable only with the company-narrative boundary made explicit in the prose layer.

## 3. Users & Segments → `product.json.users`

| Field | Requirement | Evidence | Auth? |
|---|---|---|---|
| segments (min 2, exactly 1 primary, each with shareBand) | 2–6 required | **INSUFFICIENT** — no segment composition in any source | **C** |
| powerUser (profile + 2–6 behaviours) | required | **INSUFFICIENT** | **C** |
| notFor (min 1) | required | **INSUFFICIENT** | **C** |

`shareBand` would require assigning dominant/major/significant/niche to invented segments. **Blocking.**

## 4. JTBD → `product.json.jtbd`

| Field | Requirement | Evidence | Auth? |
|---|---|---|---|
| jobs (min 2, ≥1 functional) | required | **INSUFFICIENT** | **C** |
| forces (push, pull, anxiety, habit — all four) | required per job | **INSUFFICIENT** | **C** |
| competingAlternatives (min 1 per job) | required | **INSUFFICIENT** | **C** |

Dossier `07`: zero of five JTBD components satisfiable for any candidate. **Blocking.**

## 5. Product → `product.json.product`

| Field | Evidence | Auth? |
|---|---|---|
| coreObjects, coreActions | INSUFFICIENT — product never observed (`08`) | **C** |
| atomicUnitOfValue | INSUFFICIENT | **C** |
| ahaMoment (description + trigger) | INSUFFICIENT | **C** |
| timeToValue | INSUFFICIENT — no activation evidence | **C** |
| keySurfaces (min 2) | PARTIALLY — product names known, purposes not observed | **B** |

**Blocking.**

## 6. Business Model → `product.json.businessModel`

| Field | Class | Evidence | IDs | Auth? |
|---|---|---|---|---|
| models (subscription-seat) | FACT | EVIDENCED | `gtm.two-motions` | **A** |
| valueMetric ("per seat") | FACT | EVIDENCED | `seat.view.free` | **A** |
| revenueLines | FACT | PARTIALLY — total revenue known, no line split | `revenue.fy2025` | **B** |
| pricing.axis / tiers (min 2) | FACT | EVIDENCED | `seat.view.free` | **A** |
| monetizationMoment | FACT | EVIDENCED | `seat.approval-settings`, `seat.upgrade-billing.practitioner` | **A** |
| unitEconomicsShape | INFERENCE | PARTIALLY | `gross-margin.fy2025`, `ai-margin-warning.fy2025` | **B** |

Strongest section. Authorable once the blocking sections above are resolved, since they share one file.

## 7. Growth Loops → `loops.json` ✅ **CREATED**

| Transition | Class | Evidence | IDs |
|---|---|---|---|
| acquisition → activation | — | **INSUFFICIENT** | none (permitted) |
| activation → core-action | FACT | **PARTIALLY EVIDENCED** | `seat.view.free` |
| core-action → output | — | **INSUFFICIENT** | none |
| output → reinvestment | FACT | **EVIDENCED** | `seat.approval-settings`, `seat.upgrade-billing.practitioner`, `ndr.q2-2026`, `paid-customers.10k.q2-2026` |
| reinvestment → acquisition | — | **INSUFFICIENT** | none |

**Derived: `evidence-bounded`.** ADR-001 makes this authorable without fabrication.

## 8. Moats → `strategy.json.moats`

Schema requires **minimum 2 moats**, each with claim, argument, durability verdict and attack vector.

Dossier `12`: four mechanisms EVIDENCED **as capabilities**; **none evidenced as a moat**. Three cannot be assessed at all (§6.4 fails at step 2). Switching costs fail component D across all nine mechanisms.

**C — INSUFFICIENT. Blocking.** Authoring two moats would require converting capability into defensibility, which §6 of the brief explicitly forbids.

## 9. Bets & Tensions → `strategy.json.bets`

Schema requires **minimum 2 bets**, each with all five chain links populated.

| Candidate | Bet | Expected adv. | Trade-off | Result | Tension | Complete? |
|---|---|---|---|---|---|---|
| Browser-native | EVIDENCED | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | ✗ |
| Multiplayer (sequential) | EVIDENCED | UNKNOWN | PARTIAL | UNKNOWN | UNKNOWN | ✗ |
| AI investment & credits | EVIDENCED | PARTIAL | **EVIDENCED** | PARTIAL | **EVIDENCED** | **~1 chain** |
| Public listing / dual-class | EVIDENCED | UNKNOWN | EVIDENCED | EVIDENCED | UNKNOWN | ✗ |

**At most one honest chain. Two are required. C — Blocking.**

Inflections (min 3) *are* satisfiable: 2015 preview release, 2023 transaction termination, 2025 IPO.

## 10. Verdict → `product.json.verdict`

Requires ≥2 getRight, ≥2 getWrong, ≥2 whatIdDoNext, ≥1 openQuestion. All are L5 evaluation → **JUDGMENT by construction**.

**D — requires the human analyst.** Not blocked by evidence; blocked by authorship. This is your section, not mine to invent.

## Strategic Profile → `profile.json`

| Axis | Classification | Evidence | Auth? |
|---|---|---|---|
| distributionMotion | `product-led-hybrid` | EVIDENCED — both motions disclosed | **A** |
| valueMetric | `seats` | EVIDENCED — "sold… per seat" | **A** |
| expansionMechanism | `seats` | EVIDENCED — seat conversion + NDR | **A** |
| buyerUserAlignment | `fully-split` | PARTIALLY — admin approves and is billed for others' upgrades | **B** |
| **moatSource** | — | **INSUFFICIENT** — no moat mechanism evidenced (`12`) | **C** |
| **timeToValue** | — | **INSUFFICIENT** — no activation evidence (`11`) | **C** |

All six axes are required with a mandatory rationale, and **the schema provides no uncertainty stop** — no `unknown`, no optionality. Two axes cannot be classified without invention. **Blocking.**

---

## Summary

| Status | Count |
|---|---|
| **A — Ready** | 14 fields |
| **B — With qualification** | 6 fields |
| **C — Insufficient, blocking** | 19 fields across 5 sections |
| **D — Judgment required** | 5 fields (thesis + verdict) |

**Files authorable now:** `evidence.json`, `loops.json`.
**Files blocked:** `product.json`, `profile.json`, `strategy.json`.
