# Notion — Open Questions

Created during Stage 1 pass 1 (2026-09-22). Feeds the Verdict section's `openQuestions` and the next research decision.

---

## Blocking — a teardown section cannot be authored without these

| # | Question | Why it blocks | What would answer it | Answerable? |
|---|---|---|---|---|
| **1** | Does the template gallery actually acquire users, or is it a retention and expansion surface for people who already use Notion? | This is the planned angle and the Growth Loops section. Observed: 30,000+ templates, 22,116 creators, per-intent category pages, template pages that cross-link Notion's own marketing (OBS-001 to OBS-003). Not observed: a single number connecting any of it to signups | Third-party traffic and ranking estimates for `/templates/*` (T4); any Notion statement on gallery-driven signups; creator accounts describing where their traffic comes from | Partly — expect `partially-evidenced` at best |
| **2** | What happens at the duplication step for someone with no account? | The acquisition transition. "Get template" and "Start with this template" both route to app.notion.com (OBS-004), and no account was created, so the step is unobserved | Notion help documentation describing the signup-on-duplicate flow; a screen-recorded walkthrough by a third party; a creator's description of the funnel | Likely, from documentation |
| **3** | Who uses Notion, and what do they hire it for, in their own words? | Users and JTBD | Practitioner accounts of adopting or abandoning Notion; migration write-ups to and from Confluence, Coda, Obsidian; template creators describing their buyers | Yes — Category F sweep |
| **4** | What are Notion's actual revenue, user and customer numbers, and on what basis? | Vitals and Business Model. Only ARR ($600M) and the "half from AI" split are in the register, both from Forbes citing unnamed people [S006]; Notion's own post gives only the tender terms and an "AI-enabled customers" share [S005] | Any Notion statement giving users or customers; a second T4 outlet for ARR; an eventual S-1 | Partly |

---

## Material — would materially improve a section

| # | Question | Bears on |
|---|---|---|
| 5 | When was the 1,000-block limit for multi-member Free workspaces introduced, and what was the limit before? TechCrunch reported Notion *dropping* a usage limit on the personal free tier in May 2020, which suggests the policy has moved at least twice | Business Model, Inflections |
| 6 | Is "more than 50% of ARR from AI-enabled customers" [S005] the same claim as "half of ARR comes from AI products" [S006]? A customer who uses AI is not the same as revenue earned from AI | Business Model. Logged in `04-conflicts.md` |
| 7 | What does a template creator actually earn, and what share of the 22,116 creators earn anything? The marketplace advertises "get featured, and even get paid" (OBS-001) | Users, Growth Loops |
| 8 | Does Notion take a cut of paid template sales, and if so what? Prices from $0.99 to $39.00 are displayed (OBS-001); no fee is stated on any observed surface | Business Model |
| 9 | What is Notion's headcount? Aggregators say around 1,000; no primary source opened | Vitals |
| 10 | Notion's acquisitions (Cron, Skiff, and any since) and what they cost | Bets, Inflections |
| 11 | How do blocks, pages and databases relate in the data model beyond the API's `child_page` type? The billing unit being the architectural unit is the teardown's spine and deserves more than one source | Product, Business Model |

---

## Non-blocking — would add colour

| # | Question |
|---|---|
| 12 | The consultant and agent marketplaces (238 consultants, 143 agents, OBS-001): a services layer around the product, unexamined |
| 13 | Notion Sites and the `*.notion.site` publishing surface, which is how template artefacts are distributed (OBS-004) and is itself a potential acquisition surface |
| 14 | Whether the "AI Skills" category (378 templates, OBS-001) represents a new template class or a rebranding of existing ones |
