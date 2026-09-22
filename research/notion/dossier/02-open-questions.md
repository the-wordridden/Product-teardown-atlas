# Notion — Open Questions

Created during Stage 1 pass 1 (2026-09-22). Feeds the Verdict section's `openQuestions` and the next research decision.

---

## Blocking — a teardown section cannot be authored without these

| # | Question | Why it blocks | What would answer it | Answerable? |
|---|---|---|---|---|
| **1** | Does the template gallery actually acquire users, or is it a retention and expansion surface for people who already use Notion? | The planned angle and the Growth Loops section. **Advanced in pass 1b:** Notion disclosed "51 million template duplications from nearly 11 million people" in a year [S007], and its help guide states a logged-out duplicator "will be prompted to sign in or create an account first" [S008]. So the mechanism converts, by construction. **What is still missing is the split:** how many of the 11 million were new to Notion | Any Notion statement separating new signups from existing users; a third-party traffic estimate for `/templates/*`; a creator's own traffic breakdown | Partly — the mechanism is evidenced, the acquisition *share* is not |
| **2** | ~~What happens at the duplication step for someone with no account?~~ **CLOSED** by S008: "If you're logged out or don't have a Notion account, you'll be prompted to sign in or create an account first." Corroborates the observed boundary at OBS-004 | Growth Loops, Product | — | Answered |
| **3** | Who uses Notion, and what do they hire it for, in their own words? | Users and JTBD | Practitioner accounts of adopting or abandoning Notion; migration write-ups to and from Confluence, Coda, Obsidian; template creators describing their buyers | Yes — Category F sweep |
| **4** | What are Notion's actual revenue, user and customer numbers, and on what basis? | Vitals and Business Model. Only ARR ($600M) and the "half from AI" split are in the register, both from Forbes citing unnamed people [S006]; Notion's own post gives only the tender terms and an "AI-enabled customers" share [S005] | Any Notion statement giving users or customers; a second T4 outlet for ARR; an eventual S-1 | Partly |

---

## Material — would materially improve a section

| # | Question | Bears on |
|---|---|---|
| 5 | When was the 1,000-block limit for multi-member Free workspaces introduced, and what was the limit before? TechCrunch reported Notion *dropping* a usage limit on the personal free tier in May 2020, which suggests the policy has moved at least twice | Business Model, Inflections |
| 15 | Was there ever a standalone Notion AI add-on, at what price, and when did it stop being sold separately? Aggregators state $8–10 per member and a date of 2025-05-13, with grandfathering; **no primary source found.** Today's FAQ simply gates AI to Business and Enterprise [S012] | Business Model, Inflections |
| 16 | Does the 51M duplications / 11M people figure [S007] have a more recent equivalent? It covers the year to June 2023, when the gallery held 5,000 templates; it now holds 30,000+ (OBS-001) | Growth Loops, Vitals |
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
