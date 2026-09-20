/**
 * Strategic Bets and Tensions, the Moat stack, and Product Inflections.
 *
 * This module holds the three structures that carry the most senior-sounding analysis
 * in a teardown, and each one is designed to force a falsifiable commitment:
 *
 *   - A bet must state what it cost, not only what it won.
 *   - A moat must commit to a durability verdict.
 *   - An inflection must say why it mattered, and there can be at most seven.
 *
 * File: content/products/<slug>/strategy.json
 */

import { z } from 'zod'
import {
  BetStatus,
  EvidenceIdList,
  findDuplicates,
  InflectionShiftType,
  Label,
  MAX_INFLECTIONS,
  MoatDurability,
  MoatType,
  SectionIdList,
  Slug,
  TwoSentences,
  Year,
} from './enums'
import { PatternRefList } from './loop'

/* -------------------------------------------------------------------------- */
/* Strategic bets                                                              */
/* -------------------------------------------------------------------------- */

/**
 * The five-link chain. All five links are required: a bet without a stated trade-off
 * is marketing, and a bet without a current tension has not been thought through to
 * the present day.
 */
export const StrategicBet = z
  .object({
    id: Slug,
    title: Label,

    /** The decision itself. What they chose to do, and implicitly not do. */
    bet: TwoSentences,

    /** What they expected to gain by choosing it. */
    expectedAdvantage: TwoSentences,

    /** What it cost them. Required — every real bet buys something with something. */
    tradeoff: TwoSentences,

    /** What actually happened. Collapsed by default in the UI. */
    result: TwoSentences,

    /** The live tension this bet creates today. Collapsed by default in the UI. */
    currentTension: TwoSentences,

    status: BetStatus,

    /** Sections this bet materially affects, for cross-navigation. */
    affectsSections: SectionIdList,

    patterns: PatternRefList,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export type StrategicBetT = z.infer<typeof StrategicBet>

/* -------------------------------------------------------------------------- */
/* Moats                                                                       */
/* -------------------------------------------------------------------------- */

export const Moat = z
  .object({
    id: Slug,
    type: MoatType,

    /** Rank within the moat stack, 1 being the strongest. Must be contiguous from 1. */
    rank: z.number().int().min(1).max(10),

    /** The defensibility claim, stated plainly. */
    claim: TwoSentences,

    /** Why it holds. The argument, not a restatement of the claim. */
    argument: TwoSentences,

    /** The falsifiable commitment. This is the field that makes the section useful. */
    durability: MoatDurability,

    /** What a well-funded competitor would actually have to do to erode it. */
    attackVector: TwoSentences,

    patterns: PatternRefList,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export type MoatT = z.infer<typeof Moat>

/* -------------------------------------------------------------------------- */
/* Inflections                                                                 */
/* -------------------------------------------------------------------------- */

export const Inflection = z
  .object({
    id: Slug,
    year: Year,
    label: Label,

    /** What happened. */
    what: TwoSentences,

    /** Why it changed the trajectory. Not a news summary — a strategic reading. */
    whyItMattered: TwoSentences,

    shiftType: InflectionShiftType,
    affectsSections: SectionIdList,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export type InflectionT = z.infer<typeof Inflection>

/* -------------------------------------------------------------------------- */
/* File                                                                        */
/* -------------------------------------------------------------------------- */

export const StrategyFile = z
  .object({
    $schema: z.string().optional(),

    /**
     * No minimum. An editorial floor here does not enforce rigor — it compels
     * invention, because a validator that fails until two bets exist will eventually be
     * satisfied by two invented ones. Thin coverage is reported by the quality layer
     * (WARN009/WARN010), which cannot be satisfied by fabrication.
     */
    bets: z.array(StrategicBet).max(8),

    /**
     * No minimum, for the same reason. An empty moat array is a legitimate and
     * meaningful analytical result: it records that no defensibility mechanism was
     * established, which is a finding rather than a missing field.
     */
    moats: z.array(Moat).max(8),

    inflections: z
      .array(Inflection)
      .min(3, 'At least three inflections are needed for the spine to convey an arc.')
      .max(
        MAX_INFLECTIONS,
        `At most ${MAX_INFLECTIONS} inflections. The cap is deliberate: beyond this the spine becomes a timeline product, which is out of scope.`,
      ),
  })
  .strict()
  .superRefine((file, ctx) => {
    /* --- Unique ids across each collection ----------------------------------- */
    const duplicateBets = findDuplicates(file.bets, (bet) => bet.id)
    if (duplicateBets.length > 0) {
      ctx.addIssue({ code: 'custom', path: ['bets'], message: `Duplicate bet ids: ${duplicateBets.join(', ')}.` })
    }

    const duplicateMoats = findDuplicates(file.moats, (moat) => moat.id)
    if (duplicateMoats.length > 0) {
      ctx.addIssue({ code: 'custom', path: ['moats'], message: `Duplicate moat ids: ${duplicateMoats.join(', ')}.` })
    }

    const duplicateInflections = findDuplicates(file.inflections, (inflection) => inflection.id)
    if (duplicateInflections.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['inflections'],
        message: `Duplicate inflection ids: ${duplicateInflections.join(', ')}.`,
      })
    }

    /* --- Moat ranks must be contiguous from 1 -------------------------------- */
    const ranks = file.moats.map((moat) => moat.rank).sort((a, b) => a - b)
    const expected = ranks.map((_, index) => index + 1)
    if (ranks.join(',') !== expected.join(',')) {
      ctx.addIssue({
        code: 'custom',
        path: ['moats'],
        message: `Moat ranks must be contiguous starting at 1. Found: ${ranks.join(', ')}; expected: ${expected.join(', ')}.`,
      })
    }

    /* --- Inflections must be chronological ----------------------------------- */
    for (let i = 1; i < file.inflections.length; i += 1) {
      if (file.inflections[i].year < file.inflections[i - 1].year) {
        ctx.addIssue({
          code: 'custom',
          path: ['inflections', i, 'year'],
          message: `Inflections must be listed in chronological order. ${file.inflections[i].year} follows ${file.inflections[i - 1].year}.`,
        })
        break
      }
    }

    /*
     * Note: the "every bet is paid-off" check is deliberately NOT here. A uniformly
     * triumphant bet list reads as hagiography rather than analysis, but that is an
     * editorial judgment, not a structural defect — and an editorial rule that blocks
     * deployment is an editorial rule that will eventually be disabled. It is emitted
     * as WARN006 by the derive stage instead.
     */
  })

export type StrategyFileT = z.infer<typeof StrategyFile>
