> **IMPORTANT: This document contains source discovery and evidence mapping only. It is not the Figma teardown and contains no final strategic judgments.**

# Figma — Source Register (Stage 1)

---

## 1. Research metadata

| | |
|---|---|
| **Product** | Figma |
| **Stage** | 1 — Source discovery and evidence mapping |
| **Research cutoff** | 2026-08-31 |
| **Session date** | 2026-08-30 |
| **Methodology** | `docs/research-methodology.md` v1.0 (LOCKED) |
| **Status** | **PARTIAL — not complete.** See §9 |
| **Sources verified (opened and inspected)** | **11** (6 in pass 1; 5 added in pass 1b) |
| **Sources attempted and blocked** | 3 remaining (was 5; 3 resolved, 1 added) |
| **Categories not yet swept** | C (historical/archive), E (independent journalism), F (Tier 5) |

### Pass 1b — public-company evidence extraction (2026-08-30)

Sources **FIG-S007** to **FIG-S011** were verified in a second pass and are documented in full in **[`04-public-company-evidence.md`](04-public-company-evidence.md)**:

| ID | Document | Tier |
|---|---|---|
| FIG-S007 | Figma **Form 10-K, FY2025** | T1 |
| FIG-S008 | Q4 & FY2025 results release, 2026-02-18 | T1 |
| FIG-S009 | Q1 2026 results release, 2026-05-14 | T1 |
| FIG-S010 | Figma blog, S-1 filing announcement, 2025-07-01 | T2 |
| FIG-S011 | CMA Phase 1 decision summary, **ME/7021/22**, 2023-06-30 | T1 |

**Access breakthrough:** `pdftotext` was located locally, resolving FIG-X003, FIG-X004 and FIG-X006, and providing a route to the 10-K via Figma's own `q4cdn` host that bypasses sec.gov entirely. Extracted text retained at `research/figma/_extracted/`.

**Standing conventions adopted in pass 1b** (transaction terminology, time-bound ownership figures, financial-period discipline, and a five-way discrepancy taxonomy) are documented at the head of `04-public-company-evidence.md` and apply to all subsequent passes.

### Stage 1C — mechanism research (2026-08-30)

Sources **FIG-S012** to **FIG-S016**, documented across `07`–`13`:

| ID | Source | Tier | Type |
|---|---|---|---|
| **FIG-S012** | **Direct observation** — Figma Community index and a Community file page, unauthenticated, 2026-08-30 | — | **OBSERVATION** (OBS-001, OBS-002) |
| **FIG-S013** | forum.figma.com — "Clearer indication when charging for additional editors", active 2021-08 → 2023-10 | T5 | Practitioner |
| **FIG-S014** | help.figma.com — "Manage seats in Figma", retrieved 2026-08-30 | **T2** | Official documentation |
| **FIG-S015** | forum.figma.com — "We need to let people know that if they approve editing access, someone will get charged", 2025-04-30 | T5 | Practitioner |
| **FIG-S016** | freeCodeCamp — Fatuma Abdullahi, Figma→Penpot component migration, 2025-03-26 | T4 | Independent, hands-on |

**Tier 5 admissibility** (§2.4) is satisfied for S013 and S015: only available evidence of the lived mechanism, contemporaneous, specific and falsifiable, capped at stated status, limitation disclosed. Two independent threads four years apart corroborate each other.

**Observation limitation:** 9 of 10 requested product observations are **BLOCKED** — they require an authenticated session, and no account was created. Recorded in `08`, not substituted with documentation.

**Category coverage after Stage 1C:** C partial (practitioner/migration accounts located; no historical retrospectives) · E partial (one independent hands-on source; comparison articles found but not opened, cited as leads only) · F partial (two Figma forum threads; no broader community sweep).

### 1.1 Material finding that changes the research plan

**Figma is a public company with ongoing SEC reporting obligations.** Evidence: an official Figma investor-relations press release dated 2026-08-05 announcing Q2 2026 results, stating ticker **NYSE: FIG**, with GAAP and non-GAAP financials, guidance, and formally defined customer metrics. SEC EDGAR carries Figma, Inc. under CIK 0001579878 with Form 10-Q filings for FY2026.

