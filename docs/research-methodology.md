# Research Methodology & Source Hierarchy

**Status:** v1.0 — **LOCKED** — governs every teardown in the Product Teardown Atlas
**Applies to:** all products, all sections, all claims
**Companion:** `docs/authoring.md` (how to fill fields) — this document governs *what may be claimed at all*

---

## 0. The governing principle

> **The Atlas is never more certain than its evidence allows.**

Every mechanism in this document exists to serve that one sentence. When a rule here is inconvenient, the inconvenience is the point: the cost of being slower is a delayed teardown, and the cost of being over-certain is a teardown that a knowledgeable reader can dismantle in one sitting.

Three corollaries follow, and they are the ones most often violated in published product analysis:

1. **A claim's confidence is capped by its weakest supporting link**, not averaged across its sources.
2. **Some claim types can never reach FACT**, regardless of how much evidence accumulates. Causation and evaluation are the two big ones.
3. **Absence of evidence is not evidence of absence.** That a private company has not disclosed a figure tells us nothing about the figure.

### 0.1 Sufficiency targets, not gates

Every numeric quantity in this document — source counts, corroboration requirements, minimum claims per section — is a **RECOMMENDED SUFFICIENCY TARGET**, not an absolute gate. None of them may compel research to continue past the point where the evidence genuinely runs out, and none may compel content to exist that the evidence does not support.

Where a target is not met, the procedure is:

1. **Document the gap** in the dossier's Open Questions.
2. **Explain the evidence ceiling** — what would be needed, and why it is unavailable.
3. **Downgrade the permissible claim strength** accordingly, per §6.
4. **Continue researching only if** further targeted research is reasonably likely to close the gap. If it is not, stop and disclose.

> **Never manufacture a claim, a source, a moat, or an admission to satisfy a numeric threshold, and never over-research to reach a count.**

A thin section that says honestly why it is thin is worth more than a padded one, and a target met by dilution has produced exactly the failure mode this methodology exists to prevent. The counts express what a well-evidenced teardown *typically* contains; they do not define what one is.

**Note on the schema's hard minimums.** The structural floors enforced by `src/schema` — minimum bets, moats, inflections, segments, contrasts — are *build gates*, not sufficiency targets, and they are a separate open question deliberately left unresolved at Section 6. Where an honest teardown cannot meet one, the correct response is to relax the schema floor, never to invent content that satisfies it.

---

## 1. Research Methodology Overview

The methodology has five layers, applied in order. A claim must survive all five to be published.

```
  RAW SOURCE
      │
      ▼
┌─────────────────────────────────────────────────────────┐
│ LAYER 1 — SOURCE AUTHORITY                              │
│ Is this source authoritative FOR THIS KIND OF CLAIM?    │
│ (Tier alone does not answer this. See §2.)              │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ LAYER 2 — NARRATIVE SEPARATION                          │
│ Is this the company describing itself? Apply the        │
│ attribution transform before anything else. (§3)        │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ LAYER 3 — ATOMIC DECOMPOSITION                          │
│ Break into single assertions. Locate each on the        │
│ claim ladder: existence → magnitude → mechanism →       │
│ causation → evaluation. (§4)                            │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ LAYER 4 — RECONCILIATION                                │
│ Where sources disagree, resolve by protocol — never     │
│ by preference. (§5)                                     │
└──────────────────────┬──────────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────┐
│ LAYER 5 — EVIDENCE CEILING                              │
│ What is the maximum claim class and confidence this     │
│ evidence permits? Cap accordingly. (§6)                 │
└──────────────────────┬──────────────────────────────────┘
                       ▼
          PUBLISHABLE CLAIM + CONFIDENCE + CLASS
```

---

## 2. Source Hierarchy

### 2.1 The correction to naive tiering

Prestige ordering is wrong, and correcting it is the most consequential idea in this document.

An SEC filing is Tier 1 and is *near-worthless* for establishing how a product's onboarding works. Official API documentation is Tier 2 and is the *single best possible source* for that same claim — better than any filing, any interview, any analyst report. Meanwhile a founder interview is Tier 3 and is **authoritative** for what the company *says* its strategy is, while being **inadmissible** for whether that strategy worked.

So authority is not a property of a source. It is a property of a **source–claim pair**.

### 2.2 Authority levels

| Level | Meaning |
|---|---|
| **AUTHORITATIVE** | May establish a FACT on its own, at the confidence its class permits |
| **CORROBORATING** | May establish a FACT when paired with a second independent source; may support an INFERENCE alone |
| **SUGGESTIVE** | May support an INFERENCE with explicit disclosure. May never establish a FACT |
| **INADMISSIBLE** | May be used to generate leads and questions only. Never cited as evidence |

### 2.3 The source authority matrix

| | Financial performance | Product capability | Pricing (list) | Usage / scale | Strategic intent (stated) | History | Competitive position |
|---|---|---|---|---|---|---|---|
| **T1** Filings, audited financials, regulatory | **AUTH** | SUGG | SUGG | **AUTH**¹ | CORR² | CORR | SUGG³ |
| **T2** Official docs, pricing pages, APIs, changelogs, release notes | — | **AUTH** | **AUTH** | SUGG | CORR⁴ | CORR⁵ | INADM |
| **T3** Founder/exec interviews, conference talks, podcasts | SUGG | CORR | SUGG | SUGG | **AUTH**⁶ | CORR⁷ | INADM |
| **T4** Financial & tech journalism, research firms, analysts, academic | CORR⁸ | CORR | CORR⁹ | CORR | CORR | **AUTH**¹⁰ | **AUTH** |
| **T5** Industry blogs, newsletters, forums, Reddit, social | SUGG | SUGG¹¹ | SUGG | SUGG | SUGG | SUGG¹² | INADM |

