# Stripe — Stage 2 Authoring Decisions

Structured files drafted 2026-09-22 from the Stage 1 dossier (42 sources, gate in `dossier/05-stage-1-gate.md`). Files live in `research/stripe/stage-2/content/` until Stage 3 prose exists, because the site loader treats any folder under `content/products/` as publishable and fails the build on missing sections (XREF007). Validate with `npm run validate:staged -- research/stripe/stage-2/content`.

**Result:** 62 evidence entries · 3 segments · 2 jobs · 4 bets · 1 moat · 5 inflections · loop `evidence-bounded` (0 evidenced, 4 partially-evidenced, 1 insufficient).

---

## Decisions that could have gone the other way

| # | Field | Decision | Why | Alternative rejected |
|---|---|---|---|---|
| 1 | `thesis` | "Stripe still sells the 2.9% + 30¢ it launched with in 2011. What changed is everything sold on top of it, and a consumer wallet that quietly makes leaving harder than arriving." | Every clause has an opened source: launch price [S020], today's price [S003], the product stack [S003, S039], Link non-portability [S037]. It is a judgment about emphasis, not a claim beyond the evidence | A thesis about AI or agentic commerce: all outcomes unresolved, would rest on Stripe's forward statements |
| 2 | `vitals.founded` | 2010 | Sequoia's Roelof Botha: "When we first partnered with Stripe in 2010" [S007]; launch coverage is 2011 [S020] | 2011 (public launch) |
| 3 | `vitals.ownership` | `vc-backed-private` | Tender offers are funded by named investors [S005, S008]; founders run it but the cap table is investor-heavy | `founder-led-private`: true of control, unevidenced |
| 4 | `vitals.headcountBand` | `unestablished` | Only figure is "almost 7,000" in Feb 2022 before a 14% cut [S009]; UK entity's 288 is not the group | Inferring 5000+ from 2022: stale, and the band boundary sits close to the cut |
| 5 | `keyMetricIds` | tpv.2025, revenue.2024.reported, fcf.2025.reported, valuation.feb-2026 | The four numbers a reader needs first; two are `reported` and say so in their tiles | spuk.turnover.fy2024 as a headline: `verified` but entity-scoped, would mislead in a hero |
| 6 | `users.segments[0].shareBand` | `major` for developer-led software businesses | Largest by count on Stripe's own figures; the description says volume share is undisclosed | `dominant`: unsupported without a volume mix |
| 7 | `users.notFor` | Two entries from practitioner accounts, each ending with its own limitation | The methodology admits lived experience as evidence of experience; the `why` text carries the cap | Omitting: would hide the only independent view of the post-activation stage |
| 8 | `jtbd.jobs` | Two functional jobs. Job 1 from Apify + 2011 coverage; job 2 from Billing docs, pricing, and the alternatives thread | Both have push, pull, anxiety and habit populated from opened sources; job 2's anxiety cites Stripe's own export exclusions | A third job around fraud (Radar): evidence is Stripe's product claim only |
| 9 | `product.ahaMoment` | Omitted | No source establishes the moment or a trigger; Atlas's 30-day figure is a rate about a subset | Inferring "first live charge in minutes": plausible, unevidenced |
| 10 | `businessModel.revenueLines` | Three lines: payments (dominant), Revenue suite (significant), financial services (niche) | Dominant by elimination; significant from $500M→$1B run rate vs $5.1B revenue; niche from Stripe's own "not large today" | A Connect line: no figure; folded into payments with its pricing cited |
| 11 | `businessModel.unitEconomicsShape` | States the ~0.4% yield as an arithmetic consequence of two reported figures, conditional on a shared basis | Both inputs are in the registry; the conditional is explicit | Presenting the SaaStr "net take rate 0.36%": a blog's arithmetic |
| 12 | `profile.moatSource` | `switching-costs` | The mechanism is documented by Stripe itself with component D stated [S037] and one merchant's Link share [S041]; the gate authorised one admissible mechanism | `unestablished`: would discard a documented mechanism because its consequence is stated rather than observed; the rationale carries that caveat instead |
| 13 | `profile.buyerUserAlignment` | `aligned` | Integrator and payer are the same business; fees scale with its sales [S003, S020] | `partially-split` for Connect: true for one segment, noted in the rationale |
| 14 | `profile.expansionMechanism` | `cross-sell` | Products attach to the same payment flow at additional percentages [S003]; suite run rate [S001, S002]; Capital underwritten on the account [S040] | `usage`: revenue does scale with volume, but that is the base, not the expansion mechanism |
| 15 | `loops` type | `ecosystem` | The loop's outputs are assets shared across businesses (Link, Radar, connected accounts), not virality between users | `usage`: the core-action link is volume, but the return path runs through platform and wallet effects |
| 16 | Edge `activation → core-action` | `insufficient`, with `hn.account-holds` as counter-evidence | Nothing measures retention after first charge; the only independent evidence about that stage is failure accounts | `partially-evidenced` on Stripe's cohort growth: those figures describe businesses already at scale |
| 17 | Edge `reinvestment → acquisition` | `partially-evidenced`, strength `weak` | Standard accounts are full Stripe accounts [S038]; Link recognition is documented [S023]; the causal step to acquisition is unmeasured | `insufficient`: would ignore two documented structural mechanisms |
| 18 | Edges citing Stripe-only rates | Status capped at `partially-evidenced` regardless of how many Stripe figures support them | ADR-001: a rate from the company alone does not make a transition `evidenced` | Treating annual-letter figures as `evidenced`: they are `reported` |
| 19 | `bets[0].status` (PayPal) | `mixed` | The bid failed but cost nothing disclosed and revealed price discipline; "backfired" would need harm, "unresolved" is false | `backfired` |
| 20 | `bets` count | Four: PayPal, stablecoins, usage billing, agentic commerce | Each has all five chain links populated from opened sources; three are `unresolved` and say so | Splitting Tempo from Bridge: same bet in Stripe's own framing |
| 21 | `moats[0].durability` | `copyable-with-sustained-effort` | PayPal, Shop Pay and device wallets already sit inside the same checkout; a portability rule would end it | `structurally-hard`: overstates a moat bounded by Link's share of checkouts |
| 22 | `inflections` | Five, chronological: 2011, 2022, 2023, 2025, 2026 | Each has an opened source and a stated consequence | A 2016 Atlas or 2018 Billing inflection: no dated source opened (archive blocked) |
| 23 | `display` fields | Set on nine headline figures | Presentation only; `value` keeps the source's wording | — |

## What the structured files deliberately do not say

- Any group margin, any market share, any "leader" claim.
- The $6.8B 2025 revenue figure. `fcf.2025.reported` cites The Information's headline, which was readable; the revenue figure was not.
- Acquisition prices for Bridge, Privy, Metronome or OpenRouter: none is in an opened source.
- That Radar has a network effect. Stripe's claim is in the registry as `radar.network.claim.2024` and is cited as a claim.

## Six entries unreferenced by the structured files

`gdp-share.2025`, `profitable.2024`, `valuation.feb-2025`, `billing.scale.2024`, `sessions-2026.launches`, `spuk.turnover.fy2024`. All are for the MDX in Stage 3; the last is the audited UK turnover, which belongs in Vitals prose with its entity caveat rather than in a hero tile.
