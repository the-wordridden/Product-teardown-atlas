/**
 * The normalised evidence registry.
 *
 * Evidence is never inlined. Every number in the Atlas lives exactly once, here, and
 * is referenced by id from JSON fields and from MDX. That normalisation is what stops
 * the same figure appearing in the vitals, a loop node and a comparison row with three
 * different as-of dates.
 *
 * File: content/products/<slug>/evidence.json
 */

import { z } from 'zod'
import {
  Confidence,
  EvidenceId,
  findDuplicates,
  IsoDate,
  Label,
  Line,
  SourceType,
  TwoSentences,
  Url,
} from './enums'

/** Source types where a claim is not checkable without a link. */
const SOURCE_TYPES_REQUIRING_URL = new Set([
  'company-filing',
  'company-communication',
  'press',
  'analyst-report',
  'third-party-data',
])

export const EvidenceSource = z
  .object({
    type: SourceType,
    title: z.string().trim().min(3).max(200),
    publisher: Label.optional(),
    url: Url.optional(),
    retrievedOn: IsoDate.optional(),
  })
  .strict()
  .superRefine((source, ctx) => {
    if (SOURCE_TYPES_REQUIRING_URL.has(source.type) && !source.url) {
      ctx.addIssue({
        code: 'custom',
        path: ['url'],
        message: `A source of type "${source.type}" must include a url, otherwise the claim cannot be checked by a reader.`,
      })
    }
  })

export type EvidenceSourceT = z.infer<typeof EvidenceSource>

export const EvidenceEntry = z
  .object({
    id: EvidenceId,

    /** What this figure measures, in plain language. Rendered as the chip tooltip. */
    claim: Line,

    /**
     * Kept as a string on purpose. Figures in this domain are heterogeneous — currency,
     * counts, percentages, ranges, take rates — and forcing a number type invites both
     * unit bugs and false precision. Sorting is not a requirement anywhere in the Atlas.
     */
    value: z.string().trim().min(1).max(120),

    /**
     * Optional headline form of `value` for tiles ("$1.06B" for "$1,055,788 thousand").
     * Presentation only: it may round, never restate. `value` stays the figure the source
     * gives and is what the chip popover shows. Amendment 2026-09-21.
     */
    display: z.string().trim().min(1).max(32).optional(),

    asOf: IsoDate,
    confidence: Confidence,
    source: EvidenceSource,

    /** Required when confidence is "estimated": how the estimate was arrived at. */
    note: TwoSentences.optional(),
  })
  .strict()
  .superRefine((entry, ctx) => {
    if (entry.confidence === 'verified' && entry.source.type === 'personal-analysis') {
      ctx.addIssue({
        code: 'custom',
        path: ['confidence'],
        message:
          'A figure sourced from personal analysis cannot be "verified". Use "estimated" and explain the derivation in `note`.',
      })
    }

    if (entry.confidence === 'verified' && !entry.source.url) {
      ctx.addIssue({
        code: 'custom',
        path: ['source', 'url'],
        message: 'A "verified" figure must carry a source url so a reader can check it independently.',
      })
    }

    if (entry.confidence === 'estimated' && !entry.note) {
      ctx.addIssue({
        code: 'custom',
        path: ['note'],
        message:
          'An "estimated" figure must explain how the estimate was derived. Unexplained estimates are indistinguishable from guesses.',
      })
    }
  })

export type EvidenceEntryT = z.infer<typeof EvidenceEntry>

export const EvidenceRegistryFile = z
  .object({
    $schema: z.string().optional(),
    evidence: z.array(EvidenceEntry).min(1, 'A product must carry at least one evidence entry.'),
  })
  .strict()
  .superRefine((file, ctx) => {
    const duplicates = findDuplicates(file.evidence, (entry) => entry.id)
    if (duplicates.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['evidence'],
        message: `Duplicate evidence ids: ${duplicates.join(', ')}. Every id must be unique within a product registry.`,
      })
    }
  })

export type EvidenceRegistryFileT = z.infer<typeof EvidenceRegistryFile>
