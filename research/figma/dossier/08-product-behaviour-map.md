> **Direct product observation only. Documentary claims are labelled as such and are NOT observations.**

# Figma — Product Behaviour Map

| | |
|---|---|
| **Stage** | 1C — Priority 1, product observation |
| **Session date** | 2026-08-30 |
| **Observer role** | **Unauthenticated visitor.** No account was created |

### Access constraint — recorded, not worked around

Creating an account was not attempted. Account creation and credential entry are outside what I will do on the user's behalf, and no existing Figma session was available. **This blocks the majority of the requested observations**, all of which require authentication.

Per Priority 1: the limitation is recorded, and **no secondary description has been relabelled as an observation.**

---

## Observations actually performed

### OBS-001 — Unauthenticated access to a Community artifact page

| Field | Content |
|---|---|
| **Action** | Navigated to `figma.com/community`, located a Community file link, navigated to `figma.com/community/file/1529932739396860076/fortune-cookie` |
| **Role** | Unauthenticated visitor, no account, no session |
| **Observed result** | The page rendered fully without login. Visible: artifact title ("Fortune Cookie!"), product label ("Figma Make"), author name, two public counters (3.7k, 23.6k users), a **Remix** call-to-action, an About section, and **60+ public comments** with usernames and relative dates. Navigation showed **Log in** and **Sign up**. |
| **Friction** | None encountered to reach and read the page. No login wall, no interstitial, no cookie gate blocking content. |
| **What this demonstrates** | Figma publishes a **publicly accessible, unauthenticated content surface** carrying author attribution, engagement counters, public commentary, and a conversion CTA ("Remix") that leads toward account creation. |
| **What this does NOT demonstrate** | That this surface acquires users. That anyone clicks Remix. That Remix converts to an account, a team, or a paid seat. Anything about **private shared design files**, which is the surface that actually matters for the collaboration question. Nothing about editor behaviour, multiplayer, Dev Mode, components, or variables. |

### OBS-002 — Community index page structure

| Field | Content |
|---|---|
| **Action** | Loaded `figma.com/community` unauthenticated |
| **Role** | Unauthenticated visitor |
| **Observed result** | Extensive public catalogue organised by resource type: UI kits, wireframes, AI workflows, design templates, website templates, Figma Make artifacts, extensions/plugins, shaders, **Skills** ("Reusable instructions for the Figma agent"), widgets, whiteboarding and presentation templates. Individual items showed like-counts and usage counts. |
| **Friction** | None. |
| **What this demonstrates** | A large public, indexable, user-generated content surface exists, spanning both design assets and **AI-agent artifacts** ("Skills", "Weave tools"). |
| **What this does NOT demonstrate** | Traffic, search-acquisition contribution, or any conversion from this surface. **Do not infer a content/SEO acquisition loop from the existence of indexable content.** |

---

## Observations requested but NOT performed

All require authentication. **None has been substituted with documentation.**

| # | Requested observation | Status |
|---|---|---|
| 1 | Creating a new file | **BLOCKED — not observed** |
| 2 | Creating/editing a design object | **BLOCKED — not observed** |
| 3 | Sharing a file | **BLOCKED — not observed** |
| 4 | Opening a *privately shared* file as a non-editor | **BLOCKED — not observed.** This is the single most important unobserved behaviour |
| 5 | Commenting (in a design file) | **BLOCKED** — public Community commenting was observed (OBS-001), which is a different surface |
| 6 | Multiplayer / live collaboration | **BLOCKED — not observed** |
| 7 | Dev Mode workflow | **BLOCKED — not observed** |
| 8 | Component / library workflow | **BLOCKED — not observed** |
| 9 | Variables / design tokens | **BLOCKED — not observed** |
| 10 | Export / output mechanisms | **BLOCKED — not observed** |

---

## Documentary substitutes — explicitly NOT observations

Recorded separately so they cannot be mistaken for observed behaviour.

**[DOCUMENTARY — FIG-S014, help.figma.com "Manage seats in Figma", retrieved 2026-08-30, T2]**

Four paid seat types plus one free:

| Seat | Documented access |
|---|---|
| **View** | **The only free seat type** — "view and comment access to Figma Design, Figma Slides, and FigJam"; "no access to Dev Mode; basic inspection only" |
| Collab | Figma Slides, FigJam; view/comment in Design; basic inspection |
| Dev | Dev Mode, Slides, FigJam; view/comment in Design |
| Full | Complete access to all products |

Seat-request approval is configurable: "Manually approve seats," "Manually approve, unless seat is available," or "Auto-approve seats." Where a requested seat type is unavailable, "Figma will add" that seat type "to your subscription," and for monthly plans "Additional approved seats are added to your next invoice."

**Notable documentation gap:** the article **does not state** whether granting edit access automatically assigns and bills a paid seat. That claim comes from practitioner sources (see `09` and `11`), not from Figma's documentation.

**[DOCUMENTARY — FIG-S001, 2019]** Sync architecture as of 2019. Seven years stale; see `05` §5.

---

## Assessment

**Product observation is materially incomplete.** One public surface was observed; the collaborative product itself was not. Sections 4 (JTBD) and 5 (Product) of the Atlas cannot be closed on this basis.

The gap is resolvable — it requires either an authenticated session provided by the user, or a privately shared file link. Both are the user's to supply; neither is something I can create.
