/**
 * The authored verdict — section 10.
 *
 * Everything in this module is, by definition, a claim of type JUDGMENT. There is no
 * numeric scorecard and no radar: those were rejected because a score like
 * "defensibility 8/10" is unfalsifiable, while every other claim in the Atlas can be
 * argued with. The Strategic Profile carries the comparable classification; this
 * section carries the opinion, on the record, with the author's name attached.
 */

import { z } from 'zod'
import { EvidenceIdList, Label, Line, Slug, TwoSentences } from './enums'
import { PatternRefList } from './loop'

const JudgmentPoint = z
  .object({
    id: Slug,
    claim: Label,
    argument: TwoSentences,
    evidenceIds: EvidenceIdList,
  })
  .strict()

const ProposedMove = z
  .object({
    id: Slug,
    move: Label,
    rationale: TwoSentences,
    /** What could go wrong if they did it. A recommendation without a risk is a wish. */
    risk: TwoSentences,
  })
  .strict()

export const VerdictSection = z
  .object({
    /** The single sentence you would defend in an interview. */
    thesis: TwoSentences,

    getRight: z.array(JudgmentPoint).min(2, 'Name at least two things this product gets right.').max(5),

    getWrong: z
      .array(JudgmentPoint)
      .min(2, 'Name at least two things this product gets wrong. A verdict with no criticism is a review, not an analysis.')
      .max(5),

    whatIdDoNext: z.array(ProposedMove).min(2).max(4),

    /** What you could not determine, and what would change your reading. */
    openQuestions: z.array(Line).min(1).max(5),

    patterns: PatternRefList,
  })
  .strict()

export type VerdictSectionT = z.infer<typeof VerdictSection>
