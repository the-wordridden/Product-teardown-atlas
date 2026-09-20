> **IMPORTANT: This is a structured analytical map, not the Figma teardown. Every strategic interpretation below is marked CANDIDATE and none is a final judgment. No section here is authored prose.**

# Figma — Synthesis Map

| | |
|---|---|
| **Stage** | 2 — Structured synthesis (pre-authoring) |
| **Research cutoff** | 2026-08-31 |
| **Session date** | 2026-08-30 |
| **Inputs** | `01-source-register.md`, `04-public-company-evidence.md` |
| **Methodology** | `docs/research-methodology.md` v1.0 (LOCKED) |

**Refactor note.** The Stage 1B review asked that several conclusive statements be downgraded to analytical questions. A grep of the dossier for `VERIFIED.*network`, `DISPROVED`, `DOMINANT`, `Technical Moat`, `Ecosystem Moat`, `Retention/Expansion` and `Strategic Bet 1` returns no matches — none of those statements exist in the dossier, which already reads *"§6.4 still cannot be run"* and *"INFERRED STRATEGIC INTENT — none recorded."* The **H9 reframing has been adopted** and appears at §3 and §D2 below. The epistemic postures requested are carried throughout this document.

**Source key:** S001 multiplayer post (2019) · S002 pricing page (2026-08-30) · S003 *Design: Meet the Internet* (2015-12-03) · S004 CMA case page · S005 Q2 2026 release · S006 Stratechery interview (2026-06-25) · S007 **10-K FY2025** · S008 Q4/FY2025 release · S009 Q1 2026 release · S010 S-1 announcement blog · S011 **CMA Phase 1 ME/7021/22**

---

# SECTION 1 — VITALS

**1. What we know.** Founded 2012 [S010]. Public on NYSE under **FIG** [S005]. Multi-class stock: Class B 15 votes/share, Class A 1 vote, Class C none [S007]. FY2025 revenue **$1,055,788K, +41%** [S007]. Product surface: Figma Design, Draw, Make, Dev Mode, Buzz, Sites (+CMS), FigJam, Slides [S007], plus Figma Weave via the Weavy acquisition [S008]. Bengaluru office opened; **India is Figma's second-largest market by monthly active users** [S008]. International revenue +45% YoY FY2025 [S008]. Cash and securities $1.7B at 2026-06-30 [S005].

**2. What we can reasonably infer.** Category is design-collaboration under the Atlas vocabulary, supported by the CMA's independent market characterisation of "all-in-one screen design software" [S011]. Company stage is `public`; ownership `public` with concentrated founder control [S007].

**3. What we do not know.** Headcount and headcount band. Headquarters location (not extracted). IPO date, offering price and proceeds — the S-1/424B4 remain unretrieved [FIG-X007]. Current market capitalisation. Total funding history.

**4. Strategic questions.** What is the correct as-of date for each vital, given that this is a company whose financial profile changed materially at IPO?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* Vitals should carry a visible "post-IPO" framing, because FY2025 GAAP figures are distorted by a one-time $975.7M IPO-related stock-based compensation charge [S008] and are not representative of operating economics.

---

# SECTION 2 — PROBLEM

**1. What we know.** Figma's own account [S003, 2015-12-03]: the founding conviction was that "Software should be online, real-time, and collaborative," formed by analogy to Google Docs; the enabling moment was an **April 2011 WebGL demonstration** by Evan Wallace showing browser-based GPU image processing; and the stated gap was that while "engineers have built all sorts of tools which make it easy for them to work as a team, designers are still in the dark ages when it comes to collaborative workflows."

Independently, the CMA in 2023 defined "all-in-one screen design software" as covering "the main stages of the screen design workflow from sketching through to prototyping and hand off," and treated point tools, template-based and prosumer software as **out-of-market constraints** [S011].

**2. What we can reasonably infer.** The *why-now* trigger was technological — WebGL making GPU-accelerated rendering viable in a browser [S003]. That the workflow was fragmented across separate tools is corroborated indirectly by the CMA's later definition of "all-in-one" as a distinct category, which implies the all-in-one property was non-trivial [S011].

**3. What we do not know.** **Everything about the pre-Figma state comes from Figma.** No independent contemporaneous source characterising designer workflows circa 2012–2015 has been gathered. Whether Figma's characterisation of competing tools was accurate is unestablished. Category C (archive) and E (independent journalism) have not been swept.