**Notes — these are where the real judgment lives:**

1. Authoritative *only for the metric as the filing defines it*, on the filing's own basis. A disclosed "annual recurring revenue" in a filing is not interchangeable with a press figure of the same name.
2. Risk factors and MD&A are unusually candid because they are legally compelled to be. A filing admitting customer concentration or competitive pressure is **against-interest evidence** and carries elevated weight — often the best strategic-intent source a public company produces.
3. Companies define their own addressable market self-servingly. Treat market-size and share claims in filings as positioning, not measurement.
4. What a company *builds* is stronger evidence of intent than what it *says*. A changelog is a resource-allocation record.
5. **Archived documentation is the most underused source in product teardowns.** Wayback Machine snapshots of pricing pages, docs, and homepages are Tier 2 evidence *about the past*, and they routinely settle questions that interviews only muddy. Use them systematically for anything historical.
6. Authoritative for **stated** intent, never for **actual** intent. "We decided X because Y" establishes that they say so. Whether Y was the real reason is an inference.
7. Retrospective interviews are subject to narrative smoothing and hindsight bias. Founders reliably describe accidents as strategy. Prefer contemporaneous sources for history and use interviews to add colour, not to establish sequence.
8. For private companies this is frequently the *best available* financial evidence. It remains CORROBORATING — good journalism reporting a leaked figure is still second-hand.
9. Journalism is often the only source for *effective* pricing — negotiated rates, enterprise discounts — which official pricing pages never show.
10. Contemporaneous reporting beats retrospective anything for establishing what happened and when.
11. One exception with real weight: practitioner accounts of lived product experience. A detailed forum post about what an integration was actually like in 2015 may be the only surviving evidence, and it is genuine evidence of experience even though it is weak evidence of general truth.
12. Sometimes the only record of an early product decision. **Do not discard it — downgrade it, disclose it, and say so on the page.**

### 2.4 Using lower-tier sources legitimately

A Tier 5 source is admissible as evidence when **all four** hold:

1. It is the only available evidence for a claim that matters to the analysis.
2. It is contemporaneous with the event it describes.
3. It is specific and falsifiable, not a general impression.
4. The claim it supports is capped at INFERENCE with `estimated` confidence, and the limitation is disclosed in the evidence `note`.

Under those conditions the honest move is to use it and say so. Silently omitting a real-but-weak signal produces a cleaner teardown and a less true one.

---

## 3. Company Claim vs External Fact vs Inference vs Judgment

### 3.1 The attribution transform

Every company statement about itself is first rewritten before it is assessed. The transform is mechanical and non-negotiable:

```
Company says:  "X"
Transform to:  "The company states X."   ← this is now a FACT (verifiable)
Then ask:      "Is X itself established?"  ← a separate question
```

The transform never loses information. It relocates certainty from the claim to the assertion of the claim, which is exactly where the evidence actually sits.

### 3.2 The four classes

| Class | Definition | Can a company source establish it? |
|---|---|---|
| **COMPANY CLAIM** | What the company asserts about itself | Yes, trivially — the assertion is the evidence |
| **EXTERNAL FACT** | What independent or documentary evidence establishes | Sometimes — see the three-part test below |
| **INFERENCE** | What the evidence reasonably supports but does not prove | Yes, as one input |
| **JUDGMENT** | What the author concludes strategically | Never — this is the author's contribution |

### 3.3 When a company source may establish an EXTERNAL FACT

All three conditions must hold:

1. **Self-referential** — the claim is about the company's own actions, artifacts, or policies, not about outcomes or the world.
2. **Verifiable in principle** — a third party could in principle check it.
3. **Non-evaluative** — it contains no comparative or quality judgment.

| Statement | Passes? | Resolves to |
|---|---|---|
| "We offer a REST API with idempotency keys" | ✅ all three | **FACT** — `verified` (the docs are checkable) |
| "Our free tier includes unlimited viewers" | ✅ all three | **FACT** — `verified` |
| "We serve over 100,000 businesses" | ⚠️ 1 and 2, not independently checkable | **FACT about the claim**, `reported`. The underlying number needs corroboration |
| "Developers can integrate in minutes" | ❌ evaluative + outcome | **COMPANY CLAIM only.** Effectiveness is unestablished |
| "We grew primarily through developer-led adoption" | ❌ causal + evaluative | **COMPANY CLAIM.** May support an INFERENCE with corroboration |
| "We are the leading platform for X" | ❌ comparative | **COMPANY CLAIM.** Never a fact |

### 3.4 The against-interest exception

A company statement that **admits a weakness, a failed decision, a constraint, or a competitive threat** carries elevated evidentiary weight and may establish a FACT on a single source.

The reasoning is standard evidentiary logic: statements against one's own interest have no incentive to be false. A filing conceding customer concentration risk, a founder admitting a bet did not pay off, a deprecation notice acknowledging an architectural limit — these are among the most valuable sources available, and they are systematically under-mined because they are less quotable than the triumphant material around them.

