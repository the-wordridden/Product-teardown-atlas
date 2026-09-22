# Notion — Stage 2 Authoring Decisions

Structured files drafted 2026-09-22 from the Stage 1 dossier (22 sources, gate in `dossier/05-stage-1-gate.md`). Staged in `research/notion/stage-2/content/` until Stage 3 prose exists, because the site loader treats any folder under `content/products/` as publishable and fails the build on missing sections (XREF007). Validate with `npm run validate:staged -- research/notion/stage-2/content`.

**Result:** 37 evidence entries · 4 segments · 2 jobs · 3 bets · 1 moat · 6 inflections · loop `evidence-bounded` (1 evidenced, 3 partially, 1 insufficient).

---

## Decisions that could have gone the other way

| # | Field | Decision | Why | Alternative rejected |
|---|---|---|---|---|
| 1 | `thesis` | "Notion's template gallery is the best documented conversion surface in software and the least documented acquisition channel. The company published 51 million duplications and never once said how many were new." | Both halves are sourced: the funnel is evidenced step by step, and the missing split is a real absence confirmed across four passes. The thesis is about what the evidence does and does not contain, which is the most defensible claim available | "Notion's template gallery is its acquisition engine": that is the brief's framing and the evidence does not support the word *acquisition* |
| 2 | `vitals.founded` | 2013, **flagged as the one unsourced field** | No opened source states it. Notion's About page carries no numbers, its blog index has no founding post, and the funding coverage that was opened does not mention it. 2013 is what secondary sources agree on, and the schema requires a year. **The Vitals prose must say this field is not sourced to the same standard as the rest** | Guessing from the 2019 launch thread, which would be wrong, or from the 2021 Series C, which does not state it |
| 3 | `vitals.headcountBand` | `unestablished` | No primary source. Aggregators say ~1,000 and none is admissible (C3) | Inferring from aggregators |
| 4 | `keyMetricIds` | ARR, valuation, duplications, gallery scale | The four numbers that frame the company, two `reported`, one `reported`, one `verified` by observation. Each tile shows its own confidence | Using an aggregator user count as a headline: none is admissible, and Notion publishes none itself |
| 5 | `accent` | `#0F0F0F` | Notion's identity is black and white, deliberately unbranded. The brand entry will need a non-colour motif to carry it | A colour pulled from the marketing site would be invented |
| 6 | `users.segments[0]` primary | Individuals and students, `major` | The observable evidence points here: the gallery's largest categories by a wide margin are Personal Planner (9,530) and Student Life (7,472), and individuals are free forever. This is the group that fills the funnel and produces no revenue | Making small teams primary: that is where the money is, but the evidence for population size points the other way. The description says so explicitly |
| 7 | `users.segments` includes template creators | Yes, `niche` | 22,116 creator profiles are a distinct population that is simultaneously user, supplier and channel. Omitting them would hide the loop's supply side | Folding them into individuals: loses the mechanism |
| 8 | `jtbd.jobs` | Two, both from the January 2019 corpus | Every force is quotable from one dated thread. Both jobs carry that limitation in the prose | Adding a third job for AI: no first-hand account exists, only Notion's product claims |
| 9 | `product.ahaMoment` | Omitted | No source establishes a moment or a trigger. Duplicating a template is instant, but nothing observes what happens next | Inferring "the moment a template lands in your sidebar": plausible, unobserved |
| 10 | `product.timeToValue` | `unestablished` | Nobody measures signup to useful workspace, and the product behind the wall was not observed | Inferring "minutes" from the duplication mechanism |
| 11 | `businessModel.monetizationMoment` | "Inviting the second person" | This is the sharpest true sentence in the file. The cap is not a volume limit: one member is unlimited, two members get 1,000 blocks [S002, S001] | "Hitting 1,000 blocks": describes the symptom, not the trigger |
| 12 | `businessModel.models` | freemium + subscription-seat + subscription-tier | All three operate: unlimited free for one, per-member pricing, and feature tiers that gate AI and SSO | Just `freemium`: loses the seat mechanic that actually converts |
| 13 | `profile.distributionMotion` | `bottom-up-end-user` | Entry is an individual arriving from search and signing up to take a template. No sales motion appears anywhere in the record | `product-led-hybrid`: Enterprise exists but nothing evidences a sales motion, unlike Stripe where UK headcount showed one |
| 14 | `profile.valueMetric` | `seats` | Paid plans are per member, and the free cap is a seat trigger dressed as a usage meter | `usage`: the block cap looks like usage but is not priced as it |
| 15 | `profile.moatSource` | `switching-costs` | Two independent accounts of export friction, 2019 and 2021, plus lock-in anxiety cited by a third user, against a block-native structure no other format holds | `unestablished`: would discard corroborated friction. The rationale states the consequence is unmeasured |
| 16 | `loops` type | `content` | The loop runs on published artefacts that rank in search and are consumed by strangers. That is a content loop, not virality between users | `viral`: no user-to-user invitation mechanism is evidenced. `ecosystem`: the creator layer is real but the loop's motion is content |
| 17 | Edge `activation → core-action` | **`evidenced`**, strength `strong` | The only `evidenced` transition in either private-company teardown so far. Documented by Notion ("you'll be prompted to sign in or create an account first") and corroborated by direct observation of the button routing to the wall | `partially-evidenced`: would understate a company-documented, independently observed mechanism |
| 18 | Edge `core-action → output` | `insufficient`, with two counter-evidence ids | Nothing measures retention after duplication. The only independent post-adoption evidence runs the other way: flexibility as cognitive overhead, and teams leaving over performance | `partially-evidenced` on gallery growth: creator growth does not evidence that duplicators stayed |
| 19 | Edge `reinvestment → acquisition` | `partially-evidenced`, `moderate` | Two dated scale figures and one traffic estimate. The note states the causal direction is unestablished, and that Notion's own post frames the gallery as a showcase, not a channel | `evidenced`: the growth is real but its cause is not shown |
| 20 | `bets[1].status` (free for individuals) | `paid-off` | The only `paid-off` bet in the Atlas so far, and it earns it: the cap was lifted in 2020, and the gallery went from 600 templates to 30,000+ and 2,000 creators to 22,000+ | `mixed`: the costs are real (sharding, unbounded free population) but the stated result is unambiguous |
| 21 | `bets[0]` current tension (AI) | "the bet is unfalsifiable from outside" | This is the honest observation: if AI is bundled into a tier, AI revenue cannot be separated, and Notion's own sentence counts customers rather than revenue | Asserting that AI revenue is or is not half: neither is supported |
| 22 | `moats[0].durability` | `copyable-with-sustained-effort` | Several Notion-alternative products exist and are well regarded; none has been shown to move a real workspace cleanly. The moat is the fidelity gap, not the idea | `structurally-hard`: overstates a barrier that is an engineering problem |
| 23 | `inflections` | Five, chronological: 2020, 2023, 2024, 2025, 2026 | Each has an opened source and a stated consequence. The 2020 entry rests on a contemporaneous quotation of Notion's own FAQ inside an HN thread, the archive being unavailable | A founding inflection: no dated company source exists |
| 24 | `display` fields | Six headline figures | Presentation only; `value` keeps the source's wording | — |

