> **Critical rule applied throughout: an observed behaviour is not evidence of the adjacent business outcome unless the causal bridge is independently supported.**

# Figma — Growth Loop Evidence

| | |
|---|---|
| **Stage** | 1C — Priority 4 |
| **Session date** | 2026-08-30 |

Canonical model, unchanged:
**Acquisition → Activation → Core Action → Output → Reinvestment → Acquisition**

---

## The principal finding of Stage 1C

Stage 1C located a **documented, practitioner-corroborated seat-conversion mechanism.** It is real, specific, and it is **not** an acquisition mechanism.

**What is evidenced:**

*[FIG-S014, T2, help.figma.com, retrieved 2026-08-30]* — The **View seat is the only free seat type**, granting "view and comment access to Figma Design, Figma Slides, and FigJam." Seat-request approval is configurable — "Manually approve seats," "Manually approve, unless seat is available," "Auto-approve seats." Where a requested seat type is unavailable, "Figma will add" that seat to the subscription; for monthly plans "Additional approved seats are added to your next invoice."

*[FIG-S015, T5, forum.figma.com, 2025-04-30]* — A user reports: "granting edit access automatically assigns a paid editor seat — and this cost gets added to our invoice immediately," characterising the absence of warning as having "dark pattern" characteristics. No Figma staff response in thread.

*[FIG-S013, T5, forum.figma.com, thread active 2021-08 → 2023-10]* — Multiple independent users report the same mechanism operating unintentionally: "it is very simple to change a user's status from `viewer` to `editor` but there's no indication that in doing so you are adding team member license in the process"; "I gave a user editor permission instead of Viewer by mistake, and I realized it only when an invoice popped up"; "A client agreed to pay $30/month for two seats just to discover a $180 bill."

**Tier 5 admissibility** *(§2.4)*: these are the only available evidence of the lived mechanism; they are contemporaneous; they are specific and falsifiable; they are capped at their stated status here; and the limitation is disclosed. Two independent threads four years apart corroborate each other.

**What this is evidence OF:** a free viewer inside an **existing paying customer account** converting into a billed seat, with low friction and configurable approval. That is **expansion within a customer**.

**What this is NOT evidence of:** acquisition of a new customer. Every account above describes an admin, an invoice, and a subscription that **already existed**. The mechanism operates *inside* the paying boundary, not across it.

Conflating these two would close the loop falsely, and it is exactly the failure the critical rule guards against.

---

## Transition-by-transition

### → ACQUISITION

| Field | Content |
|---|---|
| **Proposed mechanism** | Self-serve signup via Figma.com; direct sales; public Community surface |
| **Evidence** | Two motions disclosed [S007]. Public unauthenticated Community surface with a "Remix" CTA observed [OBS-001, OBS-002] |
| **Evidence type** | Company disclosure; direct observation |
| **Confidence** | **INSUFFICIENT** |
| **Counter-evidence** | None. The gap is silence, not contradiction |
| **Status** | **INSUFFICIENT** — motions and surfaces exist; no attribution, conversion rate, or mechanism evidence. Figma's own "product virality" claim [S007] is unaccompanied by any disclosed mechanism |

*Causal bridge test:* "A public Community surface exists" ≠ "the Community surface acquires users." Not bridged.

### ACQUISITION → ACTIVATION

| Field | Content |
|---|---|
| **Proposed mechanism** | Browser-based access removes install friction; a link opens directly |
| **Evidence** | Browser-native architecture [S001, S003]. Unauthenticated content pages load without a wall [OBS-001] |
| **Evidence type** | Documentary; direct observation of a *public* surface only |
| **Confidence** | **INSUFFICIENT** |
| **Counter-evidence** | The behaviour that matters — opening a **privately shared design file** as a non-user — was **not observable** [see `08`] |
| **Status** | **INSUFFICIENT** — no defined activation event, no evidence any threshold is crossed |

### ACTIVATION → CORE ACTION

