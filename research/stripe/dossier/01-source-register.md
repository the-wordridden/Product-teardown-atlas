> **IMPORTANT: This document contains source discovery and evidence mapping only. It is not the Stripe teardown and contains no final strategic judgments.**

# Stripe — Source Register (Stage 1)

---

## 1. Research metadata

| | |
|---|---|
| **Product** | Stripe |
| **Stage** | 1 — Source discovery and collection (passes 1 and 1b) |
| **Research cutoff** | 2026-09-21 (inclusive) |
| **Session date** | 2026-09-22 |
| **Methodology** | `docs/research-methodology.md` v1.0 (LOCKED) |
| **Status** | **PARTIAL — passes 1 and 1b complete, not signed off.** See §7 |
| **Sources verified (opened and inspected)** | **33** (21 in pass 1; 12 in pass 1b) |
| **Sources attempted and blocked** | 7 (§6) |
| **Categories swept** | A (company statements) largely; B (official docs/pricing) core products done; D (statutory/regulatory) one entity; E (independent journalism) valuation series and PayPal bid; F (practitioner) four threads; C (archive) **blocked — Internet Archive offline on 2026-09-22** |

### Pass 1b — product docs, financial reporting chain, practitioner layer (2026-09-22)

Sources **STR-S022** to **STR-S033**. Three findings amend pass 1:

- **Finding 1.1-3 qualified.** The *headline* US rate is unchanged since 2011, but not the price list. Stripe's June 2023 notice, reproduced verbatim by a recipient [S032] and corroborated by today's page [S003], raised the international card surcharge from 1.0% to 1.5% and stopped refunding the $15 dispute fee on won disputes; an April 2023 change for EEA/UK businesses added a 1% fee (minimum $2.50) on USD payouts to US bank accounts and, per the thread, moved foreign-card fees to 3.25% [S031]. Stripe has since removed the support page that announced the European change (301 → /pricing). The correct claim is: **"2.9% + 30¢ for domestic US cards has not changed in fifteen years; the surcharges around it have."**
- **Open question 1 partly answered.** The Information's 2025 article is paywalled but its headline is not: "Stripe Minted $3.2 Billion in Cash in 2025" [S027]. Axios (opened) reports the 2024 figures: revenue $5.1B up 28%, free cash flow $2.2B, citing The Information [S029]. 2025 revenue ($6.8B) remains body-text only; the arithmetic ($5.1B × 1.33) is consistent with it but does not establish it.
- **Open question 10 closed** by Connect's charge-type documentation [S022]: liability for refunds, disputes and negative balances follows the charge type, and on legacy Express and Custom accounts "your platform is responsible for disputes and fraud".

Every entry below was retrieved and read on 2026-09-22 unless stated. Raw PDFs are in `research/stripe/_raw/`; extracted text in `research/stripe/_extracted/`. Rule 12.3-1 applies: nothing is listed that was not opened.

### 1.1 Material findings that shape the research plan

1. **Stripe is private, but its UK regulated subsidiary files full audited accounts.** Stripe Payments UK Ltd (Companies House 08480771), an FCA-authorised Electronic Money Institution audited by Ernst & Young, filed FY2024 accounts on 2025-09-24 [S015]. These are Tier 1 documents *for that entity*. They establish audited UK turnover, costs, headcount and structure. They do **not** establish group revenue, group margin or group headcount, and turnover includes intercompany service charges (note 4). Its immediate parent, Stripe Payments International Holdings Limited (Dublin), prepares **consolidated** accounts filed at the Irish CRO — a candidate for pass 1b (documents cost a fee; not yet attempted).

2. **A concluded, well-documented strategic bet falls inside the cutoff.** Stripe and Advent International bid $60.50/share (~$53B) for PayPal on 2026-07-14, PayPal's price overtook the bid on 2026-08-13, and the consortium walked away on 2026-08-27 [S017–S019]. This is Tier 4 contemporaneous reporting with a consistent timeline across three outlets. The largest attempted merger in payments, abandoned over price, is a Bets section on its own.