This **materially raises Figma's evidence ceiling** above what was assumed when Stage 1 was scoped, and it invalidates the working premise that Figma's strong evidence base derives principally from the Adobe transaction and regulatory record. Both are now true, and the filings are the stronger source. The remaining Stage 1 sweep should be re-prioritised around Figma's own filings before proceeding. **Flagged for review before Stage 1 continues.**

---

## 2. Source inventory

### Verified sources

---

#### **FIG-S001** — How Figma's multiplayer technology works

| | |
|---|---|
| **Title** | How Figma's multiplayer technology works |
| **Author / Publisher** | Evan Wallace (co-founder) / Figma |
| **URL** | `https://www.figma.com/blog/how-figmas-multiplayer-technology-works/` |
| **Publication date** | 2019-10-16 |
| **Relevant as-of date** | 2019-10-16 (architecture as of that date) |
| **Tier** | T2 — official technical publication |
| **Source type** | `company-communication` |
| **Disclosure type** | Subject-company disclosure |
| **Domains** | Product Architecture & Capabilities (primary); Strategic Bets (corroborating) |
| **Against-interest?** | **YES — partially.** See below |
| **Classification** | **AUTHORITATIVE** for product architecture; **CORROBORATING** for engineering intent |

**Can establish:** The synchronisation architecture as of 2019 — WebSocket client/server connection, one server process per document, full-state download then incremental sync, client-generated unique object IDs, fractional indexing for tree ordering, and offline editing with reapplication on reconnect. Also establishes the explicit rejection of Operational Transforms.

**Cannot establish:** Current architecture (seven years stale for a fast-moving system); performance characteristics at scale; competitive comparison; any business or adoption claim.

**Against-interest content — high value.** The post states plainly that **Figma does not use true CRDTs** — "Figma isn't using true CRDTs though… Since Figma is centralized (our server is the central authority), we can simplify our system" — and documents real limitations: simultaneous editing of the same text value does not work; concurrent reparenting can cause objects to temporarily disappear, which the author calls "not great"; conflicting property changes resolve last-writer-wins with no merging.

**Limitation note:** A widely repeated secondary claim that Figma "uses CRDTs" is **contradicted by this primary source**. Any downstream source asserting a CRDT architecture should be treated as unreliable on technical matters. This is a concrete instance of the §12 rule that AI-suggested characterisations require verification: the CRDT claim appeared in search summaries and is wrong.

---

#### **FIG-S002** — Figma pricing page

| | |
|---|---|
| **Title** | Pricing |
| **Publisher** | Figma |
| **URL** | `https://www.figma.com/pricing/` |
| **Publication date** | Undated (live page) |
| **Relevant as-of date** | **2026-08-30 (retrieval date)** |
| **Tier** | T2 — official pricing |
| **Source type** | `company-communication` |
| **Disclosure type** | Subject-company disclosure |
| **Domains** | Pricing & Business Model (primary); Users & Segments (corroborating) |
| **Against-interest?** | No |
| **Classification** | **AUTHORITATIVE** for list pricing and seat taxonomy as of retrieval |

**Can establish:** The list pricing architecture and seat taxonomy exposed by Figma as of 2026-08-30. Four plans — Starter (free), Professional, Organization, Enterprise. **Three paid seat types** — Full, Dev, Collab — priced separately per plan (Professional $16/$12/$3; Organization $55/$25/$5; Enterprise $90/$35/$5 per month). AI credits are allocated per seat type and per plan. Starter includes unlimited drafts and a daily/monthly AI credit cap. On paid plans, viewing and commenting are available "without purchasing extra seats."

**Cannot establish:** Realised monetisation mix; effective or negotiated pricing at enterprise scale; willingness to pay; revenue contribution by tier or seat type; historical pricing; discount structures.

**Limitation note:** List price only. §5.2 requires that list and effective pricing never be conflated. The three-seat-type structure and AI credit allocation appear to be a materially different pricing architecture from earlier eras and **must not be projected backwards** — historical pricing requires archive evidence (Category C, not yet gathered).

---

#### **FIG-S003** — Design: Meet the Internet

| | |
|---|---|
| **Title** | Design: Meet the Internet |
| **Author / Publisher** | Dylan Field (co-founder & CEO) / Figma |
| **URL** | `https://www.figma.com/blog/design-meet-the-internet/` |
| **Publication date** | 2015-12-03 |
| **Relevant as-of date** | 2015-12-03 |
| **Tier** | T2/T3 — official announcement, founder-authored |
| **Source type** | `company-communication` |
| **Disclosure type** | Subject-company disclosure |
| **Domains** | Strategic Bets (primary); Product Architecture (corroborating); Corporate history |
| **Against-interest?** | No |
| **Classification** | **AUTHORITATIVE** for stated intent and product state at launch; **INADMISSIBLE** for whether the strategy worked |

