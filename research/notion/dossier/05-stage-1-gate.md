> **Terminal gate for Stage 1. Determines what can and cannot be responsibly claimed. Not the teardown.**

# Notion — Stage 1 Gate

| | |
|---|---|
| **Stage** | 1 — terminal gate after passes 1, 1b, 1c |
| **Research cutoff** | 2026-09-21 |
| **Session date** | 2026-09-22 |
| **Sources verified** | 20 (NOT-S001 – NOT-S017, OBS-001 – OBS-004) |
| **Blocked** | 6, of which the archive (X004) is a transient outage and two (X003, X005) are genuine absences worth publishing |
| **Direct observations** | **4.** The acquisition surface was examined first-hand, unauthenticated. No account was created, so nothing behind the signup wall was observed |

Evidence-ceiling statement required by §7.2: *Notion does not publish audited financials, and publishes no user or customer count at all. Revenue and valuation figures here come from the company's own tender announcement and from Forbes citing unnamed sources. Traffic figures are third-party tool estimates. Product mechanics, pricing and the template gallery's own disclosures are evidenced to the same standard as any other teardown.*

---

## Gate table

| # | Analytical question | Evidence strength | Status | Strongest supported statement | Remaining gap |
|---|---|---|---|---|---|
| **1** | **The template funnel** (the planned angle) | **EVIDENCED, with one unestablished step** | **READY** | Organic search reaches the gallery at an estimated 287K monthly visits across 60K US keywords [S014]; category pages exist per intent (OBS-002); a template page and the artefact itself render fully to an anonymous visitor (OBS-003, OBS-004); duplication is gated, and Notion states "If you're logged out or don't have a Notion account, you'll be prompted to sign in or create an account first" [S008]; Notion disclosed 51M duplications from ~11M people in a year to June 2023 [S007] | **What share of duplicators were new to Notion.** Only Notion could answer this. Publish the chain and this gap together |
| **2** | **Core problem** | INSUFFICIENT | **GAP** | Notion's About page describes a mission to "break away from today's tools" with no dated problem statement and no numbers [S016] | No contemporaneous founding-era source opened. The 2019 HN launch thread exists as a lead, not yet opened |
| **3** | **Primary user** | PARTIALLY EVIDENCED | **TARGETED GAP** | Notion's own packaging names four audiences, from "For individuals to organize personal projects and life" to "For organizations to operate with scalability, control, and security" [S001]; the gallery's largest categories are personal and student planning, not work (OBS-001: Personal Planner 9,530, Student Life 7,472) | No user or customer count exists anywhere, including on Notion's own About page [S016]. No segment composition |
| **4** | **Primary JTBD** | INSUFFICIENT | **GAP** | — | X005: no first-hand adoption or migration account located. Jobs cannot be constructed from packaging alone |
| **5** | **Core action and the data model** | **EVIDENCED** | **READY** | A block is the architectural primitive: "A block object represents a piece of content within Notion", 30+ types, `has_children` nesting, `child_page` as a block type [S003]. Notion sharded this model across 480 logical Postgres shards [S010] | Product behind the signup wall not observed |
| **6** | **The free-plan gate** | **EVIDENCED** | **READY** | A Free workspace with 2+ members is limited to 1,000 blocks; "Every piece of content you add is counted as a new block"; "Deleting blocks, or emptying the trash, will not reduce your block count"; editing continues but creation stops, after a three-day grace period [S002]. Individual workspaces are unlimited [S001] | When the limit was introduced, and what preceded it (X004, archive offline) |
| **7** | **Business model and pricing** | **EVIDENCED (list)** · **REPORTED (financials)** | **READY, with ceiling stated** | Four plans, $0 / $10 / $20 / custom per member per month, with named gates at each step [S001]; AI is a Business and Enterprise gate plus a credits meter for premium models [S012]; ARR "recently passed $600 million… and is cash flow positive", per Forbes citing people familiar [S006]; $11B tender, ~$270M, completed January 2026 [S005] | No revenue basis, no mix, no margin, no headcount. Whether a standalone AI add-on ever existed (open Q15) |
| **8** | **Growth loop closure** | PARTIALLY EVIDENCED | **DRAW OPEN AT ONE LINK** | The loop is: search → template page → forced signup → workspace → the user builds and publishes → a new template enters the gallery. Links 1 to 3 are evidenced [S014, S008, S007]. The return link, users becoming creators, is structurally evidenced by the submission flow [S008] and the 22,116 creator profiles (OBS-001) but has no rate | The new-versus-existing split (question 1), and any rate on the creator return link |
| **9** | **Moats** | PARTIALLY EVIDENCED | **ONE CANDIDATE, LABELLED** | Switching costs have a documented shape: a block-structured workspace with databases, formulas and internal links has no clean export target, and one paying customer described the export feature silently failing for three months while support cited a backlog, calling it a function that "locks us with them" [S009] | One account, from 2021, untested since. No migration study. Component D is a single anecdote, not a measured cost |
| **10** | **Network effects** | INSUFFICIENT | **DO NOT CLASSIFY** | The gallery has a two-sided shape: more creators produce more templates, which rank for more intents. But §6.4 step 2 fails: nothing shows an existing user's value rising because a *specific* new creator joined | Would need per-creator or per-template value data that nobody publishes |
| **11** | **Competitive position** | INSUFFICIENT | **GAP** | — | X005: only comparison-farm content. No analyst, regulator or independent comparison opened |
| **12** | **Bets** | PARTIALLY EVIDENCED | **READY for two** | AI: Notion 3.0 put agents "at the center", able to "do up to 20 minutes of autonomous work at a time across hundreds of pages" [S011], AI is now a Business-plan gate [S012], and "more than 50% of our ARR came from AI-enabled customers, and that percentage more than doubled over the last year" [S005]. Acquisitions: Skiff bought and wound down within 12 months, accounts not converted [S015], following Flowdash, Cron and Automate.io | No price for any acquisition. The AI bet's outcome is unresolved and the ARR claim is a customer share, not a revenue share (C1) |
| **13** | **Inflections** | PARTIALLY EVIDENCED | **THIN** | Gallery relaunch June 2023 [S007]; Skiff acquisition and shutdown 2024 [S015]; Notion 3.0 agents September 2025 [S011]; $11B tender January 2026 [S005], against a $10B tender in 2022 and a $10B Series C in 2021 [S006] | Only four dated events with opened sources, and the schema requires at least three, so this passes but barely. The founding era and the 2020 free-tier change are unevidenced (X004) |
| **14** | **Headcount** | INSUFFICIENT | **PUBLISH AS UNESTABLISHED** | — | No primary source. Aggregators say around 1,000; none admitted (C3) |

