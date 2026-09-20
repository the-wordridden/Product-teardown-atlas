> **Terminal gate for Stage 1C. Determines what can and cannot be responsibly claimed. Not the teardown.**

# Figma — Stage 1C Gate

| | |
|---|---|
| **Stage** | 1C — terminal synthesis gate |
| **Research cutoff** | 2026-08-31 |
| **Session date** | 2026-08-30 |
| **Sources verified to date** | 16 |
| **New this pass** | 5 (FIG-S012 – FIG-S016), including 2 direct observations |

---

## Gate table

| # | Analytical question | Evidence strength | Status | Strongest supported statement | Remaining gap |
|---|---|---|---|---|---|
| **1** | **Core problem** | PARTIALLY EVIDENCED | **TARGETED GAP REMAINS** | Figma states its founding problem was that designers lacked the collaborative workflows engineers had, and that WebGL made browser-based creative tools viable [S003] | No independent pre-2015 evidence. Entirely company narrative |
| **2** | **Primary user** | PARTIALLY EVIDENCED | **TARGETED GAP REMAINS** | Figma packages access into View (free), Collab, Dev and Full seats, evidencing at least four role archetypes [S014] | No segment composition, seat mix, or role ratio |
| **3** | **Primary JTBD** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | — | All five components unevidenced for every candidate (`07`) |
| **4** | **Activation** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | — | No defined activation event in any source |
| **5** | **Core action** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | Full seats grant access to Figma Design and eight further products [S014] | Atomic unit of value unevidenced; product not observed |
| **6** | **Output** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | — | No evidence work product circulates to non-users |
| **7** | **Reinvestment** | EVIDENCED | **READY FOR SYNTHESIS** | Free viewers inside an existing paying account convert into billed seats via a documented, low-friction, configurably auto-approved path [S014], corroborated by practitioners across two independent threads four years apart [S013, S015]. NDR 136–139% [S007, S009, S005] | Conversion rate unquantified |
| **8** | **Growth-loop closure** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | Two distribution motions are disclosed; one of five transitions is evidenced; the ring does not close (`11`) | Acquisition, activation, output transitions all unevidenced |
| **9** | **Collaboration mechanism** | EVIDENCED *(as capability, 2019)* | **READY FOR SYNTHESIS** | As of 2019 Figma implemented real-time multi-user editing over WebSocket with central server authority — explicitly not OT, not true CRDTs — with documented limits including no simultaneous same-text editing [S001]. The View seat is free [S014] | Currency of the architecture; user-side value |
| **10** | **Local network effect** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | Intra-organisational collaboration utility is documented as a capability | §6.4 fails at step 2. Whether this satisfies the formal definition is a synthesis classification, unresolved (`09`) |
| **11** | **Global network effect** | INSUFFICIENT | **INSUFFICIENT EVIDENCE** | Current evidence does not support the claim | **Position unchanged. Untested, not disproved** |
| **12** | **Switching costs** | PARTIALLY EVIDENCED | **TARGETED GAP REMAINS** | Migrating components requires recreating them; colour variables do not transfer via available tooling [S016] | **Component D unevidenced for all nine mechanisms.** No economic or behavioural consequence established (`10`) |
| **13** | **Technical differentiation** | EVIDENCED *(as capability)* | **READY FOR SYNTHESIS** | Figma built browser-based rendering on WebGL from 2015 and a custom centralised sync system by 2019 [S003, S001] | Moat status unresolved; architecture 7 years stale |
| **14** | **Ecosystem defensibility** | EVIDENCED *(as capability)* | **TARGETED GAP REMAINS** | Figma operates a large public plugin/template/Skills catalogue [OBS-002] and integrations spanning MCP, multiple model providers and four named tools [S008] | MCP is an open protocol equally available to competitors. Defensibility unresolved |
| **15** | **Strategic bets** | EVIDENCED *(sequencing, AI trade-off)* / INSUFFICIENT *(intent)* | **TARGETED GAP REMAINS** | Browser-native rendering (2015) and multiplayer (announced for 2016) were separable sequential decisions [S003]. AI investment carries an explicitly disclosed margin trade-off [S007] | Intent, expected advantage and trade-off unknown for the browser, multiplayer, IPO and dual-class decisions |

---

## Summary

| Status | Count | Items |
|---|---|---|
| **READY FOR SYNTHESIS** | 3 | Reinvestment (7), Collaboration mechanism (9), Technical differentiation (13) |
| **TARGETED GAP REMAINS** | 5 | Core problem (1), Primary user (2), Switching costs (12), Ecosystem (14), Strategic bets (15) |
| **INSUFFICIENT EVIDENCE** | 7 | JTBD (3), Activation (4), Core action (5), Output (6), Loop closure (8), Local NE (10), Global NE (11) |

---

## What Stage 1C actually achieved

**One question moved decisively.** The seat-conversion mechanism went from unevidenced to **EVIDENCED** — documented by Figma [S014] and corroborated by independent practitioner accounts across two threads spanning 2021–2025 [S013, S015]. Free unlimited viewers, configurable auto-approval, seats added to the subscription on request, and repeated reports of the payer discovering the charge afterwards.

**And it resolved a question differently than expected.** That mechanism operates **inside** an existing paying account. Every practitioner account describes an admin, an invoice, and a subscription that already existed. It is an **expansion** mechanism, not an acquisition one — which is why the loop still does not close, and why the honest reading of NDR at 136–139% now leans toward expansion economics rather than viral acquisition.

