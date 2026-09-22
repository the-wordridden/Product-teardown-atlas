> **Terminal gate for Stage 1. Determines what can and cannot be responsibly claimed. Not the teardown.**

# Stripe — Stage 1 Gate

| | |
|---|---|
| **Stage** | 1 — terminal gate after passes 1, 1b, 1c |
| **Research cutoff** | 2026-09-21 |
| **Session date** | 2026-09-22 |
| **Sources verified** | 42 (STR-S001 – STR-S042) |
| **Blocked** | 7, of which one (Wayback, X006) is a transient outage worth a retry |
| **Direct observations** | 0. No Stripe account was created; the Dashboard, Checkout demo and Link enrolment were not observed |

Evidence-ceiling statement required by §7.2 for the hero: *Stripe does not publish audited group financials. Volume, customer counts and profitability here are Stripe's own statements; revenue and cash-flow figures are independent reporting of undisclosed sources; one regulated UK subsidiary's audited accounts are cited as such. Product mechanics, pricing and strategic decisions are evidenced to the same standard as any other teardown.*

---

## Gate table

| # | Analytical question | Evidence strength | Status | Strongest supported statement | Remaining gap |
|---|---|---|---|---|---|
| **1** | **Core problem** | EVIDENCED (2011, contemporaneous) | **READY** | At launch Stripe removed the merchant-account and gateway prerequisites: "you don't need a merchant account or gateway", "no setup fees, no monthly fees", card data "never hits developer servers"; founders framed it as "a problem rooted in code, not finance" [S020] | No independent pre-2011 evidence of how painful the prior process was; the problem statement is Stripe's framing reported contemporaneously |
| **2** | **Primary user** | PARTIALLY EVIDENCED | **TARGETED GAP** | Stripe's own segmentation is by scale, from "two engineers in a garage" [S011] to "90% of the Dow Jones Industrial Average" [S001]; Connect distinguishes SaaS platforms from marketplaces [S021, S038]; 288 UK employees of whom 128 are sales, indicating a sold motion at the top [S015]. Who is *not* served well is evidenced by practitioners: small merchants with lumpy volume or restricted categories [S033, S034] | No customer-count by segment, no volume mix by segment. All composition figures are Stripe's |
| **3** | **Primary JTBD** | PARTIALLY EVIDENCED | **TARGETED GAP** | One independent account: chose a processor for "supporting European companies", moved when Stripe "caught up and expanded its capabilities", and to "build in redundancy" [S042]. Stripe-authored: "stay laser-focused on scaling" while payments and billing run globally [S041] | One first-hand account. Forces (push, pull, anxiety, habit) only partly populated; the anxiety side is well evidenced (holds, closures) but from people who left |
| **4** | **Activation** | PARTIALLY EVIDENCED | **TARGETED GAP** | Self-serve signup with no setup fee has been the entry since 2011 [S020, S003]; "claimable sandboxes" convert AI-tool sandboxes into live accounts, "more than 100,000" created [S001]; Atlas incorporations up 41%, "20% of Atlas startups charged their first customer within 30 days" [S001] | No defined activation event; all rates are Stripe's |
| **5** | **Core action** | EVIDENCED (capability) | **READY** | Accept a payment via Checkout, Elements or API; Link recognises an enrolled consumer by email, phone or cookie and autofills after a one-time code [S023]; Connect routes funds under three charge types with documented liability [S022]; Billing runs subscriptions and usage-based models [S024]; Radar screens each transaction for a per-screen fee [S025] | Product not observed; atomic unit of value is an inference from structure |
| **6** | **Output** | PARTIALLY EVIDENCED | **TARGETED GAP** | Each payment enriches Link (a consumer enrolled at one merchant is recognised at the next [S023]) and Radar (Stripe's claim: "each payment makes the next payment safer" [S002]); each connected account on a Standard configuration is a full Stripe account [S038]; businesses on Stripe pay each other "4.8 million times a day" [S013] | Every quantified output figure is Stripe's; no independent rate for any transition |
| **7** | **Reinvestment / monetisation** | EVIDENCED (pricing) · REPORTED (financials) | **READY, with ceiling stated** | List pricing at every layer is public [S003, S039]; the 2023 surcharge changes are documented and corroborated [S032, S003]; Revenue suite run rate "$500 million" → "$1 billion" [S002, S001]; revenue $5.1B (2024) and FCF $2.2B / ~$3.2B (2024 / 2025) via T4 [S029, S027]; UK entity audited turnover £896.5M [S015]; Capital is underwritten on Stripe data and funded by partner lenders [S040] | Revenue basis (gross/net) unknown; 2025 revenue unopened; no product mix |
| **8** | **Growth-loop closure** | PARTIALLY EVIDENCED | **DRAW OPEN** | Candidate ring: business joins (self-serve or sold) → processes → Link and Radar and Connect data compound → Capital, Billing, Treasury attach → new businesses arrive via platforms, Link recognition and AI-tool sandboxes. Structure of each link is documented; **no link has an independent rate** | Expect two to three links at `partially-evidenced`, none at `evidenced` under ADR-001, unless Stripe's own figures are accepted at `reported` for the reinvestment link |
| **9** | **Switching costs** | EVIDENCED (mechanism, stated) | **READY, labelled** | Stripe exports card data to any PCI Level 1 processor but "You can't transfer the payment credentials saved with Link" and does not export "payment history, subscriptions, or other objects" [S037]; one merchant ran 58% of volume through Link [S041]; a Braintree→Stripe migration took 18 working days for 10,000 users [S042]; one account describes losing "half our revenue in recurring subscriptions" on closure [S034] | Component D (economic consequence of Link non-portability) is stated by Stripe and illustrated by one closure, not observed in a Link-specific migration (open Q16) |
| **10** | **Network effects** | PARTIALLY EVIDENCED | **CLASSIFY IN SYNTHESIS** | Link is a two-sided asset by construction: more enrolled consumers → higher conversion for each merchant (Stripe claims; no independent figure) [S023, S041]; Radar's claim is a data network effect in Stripe's words only [S002] | §6.4 step 2 (a *specific* additional user raises value) is arguable for Link and unevidenced for Radar; test in synthesis |
| **11** | **Competitive position** | PARTIALLY EVIDENCED | **TARGETED GAP** | Practitioners name Adyen, Braintree, Checkout.com, Mollie, Paddle, Square, PayPal as the set [S035]; Stripe's 2011 wedge was developer experience vs merchant-account incumbents [S020]; Stripe and Advent bid ~$53B for PayPal and walked away [S017–S019] | No regulator or analyst market-share finding opened; no independent take-rate comparison |
| **12** | **Strategic bets** | EVIDENCED | **READY** | PayPal bid, dated end to end [S019]; stablecoins via Bridge, Privy, Tempo, with Stripe's own volume claims [S001, S010]; usage-based billing via Metronome, integrated into docs within eight months [S011, S024]; OpenRouter agreement [S012]; agentic commerce (ACP with OpenAI, Agentic Commerce Suite, Instant Checkout in ChatGPT, Link with Meta's Muse) [S001, S013, S004] | Consideration for every acquisition undisclosed (Q6); outcomes of stablecoin and agentic bets unresolved by cutoff |
| **13** | **Inflection points** | EVIDENCED | **READY** | 2011 launch and pricing [S020]; Nov 2022 14% cut after "much too optimistic" growth planning, ~7,000 headcount [S009]; Mar 2023 $6.5B raise at $50B, down from a $95B 2021 peak [S008, S026]; valuation recovery $65B → $91.5B → $106.7B → $159B [S007, S006, S026, S005]; Jun 2023 surcharge changes [S032]; Bridge Feb 2025 [S010]; PayPal bid and withdrawal Jul–Aug 2026 [S019] | Several are Stripe-dated; all have an opened source |
| **14** | **Headcount** | REPORTED (stale) · VERIFIED (UK only) | **PUBLISH AS UNESTABLISHED** | "almost 7,000" in Feb 2022 before a 14% reduction [S009]; 288 UK average in 2024 [S015] | No current group figure. `headcountBand: unestablished` |

