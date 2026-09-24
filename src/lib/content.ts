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
import { PatternFrontmatter, type PatternFrontmatterT } from '../schema/pattern'

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
  for (const c of product.competition ?? []) check(c.evidenceIds, `competition ${c.name}`)
  if (product.verdict) {
    for (const point of product.verdict.getRight) check(point.evidenceIds, `verdict.getRight ${point.id}`)
    for (const point of product.verdict.getWrong) check(point.evidenceIds, `verdict.getWrong ${point.id}`)
  }
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


/* -------------------------------------------------------------------------- */
/* Patterns                                                                    */
/* -------------------------------------------------------------------------- */

export interface PatternManifestation {
  slug: string
  name: string
  section: SectionIdT
  note?: string
}

export interface LoadedPattern extends PatternFrontmatterT {
  /** Derived from PatternRefs in product files. Never authored in the pattern itself. */
  products: PatternManifestation[]
  /** Relationships authored on other patterns that point here, inverted for display. */
  inbound: { relation: string; from: string; rationale: string }[]
}

/**
 * Loads every pattern and derives, from product content, which products exhibit it.
 * Stored as JSON at content/patterns/<slug>.json (the schema comment's MDX frontmatter
 * form would need a parser for no benefit while patterns carry no prose body).
 * XREF: a product may not reference a pattern that does not exist, and a pattern may not
 * relate to one that does not exist. Both throw at build time.
 */
export function loadPatterns(): LoadedPattern[] {
  const dir = join(CONTENT_ROOT, 'patterns')
  if (!existsSync(dir)) return []
  const patterns = readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => PatternFrontmatter.parse(readJson(join(dir, f))) as PatternFrontmatterT)

  const bySlug = new Map(patterns.map((p) => [p.slug, { ...p, products: [], inbound: [] } as LoadedPattern]))
  const problems: string[] = []

  for (const p of patterns) {
    for (const r of p.relationships) {
      const target = bySlug.get(r.target)
      if (!target) problems.push(`pattern ${p.slug} relates to unknown pattern "${r.target}"`)
      else target.inbound.push({ relation: r.relation, from: p.slug, rationale: r.rationale })
    }
  }

  for (const slug of listProductSlugs()) {
    const { product } = loadProduct(slug)
    for (const ref of product.patterns) {
      const target = bySlug.get(ref.slug)
      if (!target) {
        problems.push(`product ${slug} references unknown pattern "${ref.slug}"`)
        continue
      }
      target.products.push({ slug, name: product.name, section: ref.manifestsAt, note: ref.note })
    }
  }

  if (problems.length > 0) throw new Error(`XREF — pattern references:\n  ${problems.join('\n  ')}`)
  return [...bySlug.values()]
}
