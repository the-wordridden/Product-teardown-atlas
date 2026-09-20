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
