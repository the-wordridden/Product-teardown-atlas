# Figma — Stage 2B Authoring Decisions

Every meaningful judgment call made translating dossier evidence into structured content.

---

## D1 — Loop named for what is evidenced, not what is hoped

`collaboration-seat-expansion`, not "multiplayer viral loop." The only established transition is seat expansion inside a paying account. Naming the loop after an unevidenced viral mechanism would assert in the identifier what the data denies.

## D2 — Loop `type` set to `usage`, not `viral`

`viral` would encode the company's own unevidenced claim into a typed, comparable field that feeds the Compare engine. `usage` describes what is evidenced: consumption inside accounts driving expansion. **This is a consequential choice** — loop type is a comparison facet, so it will show up in every future comparison against Figma.

## D3 — Node `detail` written descriptively, not assertively

Nodes carry no `evidenceStatus` (only edges do), so node text is the one place unevidenced assertion could leak in. Every node detail either states documented fact or explicitly says what is not established — e.g. the output node reads "The proposed output is… No source establishes that work product circulates to non-users."

**Architectural note:** this is a schema gap. Nodes should arguably carry evidence status too. Raised for approval; **schema not modified.**

## D4 — `strength: weak` on unevidenced edges

`strength` describes how forceful a mechanism is; `evidenceStatus` describes how well we know it. They are orthogonal, and a "strong / insufficient" edge would be defensible in principle. I used `weak` on all insufficient edges to avoid the reader inferring confidence from strength.

This is the ambiguity flagged as open question H1 in Stage 2A. **The choice is conservative, not principled**, and a decision on `strength`'s meaning would settle it properly.

## D5 — Speed band `weeks` with a note denying it

`speed.band` is a required enum with no uncertainty value. `weeks` is the least-committal middle value, and the accompanying note states plainly: "Not established." **A required enum forced a value the evidence does not support** — the same schema gap as the Strategic Profile axes, in a smaller form.

## D6 — Practitioner forum evidence typed as `product-observation`

The `SOURCE_TYPES` enum has no value for user-generated practitioner reports. `product-observation` is the closest fit; the note records that it is Tier 5 practitioner evidence admitted under methodology §2.4, with the corroboration and the boundary stated. **Possible schema vocabulary gap.**

## D7 — Derived gross margins marked `estimated`, sourced to `personal-analysis`

FY2024 88.3% and FY2025 82.4% are arithmetic on audited figures. They are not disclosed numbers, so they cannot be `verified` — the schema correctly refuses `verified` on `personal-analysis`. Both carry the mandatory derivation note, and the FY2024 entry records that the widely circulated 92% figure does not reconcile.

## D8 — Press-release figures marked `reported`, 10-K figures `verified`

Both are regulated disclosures, but the 10-K is audited and the release is not. Customer counts and NDR are therefore `reported`; revenue, cost of revenue, R&D and voting power are `verified`.

## D9 — Evidence reused, not duplicated

`ndr.q2-2026` is referenced by both the reinvestment node and the output→reinvestment edge. One id, one as-of date, one note — so the figure cannot drift between uses.

## D10 — No pattern references attached

Every `patterns` array is empty. `content/patterns/` does not exist, so any `PatternRef` would fail XREF001. Pattern tagging waits until the vocabulary exists.

## D11 — Voting power carries its as-of date in the claim text

`voting-power.field` is 72.3% **as of 2025-12-31**, with a note recording that the filing says it may increase. A ~73.6% figure has been referenced elsewhere as the immediately-post-IPO number; that is a **period difference, not a conflict**, and confirming it needs the S-1, which sec.gov blocks.

## D12 — Stopped rather than authored three files

`product.json`, `profile.json` and `strategy.json` were **not created**. Each would have required invention at a schema-required field:

| File | Would have required |
|---|---|
| `product.json` | 2 user segments with share bands, a power-user profile, 2 JTBD jobs with 16 forces, core objects and actions, an aha moment, 2 getRight and 2 getWrong judgments |
| `profile.json` | A `moatSource` classification with no evidenced moat, and a `timeToValue` classification with no activation evidence |
| `strategy.json` | 2 moats where none is evidenced, and 2 complete bet chains where at most one exists |

Per brief §10, this is a stop condition, and per §10 the schema was **not** modified to accommodate it.

## D13 — MDX sections not created

`sections/` remains empty. The schema does not make MDX structurally mandatory at this stage; the ten-file requirement is enforced by cross-document rule XREF007 in the derive stage, which runs against a complete product. Since `product.json` is blocked, MDX would be premature.

---

## Stage 2B.3 decisions (product.ts extension)

**D14 — Direction named fields that do not exist; intent applied to real ones.** The approval referenced `verdict.positives`, `verdict.risks` and `Job.desiredOutcome`; the actual schema has `getRight`/`getWrong` and no `desiredOutcome`. The amendment was applied to the actual fields, per the standing rule that the repository is authoritative over conversational descriptions.

**D15 — Verdict optional; internal floors kept.** Optionality solves the compulsion problem (pending judgment ≠ missing evidence). But a verdict an analyst chooses to write must still meet the 2+2 bar — a verdict with no criticism is a review. WARN013 gates publication instead of the validator.

**D16 — Conditional invariants.** "Exactly one primary segment" and "at least one functional job" now apply only to non-empty collections. The rules retain full force the moment content exists.

**D17 — Thesis is provisional JUDGMENT awaiting approval.** `thesis` is required and is L5. I wrote an evidence-anchored one — "…whose one evidenced growth engine is seat expansion inside existing accounts — not the product virality its own filings claim" — as a placeholder candidate. **It is the analyst's to accept, rewrite or reject**, and is flagged in the final report.

**D18 — keySurfaces populated from the 10-K, not observation.** Six surfaces with purposes drawn strictly from the filing's own seat descriptions plus one direct observation (Community). Deeper mechanics (coreObjects, coreActions, ahaMoment) left empty/omitted — those require the blocked product observation.

**D19 — Three evidence entries added from already-verified dossier sources** (`pricing.list.2026`, `hq.10k`, `product-surface.10k`). No new research: all three URLs were opened during Stage 1.

## The underlying contradiction

The blocked files share one cause. The schema encodes **rigor floors** — minimum 2 segments, 2 jobs, 2 moats, 2 bets, 6 mandatory profile classifications — designed to force depth and prevent thin content.

Against a product whose evidence genuinely runs out, those floors invert: they stop enforcing rigor and start **compelling invention**. A validator that fails until you write two moats is a validator that will eventually be satisfied with two invented moats.

This was flagged as unresolved decision #6 when Section 6 was locked, and deferred. Figma is the case that forces it.
