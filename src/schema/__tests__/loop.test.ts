/**
 * Growth loop schema and derived-status tests.
 *
 * Covers the structural/evidential separation introduced by ADR-001:
 * a loop must be structurally complete (five roles, closed ring) while its
 * transitions may honestly record that the evidence does not establish them.
 */

import { describe, expect, it } from 'vitest'
import { LOOP_ROLES, type LoopRoleT, type TransitionEvidenceStatusT } from '../enums'
import { Loop } from '../loop'
import { deriveLoopStatus, summariseLoopStatus } from '../../derive/loop-status'

/* -------------------------------------------------------------------------- */
/* Fixtures                                                                    */
/* -------------------------------------------------------------------------- */

const node = (role: LoopRoleT) => ({
  role,
  label: `${role} node`,
  detail: 'A sufficiently long detail string describing what happens at this step of the loop.',
  metricIds: [],
  patterns: [],
})

const edge = (
  from: LoopRoleT,
  to: LoopRoleT,
  evidenceStatus: TransitionEvidenceStatusT,
  overrides: Record<string, unknown> = {},
) => ({
  from,
  to,
  label: `${from} to ${to}`,
  mechanism: 'A sufficiently long mechanism sentence explaining why this transition exists at all.',
  strength: 'moderate' as const,
  evidenceStatus,
  evidenceIds: evidenceStatus === 'insufficient' ? [] : ['metric.one'],
  counterEvidenceIds: evidenceStatus === 'contested' ? ['metric.two'] : [],
  patterns: [],
  ...overrides,
})

/** Builds a structurally valid loop, assigning the given status to each of the 5 edges. */
const loopWith = (statuses: TransitionEvidenceStatusT[], roles: readonly LoopRoleT[] = LOOP_ROLES) => ({
  id: 'test-loop',
  name: 'Test Loop',
  type: 'viral' as const,
  thesis: 'A sufficiently long thesis sentence stating what this loop actually is.',
  speed: {
    band: 'days' as const,
    note: 'A sufficiently long note describing what one full turn of the loop looks like.',
    evidenceIds: [],
  },
  nodes: roles.map(node),
  edges: roles.map((role, i) => edge(role, roles[(i + 1) % roles.length], statuses[i])),
  boundaryConditions: 'A sufficiently long sentence describing when this loop stops working.',
  patterns: [],
})

const E = 'evidenced' as const
const P = 'partially-evidenced' as const
const C = 'contested' as const
const I = 'insufficient' as const

/* -------------------------------------------------------------------------- */
/* A–D: valid loops, derived status                                            */
/* -------------------------------------------------------------------------- */

describe('derived loop status', () => {
  it('A — fully evidenced loop is valid and derives fully-evidenced', () => {
    const parsed = Loop.safeParse(loopWith([E, E, E, E, E]))
    expect(parsed.success).toBe(true)
    expect(deriveLoopStatus(loopWith([E, E, E, E, E]).edges)).toBe('fully-evidenced')
  })

  it('B — evidence-bounded loop is valid and derives evidence-bounded', () => {
    const fixture = loopWith([E, E, E, I, I])
    expect(Loop.safeParse(fixture).success).toBe(true)
    expect(deriveLoopStatus(fixture.edges)).toBe('evidence-bounded')
  })

  it('C — partially evidenced loop derives partially-evidenced', () => {
    const fixture = loopWith([E, E, E, E, P])
    expect(Loop.safeParse(fixture).success).toBe(true)
    expect(deriveLoopStatus(fixture.edges)).toBe('partially-evidenced')
  })

  it('D — contested loop derives contested', () => {
    const fixture = loopWith([E, E, E, E, C])
    expect(Loop.safeParse(fixture).success).toBe(true)
    expect(deriveLoopStatus(fixture.edges)).toBe('contested')
  })

  it('D2 — contested outranks insufficient when both are present', () => {
    expect(deriveLoopStatus(loopWith([C, I, E, E, E]).edges)).toBe('contested')
  })

  it('summary reports counts and unresolved transitions', () => {
    const summary = summariseLoopStatus(loopWith([E, E, E, I, I]) as never)
    expect(summary.status).toBe('evidence-bounded')
    expect(summary.counts.insufficient).toBe(2)
    expect(summary.unresolvedTransitions).toHaveLength(2)
  })
})

/* -------------------------------------------------------------------------- */
/* E–G: structural invariants still fail                                       */
/* -------------------------------------------------------------------------- */

describe('structural invariants are unchanged', () => {
  it('E — four roles fails', () => {
    const fourRoles = LOOP_ROLES.slice(0, 4) as unknown as readonly LoopRoleT[]
    const parsed = Loop.safeParse(loopWith([E, E, E, E], fourRoles))
    expect(parsed.success).toBe(false)
  })

  it('F — six roles fails', () => {
    const fixture = loopWith([E, E, E, E, E])
    fixture.nodes.push(node('acquisition'))
    expect(Loop.safeParse(fixture).success).toBe(false)
  })

  it('G — an invalid role such as "retention" fails', () => {
    const fixture = loopWith([E, E, E, E, E]) as unknown as { nodes: { role: string }[] }
    fixture.nodes[0].role = 'retention'
    expect(Loop.safeParse(fixture).success).toBe(false)
  })

  it('J — a self-referencing transition fails', () => {
    const fixture = loopWith([E, E, E, E, E])
    fixture.edges.push(edge('output', 'output', E) as never)
    expect(Loop.safeParse(fixture).success).toBe(false)
  })
})

/* -------------------------------------------------------------------------- */
/* H–I: evidence obligations scale with the claim                              */
/* -------------------------------------------------------------------------- */

describe('evidence obligations', () => {
  it('H — an insufficient transition needs no evidence ids', () => {
    const fixture = loopWith([E, E, E, E, I])
    expect(fixture.edges[4].evidenceIds).toHaveLength(0)
    expect(Loop.safeParse(fixture).success).toBe(true)
  })

  it('I — an evidenced transition with no evidence ids fails', () => {
    const fixture = loopWith([E, E, E, E, E])
    fixture.edges[4].evidenceIds = []
    const parsed = Loop.safeParse(fixture)
    expect(parsed.success).toBe(false)
  })

  it('I2 — a partially-evidenced transition with no evidence ids fails', () => {
    const fixture = loopWith([E, E, E, E, P])
    fixture.edges[4].evidenceIds = []
    expect(Loop.safeParse(fixture).success).toBe(false)
  })

  it('I3 — a contested transition without counter-evidence fails', () => {
    const fixture = loopWith([E, E, E, E, C])
    fixture.edges[4].counterEvidenceIds = []
    expect(Loop.safeParse(fixture).success).toBe(false)
  })
})
