# Renderer Contract — Growth Loop Engine

**Specification only. No UI implementation.** Visual and decorative treatment belongs to the implementation phase.

**Governs:** the Growth Loop Engine, Tier 1 interactive.
**Depends on:** `ADR-001-evidence-bounded-growth-loop.md`.

---

## 1. Product concept

The component answers **"Can this growth loop actually be evidenced?"**

It does **not** answer *"Here is this product's growth loop."*

This is an intentional analytical feature, not a degraded fallback. Every competing product teardown draws a closed loop, because a closed loop looks authoritative. An interactive that shows a loop failing to close under evidentiary scrutiny — while the company's own filings assert virality — demonstrates more analytical judgment than any complete diagram, and it is the only representation the evidence honestly supports.

---

## 2. Data the renderer consumes

From the derive stage, per loop:

| Field | Source | Use |
|---|---|---|
| Node coordinates, edge paths, leak paths, pulse path | `loop-geometry.ts` | Drawing. The client performs no geometry |
| `edges[].evidenceStatus` | Schema | **Per-edge visual state** |
| `edges[].mechanism` | Schema | Tooltip: the proposed mechanism |
| `edges[].note` | Schema | Tooltip: why this status, especially for `insufficient` |
| `edges[].evidenceIds` / `counterEvidenceIds` | Schema | Evidence chips; both sides when contested |
| `status` | `summariseLoopStatus()` | Loop-level label |
| `counts` | `summariseLoopStatus()` | Legend counts |
| `unresolvedTransitions` | `summariseLoopStatus()` | "What is not established" summary |

The renderer **must not** compute status. It is derived at build time and shipped.

---

## 3. Required communication

### Per transition — four distinguishable states

| Status | Must communicate |
|---|---|
| `evidenced` | The transition is established by cited evidence |
| `partially-evidenced` | Some support exists; the claim exceeds it |
| `contested` | Credible evidence points both ways; **both sides reachable** |
| `insufficient` | **No evidence establishes this transition** |

All four must be distinguishable **without relying on colour alone** — shape, stroke treatment, or an explicit label — so the distinction survives colour-blindness, greyscale, and the light/dark themes.

### Per loop — the status label

`fully-evidenced` · `partially-evidenced` · **`evidence-bounded`** · `contested`

An **evidence-bounded** loop must render the ring as **visibly open**. The break is the content, and it must be identifiable without interaction: a reader who never hovers anything should still see that the loop does not close.

---

## 4. Prohibitions

The renderer must never:

1. Communicate "this product has a growth loop" when the loop status is `evidence-bounded` or `contested`.
2. Render an `insufficient` transition identically to an `evidenced` one, or distinguish them so subtly that the difference is missed at a glance.
3. Visually complete, smooth, animate over, or otherwise conceal a break in the ring.
4. Present a proposed `mechanism` as an established one — mechanism text on an `insufficient` edge is a hypothesis and must read as one.
5. Derive, recompute, or override status client-side.
6. Animate the pulse continuously around an open ring in a way that implies circulation the evidence does not support. Motion on an evidence-bounded loop must stop at, or visibly break at, the unevidenced transition.

Point 6 is the subtlest and the most likely to be violated by accident: the travelling pulse is the component's most attractive feature, and looping it smoothly around a broken ring would assert exactly what the data denies.

---

## 5. Figma as the reference case

Per `research/figma/dossier/11-growth-loop-evidence.md`, Figma resolves to `evidence-bounded`: one transition `evidenced` (Output → Reinvestment), one `partially-evidenced`, four `insufficient`.

The reader should come away understanding that **one link of Figma's loop is well evidenced and the rest are not** — and that the evidenced link is seat expansion inside existing paying accounts, which is not acquisition.

---

## 6. Terminology guardrails

Binding on all rendered copy, labels, tooltips and captions.

| Never write | Write instead |
|---|---|
| "Figma has no growth loop." | "The available evidence does not establish a complete growth loop." |
| "Figma has a network effect." | "The available evidence does not establish the Atlas network-effect test." |
| "Figma does not have a network effect." | *(same as above)* |
| "Disproved" / "no evidence of X" | "The available evidence does not establish X." |

Insufficient evidence is never rendered as disproof.

---

## 7. Accessibility

Carries forward unchanged from the Section 3 specification — HTML button overlay on a presentational SVG, DOM order matching loop order, arrow-key traversal, the mobile stepper as the same DOM restyled.

**Additional requirement:** each transition's evidence status must be present in its accessible name or description, so a screen-reader user receives the same evidential information as a sighted one. An open ring must be announced as open, not merely drawn as open.
