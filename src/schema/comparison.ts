/**
 * Comparison documents: the authored strategic synthesis for one product pair.
 *
 * This schema is where the "machine proposes, human disposes" rule becomes structural.
 * There is no field for a computed divergence score, a ranking, an aggregate, or a
 * winner — not because the build does not compute divergence (it does), but because a
 * computed value has nowhere to live in the rendered content. The only strategic
 * claims that can reach a reader are the ones in `contrasts`, written by hand.
 *
 * File: content/comparisons/<a>-vs-<b>.mdx (frontmatter)
 */

import { z } from 'zod'
import {
  EvidenceIdList,
  FacetId,
  findDuplicates,
  IsoDate,
  Label,
  Paragraph,
  PublicationStatus,
  Slug,
} from './enums'

/* -------------------------------------------------------------------------- */
/* Authored contrast                                                           */
/* -------------------------------------------------------------------------- */

/**
 * One authored contrast. A contrast may name a facet the divergence pass scored low —
 * two products converging where you would expect them to diverge is frequently the
 * sharper observation, and the system must never discourage writing it.
 */
export const AuthoredContrast = z
  .object({
    facet: FacetId,

    /** The claim, stated sharply enough to be worth reading. */
    headline: Label,

    /** The argument. This is the only place strategic interpretation may live. */
    argument: Paragraph,

    /** Optional per-side evidence, keyed by the product slug it belongs to. */
    evidenceIdsA: EvidenceIdList,
    evidenceIdsB: EvidenceIdList,
  })
  .strict()

export type AuthoredContrastT = z.infer<typeof AuthoredContrast>

/* -------------------------------------------------------------------------- */
/* Frontmatter                                                                 */
/* -------------------------------------------------------------------------- */

export const ComparisonFrontmatter = z
  .object({
    /**
     * Exactly two product slugs, in alphabetical order. The canonical URL is derived
     * from this ordering, and the reverse pair is 308-redirected to it.
     */
    products: z.array(Slug).length(2, 'A comparison is between exactly two products.'),

    contrasts: z
      .array(AuthoredContrast)
      .min(3, 'Write at least three contrasts. Fewer than three is a note, not a comparison.')
      .max(8),

    /** Optional override of the default facet ordering for this pair. */
    dimensionOrder: z.array(FacetId).max(20).optional(),

    status: PublicationStatus,
    lastUpdated: IsoDate,
  })
  .strict()
  .superRefine((frontmatter, ctx) => {
    const [a, b] = frontmatter.products

    if (a === b) {
      ctx.addIssue({
        code: 'custom',
        path: ['products'],
        message: 'A product cannot be compared with itself.',
      })
      return
    }

    const sorted = [...frontmatter.products].sort()
    if (sorted[0] !== a || sorted[1] !== b) {
      ctx.addIssue({
        code: 'custom',
        path: ['products'],
        message: `Products must be listed in alphabetical order so the canonical URL is unambiguous. Expected ["${sorted[0]}", "${sorted[1]}"], found ["${a}", "${b}"]. The file should be named ${sorted[0]}-vs-${sorted[1]}.mdx.`,
      })
    }

    const duplicateFacets = findDuplicates(frontmatter.contrasts, (contrast) => contrast.facet)
    if (duplicateFacets.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['contrasts'],
        message: `More than one contrast addresses the same facet: ${duplicateFacets.join(', ')}. Merge them into a single argument.`,
      })
    }

    if (frontmatter.dimensionOrder) {
      const duplicateDimensions = findDuplicates(frontmatter.dimensionOrder, (facet) => facet)
      if (duplicateDimensions.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['dimensionOrder'],
          message: `Duplicate facets in dimensionOrder: ${duplicateDimensions.join(', ')}.`,
        })
      }
    }
  })

export type ComparisonFrontmatterT = z.infer<typeof ComparisonFrontmatter>

/**
 * Derives the canonical URL segment for a pair. The single source of truth for pair
 * ordering — the route, the redirect table and the validator all call this.
 */
export function canonicalPairSlug(a: string, b: string): string {
  return [a, b].sort().join('-vs-')
}
