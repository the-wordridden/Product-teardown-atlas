/**
 * Product identity, vitals, publication metadata, the ten-section manifest, and the
 * composition of the body-section schemas.
 *
 * This module deliberately defines very little of its own. Domain structures live in
 * their own modules — loops in loop.ts, bets and moats in strategy.ts, the six axes in
 * profile.ts, the body sections in sections.ts — and product.ts composes them. The one
 * structure it does own is the section manifest, because verifying that all ten
 * sections exist in canonical order is a product-level concern.
 *
 * File: content/products/<slug>/product.json
 */

import { z } from 'zod'
import {
  CompanyStage,
  EvidenceIdList,
  findDuplicates,
  HeadcountBand,
  HexColor,
  IsoDate,
  Label,
  Line,
  OwnershipType,
  Platform,
  ProductCategory,
  PublicationStatus,
  SECTION_IDS,
  SectionId,
  Slug,
  TwoSentences,
  Unestablished,
  Year,
} from './enums'
import { PatternRefList } from './loop'
import {
  BusinessModelSection,
  JtbdSection,
  ProblemSection,
  ProductSection,
  UsersSection,
} from './sections'
import { VerdictSection } from './verdict'

/* -------------------------------------------------------------------------- */
/* Vitals                                                                      */
/* -------------------------------------------------------------------------- */

export const Vitals = z
  .object({
    founded: Year,
    category: ProductCategory,
    stage: CompanyStage,
    ownership: OwnershipType,
    headquarters: Label,
    /** Band, or `unestablished` where no source discloses headcount. */
    headcountBand: z.union([HeadcountBand, Unestablished]),
    platforms: z.array(Platform).min(1).max(9),

    /**
     * The headline figures shown in the hero. At least three, so the orientation card
     * is actually informative, and every one of them is an evidence id rather than a
     * loose number.
     */
    keyMetricIds: z
      .array(z.string())
      .min(3, 'Surface at least three headline metrics, referenced by evidence id.')
      .max(6),

    evidenceIds: EvidenceIdList,
  })
  .strict()

export type VitalsT = z.infer<typeof Vitals>

/* -------------------------------------------------------------------------- */
/* Section manifest                                                            */
/* -------------------------------------------------------------------------- */

/**
 * One entry per section. Note there is no `anchor` field: anchors are derived as
 * `#${id}` during the derive stage. Authored anchors would be a second source of truth
 * and would rot the moment a heading was reworded.
 */
export const SectionManifestEntry = z
  .object({
    id: SectionId,
    /** The heading shown in the section rail and on the page. */
    title: Label,
    /** Optional one-line standfirst rendered under the heading. */
    summary: Line.optional(),
    /**
     * The Stage 1 gate's call on how well this section's central claims are evidenced
     * (ADR-003). Authored, because "is this section well evidenced?" is a judgment about
     * source-claim fit, and counting verified ids cannot make it: a verified pricing page
     * says nothing about who the users are. Absent, a conservative derivation applies.
     */
    evidence: z.enum(['rich', 'bounded', 'gap']).optional(),
  })
  .strict()

/* -------------------------------------------------------------------------- */
/* The 60-second version and interview practice (ADR-003)                      */
/* -------------------------------------------------------------------------- */

/**
 * The teardown compressed to what a reader should be able to say out loud afterwards.
 * Every line is the analyst's synthesis of sections below it, so none cites evidence of
 * its own; each points the reader to where the argument is made.
 */
export const Brief = z
  .object({
    /** How one user or customer turns into the next. */
    grows: Line,
    /** Where the money enters, in one line. */
    earns: Line,
    /** The trade-off the company chose, and what it gave up. */
    tradeoff: Line,
    /** The most important thing nobody outside the company can verify. */
    unverified: Line,
  })
  .strict()

/**
 * The metrics the analyst would own if running the product (ADR-004). Proposals, labelled
 * as ours on the page, never presented as the company's own metric.
 */
const ProposedMetric = z
  .object({
    name: Label,
    /** Exactly what is counted, over what period. */
    definition: Line,
    /** Why this and not the obvious alternative. */
    why: Line,
  })
  .strict()

export const Metrics = z
  .object({
    northStar: ProposedMetric,
    activation: ProposedMetric,
  })
  .strict()

