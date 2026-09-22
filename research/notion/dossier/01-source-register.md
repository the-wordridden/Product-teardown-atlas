> **IMPORTANT: This document contains source discovery and evidence mapping only. It is not the Notion teardown and contains no final strategic judgments.**

# Notion — Source Register (Stage 1)

---

## 1. Research metadata

| | |
|---|---|
| **Product** | Notion |
| **Stage** | 1 — Source discovery and collection (passes 1 and 1b) |
| **Research cutoff** | 2026-09-21 (inclusive) |
| **Session date** | 2026-09-22 |
| **Methodology** | `docs/research-methodology.md` v1.0 (LOCKED) |
| **Planned angle** | "Does a public template gallery work as an acquisition engine?" (`content/upcoming.json`) |
| **Status** | **PARTIAL — passes 1 and 1b complete, not signed off** |
| **Sources verified (opened and inspected)** | **16**, including **4 direct observations** |
| **Sources attempted and blocked** | 3 |
| **Categories swept** | B (official docs, pricing, API, AI) good; **observation** productive; A (company statements) three incl. the gallery relaunch; E (independent journalism) one; F (practitioner) three threads; C (archive) and D (statutory) **not started** |

### Pass 1b — the gallery's own numbers, the duplication boundary, AI packaging, practitioners (2026-09-22)

Sources **NOT-S007** to **NOT-S013**. Three findings:

- **Open question 2 is closed, from Notion's own help guide.** "Once you identify the template(s) you'd like to use, click the `Start with this template` button. If you're already signed into Notion, the template will automatically be added to your workspace in the Private section of your sidebar." And, decisively: **"If you're logged out or don't have a Notion account, you'll be prompted to sign in or create an account first"** [S008]. The template *is* the signup prompt. That is the acquisition mechanism stated by the company, matching the boundary observed at OBS-004.
- **The gallery has a disclosed throughput figure, and it is large.** Announcing the rebuilt gallery in June 2023, Notion stated: **"In the past year alone, there have been 51 million template duplications from nearly 11 million people"** [S007]. Since every duplication by a logged-out person requires creating an account [S008], this is the closest thing to an acquisition number in the register. It does not say how many of the 11 million were new.
- **AI is a plan gate plus a credit meter, not an add-on.** "Notion AI is available on Business and Enterprise Plans"; Free and Plus "get a limited number of complimentary AI responses"; "Premium AI models spend Notion credits" and Business and Enterprise carry "a usage allowance" [S012]. Widely-repeated blog claims that a standalone add-on was withdrawn on a specific date in 2025 are **not** in this register: no primary source was located, only aggregators. Open question 15.

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
| **NOT-S007** | notion.com/blog — "A place for creators and builders: the reimagined Notion Template Gallery" | 2023-06-21 | **USE (AUTH for the disclosure)**, INT | "In the past year alone, there have been 51 million template duplications from nearly 11 million people." Scale at relaunch: "We've expanded from 600 templates to more than 5,000"; "increasing the number of template categories from 21 to 250+"; "over 2,000 Creator profiles". Stated purpose: "giving global creators a place to showcase their work and single place for our community to see what is possible"; "we want to make it easier to find the study setups you might see on YouTube, or the personal dashboards you've scrolled through on TikTok". A new submission process lets "creators to submit their templates and claim their Notion handles". **No mention of SEO, and no mention of creators charging or revenue share.** |
| **NOT-S011** | notion.com/blog — "Introducing Notion 3.0" | 2025-09-18 | INT, CAP (SUGG) | Notion AI Agents "at the center"; agents can "do up to 20 minutes of autonomous work at a time across hundreds of pages at once"; "Anything you can do in Notion, your Agent can do too"; database row permissions, new AI connectors, MCP integrations; "Custom Agents are coming soon". No pricing change stated in the post. |
| **NOT-S005** | notion.com/blog — "GIC, Sequoia, Index purchase Notion shares" | 2026-01-26 | FIN (valuation), INT | "total tender of around $270M at an $11B valuation"; "These investors are purchasing shares directly from current and former Notion employees"; "We removed the one-year vesting cliff on options"; "more than 50% of our ARR came from AI-enabled customers, and that percentage more than doubled over the last year". Note the wording: *AI-enabled customers*, which is a customer segment, not AI revenue. |

