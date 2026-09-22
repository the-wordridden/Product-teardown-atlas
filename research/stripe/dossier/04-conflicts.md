# Stripe — Conflicts and Definition Drift

Per §5 and §9 of the methodology. Each entry records the conflict, the reconciliation steps applied, and the resolution or the decision to preserve the conflict.

---

## C1 — "Total payment volume" (2024) vs "total volume" (2025)

**Sources.** S002 (annual letter 2024, 2025-02-27): "Businesses on Stripe generated $1.4 trillion in total payment volume in 2024, up 38% from the prior year." S001 and S005 (annual letter 2025 and release, 2026-02-24): "businesses running on Stripe generated $1.9 trillion in total volume, up 34% from 2024".

**Step 1 — same metric?** Unknown. The 2025 wording drops "payment". The 2025 letter separately describes Financial Accounts, stablecoin flows through Bridge ("volume more than quadruple"), and payouts, any of which could be inside "total volume" and outside "payment volume".

**Step 2 — same period basis?** Both calendar years. Yes.

**Step 3 — arithmetic check.** $1.4T × 1.34 = $1.876T ≈ $1.9T. The stated growth rate is consistent with the two headline figures on either definition, so the arithmetic cannot distinguish them.

**Step 4 — external corroboration.** None opened. S016 (T5) repeats "$1.9 trillion in total payment volume", but that is the blog's wording, not Stripe's.

**Resolution.** **Preserved as a conflict.** Publish the 2024 figure as "total payment volume" and the 2025 figure as "total volume", each with Stripe's own wording, and state that the basis may differ. Do not present a two-point series as like-for-like without the caveat. Open question 5.

---

## C2 — Link users: "more than 200 million" (Feb 2026) vs "over 250 million" (Apr 2026)

**Sources.** S001 (2026-02-24): "Link … is now used by more than 200 million people." S013 (2026-04-29): "Link is a consumer wallet with over 250 million users globally."

**Assessment.** Not a conflict on its face: 25% growth in nine weeks is implausible for an organic consumer wallet, so either the February figure was conservative, the April figure counts something broader (e.g. saved-payment-method profiles rather than active people), or the basis changed. Both are self-reported.

**Resolution.** Record both with dates. Cite the lower, earlier figure where one number is needed; note the April figure and the gap. Neither is `verified`.

---

## C3 — Profit for the year 2023 vs 2024, Stripe Payments UK Ltd

**Source.** S015. Profit for the year £41.6M (2023) vs £16.1M (2024) looks like a 61% fall.

**Assessment.** Profit before tax was £24.3M (2023) vs £20.1M (2024). 2023 carried a **tax credit** of £17.3M (deferred tax recognition), 2024 a tax charge of £3.9M. The operating line moved from £20.0M to £16.1M.

**Resolution.** Not a conflict; a presentation trap. If the entity's profitability is cited at all, cite operating profit, and never cite the entity's margin as Stripe's margin (transfer pricing; note 4 and note 7).