---

## What this gate authorises

- **Stage 2 may begin** for Vitals (with the ceiling stated), Product, Business Model, Growth Loops and Bets.
- **The angle is answerable and should lead the teardown.** The funnel is evidenced at every step except the new-versus-existing split, and that gap is the honest finding: Notion has published a throughput number and never published a conversion number.
- **Users is partly evidenced**, built from packaging and the observed category mix, explicitly labelled. **JTBD is a gap** and should say so rather than inventing jobs from a pricing page.
- **Problem is a gap** unless a founding-era source is opened in a later pass.
- **Moats: one candidate**, switching costs, with component D resting on a single 2021 account. Classify in synthesis; do not overstate.
- **Do not classify a network effect** in either direction.

## What this gate withholds

- Any user or customer count. Notion publishes none, and no aggregator figure is admissible.
- Any statement that the gallery "acquires" users, as distinct from converting visitors.
- Any merged claim that half of Notion's revenue comes from AI. Notion said AI-enabled *customers*; Forbes said AI *products*. Keep them apart (C1).
- Any creator-earnings figure. The marketplace says creators can "get paid" (OBS-001) and nothing admissible says how much (X003).
- Any acquisition price.

## Before Stage 2 sign-off

1. Open the January 2019 HN launch thread and any founding-era interview, for the Problem section.
2. One targeted attempt at r/Notion for a first-hand adoption or abandonment account (question 3).
3. Retry the archive for the block-limit and AI-pricing history (X004).