## What the structured files deliberately do not say

- That the gallery **acquires** users. Every field says converts, or states the split is unknown.
- Any user or customer count. Notion publishes none, including on its own About page, and that absence is itself an evidence entry (`notion.no-numbers`).
- That half of Notion's revenue comes from AI. Both wordings are in the registry as separate entries, never merged (C1).
- Any creator earnings. No admissible source exists.
- Any acquisition price. None disclosed for Skiff, Flowdash, Cron or Automate.io.

## Late additions from a final sweep of Notion's own blog

Four entries were added after the first validation pass, found by reading Notion's blog index rather than by search:

- **`crdt.architecture.2026`** (2026-09-18, three days before cutoff). Notion's engineering post on concurrent editing: pages "consist of several blocks, each stored as a separate database record"; the CRDT is "based on a classic sequence CRDT called Replicated Growable Array"; it replaced last-write-wins, under which "one person's edits would be completely lost"; deployed July 2025 and described as "one of the largest CRDT deployments in the world, as we process millions of CRDT operations every minute". **This is the only first-party scale figure Notion publishes anywhere.**
- **`crdt.limitation.2026`**, against-interest: "A limitation of this design is that you may need to potentially fetch many blocks in order to find a particular text slice", plus tombstoned deletions.
- **`acquisition.zeroentropy.2026`** (2026-07-24), a fifth acquisition, folded into the acquisitions bet.
- **`funding.series-c.2021`**, which produced a sixth inflection and the observation that the valuation moved from $10B in 2021 to $11B in 2026.

**Cross-teardown note for the patterns layer:** Notion uses a true CRDT; Figma explicitly rejected them, running a central server authority instead and calling operational transforms "unnecessarily complex for our problem space". Two collaborative editors, opposite architectural choices, both documented by their own engineers. That is a comparison the Atlas is built to make.

## Three entries unreferenced by the structured files

`desktop.meeting-detection.2025`, `crdt.architecture.2026` and `crdt.limitation.2026`, all held for the Product prose in Stage 3.