**Practical instruction: when reading company sources, hunt specifically for the admissions.** They will produce better Bets & Tensions content than anything in the marketing.

### 3.5 The worked distinction

Applying the ladder to a single company statement — *"We grew primarily through developer-led adoption."*

| Class | Statement | Evidence required |
|---|---|---|
| **FACT** | The company identifies developer-led adoption as an important acquisition mechanism | The statement itself. `verified` |
| **FACT** | The company publishes extensive public API documentation and SDKs, and offers self-serve signup with no sales contact | Tier 2, directly observable. `verified` |
| **INFERENCE** | Developer-led adoption is the company's primary acquisition mechanism | Requires: the mechanism is observable, ≥2 independent corroborating sources, and no credible contradicting evidence. **Caps at INFERENCE — never FACT** |
| **JUDGMENT** | Developer experience here is not a UX choice but a distribution strategy, and it is among the company's most defensible advantages | The author's argument. Labelled as judgment, attributed, arguable |

**This is the single most important table in the document.** The gap between row 1 and row 3 is where credibility is won or lost, and collapsing it is the defining failure of AI-generated product analysis.

---

## 4. Atomic Claim Construction

### 4.1 The rule

**One assertion per claim.** A claim is atomic when it cannot be split into two statements that could have different truth values.

### 4.2 The claim ladder

Every atomic claim sits on exactly one rung. Evidence requirements rise monotonically, and the top rung is unreachable by evidence alone.

| Rung | Type | Form | Ceiling |
|---|---|---|---|
| **L1** | Existence | X exists / X does Y | FACT |
| **L2** | Magnitude | X is of size N, as of D, on basis B | FACT |
| **L3** | Mechanism | X operates by means of M | FACT (if mechanics are observable) |
| **L4** | Causation | X caused / drove / produced Y | **INFERENCE — never FACT** |
| **L5** | Evaluation | X is good / superior / defensible / durable | **JUDGMENT — always, regardless of evidence** |

L5 being permanently JUDGMENT is not a limitation of our research. It is a category fact: "defensible" is not a property that observation can settle. Presenting an L5 claim as a FACT is the error that makes analysis look naive.

### 4.3 Decomposition worked

**Compound (unpublishable):**

> "Figma's browser-based collaborative architecture created a powerful network effect and made it the dominant design platform."

**Decomposed:**

| # | Atomic claim | Rung | Class | Evidence needed |
|---|---|---|---|---|
| 1 | The product runs in a web browser | L1 | FACT | T2, directly observable |
| 2 | The product supports simultaneous multi-user editing | L1 | FACT | T2, directly observable |
| 3 | A file can be opened by a recipient with no paid licence | L1 | FACT | T2 pricing + product |
| 4 | Recipients of shared files sometimes become active users | L3 | FACT | Observable mechanics + corroboration |
| 5 | Adoption growth was materially driven by this sharing behaviour | L4 | **INFERENCE** | Multiple independent signals; alternatives considered |
| 6 | This constitutes a network effect | L3/L5 | **INFERENCE** | Must pass the four-part test in §6.4 |
| 7 | "Powerful" | L5 | **JUDGMENT** | Author's argument, or delete |
| 8 | The product holds a leading position in its category | L2 | FACT | T4 third-party market data, with the denominator defined |
| 9 | "Dominant" | L5 | **JUDGMENT** | Author's argument, or delete |

Nine claims, four classes, three of which the original sentence silently presented as one fact.

### 4.4 Construction rules

1. **One assertion per claim.** If "and" joins two testable things, split.
2. **Every magnitude carries basis and date.** `N, as of D, on basis B`. A number without both is not a claim, it is a rumour.
3. **Never let a causal verb pass unexamined.** *Drove, caused, led to, resulted in, enabled, made possible* — each promotes a claim to L4 and caps it at INFERENCE.
4. **Correlation is not causation, and sequence is not causation.** A company grew after shipping a feature. So did its competitors. So did the category.
5. **Delete or defend every superlative.** *Powerful, dominant, best-in-class, revolutionary, seamless.* Each is L5. Either it becomes an argued JUDGMENT or it goes.
6. **No compound unsupported claims.** A sentence where one clause is evidenced and the next is not lends borrowed credibility to the unevidenced half. This is the most common way good analysis goes bad.
7. **State the counterfactual when making a causal claim.** If you cannot say what would plausibly have happened otherwise, you have not established causation.

---

## 5. Reconciliation Protocol

Applied whenever two credible sources disagree. **Never resolved by preference, recency alone, or which number is more convenient.**

### 5.1 The five steps

**Step 1 — Are these even the same measurement?**
Check five dimensions before treating it as a conflict at all:
- **Date** — same point in time?
- **Event** — same round, same quarter, same announcement?
- **Metric definition** — same thing being counted?
- **Currency and units** — same, and converted at what rate on what date?
- **Reporting basis** — GAAP vs non-GAAP, gross vs net, annualised vs actual, run-rate vs trailing?

**In practice most apparent conflicts dissolve here.** A $95B and a $101B valuation are usually not a conflict; they are a primary round and a secondary tender, months apart. Resolving them by choosing one destroys real information.

**Step 2 — Apply the source authority matrix.** Not tier — authority *for this claim domain*.