| Field | Content |
|---|---|
| **Proposed mechanism** | Free View seat permits commenting before any payment; commenting precedes editing |
| **Evidence** | View seat grants "view and comment access" free [S014]. Public commenting observed on a Community artifact [OBS-001] |
| **Evidence type** | Documentary (T2); observation of a different surface |
| **Confidence** | **PARTIALLY EVIDENCED** |
| **Counter-evidence** | Community commenting is not file commenting; the design-file behaviour was not observed |
| **Status** | **PARTIALLY EVIDENCED** — a free participation tier demonstrably exists. That participants progress from it is not evidenced |

### CORE ACTION → OUTPUT

| Field | Content |
|---|---|
| **Proposed mechanism** | Design work produces shareable artifacts that circulate |
| **Evidence** | **None.** Product-structure inference only |
| **Evidence type** | — |
| **Confidence** | **INSUFFICIENT** |
| **Counter-evidence** | — |
| **Status** | **INSUFFICIENT** — "teams add components" ≠ "components create acquisition." Not bridged |

### OUTPUT → REINVESTMENT

| Field | Content |
|---|---|
| **Proposed mechanism** | Free viewers inside an account convert to billed seats; accounts expand |
| **Evidence** | Seat mechanism documented [S014] and practitioner-corroborated across two independent threads [S013, S015]. NDR 136–139% across three quarters; >$10K cohort +34–37%, >$100K cohort +46–48% [S007, S009, S005] |
| **Evidence type** | T2 documentation + T5 practitioner + T1 financial |
| **Confidence** | **EVIDENCED** |
| **Counter-evidence** | Practitioners describe conversions as frequently **unintended**, which complicates reading them as value-driven expansion |
| **Status** | **EVIDENCED** — the strongest link in the chain. Expansion within existing customers is documented, corroborated and visible in reported financials |

### REINVESTMENT → ACQUISITION

| Field | Content |
|---|---|
| **Proposed mechanism** | Revenue funds R&D and new products, widening the surface that attracts new customers |
| **Evidence** | R&D $1,029,700K (+37%); AI infrastructure +$49.1M; new products and integrations shipped [S007, S008] |
| **Evidence type** | T1 financial |
| **Confidence** | **INSUFFICIENT** |
| **Counter-evidence** | Spending is observed; **no feedback path to acquisition is evidenced**. $207.1M of the R&D increase is stock-based compensation |
| **Status** | **INSUFFICIENT** — "the company spends on R&D" ≠ "R&D acquires customers." Not bridged |

---

## Loop status

```
   ACQUISITION ──INSUFF──► ACTIVATION ──PARTIAL──► CORE ACTION
        ▲                                               │
        │                                          INSUFFICIENT
   INSUFFICIENT                                         │
        │                                               ▼
   REINVESTMENT ◄──────EVIDENCED───────────────────── OUTPUT
```

**GROWTH LOOP STATUS: INSUFFICIENT EVIDENCE.** The ring is left open.

One transition EVIDENCED. One PARTIALLY EVIDENCED. Four INSUFFICIENT. No non-canonical loop is substituted, retention/expansion is not reinterpreted as acquisition, and closure is not forced.

---

## Why this is a finding, not a failure

Stage 1C materially advanced the picture even though the loop did not close. What is now evidenced is a **documented expansion mechanism with unusually low friction** — free unlimited viewers, configurable auto-approval, seats added to the subscription on demand, and repeated practitioner reports of conversions happening without the payer noticing.

That mechanism plausibly explains NDR consistently above 130% [S007, S009, S005] far better than any acquisition story does. **The evidence points toward expansion economics rather than viral acquisition** — and the company's own "product virality" claim [S007] remains, after a dedicated research pass, unaccompanied by any disclosed or discoverable mechanism.

That gap between a company's growth narrative and its evidenced growth mechanism is itself a legitimate analytical finding, and it belongs in the teardown.
