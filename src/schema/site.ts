/**
 * Global site configuration.
 *
 * Deliberately small. Anything that is per-product belongs in product content; anything
 * that is presentation belongs in tokens.css or a component. This file exists for the
 * handful of values that are genuinely global and genuinely editorial.
 *
 * File: content/site.json
 */

import { z } from 'zod'
import { FacetId, findDuplicates, Label, Line, PatternFamily, Slug, TwoSentences, Url } from './enums'

export const SiteFile = z
  .object({
    $schema: z.string().optional(),

    name: Label,
    tagline: Line,
    description: TwoSentences,

    author: z
      .object({
        name: Label,
        role: Line,
        url: Url.optional(),
      })
      .strict(),

    /** The teardown the landing page CTA opens. */
    featuredProductSlug: Slug,

    /** Display order for pattern families on /patterns. */
    patternFamilyOrder: z.array(PatternFamily).length(5),

    /** The six facets shown by default on a comparison page before "show all". */
    defaultComparisonFacets: z
      .array(FacetId)
      .min(4)
      .max(8),

    /** Current methodology version, surfaced on /method. */
    frameworkVersion: z.string().regex(/^\d+\.\d+$/, 'Framework version is MAJOR.MINOR, e.g. "1.0".'),

    /**
     * Filters on /products render only once the library is large enough for them to be
     * useful. Shipping an empty filter rail over two products is the clearest possible
     * tell that a project was designed for a screenshot rather than for use.
     */
    minProductsForFilters: z.number().int().min(2).max(20).default(5),
  })
  .strict()
  .superRefine((file, ctx) => {
    const duplicateFamilies = findDuplicates(file.patternFamilyOrder, (family) => family)
    if (duplicateFamilies.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['patternFamilyOrder'],
        message: `Duplicate pattern families: ${duplicateFamilies.join(', ')}. All five families must appear exactly once.`,
      })
    }

    const duplicateFacets = findDuplicates(file.defaultComparisonFacets, (facet) => facet)
    if (duplicateFacets.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['defaultComparisonFacets'],
        message: `Duplicate facets: ${duplicateFacets.join(', ')}.`,
      })
    }
  })

export type SiteFileT = z.infer<typeof SiteFile>
