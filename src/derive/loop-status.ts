/**
 * Derived loop-level evidence status.
 *
 * The loop status is NEVER authored. It is a pure function of the transition-level
 * `evidenceStatus` values, computed once at build time and shipped as a derived
 * artifact. Making it authorable would let a teardown assert a stronger conclusion
 * than its own transitions support — the exact defect this module exists to prevent.
 */

import type { LoopEvidenceStatusT, TransitionEvidenceStatusT } from '../schema/enums'
import type { LoopEdgeT, LoopT } from '../schema/loop'

/**
 * Precedence, highest first. Exactly one rule fires, so the result is deterministic
 * for every possible combination of transition statuses.
 *
 *   1. contested            → any transition where credible evidence points both ways
 *   2. evidence-bounded     → any transition with no supporting evidence at all
 *   3. partially-evidenced  → no gaps or conflicts, but not everything is established
 *   4. fully-evidenced      → every transition established
 *
 * Why contested outranks evidence-bounded: a contested transition means the evidence
 * actively disagrees with itself, which is a stronger and more urgent analytical signal
 * than an absence, and it demands resolution rather than disclosure. A loop that is
 * both contested and evidence-bounded is reported as contested, because the conflict is
 * the finding that changes what an author must do next.
 */
const PRECEDENCE: ReadonlyArray<{
  status: LoopEvidenceStatusT
  test: (statuses: readonly TransitionEvidenceStatusT[]) => boolean
}> = [
  { status: 'contested', test: (s) => s.includes('contested') },
  { status: 'evidence-bounded', test: (s) => s.includes('insufficient') },
  { status: 'partially-evidenced', test: (s) => s.includes('partially-evidenced') },
  { status: 'fully-evidenced', test: (s) => s.every((status) => status === 'evidenced') },
]

/** Derives the loop-level status from its transition statuses. */
export function deriveLoopStatus(edges: readonly Pick<LoopEdgeT, 'evidenceStatus'>[]): LoopEvidenceStatusT {
  if (edges.length === 0) {
    throw new Error('deriveLoopStatus: a loop must have at least one transition.')
  }

  const statuses = edges.map((edge) => edge.evidenceStatus)

  for (const rule of PRECEDENCE) {
    if (rule.test(statuses)) return rule.status
  }

  /* Unreachable: the four transition statuses are exhaustively covered above. */
  throw new Error(
    `deriveLoopStatus: no precedence rule matched for statuses [${statuses.join(', ')}]. This indicates the transition vocabulary changed without updating PRECEDENCE.`,
  )
}

export interface LoopStatusSummary {
  loopId: string
  status: LoopEvidenceStatusT
  /** Count of transitions at each status, for the report and the renderer legend. */
  counts: Record<TransitionEvidenceStatusT, number>
  /** Transitions that prevent the loop from being fully evidenced, as "from -> to". */
  unresolvedTransitions: string[]
}

/** Builds the full derived summary for one loop. */
export function summariseLoopStatus(loop: LoopT): LoopStatusSummary {
  const counts: Record<TransitionEvidenceStatusT, number> = {
    evidenced: 0,
    'partially-evidenced': 0,
    contested: 0,
    insufficient: 0,
  }

  for (const edge of loop.edges) counts[edge.evidenceStatus] += 1

  return {
    loopId: loop.id,
    status: deriveLoopStatus(loop.edges),
    counts,
    unresolvedTransitions: loop.edges
      .filter((edge) => edge.evidenceStatus !== 'evidenced')
      .map((edge) => `${edge.from} -> ${edge.to}`),
  }
}

/**
 * Build warnings. These never fail the build — an evidence-bounded loop is a legitimate
 * analytical result, not a content defect (methodology §4.16: errors are things that are
 * broken, warnings are things that are thin).
 */
export function loopStatusWarnings(summary: LoopStatusSummary): string[] {
  const warnings: string[] = []

  if (summary.status === 'evidence-bounded') {
    warnings.push(
      `WARN007: loop "${summary.loopId}" is evidence-bounded — ${summary.counts.insufficient} transition(s) have no supporting evidence: ${summary.unresolvedTransitions.join('; ')}. The renderer must show the ring as open.`,
    )
  }

  if (summary.status === 'contested') {
    warnings.push(
      `WARN008: loop "${summary.loopId}" has ${summary.counts.contested} contested transition(s). Resolve or disclose the conflict per methodology §5.`,
    )
  }

  return warnings
}
