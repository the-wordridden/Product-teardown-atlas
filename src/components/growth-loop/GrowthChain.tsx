'use client'

/**
 * Growth Chain — the growth loop as a reader sees it, implemented against
 * docs/renderer-contract-growth-loop.md (v1.1, linear layout) and ADR-001.
 *
 * Five steps in reading order with the product's own labels, joined by links whose
 * drawing style comes from per-edge `evidenceStatus` in the data. The return link
 * (reinvestment back to acquisition) closes the chain into a loop underneath.
 *
 * Contract obligations kept from the ring renderer:
 *  - four link states distinguishable WITHOUT colour: line pattern + glyph + text
 *  - an evidence-bounded loop is VISIBLY OPEN before any interaction: an insufficient
 *    link is drawn as a broken connector, never a continuous arrow
 *  - no circulating animation unless the loop is fully evidenced
 *  - insufficient mechanisms are introduced as "Proposed mechanism"
 *  - no geometry, no status derivation, no product-specific code path
 *
 * What changed from the ring: the best-evidenced link opens by default, so the reader
 * meets the finding first and the caveats second.
 *
 * v1.2 (ADR-004): the default view is the analyst's MODEL of how the product grows, drawn
 * with confident solid links. The loop's openness stays visible before any interaction
 * through each link's evidence glyph and a "not yet shown" tag on insufficient links; the
 * EVIDENCE view, one click away, restores the pattern-encoded drawing. Every link also
 * names the metric the analyst would watch to move it.
 */

import { useId, useState } from 'react'
import type { EdgeGeom, LoopRenderModel, NodeGeom } from '../../derive/loop-geometry'
import type { TransitionEvidenceStatusT } from '../../schema/enums'
import './growth-chain.css'

export interface LoopSource {
  title: string
  publisher?: string
  url?: string
  confidence: 'verified' | 'reported' | 'estimated'
  asOf: string
}

const GLYPH: Record<TransitionEvidenceStatusT, string> = {
  evidenced: '●',
  'partially-evidenced': '◐',
  contested: '◆',
  insufficient: '○',
}

const STATUS_LABEL: Record<TransitionEvidenceStatusT, string> = {
  evidenced: 'Proven',
  'partially-evidenced': 'Partly proven',
  contested: 'Contested',
  insufficient: 'Not established',
}

const RANK: Record<TransitionEvidenceStatusT, number> = { evidenced: 0, 'partially-evidenced': 1, contested: 2, insufficient: 3 }

type Selection = { kind: 'node'; node: NodeGeom } | { kind: 'edge'; edge: EdgeGeom }

function roleTitle(role: string): string {
  return role.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
}

function edgeKey(e: EdgeGeom) {
  return `${e.from}-${e.to}`
}