**Can establish:** The Preview Release announcement and its date. The *stated* founding rationale — that "Software should be online, real-time, and collaborative," formed by analogy to Google Docs. The WebGL origin: an April 2011 demonstration by Evan Wallace of browser-based GPU image processing. The stated competitive framing that designers lacked collaborative workflows while engineers had them. Three capabilities announced as forthcoming in 2016: Slack integration, shared asset library, and simultaneous multiplayer editing.

**Cannot establish:** That this rationale actually drove adoption; the accuracy of the characterisation of competing tools; any outcome.

**Critical dating note — high analytical value.** This source establishes that **simultaneous multiplayer editing was announced as forthcoming in 2016, not present at the December 2015 preview release.** Any claim that Figma launched with multiplayer is contradicted here. The sequencing of the browser bet and the multiplayer bet is therefore evidenced and separable, which matters directly for Bets & Tensions.

---

#### **FIG-S004** — CMA case page: Adobe / Figma merger inquiry

| | |
|---|---|
| **Title** | Adobe / Figma merger inquiry |
| **Publisher** | Competition and Markets Authority (UK) |
| **URL** | `https://www.gov.uk/cma-cases/adobe-slash-figma-merger-inquiry` |
| **Publication date** | Case page, updated through 2023-12-19 |
| **Relevant as-of date** | 2023-05-03 to 2023-12-19 |
| **Tier** | T1 — regulatory |
| **Source type** | `company-filing` (regulatory) |
| **Disclosure type** | **Regulatory / transaction review** (§7.4) |
| **Domains** | Corporate & Ownership (primary); Defensibility, Users & Segments (via market definition) |
| **Against-interest?** | **YES** — findings adverse to both parties |
| **Classification** | **AUTHORITATIVE** for the procedural record; document-level evidence pending retrieval |

**Can establish:** The complete procedural chronology of the UK inquiry, verified from the case page itself:

| Date | Document |
|---|---|
| 2023-05-03 | Commencement notice |
| 2023-06-30 | Phase 1 decision summary and press notice |
| 2023-07-13 | Decision to refer; terms of reference; inquiry group appointed |
| 2023-07-26 | Issues statement |
| 2023-08-07 | Full text of Phase 1 decision |
| 2023-08-17 | Notice of extension of inquiry period |
| 2023-08-21 | Notice of termination of extension |
| 2023-09-28 | Parties' joint response and evidence appraisal paper |
| 2023-10-25 | Notice of extension |
| 2023-11-28 | Summary of provisional findings; notice of possible remedies |
| 2023-11-30 | Full provisional findings report with appendices |
| 2023-12-18 | Parties' response to notice of possible remedies |
| 2023-12-19 | **Cancellation of merger reference** |

**Establishes definitively: no CMA final report was ever published.** The case page states: *"The CMA has cancelled its merger reference into the anticipated acquisition by Adobe Inc. of Figma, Inc."* The inquiry ended at provisional findings.

**Cannot establish:** Deal value — **not stated on the case page**. Market definitions, market share figures, or substantive findings — these live in the underlying documents, which have not yet been retrieved.

**Limitation note — important.** Provisional findings are provisional by definition and were never finalised or tested through the remedies process. Under §7.4 they carry real weight as regulatory examination but **must never be cited as settled regulatory conclusions**, and any share-of-supply figure within them carries the CMA's own methodological caveats, which have not yet been read.

---

#### **FIG-S005** — Figma Announces Second Quarter 2026 Financial Results

| | |
|---|---|
| **Title** | Figma Announces Second Quarter 2026 Financial Results |
| **Publisher** | Figma, Inc. (investor relations) |
| **URL** | `https://investor.figma.com/news-events/news/news-details/2026/Figma-Announces-Second-Quarter-2026-Financial-Results/default.aspx` |
| **Publication date** | 2026-08-05 |
| **Relevant as-of date** | Quarter ended 2026-06-30 |
| **Tier** | **T1** — public-company financial disclosure |
| **Source type** | `company-filing` |
| **Disclosure type** | Subject-company disclosure (regulated) |
| **Domains** | Pricing & Business Model, Users & Segments, Distribution & Growth, Corporate |
| **Against-interest?** | **YES** — discloses margin deterioration |
| **Classification** | **AUTHORITATIVE** for reported financials and formally defined metrics |

