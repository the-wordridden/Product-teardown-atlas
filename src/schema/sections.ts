/**
 * The analytical body sections that live inside product.json but are not identity:
 * Problem, Users, Jobs To Be Done, Product Mechanics and Business Model.
 *
 * These are defined here rather than in product.ts so that product.ts stays a thin
 * composition module. Growth loops, strategy, profile and evidence have their own
 * files on disk and therefore their own schema modules; these five share product.json
 * and so share this one.
 */

import { z } from 'zod'
import {
  BusinessModel,
  EvidenceIdList,
  findDuplicates,
  JobDimension,
  Label,
  Line,
  PricingAxis,
  RevenueLineType,
  ShareBand,
  Slug,
  TimeToValueBand,
  TwoSentences,
  Unestablished,
  WhyNowTrigger,
} from './enums'
import { PatternRefList } from './loop'

/* -------------------------------------------------------------------------- */
/* Problem                                                                     */
/* -------------------------------------------------------------------------- */

export const ProblemSection = z
  .object({
    /** The world before this product existed, described concretely. */
    beforeState: TwoSentences,

    /** The world after, described in the same terms so the delta is legible. */
    afterState: TwoSentences,

    /** The narrow opening they went through first. */
    wedge: TwoSentences,

    whyNow: z
      .object({
        trigger: WhyNowTrigger,
        /** What specifically changed to make this possible when it happened. */
        change: Line,
        argument: TwoSentences,
      })
      .strict(),

    evidenceIds: EvidenceIdList,
    patterns: PatternRefList,
  })
  .strict()

/* -------------------------------------------------------------------------- */
/* Users and segments                                                          */
/* -------------------------------------------------------------------------- */

export const UserSegment = z
  .object({
    id: Slug,
    name: Label,
    description: TwoSentences,
    /** Banded rather than a percentage — segment splits are almost never knowable. */
    shareBand: ShareBand,
    isPrimary: z.boolean(),
    evidenceIds: EvidenceIdList,
  })
  .strict()

export const UsersSection = z
  .object({
    /**
     * No editorial minimum (ADR-002 extension). An empty array records that segment
     * composition is unestablished — a valid analytical result. The quality layer
     * (WARN012) reports thin coverage; the validator does not compel invention.
     */
    segments: z.array(UserSegment).max(6),

    /** Optional for the same reason: a power-user profile nobody evidenced is fiction. */
    powerUser: z
      .object({
        profile: TwoSentences,
        /** The behaviours that distinguish a power user from an ordinary one. */
        behaviours: z.array(Line).min(2).max(6),
        evidenceIds: EvidenceIdList,
      })
      .strict()
      .optional(),

    /**
     * Who the product is explicitly not for — the sharpest available signal of
     * positioning judgment when evidence supports it, and inventable when it does not,
     * which is why it may be empty.
     */
    notFor: z
      .array(
        z
          .object({
            who: Label,
            why: TwoSentences,
          })
          .strict(),
      )
      .max(4),

    patterns: PatternRefList,
  })
  .strict()
  .superRefine((section, ctx) => {
    const duplicates = findDuplicates(section.segments, (segment) => segment.id)
    if (duplicates.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['segments'],
        message: `Duplicate segment ids: ${duplicates.join(', ')}.`,
      })
    }

    /* Exactly one primary — enforced only when segments are documented at all. */
    if (section.segments.length > 0) {
      const primaries = section.segments.filter((segment) => segment.isPrimary)
      if (primaries.length !== 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['segments'],
          message: `Exactly one segment must be marked isPrimary; found ${primaries.length}.`,
        })
      }
    }
  })

/* -------------------------------------------------------------------------- */
/* Jobs to be done                                                             */
/* -------------------------------------------------------------------------- */

/** The four Forces of Progress. All four are required — a job with no anxiety or habit
 *  working against it is not a job anyone struggled with. */
export const JobForces = z
  .object({
    push: TwoSentences,
    pull: TwoSentences,
    anxiety: TwoSentences,
    habit: TwoSentences,
  })
  .strict()

export const Job = z
  .object({
    id: Slug,
    /** Written as a job statement, not a feature request. */
    statement: Line,
    dimension: JobDimension,
    /** Which segments hire the product for this job. Validated against UsersSection. */
    segmentIds: z.array(Slug).min(1),
    competingAlternatives: z
      .array(
        z
          .object({
            name: Label,
            why: TwoSentences,
          })
          .strict(),
      )
      .min(1, 'Every job has at least one competing alternative, even if it is "do nothing".')
      .max(5),
    forces: JobForces,
    evidenceIds: EvidenceIdList,
    patterns: PatternRefList,
  })
  .strict()

