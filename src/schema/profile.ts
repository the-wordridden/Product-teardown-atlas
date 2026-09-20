/**
 * The Strategic Profile: six named classification axes, no numeric scoring.
 *
 * The axes are modelled as six *required named keys* rather than an array of six
 * objects. That is deliberate — an object shape makes "exactly one entry per axis,
 * drawn from that axis's own stops" a compile-time and parse-time guarantee, whereas
 * an array would need runtime refinements to achieve the same thing less reliably.
 *
 * File: content/products/<slug>/profile.json
 */

import { z } from 'zod'
import {
  BuyerUserAlignment,
  DistributionMotion,
  EvidenceIdList,
  ExpansionMechanism,
  MoatSource,
  TimeToValueBand,
  TwoSentences,
  Unestablished,
  ValueMetric,
} from './enums'

/**
 * Builds one axis. The `rationale` is mandatory by design: an unjustified
 * classification is exactly the false precision the numeric scorecard was rejected for.
 * That obligation applies with equal force to `unestablished` — recording an evidence
 * ceiling without saying why would be as empty as recording a score without saying why.
 */
function axis<T extends z.ZodTypeAny>(classification: T) {
  return z
    .object({
      classification: z.union([classification, Unestablished]),
      rationale: TwoSentences,
      evidenceIds: EvidenceIdList,
    })
    .strict()
}

export const ProfileFile = z
  .object({
    $schema: z.string().optional(),

    /** Bottom-up through end users, through developers, hybrid, sales-led, or top-down. */
    distributionMotion: axis(DistributionMotion),

    /** What the customer actually pays for as usage grows. */
    valueMetric: axis(ValueMetric),

    /** The dominant source of defensibility. Ranked detail lives in strategy.json. */
    moatSource: axis(MoatSource),

    /** How long from first contact to a user experiencing real value. */
    timeToValue: axis(TimeToValueBand),

    /** Whether the person who pays is the person who uses. */
    buyerUserAlignment: axis(BuyerUserAlignment),

    /** The primary mechanism by which revenue per account grows over time. */
    expansionMechanism: axis(ExpansionMechanism),
  })
  .strict()

export type ProfileFileT = z.infer<typeof ProfileFile>