| **NOT-S008** | notion.com/help/guides/the-ultimate-guide-to-notion-templates | retrieved 2026-09-22 | **CAP (AUTH)** — closes open question 2 | "Once you identify the template(s) you'd like to use, click the `Start with this template` button. If you're already signed into Notion, the template will automatically be added to your workspace in the Private section of your sidebar." **"If you're logged out or don't have a Notion account, you'll be prompted to sign in or create an account first."** Submission: "go to notion.com/templates and click the `Submit a template` button… Fill out the form (including your public template link, template name, template descriptions, and template category)". **Contains no information about selling templates, fees or revenue share.** |
| **NOT-S012** | notion.com/help/notion-ai-faqs | retrieved 2026-09-22 | **PRC (AUTH)**, CAP | "Notion AI is available on Business and Enterprise Plans." "Users on the Free and Plus Plans get a limited number of complimentary AI responses so they can try Notion AI features out." "Premium AI models spend Notion credits, and a workspace owner or admin has to turn them on first." "To keep Notion AI fast and reliable, Business and Enterprise plans include a usage allowance for certain Notion AI features." No add-on price, no dates, no grandfathering language on this page. |

### Category E — Independent journalism (Tier 4)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **NOT-S006** | Forbes, "Notion Kicks Off Employee Share Sale At $11 Billion Valuation As AI Accelerates Its Growth" (Anna Tong) — opened in full | 2025-12-15 | **FIN (CORR)**, HIS | "Notion told its employees Monday that they can sell some of their shares at an $11 billion valuation ahead of a potential initial public offering, people familiar with the matter told Forbes"; "Sequoia Capital, Index Ventures and the Singaporean sovereign wealth fund GIC will purchase the shares, and the deal is expected to be for about $300 million worth of shares"; "recently passed $600 million in annual recurring revenue, half of which is coming from its artificial intelligence products, and is cash flow positive, the people said"; "The privately-held company's last tender offer in 2022 was at a $10 billion valuation, the same valuation as its series C round in 2021." **All figures attributed to unnamed people familiar.** Note the discrepancy with S005: Forbes says ~$300M, Notion's own post says ~$270M; Forbes is the announcement, Notion's is the completion. |

### Category F — Practitioner accounts (Tier 5)

| ID | Source | Date | Serves | Notes |
|---|---|---|---|---|
| **NOT-S009** | HN 27612894, "Ask HN: Notion is withholding my company data, what can I do?" (479 pts, 194 comments) | 2021-06-24 | USE (lived experience, SUGG), moat component D candidate | A paying customer since 2017: the export feature stopped delivering its download link for three months, with support replying "Our engineering team is currently working through a large backlog, and there is no immediate fix for this issue." The poster's framing is the analytically useful part: "It was a critical function that locks us with them and goes against their selling message of 'you own your data'." One account, 2021; whether it still holds is untested. |
| **NOT-S010** | HN 28776786, "Lessons learned from sharding Postgres at Notion" (471 pts) | 2021-10-06 | CAP (CORR), HIS | Notion's own engineering write-up, discussed publicly: the block data model was sharded across 480 logical shards. Practitioner comment in-thread, contemporaneous: "Many companies I worked with stopped working with Notion in the past because of performance problems, the application was simply too slow." Evidence that block-level storage carried a real scaling cost. |
| **NOT-S013** | HN 44594790, "Tell HN: Notion Desktop is monitoring your audio and network" (430 pts, 171 comments) | 2025-07-17 | CAP, INT | A user quotes Notion support describing AI Meeting Notes detection: "The system uses a sophisticated dual-detection approach: microphone monitoring combined with network port analysis"; "Detection is implemented separately for macOS and Windows at the native operating system level." A counter-voice in the thread notes this is a common technique and that Notion checks whether the mic is active rather than listening. Bears on how far the AI push reaches into the client. |

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
| NOT-X003 | A first-hand template creator's own revenue disclosure | **Not found.** Searches return only course-selling blogs (Kajabi, Medium, coachli, automateed) repeating third-hand figures about Thomas Frank and Easlo. Thomas Frank's own site carries product pages, no revenue post | Fails §2.4: not contemporaneous first-hand accounts but marketing for courses about selling templates. **Nothing admitted.** Open question 7 |

---

## 4. What passes 1 and 1b have not done

- **No Category C (archive).** The Internet Archive was offline during the Stripe passes; retry for notion.com/pricing to date the block limit's introduction and the AI pricing changes.
- **Creator economics remain unevidenced.** Three threads opened cover data export, scaling and the desktop client, not creators. No admissible source describes what a template creator earns, or what share of 22,116 creators earn anything (open question 7, X003).
- **No SEO evidence, and the angle now has a partial answer without it.** Observed: category pages per intent, template pages that cross-link Notion's own marketing (OBS-002, OBS-003). Disclosed: 51 million duplications from ~11 million people in a year [S007], and a documented requirement that a logged-out duplicator create an account [S008]. **Still not evidenced:** how those people arrive at the gallery, what share were new to Notion, or any ranking or traffic figure. The mechanism is now evidenced end to end; its *source of traffic* is not.
- **No competitor or market evidence.** Coda, Obsidian, Airtable, Confluence are the obvious set; nothing opened.
- **No Users/JTBD first-hand accounts.**
- **Nothing on Notion AI's pricing history**, which matters given that AI is now more than half of ARR by two accounts.
