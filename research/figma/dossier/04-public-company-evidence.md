> **IMPORTANT: This document contains evidence extraction only. It is not the Figma teardown, contains no strategic conclusions, and declares no moat, network effect, growth loop, or strategic bet.**

# Figma — Public Company Evidence Extraction

| | |
|---|---|
| **Stage** | 1b — Primary filing extraction |
| **Research cutoff** | 2026-08-31 |
| **Session date** | 2026-08-30 |
| **Methodology** | `docs/research-methodology.md` v1.0 (LOCKED) |
| **Companion** | `01-source-register.md` |

### Standing conventions adopted for this and all future passes

1. **Transaction terminology.** The Adobe/Figma matter is referred to as *Adobe's proposed acquisition* / *proposed transaction value*, never as "Figma's valuation."
2. **Time-bound ownership.** Voting-power figures always carry their as-of date. No such figure is ever presented as timeless.
3. **Financial-period discipline.** Every financial metric carries its reporting period, GAAP/non-GAAP basis, and definition. No margin or growth figure is described as a generic characteristic of the company.
4. **Discrepancy taxonomy.** Discrepancies are classified as one of: **genuine conflict** · **definition difference** · **period difference** · **accounting-basis difference** · **unresolved contradiction**. Different-period figures are never recorded as conflicts.

---

## 1. Document inventory

### Newly verified this pass

| ID | Document | Publisher | Date | Tier | Access route |
|---|---|---|---|---|---|
| **FIG-S007** | **Form 10-K, FY ended 2025-12-31** | Figma, Inc. | Filed ~2026-02-18 | **T1** | q4cdn PDF → `pdftotext` |
| **FIG-S008** | Q4 & FY2025 financial results release | Figma IR | 2026-02-18 | T1 | IR HTML |
| **FIG-S009** | Q1 2026 financial results release | Figma IR | 2026-05-14 | T1 | IR HTML |
| **FIG-S010** | "Figma Files Registration Statement for Proposed IPO" | Figma blog | 2025-07-01 | T2 | HTML |
| **FIG-S011** | CMA Phase 1 decision summary, **ME/7021/22** | CMA (UK) | 2023-06-30 | **T1** | gov.uk PDF → `pdftotext` |

**Access breakthrough.** `pdftotext` was found locally at `…/Git/mingw64/bin/pdftotext.exe`. This resolves blockers **FIG-X003**, **FIG-X004** and **FIG-X006** from the previous pass, and — critically — provides a route to the 10-K that bypasses sec.gov entirely, since Figma hosts its own filings on `s206.q4cdn.com`. Extracted text is retained at `research/figma/_extracted/`.

**Still blocked:** sec.gov returns HTTP 403 to all direct requests (**FIG-X001**, **FIG-X002**). The **S-1, S-1/A and 424B4 remain unretrieved** — the q4cdn mirror does not appear to host pre-IPO documents. Q2 2026 10-Q not yet retrieved.

---

## 2. Business model evidence

**Subscription, per seat.** *[FIG-S007, 10-K FY2025]* — "As of December 31, 2025, access to Figma is sold as an annual or monthly subscription, per seat."

**Seat taxonomy — six seat types disclosed**, more than the public pricing page exposes *[FIG-S007]*:

| Seat | Access |
|---|---|
| **Viewer** | "allows users to view files and leave comments **for free**" |
| **Collab** | FigJam and Figma Slides |
| **Content** | Figma Buzz, Figma Sites CMS, FigJam, Figma Slides — *"announced in May 2025 and is not yet available"* |
| **Dev** | Dev Mode, plus the Content seat products |
| **Full** | Figma Design, Draw, Make, Dev Mode, Buzz, Sites, FigJam, Slides |

**Plans** *[FIG-S007]* — Starter (free, "designed for working on personal projects"), Professional (individuals and small teams), Organization (businesses with multiple teams), Enterprise (multiple products or brands).

**AI credits** *[FIG-S007]* — "In 2025, we introduced AI credits across all Figma seats. Starting in March 2026, we intend to begin enforcing AI credit limits and start rolling out the ability for customers to purchase an additional AI credit subscription or opt into a pay-as-you-go AI credit plan." *[FIG-S009]* confirms enforcement began **2026-03-18**.

**Metric definitions — quoted exactly** *[FIG-S007]*:

> **Paid Customer:** "a customer account that is billed separately for which we have an active paid subscription as of the last day of the applicable period of measurement." Footnoted: active when seats are provisioned, with a 15-day provisioning grace window. **"A single organization with multiple divisions, segments, subsidiaries, or subscribing teams that are each billed separately are counted as multiple Paid Customers."**