**The gap between Figma's growth narrative and its evidenced growth mechanism survived a dedicated research pass.** The 10-K asserts "product virality inherent to Figma's collaborative and browser-based platform" [S007]. Stage 1C searched specifically for that mechanism and found none — no attribution, no conversion path from non-user to customer, no case evidence. That is now a well-tested negative result rather than an untested gap, and it is a legitimate finding for the teardown.

**Three sections did not advance at all:** JTBD, activation and output. All three require evidence about *users*, and every strong source in this dossier is about the *company*.

---

## Final audit

Verified before stopping:

- ✅ **Every source marked verified was actually opened.** FIG-S012–S016 were each retrieved and read. The seat-mechanism claim initially appeared in a search summary; it was **not** recorded until `help.figma.com` was fetched directly — and doing so revealed the documentation does *not* state that granting edit access bills immediately, which is a practitioner claim, correctly attributed as such.
- ✅ **No source elevated because a model described it.** Secondary "Figma alternatives" articles surfaced in search were not opened and are cited as leads only, establishing nothing.
- ✅ **No product observation is a secondary-source claim.** Two observations recorded (OBS-001, OBS-002), both on public unauthenticated surfaces. Nine of ten requested observations recorded as **BLOCKED** rather than substituted (`08`).
- ✅ **No causal claim rests on chronology.** The browser/multiplayer sequencing is recorded as sequencing only; no causal link to market position is asserted.
- ✅ **No network-effect claim rests on collaboration.** §6.4 run explicitly and recorded as failing at step 2 (`09`).
- ✅ **No switching-cost claim rests on feature existence.** A/B/C/D applied to nine mechanisms; component D fails for all nine (`10`).
- ✅ **No growth-loop transition closed without causal evidence.** Four of six left INSUFFICIENT; the causal bridge test applied and shown at each (`11`).
- ✅ **No unsupported conclusion added to make the teardown compelling.** Seven of fifteen gate items are INSUFFICIENT, and JTBD, activation and output are recorded as advancing not at all.

---

## Recommendation

**Do not proceed to synthesis for the full teardown.** Three of fifteen questions are ready; seven are insufficient, including both flagship analytical structures.

Two paths, and the choice is the user's:

**(a) One more targeted pass** on the two questions that would change the most: user-side evidence for JTBD, and organisation-level migration accounts for switching-cost component D. Both need a source class — practitioner interviews, review corpora, migration retrospectives — that this pass searched for and did not find in usable form. A third attempt may not succeed.

**(b) Author what is evidenced and publish the gaps as findings.** The Atlas methodology explicitly permits a section to conclude INSUFFICIENT EVIDENCE, and doing so visibly would be more credible than a complete-looking teardown resting on packaging inference.

Given the portfolio's purpose, **(b) is the stronger option** — a teardown that names what it could not establish, and shows a company asserting virality that its own disclosures do not evidence, demonstrates more analytical judgment than a tidy one that quietly invents the missing half.

---

# STAGE 1 CLOSE

**STAGE 1 — RESEARCH & EVIDENCE CONSOLIDATION: COMPLETE** *(2026-08-30)*

No further research is required unless a specific claim is challenged during synthesis.

## Language corrections — verification record

Five corrections were directed at `15-synthesis-readiness.md`. **That file does not exist; the dossier ends at `13`.** Each was checked against the files that do exist:

| # | Correction | Finding |
|---|---|---|
| 1 | NDR / seat expansion overstatement | **Statement does not exist.** `11` already reads: an evidenced mechanism by which existing accounts expand paid seats, explicitly *not* acquisition, with conversion rate unquantified. Required wording already satisfied |
| 2 | "propelled by extreme product utility" | **Statement does not exist.** No causal attribution of initial growth appears anywhere in the dossier |
| 3 | Network effect as "misclassification" / "anti-pattern" / "disproved" | **No such language exists.** All five files state "INSUFFICIENT" and "untested, not disproved." Insufficient evidence has not been converted into disproof anywhere |
| 4 | Evidence-Bounded Growth Loop | **New product decision — adopted below** |
| 5 | Mark Stage 1 complete | **Applied above** |

## Adopted product decision — the Evidence-Bounded Growth Loop

This changes the V1 concept of the Atlas's flagship interactive and **must carry into the Section 3 specification** when it is written.

**Concept:** the Growth Loop Engine answers *"Can the growth loop actually be evidenced?"* — not *"Here is Figma's growth loop."*

**Requirements:**

1. Each of the five canonical transitions renders its evidence status visually and distinctly: **EVIDENCED · PARTIALLY EVIDENCED · INSUFFICIENT**.
2. Where the canonical ring cannot be closed, **the break is shown**, not smoothed over. The gap is the content.
3. The interface must never imply a verified closed loop for a product whose loop is not evidenced.
4. Status derives from the evidence layer, not from authorial preference.

**Why this is a feature rather than a fallback.** Every other product teardown on the internet draws a closed loop, because a closed loop looks authoritative. An interactive that shows a company's growth loop failing to close under evidentiary scrutiny — while that company's own 10-K asserts "product virality" — is a stronger demonstration of analytical judgment than any complete diagram could be. It is also the only version of this component that the Figma evidence honestly supports.

**Schema implication (for later, not now):** the loop schema's ring-closure invariant currently *requires* five canonical transitions to exist. An evidence-bounded rendering requires each edge to carry an evidence-status field, and requires the validator to permit a documented open ring. **This is a genuine conflict with the locked schema and must be resolved in Stage 2, not silently.**