**4. Strategic questions.** Is the "designers lacked collaborative workflows" framing supportable independently, or is it a company-authored origin narrative? What did the workflow actually cost teams before Figma?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* The wedge may have been *access* rather than *collaboration* — a browser URL removing install, licence and file-transfer friction — with collaboration arriving as a second, separable step (see §9). **This is directly contested by Figma's own account** and cannot be resolved without independent evidence.

---

# SECTION 3 — USERS & SEGMENTS

**1. What we know.** Five distinct, separately defined metrics [S007, S009, S005]:

| Metric | Value | As of |
|---|---|---|
| Paid Customers (total) | ~690,000 (+54% YoY) | 2026-03-31 |
| Paid Customers >$10K ARR | 15,218 (+37%) | 2026-03-31 |
| Paid Customers >$100K ARR | 1,525 (+48%) | 2026-03-31 |
| Paid Customers >$1M ARR | 67 | 2025-12-31 |
| Net Dollar Retention Rate | 139% | 2026-03-31 |

Definition [S007]: a Paid Customer is "a customer account that is billed separately… **A single organization with multiple divisions, segments, subsidiaries, or subscribing teams that are each billed separately are counted as multiple Paid Customers.**" NDR is computed **only** on customers above $10K ARR.

Seat taxonomy implies role segmentation [S007]: **Viewer** (view and comment, free), **Collab** (FigJam, Slides), **Content** (Buzz, Sites CMS, FigJam, Slides — *announced May 2025, not yet available*), **Dev** (Dev Mode plus Content products), **Full** (everything).

**2. What we can reasonably infer.** Roughly **2.2%** of Paid Customers sit above $10K ARR (15,218 ÷ ~690,000) — arithmetic on two disclosed figures at the same date. The seat structure evidences that Figma distinguishes at least four paying role archetypes. Figma itself states "we also see roles continuing to blur as the product-development process keeps evolving" [S007].

**3. What we do not know.** Segment composition. Designer / developer / other split. Seat mix or revenue by seat type. Free-tier population. Vertical or company-size breakdown below the ARR bands. The MAU base [S008 implies one exists]. Whether any customer-concentration risk factor exists — *not located, which is not the same as absent*.

**4. Strategic questions.** **How does Figma economically and strategically use the large population of customers below the $10K ARR threshold?** *(Reframed per review — this is an open question, not a hypothesis.)* Does the subsidiary-counting convention materially inflate the ~690,000 figure relative to peers? Which segment does each seat type actually serve?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* Two competing readings of the sub-$10K population, both currently unsupported: **(a)** it is a pipeline that graduates into the >$10K cohort; **(b)** it is a durable long tail monetised in place. Distinguishing them requires cohort data that is not disclosed. **Neither should be asserted.**

---

# SECTION 4 — JOBS TO BE DONE

**1. What we know.** Almost nothing from primary sources. The seat taxonomy [S007] establishes that Figma packages access around distinct workflows — design creation, developer handoff, whiteboarding/presentation, marketing content. Field states design is "where problem-solving meets creativity" and describes teams wanting to "collaborate, but also riff, see a bird's-eye view, and directly manipulate" [S006 — company claim].

**2. What we can reasonably infer.** Very little. Packaging boundaries weakly indicate perceived job boundaries, but packaging reflects monetisation strategy as much as user need, so the inference is thin.

**3. What we do not know.** Job statements. Competing alternatives per segment. Any of the four Forces of Progress. Whether jobs differ by segment. **No user research, review-corpus, or practitioner evidence has been gathered at all.**

**4. Strategic questions.** What job is Figma hired for by a designer versus a developer versus a PM? What was fired to make room for it? What are the real competing alternatives today — and does that set now include AI-native design-to-code tools, which the 10-K names as competitors [S007]?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* None offered. **This section has no evidentiary basis and any thesis would be invention.** It requires a dedicated research pass against product observation, practitioner sources and review corpora — none of which are filing-shaped, which is why the strongest domains elsewhere do not help here.

---

# SECTION 5 — PRODUCT

