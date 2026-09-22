# Notion — Open Questions

Created during Stage 1 pass 1 (2026-09-22). Feeds the Verdict section's `openQuestions` and the next research decision.

---

## Blocking — a teardown section cannot be authored without these

| # | Question | Why it blocks | What would answer it | Answerable? |
|---|---|---|---|---|
| **1** | Does the template gallery actually acquire users, or is it a retention and expansion surface for people who already use Notion? | The planned angle. **Now evidenced end to end except one step.** Organic search brings an estimated 287K monthly visits across 60K US keywords [S014]; a template page renders fully to an anonymous visitor (OBS-003); duplication forces a signup for anyone logged out [S008]; Notion disclosed 51M duplications from ~11M people in a year [S007]. **The only missing link: what share of those people were new.** | Only Notion can answer it: a statement separating new signups from existing users. Nothing else would settle it | **No, not from public sources.** Publish the chain as evidenced and this one step as unestablished |
| **2** | ~~What happens at the duplication step for someone with no account?~~ **CLOSED** by S008: "If you're logged out or don't have a Notion account, you'll be prompted to sign in or create an account first." Corroborates the observed boundary at OBS-004 | Growth Loops, Product | — | Answered |
| **3** | Who uses Notion, and what do they hire it for, in their own words? | Users and JTBD. **Sweep failed in pass 1c (X005):** no first-hand adoption or migration account located, only comparison-farm content. What exists: packaging that names its audiences [S001], three practitioner threads on data export, performance and the desktop client [S009, S010, S013], and the template categories people actually browse (OBS-001) | A targeted sweep of r/Notion and engineering blogs by company name; a creator describing their buyers | Uncertain — treat Users and JTBD as partly evidenced and say so |
| **4** | What are Notion's actual revenue, user and customer numbers, and on what basis? | Vitals and Business Model. Only ARR ($600M) and the "half from AI" split are in the register, both from Forbes citing unnamed people [S006]; Notion's own post gives only the tender terms and an "AI-enabled customers" share [S005] | Any Notion statement giving users or customers; a second T4 outlet for ARR; an eventual S-1 | Partly |

---

## Material — would materially improve a section

| # | Question | Bears on |
|---|---|---|
| 5 | ~~When was the 1,000-block limit introduced, and what preceded it?~~ **ANSWERED** [S019]: the same deletion-proof 1,000-block cap applied to *individuals* until May 2020, when Notion removed it and folded the old $4/month Personal plan into the free tier, per a contemporaneous quotation of its own FAQ. It now applies to multi-member free workspaces [S002]. Exact date of that reintroduction still unknown | Business Model, Inflections |
| 15 | Was there ever a standalone Notion AI add-on, at what price, and when did it stop being sold separately? Aggregators state $8–10 per member and a date of 2025-05-13, with grandfathering; **no primary source found.** Today's FAQ simply gates AI to Business and Enterprise [S012] | Business Model, Inflections |
| 16 | Does the 51M duplications / 11M people figure [S007] have a more recent equivalent? It covers the year to June 2023, when the gallery held 5,000 templates; it now holds 30,000+ (OBS-001) | Growth Loops, Vitals |
| 6 | Is "more than 50% of ARR from AI-enabled customers" [S005] the same claim as "half of ARR comes from AI products" [S006]? A customer who uses AI is not the same as revenue earned from AI | Business Model. Logged in `04-conflicts.md` |
| 7 | What does a template creator actually earn, and what share of the 22,116 creators earn anything? The marketplace advertises "get featured, and even get paid" (OBS-001) | Users, Growth Loops |
| 8 | Does Notion take a cut of paid template sales, and if so what? Prices from $0.99 to $39.00 are displayed (OBS-001); no fee is stated on any observed surface | Business Model |
| 9 | What is Notion's headcount? Aggregators say around 1,000; no primary source opened | Vitals |
| 10 | ~~Notion's acquisitions and what they cost?~~ **Partly answered** [S015]: Skiff (Feb 2024, had raised $14.2M, product shut down within 12 months, accounts not converted), Flowdash (2022), Cron (became Notion Calendar), Automate.io. **No price disclosed for any**, which remains open | Bets, Inflections |
| 11 | How do blocks, pages and databases relate in the data model beyond the API's `child_page` type? The billing unit being the architectural unit is the teardown's spine and deserves more than one source | Product, Business Model |

---

## Non-blocking — would add colour

| # | Question |
|---|---|
| 12 | The consultant and agent marketplaces (238 consultants, 143 agents, OBS-001): a services layer around the product, unexamined |
| 13 | Notion Sites and the `*.notion.site` publishing surface, which is how template artefacts are distributed (OBS-004) and is itself a potential acquisition surface |
| 14 | Whether the "AI Skills" category (378 templates, OBS-001) represents a new template class or a rebranding of existing ones |
