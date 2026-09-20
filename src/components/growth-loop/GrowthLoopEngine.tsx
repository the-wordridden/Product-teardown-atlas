'use client'

/**
 * Growth Loop Engine — flagship interactive, implemented against
 * docs/renderer-contract-growth-loop.md and ADR-001.
 *
 * The component consumes a build-time LoopRenderModel and performs no geometry and no
 * status derivation (contract §2, prohibition 5). Presentation derives entirely from
 * per-edge `evidenceStatus` in the data — there is no Figma-specific code path.
 *
 * Contract obligations implemented here:
 *  - four transition states distinguishable WITHOUT colour alone: stroke pattern
 *    (solid / dashed / dotted / alternating) + glyph (● ◐ ○ ◆) + text label
 *  - an evidence-bounded ring is VISIBLY OPEN before any interaction: insufficient
 *    edges are truncated by the geometry layer and capped with an open-gap marker
 *  - no pulse animation unless the loop is fully evidenced (prohibition 6)
 *  - mechanisms on insufficient edges are introduced as "Proposed mechanism"
 *  - accessibility: HTML buttons overlay a presentational SVG; DOM order = loop
 *    order; each control's accessible name carries its evidence status
 */

import { useId, useState } from 'react'
import type { EdgeGeom, LoopRenderModel, NodeGeom } from '../../derive/loop-geometry'
import type { TransitionEvidenceStatusT } from '../../schema/enums'
import './growth-loop.css'

const STATUS_GLYPH: Record<TransitionEvidenceStatusT, string> = {
  evidenced: '●',
  'partially-evidenced': '◐',
  contested: '◆',
  insufficient: '○',
}

const STATUS_LABEL: Record<TransitionEvidenceStatusT, string> = {
  evidenced: 'Evidenced',
  'partially-evidenced': 'Partially evidenced',
  contested: 'Contested',
  insufficient: 'Insufficient evidence',
}

const LOOP_STATUS_LABEL: Record<string, string> = {
  'fully-evidenced': 'Fully evidenced loop',
  'partially-evidenced': 'Partially evidenced loop',
  'evidence-bounded': 'Evidence-bounded loop: the ring does not close on current evidence',
  contested: 'Contested loop: evidence conflicts on at least one transition',
}

type Selection = { kind: 'node'; node: NodeGeom } | { kind: 'edge'; edge: EdgeGeom } | null

