/**
 * The Growth Loop engine contract.
 *
 * STRUCTURAL FRAMEWORK ≠ EMPIRICALLY ESTABLISHED MECHANISM.
 *
 * The canonical five-role ring is a framework: it states what a growth loop would have
 * to look like for any product. Its structural completeness is required. It asserts
 * nothing about whether the mechanism has been established for a given product — that
 * is carried per transition by `evidenceStatus`, and rolled up by the derive stage into
 * a loop-level status that is never authored by hand.
 *
 * A structurally present edge is therefore NOT evidence that the transition occurs.
 * Conflating the two is the defect this model exists to prevent, and it is why a loop
 * may be structurally valid while remaining evidence-bounded.
 *
 * A loop is exactly five nodes, one per canonical role, connected by edges that must
 * close the ring. Three structural invariants are enforced here and nowhere else:
 *
 *   1. Exactly five nodes — `.length(5)` plus a one-per-role check.
 *   2. The ring closes structurally — all five canonical transitions are present.
 *   3. Edges reference roles that exist and never point at themselves.
 *
 * Nodes are addressed by role rather than by an arbitrary id. Since roles are unique
 * within a loop, this removes an entire class of dangling-reference bug and makes the
 * content readable without cross-checking ids.
 *
 * File: content/products/<slug>/loops.json
 */

import { z } from 'zod'
import {
  CANONICAL_LOOP_EDGES,
  EdgeStrength,
  EvidenceIdList,
  findDuplicates,
  Label,
  LeakSeverity,
  Line,
  LOOP_ROLES,
  LoopRole,
  LoopSpeedBand,
  LoopType,
  SectionId,
  Slug,
  TransitionEvidenceStatus,
  TwoSentences,
  Unestablished,
  type LoopRoleT,
} from './enums'

/* -------------------------------------------------------------------------- */
/* Pattern references                                                          */
/* -------------------------------------------------------------------------- */

/**
 * A pattern reference attached at the exact point of manifestation. The precision of
 * this reference is what lets a pattern page say "Stripe · Growth Loops · the
 * docs-to-first-call edge" instead of "Stripe (somewhere)".
 *
 * Defined here rather than in pattern.ts to keep the dependency graph acyclic:
 * products reference patterns, patterns never reference products.
 */
export const PatternRef = z
  .object({
    slug: Slug,
    manifestsAt: SectionId,
    /** Optional dot-path into the containing object, for the evidence card excerpt. */
    fieldPath: z.string().trim().max(120).optional(),
    /** One line on how this pattern shows up *here* specifically. */
    note: Line.optional(),
  })
  .strict()

export type PatternRefT = z.infer<typeof PatternRef>

export const PatternRefList = z.array(PatternRef).default([])

/* -------------------------------------------------------------------------- */
/* Loop parts                                                                  */
/* -------------------------------------------------------------------------- */

export const LoopLeak = z
  .object({
    severity: LeakSeverity,
    /** What escapes the loop at this point. */
    description: TwoSentences,
    /** What the company does about it, or explicitly does not do. */
    mitigation: TwoSentences,
    evidenceIds: EvidenceIdList,
  })
  .strict()

export const LoopNode = z
  .object({
    role: LoopRole,
    label: Label,
    /** What actually happens at this step, concretely. */
    detail: TwoSentences,
    /** Figures that characterise this step, by evidence id. */
    metricIds: EvidenceIdList,
    patterns: PatternRefList,
  })
  .strict()

export type LoopNodeT = z.infer<typeof LoopNode>