**1. What we know.** Architecture **as of 2019** [S001]: WebSocket client/server sync, one server process per document, full-state download then incremental sync, client-generated unique object IDs, fractional indexing for tree ordering, offline editing with reapplication on reconnect. Explicitly **not** operational transforms and **not** true CRDTs — "Figma isn't using true CRDTs… Since Figma is centralized (our server is the central authority), we can simplify our system."

Acknowledged limitations as of 2019 [S001]: simultaneous editing of the same text value does not work; concurrent reparenting can make objects temporarily disappear (author: "not great"); conflicting property changes resolve last-writer-wins with no merging.

Product surface and beta status [S007]: Buzz and Sites in beta; Sites CMS in beta; Content seat announced May 2025 and not yet available. AI credits introduced 2025, enforcement from **2026-03-18** [S007, S009]. Integration surface [S008]: Gemini 3 Pro and Claude Opus 4.6 as experimental models, Claude Code to Figma, Figma MCP app in Claude, Make Connectors for Atlassian/GitHub/Notion/Linear, ChatGPT integration for FigJam/Buzz/Slides.

**2. What we can reasonably infer.** The 2019 architecture was a deliberate simplification enabled by centralisation, traded against specific merge limitations [S001]. Verified technical capability and architectural investment. **Moat status unresolved** — see §B.

**3. What we do not know.** Current architecture — the only authoritative source is seven years old. Performance at scale. How AI features are implemented. Whether the 2019 limitations persist. Core objects, core actions, atomic unit of value, aha moment and time-to-value are all **unevidenced**.

**4. Strategic questions.** Has the architecture materially changed since 2019, and has AI changed its constraints? Do the 2019 merge limitations still bind, and do they matter competitively?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* Verified ecosystem capability and integration surface; **defensibility implications unresolved.** The MCP and model-integration surface may represent positioning as a substrate other tools write into rather than a destination — but the evidence establishes only that the integrations exist.

---

# SECTION 6 — BUSINESS MODEL

**1. What we know.** "Access to Figma is sold as an annual or monthly subscription, per seat" as of 2025-12-31 [S007]. Four plans: Starter (free), Professional, Organization, Enterprise [S007]. List pricing at 2026-08-30 [S002]: Professional Full $16 / Dev $12 / Collab $3; Organization $55/$25/$5; Enterprise $90/$35/$5 per month. Viewer seats view and comment **free** [S007]; on paid plans others can view and comment "without purchasing extra seats" [S002].

AI credits across all seats from 2025; enforcement from 2026-03-18, with an additional AI credit subscription or pay-as-you-go option [S007, S009].

Financials, all with basis [S007, S008, S009, S005]:

| | FY2024 | FY2025 | Q1 2026 | Q2 2026 |
|---|---|---|---|---|
| Revenue | $749,011K | $1,055,788K (+41%) | $333.4M (+46%) | $370.1M (+48%) |
| Cost of revenue | $87,514K | $185,527K (**+112%**) | — | — |
| Gross margin (GAAP, derived FY) | 88.3% | 82.4% | 79% | 84% |
| R&D | $751,120K | $1,029,700K (+37%) | — | — |
| Non-GAAP operating income | — | $129.5M (12%) | $52.1M (16%) | $36.1M (10%) |
| Free cash flow | — | $242.7M (23%) | $88.6M (27%) | $53.2M (14%) |

FY2025 GAAP net loss $(1.3)B, materially affected by a one-time IPO-related stock-based compensation charge of **$975.7M** [S008].

**2. What we can reasonably infer.** The value metric is **seats**, evidenced directly by "sold… per seat" [S007]. Pricing is multi-dimensional: plan tier × seat type × (now) AI consumption. AI credit enforcement introduces a consumption element alongside per-seat, though its revenue contribution is undisclosed. The free Viewer seat is a deliberate structural choice, not an oversight — it is named in the seat taxonomy [S007].

**3. What we do not know.** Seat mix and revenue by seat type or plan. Effective versus list pricing at enterprise scale. AI credit revenue. Historical pricing. Gross margin by product line. What drove the Q2 2026 margin recovery.

**4. Strategic questions.** Is AI credit enforcement a defensive cost-recovery measure or an offensive new revenue line? Does the free Viewer seat function as distribution, and at what foregone revenue? How much of the 41% growth is price versus seats versus new customers?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* The model may be shifting from pure per-seat toward hybrid seat-plus-consumption, driven by AI inference costs that the company explicitly expects to compress margins [S007]. Evidence supports the cost pressure and the mechanism's introduction; it does **not** establish intent or outcome.