> **ARR:** "the annualized value of our active customer agreements as of the measurement date, assuming any agreement that expires during the next twelve months following the measurement date is renewed on existing terms." Explicitly: "ARR is not a forecast of future revenue."

> **Paid Customer with more than $10,000 in ARR:** "a Paid Customer with a total of $10,000 or more of ARR as of the last day of the applicable period of measurement."

> **Net Dollar Retention Rate:** Current Period ARR ÷ Prior Period ARR for those same Paid Customers with >$10K ARR measured twelve months prior. "Our Net Dollar Retention Rate reflects customer expansion, contraction, and churn."

**The subsidiary-counting disclosure is material.** Figma explicitly counts separately-billed divisions and subsidiaries of one organisation as multiple Paid Customers. Any comparison of Figma's customer count against another vendor's requires that vendor's counting basis, per §5.2.

---

## 3. Customer and segment evidence

**The five distinct metrics, kept separate as instructed:**

| Metric | Value | As of | Source |
|---|---|---|---|
| **User** | *Not disclosed as a metric* | — | — |
| **Customer** | *Not disclosed as a metric distinct from Paid Customer* | — | — |
| **Paid Customer (total)** | ~690,000, +54% YoY | 2026-03-31 | FIG-S009 |
| **Paid Customer >$10K ARR** | 13,861 (+32% YoY) | 2025-12-31 | FIG-S007 / S008 |
| | 15,218 (+37% YoY) | 2026-03-31 | FIG-S009 |
| | 15,964 (+34% YoY) | 2026-06-30 | FIG-S005 |
| **Paid Customer >$100K ARR** | 1,405 (963 prior year) | 2025-12-31 | FIG-S007 / S008 |
| | 1,525 (+48% YoY) | 2026-03-31 | FIG-S009 |
| | 1,635 (+46% YoY) | 2026-06-30 | FIG-S005 |
| **Paid Customer >$1M ARR** | 67 | 2025-12-31 | FIG-S008 |
| **Net Dollar Retention Rate** | 134% / 136% (prior yr / FY2025) | 2025-12-31 | FIG-S007 |
| | 139% | 2026-03-31 | FIG-S009 |
| | 136% | 2026-06-30 | FIG-S005 |

**Scale relationship:** ~690,000 total Paid Customers against 15,218 above $10K ARR at the same date — **roughly 2.2% of Paid Customers sit above the $10K threshold.** NDR is calculated only on that 2.2%.

**Geography** *[FIG-S008]* — international revenue grew 45% YoY in FY2025. *[FIG-S008]* — "Opened an office in Bengaluru … to further invest in India, **Figma's second-largest market by monthly active users**." Note this references an MAU metric that is not otherwise disclosed.

**Customer concentration** — no concentration risk factor was located in the extracted 10-K text. Recorded as *not found*, not as *absent*.

**Designer vs developer vs other user categories** — not disclosed as segment metrics. The seat taxonomy (§2) implies role segmentation but the filings do not report seat mix or revenue by seat type.

---

## 4. Distribution evidence

**Two disclosed motions** *[FIG-S007]*:

> "We have an automated and highly efficient self-service option, available through Figma.com. To support our self-serve offering, our marketing team utilizes organic and paid channels to drive awareness and usage of all of our products."

> "We have a direct sales process through which we partner with customers to set up new accounts, upgrade customers across plans, and expand existing accounts."

**Go-to-market — recorded as COMPANY CLAIM** *[FIG-S007]*:

> "The combination of Figma's reputation as a product design leader, **the product virality inherent to Figma's collaborative and browser-based platform**, and our integrated marketing efforts have successfully driven awareness and adoption. Over time, many of our users grow with us into larger, managed accounts that often include more seats and more products."

> "While our **product-led, bottoms-up adoption** contributes to our growth, our direct sales motion helps us serve larger customers."

Per §3.3, these are evaluative and causal claims by the company about its own effectiveness. They establish **that Figma characterises its adoption as product-led and viral**. They do **not** establish that virality drives adoption, nor its relative contribution. No channel attribution, self-serve/sales revenue split, or cohort data is disclosed.

**Company claims about growth mechanisms** *[FIG-S009]*, all recorded as claims:
- "New Pro team conversions grew more than 150% year-over-year," attributed to "long-tail adoption of Figma's AI features."
- Customers using the MCP server showed seat growth "approximately 70% faster" than non-users. **Correlational as stated; no causal claim is made by the company and none should be inferred.**

---