export const LoopEdge = z
  .object({
    from: LoopRole,
    to: LoopRole,
    /** A noun phrase naming what travels along this edge. */
    label: Label,
    /**
     * The sentence that carries the analysis: *why* this arrow exists. Edge labels are
     * nouns; mechanisms are arguments. This is the field the hover tooltip surfaces.
     *
     * A mechanism is a PROPOSED mechanism. Whether it is established is carried by
     * `evidenceStatus`, not by the mechanism being written down.
     */
    mechanism: TwoSentences,

    /**
     * How forceful the mechanism is IF IT OPERATES. This is a claim about the world.
     *
     * Orthogonal to `evidenceStatus`, which is a claim about our knowledge. The pairing
     * `strength: strong` with `evidenceStatus: insufficient` is conceptually coherent —
     * a hypothesised powerful mechanism we cannot yet establish — but it is a real
     * theoretical assertion and should only be made deliberately.
     *
     * Optional, and NOT defaulted. An unevidenced mechanism is not thereby a weak one,
     * and silently recording it as weak would smuggle a judgment in through a default.
     * Where the author has no basis for assessing force, omit the field.
     */
    strength: EdgeStrength.optional(),

    /**
     * The metric the analyst would watch to know whether this link is working (ADR-004).
     * A proposal, not a finding: it names the measurement that would move this edge's
     * evidenceStatus, which is the most useful thing a reader can take from an open link.
     */
    watch: Line.optional(),

    /**
     * Whether the evidence establishes this transition. The structural presence of an
     * edge is never itself evidence — that conflation is what this field exists to
     * prevent.
     */
    evidenceStatus: TransitionEvidenceStatus,

    evidenceIds: EvidenceIdList,

    /** Required when `evidenceStatus` is "contested": the evidence pointing the other way. */
    counterEvidenceIds: EvidenceIdList,

    /** Why the transition carries this status — especially why it is insufficient. */
    note: TwoSentences.optional(),

    patterns: PatternRefList,
    leak: LoopLeak.optional(),
  })
  .strict()
  .superRefine((edge, ctx) => {
    if (edge.from === edge.to) {
      ctx.addIssue({
        code: 'custom',
        path: ['to'],
        message: `An edge cannot point at its own role ("${edge.from}").`,
      })
    }

    /* --- Evidence obligations scale with the strength of the claim -------------- */
    if (
      (edge.evidenceStatus === 'evidenced' || edge.evidenceStatus === 'partially-evidenced') &&
      edge.evidenceIds.length === 0
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['evidenceIds'],
        message: `A transition marked "${edge.evidenceStatus}" must cite at least one evidence id. If no evidence supports it, the correct status is "insufficient".`,
      })
    }

    if (edge.evidenceStatus === 'contested') {
      if (edge.evidenceIds.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['evidenceIds'],
          message: 'A "contested" transition must cite the evidence supporting it.',
        })
      }
      if (edge.counterEvidenceIds.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['counterEvidenceIds'],
          message:
            'A "contested" transition must cite the counter-evidence. Without evidence on both sides the status is not contested — it is evidenced, partially evidenced, or insufficient.',
        })
      }
    }

    /* --- Strength is required only where a mechanism is claimed to operate ------ */
    if (
      (edge.evidenceStatus === 'evidenced' || edge.evidenceStatus === 'partially-evidenced') &&
      edge.strength === undefined
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['strength'],
        message: `A transition marked "${edge.evidenceStatus}" asserts that the mechanism operates, so its force must be assessed. Omit strength only where evidenceStatus is "insufficient".`,
      })
    }

    /*
     * "insufficient" deliberately imposes NO evidence obligation and NO strength
     * obligation. Requiring citations to record an absence would push authors toward
     * inventing a mechanism to satisfy the validator; defaulting strength to "weak"
     * would smuggle in a judgment the evidence does not support. Insufficient means we
     * cannot establish the mechanism — not that the mechanism is feeble.
     * A note is encouraged but not compelled.
     */
  })

export type LoopEdgeT = z.infer<typeof LoopEdge>

export const LoopSpeed = z
  .object({
    /**
     * Cycle time band, or `unestablished` where the evidence does not support one.
     * Inventing a band to satisfy a required enum would assert a cadence nobody
     * measured, so the same single uncertainty value used by the Strategic Profile
     * applies here.
     */
    band: z.union([LoopSpeedBand, Unestablished]),
    /**
     * What one full turn of the loop looks like in practice — and, where the band is
     * `unestablished`, why it cannot be determined. Always required, so an uncertainty
     * state can never be recorded without its reason.
     */
    note: TwoSentences,
    evidenceIds: EvidenceIdList,
  })
  .strict()

/* -------------------------------------------------------------------------- */
/* Loop                                                                        */
/* -------------------------------------------------------------------------- */