**Step 3 — Test for supersession.**
- Later measurement of the **same metric on the same basis** supersedes earlier. Record the earlier as historical.
- Different basis does **not** supersede. Both are true simultaneously and must coexist.
- A company restating its own figure supersedes the original, and the restatement itself is notable.

**Step 4 — If irreducible, do not manufacture precision.** Required actions, all four:
- Present a range or both figures with their bases
- Attribute each explicitly
- Explain the discrepancy in the evidence `note`
- Downgrade confidence to `estimated`

**Step 5 — Prefer ranges.** "Between $95B and $101B depending on basis and date" is more accurate and more credible than a false single figure. Precision that the evidence does not support is a *cost*, not a benefit.

### 5.2 Metric-specific rules

| Metric | Mandatory qualifiers | Common conflation to prevent |
|---|---|---|
| **Revenue** | GAAP vs non-GAAP; period; recognised vs billed | ARR, run-rate, annualised and actual revenue are four different numbers routinely reported under one name |
| **ARR** | Point-in-time date; contracted vs realised | ARR is not revenue. A run-rate extrapolated from one strong month is not ARR |
| **Users** | Registered / MAU / WAU / DAU / paying / seats; window | The single largest source of inflated figures in tech reporting |
| **Customers** | Accounts vs logos vs contracts vs entities | One enterprise logo may be 400 accounts |
| **Valuation** | Primary round (post-money) / tender / secondary / fund mark; date | Fund marks are opinions. Secondaries reflect liquidity, not consensus value |
| **Market share** | **The denominator, stated explicitly**; source of total | Share claims are usually arguments about market definition wearing a number |
| **Transaction volume / TPV** | Gross vs net; inclusions and exclusions; period | TPV is not revenue. Confusing them overstates a payments business by orders of magnitude |
| **Growth rate** | Period; YoY vs QoQ; compounding basis; constant vs actual currency | Sequential rates annualised into headline figures |
| **Pricing** | List vs effective vs negotiated; region; date; tier | List price is close to fiction at enterprise scale |
| **Headcount** | FTE vs contractors; date; entity scope | Post-layoff and pre-layoff figures circulating simultaneously |

### 5.3 Definition drift over time

When a company changes how it defines a metric:

1. **Never chart or compare across the change.** This produces a fabricated trend.
2. Record both definitions and the change date as evidence entries in their own right.
3. Prefer restating the earlier period on the new basis *only if the company itself published a restatement*. Do not attempt the restatement yourself.
4. If restatement is impossible, split the series and show the break visibly.
5. **The change itself is analytical content.** Metric redefinitions frequently coincide with the old metric becoming unflattering, and noting the timing is legitimate, well-evidenced observation.

---

## 6. Evidence Ceiling Matrix

### 6.1 The matrix

| Claim type | Minimum evidence | Max confidence | Max class |
|---|---|---|---|
| **Product capability** | 1 × T2 official doc, or direct observation | `verified` | FACT |
| **Product mechanic / flow** | Direct observation + T2 corroboration | `verified` | FACT |
| **Pricing — list** | T2 official pricing page + as-of date | `verified` | FACT |
| **Pricing — effective / negotiated** | 2 × independent T4 | `estimated` | INFERENCE |
| **User segment exists** | T2 product evidence + 1 corroborating source | `reported` | FACT |
| **User segment relative size** | 2 × independent + stated method | `estimated` | INFERENCE |
| **Usage metric — public co.** | T1 filing, on the filing's basis | `verified` | FACT |
| **Usage metric — private co.** | T3 self-report + T4 corroboration | `reported` | FACT *about the report* |
| **Growth mechanism exists** | Observable product mechanics + 1 corroboration | `reported` | FACT |
| **Growth mechanism is primary** | 2 × independent + no credible contradiction | `estimated` | **INFERENCE** |
| **Causal claim** | Mechanism + temporal ordering + ≥1 alternative explanation considered and addressed | `estimated` | **INFERENCE — never FACT** |
| **Network effect** | The four-part test (§6.4) | `estimated` | **INFERENCE** |
| **Moat** | Mechanism + evidence it operates + replication-difficulty argument + named attack vector | — | **JUDGMENT** |
| **Strategic intent — stated** | T3 direct quote, attributed | `verified` | FACT *about the statement* |
| **Strategic intent — actual** | Observed decisions + resource allocation pattern | `estimated` | **INFERENCE** |
| **Strategic bet** | Observed decision + inferred intent + identified trade-off, **each labelled separately** | mixed | Per-link |
| **Financial metric — public co.** | T1 | `verified` | FACT |
| **Financial metric — private co.** | Best available, basis stated | normally `reported` / `estimated`¹ | FACT *about the report* |

¹ **Company status does not determine confidence; evidence quality does.** Private-company financial figures should normally be classified `reported` or `estimated`, because the evidence available for them normally does not meet the verification standard. They may be classified `verified` where the underlying evidence independently satisfies that standard — for example a figure disclosed in a regulatory filing made by a counterparty, an audited statement published for another purpose, or a figure the company is legally obliged to disclose. The test is applied to the evidence, never to the company.
| **Competitive position** | T4 third-party data with a defined denominator | `reported` | FACT |
| **Evaluation / superiority** | — | — | **JUDGMENT always** |
| **Counterfactual** | — | — | **JUDGMENT, flagged speculative** |

