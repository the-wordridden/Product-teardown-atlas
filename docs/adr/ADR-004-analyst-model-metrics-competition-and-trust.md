# ADR-004: Analyst's model first, proposed metrics, competition, and one trust box

**Status:** Accepted, 2026-09-24
**Amends:** `src/schema/product.ts`, `src/schema/loop.ts` (locked schemas), `docs/renderer-contract-growth-loop.md` (v1.2)
**Builds on:** ADR-001, ADR-003

## Context

After ADR-003, a second review from the intended reader's point of view (product aspirants, PMs preparing for interviews) found the pages were more honest but still hard to use:

- **The growth loop still led with its evidence.** A reader opening the chain met dotted lines and "not established" before learning how the product is meant to grow. An interview answer starts from a model and then qualifies it. The page did the reverse.
- **Nothing to measure.** The teardowns said what could not be verified, but never what a PM in the seat would watch. "What's your north star?" and "how would you know this link works?" are the most common follow-ups in a product interview, and the pages had no answer to either.
- **No competitors.** Every teardown discussed defensibility without naming who the product actually loses deals to.
- **Caveats everywhere.** Evidence limits were restated in nearly every section, in `EvidenceGap` blocks, standfirsts and verdict "open questions". A reader got the same warning six times and the insight once.
- **Too long.** About 5,000 to 6,000 words per teardown, most of it qualification.
- **Walls of text** where the content is structural: four forces, a pricing ladder, segment sizes, a sequence of turning points.

## Decision

1. **`loops.edges[].watch`** (optional `Line`): the metric the analyst would watch to know this link is working. It is a proposal, not a finding, and is rendered under "The metric I would watch" in the link detail. Every edge on all three products has one.
2. **`metrics`** (optional): `{ northStar, activation }`, each `{ name, definition, why }`. Rendered as "Metrics I'd propose" above the chain and labelled as the analyst's proposal. They carry no evidence ids by design: nothing public measures them, which is the point.
3. **`competition`** (optional, 2 to 6): `{ name, theyWin, weWin, evidenceIds }`. Rendered as a table in the Moats section. Each row may cite evidence; the loader's XREF check covers the ids. Where a row has no ids it is analyst judgment and reads as such.
4. **`ceiling`** (optional, two sentences): the evidence ceiling for the whole page. It is rendered with `brief.unverified` and `verdict.openQuestions` in a single collapsible **"How far to trust this page"** box near the top, with the key to the confidence marks. Sections no longer restate these caveats; `EvidenceGap` blocks were removed from prose where the box now carries them.
5. **Growth chain v1.2: the model first.** The default view draws the analyst's model: every link a confident arrow, the evidence mark on each, a "not yet shown" tag and a faded line on insufficient links, and a proven / documented / not yet shown count in the header. One click switches to the evidence view, the pattern-encoded drawing of v1.1. See the contract amendment for why this still satisfies §3 and §4.
6. **Prose cut by about 45%.** Figma 4,789 to 2,644 words, Stripe 6,138 to 3,087, Notion 5,349 to 2,883. Each section now opens with its insight. No claim was added in the cut; claims were removed or compressed, and every `<Evidence id>` still resolves.
7. **Diagrams replace text boxes** where the content is structural: segment bars (relative size, labelled "our estimate"), a four-forces quadrant per job, a pricing ladder plus revenue-mix bars, and an inflection timeline. Bar widths come from the schema's coarse `shareBand`, never from invented numbers.
8. **Screenshots** are public, logged-out captures of the product's own pages, stored as WebP with a `screens.json` caption file per product, and credited in place with the source URL and capture date. A page that refuses automated capture (Figma Community returned a CDN 403) is not captured by other means; it is simply omitted.
9. **Homepage** replaces the per-product "in brief" blocks, which grew linearly with the catalogue, with one side-by-side comparison table built from `brief` and the key metrics.
10. **Mobile** gets a sticky section menu showing the current section, replacing the ten-item rail that pushed content two screens down.

## Consequences

- `watch`, `metrics` and the `competition` prose are L5 judgment in the methodology's claim ladder. They must never be cited as findings, and new teardowns must label them the same way.
- A new product teardown is expected to populate `watch` on every edge, plus `metrics`, `competition` and `ceiling`. They stay optional in the schema so a teardown in progress still validates.
- Because caveats live in one box, a section that becomes less certain must update `ceiling` or `brief.unverified` in the same commit, not add a paragraph.
- Shorter prose raises the bar on each sentence: an insight that can't survive compression was probably qualification.