**Can establish (all figures as reported, quarter ended 2026-06-30):**

*Financials* — Revenue $370.1M, +48% YoY; H1 revenue $703.522M. GAAP gross profit $309.6M (84% margin); non-GAAP $314.0M (85%). GAAP operating loss $(117.3)M, −32% margin; non-GAAP operating income $36.1M, 10% margin. GAAP net loss $(112.2)M; non-GAAP net income $42.6M. GAAP EPS $(0.21); non-GAAP $0.08. Operating cash flow $60.9M; free cash flow $53.2M. Cash and securities $1.7B.

*Customer metrics, with the company's own definitions* — Paid Customer defined as *"a customer account that is billed separately for which Figma has an active paid subscription as of the last day of the applicable period of measurement."* Paid customers >$10K ARR: 15,964 (+34% YoY). Paid customers >$100K ARR: 1,635 (+46% YoY). Net dollar retention **136%** as of 2026-06-30, defined as current-period ARR over prior-period ARR for customers above $10K ARR, reflecting expansion, contraction and churn.

*Product adoption* — Over 80% of paid customers >$10K ARR consuming AI credits weekly; over 50% using Figma agent weekly as of 2026-07-31.

*Guidance* — Q3 2026 revenue $373.0–375.0M; FY2026 $1.463–1.467B, raised by $40.0M; FY non-GAAP operating income $125.0–135.0M.

**Against-interest content:** GAAP operating margin deteriorated to −32% from +1% in Q2 2025; H1 GAAP operating margin −36% versus +9% prior year. Operating cash flow margin fell to 16% from 25%; free cash flow margin fell correspondingly. The release attributes part of this to increased sales and marketing spend around the Config conference.

**Cannot establish:** Revenue split by seat type, plan, or product line. Geographic mix. Seat counts. Free-tier user counts. Customer counts below the $10K ARR threshold. Any pre-IPO historical figure. Causal attribution for growth.

**Limitation note:** A press release is the company's own presentation of its results. The 10-Q for the same period (filed 2026-08-05, SEC accession `000162828026053348`) is the superior source and has **not yet been retrieved** — see §6.

---

#### **FIG-S006** — An Interview with Figma CEO Dylan Field About Design and AI

| | |
|---|---|
| **Title** | An Interview with Figma CEO Dylan Field About Design and AI |
| **Author / Publisher** | Ben Thompson / Stratechery |
| **URL** | `https://stratechery.com/2026/an-interview-with-figma-ceo-dylan-field-about-design-and-ai/` |
| **Publication date** | 2026-06-25 |
| **Relevant as-of date** | 2026-06-25 |
| **Tier** | T3 (executive statements) within a T4 publication |
| **Source type** | `interview` |
| **Disclosure type** | Subject-company statements, independently published |
| **Domains** | Strategic Bets, Defensibility, Distribution & Growth |
| **Against-interest?** | **YES — partially** |
| **Classification** | **AUTHORITATIVE** for stated intent; **SUGGESTIVE** for outcomes; **INADMISSIBLE** for effectiveness |

**Access:** Verified publicly accessible in full, not paywalled.

**Can establish:** What Figma's CEO stated publicly, as of June 2026, about AI positioning ("AI is clearly going to be — and already is — a tailwind for our business"; "TAM-expansive in huge ways"), model strategy ("You always want to be in a place where models are swappable"), and his framing of Figma's differentiation around collaboration and direct manipulation. Also that Field himself invokes network effects and "data liquidity" as sources of advantage — **which is a company claim requiring the §6.4 test, not evidence that a network effect exists.**

**Against-interest content:** Field acknowledges designers do not universally want to code, and that "you can't filter all of creation through the lens of AI." He also engages directly with market scepticism about AI winners and losers.

**Reported context requiring independent verification:** the piece references an **IPO in 2025 at $56.3 billion** and a subsequent market capitalisation **under $10 billion**. Both figures are **T4 journalism, unverified against primary sources**, and are recorded here as leads only. See conflict **FIG-C002**.

