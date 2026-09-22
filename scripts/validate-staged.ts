/**
 * Validate a staged content folder (Stage 2 output) against the locked schema
 * without it being inside content/products, so the site build stays clean.
 *
 *   npx tsx scripts/validate-staged.ts research/stripe/stage-2/content
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'zod'
import { buildLoopRenderModel } from '../src/derive/loop-geometry'
import { EvidenceRegistryFile, LoopsFile, ProductFile, ProfileFile, StrategyFile, PROFILE_AXIS_IDS } from '../src/schema'

const dir = process.argv[2]
if (!dir) {
  console.error('usage: validate-staged <dir>')
  process.exit(2)
}

const read = (name: string) => JSON.parse(readFileSync(join(dir, name), 'utf-8'))

function parse<T>(schema: z.ZodType<T>, name: string): T {
  const result = schema.safeParse(read(name))
  if (!result.success) {
    console.error(`\n✗ ${name}`)
    for (const issue of result.error.issues) console.error(`  ${issue.path.join('.')}: ${issue.message}`)
    process.exit(1)
  }
  console.log(`✓ ${name}`)
  return result.data
}

const product = parse(ProductFile, 'product.json')
const profile = parse(ProfileFile, 'profile.json')
const loops = parse(LoopsFile, 'loops.json')
const strategy = parse(StrategyFile, 'strategy.json')
const registry = parse(EvidenceRegistryFile, 'evidence.json')

const evidence = new Map(registry.evidence.map((e) => [e.id, e]))
const unresolved: string[] = []
const used = new Set<string>()
const check = (ids: readonly string[], where: string) => {
  for (const id of ids) {
    used.add(id)
    if (!evidence.has(id)) unresolved.push(`${where}: ${id}`)
  }
}
check(product.vitals.keyMetricIds, 'vitals.keyMetricIds')
check(product.vitals.evidenceIds, 'vitals.evidenceIds')
check(product.problem.evidenceIds, 'problem')
for (const s of product.users.segments) check(s.evidenceIds, `segment ${s.id}`)
if (product.users.powerUser) check(product.users.powerUser.evidenceIds, 'powerUser')
for (const j of product.jtbd.jobs) check(j.evidenceIds, `job ${j.id}`)
if (product.product.ahaMoment) check(product.product.ahaMoment.evidenceIds, 'ahaMoment')
check(product.businessModel.evidenceIds, 'businessModel')
for (const line of product.businessModel.revenueLines) check(line.evidenceIds, `revenueLine ${line.id}`)
for (const tier of product.businessModel.pricing.tiers) check(tier.evidenceIds, `tier ${tier.name}`)
for (const axisId of PROFILE_AXIS_IDS) check(profile[axisId].evidenceIds, `profile.${axisId}`)
for (const bet of strategy.bets) check(bet.evidenceIds, `bet ${bet.id}`)
for (const moat of strategy.moats) check(moat.evidenceIds, `moat ${moat.id}`)
for (const inf of strategy.inflections) check(inf.evidenceIds, `inflection ${inf.id}`)
for (const loop of loops.loops) {
  check(loop.speed.evidenceIds, `loop ${loop.id} speed`)
  for (const node of loop.nodes) check(node.metricIds, `node ${node.role}`)
  for (const edge of loop.edges) {
    check(edge.evidenceIds, `edge ${edge.from}->${edge.to}`)
    check(edge.counterEvidenceIds, `edge ${edge.from}->${edge.to} counter`)
  }
}
if (unresolved.length) {
  console.error('\n✗ XREF002 unresolved:\n  ' + unresolved.join('\n  '))
  process.exit(1)
}
console.log('✓ XREF002: all references resolve')

const orphans = [...evidence.keys()].filter((id) => !used.has(id))
if (orphans.length) console.log(`ℹ ${orphans.length} evidence entries not referenced by structured files (available to MDX): ${orphans.join(', ')}`)

const primary = loops.loops.find((l) => l.id === loops.primaryLoopId)!
const model = buildLoopRenderModel(primary)
console.log(`✓ loop "${primary.id}": status=${model.summary.status}, evidenced=${model.summary.counts.evidenced}/5, edges=${model.edges.map((e) => e.evidenceStatus[0]).join('')}`)
console.log(`✓ ${registry.evidence.length} evidence entries; ${product.users.segments.length} segments; ${product.jtbd.jobs.length} jobs; ${strategy.bets.length} bets; ${strategy.moats.length} moats; ${strategy.inflections.length} inflections`)
