# ADR-003 — Reader synthesis, and authored section evidence status

**Status:** Accepted, 2026-09-24
**Amends:** `src/schema/product.ts` (locked schema), `src/lib/section-status.ts`

## Context

A review of the three published teardowns, from the point of view of the intended reader (product aspirants and PMs preparing for interviews), found two classes of problem.

**Credibility.** Section labels were derived by counting verified evidence ids. That rule labelled Notion's *Users* "Well evidenced" while the prose on the same page said no user count exists anywhere; it labelled *Moats* "Well evidenced" whenever a moat existed, and *Bets* whenever two bets existed, regardless of what the evidence said. Counting ids cannot judge source–claim fit: a verified pricing page is authoritative for packaging and says nothing about population. For a site whose premise is honesty about evidence, the labels were the least honest element on the page.

**Usefulness.** The teardowns answered "what can be proven" and rarely "what should a product person take away". The verdict schema already had fields for what the company got right and wrong and what the analyst would do next, and the pattern layer already existed; neither was populated for any product. There was no short version for a reader with a minute, and nothing to practise on.

## Decision

1. **`sections[].evidence`** (optional: `rich` · `bounded` · `gap`) records the Stage 1 gate's call on each section. When present it overrides derivation. The fallback derivation is made conservative: *Users*, *JTBD*, *Product* and *Moats* can never derive `rich`; other sections need at least two citations with 75% verified.
2. **`brief`** (optional): four lines, *how it grows*, *how it makes money*, *the trade-off it made*, *what nobody outside can verify*. Synthesis of the sections below, so it carries no evidence ids of its own; each row links to the section that argues it.
3. **`interview`** (optional, up to six): a question, a 3–5 point outline of what a strong answer covers, and the section where the material lives.
4. **`verdict`** is now populated for all three products (the fields existed; this ADR records the decision to use them). `getRight` and `getWrong` points cite evidence, and the loader's XREF check now covers them.
5. **Patterns** are stored as validated JSON at `content/patterns/<slug>.json` rather than MDX frontmatter, because they carry no prose body and the build has no frontmatter parser. The product list for each pattern is still derived from `PatternRef`s in product files, never authored, and the loader throws on any reference to a pattern that does not exist.
6. **Theses** for Figma and Notion were rewritten to lead with a product insight; the evidence caveat moved to the second sentence and into `brief.unverified`.

## Consequences

- Labels now match each product's Stage 1 gate. Figma: 2 well evidenced, 6 partly, 1 gap. Stripe: 4 well, 5 partly. Notion: 2 well, 7 partly.
- The authored override is a judgment, like `shareBand` or a moat's durability. It must be copied from the gate table, not decided at publication time. A section whose gate status changes must have its `evidence` field changed in the same commit.
- `brief`, `interview` and `verdict` are pure synthesis and judgment (L5 in the methodology's claim ladder). They are rendered under "Our call" and must never introduce a claim not argued in a section.