---

# SECTION 7 — GROWTH LOOPS

**1. What we know.** Two distribution motions, both disclosed [S007]: an "automated and highly efficient self-service option, available through Figma.com," supported by "organic and paid channels"; and "a direct sales process through which we partner with customers to set up new accounts, upgrade customers across plans, and expand existing accounts."

Free Viewer seats exist [S007]. NDR 136% / 139% / 136% across three consecutive quarters [S008, S009, S005]. Revenue growth accelerating: 38% → 40% → 46% → 48% [S009, S005].

**Company claims, recorded as claims** [S007]: "the product virality inherent to Figma's collaborative and browser-based platform… [has] successfully driven awareness and adoption"; "our **product-led, bottoms-up adoption** contributes to our growth, [while] our direct sales motion helps us serve larger customers"; "Over time, many of our users grow with us into larger, managed accounts." Also [S009]: new Pro team conversions grew "more than 150% year-over-year" attributed to "long-tail adoption of Figma's AI features"; and MCP-server customers showed seat growth "approximately 70% faster" than non-users — **stated correlationally; no causal claim is made by the company and none is inferred here.**

**2. What we can reasonably infer.** A land-and-expand pattern is supported by NDR consistently above 130% combined with growth in the >$10K and >$100K ARR cohorts [S007, S009, S005]. Expansion within existing customers is evidenced; the *mechanism* of expansion is not.

**3. What we do not know.** **The acquisition mechanism.** No evidence exists on how a non-user becomes a user: no channel attribution, no invitation or conversion data, no viewer→editor conversion rate, no cohort data, no self-serve/sales revenue split. Activation is entirely unevidenced. Whether R&D spending constitutes loop reinvestment or simply operating expense is unresolved.

**4. Strategic questions.** Does a free Viewer actually convert to a paid seat, and at what rate? Is expansion driven by new people joining, by existing people upgrading seat type, or by AI credit consumption? Does the loop close, or is this a funnel plus strong retention?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* See **§A**. On current evidence **the loop does not close**, and asserting one would require inventing two transitions.

---

# SECTION 8 — MOATS

**1. What we know.** The CMA, at Phase 1 in 2023, found "Figma is the largest supplier of all-in-one screen design software" and "the clear market leader… **several times larger than any other supplier**" [S011]. The market excluded point tools, template-based and prosumer software as out-of-market constraints [S011]. **No final report was ever issued** — the reference was cancelled 2023-12-19 [S004].

NDR 136–139% [S007, S009, S005]. Field publicly invokes network effects and "data liquidity" as advantages [S006 — company claim].

**Counter-evidence, from Figma's own risk factors** [S007]: "We face intense competition and could lose market share"; competitors include "design-to-code and AI-driven companies and tools that compress or accelerate steps in the workflow… or automatically generate and iterate on designs and code through a prompt or with limited human input"; competition may also come from "customized or internal solutions used by our customers"; and "Our ability to increase or maintain our prices may be constrained by competitive dynamics, customer expectations."

**2. What we can reasonably infer.** Market *position* in 2023 is independently evidenced. **Position is not a mechanism**, and market leadership does not establish defensibility. NDR above 130% evidences retention and expansion but is compatible with switching costs, network effects, workflow lock-in and product satisfaction equally — it **discriminates between none of them**.

**3. What we do not know.** Any defensibility *mechanism*. Switching costs are not addressed in any source gathered. Design-system and accumulated-asset accumulation is not evidenced. Whether an existing user gains value when a specific additional user joins — the decisive question for §6.4 — has **no bearing evidence at all**.

**4. Strategic questions.** What would a well-funded competitor actually have to overcome? Does the 2023 market definition still describe the market, given that the 2026 10-K names competitor types the CMA excluded? Which mechanism dominates, and is any of them durable against AI-native entrants?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* See **§B**. **§6.4 cannot be run.** Current evidence does not support a global network-effect claim — which is not the same as establishing that none exists. Design-system and accumulated-asset switching cost is a plausible candidate mechanism but is **currently unevidenced**, not merely unranked.