3. **Headline US pricing has not changed in fifteen years.** "2.9% plus $0.30 per successful charge" with "no setup fees, no monthly fees" in the 2011 launch coverage [S020]; "2.9% + 30¢ per successful transaction" and "Stripe does not charge setup fees, monthly fees" on the pricing page today [S003]. Two independent source classes, fifteen years apart.

4. **The evidence ceiling for group financials is Tier 3/4.** Volume ($1.9T), profitability ("robustly profitable"), business count (5M+), Link users (200M+ / 250M+) are all self-reported [S001, S005, S013] → `reported`. Group revenue ($6.8B for 2025) exists only in The Information's reporting, which is paywalled and **not opened**; the figure reached me through a Tier 5 blog [S016] and may be used only as a lead. See open question Q1.

5. **Definition drift on the headline metric.** The 2024 letter says "$1.4 trillion in total *payment* volume" [S002]; the 2025 letter and release say "$1.9 trillion in total *volume*" [S001, S005]. Whether the basis changed (e.g. to include stablecoin, payout or Treasury flows) is unestablished. Logged in `04-conflicts.md`.

---

## 2. Source authority matrix applied

Per §2.3, authority is a property of the source–claim pair. Column codes: FIN financial performance · CAP product capability · PRC list pricing · USE usage/scale · INT stated strategic intent · HIS history · CMP competitive position.

---

## 3. Verified sources

### Category A — Company statements (Tier 3)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **STR-S001** | Stripe annual letter 2025 (PDF, "Stripe-annual-letter-2025-desktop.pdf"), signed "Patrick and John" | 2026-02-24 | FIN (self-report), USE, INT (AUTH for stated intent) | `_extracted/annual-letter-2025.txt`. $1.9T total volume up 34%; ~1.6% global GDP; 5M+ businesses; 90% DJIA, 80% Nasdaq 100; 25% of Delaware corporations via Atlas; Link 200M+ people; "robustly profitable"; 350+ product updates; Privy (110M+ wallets) and Metronome acquired; Revenue suite "on track to hit an annual run rate of $1 billion this year"; 57% of new 2025 businesses outside US; Capital funding volume +45%, 81,000+ businesses; Issuing in 22 countries; stablecoin payments ~$400B doubled; Bridge volume >4×; Tempo unveiled; ACP with OpenAI; Agentic Commerce Suite; Instant Checkout in ChatGPT. |
| **STR-S002** | Stripe annual letter 2024 (PDF) | 2025-02-27 | FIN (self-report), USE, INT | `_extracted/annual-letter-2024.txt`. $1.4T total payment volume up 38%; ~1.3% global GDP; "profitable in 2024, and we expect to be so in 2025 and beyond"; Revenue and Finance Automation suite passed $500M run rate; Billing 300,000+ companies, ~200M active subscriptions; half of Fortune 100, 80% Cloud 100, 78% AI 50; one in six new Delaware corporations via Atlas; 100 businesses >$1B/yr on Stripe; Bridge acquisition announced October 2024; card testing reduced >80% in two years. |
| **STR-S004** | stripe.com/newsroom/news — index of releases 2020-12 → 2026-09 | retrieved 2026-09-22 | HIS (CORR), discovery | Complete list retained in working notes. Used to select S005–S013. |
| **STR-S005** | Press release: 2025 annual letter + tender offer | 2026-02-24 | FIN (valuation), USE | "tender offer at a $159B (€135B) valuation"; funds "provided by investors including Thrive Capital, Coatue, a16z, and others"; "Stripe will also use a portion of its own capital to repurchase shares". Repeats S001 figures. |
| **STR-S006** | Press release: tender offer | 2025-02-27 | FIN (valuation) | "$91.5B (€87.3B) valuation"; investors not named; "Alongside investors, Stripe will also repurchase shares". |
| **STR-S007** | Press release: tender offer | 2024-02-28 | FIN (valuation), USE | "$65B (€60B) valuation"; Billing "more than 200,000 users"; Tax "50 US states and 50 countries"; optimized checkout suite "10.5% increase in revenue" (Stripe research). |
| **STR-S008** | Press release: Series I | 2023-03-15 | FIN (funding) | "Series I fundraise of more than $6.5 billion (€6.15 billion) at a $50B (€47B) valuation"; named investors; proceeds for employee liquidity and RSU withholding, "resulting in the retirement of Stripe shares"; Atlas incorporations +155% 2019→2022. |
| **STR-S009** | "CEO Patrick Collison's email to Stripe employees" | 2022-11-03 | FIN/USE (headcount), INT | **Against-interest (§3.4): elevated weight.** "reducing the size of our team by around 14%"; "return us to our February headcount of almost 7,000 people"; "We were much too optimistic about the internet economy's near-term growth in 2022 and 2023"; "We grew operating costs too quickly". Only public group headcount figure located. |
| **STR-S010** | Press release: Bridge acquisition completed | 2025-02-04 | HIS, INT | No price or volume in the release. Rationale quote: "stablecoins will play a critical role in turbocharging cross-border commerce". |
| **STR-S011** | Press release: Metronome acquisition completed | 2026-01-14 | HIS, INT | No price. "the leader in orchestrating billing for the most complex usage-based models"; powers "OpenAI, Anthropic, and NVIDIA"; Collison: "the shift towards usage-based models will be a defining feature of the next decade". |
| **STR-S012** | Press release: agreement to acquire OpenRouter | 2026-08-19 | HIS, INT | No price. "route and optimize token usage across 400+ models from more than 80 providers"; rationale "manage both sides of profitability in the AI era". Completion not confirmed by cutoff. |
| **STR-S013** | Press release: Stripe Sessions 2026 | 2026-04-29 | CAP (SUGG), USE, INT | "288 new products and features"; "Link is a consumer wallet with over 250 million users globally"; "Businesses building on Stripe make payments to each other 4.8 million times a day"; payouts "100 countries with fiat, 160 with stablecoins"; Radar "blocked more than 3.3 million risky sign-ups in the last month"; "one in six attempted sign-ups is made by a bad actor". |