**Cannot establish:** Whether any stated strategy worked. Whether a network effect exists. Any financial figure.

---

### Sources attempted and blocked — recorded for transparency

| ID | Target | Failure | Consequence |
|---|---|---|---|
| **FIG-X001** | SEC EDGAR — Adobe Form 8-K, 2023-12-17 (`adbe-20231217.htm`) | **HTTP 403** — sec.gov blocks the fetcher | Termination fee and proposed transaction value remain **unverified** |
| **FIG-X002** | SEC EDGAR — Figma Form 10-Q, Q2 FY2026 (`fig-20260630.htm`) | **HTTP 403** | Superior version of FIG-S005 unretrieved |
| ~~FIG-X003~~ | CMA *Notice of Provisional Findings* | **RESOLVED (pass 1b)** — extracted via `pdftotext` | Notice only (96 lines); the **full provisional findings report of 2023-11-30 remains unretrieved** |
| ~~FIG-X004~~ | CMA *Phase 1 Decision Summary* | **RESOLVED (pass 1b)** → **FIG-S011** | Market definitions now verified |
| **FIG-X005** | Justia — Adobe/Figma mutual termination agreement | **HTTP 403** | Agreement text unverified |
| ~~FIG-X006~~ | Figma Q1 2026 prepared remarks PDF | **RESOLVED (pass 1b)** — extracted, 440 lines | Extracted but **not yet read**; superseded for headline figures by FIG-S009 |
| **FIG-X007** | Figma **S-1 / S-1A / 424B4** (2025) | **HTTP 403** on sec.gov; not hosted on Figma's q4cdn mirror | Pre-IPO history, cohort data, early pricing and post-IPO voting figure unavailable |

**These are genuine access limitations, not evidence gaps in the world.** Every blocked document exists and is public. Resolving them requires either a PDF text extractor in the local environment or a fetch path that sec.gov does not reject. This should be fixed before Stage 1 continues, because FIG-X002 and FIG-X003 are among the highest-value documents available for this product.

---

## 3. Source–claim matrix

| # | Domain | Strongest available | Corroborating | Weakest useful | Major gaps |
|---|---|---|---|---|---|
| 1 | **Corporate & Ownership** | FIG-S005 (T1, current) | FIG-S004 (T1, 2023 transaction record) | FIG-S006 (T4 context) | Deal value unverified; termination fee unverified; IPO facts unverified; cap table and funding history not gathered |
| 2 | **Product Architecture & Capabilities** | FIG-S001 (T2, authoritative but **2019**) | FIG-S003 (T2, 2015 state) | — | **No current architecture source.** API, plugin and help documentation not yet gathered |
| 3 | **Users & Segments** | FIG-S005 (paid customers by ARR band, defined) | FIG-S002 (seat types imply role segmentation) | FIG-S006 | No segment-level data; no free-tier population; no persona or vertical evidence |
| 4 | **Pricing & Business Model** | FIG-S002 (T2, current list) + FIG-S005 (T1, realised revenue) | — | — | **No historical pricing.** No effective/negotiated pricing. No revenue split by seat type or plan |
| 5 | **Distribution & Growth** | FIG-S005 (NDR 136%, customer growth by band) | FIG-S003 (stated intent), FIG-S006 | — | **Weakest domain.** No acquisition-channel evidence, no self-serve vs sales-led split, no cohort data |
| 6 | **Strategic Bets & Tensions** | FIG-S003 (contemporaneous 2015 statement of intent) | FIG-S001 (2019 engineering trade-offs), FIG-S006 (2026 stated posture) | — | Gap 2016–2023; no evidence on pricing-model changes or the AI pivot decision |
| 7 | **Defensibility / Moats** | FIG-S004 (regulatory market examination — pending document retrieval) | FIG-S005 (NDR as a retention signal) | FIG-S006 (company claim only) | **Critical gap.** Market share figures unread (FIG-X003); no competitive or switching-cost evidence |

Domain 2 has an authoritative source that is seven years old. Domains 5 and 7 are the thinnest and matter most to the teardown's central analysis.

---

## 4. Domain evidence map

**Evidenced today, at usable strength:** current financial performance and its formal metric definitions; current list pricing and seat taxonomy; the 2019 synchronisation architecture including its acknowledged limitations; the 2015 stated founding rationale and the fact that multiplayer postdated launch; the complete UK regulatory procedural record and the definitive fact that no final report exists.

