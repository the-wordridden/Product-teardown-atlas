# Stripe — Open Questions

Created during Stage 1 pass 1 (2026-09-22). Feeds the Verdict section's `openQuestions` field and the next research decision. Questions are added as they arise and closed only when a retrieved source answers them.

---

## Blocking — a teardown section cannot be authored without these

| # | Question | Why it blocks | What would answer it | Answerable? |
|---|---|---|---|---|
| **1** | What is Stripe's group revenue, and on what basis (gross vs net of interchange)? | Business Model and Vitals. The only figure located ($6.8B for 2025, ~$3.2B free cash flow) reached the register via a Tier 5 blog citing The Information [S016]; the primary is unopened | Open The Information's 2026-07-22 article, or find Bloomberg/FT/WSJ reporting of the same figure; Irish CRO consolidated accounts for Stripe Payments International Holdings Ltd may give audited non-US revenue | **Likely yes** — paywall or a small CRO fee |
| **2** | How does Stripe make money beyond the headline card rate: what share of revenue is payments vs Billing/Revenue suite vs Treasury/Issuing/Capital vs interest on balances? | Business Model. Self-reports give run rates ($500M → $1B for the Revenue suite [S001, S002]) but no mix | Any disclosed segment mix; UK accounts note 4 hints interest income is material at entity level (£58M on £896M turnover) | Partially |
| **3** | Who chooses Stripe, why, and instead of what? | Users and JTBD have no first-hand evidence yet | Practitioner accounts (HN threads, engineering blogs on choosing/leaving Stripe), migration write-ups to/from Adyen, Braintree, Checkout.com | **Yes** — Category F sweep |
| **4** | What actually happens in the growth loop: does a business on Stripe bring the next business on? | Growth Loops. Candidate mechanisms exist in the data (Connect platforms onboarding sellers [S021]; Link 250M consumers [S013]; Atlas incorporations [S001]; claimable sandboxes from AI coding tools [S001]) but none has a documented transition with a rate | Connect docs on connected-account onboarding; any disclosed Connect share of volume; practitioner accounts of platform-driven adoption | Partially |

---

## Material — would materially improve a section

| # | Question | Bears on |
|---|---|---|
| 5 | Did the definition of the headline metric change between 2024 ("total payment volume") and 2025 ("total volume")? | Vitals; every growth comparison. See `04-conflicts.md` C1 |
| 6 | What was the consideration for Bridge (reported ~$1.1B at announcement), Privy, Metronome, OpenRouter? None of the company releases states a price [S010–S012] | Bets |
| 7 | What is group headcount today? The only figure is "almost 7,000" in February 2022 before a 14% cut [S009] | Vitals |
| 8 | When did Stripe's list pricing last change in any component (international surcharge, currency conversion, Billing %)? Headline US rate is unchanged 2011→2026 [S003, S020], but the rest is undated | Business Model, Inflections |
| 9 | What did the PayPal bid reveal about Stripe's own valuation and financing capacity ($50B committed by JPMorgan and Morgan Stanley per search summaries — **not yet in an opened source**)? | Bets, Vitals |
| 10 | Who is the merchant of record and who bears dispute/negative-balance liability on Connect, by charge type? | Product, Moats |
| 11 | Has any regulator examined Stripe's market position (CMA, FTC, EC), giving an independent view as the CMA did for Figma? | Moats, competitive position |

---

## Non-blocking — would add colour

| # | Question |
|---|---|
| 12 | Tempo mainnet status and any measurable adoption by cutoff |
| 13 | Stripe Press and Works in Progress: cost, purpose, any stated link to hiring or brand |
| 14 | Why Stripe's Issuing product is in only 22 countries after 7 years [S001] — a rare self-critical disclosure |