export function GrowthLoopEngine({ model }: { model: LoopRenderModel }) {
  const [selected, setSelected] = useState<Selection>(null)
  const headingId = useId()
  const status = model.summary.status
  const animate = status === 'fully-evidenced' // prohibition 6: never animate an open ring

  return (
    <figure className="gl" data-loop-status={status} aria-labelledby={headingId}>
      <figcaption className="gl-head">
        <h3 id={headingId} className="gl-name">
          {model.name}
        </h3>
        <p className="gl-status" role="status">
          <span className="gl-status-badge">{LOOP_STATUS_LABEL[status]}</span>
        </p>
        <p className="gl-thesis">{model.thesis}</p>
        <p className="gl-speed">
          Cycle time:{' '}
          {model.speedBand === 'unestablished' ? (
            <span className="gl-unestablished">unestablished</span>
          ) : (
            model.speedBand
          )}{' '}
          <span className="gl-speed-note">{model.speedNote}</span>
        </p>
        <div className="gl-bar" role="img" aria-label={`${model.summary.counts.evidenced} of 5 transitions evidenced`}>
          {model.edges.map((e) => (
            <span key={`${e.from}-${e.to}`} data-status={e.evidenceStatus} />
          ))}
        </div>
      </figcaption>

      <div className="gl-layout">
      <div className="gl-stage">
        {/* Presentational layer only — all interaction lives in the button overlay. */}
        <svg viewBox={model.viewBox} className="gl-svg" aria-hidden="true" focusable="false">
          <g className="gl-edges">
            {model.edges.map((edge) => (
              <g key={`${edge.from}-${edge.to}`} data-status={edge.evidenceStatus}>
                <path className="gl-edge-path" d={edge.d} data-status={edge.evidenceStatus} data-animate={animate} />
                {edge.gap ? (
                  /* Open-gap cap: small perpendicular tick where the drawn path ends,
                     marking the break in the ring independent of colour. */
                  <circle className="gl-gap-cap" cx={edge.midX} cy={edge.midY} r="0" />
                ) : null}
                <text className="gl-edge-glyph" x={edge.midX} y={edge.midY} textAnchor="middle" dy="0.35em">
                  {STATUS_GLYPH[edge.evidenceStatus]}
                </text>
              </g>
            ))}
          </g>
          <g className="gl-nodes">
            {model.nodes.map((node) => (
              <g key={node.role}>
                <circle className="gl-node-dot" cx={node.x} cy={node.y} r="13" data-selected={selected?.kind === 'node' && selected.node.role === node.role} />
                <text className="gl-node-label" x={node.x} y={node.y + 30} textAnchor={node.labelAnchor === 'middle' ? 'middle' : node.labelAnchor} >
                  {roleTitle(node.role)}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Accessible control layer: ordered by loop sequence. */}
        <ol className="gl-overlay">
          {model.nodes.map((node) => (
            <li key={node.role} style={{ left: `${node.xPct}%`, top: `${node.yPct}%` }}>
              <button
                type="button"
                className="gl-hit"
                aria-expanded={selected?.kind === 'node' && selected.node.role === node.role}
                onClick={() =>
                  setSelected((cur) => (cur?.kind === 'node' && cur.node.role === node.role ? null : { kind: 'node', node }))
                }
              >
                <span className="sr-only">{`${roleTitle(node.role)}: ${node.label}`}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Transition list: the same data as the ring, in reading order — the primary
          surface for keyboard and screen-reader users, not a fallback. */}
      <div>
      <ol className="gl-transitions">
        {model.edges.map((edge) => {
          const isSel = selected?.kind === 'edge' && selected.edge.from === edge.from && selected.edge.to === edge.to
          return (
            <li key={`${edge.from}-${edge.to}`}>
              <button
                type="button"
                className="gl-transition"
                data-status={edge.evidenceStatus}
                aria-expanded={isSel}
                onClick={() => setSelected(isSel ? null : { kind: 'edge', edge })}
              >
                <span aria-hidden="true" className="gl-t-glyph">
                  {STATUS_GLYPH[edge.evidenceStatus]}
                </span>
                <span className="gl-t-route">
                  {roleTitle(edge.from)} → {roleTitle(edge.to)}
                </span>
                <span className="gl-t-status">{STATUS_LABEL[edge.evidenceStatus]}</span>
              </button>
            </li>
          )
        })}
      </ol>
      </div>

      {selected ? <DetailPanel selection={selected} onClose={() => setSelected(null)} /> : null}
      </div>

      <p className="gl-legend" aria-hidden="true">
        ● evidenced&ensp;◐ partially evidenced&ensp;◆ contested&ensp;○ insufficient: ring drawn open where evidence
        does not establish the transition
      </p>
    </figure>
  )
}

function DetailPanel({ selection, onClose }: { selection: NonNullable<Selection>; onClose: () => void }) {
  if (selection.kind === 'node') {
    const { node } = selection
    return (
      <div className="gl-panel" role="region" aria-label={`${roleTitle(node.role)} detail`}>
        <button type="button" className="gl-panel-close" onClick={onClose} aria-label="Close detail">
          ×
        </button>
        <h4>{roleTitle(node.role)}</h4>
        <p className="gl-panel-label">{node.label}</p>
        <p>{node.detail}</p>
      </div>
    )
  }
  const { edge } = selection
  const proposed = edge.evidenceStatus === 'insufficient'
  return (
    <div className="gl-panel" role="region" aria-label={`Transition ${edge.from} to ${edge.to} detail`} data-status={edge.evidenceStatus}>
      <button type="button" className="gl-panel-close" onClick={onClose} aria-label="Close detail">
        ×
      </button>
      <h4>
        {roleTitle(edge.from)} → {roleTitle(edge.to)}
      </h4>
      <p className="gl-panel-status">{STATUS_LABEL[edge.evidenceStatus]}</p>
      <p>
        <strong>{proposed ? 'Proposed mechanism (not established): ' : 'Mechanism: '}</strong>
        {edge.mechanism}
      </p>
      {edge.note ? <p className="gl-panel-note">{edge.note}</p> : null}
      {edge.strength ? <p className="gl-panel-note">Assessed force if operating: {edge.strength}</p> : null}
    </div>
  )
}

function roleTitle(role: string): string {
  return role
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}