---

# SECTION 9 — BETS & TENSIONS

**1. What we know.** **Sequential architectural and product decisions are strongly supported.** [S003, 2015-12-03] establishes that at the December 2015 Preview Release, simultaneous multiplayer editing was announced as *forthcoming in 2016* — so browser-native rendering and multiplayer were **separable decisions taken in sequence**, not one decision.

Observed investment [S007]: R&D $1,029,700K (+37%, of which a $207.1M increase is stock-based compensation); cost of revenue +112% including **$49.1M of AI-related infrastructure and hosting**. Observed decisions: Weavy acquisition [S008]; AI credits introduced 2025 with enforcement from 2026-03-18 [S007]; Bengaluru office and India data hosting [S008]; multi-class structure leaving Field with **72.3% of voting power as of 2025-12-31, including 24.4% under the Wallace Proxy** [S007]; IPO in 2025 [S010, S008].

The Adobe transaction: proposed acquisition, referred to Phase 2, provisional findings of a substantial lessening of competition, reference cancelled 2023-12-19 without a final report [S004, S011].

**2. What we can reasonably infer.** Resource allocation is heavily weighted to R&D and AI infrastructure [S007]. Figma states it expects AI costs to "negatively impact our gross margins and operating margins" [S007] — an explicit, first-party acknowledgement of a trade-off being accepted.

**3. What we do not know.** **Management intent behind almost every decision.** Expected advantage, trade-off considered, and internal rationale are undisclosed for the browser bet, the multiplayer bet, the AI investment, the IPO and the dual-class structure. The proposed transaction value and termination fee remain unverified.

**4. Strategic questions.** What did browser-native rendering cost in performance, and for how long? Why did multiplayer follow rather than accompany launch? Is AI investment defensive or offensive?

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* See **§C**. Bets are recorded as observed decisions with intent marked UNKNOWN wherever unevidenced. **No bet is asserted as a strategic bet with a named intent and trade-off.**

---

# SECTION 10 — VERDICT

**1. What we know.** Nothing verdict-shaped. A verdict is L5 evaluation and is JUDGMENT by construction (§4.2).

**2–4.** The verdict depends on Sections 7 and 8, both of which are currently the weakest. Authoring it now would produce judgment resting on unevidenced mechanism claims.

**5. Candidate thesis.** *CANDIDATE — NOT FINAL JUDGMENT.* None offered. **This section is not authorable until §A and §B resolve.**

---

# A. GROWTH MECHANISM MAP

Canonical Atlas roles. **Labelled: CANDIDATE LOOP — requires synthesis.**

```
   ACQUISITION ──?──► ACTIVATION ──?──► CORE ACTION
        ▲                                     │
        │                                     ▼
   REINVESTMENT ◄──?── OUTPUT ◄────?──────────┘
        (ring does not close on current evidence)
```

| Transition | Evidence | Sources | Confidence | Unresolved question |
|---|---|---|---|---|
| **→ Acquisition** | Self-serve via Figma.com with organic and paid channels; direct sales; free Viewer seat exists | S007 | **WEAK** | Which channel actually acquires? Is any acquisition driven by shared artifacts? No attribution data exists |
| **Acquisition → Activation** | **No evidence** | — | **NONE** | What constitutes activation? Is there a defined first-value event? |
| **Activation → Core Action** | **No direct evidence.** Core action inferable from product structure only | S007 (seat taxonomy) | **NONE** | What is the atomic action, and is it the same across seat types? |
| **Core Action → Output** | **No evidence.** That designing produces shareable artifacts is a product-structure inference, not a sourced finding | — | **NONE** | Does the work product circulate to non-users? At what rate? |
| **Output → Reinvestment** | NDR 136–139%; growth in >$10K and >$100K cohorts; "many of our users grow with us into larger, managed accounts" (company claim) | S007, S009, S005 | **MODERATE** | Is expansion driven by new people, seat upgrades, or AI consumption? |
| **Reinvestment → Acquisition** | R&D $1,029.7M; AI infra $49.1M; new products and integrations shipped | S007, S008 | **WEAK** | Is this loop reinvestment feeding acquisition, or ordinary operating expense? No feedback path is evidenced |