## 5. Product expansion evidence

**Product surface as disclosed** *[FIG-S007]*: Figma Design, Figma Draw, Figma Make, Dev Mode, Figma Buzz, Figma Sites (+ Sites CMS), FigJam, Figma Slides. *[FIG-S008]* adds **Figma Weave**, from the **Weavy acquisition**.

**Beta/availability status is disclosed and matters** *[FIG-S007 footnotes]* — "Figma Buzz and Figma Sites are currently in beta." "The Content seat was announced in May 2025 and is not yet available. Figma Sites CMS is currently in beta."

**Stated direction** *[FIG-S007]* — the business section refers to intent to "explore adjacencies over time." *[FIG-S010]* — Figma describes itself as having evolved "from a design tool to a connected, AI-powered platform," on a mission to make "the entire design and product development process more collaborative, efficient, and fun."

**AI adoption metrics** *[FIG-S008, FIG-S009, FIG-S005]*:
- Figma Make grew "over 70% quarter-over-quarter"; over half of Paid Customers >$100K ARR building in it (Q4 2025)
- ~60% of Paid Customers >$100K ARR used Figma Make weekly (Q1 2026)
- Over 80% of Paid Customers >$10K ARR consuming AI credits weekly; over 50% using Figma agent weekly (Q2 2026)
- "Over 80% of Figma Make's weekly active users on Full seats also used Figma Design"
- MCP weekly active users in Figma Design "grew five times quarter-over-quarter" (Q1 2026)

**Ecosystem/partner activity** *[FIG-S008]*: integration of Gemini 3 Pro and Claude Opus 4.6 as experimental models; a "Claude Code to Figma" feature; a Figma MCP app in Claude; Make Connectors pulling data from Atlassian, GitHub, Notion and Linear; expanded ChatGPT integration for FigJam, Buzz and Slides.

**Recorded as company description only.** Whether this constitutes a deliberate strategy of expanding from design into broader product development is **not concluded here.** The filings describe the products and state an intent to explore adjacencies; that is the evidence, and the strategic reading belongs to a later stage.

---

## 6. Strategic investment evidence

**Observed investment — from audited figures** *[FIG-S007, FY2025 vs FY2024, GAAP]*:

| Line | FY2025 | FY2024 | Change |
|---|---|---|---|
| Research and development | $1,029,700K | $751,120K | +$278,580K, **+37%** |
| Cost of revenue | $185,527K | $87,514K | +$98,013K, **+112%** |

R&D detail *[FIG-S007]*: the $278.6M increase was "primarily due to a $256.0 million increase in employee-related costs, primarily driven by a **$207.1 million increase in stock-based compensation** expense and related employer payroll taxes, a $7.2 million increase in technical infrastructure and hosting costs, primarily driven by AI-related costs."

Cost-of-revenue detail *[FIG-S007]*: "primarily due to **$49.1 million of higher technical infrastructure and hosting costs relating to AI** and increased usage of our platform for paid users, a $31.9 million increase in employee-related costs, primarily driven by a $24.5 million increase in stock-based compensation… $9.7 million of higher amortization… and $5.9 million of higher payment processing fees."

**Other observed decisions:** Weavy acquisition (with a $24.5M Q4 2025 tax payment to Israeli authorities relating to IP transfer) *[FIG-S008]*; Bengaluru office opening and local data hosting for India *[FIG-S008]*; AI credit enforcement from 2026-03-18 *[FIG-S009]*.

**INFERRED STRATEGIC INTENT — none recorded.** Per the brief, observed investment is separated from inferred intent, and no intent is inferred at this stage.

---

## 7. Against-interest evidence *(high priority)*

The strongest admissions located in the 10-K. All *[FIG-S007]* unless noted.

**Management expects AI to compress margins — stated directly:**
> costs relating to "inference and model training, will impact our cost of revenue, research and development expenses, and sales and marketing expenses, which **we expect to negatively impact our gross margins and operating margins**. Given the newness and rapid development of these technologies, the impacts… [are uncertain]"

This is a first-party forward-looking admission of margin pressure, and the FY2025 cost-of-revenue increase of **112%** against revenue growth of **41%** is the arithmetic already reflecting it.

**Intense competition, including from AI-native substitutes:**
> "We face intense competition and could lose market share to our competitors…"
> Competitors include "companies that cater to multiple stages of the design and development process, point tools that address individual parts of the process but can expand to cover more, and **design-to-code and AI-driven companies and tools that compress or accelerate steps in the workflow**… or automatically generate and iterate on designs and code through a prompt or with limited human input."
> "We may also face competition from **customized or internal solutions** used by our customers or potential customers, particularly with AI's potential to accelerate the ability to develop and deploy new software."