### Category B — Official documentation and pricing (Tier 2)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **STR-S003** | stripe.com/pricing (United States, USD) | retrieved 2026-09-22 | **PRC (AUTH)**, CAP | "2.9% + 30¢ per successful transaction"; "+ 1.5% for international cards"; "+ 1% if currency conversion is required"; "+ 0.5%" manually entered; "Stripe does not charge setup fees, monthly fees, or any other hidden fees like closure fees"; Billing "0.7% of Billing volume" or "Starting at $620.00 per month, 1-year contract"; Invoicing "0.4% per paid invoice"; Terminal "2.7% + 5¢"; Radar "$0.05 per screened transaction" or from $10/month; Connect "Included with Payments"; Atlas "$500.00 one-time setup fee"; Issuing "$0.10 per virtual card", "$3.50 per standard, physical card"; Identity "$1.50 per verification"; Financial Connections "$1.50 per successful instant verification"; Sigma from $10/month annual; Tax Complete from $90/month; custom pricing "for businesses with large payments volume or unique business models". **Not on page:** Link pricing, Capital pricing. |
| **STR-S021** | docs.stripe.com/connect/how-connect-works | retrieved 2026-09-22 | **CAP (AUTH)** | Connect definition: "Businesses such as marketplaces and software platforms use Connect to manage and route payments and payouts between sellers, customers, service providers, and other entities"; five components (platform app, platform Stripe account, connected accounts, payments, payouts); use cases SaaS platforms (Squarespace) and marketplaces (Airbnb); country list ~110 available + ~19 preview. **Charge types, liability and fee mechanics are on linked pages not yet opened** — pass 1b. |

