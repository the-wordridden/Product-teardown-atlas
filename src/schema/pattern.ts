/**
 * Pattern documents: the knowledge-graph layer.
 *
 * The defining constraint of this module is what it *forbids*. A pattern document must
 * never contain a list of the products that exhibit it. That list is derived on every
 * build from PatternRef entries scattered across product content, at the exact point
 * of manifestation. A hand-maintained list would desynchronise the first time a
 * product was edited, and nothing would catch it.
 *
 * Because a plain `.strict()` failure would only say "unrecognized key", the banned
 * keys are checked explicitly so the author gets an actionable explanation instead.
 *
 * File: content/patterns/<slug>.mdx (frontmatter)
 */

import { z } from 'zod'
import {
  BANNED_PATTERN_KEYS,
  findDuplicates,
  Label,
  Line,
  PatternFamily,
  PatternMechanismShape,
  PatternRelation,
  Slug,
  TwoSentences,
} from './enums'

/* -------------------------------------------------------------------------- */
/* Relationships                                                               */
/* -------------------------------------------------------------------------- */

/**
 * A typed edge to another pattern. Inverse edges are materialised by the derive stage
 * rather than authored on both sides, so the graph cannot become one-directional.
 */
export const PatternRelationship = z
  .object({
    relation: PatternRelation,
    target: Slug,
    /** Why the relationship holds. Required — an unexplained edge is just a tag. */
    rationale: Line,
  })
  .strict()

export type PatternRelationshipT = z.infer<typeof PatternRelationship>

/* -------------------------------------------------------------------------- */
/* Frontmatter                                                                 */
/* -------------------------------------------------------------------------- */

const PatternShape = z.object({
  slug: Slug,
  name: Label,
  family: PatternFamily,

  /** One sentence a reader could repeat back accurately. */
  definition: Line,

  mechanism: z
    .object({
      shape: PatternMechanismShape,
      /** How the mechanism works, product-independently. */
      summary: TwoSentences,
    })
    .strict(),

  /** The conditions under which this pattern actually works. */
  preconditions: z
    .array(Line)
    .min(2, 'State at least two preconditions. A pattern that always works is not a pattern.')
    .max(6),

  /** How it breaks. This is what turns a label into a usable heuristic. */
  failureModes: z.array(Line).min(2, 'State at least two failure modes.').max(6),

  antiPattern: z
    .object({
      name: Label,
      description: TwoSentences,
    })
    .strict(),

  relationships: z.array(PatternRelationship).max(10).default([]),

  /** Alternative names, folded into the search index. */
  aliases: z.array(Label).max(6).default([]),
})

export const PatternFrontmatter = PatternShape.passthrough().superRefine((raw, ctx) => {
  const value = raw as Record<string, unknown>

  /* --- Products are derived, never authored -------------------------------- */
  for (const banned of BANNED_PATTERN_KEYS) {
    if (banned in value) {
      ctx.addIssue({
        code: 'custom',
        path: [banned],
        message: `Pattern documents must not contain "${banned}". The list of products exhibiting a pattern is derived at build time from PatternRef entries inside product content, so that it can never drift. Add a PatternRef in the relevant product file instead.`,
      })
    }
  }

  /* --- Reject any other unknown key, with a useful message ----------------- */
  const known = new Set(Object.keys(PatternShape.shape))
  const bannedSet = new Set<string>(BANNED_PATTERN_KEYS)
  for (const key of Object.keys(value)) {
    if (!known.has(key) && !bannedSet.has(key)) {
      ctx.addIssue({
        code: 'custom',
        path: [key],
        message: `Unknown field "${key}" in pattern frontmatter. Allowed fields: ${[...known].join(', ')}.`,
      })
    }
  }

  /* --- Relationship hygiene ------------------------------------------------ */
  const relationships = (value.relationships as PatternRelationshipT[] | undefined) ?? []

  for (const relationship of relationships) {
    if (relationship.target === value.slug) {
      ctx.addIssue({
        code: 'custom',
        path: ['relationships'],
        message: `A pattern cannot declare a relationship with itself ("${relationship.target}").`,
      })
    }
  }

  const duplicates = findDuplicates(relationships, (r) => `${r.relation}:${r.target}`)
  if (duplicates.length > 0) {
    ctx.addIssue({
      code: 'custom',
      path: ['relationships'],
      message: `Duplicate relationships: ${duplicates.join(', ')}.`,
    })
  }
})

export type PatternFrontmatterT = z.infer<typeof PatternShape>