**Pricing power may be constrained:**
> "Our ability to increase or maintain our prices may be constrained by competitive dynamics, customer expectations…"

**Dependence on third-party models:**
> "we generally rely on third-party models for the AI features on our platform" — with related supply-chain risk including risks to "model weights" and toolchains.

**Concentrated control — with its as-of date:**
> "The multi-class structure of our common stock has the effect of concentrating voting power with Dylan Field… Our Class B common stock has 15 votes per share, and our Class A common stock has one vote per share. Our Class C common stock has no voting rights, except as required by law."
> **"As of December 31, 2025, Mr. Field held approximately 72.3% of the voting power of our outstanding capital stock, including 24.4% of the voting power subject to the Wallace Proxy, which voting power may increase over time upon the exercise or settlement of equity awards held by Mr. Field."**

**Regulatory — against-interest findings by a competition authority** *[FIG-S011, CMA ME/7021/22, 2023-06-30]*:
> "Figma is the largest supplier of all-in-one screen design software."
> "The CMA found that Figma is **the clear market leader in all-in-one screen design software and is several times larger than any other supplier** of all-in-one screen design software."

Note this cuts both ways: it is adverse to the transaction while being favourable to Figma's competitive position. Market definition: "all-in-one screen design software" covering "the main stages of the screen design workflow from sketching through to prototyping and hand off," with point tools, template-based and prosumer software treated as **"out of market constraints."**

**Other risks noted** *[via FIG-S007 and a secondary summary of the same filing]*: rapid-growth scalability, limited operating history at current scale, AI outputs that may be "biased or harmful," pricing-model changes (specifically AI credits) potentially affecting "customer retention and revenue growth," foreign currency and interest-rate exposure, and volatility in cryptocurrency investments.

---

## 8. Financial evidence

All figures with period and basis. **GAAP unless marked.**

### Annual *[FIG-S007 audited; FIG-S008 release]*

| Metric | FY2025 | FY2024 |
|---|---|---|
| Revenue | $1,055,788K (+41%) | $749,011K |
| Cost of revenue | $185,527K (+112%) | $87,514K |
| Gross profit | $870,261K | $661,497K |
| **Gross margin (derived)** | **82.4%** | **88.3%** |
| Research and development | $1,029,700K (+37%) | $751,120K |
| Operating loss | $(1.3)B; margin (122)% | — |
| Non-GAAP operating income | $129.5M; margin 12% | — |
| Net loss | $(1.3)B | — |
| Non-GAAP net income | $166.8M | — |
| GAAP EPS | $(3.71) | — |
| Non-GAAP EPS | $0.32 basic / $0.30 diluted | — |
| Operating cash flow | $250.7M (24% margin) | — |
| Free cash flow | $242.7M (23% margin) | — |

**One-time item** *[FIG-S008]*: "a one-time stock-based compensation expense of **$975.7 million**, which Figma recognized in the third quarter as a result of its initial public offering." Plus a $24.5M Q4 tax payment relating to the Weavy IP transfer.

**Derivation note:** gross margins above are computed from the 10-K's own revenue and gross profit figures. Labelled *derived*, not quoted.

### Quarterly

| Metric | Q4 2025 | Q1 2026 | Q2 2026 |
|---|---|---|---|
| Revenue | $303.8M (+40%) | $333.4M (+46%) | $370.1M (+48%) |
| GAAP gross margin | 82% | 79% | 84% |
| Non-GAAP gross margin | — | — | 85% |
| GAAP operating loss | $(195.5)M, (64)% | $(137.4)M | $(117.3)M, (32)% |
| Non-GAAP operating income | $44.0M, 14% | $52.1M, 16% | $36.1M, 10% |
| GAAP net loss | $(226.6)M | $(142.4)M | $(112.2)M |
| Non-GAAP net income | $43.0M | $56.5M | $42.6M |
| Operating cash flow | $39.9M (13%) | $97.3M (29%) | $60.9M (16%) |
| Free cash flow | $38.5M (13%) | $88.6M (27%) | $53.2M (14%) |
| Cash and securities | — | — | $1.7B |

Q3 2025 revenue growth was **38%** *[FIG-S009, referenced]*. Sequence: 38% → 40% → 46% → 48%.

### FY2026 guidance — successive revisions, **not** conflicts

