# ADR-001 — Evidence-Bounded Growth Loop

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-08-30 |
| **Supersedes** | The growth-loop portion of the Section 6 schema decision |
| **Number** | 001 — first numbered ADR in the repository. The twelve decisions in the Section 4 ADR table are not individually numbered and are unaffected |

---

## 1. Context

The Atlas models every product's growth loop on a frozen five-role ring — Acquisition → Activation → Core Action → Output → Reinvestment → Acquisition. The fixed geometry is what makes two structurally different products visually comparable, and it is deliberately not extensible.

The first product researched under the locked methodology was Figma. Stage 1 research produced a result the schema could not represent.

## 2. Original architectural decision

`src/schema/loop.ts` enforced three structural invariants, and one of them carried an unexamined assumption:

1. Exactly five nodes, one per canonical role.
2. **The ring must close** — all five canonical transitions present, or the build fails.
3. Edges reference existing roles and never point at themselves.

The original error message stated the assumption plainly: *"A loop that does not return to acquisition is a funnel, not a loop."*

The assumption was that **an author who can describe a loop has established that loop**. Structural closure was treated as though it carried evidential weight.

## 3. Evidence that exposed the limitation

Stage 1C tested every canonical transition for Figma against opened primary and practitioner sources (`research/figma/dossier/11-growth-loop-evidence.md`):

| Transition | Status |
|---|---|
| → Acquisition | INSUFFICIENT |
| Acquisition → Activation | INSUFFICIENT |
| Activation → Core Action | PARTIALLY EVIDENCED |
| Core Action → Output | INSUFFICIENT |
| Output → Reinvestment | **EVIDENCED** |
| Reinvestment → Acquisition | INSUFFICIENT |

The one evidenced transition is a documented, practitioner-corroborated seat-expansion mechanism operating **inside an existing paying account** — expansion, not acquisition. Figma's own 10-K asserts "product virality inherent to Figma's collaborative and browser-based platform"; a dedicated research pass found no attribution, conversion path, or case evidence for it.

The schema offered an author exactly two options: **invent the four missing mechanisms**, or **omit the product**. Both are unacceptable. The first fabricates evidence to satisfy a validator — the precise failure the methodology exists to prevent. The second discards a well-evidenced negative result.

## 4. Decision

**Separate structural validity from evidence status.**

- The canonical five-role ring **remains structurally required**. All five transitions must be present as edges. The roles remain frozen; `retention`, `monetization`, `viral`, `expansion` and any other substitute continue to fail validation.
- **Every transition carries its own `evidenceStatus`**: `evidenced` · `partially-evidenced` · `contested` · `insufficient`.
- **A structurally present edge is never evidence.** A loop may be structurally complete and evidentially open.
- **Loop-level status is derived at build time**, never authored.

Enum values are kebab-case and edge endpoints remain `from`/`to`, following existing repository conventions rather than introducing parallel terminology.

## 5. Schema implications

`LoopEdge` gains four fields:

| Field | Type | Obligation |
|---|---|---|
| `evidenceStatus` | enum | Required |
| `counterEvidenceIds` | evidence id list | Required non-empty when `contested` |
| `note` | ≤400 chars | Optional — encouraged for `insufficient` |
| *(existing)* `evidenceIds` | evidence id list | Required non-empty when `evidenced` or `partially-evidenced`; **no obligation when `insufficient`** |

That last exemption is load-bearing. Requiring citations to record an absence would push authors toward inventing a mechanism to satisfy the validator — reintroducing the defect through the back door.

Structural invariants are otherwise unchanged. The ring-closure message was rewritten to instruct authors to mark a transition `insufficient` rather than omit or invent it.

## 6. Derivation implications

`src/derive/loop-status.ts` computes loop status by first-match precedence:

1. any `contested` → **contested**
2. any `insufficient` → **evidence-bounded**
3. any `partially-evidenced` → **partially-evidenced**
4. all `evidenced` → **fully-evidenced**

**Contested outranks evidence-bounded** because a transition where credible evidence points both ways is a stronger and more urgent signal than an absence: it demands resolution, whereas an absence demands disclosure. A loop that is both is reported as contested, because the conflict is what changes an author's next action.

Two non-blocking warnings are emitted — `WARN007` (evidence-bounded) and `WARN008` (contested). Neither fails the build: an evidence-bounded loop is a legitimate analytical result, not a content defect (methodology §4.16).

## 7. Renderer implications

Specified in `docs/renderer-contract-growth-loop.md`. In summary: the renderer must consume and visually distinguish all four transition statuses, must show the ring as visibly open where transitions are insufficient, and must never communicate "this product has a growth loop" when the evidence establishes only part of the mechanism.

## 8. Backward compatibility

**No migration is required.** No `content/` directory exists and no `loops.json` file has been authored anywhere in the repository. The schema change is purely additive to a contract with zero instances.

Were content to exist, `evidenceStatus` being required and non-defaulted would fail every existing edge — a deliberate choice, since silently defaulting to `evidenced` would assert conclusions no author made, and defaulting to `insufficient` would silently weaken established claims. Migration would require an explicit per-edge decision, which is the correct cost.

## 9. Alternatives considered

**(a) Relax ring closure — allow edges to be omitted.** Rejected: omission is ambiguous. A missing edge cannot be distinguished from an unconsidered one, and the renderer loses the fixed geometry that makes products comparable.

**(b) Author-entered `isBroken` boolean.** Rejected: duplicates the evidence model, invites disagreement with the transition data, and expresses at loop level something only meaningful per transition.

**(c) Manually authored `loopStatus`.** Rejected: lets a teardown assert a stronger conclusion than its own transitions support. Status must be derived.

**(d) Keep the invariant; exclude products whose loops cannot be evidenced.** Rejected: would have excluded the first product researched, and discards the finding that a company's growth narrative outruns its evidenced mechanism.

**(e) Confidence score per edge (0–1).** Rejected on the same grounds as the numeric Strategic Profile scorecard: unfalsifiable precision. Named statuses can be argued with; 0.6 cannot.

## 10. Rejected alternatives — summary

| Alternative | Why rejected |
|---|---|
| Omit unevidenced edges | Ambiguity; loses fixed geometry |
| `isBroken` boolean | Duplicates the evidence model |
| Manual `loopStatus` | Permits unsupported conclusions |
| Exclude unevidencable products | Discards the strongest finding |
| Numeric confidence | False precision |

## 11. Consequences

**Positive.** A product can be represented honestly without fabrication. The flagship interactive gains a genuine analytical question — *can this loop be evidenced?* — rather than a decorative diagram. Evidence obligations now scale with claim strength inside the schema itself. The Figma teardown becomes authorable.

**Negative.** Authoring cost rises: every transition needs an evidence judgment. Loops are no longer directly comparable on structure alone, since two structurally identical rings may differ entirely in evidential status — though that difference is itself the more interesting comparison. The renderer is more complex, needing four visual states rather than one.

**Neutral.** Comparison facets `growth-loop-shape` and `growth-loop-type` are unaffected. A future `growth-loop-evidence` facet becomes possible but is out of scope here.

**Unchanged.** Network effect, switching cost, retention and expansion economics remain distinct concepts and none becomes a loop role. The Evidence methodology, Pattern taxonomy and the six Strategic Profile axes are untouched.
