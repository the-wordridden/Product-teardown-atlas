> **IMPORTANT: This document contains source discovery and evidence mapping only. It is not the Notion teardown and contains no final strategic judgments.**

# Notion — Source Register (Stage 1)

---

## 1. Research metadata

| | |
|---|---|
| **Product** | Notion |
| **Stage** | 1 — Source discovery and collection (pass 1) |
| **Research cutoff** | 2026-09-21 (inclusive) |
| **Session date** | 2026-09-22 |
| **Methodology** | `docs/research-methodology.md` v1.0 (LOCKED) |
| **Planned angle** | "Does a public template gallery work as an acquisition engine?" (`content/upcoming.json`) |
| **Status** | **PARTIAL — pass 1 in progress, not signed off** |
| **Sources verified (opened and inspected)** | **9**, including **4 direct observations** |
| **Sources attempted and blocked** | 2 |
| **Categories swept** | B (official docs, pricing, API) good; **observation** started and productive; A (company statements) one; E (independent journalism) one; C (archive), D (statutory), F (practitioner) **not started** |

### 1.1 Material findings from pass 1

1. **The product is directly observable, unlike Figma or Stripe.** The template gallery, category pages, individual template pages and the published template artefact itself are all reachable without an account. Four observations are recorded in §4. This is the first teardown in the Atlas where the acquisition surface can be examined first-hand rather than described from documentation.

2. **The duplication step is where observation stops.** A template page's "Get template" button and a published page's "Start with this template" button both route to `app.notion.com`, which requires an account (OBS-004). No account was created. So the gallery-to-workspace transition can be observed up to the boundary and not across it, which is exactly the transition the planned angle asks about.

3. **The free plan's gate is specific, unusual, and the heart of the business model.** A Free workspace with 2+ members is limited to **1,000 blocks**, and, in Notion's own words, "Deleting blocks, or emptying the trash, will not reduce your block count" [S002]. The limit is *lifetime created*, not *currently stored*. A three-day grace period applies, after which content can still be edited but not added. Individual Free workspaces are unlimited.

4. **"Block" is a real architectural primitive, not marketing.** The API documents 30+ block types, a `has_children` boolean for nesting, and `child_page` as a block type, which means a page is addressable as a block [S003]. The billing unit and the architectural unit are the same object. That connection is the spine of this teardown.

5. **The financial ceiling is T3/T4, and there is one primary company statement.** Notion published the January 2026 tender offer itself: "$270M at an $11B valuation", with GIC joining Sequoia and Index, plus "more than 50% of our ARR came from AI-enabled customers" [S005]. Forbes, opened in full, adds $600M ARR, "half of which is coming from its artificial intelligence products", "cash flow positive", and a prior 2022 tender at $10B, all attributed to "people familiar with the matter" [S006].

6. **Aggregator figures are not admissible and are not in this register.** Searches surfaced getlatka, Sacra, CB Insights, Tracxn, sqmagazine and similar with figures for users (100M, 4M customers), headcount (~1,000) and revenue. None is a primary source; several contradict each other (e.g. "$500M ARR" vs "$600M ARR" for the same event). They are leads only. See open questions.

---

## 2. Verified sources

Column codes: FIN financial performance · CAP product capability · PRC list pricing · USE usage/scale · INT stated strategic intent · HIS history · CMP competitive position.

### Category B — Official documentation and pricing (Tier 2)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **NOT-S001** | notion.com/pricing (US, USD) | retrieved 2026-09-22 | **PRC (AUTH)**, CAP | Four plans. Free "$0/member/month", "For individuals to organize personal projects and life"; blocks "limited for 2+ members"; uploads "Up to 5 MB"; guests "10"; page history "7 days". Plus "$10/member/month", unlimited blocks and uploads, unlimited guests, 30 days history. Business "$20/member/month" (marked Recommended), adds Notion Agent, AI Meeting Notes, Enterprise Search, SAML SSO, granular database permissions, 90 days history. Enterprise "Custom pricing", adds zero data retention with LLM providers, SCIM, audit log, domain management, customer success manager. "Save up to 20% with yearly"; exact annual prices not stated on the page. |
| **NOT-S002** | notion.com/help/understanding-block-usage | retrieved 2026-09-22 | **CAP (AUTH)**, PRC | "1,000 blocks per workspace" for Free workspaces with 2+ members; "Every piece of content you add is counted as a new block"; "Deleting blocks, or emptying the trash, will not reduce your block count"; "You can continue to edit existing content even if your workspace has hit 1,000 blocks"; "We automatically offer a three-day grace period when your workspace hits 1,000 blocks." |
| **NOT-S003** | developers.notion.com/reference/block | retrieved 2026-09-22 | **CAP (AUTH)** | "A block object represents a piece of content within Notion. The API translates the headings, toggles, paragraphs, lists, media, and more that you can interact with in the Notion UI as different block type objects." `has_children` boolean for nesting; 30+ types enumerated including `child_page`, `child_database`, `synced_block`, `column`. |

