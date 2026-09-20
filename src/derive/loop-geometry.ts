/**
 * Growth Loop geometry — computed at build time, consumed by the renderer.
 *
 * The renderer performs ZERO geometry (renderer contract §2). This module converts a
 * validated Loop into a complete drawable model: node positions on the fixed pentagon,
 * edge path `d` strings, and per-edge evidence status carried through so presentation
 * derives from data, never from a hardcoded product-specific state.
 *
 * Per ADR-001 / renderer contract §3–4: an edge whose evidenceStatus is `insufficient`
 * is emitted with `gap: true` and a shortened path that visibly does not reach its
 * target — the open ring is drawn open by construction, not by CSS trickery.
 */

import { LOOP_ROLES, type LoopRoleT, type TransitionEvidenceStatusT } from '../schema/enums'
import type { LoopT } from '../schema/loop'
import { deriveLoopStatus, summariseLoopStatus, type LoopStatusSummary } from './loop-status'

const VIEW = 400
const CX = VIEW / 2
const CY = VIEW / 2
const R = 130
/** Radial bulge for edge control points — gently convex ring, not a hard pentagon. */
const BULGE = 1.22
/** Fraction of an insufficient edge actually drawn before the visible gap. */
const GAP_DRAWN = 0.55

export interface NodeGeom {
  role: LoopRoleT
  label: string
  detail: string
  metricIds: string[]
  x: number
  y: number
  /** Percentage coordinates for the HTML button overlay. */
  xPct: number
  yPct: number
  labelAnchor: 'start' | 'middle' | 'end'
}

export interface EdgeGeom {
  from: LoopRoleT
  to: LoopRoleT
  label: string
  mechanism: string
  note?: string
  evidenceStatus: TransitionEvidenceStatusT
  strength?: string
  evidenceIds: string[]
  counterEvidenceIds: string[]
  /** Full path when established; truncated path when gap = true. */
  d: string
  /** True for `insufficient`: the drawn path stops short and the ring is open here. */
  gap: boolean
  /** Midpoint for the status glyph and gap marker. */
  midX: number
  midY: number
}

export interface LoopRenderModel {
  id: string
  name: string
  type: string
  thesis: string
  speedBand: string
  speedNote: string
  viewBox: string
  nodes: NodeGeom[]
  edges: EdgeGeom[]
  summary: LoopStatusSummary
}

function pos(index: number): { x: number; y: number } {
  const angle = (-90 + index * 72) * (Math.PI / 180)
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) }
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Point on a quadratic Bézier at t. */
function qPoint(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, t: number) {
  const mt = 1 - t
  return {
    x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
  }
}

export function buildLoopRenderModel(loop: LoopT): LoopRenderModel {
  const byRole = new Map(loop.nodes.map((n) => [n.role, n]))

  const nodes: NodeGeom[] = LOOP_ROLES.map((role, i) => {
    const { x, y } = pos(i)
    const n = byRole.get(role)
    if (!n) throw new Error(`loop-geometry: role "${role}" missing — schema validation should have failed`)
    return {
      role,
      label: n.label,
      detail: n.detail,
      metricIds: n.metricIds,
      x,
      y,
      xPct: (x / VIEW) * 100,
      yPct: (y / VIEW) * 100,
      labelAnchor: x < CX - 8 ? 'end' : x > CX + 8 ? 'start' : 'middle',
    }
  })

  const roleIndex = new Map(LOOP_ROLES.map((r, i) => [r, i]))

  const edges: EdgeGeom[] = loop.edges.map((edge) => {
    const a = pos(roleIndex.get(edge.from)!)
    const b = pos(roleIndex.get(edge.to)!)
    // Control point: midpoint pushed radially outward for a convex arc.
    const mx = (a.x + b.x) / 2
    const my = (a.y + b.y) / 2
    const cx = CX + (mx - CX) * BULGE
    const cy = CY + (my - CY) * BULGE

    const gap = edge.evidenceStatus === 'insufficient'
    let d: string
    if (gap) {
      // Draw only part of the arc, leaving a visible opening before the target node.
      const end = qPoint(a.x, a.y, cx, cy, b.x, b.y, GAP_DRAWN)
      const c2 = { x: lerp(a.x, cx, GAP_DRAWN), y: lerp(a.y, cy, GAP_DRAWN) }
      d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
    } else {
      d = `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
    }

    const mid = qPoint(a.x, a.y, cx, cy, b.x, b.y, 0.5)

    return {
      from: edge.from,
      to: edge.to,
      label: edge.label,
      mechanism: edge.mechanism,
      note: edge.note,
      evidenceStatus: edge.evidenceStatus,
      strength: edge.strength,
      evidenceIds: edge.evidenceIds,
      counterEvidenceIds: edge.counterEvidenceIds,
      d,
      gap,
      midX: mid.x,
      midY: mid.y,
    }
  })

  return {
    id: loop.id,
    name: loop.name,
    type: loop.type,
    thesis: loop.thesis,
    speedBand: loop.speed.band,
    speedNote: loop.speed.note,
    viewBox: `0 0 ${VIEW} ${VIEW}`,
    nodes,
    edges,
    summary: summariseLoopStatus(loop),
  }
}

export { deriveLoopStatus }