---

## What this gate authorises

- **Stage 2 may begin** for Vitals, Problem, Product, Business Model, Bets, Inflections and Verdict. These have opened sources at the confidence the schema requires.
- **Users and JTBD proceed as "partly evidenced"** with one selection account and two failure-mode accounts, all labelled. Do not construct a segment composition; Stripe's scale ladder may be presented as Stripe's.
- **Growth loop is drawn open.** Under ADR-001 no transition reaches `evidenced` on independent data. The reinvestment link (payments → attach products → revenue) may reach `partially-evidenced` on public pricing plus reported run rates; Link recognition and Connect Standard accounts reach `partially-evidenced` as documented mechanisms without rates. The rest stays `insufficient`.
- **Moats: one mechanism admissible.** Link credential non-portability, with component D stated by Stripe and illustrated once. Radar's data advantage is Stripe's claim only and goes to the register of hypotheses, not the moat stack.
- **Speed band: unestablished.** No source gives a cycle time for any loop.

## What this gate withholds

- Any group margin. The UK entity's operating margin is a transfer-pricing artefact and must not be presented as Stripe's.
- Any market-share claim. None opened.
- Any statement that Stripe "is the leader" in anything, unless attributed to the source that says so (Forrester and Gartner releases are Stripe's characterisation of analyst reports not opened here).
- The $6.8B 2025 revenue figure, until an opened source carries it.

## Retry before Stage 2 sign-off

1. Wayback CDX for stripe.com/pricing (X006), to date the Billing 0.7%, Radar and 1% conversion fees.
2. One more T4 for 2025 revenue.
3. Irish CRO consolidated accounts (fee), if the Business Model section needs an audited non-US figure.