### Category A — Company statements (Tier 3)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **NOT-S005** | notion.com/blog — "GIC, Sequoia, Index purchase Notion shares" | 2026-01-26 | FIN (valuation), INT | "total tender of around $270M at an $11B valuation"; "These investors are purchasing shares directly from current and former Notion employees"; "We removed the one-year vesting cliff on options"; "more than 50% of our ARR came from AI-enabled customers, and that percentage more than doubled over the last year". Note the wording: *AI-enabled customers*, which is a customer segment, not AI revenue. |

### Category E — Independent journalism (Tier 4)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **NOT-S006** | Forbes, "Notion Kicks Off Employee Share Sale At $11 Billion Valuation As AI Accelerates Its Growth" (Anna Tong) — opened in full | 2025-12-15 | **FIN (CORR)**, HIS | "Notion told its employees Monday that they can sell some of their shares at an $11 billion valuation ahead of a potential initial public offering, people familiar with the matter told Forbes"; "Sequoia Capital, Index Ventures and the Singaporean sovereign wealth fund GIC will purchase the shares, and the deal is expected to be for about $300 million worth of shares"; "recently passed $600 million in annual recurring revenue, half of which is coming from its artificial intelligence products, and is cash flow positive, the people said"; "The privately-held company's last tender offer in 2022 was at a $10 billion valuation, the same valuation as its series C round in 2021." **All figures attributed to unnamed people familiar.** Note the discrepancy with S005: Forbes says ~$300M, Notion's own post says ~$270M; Forbes is the announcement, Notion's is the completion. |

### Direct observations (2026-09-22, unauthenticated)

| ID | What was observed | Serves | Notes |
|---|---|---|---|
| **OBS-001** | notion.com/templates, the marketplace index | USE, CAP | Title: "Choose from 30,000+ Notion templates". On-page counts: "Browse 22,116 creators", "Browse 348 categories", "Browse 2,083 collections", "Browse 238 consultants", "Browse 143 agents". Category tiles carry their own counts: Student Life 7,472, Study Planner 5,463, Personal Planner 9,530, Weekly Planner 800, Back to school 1,092, AI Skills 378. Featured templates carry prices ($0.99 to $39.00) alongside free ones. A "Become a creator" call to action: "Submit your template to the Notion template gallery, get featured, and even get paid". |
| **OBS-002** | notion.com/templates/category/personal-planner | CAP | A category landing page with `<h1>` "Personal Planner templates", title "Best Personal Planner Templates from Notion \| Notion Marketplace", listing individual template pages at `/templates/<slug>`. Confirms the category-page-per-intent structure the planned angle asks about. |
| **OBS-003** | notion.com/templates/basic-daily-planner, an individual template page | CAP, USE | Fully readable without an account: description, "Categories" list (Personal Planner, Back to school, Habit Tracking, Life, Personal Productivity), creator profile with external links, "Ratings & Reviews 4.8 based on 21 ratings", "Last updated last month", "More like this" and "Related content" blocks linking to Notion's own help articles and marketing posts. Two buttons: "View template" (links to the creator's `*.notion.site` published page) and "Get template". |
| **OBS-004** | attuneanchor.notion.site published template page, then the duplication attempt | CAP, **boundary** | The published page renders the full artefact to an anonymous visitor: headings, a schedule table, databases with rows ("Exercise", "Hydrated", "Meditate", "Journal"), a "Template includes" navigation. Chrome shows "Templates", the creator name, and a "Start with this template" button. Clicking it navigates to **app.notion.com**, which is not reachable without an account. **Observation stops here.** No account was created. |

---

## 3. Attempted and blocked

| ID | Target | Result | Resolution |
|---|---|---|---|
| NOT-X001 | app.notion.com (duplication destination) | Requires an account; not approved for tool access | **Not attempted further.** No account will be created. The transition is described up to the boundary; see open question 2 |
| NOT-X002 | notion.com/help/upgrade-or-change-your-plan | HTTP 404 | Block-limit content found instead at S002 |

---

## 4. What pass 1 has not done

- **No Category C (archive).** The Internet Archive was offline during the Stripe passes; retry for notion.com/pricing to date the block limit's introduction and the AI pricing changes.
- **No Category F (practitioner).** Template creators are a distinct population with public earnings claims; Reddit r/Notion and Indie Hackers are the likely sources for what creating templates actually returns. This bears directly on the planned angle.
- **No SEO evidence.** The angle claims the gallery is an acquisition engine. Observed so far: category pages exist per intent, template pages are indexed-shaped, and Notion cross-links its own help and marketing content from them (OBS-003). **Not** observed: any ranking, traffic or conversion data. A third-party traffic estimate would be T4 at best and is not yet opened.
- **No competitor or market evidence.** Coda, Obsidian, Airtable, Confluence are the obvious set; nothing opened.
- **No Users/JTBD first-hand accounts.**
- **Nothing on Notion AI's pricing history**, which matters given that AI is now more than half of ARR by two accounts.
