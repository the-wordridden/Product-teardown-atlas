/**
 * Derives a presentation-level evidence status per section from the structured data.
 * Pure function, no new claims. A section is:
 *   rich      - populated and backed by at least one verified source
 *   bounded   - populated, but resting on reported/estimated sources only
 *   gap       - structurally empty
 *   judgment  - the verdict, by definition
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

function anyVerified(ids: readonly string[], evidence: Map<string, EvidenceEntryT>): boolean {
  return ids.some((id) => evidence.get(id)?.confidence === 'verified')
}

/** Every item in a collection must itself carry a verified source to count as rich. */
function allItemsVerified(items: ReadonlyArray<{ evidenceIds: readonly string[] }>, evidence: Map<string, EvidenceEntryT>): boolean {
  return items.length > 0 && items.every((item) => anyVerified(item.evidenceIds, evidence))
}

export function deriveSectionStatuses(
  product: ProductFileT,
  profile: ProfileFileT,
  strategy: StrategyFileT,
  loopStatus: LoopEvidenceStatusT,
  evidence: Map<string, EvidenceEntryT>,
): Record<SectionIdT, SectionEvidence> {
  const productIds = [...(product.product.ahaMoment?.evidenceIds ?? [])]

  return {
    vitals: 'rich',
    problem: anyVerified(product.problem.evidenceIds, evidence) ? 'bounded' : 'bounded',
    users: product.users.segments.length === 0 ? 'gap' : allItemsVerified(product.users.segments, evidence) ? 'rich' : 'bounded',
    jtbd: product.jtbd.jobs.length === 0 ? 'gap' : allItemsVerified(product.jtbd.jobs, evidence) ? 'rich' : 'bounded',
    product: product.product.coreObjects.length === 0 ? 'gap' : product.product.timeToValue === 'unestablished' || !anyVerified(productIds, evidence) ? 'bounded' : 'rich',
    'business-model': 'rich',
    'growth-loops': loopStatus === 'fully-evidenced' ? 'rich' : 'bounded',
    moats: strategy.moats.length === 0 ? 'gap' : 'rich',
    bets: strategy.bets.length >= 2 ? 'rich' : 'bounded',
    verdict: 'judgment',
  }
}