**Assessment.** **The loop does not close on current evidence.** Three transitions have no supporting evidence and two are weak. Only Output → Reinvestment is moderately supported, and even there the mechanism is undisclosed. What is currently evidenced is **strong expansion within existing customers** — which is a retention and expansion picture, not a demonstrated reinforcing loop.

Per the schema's ring-closure invariant, a loop that cannot be evidenced as closing **cannot be authored**. Resolving this needs evidence on viewer→editor conversion, activation definition, and artifact circulation — none of which is filing-shaped.

---

# B. DEFENSIBILITY MECHANISM MAP

No ranking. Classification only.

| Mechanism | Objective evidence | Beneficiary | Replication barrier | Counter-evidence | Current classification |
|---|---|---|---|---|---|
| **Collaboration utility** | Multiplayer architecture verified 2019 [S001]; collaboration central to positioning [S003, S006] | User's team | Architecture is documented publicly; approach is known | Own risk factors name AI-driven and internal-tool competition [S007] | **Verified capability. Defensibility unresolved** |
| **Local / clustered network effect** | **None bearing on the decisive question** | — | — | — | **Unresolved — §6.4 cannot be run.** Evidence supports an intra-organisation collaboration mechanism; whether it satisfies the Atlas definition is an open classification |
| **Global network effect** | None | — | — | Nothing suggests unrelated external users add value | **Current evidence does not support a global network-effect claim.** Not disproved — untested |
| **Switching costs** | Not addressed in any gathered source | Presumed vendor | Unknown | — | **Candidate. Currently unevidenced** |
| **Design systems / accumulated assets** | Enterprise plan cites "automated design system management" [S007]; no accumulation or migration-cost evidence | Presumed customer org | Unknown | — | **Candidate. Plausible, unevidenced** |
| **Ecosystem** | Extensive integration surface: MCP, Claude/ChatGPT/Gemini, Make Connectors [S008] | Figma and partners | Integrations are largely open standards | MCP is an open protocol usable by competitors | **Verified ecosystem capability and integration surface. Defensibility implications unresolved** |
| **Technical capability** | Browser/WebGL rendering and 2019 sync architecture [S001, S003] | Figma | Non-trivial engineering; publicly described | Own 2019 post documents real limitations [S001] | **Verified technical capability and architectural investment. Moat status unresolved** |
| **Distribution** | Two motions disclosed; neither quantified [S007] | Figma | Unknown | Acquisition mechanism unevidenced | **Unresolved** |
| **Brand / category position** | CMA 2023: "clear market leader… several times larger than any other supplier" [S011] | Figma | Position, not mechanism | Definition is 3 years old and excluded categories the 2026 10-K now names as competitive threats [S007, S011] | **Position independently evidenced. Mechanism unestablished** |

---

# C. STRATEGIC BETS MAP

Unsupported fields marked **UNKNOWN**. No management intent is invented.

### Candidate bet 1 — Browser-native rendering

| Field | Content |
|---|---|
| **Observed decision** | Built a browser-based design tool on WebGL |
| **Evidence** | S003 (2015-12-03); S001 (2019 architecture) |
| **Possible intent** | *Stated*: "Software should be online, real-time, and collaborative" [S003]. Company claim about intent, not verification of it |
| **Expected advantage** | **UNKNOWN** — no contemporaneous statement of expected commercial advantage |
| **Trade-off** | **UNKNOWN** — no disclosure of performance or capability cost accepted |
| **Observed result** | Market leadership in all-in-one screen design as assessed by CMA in 2023 [S011]. **Attribution to this decision is not established** |
| **Current tension** | **UNKNOWN** |

### Candidate bet 2 — Multiplayer editing (sequential to bet 1)

| Field | Content |
|---|---|
| **Observed decision** | Multiplayer announced as forthcoming in 2016, after the Dec 2015 preview release |
| **Evidence** | S003 — **strongly supports sequencing**; S001 documents the eventual implementation |
| **Possible intent** | **UNKNOWN** |
| **Expected advantage** | **UNKNOWN** |
| **Trade-off** | *Partially evidenced*: the 2019 architecture accepted specific limitations — no simultaneous same-text editing, last-writer-wins properties, reparenting artifacts [S001]. Whether these were consciously traded is **UNKNOWN** |
| **Observed result** | **UNKNOWN** |
| **Current tension** | **UNKNOWN** |

