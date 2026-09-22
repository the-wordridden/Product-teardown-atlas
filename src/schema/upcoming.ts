/**
 * The queue: products planned for teardown, with the angle we intend to take.
 *
 * Nothing here is a finding. An entry names a product, the question the teardown
 * will ask, and what it will look at. The words are deliberately interrogative so a
 * planned angle can never be mistaken for an established claim.
 */

import { z } from 'zod'
import { Label, Line, ProductCategory, Slug } from './enums'

export const QUEUE_STATUSES = ['queued', 'in-research', 'drafting'] as const
export const QueueStatus = z.enum(QUEUE_STATUSES)

export const UpcomingProduct = z
  .object({
    slug: Slug,
    name: Label,
    category: ProductCategory,
    /** The question the teardown will try to answer. Phrased as a question. */
    angle: Line.refine((s) => s.trim().endsWith('?'), 'An angle is a question until the teardown answers it.'),
    /** What it will look at. Two to four short lines. */
    focus: z.array(Line).min(2).max(4),
    status: QueueStatus,
  })
  .strict()

export const UpcomingFile = z
  .object({
    products: z.array(UpcomingProduct).max(24),
  })
  .strict()
  .superRefine((file, ctx) => {
    const seen = new Set<string>()
    for (const p of file.products) {
      if (seen.has(p.slug)) ctx.addIssue({ code: 'custom', path: ['products'], message: `Duplicate slug: ${p.slug}` })
      seen.add(p.slug)
    }
  })

export type UpcomingProductT = z.infer<typeof UpcomingProduct>
export type UpcomingFileT = z.infer<typeof UpcomingFile>