### 6.2 The non-upgrade rule

> **If the evidence supports only an inference, it may not be promoted to a fact — not by accumulation, not by confident phrasing, not by repetition across sources.**

Ten sources repeating one company's unverified figure is one source. Check whether apparently independent sources share an origin; in tech reporting they very often do.

### 6.3 Moat claims

A moat claim requires four components, and the schema enforces the shape:

1. **A named mechanism** — not a category label. "Network effects" is not a mechanism; "value to an existing user rises when a specific colleague adopts" is.
2. **Evidence the mechanism actually operates** — not that it theoretically could.
3. **An argument for why replication is hard** — addressing a competitor with capital and talent, not a generic startup.
4. **A named attack vector** — the specific thing that would erode it.

A moat claim missing any of these is a category label, and category labels are what fill weak teardowns.

### 6.4 The network effect test

Most claimed network effects are not network effects. **All four steps must pass.**

1. **Name the participants and the sides.** Who exactly, and how many sides?
2. **Show the value function.** An *existing* user's value must increase when a *specific additional* participant joins. "The company improves with scale" is not this.
3. **Identify the boundary — global, local/clustered, or cross-side.** This is the step almost always skipped, and it matters enormously. Most B2B collaboration effects are **local**: value depends on your specific colleagues adopting, not on the global user count. Local network effects are far weaker as a barrier to a new entrant (who only needs to win one team at a time) and far stronger as retention once established. Calling a local effect a global one materially overstates defensibility, and a reader who knows the difference will notice immediately.
4. **Rule out the three impostors:**
   - **Scale economies** — costs fall with volume. That is an economics advantage accruing to the *vendor*, not a value increase for the *user*.
   - **Data advantages** — more data improves the model. The benefit accrues to the vendor and only indirectly to users. Usually a learning curve, not a network effect.
   - **Community / brand affinity** — users like each other or like the brand. Real, valuable, and not structural.

**Explicitly insufficient**, each on its own: more users make the product better · the product is collaborative · the product has an active community · the product has an app marketplace.

If any step fails, do not use the term. Name what it actually is — the honest alternative is usually more interesting and always more defensible.

---

## 7. Public vs Private Company Methodology

### 7.1 Same rigor, different ceilings

The standards do not relax for private companies. What changes is the **maximum attainable confidence**, because the best available source class is different.

| | Public company | Private company |
|---|---|---|
| Financial metrics | T1 audited → `verified` | T3/T4 → **normally `reported` / `estimated`** (see §6.1n1) |
| Usage metrics | T1 where disclosed → `verified` | T3 self-report → `reported`, about the report |
| Strategic intent | Filings + earnings calls (against-interest) | Interviews only — weaker |
| Historical figures | Restated, comparable, audited | Fragmentary, inconsistently defined |
| Product capability | **Identical** — T2 docs | **Identical** — T2 docs |
| Pricing (list) | **Identical** — T2 | **Identical** — T2 |

The last two rows matter: **product and pricing evidence is equally strong for both**, which means the mechanical parts of a teardown — the parts that actually carry the analysis — do not degrade for private companies. Only the financial layer does.

### 7.2 Mandatory disclosure

Every teardown of a private company must carry a visible statement of its own evidence ceiling, rendered in the hero and expanded on `/method`. Something of the form:

> *This company does not publish audited financials. Financial and usage figures here are drawn from company statements and credible reporting, and are marked `reported` or `estimated` accordingly. Product mechanics, pricing and strategic decisions are evidenced to the same standard as any other teardown.*

Stating the ceiling is not a weakness. It is the clearest available demonstration that the author knows what their evidence can and cannot support — and it pre-empts the exact criticism a knowledgeable reader would otherwise make.

### 7.3 Absence of evidence

Non-disclosure is not a finding. **Never write** "the company does not disclose X, suggesting X is unfavourable." That is speculation dressed as inference.

**Do write** "X is not publicly disclosed" as an Open Question, where it belongs. If non-disclosure is genuinely notable — a metric previously disclosed and then quietly dropped — that is a *pattern of behaviour*, which is evidenced and legitimate.

### 7.4 Transaction and counterparty disclosures are a distinct source class

The public/private split is too coarse on its own. A company that has never filed its own ongoing reports may still be the subject of substantial high-tier documentary evidence generated by *someone else* — most commonly through an acquisition, an attempted acquisition, a regulatory review, or litigation.

This evidence is genuinely strong and it is **not** equivalent to ongoing public-company reporting. Four source classes must be kept separate, and conflating them overstates what is actually known:

| Class | What it is | What it can establish | What it cannot |
|---|---|---|---|
| **Subject-company disclosures** | The company's own statements, docs, blogs, pricing, changelogs | Product mechanics, pricing, stated intent, self-reported figures | Independently verified financials |
| **Counterparty transaction disclosures** | An acquirer's filings, investor materials, or earnings commentary describing the target | Deal terms and, where the acquirer is legally obliged to disclose them, financial characteristics of the target | The target's ongoing performance before or after the transaction window |
| **Regulatory / transaction review documents** | Filings, submissions, and findings from competition or securities authorities concerning a proposed transaction | Market definition, competitive dynamics, and structural facts examined under legal obligation — often unusually candid, and frequently **against-interest** | Anything outside the scope and date of the review |
| **Independent sources** | T4 journalism, analysts, academic work | Corroboration across all of the above | — |