**Not yet evidenced:** current product architecture; acquisition mechanics; any market share figure; historical pricing; the intent behind the AI pivot; competitive dynamics; anything about the 2016–2023 period beyond the transaction record.

---

## 5. Preliminary conflict register

| ID | Claim | Source A | Source B | Apparent discrepancy | Status |
|---|---|---|---|---|---|
| **FIG-C001** | Figma's sync architecture uses CRDTs | Multiple secondary sources and search summaries assert CRDTs | **FIG-S001** (primary): *"Figma isn't using true CRDTs"* | Secondary sources contradict the primary technical source | **RESOLVED** — primary governs. Any source asserting CRDTs is unreliable on technical claims |
| **FIG-C002** | Figma's valuation trajectory | **FIG-S006**: IPO 2025 at $56.3B, later market cap under $10B | **FIG-S005**: revenue +48% YoY, third consecutive quarter of *accelerating* growth, guidance raised | Not a factual conflict — a **valuation-vs-fundamentals divergence**. Both may hold simultaneously | **OPEN** — genuinely notable. Requires primary verification of both figures. Analytically important |
| **FIG-C003** | Adobe/Figma deal value (~$20B) and termination fee ($1B) | Widely reported in search results | **No opened primary source** | Not a conflict between sources — a **verification failure**. Neither figure has been confirmed from a document actually opened | **UNVERIFIED** — must not be published until FIG-X001 or FIG-X005 is retrieved |
| **FIG-C004** | Reported market share ("over 80% of professional product design") | Attributed to CMA in secondary summaries | CMA case page (**FIG-S004**) does not state it; underlying document unread (**FIG-X003**) | Figure may be accurate but is **third-hand**, and its denominator and methodology are unknown | **UNVERIFIED** — §5.2 requires the denominator before any share claim |

FIG-C003 and FIG-C004 are the most instructive entries here. Both are figures that "everybody knows," both would have passed unchallenged into a teardown, and neither has been verified against a document actually opened.

---

## 6. Evidence ceiling assessment

Availability of evidence, **not** an evaluation of Figma.

| Domain | Strength | Can safely establish | Cannot yet establish |
|---|---|---|---|
| Corporate & Ownership | **STRONG** | Current public status, ticker, quarterly financials, complete UK regulatory chronology | Deal value, termination fee, IPO terms, funding history |
| Product Architecture | **MODERATE** | 2019 architecture with primary-sourced limitations; 2015 launch state | Current architecture; performance at scale; AI feature mechanics |
| Users & Segments | **WEAK** | Paid customer counts at two ARR thresholds with defined methodology | Segment composition, free-tier scale, personas, verticals |
| Pricing & Business Model | **STRONG (current) / WEAK (historical)** | Current list pricing, seat taxonomy, realised revenue, NDR, margins | Historical pricing, effective pricing, revenue mix by seat or plan |
| Distribution & Growth | **WEAK** | Net dollar retention and customer growth by ARR band | Acquisition channels, self-serve vs sales split, cohort behaviour, loop mechanics |
| Strategic Bets & Tensions | **MODERATE** | 2015 stated intent, 2019 engineering trade-offs, 2026 stated posture, the transaction attempt and its failure | The 2016–2023 middle period; decision rationale for pricing and AI |
| Defensibility / Moats | **WEAK (pending retrieval)** | That a competition authority examined the market and provisionally found competition concerns | Any market share figure; switching costs; competitive dynamics |

**Overall ceiling — a note worth carrying forward.** Figma is unusually well-evidenced on *financial and corporate* matters and unusually thinly evidenced on *growth mechanics* — the inverse of what this teardown most needs. The Growth Loops and Moats sections are currently the least supported, and no amount of financial disclosure substitutes for evidence about how users actually arrive and spread.

---

## 7. Open research questions

**Blocking — must resolve before Stage 2**
1. Retrieve Figma's Form 10-Q (FY2026 Q2) and the most recent 10-K. Requires a working sec.gov fetch path. *These are the highest-value unretrieved documents.*
2. Retrieve the CMA provisional findings PDF. Requires local PDF text extraction. Contains market definitions and share figures.
3. Verify deal value and termination fee from a primary document (FIG-C003).
4. Verify IPO date, pricing and current market capitalisation from primary sources (FIG-C002).