### Candidate bet 3 — AI investment and credit-based monetisation

| Field | Content |
|---|---|
| **Observed decision** | AI credits introduced 2025 across all seats; enforcement from 2026-03-18; $49.1M AI infrastructure increase; Weavy acquisition |
| **Evidence** | S007, S008, S009 |
| **Possible intent** | *Stated*: AI is "a tailwind… TAM-expansive" [S006 — company claim]; "models are swappable" [S006] |
| **Expected advantage** | **UNKNOWN** |
| **Trade-off** | **Evidenced and explicit**: costs "will impact our cost of revenue, research and development expenses, and sales and marketing expenses, which we expect to negatively impact our gross margins and operating margins" [S007]. Also third-party model dependence and supply-chain risk [S007] |
| **Observed result** | Cost of revenue +112% vs revenue +41%; gross margin 88.3% → 82.4% → 79% → 84% [S007, S009, S005]. **Causal attribution not established** |
| **Current tension** | *Evidenced*: pricing power "may be constrained by competitive dynamics"; competition from AI-driven design-to-code tools and internal solutions [S007] |

### Candidate bet 4 — Public listing with concentrated founder control

| Field | Content |
|---|---|
| **Observed decision** | IPO 2025; multi-class structure, Class B 15 votes/share; Wallace Proxy |
| **Evidence** | S010, S008, S007 |
| **Possible intent** | **UNKNOWN** |
| **Expected advantage** | **UNKNOWN** |
| **Trade-off** | *Disclosed as risk*: concentrated control "will limit your ability to influence the outcome of important transactions" [S007] |
| **Observed result** | Field held **72.3% of voting power as of 2025-12-31**, including 24.4% under the Wallace Proxy [S007] |
| **Current tension** | **UNKNOWN** |

**Note.** Candidate bet 3 is the only one where trade-off and tension are both evidenced — because it is the only one occurring while Figma has been subject to public disclosure obligations. The historical bets are the strategically interesting ones and the least evidenced.

---

# D. CONTRADICTIONS / TENSIONS

Analytical opportunities. **Not conclusions.**

**D1 — Margin compression against an explicit forward warning.** Gross margin moved 88.3% (FY2024) → 82.4% (FY2025) → 79% (Q1 2026) → **84% (Q2 2026)**, while cost of revenue rose 112% against 41% revenue growth, $49.1M of it AI infrastructure [S007]. Figma explicitly expects AI to compress margins [S007] — yet Q2 recovered. Unexplained in any source. Credit enforcement from 2026-03-18 [S009] is a candidate explanation and nothing more.

**D2 — Scale of the customer base versus the measured cohort.** ~690,000 Paid Customers; 15,218 above $10K ARR; NDR computed only on that ~2.2% [S007, S009]. **Open question: how does Figma economically and strategically use the population below the threshold?** Pipeline and durable-long-tail are competing candidate explanations; neither is supported.

**D3 — Claimed virality without a disclosed mechanism.** The 10-K asserts "product virality inherent to Figma's collaborative and browser-based platform" [S007], while disclosing no acquisition mechanism, conversion data, or attribution. The strongest claim in the growth story is the least evidenced.

**D4 — A market definition that may have expired.** The CMA's 2023 assessment excluded point tools and prosumer software as out-of-market [S011]. The 2026 10-K names "design-to-code and AI-driven companies," point tools "that can expand to cover more," and customer-built internal solutions as competitive threats [S007]. **The independent evidence of market leadership was produced against a market boundary the company itself no longer appears to accept.** This is the sharpest tension in the current evidence.

**D5 — Open standards as both ecosystem and exposure.** The integration surface — MCP, multiple model providers, connectors — is extensive [S008]. MCP is an open protocol; "models are swappable" [S006] is stated as strength. The same openness that builds the ecosystem lowers the barrier for competitors to build equivalents.

**D6 — Platform breadth against product coherence.** Nine-plus products, several in beta, with a Content seat "announced in May 2025 and… not yet available" over a year later [S007]. Breadth expands the seat taxonomy; it also complicates the packaging.

**D7 — Founder control against public-market governance.** 72.3% voting power as of 2025-12-31 [S007], disclosed by Figma as a risk to public shareholders.