Three rules follow:

1. **Never describe evidence arising from a transaction as ongoing company reporting.** A disclosure made in a specific transaction window covers that window, not the company's history or its subsequent performance.
2. **Attribute to the disclosing party, not the subject.** A figure about Company B appearing in Company A's filing is Company A's characterisation of Company B, and inherits Company A's incentives.
3. **Respect the window.** Transaction disclosures are dated, bounded, and often prepared for a purpose that shapes what is emphasised. `asOf` matters more here than almost anywhere else.

Where this applies well, it can produce a stronger historical evidence base than many companies with routine reporting ever generate — particularly for product, market-definition and competitive claims examined under regulatory scrutiny. **Which companies this applies to, and to what extent, is established during Stage 1 research and asserted nowhere in advance.**

---

## 8. Evidence Freshness

### 8.1 Half-life by class, not blanket expiry

| Class | Examples | Warn | Stale |
|---|---|---|---|
| **Evergreen** | Founding year, historical events, past decisions, discontinued products | never | never |
| **Structural** | Business model, pricing axis, core mechanics, value metric | 24 mo | 36 mo |
| **Slow-moving** | Headcount band, platform support, tier structure, ownership | 18 mo | 30 mo |
| **Fast-moving** | Revenue, user counts, valuation, TPV, customer counts | 12 mo | 18 mo |
| **Volatile** | Growth rates, market share, competitive position | 6 mo | 12 mo |

Warn → `WARN005` in the build report. Stale → the chip renders visibly aged, and the claim may not be used to support an INFERENCE without refresh.

### 8.2 The three dates

Every evidence entry distinguishes:

- **`asOf`** — when the *measured thing* was true. The one that matters analytically.
- **Publication date** — when the source published. Recorded in the source register.
- **`lastUpdated`** — when *we* last reviewed the entry. Reviewing and confirming still-current resets the clock; the figure did not change but our confidence in its currency did.

Conflating `asOf` with publication date is a common and consequential error: an article published this month reporting a figure from two years ago is a two-year-old figure.

---

## 9. Source Conflicts & Definition Drift

Covered operationally in §5. The governing rule:

> **Never compare two numbers whose definitions you have not personally verified as identical.**

The recurring traps, each of which has produced a widely-repeated wrong number in tech writing:

- **TPV read as revenue** — overstates a payments business by roughly two orders of magnitude
- **ARR read as revenue** — different timing basis, different meaning
- **Registered users read as active users**
- **Customers, accounts, logos and contracts used interchangeably**
- **Valuations from different instruments and dates compared as a trend**
- **Market share quoted without its denominator**
- **Constant-currency and actual growth rates mixed within one series**

Every comparison in a comparison document is subject to this rule. An apples-to-oranges row in the Compare view is worse than an omitted row, because the schema's structure lends it unearned authority.

---

## 10. Research Workflow

Ten stages. Stages 1–7 produce the dossier; 8–10 produce the teardown. **Schema population does not begin until stage 7 is complete.**

| # | Stage | Activity | Exit condition |
|---|---|---|---|
| 1 | **Discovery** | Map what exists: filings, docs, archived pages, interviews, reporting. Breadth over depth | Source landscape mapped; ceiling estimated |
| 2 | **Source collection** | Populate the Source Register. Tier and date every entry. Archive anything at risk of disappearing | Register complete with tiers |
| 3 | **Evidence extraction** | Pull candidate claims verbatim with location. **No paraphrasing at this stage** | Raw extracts captured |
| 4 | **Claim construction** | Decompose into atomic claims. Place each on the ladder | No compound claims remain |
| 5 | **Classification** | Apply the attribution transform. Assign class and confidence per §6 | Every claim classified and capped |
| 6 | **Reconciliation** | Run §5 on every conflict. Record resolutions and irreducible conflicts | Conflicts register complete |
| 7 | **Dossier review** | Read the whole dossier cold. What does the evidence actually support? | Dossier signed off |
| 8 | **Schema population** | Fill the five JSON files from the dossier. Every number is an evidence id | `content:check` passes |
| 9 | **Analytical synthesis** | Write the MDX. This is where JUDGMENT is authored — clearly marked | All ten sections drafted |
| 10 | **Quality review** | Run §12. Fix or downgrade every failure | Checklist passes |

**Stage 7 is the one that will be skipped under time pressure, and it is the one that matters most.** Reading the dossier as a whole, before any prose exists, is the only point at which the evidence can shape the argument rather than the argument selecting the evidence. Everything after stage 7 is subject to motivated reasoning; stage 7 is the last honest look.

---

## 11. Research Dossier Structure

Location: `research/<product-slug>/`. Committed to the repository, **not** consumed by the build.

Committing the dossier is deliberate. It is the audit trail, it makes every published claim traceable, and it is the difference between "I wrote about Stripe" and "here is my working." It may later become a public *show your work* surface.

### A. Source Register — `sources.md`
Every source: URL, title, publisher, publication date, tier, claim domains it can serve, archive link, relevance note.

### B. Evidence Register — `evidence.md`
Atomic claims: claim text, rung, class, supporting sources, confidence, `asOf`, basis/definition, notes. This is the direct precursor to `evidence.json`.