/** Who a customer would pick instead, and why. The analyst's read of the market (ADR-004). */
export const Competitor = z
  .object({
    name: Label,
    /** Why a customer would choose it over this product. */
    theyWin: Line,
    /** Why a customer would choose this product over it. */
    weWin: Line,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export const InterviewQuestion = z
  .object({
    id: Slug,
    question: Line,
    /** What a strong answer covers, in order. Points, not a script. */
    outline: z.array(Line).min(3, 'An outline needs at least three points to be worth practising.').max(5),
    /** The section of this teardown where the material for an answer lives. */
    seeSection: SectionId,
  })
  .strict()

/* -------------------------------------------------------------------------- */
/* File                                                                        */
/* -------------------------------------------------------------------------- */

export const ProductFile = z
  .object({
    $schema: z.string().optional(),

    /* --- Identity ---------------------------------------------------------- */
    slug: Slug,
    name: Label,
    legalName: Label.optional(),

    /** The one-line point of view that appears on the library card and the hero. */
    thesis: Line,

    /** Product accent colour, used consistently across compare and pattern surfaces. */
    accent: HexColor,

    /* --- Publication metadata ---------------------------------------------- */
    status: PublicationStatus,
    publishedOn: IsoDate,
    lastUpdated: IsoDate,
    /** The methodology version this teardown was written against. */
    frameworkVersion: z.string().regex(/^\d+\.\d+$/, 'Framework version is MAJOR.MINOR, e.g. "1.0".'),

    /* --- Vitals ------------------------------------------------------------ */
    vitals: Vitals,

    /* --- Section manifest -------------------------------------------------- */
    sections: z
      .array(SectionManifestEntry)
      .length(SECTION_IDS.length, `The manifest must list all ${SECTION_IDS.length} sections.`),

    /* --- Composed body sections -------------------------------------------- */
    problem: ProblemSection,
    users: UsersSection,
    jtbd: JtbdSection,
    product: ProductSection,
    businessModel: BusinessModelSection,

    /**
     * Optional (ADR-002 extension) — but for a different reason than the sections above.
     * The verdict is L5 evaluation: pure JUDGMENT that only the human analyst may
     * author. Its absence records "not yet judged", not "not evidenced", and a product
     * must not be blocked from structural completion while that judgment is pending.
     * Publication gating on a missing verdict belongs to the quality layer (WARN013),
     * not the validator.
     */
    verdict: VerdictSection.optional(),

    /* --- Reader-facing synthesis (ADR-003) --------------------------------- */
    brief: Brief.optional(),
    /** How far to trust this page, stated once instead of in every section (ADR-004). */
    ceiling: TwoSentences.optional(),
    metrics: Metrics.optional(),
    competition: z.array(Competitor).min(2).max(6).optional(),
    interview: z.array(InterviewQuestion).max(6).optional(),

    /* --- Product-level pattern tags ---------------------------------------- */
    patterns: PatternRefList,
  })
  .strict()
  .superRefine((file, ctx) => {
    /* --- The manifest must be exactly the ten sections, in canonical order --- */
    const manifestIds = file.sections.map((section) => section.id)

    const duplicates = findDuplicates(manifestIds, (id) => id)
    if (duplicates.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['sections'],
        message: `Duplicate sections in manifest: ${duplicates.join(', ')}.`,
      })
    }

    const missing = SECTION_IDS.filter((id) => !manifestIds.includes(id))
    if (missing.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['sections'],
        message: `Missing sections in manifest: ${missing.join(', ')}. All ten sections are required; a section with nothing to say should state that as a finding.`,
      })
    }

    if (missing.length === 0 && duplicates.length === 0) {
      const canonical = SECTION_IDS.join(',')
      if (manifestIds.join(',') !== canonical) {
        ctx.addIssue({
          code: 'custom',
          path: ['sections'],
          message: `Sections must be listed in canonical reading order: ${canonical}. Found: ${manifestIds.join(',')}.`,
        })
      }
    }

    /* --- Job segment references must resolve within this document ----------- */
    const segmentIds = new Set(file.users.segments.map((segment) => segment.id))
    file.jtbd.jobs.forEach((job, jobIndex) => {
      job.segmentIds.forEach((segmentId, refIndex) => {
        if (!segmentIds.has(segmentId)) {
          ctx.addIssue({
            code: 'custom',
            path: ['jtbd', 'jobs', jobIndex, 'segmentIds', refIndex],
            message: `Job references segment "${segmentId}", which is not defined in users.segments. Available: ${[...segmentIds].join(', ')}.`,
          })
        }
      })
    })

    /* --- Dates must be coherent -------------------------------------------- */
    if (Date.parse(file.lastUpdated) < Date.parse(file.publishedOn)) {
      ctx.addIssue({
        code: 'custom',
        path: ['lastUpdated'],
        message: `lastUpdated (${file.lastUpdated}) cannot precede publishedOn (${file.publishedOn}).`,
      })
    }

    if (file.vitals.founded > new Date(file.publishedOn).getUTCFullYear()) {
      ctx.addIssue({
        code: 'custom',
        path: ['vitals', 'founded'],
        message: `Founding year (${file.vitals.founded}) is after the publication date.`,
      })
    }
  })

export type ProductFileT = z.infer<typeof ProductFile>
