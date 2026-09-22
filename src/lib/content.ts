/**
 * Content loader — build-time only.
 *
 * INTERIM IMPLEMENTATION, deliberately flagged: the locked architecture (Section 4,
 * ADR table #4) specifies Velite as the ingest layer. Velite cannot currently be
 * installed or its API verified in this environment (Node absent), and a config
 * written blind against an unverifiable dependency would be fabricated correctness.
 * This loader therefore reads content/ directly with fs + Zod — the same schemas, the
 * same validation guarantees, no proprietary layer — and is the piece to swap when
 * Velite integration can actually be executed and tested. Nothing outside this module
 * knows the difference: consumers receive validated, typed content either way.
 *
 * Every read validates. A content defect throws at build time, never renders.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  EvidenceRegistryFile,
  LoopsFile,
  ProductFile,
  ProfileFile,
  StrategyFile,
  PROFILE_AXIS_IDS,
  SECTION_IDS,
  type EvidenceEntryT,
  type LoopsFileT,
  type ProductFileT,
  type ProfileFileT,
  type StrategyFileT,
  type SectionIdT,
} from '../schema'
import { UpcomingFile, type UpcomingProductT } from '../schema/upcoming'

const CONTENT_ROOT = join(process.cwd(), 'content')
const PRODUCTS_ROOT = join(CONTENT_ROOT, 'products')

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf-8'))
}

export interface LoadedProduct {
  product: ProductFileT
  profile: ProfileFileT
  loops: LoopsFileT
  strategy: StrategyFileT
  evidence: Map<string, EvidenceEntryT>
  /** Raw MDX source per section; compilation happens at the page layer. */
  sections: Record<SectionIdT, string>
}

export function listProductSlugs(): string[] {
  if (!existsSync(PRODUCTS_ROOT)) return []
  return readdirSync(PRODUCTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

export function loadProduct(slug: string): LoadedProduct {
  const dir = join(PRODUCTS_ROOT, slug)

  const product = ProductFile.parse(readJson(join(dir, 'product.json')))
  const profile = ProfileFile.parse(readJson(join(dir, 'profile.json')))
  const loops = LoopsFile.parse(readJson(join(dir, 'loops.json')))
  const strategy = StrategyFile.parse(readJson(join(dir, 'strategy.json')))
  const registry = EvidenceRegistryFile.parse(readJson(join(dir, 'evidence.json')))

  const evidence = new Map(registry.evidence.map((entry) => [entry.id, entry]))

  /* XREF002 — every reference in the structured files must resolve. */
  const unresolved: string[] = []
  const check = (ids: readonly string[], where: string) => {
    for (const id of ids) if (!evidence.has(id)) unresolved.push(`${where}: ${id}`)
  }
  check(product.vitals.keyMetricIds, 'vitals.keyMetricIds')
  check(product.vitals.evidenceIds, 'vitals.evidenceIds')
  check(product.problem.evidenceIds, 'problem')
  check(product.businessModel.evidenceIds, 'businessModel')
  for (const line of product.businessModel.revenueLines) check(line.evidenceIds, `revenueLine ${line.id}`)
  for (const tier of product.businessModel.pricing.tiers) check(tier.evidenceIds, `tier ${tier.name}`)
  for (const axisId of PROFILE_AXIS_IDS) check(profile[axisId].evidenceIds, `profile.${axisId}`)
  for (const bet of strategy.bets) check(bet.evidenceIds, `bet ${bet.id}`)
  for (const moat of strategy.moats) check(moat.evidenceIds, `moat ${moat.id}`)
  for (const inflection of strategy.inflections) check(inflection.evidenceIds, `inflection ${inflection.id}`)
  for (const loop of loops.loops) {
    check(loop.speed.evidenceIds, `loop ${loop.id} speed`)
    for (const node of loop.nodes) check(node.metricIds, `loop node ${node.role}`)
    for (const edge of loop.edges) {
      check(edge.evidenceIds, `edge ${edge.from}->${edge.to}`)
      check(edge.counterEvidenceIds, `edge ${edge.from}->${edge.to} counter`)
    }
  }
  if (unresolved.length > 0) {
    throw new Error(`XREF002 — unresolved evidence references in "${slug}":\n  ${unresolved.join('\n  ')}`)
  }

  /* XREF007 — all ten section MDX files must exist. */
  const sections = {} as Record<SectionIdT, string>
  const missing: string[] = []
  for (const sectionId of SECTION_IDS) {
    const path = join(dir, 'sections', `${sectionId}.mdx`)
    if (!existsSync(path)) {
      missing.push(sectionId)
      continue
    }
    sections[sectionId] = readFileSync(path, 'utf-8')
  }
  if (missing.length > 0) {
    throw new Error(`XREF007 — missing section files for "${slug}": ${missing.join(', ')}`)
  }

  return { product, profile, loops, strategy, evidence, sections }
}

/** The teardown queue. Absent file means an empty queue, never a build error. */
export function loadUpcoming(): UpcomingProductT[] {
  const path = join(CONTENT_ROOT, 'upcoming.json')
  if (!existsSync(path)) return []
  return UpcomingFile.parse(readJson(path)).products
}