### C. Open Questions — `open-questions.md`
What could not be established, what evidence would settle it, and whether it materially affects the analysis. **Feeds the Verdict section's `openQuestions` directly** — this is not throwaway working material.

### D. Conflicts — `conflicts.md`
Every conflict encountered, the §5 steps applied, the resolution or the explicit decision to preserve the conflict.

### E. Hypotheses — `hypotheses.md`
Strategic readings that are interesting but not yet sufficiently evidenced. Quarantined here so they cannot leak into the teardown unlabelled. Some will graduate to JUDGMENT after stage 7; some will die, and killing them is a successful outcome.

### F. Analytical Conclusions — `conclusions.md`
The inferences and judgments that survived stage 7, each with the evidence chain that supports it. This becomes the spine of the MDX prose.

---

## 12. AI Usage Rules

### 12.1 Permitted

- Discover candidate sources
- Summarise a source **that has been retrieved and is in hand**
- Extract candidate atomic claims from supplied text
- Identify apparent conflicts between supplied sources
- Propose hypotheses, explicitly labelled as such
- Identify candidate patterns across products
- Generate verification questions
- Check drafted claims against this methodology

### 12.2 Forbidden

- Silently converting an inference into a fact
- Inventing any figure, date, or detail
- **Manufacturing a citation** — the highest-severity failure in this document
- Treating company marketing as independent validation
- Resolving a conflict without surfacing that a conflict existed
- Asserting causation from correlation or sequence
- Producing a moat or growth-loop conclusion because it is plausible rather than because it is evidenced
- Filling a schema field to satisfy validation when the evidence does not exist

### 12.3 The two hard operational rules

**Rule 1 — No citation exists until the URL has been opened.** A URL produced by a language model is a hypothesis about a URL. Every source in the register must be retrieved and read. A fabricated citation in a portfolio piece is unrecoverable: it converts the entire Atlas from "rigorous" to "unverified" in a single click by one skeptical reader.

**Rule 2 — AI output enters the dossier as candidate claims, never as evidence.** The dossier's evidence column cites sources, never a model. If a claim's only support is that a model asserted it, the claim does not exist.

### 12.4 Traceability

> **Every material analytical conclusion must be traceable to specific evidence entries, and every evidence entry to a specific retrieved source.**

The chain is: published claim → `evidenceIds` → `evidence.json` entry → source register entry → retrieved URL. Any break in that chain is a publication blocker.

---

## 13. Final Publication Checklist

Run before a product moves from `draft` to `published`. Any failure blocks publication or forces a downgrade.

**Evidence integrity**
- [ ] Every material metric carries an evidence id
- [ ] Every `verified` entry has a retrievable source URL that has been opened
- [ ] No evidence entry cites a source not in the register
- [ ] Every `estimated` entry explains its derivation
- [ ] Every figure carries `asOf` and, where relevant, its basis
- [ ] No stale evidence supports a live inference

**Claim discipline**
- [ ] Company claims are visibly distinguished from external facts
- [ ] The attribution transform has been applied to every company source
- [ ] No causal claim is presented as a fact
- [ ] No L5 evaluation is presented as anything but judgment
- [ ] No compound claim mixes evidenced and unevidenced halves
- [ ] Every superlative is either argued or deleted

**Analytical quality**
- [ ] Every moat claim has a mechanism, operating evidence, a replication argument, and an attack vector
- [ ] Every network effect claim passes all four steps of §6.4
- [ ] Every growth loop describes a genuinely reinforcing mechanism that closes
- [ ] Every strategic bet separates observed decision, inferred intent, and resulting trade-off
- [ ] At least one bet is honestly recorded as not having straightforwardly paid off
- [ ] Every Strategic Profile axis rationale is falsifiable on the facts

**Honesty**
- [ ] No false precision anywhere
- [ ] Conflicting figures are reconciled by protocol or disclosed as ranges
- [ ] Private-company evidence ceilings are visible on the page
- [ ] Open questions are stated rather than quietly omitted
- [ ] No claim rests on absence of evidence
- [ ] The author's strategic judgment is clearly identifiable *as* judgment

**Traceability**
- [ ] The dossier exists and is committed
- [ ] Every conclusion traces to evidence; every evidence entry to a source
- [ ] `content:check` passes with zero errors; warnings reviewed and consciously accepted

---

## 14. Worked Example

A complete pass, from raw source to published claim, using a hypothetical company so that no real-world research is implied.

**Hypothetical:** *Ledgerline*, a private B2B expense-management product.

### Stage 1–3 — Sources retrieved and extracted

**S1** — Company blog, "Why we built Ledgerline for finance teams," dated 2024-03-11. Tier 2/3.
> "We grew almost entirely through word of mouth from finance teams. Today more than 12,000 companies run their expenses on Ledgerline, and our best channel is still a controller telling another controller."

**S2** — Official docs and pricing page, retrieved 2026-08-30, plus a 2022 Wayback snapshot. Tier 2.
> Free tier: up to 3 users, unlimited receipt capture. Paid tiers priced per active user per month. Approver and viewer roles are free on all tiers.

**S3** — Trade journalism, 2025-11-02. Tier 4.
> "Ledgerline told investors it passed 9,000 paying customers last year, though two competitors dispute its methodology, noting it counts each subsidiary separately."

