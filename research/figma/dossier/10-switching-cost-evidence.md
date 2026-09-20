> **Feature existence is not switching cost. Counter-evidence is recorded alongside positive evidence.**

# Figma — Switching Cost Evidence

| | |
|---|---|
| **Stage** | 1C — Priority 6 |
| **Session date** | 2026-08-30 |

**Test applied to every mechanism:**
**A** asset/workflow exists · **B** migration requires effort · **C** users actually experience material friction · **D** economic or behavioural consequence

**A alone is never switching cost. A+B alone is not either.**

---

## Mechanism matrix

| Mechanism | A — Exists | B — Migration effort | C — Observed friction | D — Consequence | Status |
|---|---|---|---|---|---|
| **Components** | **EVIDENCED** — component/library workflow is a documented product capability [S007, S014] | **EVIDENCED** — "Figma components import as groups and need to be recreated as components" when migrating [S016] | **PARTIALLY EVIDENCED** — one hands-on practitioner account of a migration [S016] | **INSUFFICIENT** | **PARTIALLY EVIDENCED** |
| **Variables / design tokens** | **EVIDENCED** — variables exist as a product capability [S007] | **PARTIALLY EVIDENCED** — migration plugin "does not pick up color variables," requiring manual recreation [S016] | **PARTIALLY EVIDENCED** — same single account [S016] | **INSUFFICIENT** | **PARTIALLY EVIDENCED** |
| **Design systems** | **EVIDENCED** — Enterprise plan includes "automated design system management" [S007] | **PARTIALLY EVIDENCED** — "A larger and more mature design system will likely take more time and effort to migrate" [S016 context] | **INSUFFICIENT** — no account from an organisation that actually migrated a mature design system | **INSUFFICIENT** | **PARTIALLY EVIDENCED** |
| **Plugins / API** | **EVIDENCED** — extensive plugin and widget ecosystem observed publicly [OBS-002]; API documented [S007] | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** |
| **Integrations** | **EVIDENCED** — MCP, model providers, connectors to Atlassian, GitHub, Notion, Linear [S008] | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** |
| **Historical files** | **EVIDENCED** — files accumulate by construction | **INSUFFICIENT** — no evidence on bulk export fidelity | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** |
| **Team habits** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** |
| **Developer workflow** | **EVIDENCED** — Dev Mode is a documented paid seat type [S014] | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** |
| **Governance** | **EVIDENCED** — Org/Enterprise admin controls, seat-approval settings, viewer-restriction defaults [S014] | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** | **INSUFFICIENT** |

---

## Counter-evidence

Recorded because it points the other way, and because its provenance matters.

**Migration tooling exists and is characterised as low-friction.** Penpot publishes migration guidance and a Figma-to-Penpot plugin; an open-source converter/synchroniser (`figpot`) exists publicly. One account describes migration as "effortless thanks to the Figma to Penpot plugin."

**Provenance caveat — important.** Penpot is a direct competitor and has a clear interest in claiming migration is easy. Its guidance is **self-serving in the direction of low switching costs** and must not be read as neutral. The single genuinely third-party account [S016, freeCodeCamp, Fatuma Abdullahi, 2025-03-26] is more useful precisely because it reports specific failures — colour variables not transferring, components importing as groups — rather than a clean result.

**Independent reporting suggests active switching consideration.** Secondary comparison articles (2026) describe teams evaluating departure over seat pricing, AI credit metering from 2026-03-18, and performance on large files. **These are low-tier, commercially motivated sources and are recorded as leads, not evidence.** They were not opened individually and none is cited as establishing anything.

---

## Assessment

**Overall status: PARTIALLY EVIDENCED, and weaker than intuition suggests.**

Two mechanisms — components and variables — reach PARTIALLY EVIDENCED on the strength of a **single hands-on practitioner account**. Seven of nine mechanisms are INSUFFICIENT beyond mere existence.

The decisive weakness is **component D across the board**. Not one source establishes an economic or behavioural consequence: no evidence that a team abandoned a migration, that friction changed a purchasing decision, or that switching cost affected renewal. NDR of 136–139% [S007] is consequence-shaped but, as established in `06`, discriminates between switching costs, collaboration utility, network effects and simple product satisfaction equally.

**A design-system and accumulated-asset switching-cost hypothesis remains plausible and materially under-evidenced.** It may not be claimed as a defensibility mechanism on this basis. Closing it requires organisation-level migration accounts — specifically from teams that attempted to leave — which one freeCodeCamp article by a "long-term casual user" does not supply.