| Given on | FY2026 revenue guidance | Implied growth |
|---|---|---|
| 2026-02-18 *[FIG-S008]* | $1.366–1.374B | 30% |
| 2026-05-14 *[FIG-S009]* | $1.422–1.428B | 35% |
| 2026-08-05 *[FIG-S005]* | $1.463–1.467B (raised $40.0M) | 39% |

Classified as **period differences / successive guidance revisions**, per convention 4.

**Stock-based compensation** — not isolated as a standalone line in the extracted text beyond the $975.7M one-time IPO charge and the component increases within R&D ($207.1M) and cost of revenue ($24.5M). Full SBC reconciliation not yet extracted.

**No interpretation offered.** Per the brief, no assessment of capital efficiency or any similar characterisation is made here.

---

## 9. Open questions created by the filings

1. **Gross margin trajectory.** 88.3% (FY2024) → 82.4% (FY2025) → 79% (Q1 2026) → 84% (Q2 2026). Is the Q1 trough AI-inference-driven, and is the Q2 recovery from credit enforcement, mix, or something else? The filings state the direction of pressure but not the quarter-by-quarter driver.
2. **Does AI credit enforcement (from 2026-03-18) change the revenue model?** It introduces consumption pricing alongside per-seat. Its revenue contribution is not disclosed.
3. **What is the seat mix?** Six seat types exist; no revenue or count split is disclosed for any of them.
4. **What is the self-serve vs direct-sales split?** Both motions are disclosed; neither is quantified.
5. **What is the MAU base?** The India disclosure references "monthly active users" as a metric Figma tracks internally. It is not reported.
6. **Why does NDR move 136 → 139 → 136?** Not explained in the releases.
7. **What is in the S-1?** Pre-IPO history, cohort data, early pricing, and the pre-IPO capital structure remain unretrieved.
8. **Customer concentration** — is there a risk factor? Not located; needs a targeted search of the full 10-K text.

---

## 10. What the filings still cannot establish

- **Any growth-loop mechanism.** The filings assert product-led, bottoms-up adoption and "product virality" as company claims. They contain no cohort data, channel attribution, invitation/conversion mechanics, or evidence of how a non-user becomes a user.
- **The network-effect question.** Nothing in the filings bears on whether an existing user gains value when a specific additional user joins, or whether that user must be inside their own organisation. **§6.4 still cannot be run.**
- **Any moat claim.** The CMA establishes market leadership under a specific 2023 market definition. Market leadership is a position, not a mechanism, and does not establish defensibility.
- **Switching costs.** Not addressed. NDR of 136% is compatible with switching costs, network effects, or product satisfaction equally, and discriminates between none of them.
- **Segment composition.** No designer/developer/other split, no vertical or company-size breakdown below the ARR bands.
- **Historical pricing.** The 10-K describes pricing as of 2025-12-31 only.
- **Current product architecture.** Filings do not describe technical architecture.
- **Competitive position beyond 2023.** The CMA definition is three years old, predates the AI-native competitors the 10-K now names, and was reached at Phase 1 of an inquiry that never concluded.
- **Proposed transaction value and termination fee.** Still unverified from any opened primary document.

---

## Appendix — discrepancies classified

| ID | Item | Classification | Note |
|---|---|---|---|
| **FIG-C005** | FY2024 gross margin: a summary of FIG-S008 reported "92%"; 10-K audited figures derive to **88.3%** | **Accounting-basis / derivation difference** | The audited income statement governs. Illustrates why derived margins must be computed from primary figures rather than repeated from summaries |
| **FIG-C006** | Voting power: 72.3% as of 2025-12-31 *[FIG-S007]*; a ~73.6% figure has been referenced elsewhere as "immediately following the IPO" | **Period difference — not a conflict** | Both may be correct at their respective dates. Any use must carry its as-of date. The S-1/424B4 would confirm the post-IPO figure |
| **FIG-C007** | FY2026 guidance $1.366–1.374B → $1.422–1.428B → $1.463–1.467B | **Period difference / successive revision** | Not a conflict |
| **FIG-C008** | Seat types: pricing page shows Full/Dev/Collab; 10-K discloses Viewer, Collab, Content, Dev, Full | **Definition difference** | Viewer is free and so absent from paid pricing; Content is "announced… not yet available." Both sources correct on their own terms |
| **FIG-C003** *(carried)* | Proposed transaction value ~$20B; termination fee $1B | **Unverified** | Not stated in FIG-S011 or the CMA case page. Requires Adobe's 8-K or the termination agreement |
| **FIG-C004** *(carried)* | "Over 80% of professional product design market" | **Unverified** | Not present in FIG-S011. May appear in the Phase 2 provisional findings full report, not yet retrieved |