### Stage 4 — Atomic decomposition

| # | Claim | Rung |
|---|---|---|
| C1 | Approver and viewer roles are free on all tiers | L1 |
| C2 | Paid tiers are priced per active user per month | L1 |
| C3 | The company states it serves more than 12,000 companies | L1 |
| C4 | The company serves more than 12,000 companies | L2 |
| C5 | The company reported passing 9,000 paying customers | L2 |
| C6 | The company counts subsidiaries as separate customers | L2 |
| C7 | Word of mouth between finance professionals is an acquisition mechanism | L3 |
| C8 | Word of mouth is the company's primary acquisition mechanism | L4 |
| C9 | Free approver seats are a deliberate distribution mechanism | L4/L5 |

### Stage 5 — Attribution transform and classification

| # | Class | Confidence | Reasoning |
|---|---|---|---|
| C1 | **FACT** | `verified` | T2, directly observable, self-referential, non-evaluative |
| C2 | **FACT** | `verified` | T2, directly observable |
| C3 | **FACT** | `verified` | The assertion is checkable — the transform applied |
| C4 | **FACT about the report** | `reported` | Self-reported, uncorroborated, definition unstated. **Not promotable** |
| C5 | **FACT about the report** | `reported` | T4 relaying a company statement to investors |
| C6 | **FACT** | `reported` | T4, and it is against the company's interest to have this known |
| C7 | **FACT** | `reported` | Mechanism is plausible and company-stated; C1 supplies a structural reason it would operate |
| C8 | **INFERENCE** | `estimated` | Causal, single-sourced, self-serving. Caps at inference (§6.1) |
| C9 | **JUDGMENT** | — | The author's reading of intent from structure |

### Stage 6 — Reconciliation

**Apparent conflict:** 12,000 companies (C4) vs 9,000 paying customers (C5).

- *Step 1:* Not the same metric — "companies" is unqualified, "paying customers" is explicit. Dates differ by roughly a year. **Not a conflict.**
- *Step 3:* Neither supersedes the other; different bases coexist.
- *C6 is the real finding:* the counting methodology is disputed, which means **both figures are subject to the same definitional uncertainty.**
- *Step 4:* Both preserved, both `reported`, discrepancy explained in the note.

### Stage 7–8 — Evidence entries

```json
{
  "id": "companies.claimed.2024",
  "claim": "Companies the vendor states use the product",
  "value": "12,000+",
  "asOf": "2024-03-11",
  "confidence": "reported",
  "source": { "type": "company-communication", "title": "Why we built Ledgerline for finance teams",
              "url": "https://example.invalid/blog/why-we-built", "retrievedOn": "2026-08-30" },
  "note": "Self-reported and unqualified — the company does not define whether this counts accounts, legal entities or logos. Reporting in 2025 indicates subsidiaries are counted separately, so this figure is not comparable to competitor customer counts."
}
```

```json
{
  "id": "paying.customers.2024",
  "claim": "Paying customers as reported to investors",
  "value": "~9,000",
  "asOf": "2024-12-31",
  "confidence": "reported",
  "source": { "type": "press", "title": "Ledgerline pushes into mid-market",
              "url": "https://example.invalid/ledgerline-midmarket", "retrievedOn": "2026-08-30" },
  "note": "Relayed by trade press from a company statement to investors. Counting methodology disputed by competitors, who note subsidiaries are counted individually. Not comparable to the 12,000 companies figure, which uses a different and unstated basis."
}
```

### Stage 9 — What may be published

**In the growth loop (`loops.json`), an edge mechanism — FACT:**
> Approver and viewer roles are free on every tier, so a paying customer routinely brings unpaid colleagues into the product as a normal consequence of using it.

**In the loop thesis — INFERENCE, ambient-marked:**
> Adoption appears to spread primarily through professional referral between finance teams rather than through paid acquisition, though this rests substantially on the company's own account.

**In Bets & Tensions — JUDGMENT, accent-ruled:**
> Making approver seats free is not a pricing concession; it is the distribution mechanism. The company pays for reach in foregone seat revenue and recovers it by converting approvers into administrators. The tension is that this caps revenue per account precisely in the large organisations where approver counts are highest.

**In Open Questions:**
> Customer counts use an undisclosed and disputed basis. The 12,000-company and 9,000-paying-customer figures are not comparable, and neither can be independently verified.

### What must **not** be published

| Forbidden | Why |
|---|---|
| "Ledgerline serves over 12,000 companies." | Promotes C4 from reported-claim to fact by dropping attribution |
| "Word of mouth drove Ledgerline's growth." | L4 causal claim from a single self-serving source |
| "Ledgerline has a powerful network effect from free approver seats." | Fails §6.4 — an existing user gains nothing when an unrelated company's approver joins. This is a **distribution** mechanism, not a network effect |
| "With 12,000 companies versus its competitor's 9,000…" | Apples-to-oranges; different bases, one disputed |

**The network-effect line is the instructive one.** The claim is superficially plausible, would pass unnoticed in most product writing, and is wrong — the effect is local to a single customer's organisation and confers no cross-customer value. Naming it correctly as a distribution mechanism is both more accurate and more interesting, and it is exactly the distinction a senior reader uses to separate real analysis from fluent summary.

---

*This methodology governs every teardown. Changes are versioned and recorded in the framework changelog on `/method`.*