| **STR-S022** | docs.stripe.com/connect/charges | retrieved 2026-09-22 | **CAP (AUTH)** | Three charge types. Direct: "payments made directly to a connected account… Refunds and chargebacks reduce the connected account's balance"; "This charge type works best for platforms that provide software as a service. For example, Shopify… Thinkific". Destination: "Refunds and chargebacks reduce your platform's balance. Stripe debits fees from your platform's balance"; "best suited for marketplaces, such as a home rental marketplace or a ridesharing app". Separate charges and transfers: "Your account balance is debited for the cost of the Stripe fees, refunds, and chargebacks"; example DoorDash. `on_behalf_of` makes "the connected account the business of record". "If you're using Express or Custom legacy account types, your platform is responsible for disputes and fraud." Negative balances: "Stripe attempts to debit the external account on file for the connected account only if `debit_negative_balances` is set to `true`." |
| **STR-S023** | docs.stripe.com/payments/link | retrieved 2026-09-22 | **CAP (AUTH)** | Link "is Stripe's digital wallet. It lets your customers securely save and reuse payment methods for fast checkout"; enrolment detection "by using their email address, phone number, or browser cookie"; "The customer receives a one-time passcode"; Instant Bank Payments "available exclusively through Link" as lower-cost alternative to cards; "Link isn't available in India". No conversion figure and no fee on this page. |
| **STR-S024** | docs.stripe.com/billing | retrieved 2026-09-22 | **CAP (AUTH)** | "Use Stripe Billing to manage subscriptions and invoicing. It automates recurring payments, creates custom pricing plans, and handles billing periods, such as trials and renewals"; pricing models "flat-rate, per-seat, usage-based, tiered, variable, and multi-currency"; "Smart retries: Schedule payment retries to maximize recovery"; usage-based billing documented "with Stripe and Metronome" — Metronome already in the docs eight months after acquisition. |
| **STR-S025** | docs.stripe.com/radar and /radar/how-radar-works | retrieved 2026-09-22 | **CAP (AUTH)**, PRC | Four plans (Lite, Standard, Plus, Pro); "On average, businesses block 42% more fraud on Standard compared to Lite" (Stripe claim, uncorroborated); Radar plans "charge a fee for each screened transaction… Fees are charged only when Radar screens a transaction"; for subscriptions Radar "always screens and charges for the first payment"; Pro adds free-trial, bot, multi-account abuse detection. The network-learning claim ("each payment makes the next payment safer", ">92% chance" a card was seen before) appears only in the 2024 letter [S002], not in the docs. |