export function GrowthChain({
  model,
  sources,
  productName,
  summary,
}: {
  model: LoopRenderModel
  sources: Record<string, LoopSource>
  productName: string
  /** One-line account of how the product grows, from the teardown's 60-second version. */
  summary?: string
}) {
  const headingId = useId()
  const [view, setView] = useState<'model' | 'evidence'>('model')
  const status = model.summary.status
  const proven = model.edges.filter((e) => e.evidenceStatus === 'evidenced')
  // Open on the best-supported link so the finding is visible before any click.
  const best = [...model.edges].sort((a, b) => RANK[a.evidenceStatus] - RANK[b.evidenceStatus])[0]
  const [selected, setSelected] = useState<Selection | null>(best ? { kind: 'edge', edge: best } : null)

  const forward = model.edges.slice(0, model.nodes.length - 1)
  const back = model.edges[model.edges.length - 1]

  const isSelEdge = (e: EdgeGeom) => selected?.kind === 'edge' && edgeKey(selected.edge) === edgeKey(e)
  const isSelNode = (n: NodeGeom) => selected?.kind === 'node' && selected.node.role === n.role
  const toggleEdge = (e: EdgeGeom) => setSelected(isSelEdge(e) ? null : { kind: 'edge', edge: e })
  const toggleNode = (n: NodeGeom) => setSelected(isSelNode(n) ? null : { kind: 'node', node: n })

  const partial = model.edges.filter((e) => e.evidenceStatus === 'partially-evidenced')
  const unshown = model.edges.filter((e) => e.evidenceStatus === 'insufficient')

  return (
    <figure className="gc" data-loop-status={status} data-view={view} aria-labelledby={headingId}>
      <figcaption className="gc-head">
        <span className="kicker">{model.name}</span>
        <h3 id={headingId} className="gc-headline">How {productName} grows</h3>
        {summary ? <p className="gc-summary">{summary}</p> : null}
        <div className="gc-bar">
          <p className="gc-sub">
            <span className="gc-count" data-status="evidenced">● {proven.length} proven</span>
            <span className="gc-count" data-status="partially-evidenced">◐ {partial.length} documented</span>
            <span className="gc-count" data-status="insufficient">○ {unshown.length} not yet shown</span>
            {model.speedBand !== 'unestablished' ? <span>cycle time {model.speedBand}</span> : null}
          </p>
          <div className="gc-toggle" role="group" aria-label="How to draw the loop">
            <button type="button" aria-pressed={view === 'model'} onClick={() => setView('model')}>
              The model
            </button>
            <button type="button" aria-pressed={view === 'evidence'} onClick={() => setView('evidence')}>
              The evidence
            </button>
          </div>
        </div>
        <p className="gc-hint">
          {view === 'model'
            ? 'How the loop is meant to work, in our reading. Each link carries its evidence mark; switch to the evidence view to see where it breaks.'
            : 'Drawn by what the sources establish: solid is proven, dashed is documented, dotted is not yet shown.'}
        </p>
      </figcaption>

      <ol className="gc-track" aria-label="Loop steps in order">
        {model.nodes.map((node, i) => {
          const edge = forward[i]
          return (
            <li key={node.role} className="gc-cell">
              <button
                type="button"
                className="gc-step"
                data-selected={isSelNode(node)}
                aria-expanded={isSelNode(node)}
                onClick={() => toggleNode(node)}
              >
                <span className="gc-step-role">
                  <span className="gc-step-n">{i + 1}</span> {roleTitle(node.role)}
                </span>
                <span className="gc-step-label">{node.label}</span>
              </button>
              {edge ? <Link edge={edge} selected={isSelEdge(edge)} onToggle={() => toggleEdge(edge)} /> : null}
            </li>
          )
        })}
      </ol>

      {back ? (
        <button
          type="button"
          className="gc-return"
          data-status={back.evidenceStatus}
          data-selected={isSelEdge(back)}
          aria-expanded={isSelEdge(back)}
          onClick={() => toggleEdge(back)}
        >
          <span className="gc-return-line" aria-hidden="true" />
          <span className="gc-return-text">
            <span aria-hidden="true">↺ </span>
            <span className="gc-link-glyph" aria-hidden="true">{GLYPH[back.evidenceStatus]}</span> {back.label}
            <span className="gc-link-status"> · {STATUS_LABEL[back.evidenceStatus]}</span>
            <span className="sr-only">, from {roleTitle(back.from)} back to {roleTitle(back.to)}</span>
          </span>
        </button>
      ) : null}

      {/* The same five links as a readable row; on narrow screens the arrows carry their own labels. */}
      <ol className="gc-linklist" aria-label="Links in order">
        {model.edges.map((edge, i) => (
          <li key={edgeKey(edge)}>
            <button
              type="button"
              className="gc-linkchip"
              data-status={edge.evidenceStatus}
              data-selected={isSelEdge(edge)}
              aria-expanded={isSelEdge(edge)}
              onClick={() => toggleEdge(edge)}
            >
              <span className="gc-linkchip-n">{i + 1}→{i + 2 > model.nodes.length ? 1 : i + 2}</span>
              <span className="gc-link-glyph" aria-hidden="true">{GLYPH[edge.evidenceStatus]}</span>
              <span className="gc-linkchip-label">{edge.label}</span>
              <span className="gc-link-status">{STATUS_LABEL[edge.evidenceStatus]}</span>
            </button>
          </li>
        ))}
      </ol>

      {selected ? <Detail selection={selected} sources={sources} onClose={() => setSelected(null)} /> : null}

      <p className="gc-legend" aria-hidden="true">
        ● proven by sources&ensp;◐ documented, not measured&ensp;◆ contested&ensp;○ not yet shown
      </p>
    </figure>
  )
}