**High priority**
5. Current product architecture — is there any post-2019 official engineering source?
6. Historical pricing via web archive — required for any claim about pricing evolution.
7. Acquisition-channel evidence — the weakest domain and the one the growth loop depends on.
8. Figma's S-1 / registration statement, if a 2025 IPO occurred: the single richest source for history, cohort data, segment detail and risk factors. **Not yet searched for.**

**Medium**
9. EC / FTC materials on the transaction.
10. Config keynote materials.
11. Evan Wallace's personal-site version of FIG-S001 — same content or different?

---

## 8. Candidate hypotheses — NOT evidence, NOT conclusions

Recorded per §11-E and quarantined. Each is untested.

- **H1.** The collaboration mechanism may constitute a **local/clustered** network effect rather than a global one — value plausibly depends on a user's own colleagues adopting, not on Figma's total user count. *Test against §6.4. Not decided.*
- **H2.** The three-tier seat taxonomy (Full/Dev/Collab) may function as a price-discrimination mechanism across roles rather than as a packaging convenience. *Requires evidence on seat mix.*
- **H3.** NDR of 136% alongside 34% growth in >$10K customers may indicate expansion-weighted rather than acquisition-weighted growth. *Requires cohort data.*
- **H4.** The browser bet (2015) and the multiplayer bet (announced for 2016) appear to be **separable decisions** taken sequentially. If so they are two distinct entries in Bets & Tensions, not one. *FIG-S003 supports separability; needs corroboration.*
- **H5.** The 2019 architectural limitations — no simultaneous text editing, last-writer-wins properties — may have persisted or been resolved. *Currently unknown; bears on any durability claim.*
- **H6.** A valuation/fundamentals divergence (FIG-C002) may reflect market scepticism about AI disruption of design tooling. *Speculative. Requires evidence.*

### Section 7 note — network effect evidence status

Per the Stage 1 brief, evidence bearing on the network-effect classification was to be collected without deciding. **Almost none has been collected.** What exists: Field claims network effects (FIG-S006 — a company claim, inadmissible for the question); NDR 136% (FIG-S005 — evidences *retention and expansion*, which is compatible with a network effect but equally compatible with switching costs or workflow lock-in, and therefore **discriminates nothing**).

**No evidence yet exists bearing on the decisive question: whether an existing user gains value when a specific additional user joins, and whether that user must be inside their own organisation.** The §6.4 test cannot be run. Classification A/B/C/D remains genuinely undetermined, and any answer given today would be unevidenced.

---

## 9. Stage 1 completion assessment

**Status: PARTIAL — approximately 35% complete. Stage 1 is NOT closed.**

| Category | Status |
|---|---|
| A — Corporate / transaction / regulatory | **Partial** — CMA chronology verified; all substantive documents blocked; SEC filings unretrieved |
| B — Product / technical | **Partial** — two historical sources verified; no current architecture, API, or help documentation |
| C — Historical / archive | **Not started** |
| D — Founder / executive | **Partial** — one 2026 interview and one 2015 founder post verified |
| E — Independent sources | **Not started** as a systematic sweep |
| F — Tier 5 community | **Not started** |

**Against the §9 stopping rule:** criteria 3 and 4 are met — gaps and conflicts are identified. Criteria 1, 2, 5 and 6 are **not** met.

**Recommendation: pause for review rather than continue, for two reasons.**

First, the §1.1 finding changes the plan. If Figma has been public since 2025, an S-1 and one or more 10-Ks exist, and those documents would likely resolve most of the WEAK domains at once — segment detail, cohort behaviour, acquisition motion, competitive risk factors, and pricing history are exactly what registration statements and annual reports contain. Continuing the planned sweep of secondary sources before retrieving them would waste effort and risk building the evidence base on weaker material than necessary.

Second, three access failures are blocking the highest-value documents and are environmental rather than evidential. Fixing them — a PDF text extractor, and a fetch path sec.gov accepts — is worth more than any further searching.

**Self-audit against the §12 quality bar:** every source in §2 was opened and inspected; no AI-suggested URL was recorded as verified; five failures are recorded rather than quietly dropped; classification was assigned per claim domain rather than by prestige; company claims are marked as such throughout; historical and current evidence are dated separately; four conflicts are registered rather than silently resolved; no inference has been promoted to fact; no teardown content has been written; no gap has been filled with weak sources; against-interest material has been actively recorded for three sources.