### Category D — Statutory and regulatory (Tier 1, entity-scoped)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **STR-S014** | Companies House, company 08480771 STRIPE PAYMENTS UK LTD — filing history (accounts category) | retrieved 2026-09-22 | HIS, discovery | Full accounts filed for FY2022 (2023-09-26), FY2023 (2024-09-26), FY2024 (2025-09-24). No FY2025 accounts by cutoff. |
| **STR-S015** | Stripe Payments UK Ltd, Financial Statements for the year ended 31 December 2024 (34 pp, scanned; Docusign envelope 23DFDF47…; Companies House barcode 20/09/2025) | signed 2025-03-28 (director Stephen O'Callaghan; EY Dublin, Conor Buckley); filed 2025-09-24 | **FIN (AUTH, this entity only)**, USE (UK headcount), HIS, INT (CORR) | `_raw/stripe-payments-uk-ltd-accounts-fy2024.pdf` (image-only; read visually). Turnover **£896,450,092** (2023: £698,824,563); administrative expenses £(937,325,751); interest receivable £58,113,002; operating profit £16,138,728 (2023: £19,971,606); profit before tax £20,077,265; profit for year £16,127,502 (2023: £41,623,083 — 2023 included a £17.3M tax *credit*). Note 4: "Turnover represents the invoiced amount in respect of authorised payment services, marketing and support services, and research and development services provided to affiliate entities within the Stripe Group". Note 7: "Administrative expenses mainly consist of processing costs". Note 8: average monthly employees **288** (2023: 278): administration 59, engineering 76, sales 128, user operations 25; staff costs £89,483,136. Strategic report: "wholly owned subsidiary of Stripe Payments Europe Limited, whose ultimate parent company is Stripe, Inc."; "an Irish-American Technology group"; "authorised as an Electronic Money Institution … by the Financial Conduct Authority"; going concern rests partly on "a letter of comfort from its ultimate parent Company". Note 1: intermediate parent Stripe Payments International Holdings Limited prepares consolidated statements available from the Irish CRO. Note 3.16: "Stripe, Inc., determines its common stock valuation quarterly". **Reading rule:** subsidiary figures priced by intra-group transfer pricing; never present as Stripe's margin. |

### Category E — Independent journalism (Tier 4)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **STR-S017** | Investing.com via Yahoo Finance, "Stripe and Advent bid $60.50 a share for PayPal as talks advance, WSJ reports" (L. Juricic) | 2026-08-15 | HIS (AUTH), CMP | "$60.50 per share for PayPal in July, valuing the payments giant at roughly $53 billion"; "PayPal rejected that offer as insufficient, and negotiations over a higher price are ongoing"; "formal valuation of $159 billion as of February 2026, with secondary-market pricing on platform Hiive implying a value near $198.78 billion as of August 14"; equal stake with Advent. Second-hand from WSJ. |
| **STR-S018** | TechCrunch, "Talks to sell PayPal to Stripe and Advent are heating up" (L. Ropek) | 2026-08-14 | HIS | Confirms July offer at $60.50/share, ~$53B; "PayPal balked"; WSJ-sourced; PayPal CEO Lores joined March 2026; PayPal workforce cut 20% over two to three years. |
| **STR-S019** | Axios, "Why the PayPal takeover fell apart" (D. Primack) | 2026-09-01 | **HIS (AUTH), CMP** | Dated timeline: Feb 24 Bloomberg report; Feb 26 Semafor denial; Mar 1 Lores CEO; early April approach, no response; Jul 14 Reuters reports $60.50 offer, "39% premium to the pre-Bloomberg report price"; Jul 29 PayPal Q2 beat; Aug 13 share price passes bid ($60.59); **Aug 27 "Stripe and Advent walk away"**, shares -12%. Sourced explanation: disagreement over why the share price rose. "This would have been the largest merger ever in the payments space". |
| **STR-S020** | TechCrunch, "Sequoia-Backed Stripe Launches To Disrupt The Online Payments Space" (L. Rao) | 2011-09-30 | **HIS (AUTH, contemporaneous)**, PRC (historical) | "$2 million in backing … Peter Thiel and Elon Musk, as well as Sequoia Capital, Andreesen Horowitz and SV Angel"; "valued at around $20 million"; "2.9% plus $0.30 cents per successful charge"; "no setup fees, no monthly fees, no card storage fees"; "you don't need a merchant account or gateway"; "Earnings are transferred to bank accounts on a 7 day rolling basis"; founders' stated thesis: "enabling transactions on the web is a problem rooted in code, not finance". |

| **STR-S026** | Bloomberg, "Stripe's Valuation Rises Above Its 2021 Peak to $106.7 Billion" (P. Smith) — opened; first two paragraphs outside paywall | 2025-09-23 | FIN (valuation, CORR) | "Stripe Inc.'s valuation has climbed to $106.7 billion, according to a person with direct knowledge of the matter, passing the digital-payments firm's previous peak of $95 billion in 2021"; "was pegged at $91.5 billion earlier this year". Establishes the 2021 peak and a Sept 2025 secondary mark between the Feb 2025 and Feb 2026 tenders. |
| **STR-S027** | The Information, "Stripe Minted $3.2 Billion in Cash in 2025, Setting Up Acquisition Hunt" (Yueqi Yang) — **headline and byline only**; body paywalled | 2026-07-22 | FIN (CORR) | Headline supports free cash flow ≈ $3.2B for 2025 at `reported`. Revenue figure not visible. |
| **STR-S028** | The Information, "Stripe Minted More Than $2 Billion in Cash Last Year. Why Go Public?" (Cory Weinberg) — headline only | 2025-03-26 | FIN (CORR) | Free cash flow > $2B for 2024. |
| **STR-S029** | Axios Pro, "Stripe's 2024 revenue growth" (Lucinda Shen) — preview paragraph opened | 2025-03-27 | FIN (CORR) | "Payments giant Stripe grew revenue 28%, to $5.1 billion, last year, and it doubled free-cash flow to $2.2 billion, the Information reports." Second-hand; consistent with S028. |

### Category F — Industry blogs and forums (Tier 5)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **STR-S030** | Hacker News search (hn.algolia.com), queries on switching, leaving, account closure, fees, Adyen comparison | retrieved 2026-09-22 | discovery | Result lists retained in working notes; four threads opened (S031–S033). Full text in `_extracted/hn-threads.txt`. |
| **STR-S031** | HN 34609182, "Stripe increases fees for EU and UK-based businesses in April" (170 pts, 237 comments) | 2023-02-01 | PRC (historical, SUGG), practitioner | Linked support page now redirects to /pricing (removed). Commenters quote the notice: "Businesses in the EEA who are paying out in USD to a US-domiciled bank account will now incur a 1% fee, with a minimum fee of US$2.50 per payout"; "3.25% to accept foreign cards in the EU". Named alternatives considered: Mollie, Adyen, Klarna, Mangopay. §2.4 test: contemporaneous, specific, only surviving record of the notice — admissible at `estimated`. |
| **STR-S032** | HN 35079262, "Stripe – Pricing changes for US businesses starting June 1, 2023" — OP reproduces Stripe's customer email in full | 2023-03-09 | PRC (historical), INT | "starting June 1, Stripe's additional fee for international card transactions will change from 1.0% to 1.5%. There's no change to our standard 2.9% + $0.30 pricing for US card transactions"; "Stripe will no longer return the $15 dispute fee for successfully contested disputes. The dispute fee itself is not changing"; stated reason "card networks have increased the total fees that Stripe pays". **Corroborated** by S003 (1.5% today). Comment: "A couple of years ago they stopped refunding the 2.9% fee when we would refund a payment". |
| **STR-S033** | HN 34035581, "Don't Use Stripe" (350 pts, 137 comments) and HN 36970678, "Stripe Account CLOSED for no reason" (46 pts) | 2022-12-18; 2023-08-02 | USE (lived experience, SUGG), CMP (INADM) | Account-hold and closure accounts: "$50000 dollars on stripe… holding the money from me for 'at least 120 days'"; "You cannot call Stripe. They do not have a phone number"; "account disabled for no reason and with no explanation" after first ten payments. Counter-voices in thread: "You can find similar stories about literally all online payment processors"; "get in touch with your account manager… if you don't have an account manager… why?". Evidence of *experience*, not of general truth (§2.3 n11). Bears on Users (who is not served well: small merchants with lumpy volume) and on the support model. |
| **STR-S016** | SaaStr, "5 Interesting Learnings from Stripe at $6.8 Billion in Revenue…" | 2026-07-23 | FIN (**SUGG only**) | Attributes to Yueqi Yang, The Information, 2026-07-22: 2025 revenue $6.8B "up roughly a third"; free cash flow $3.2B "up 52%"; Q1 2026 revenue $2B. **Primary not opened (paywall).** Admissible as a lead and, at most, an INFERENCE with `estimated` confidence and disclosed limitation (§2.4). Blog's own derived "net take rate … about 0.36%" is the blog's arithmetic, not evidence. |

---

## 4. Claim domains: what pass 1 can and cannot serve

| Domain | Best source in register | Ceiling reached |
|---|---|---|
| Group volume, business count, Link users | S001/S002/S005/S013 (T3 self-report) | `reported` |
| Group revenue, cash flow | S016 → The Information (not opened) | **Not citable yet.** Open Q1 |
| Valuation | S005–S008 (T3, transaction-linked) | `reported`; tender prices are negotiated, not market |
| Group headcount | S009 (Nov 2022 only) | `reported`, stale (§8) |
| UK entity financials and headcount | S015 (T1) | `verified`, entity-scoped |
| List pricing | S003 (T2) | `verified` |
| Product capability | S021 (T2) | `verified`, thin — pass 1b |
| History (2011 launch) | S020 (T4 contemporaneous) | `verified` |
| PayPal bid | S017–S019 (T4) | `verified` for events and dates; price second-hand from WSJ/Reuters |
| Stated strategy | S001/S002/S011/S012 (T3) | `verified` as *stated* intent only |
| Competitive position | S019 (T4), otherwise none | thin |

---

## 5. Observations

None yet. Stripe's Dashboard requires an account; no account was created. Public surfaces that can be observed unauthenticated (pricing, docs, Checkout demo, Stripe Press, Link consumer page) are candidates for pass 1b.

---

## 6. Attempted and blocked

| ID | URL | Result | Resolution |
|---|---|---|---|
| STR-X001 | cnbc.com/2026/07/15/stripe-advent-offer-to-buy-paypal… (Reuters) | HTTP 403 | Same event covered by S017–S019 |
| STR-X002 | axios.com/2026/07/15/paypal-bid-stripe-advent | HTTP 403 | Superseded by S019 |
| STR-X003 | qz.com/stripe-advent-paypal-acquisition-offer-53-billion-071526 | HTTP 403 | Not needed |
| STR-X004 | The Information, Yueqi Yang, 2026-07-22 (revenue $6.8B) | Paywall, not attempted | **Open Q1** — try browser pane; or find Bloomberg/FT corroboration |
| STR-X005 | Bloomberg, 2026-08-28 "Advent, Stripe Group Abandons Acquisition Effort" | Paywall, not attempted | Event corroborated by S019 |
| STR-X006 | web.archive.org CDX and snapshots of stripe.com/pricing (2012–2024) | **"Internet Archive: Temporarily Offline"** on 2026-09-22 | Retry in pass 1c |
| STR-X007 | support.stripe.com/questions/april-2023-pricing-updates-for-businesses-based-in-europe | 301 → stripe.com/pricing (page removed) | Contemporaneous quotes preserved in S031 |

---

## 7. What passes 1 and 1b did not do

- **Category B is partial.** Connect (overview, charge types), Link, Billing, Radar opened. Still unopened: Checkout/Payment Element, Treasury, Issuing, Capital, Atlas, Terminal, Tax, and the Connect pricing page. Product section can be drafted; Business Model needs Connect pricing and Capital terms.
- **Category C (archive) blocked**, not skipped. Retry the Wayback CDX for stripe.com/pricing when the archive is back; S020 (2011) and S032 (2023) already bracket the series.
- **Category D is one entity.** Irish CRO consolidated accounts for Stripe Payments International Holdings Ltd (fee required) and Stripe Payments Europe Ltd; FCA register entry; any US state money-transmitter disclosures.
- **Category E is one event.** No independent reporting yet on take rates, enterprise pricing, competitive losses (Adyen, Braintree, Checkout.com), outages, or account terminations.
- **Category F not started.** Hacker News and Stripe community threads on integration experience, payouts, account holds and fee changes are the practitioner layer (§2.3 n11).
- **No Users/JTBD evidence.** Nothing opened yet speaks to who chooses Stripe and why, in their own words. Customer case studies on stripe.com are T3 and will need practitioner corroboration.

Stage 1 is **not** signed off. Pass 1b should open Category B systematically, attempt STR-X004, and start C and F.