**D8 — R&D intensity.** R&D of $1,029,700K against revenue of $1,055,788K in FY2025 [S007] — though $207.1M of the increase is stock-based compensation, and FY2025 GAAP figures carry a one-time $975.7M IPO charge [S008]. **No characterisation of efficiency is offered**; the periods and distortions must travel with the figure.

---

# E. EVIDENCE CEILING BY ATLAS SECTION

| Section | Strength | Strongest supported claim | Highest claim we should NOT yet make | Key gap |
|---|---|---|---|---|
| **1 Vitals** | **STRONG** | Public NYSE:FIG; FY2025 revenue $1,055.8M +41%; multi-class structure | That FY2025 GAAP figures represent operating economics | Headcount, HQ, IPO terms |
| **2 Problem** | **WEAK** | Figma states the problem was absent collaborative workflows for designers | That the pre-Figma characterisation is accurate | Independent pre-2015 evidence |
| **3 Users** | **MODERATE** | Five metrics with company definitions; ~2.2% above $10K ARR | Anything about segment composition | Seat mix, free-tier size, MAU |
| **4 JTBD** | **INSUFFICIENT** | Seat packaging implies distinct workflows | Any job statement or force | All of it |
| **5 Product** | **MODERATE** | 2019 architecture with primary-sourced limitations; current surface and beta status | That the 2019 architecture is current | Post-2019 architecture; atomic unit of value |
| **6 Business Model** | **STRONG** | Per-seat subscription, six seat types, four plans, AI credits, full financials | Revenue attribution by seat type or plan | Seat mix; effective pricing; historical pricing |
| **7 Growth Loops** | **WEAK** | Two distribution motions exist; NDR 136–139% | **That a reinforcing loop exists or closes** | Acquisition mechanism, activation, conversion |
| **8 Moats** | **WEAK** | CMA 2023: clear market leader, several times larger than any other supplier | **Any defensibility mechanism, or any network-effect classification** | Switching costs; §6.4 discriminating evidence |
| **9 Bets** | **MODERATE** | Browser and multiplayer were sequential decisions; AI trade-off explicitly disclosed | Named intent or trade-off for the historical bets | Management rationale pre-IPO |
| **10 Verdict** | **INSUFFICIENT** | — | Any verdict | Depends on §7 and §8 |

---

# SYNTHESIS READINESS

| Section | Status |
|---|---|
| 1 Vitals | **READY FOR AUTHORING** |
| 2 Problem | **NEEDS TARGETED RESEARCH** — company-narrative-only; needs independent contemporaneous evidence |
| 3 Users & Segments | **NEEDS TARGETED RESEARCH** — metrics solid, composition absent |
| 4 JTBD | **EVIDENCE INSUFFICIENT** — no evidentiary basis whatsoever |
| 5 Product | **NEEDS TARGETED RESEARCH** — architecture 7 years stale; product mechanics unevidenced |
| 6 Business Model | **READY FOR AUTHORING** |
| 7 Growth Loops | **EVIDENCE INSUFFICIENT** — 3 of 5 transitions unevidenced; loop cannot be shown to close |
| 8 Moats | **EVIDENCE INSUFFICIENT** — no mechanism evidenced; §6.4 cannot be run |
| 9 Bets & Tensions | **NEEDS TARGETED RESEARCH** — sequencing strong, intent and trade-offs unknown for 3 of 4 |
| 10 Verdict | **EVIDENCE INSUFFICIENT** — depends on 7 and 8 |

**Two ready. Four need targeted research. Four have insufficient evidence.**

The pattern is coherent rather than random: **filings are excellent for economics and useless for mechanism.** Sections 6 and 1 are ready precisely because they are what public companies must disclose. Sections 4, 7 and 8 are insufficient precisely because no filing describes how users discover a product, what job they hire it for, or why they would find it hard to leave.

**The two flagship interactives of the whole Atlas — the Growth Loop Engine and the moat stack — sit on the two weakest sections.** Further filing research will not fix this. It requires a different evidence class: product observation, practitioner and review corpora, archived documentation, and independent journalism — Categories C, E and F, none of which have been swept.

**Recommendation:** do not author any section yet. A teardown with two strong sections and a fabricated growth loop would be worse than no teardown, and would fail the §12 publication checklist on multiple counts.