export const Loop = z
  .object({
    id: Slug,
    name: Label,
    type: LoopType,
    /** One or two sentences stating what this loop actually is. */
    thesis: TwoSentences,
    speed: LoopSpeed,

    nodes: z.array(LoopNode).length(5, 'A growth loop must have exactly five nodes, one per canonical role.'),

    edges: z.array(LoopEdge).min(5, 'A growth loop needs at least the five transitions that close the ring.'),

    /** When this loop stops working. Required — every loop has boundary conditions. */
    boundaryConditions: TwoSentences,

    patterns: PatternRefList,
  })
  .strict()
  .superRefine((loop, ctx) => {
    /* --- Invariant 1: exactly one node per canonical role --------------------- */
    const roles = loop.nodes.map((node) => node.role)
    const duplicateRoles = findDuplicates(roles, (role) => role)
    if (duplicateRoles.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['nodes'],
        message: `Duplicate loop roles: ${duplicateRoles.join(', ')}. Each of the five roles must appear exactly once.`,
      })
    }

    const missingRoles = LOOP_ROLES.filter((role) => !roles.includes(role))
    if (missingRoles.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['nodes'],
        message: `Missing loop roles: ${missingRoles.join(', ')}. The five roles are fixed by the framework and cannot be omitted or replaced.`,
      })
    }

    /* --- Invariant 2: every edge references a role present in this loop ------- */
    const presentRoles = new Set<LoopRoleT>(roles)
    loop.edges.forEach((edge, index) => {
      if (!presentRoles.has(edge.from)) {
        ctx.addIssue({
          code: 'custom',
          path: ['edges', index, 'from'],
          message: `Edge references role "${edge.from}", which has no node in this loop.`,
        })
      }
      if (!presentRoles.has(edge.to)) {
        ctx.addIssue({
          code: 'custom',
          path: ['edges', index, 'to'],
          message: `Edge references role "${edge.to}", which has no node in this loop.`,
        })
      }
    })

    /* --- Invariant 3: the ring closes ---------------------------------------- */
    const edgeKeys = new Set(loop.edges.map((edge) => `${edge.from}->${edge.to}`))
    const missingTransitions = CANONICAL_LOOP_EDGES.filter(
      ([from, to]) => !edgeKeys.has(`${from}->${to}`),
    ).map(([from, to]) => `${from} -> ${to}`)

    if (missingTransitions.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['edges'],
        message: `The canonical ring is structurally incomplete. Missing transitions: ${missingTransitions.join('; ')}. Every transition must be present as a structural edge. If the evidence does not establish one, set its evidenceStatus to "insufficient" — do not omit the edge, and do not invent a mechanism to fill it.`,
      })
    }

    /* --- Housekeeping: no duplicate edges ------------------------------------ */
    const duplicateEdges = findDuplicates(loop.edges, (edge) => `${edge.from}->${edge.to}`)
    if (duplicateEdges.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['edges'],
        message: `Duplicate edges: ${duplicateEdges.join(', ')}. Merge them into a single edge with one mechanism.`,
      })
    }
  })

export type LoopT = z.infer<typeof Loop>

/* -------------------------------------------------------------------------- */
/* File                                                                        */
/* -------------------------------------------------------------------------- */

export const LoopsFile = z
  .object({
    $schema: z.string().optional(),
    /** The loop shown first, and the one lifted onto the landing page. */
    primaryLoopId: Slug,
    loops: z.array(Loop).min(1, 'A product must have at least one documented growth loop.').max(4),
  })
  .strict()
  .superRefine((file, ctx) => {
    const duplicates = findDuplicates(file.loops, (loop) => loop.id)
    if (duplicates.length > 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['loops'],
        message: `Duplicate loop ids: ${duplicates.join(', ')}.`,
      })
    }

    if (!file.loops.some((loop) => loop.id === file.primaryLoopId)) {
      ctx.addIssue({
        code: 'custom',
        path: ['primaryLoopId'],
        message: `primaryLoopId "${file.primaryLoopId}" does not match any loop in this file. Available: ${file.loops
          .map((loop) => loop.id)
          .join(', ')}.`,
      })
    }
  })

export type LoopsFileT = z.infer<typeof LoopsFile>
