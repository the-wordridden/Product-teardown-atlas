/**
 * Editorial quality warnings.
 *
 * These NEVER fail the build. Section 4.16 of the methodology draws the line: errors are
 * things that are broken, warnings are things that are thin. An empty moat array is a
 * legitimate analytical result, not a defect.
 *
 * This module exists because ADR-002 removed the editorial minimums from `strategy.ts`.
 * Those minimums did not enforce rigor — they compelled invention, since a validator that
 * fails until two moats exist is eventually satisfied by two invented moats. A warning
 * cannot be satisfied by fabrication, because it is addressed to the author rather than
 * to the build.
 */

import { PROFILE_AXIS_IDS } from '../schema/enums'
import type { ProfileFileT } from '../schema/profile'
import type { StrategyFileT } from '../schema/strategy'

export interface QualityWarning {
  code: string
  productSlug: string
  message: string
}

/** WARN009 / WARN010 — thin strategic coverage. */
export function strategyWarnings(productSlug: string, strategy: StrategyFileT): QualityWarning[] {
  const warnings: QualityWarning[] = []

  if (strategy.moats.length === 0) {
    warnings.push({
      code: 'WARN009',
      productSlug,
      message: `No moat documented for "${productSlug}". If this reflects the evidence, the teardown should state that no defensibility mechanism was established rather than leaving the section silent.`,
    })
  } else if (strategy.moats.length === 1) {
    warnings.push({
      code: 'WARN009',
      productSlug,
      message: `Only one moat documented for "${productSlug}". Consider whether a second mechanism was overlooked, or whether the single moat is genuinely the whole picture.`,
    })
  }

  if (strategy.bets.length === 0) {
    warnings.push({
      code: 'WARN010',
      productSlug,
      message: `No strategic bet documented for "${productSlug}". A product with no identifiable strategic choice is unusual; check whether the chains were abandoned for want of intent evidence.`,
    })
  } else if (strategy.bets.length === 1) {
    warnings.push({
      code: 'WARN010',
      productSlug,
      message: `Only one strategic bet documented for "${productSlug}". Candidate bets whose five-link chain could not be completed should be recorded as open questions rather than silently dropped.`,
    })
  }

  const unresolved = strategy.bets.filter((bet) => bet.status === 'unresolved').length
  if (strategy.bets.length >= 3 && unresolved === 0 && strategy.bets.every((b) => b.status === 'paid-off')) {
    warnings.push({
      code: 'WARN006',
      productSlug,
      message: `Every documented bet for "${productSlug}" is marked "paid-off". A uniformly triumphant bet list reads as hagiography rather than analysis.`,
    })
  }

  return warnings
}

/** WARN012 / WARN013 — thin or pending body sections (ADR-002 extension). */
export function productWarnings(
  productSlug: string,
  product: {
    users: { segments: unknown[] }
    jtbd: { jobs: unknown[] }
    product: { coreObjects: unknown[]; keySurfaces: unknown[] }
    verdict?: unknown
    status: string
  },
): QualityWarning[] {
  const warnings: QualityWarning[] = []

  const thin: string[] = []
  if (product.users.segments.length === 0) thin.push('users.segments')
  if (product.jtbd.jobs.length === 0) thin.push('jtbd.jobs')
  if (product.product.coreObjects.length === 0) thin.push('product.coreObjects')
  if (product.product.keySurfaces.length === 0) thin.push('product.keySurfaces')

  if (thin.length > 0) {
    warnings.push({
      code: 'WARN012',
      productSlug,
      message: `Unevidenced sections for "${productSlug}": ${thin.join(', ')}. Valid as evidence gaps — the teardown must present each as an explicit gap, never as an omission the reader is left to notice.`,
    })
  }

  if (product.verdict === undefined) {
    warnings.push({
      code: 'WARN013',
      productSlug,
      message: `No verdict authored for "${productSlug}". The verdict is human judgment and cannot be generated; the product must not move to "published" without one.`,
    })
  }

  return warnings
}

/** WARN011 — evidence ceilings recorded on the Strategic Profile. */
export function profileWarnings(productSlug: string, profile: ProfileFileT): QualityWarning[] {
  /* Iterate the axis enum, not Object.entries — the file type also carries `$schema`. */
  const unestablished = PROFILE_AXIS_IDS.filter(
    (axisId) => profile[axisId].classification === 'unestablished',
  )

  if (unestablished.length === 0) return []

  return [
    {
      code: 'WARN011',
      productSlug,
      message: `${unestablished.length} of 6 Strategic Profile axes are unestablished for "${productSlug}": ${unestablished.join(', ')}. This is a valid record of an evidence ceiling; confirm the rationale explains why, and that the renderer surfaces it rather than hiding the axis.`,
    },
  ]
}