function Link({ edge, selected, onToggle }: { edge: EdgeGeom; selected: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className="gc-link"
      data-status={edge.evidenceStatus}
      data-selected={selected}
      aria-expanded={selected}
      onClick={onToggle}
    >
      <span className="gc-link-line" aria-hidden="true">
        <span className="gc-link-seg" />
        <span className="gc-link-mid" data-gap={edge.gap}>{GLYPH[edge.evidenceStatus]}</span>
        <span className="gc-link-seg" />
        <span className="gc-link-head" />
      </span>
      <span className="gc-link-text">
        <span className="gc-link-glyph" aria-hidden="true">{GLYPH[edge.evidenceStatus]}</span> {edge.label}
      </span>
      <span className="gc-link-status">{STATUS_LABEL[edge.evidenceStatus]}</span>
      {edge.evidenceStatus === 'insufficient' ? <span className="gc-unshown">not yet shown</span> : null}
      <span className="sr-only">
        , {roleTitle(edge.from)} to {roleTitle(edge.to)}
      </span>
    </button>
  )
}

function Detail({ selection, sources, onClose }: { selection: Selection; sources: Record<string, LoopSource>; onClose: () => void }) {
  if (selection.kind === 'node') {
    const { node } = selection
    const ids = node.metricIds.filter((id) => sources[id])
    return (
      <div className="gc-detail" role="region" aria-label={`${roleTitle(node.role)} detail`}>
        <button type="button" className="gc-detail-close" onClick={onClose} aria-label="Close detail">×</button>
        <span className="kicker">Step · {roleTitle(node.role)}</span>
        <h4 className="gc-detail-title">{node.label}</h4>
        <p className="gc-detail-body">{node.detail}</p>
        {ids.length > 0 ? <Sources ids={ids} sources={sources} /> : null}
      </div>
    )
  }

  const { edge } = selection
  const proposed = edge.evidenceStatus === 'insufficient'
  const ids = edge.evidenceIds.filter((id) => sources[id])
  return (
    <div className="gc-detail" role="region" aria-label={`Link ${edge.from} to ${edge.to} detail`} data-status={edge.evidenceStatus}>
      <button type="button" className="gc-detail-close" onClick={onClose} aria-label="Close detail">×</button>
      <span className="kicker">
        {roleTitle(edge.from)} → {roleTitle(edge.to)} · {STATUS_LABEL[edge.evidenceStatus]}
        {edge.strength ? <> · {edge.strength} when it runs</> : null}
      </span>
      <h4 className="gc-detail-title">{edge.label}</h4>
      <p className="gc-detail-body">
        {proposed ? <strong>Proposed mechanism, not established. </strong> : null}
        {edge.mechanism}
      </p>
      {edge.note ? <p className="gc-detail-note">{edge.note}</p> : null}
      {edge.watch ? (
        <p className="gc-watch">
          <span className="kicker">The metric I would watch</span>
          {edge.watch}
        </p>
      ) : null}
      {ids.length > 0 ? <Sources ids={ids} sources={sources} /> : null}
    </div>
  )
}

function Sources({ ids, sources }: { ids: string[]; sources: Record<string, LoopSource> }) {
  return (
    <div className="gc-sources">
      <span className="kicker">Backed by</span>
      <ul>
        {ids.map((id) => {
          const s = sources[id]
          const text = `${s.title}${s.publisher ? `, ${s.publisher}` : ''}`
          return (
            <li key={id} data-confidence={s.confidence}>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noopener noreferrer">{text}</a>
              ) : (
                <span>{text}</span>
              )}
              <span className="gc-source-meta"> · {s.confidence} · {s.asOf}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