export const JtbdSection = z
  .object({
    /**
     * No editorial minimum (ADR-002 extension). A JTBD written from packaging inference
     * rather than user evidence is precisely the fabrication the methodology forbids,
     * so an empty array is the honest representation of an unevidenced section.
     */
    jobs: z.array(Job).max(6),
  })
  .strict()
  .superRefine((section, ctx) => {
    const duplicates = findDuplicates(section.jobs, (job) => job.id)
    if (duplicates.length > 0) {
      ctx.addIssue({ code: 'custom', path: ['jobs'], message: `Duplicate job ids: ${duplicates.join(', ')}.` })
    }

    /* A documented job set must still contain a functional job — but only if any exist. */
    if (section.jobs.length > 0) {
      const dimensions = new Set(section.jobs.map((job) => job.dimension))
      if (!dimensions.has('functional')) {
        ctx.addIssue({
          code: 'custom',
          path: ['jobs'],
          message: 'At least one job must be functional. A product hired only for emotional and social jobs is a brand, not a tool.',
        })
      }
    }
  })

/* -------------------------------------------------------------------------- */
/* Product mechanics                                                           */
/* -------------------------------------------------------------------------- */

export const ProductSection = z
  .object({
    /**
     * The nouns the product is built around. May be empty where the product has not
     * been directly observed (ADR-002 extension) — inferring mechanics from marketing
     * copy is what the observation discipline in the methodology forbids.
     */
    coreObjects: z.array(Label).max(8),

    /** The verbs users perform on those objects. Same evidence rule as coreObjects. */
    coreActions: z.array(Label).max(8),

    /** The smallest thing that delivers value on its own. Omit when unobserved. */
    atomicUnitOfValue: Line.optional(),

    /** Omit when no source establishes the moment or its trigger. */
    ahaMoment: z
      .object({
        description: TwoSentences,
        /** The observable trigger that produces it. */
        trigger: Line,
        evidenceIds: EvidenceIdList,
      })
      .strict()
      .optional(),

    /** Band, or `unestablished` where no activation evidence exists. */
    timeToValue: z.union([TimeToValueBand, Unestablished]),

    keySurfaces: z
      .array(
        z
          .object({
            name: Label,
            purpose: Line,
          })
          .strict(),
      )
      .max(8),

    patterns: PatternRefList,
  })
  .strict()

/* -------------------------------------------------------------------------- */
/* Business model                                                              */
/* -------------------------------------------------------------------------- */

export const RevenueLine = z
  .object({
    id: Slug,
    type: RevenueLineType,
    name: Label,
    description: TwoSentences,
    shareBand: ShareBand,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export const PricingTier = z
  .object({
    name: Label,
    /** What this tier unlocks that the one below does not. The gate is the strategy. */
    gates: z.array(Line).min(1).max(6),
    priceNote: Line,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export const BusinessModelSection = z
  .object({
    models: z.array(BusinessModel).min(1).max(4),

    /** The unit the customer is billed against as they grow. */
    valueMetric: Line,

    revenueLines: z.array(RevenueLine).min(1).max(6),

    pricing: z
      .object({
        axis: PricingAxis,
        tiers: z.array(PricingTier).min(2).max(6),
      })
      .strict(),

    /** The specific moment a user becomes a payer. */
    monetizationMoment: TwoSentences,

    /**
     * The *shape* of the unit economics, not invented precision: who pays, when,
     * what expands, and what erodes.
     */
    unitEconomicsShape: TwoSentences,

    evidenceIds: EvidenceIdList,
    patterns: PatternRefList,
  })
  .strict()
  .superRefine((section, ctx) => {
    const duplicates = findDuplicates(section.revenueLines, (line) => line.id)
    if (duplicates.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['revenueLines'],
        message: `Duplicate revenue line ids: ${duplicates.join(', ')}.`,
      })
    }

    const dominant = section.revenueLines.filter((line) => line.shareBand === 'dominant')
    if (dominant.length > 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['revenueLines'],
        message: `Only one revenue line can be "dominant"; found ${dominant.length}.`,
      })
    }
  })

export type ProblemSectionT = z.infer<typeof ProblemSection>
export type UsersSectionT = z.infer<typeof UsersSection>
export type JtbdSectionT = z.infer<typeof JtbdSection>
export type ProductSectionT = z.infer<typeof ProductSection>
export type BusinessModelSectionT = z.infer<typeof BusinessModelSection>
