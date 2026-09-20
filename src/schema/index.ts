/**
 * The public surface of the content contract.
 *
 * Velite binds collections to the file schemas exported here; the derive stage and the
 * app both consume the inferred types. Nothing outside `src/schema` should import from
 * an individual schema module — import from this index so the contract has one door.
 */

export * from './enums'
export * from './evidence'
export * from './profile'
export * from './loop'
export * from './strategy'
export * from './sections'
export * from './verdict'
export * from './product'
export * from './pattern'
export * from './comparison'
export * from './site'

import { ComparisonFrontmatter } from './comparison'
import { EvidenceRegistryFile } from './evidence'
import { LoopsFile } from './loop'
import { PatternFrontmatter } from './pattern'
import { ProductFile } from './product'
import { ProfileFile } from './profile'
import { SiteFile } from './site'
import { StrategyFile } from './strategy'

/**
 * Every file-level schema, keyed by the content it validates. The content check
 * iterates this map, so adding a content type here is the only registration step.
 */
export const CONTENT_SCHEMAS = {
  'product.json': ProductFile,
  'profile.json': ProfileFile,
  'loops.json': LoopsFile,
  'strategy.json': StrategyFile,
  'evidence.json': EvidenceRegistryFile,
  'pattern.mdx': PatternFrontmatter,
  'comparison.mdx': ComparisonFrontmatter,
  'site.json': SiteFile,
} as const

export type ContentSchemaKey = keyof typeof CONTENT_SCHEMAS

/** The five files that together constitute one product. */
export const PRODUCT_FILE_NAMES = [
  'product.json',
  'profile.json',
  'loops.json',
  'strategy.json',
  'evidence.json',
] as const
