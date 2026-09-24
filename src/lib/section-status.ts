/**
 * Presentation-level evidence status per section.
 *
 *   rich      - the section's central claims rest on verified sources
 *   bounded   - populated, but the central claims rest partly on reported or estimated
 *               sources, or on sources that are authoritative for something else
 *   gap       - structurally empty
 *   judgment  - the verdict, by definition
 *
 * The authored call from the Stage 1 gate wins (ADR-003). The fallback below is
 * deliberately conservative: it can say "bounded" on thin grounds but needs a strong
 * majority of verified citations to say "rich", and some sections can never derive
 * "rich" at all, because counting ids cannot tell whether a source fits a claim.
 * The previous derivation labelled a section "well evidenced" whenever a moat existed,
 * or whenever two bets existed, which contradicted the prose on the same page.
 */

import type { EvidenceEntryT } from '../schema/evidence'
import type { LoopEvidenceStatusT, SectionIdT } from '../schema/enums'
import type { ProductFileT } from '../schema/product'
import type { ProfileFileT } from '../schema/profile'
import type { StrategyFileT } from '../schema/strategy'

export type SectionEvidence = 'rich' | 'bounded' | 'gap' | 'judgment'

export const SECTION_EVIDENCE_LABEL: Record<SectionEvidence, string> = {
  rich: 'Well evidenced',
  bounded: 'Partly evidenced',
  gap: 'Not yet evidenced',
  judgment: 'Analyst judgment',
}

/** Share of the cited ids that are verified. Unknown ids count against. */
function verifiedShare(ids: readonly string[], evidence: Map<string, EvidenceEntryT>): number {
  const unique = [...new Set(ids)]
  if (unique.length === 0) return 0
  return unique.filter((id) => evidence.get(id)?.confidence === 'verified').length / unique.length
}

/** Rich only on a clear majority of verified citations, and at least two of them. */
function byShare(ids: readonly string[], evidence: Map<string, EvidenceEntryT>): SectionEvidence {
  const unique = new Set(ids)
  if (unique.size === 0) return 'gap'
  return unique.size >= 2 && verifiedShare(ids, evidence) >= 0.75 ? 'rich' : 'bounded'
}

export function deriveSectionStatuses(
  product: ProductFileT,
  _profile: ProfileFileT,
  strategy: StrategyFileT,
  loopStatus: LoopEvidenceStatusT,
  evidence: Map<string, EvidenceEntryT>,
): Record<SectionIdT, SectionEvidence> {
  const derived: Record<SectionIdT, SectionEvidence> = {
    vitals: byShare(product.vitals.keyMetricIds, evidence),
    problem: byShare(product.problem.evidenceIds, evidence),
    // Who the users are is never settled by counting citations: pricing pages and
    // product observation are authoritative for packaging, not for population.
    users: product.users.segments.length === 0 ? 'gap' : 'bounded',
    jtbd: product.jtbd.jobs.length === 0 ? 'gap' : 'bounded',
    product: product.product.coreObjects.length === 0 ? 'gap' : 'bounded',
    'business-model': byShare(product.businessModel.evidenceIds, evidence),
    'growth-loops': loopStatus === 'fully-evidenced' ? 'rich' : 'bounded',
    // A moat's existence is not evidence of its strength.
    moats: strategy.moats.length === 0 ? 'gap' : 'bounded',
    bets: strategy.bets.length === 0 ? 'gap' : byShare(strategy.bets.flatMap((b) => b.evidenceIds), evidence),
    verdict: 'judgment',
  }

  for (const entry of product.sections) {
    if (entry.evidence && entry.id !== 'verdict') derived[entry.id] = entry.evidence
  }
  return derived
}
