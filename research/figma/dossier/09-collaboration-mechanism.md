> **Evidence layer. No classification is upgraded without the formal §6.4 test being satisfied.**

# Figma — Collaboration Mechanism Evidence

| | |
|---|---|
| **Stage** | 1C — Priority 5 |
| **Session date** | 2026-08-30 |

---

## 1. What the evidence establishes

**Architecture, as of 2019** *[FIG-S001, T2, Evan Wallace, 2019-10-16]* — real-time multi-user editing over WebSocket with a central server authority; one server process per document; explicitly **not** operational transforms and **not** true CRDTs ("Figma isn't using true CRDTs… our server is the central authority"); offline editing with reapplication on reconnect; client-generated object IDs; fractional indexing.

Documented limitations, same source: simultaneous editing of the same text value does not work; concurrent reparenting can cause objects to temporarily disappear (author: "not great"); conflicting property changes resolve last-writer-wins with no merging.

**Free participation** *[FIG-S014, T2, retrieved 2026-08-30]* — the **View seat is the only free seat type**, granting "view and comment access to Figma Design, Figma Slides, and FigJam."

**Role separation** *[FIG-S014]* — Collab, Dev and Full seats grant different product access, evidencing that Figma packages collaboration around at least four distinct role archetypes.

---

## 2. The seven-way distinction

Applied strictly. "Network effect" is **not** used as a synonym for collaboration.

| # | Concept | Status | Basis |
|---|---|---|---|
| 1 | **Feature utility** | **EVIDENCED** | Multi-user editing capability documented [S001]; free view/comment documented [S014] |
| 2 | **Collaboration utility** | **EVIDENCED** *(as capability, as of 2019)* | Concurrent editing with live sync is architecturally documented [S001]. That the capability exists is established; that users derive value from it is not independently evidenced |
| 3 | **Viral distribution** | **INSUFFICIENT** | No evidence that shared artifacts reach non-users, or convert them. Figma asserts "product virality" [S007] — a company claim with no disclosed mechanism, conversion rate, or attribution |
| 4 | **Local / clustered network effect** | **INSUFFICIENT** | See §3 |
| 5 | **Cross-side network effect** | **INSUFFICIENT** | Dev and Full seats evidence designer/developer role separation [S014]. No evidence that developers joining increases value *to designers*, or vice versa. The formal test is unsatisfied |
| 6 | **Global network effect** | **INSUFFICIENT — position unchanged** | Current evidence does not support the claim. No new evidence was found in this pass that would upgrade or downgrade it. **Untested, not disproved** |
| 7 | **Switching cost** | Treated separately — see `10` | — |

---

## 3. The §6.4 test, run explicitly

| Step | Requirement | Result |
|---|---|---|
| **1** | Name the participants and sides | **PASS** — participants are identifiable: editors (Full/Dev/Collab seats) and free viewers/commenters within a customer account [S014] |
| **2** | Show the value function: an *existing* user's value increases when a *specific additional* participant joins | **FAIL — no evidence.** Nothing in any source gathered demonstrates that an existing user's value rises when a specific colleague joins. Architectural capacity for concurrent editing [S001] establishes that two people *can* work together; it does not establish that the second person's presence *increases the first person's value* |
| **3** | Identify the boundary — global, local/clustered, cross-side | **CANNOT ASSESS** — step 2 failed, so there is no effect whose boundary could be drawn |
| **4** | Rule out scale economies, data advantages, community/brand | **CANNOT ASSESS** |

**Result: the test fails at step 2 and cannot proceed.**

---

## 4. Conclusion for this evidence layer

**Evidence supports intra-organisational collaboration utility as a documented product capability.** Whether that satisfies the Atlas definition of a local/clustered network effect **remains an open synthesis classification and is not resolved here.**

The distinction is not pedantic. Collaboration utility says *two people can work in one file at once*. A local network effect says *the first person's value rises because the second person joined*. The first is architecturally documented; the second requires evidence about value accrual between specific users that no source gathered produces — and which, per `08`, would require product observation and practitioner evidence rather than documentation.

**Nothing here upgrades or downgrades the global network effect position.**
