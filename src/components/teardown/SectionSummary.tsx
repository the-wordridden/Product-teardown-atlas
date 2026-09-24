/**
 * Per-section structured summary — the "shape first" layer.
 *
 * Every card is rendered from JSON fields the schema already validated. Nothing here
 * introduces a claim; it only gives the structured data a visual form ahead of the
 * collapsed prose. Empty arrays render as first-class evidence-gap cards.
 */

import type { LoadedProduct } from '../../lib/content'
import type { SectionEvidence } from '../../lib/section-status'
import type { SectionIdT } from '../../schema/enums'
import type { EvidenceEntryT } from '../../schema/evidence'
import { EvidenceChip } from '../evidence/EvidenceChip'
import { BetsChain } from './BetsChain'
import { axisPhrase, durabilityLabel, moatTypeLabel } from '../../lib/labels'

const GLYPH: Record<EvidenceEntryT['confidence'], string> = { verified: '●', reported: '◐', estimated: '○' }

export function MetricTile({ entry }: { entry: EvidenceEntryT }) {
  return (
    <div className="tile" data-confidence={entry.confidence}>
      <div className="tile-value">{entry.display ?? entry.value}</div>
      <div className="tile-claim">{entry.claim}</div>
      <div className="tile-meta">
        <span aria-hidden="true">{GLYPH[entry.confidence]}</span> {entry.confidence} · as of {entry.asOf}
      </div>
    </div>
  )
}

function GapCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="gap-card">
      <span className="gap-card-kicker">Evidence gap · not established is not disproved</span>
      <p className="gap-card-title">{title}</p>
      <p className="gap-card-body">{body}</p>
    </div>
  )
}

function titleCase(v: string) {
  return v.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')
}

export function SectionSummary({
  id,
  data,
  statuses,
}: {
  id: SectionIdT
  data: LoadedProduct
  statuses: Record<SectionIdT, SectionEvidence>
}) {
  const { product, strategy, evidence } = data

  switch (id) {
    case 'vitals': {
      const tiles = product.vitals.keyMetricIds.map((eid) => evidence.get(eid)).filter(Boolean) as EvidenceEntryT[]
      return <div className="tiles">{tiles.map((e) => <MetricTile key={e.id} entry={e} />)}</div>
    }

    case 'problem': {
      const p = product.problem
      return (
        <div className="split">
          <div className="split-col">
            <span className="kicker">Before</span>
            <p>{p.beforeState}</p>
          </div>
          <div className="split-arrow" aria-hidden="true">→</div>
          <div className="split-col">
            <span className="kicker">After · stated intent</span>
            <p>{p.afterState}</p>
          </div>
          <div className="split-foot">
            <span className="pill pill-accent">Why now · {p.whyNow.trigger}</span>
            <span className="split-foot-text">{p.whyNow.change}</span>
          </div>
        </div>
      )
    }

    case 'users': {
      const total = evidence.get('paid-customers.total.q1-2026')
      const tenK = evidence.get('paid-customers.10k.q2-2026')
      if (product.users.segments.length === 0) {
        return (
          <div className="stack">
            <div className="tiles">{total ? <MetricTile entry={total} /> : null}{tenK ? <MetricTile entry={tenK} /> : null}</div>
            <GapCard title="Who uses it is not established yet." body="Role types are visible through seat packaging. Composition is not disclosed." />
          </div>
        )
      }
      return (
        <div className="stack">
          <div className="segs">
            {product.users.segments.map((seg) => (
              <div key={seg.id} className="seg" data-primary={seg.isPrimary}>
                <div className="seg-head">
                  <span className="seg-name">{seg.name}</span>
                  <span className="pill">{seg.shareBand}{seg.isPrimary ? ' · primary' : ''}</span>
                </div>
                <p className="seg-desc">{seg.description}</p>
              </div>
            ))}
          </div>
          {product.users.powerUser ? (
            <div className="power">
              <span className="kicker">Power user</span>
              <p>{product.users.powerUser.profile}</p>
              <ul className="power-list">{product.users.powerUser.behaviours.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ) : null}
          <div className="tiles">{total ? <MetricTile entry={total} /> : null}{tenK ? <MetricTile entry={tenK} /> : null}</div>
        </div>
      )
    }

    case 'jtbd':
      if (product.jtbd.jobs.length === 0) {
        return <GapCard title="No job statement can be defended yet." body="Every candidate fails on at least four of five components." />
      }
      return (
        <div className="jobs">
          {product.jtbd.jobs.map((job) => (
            <div key={job.id} className="job">
              <p className="job-statement">{job.statement}</p>
              <dl className="forces">
                <div><dt>Push</dt><dd>{job.forces.push}</dd></div>
                <div><dt>Pull</dt><dd>{job.forces.pull}</dd></div>
                <div><dt>Anxiety</dt><dd>{job.forces.anxiety}</dd></div>
                <div><dt>Habit</dt><dd>{job.forces.habit}</dd></div>
              </dl>
              <p className="job-alt"><span className="kicker">Instead of</span> {job.competingAlternatives.map((a) => a.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )

    case 'product': {
      const pr = product.product
      return (
        <div className="stack">
          {pr.coreObjects.length > 0 ? (
            <div className="objacts">
              <div>
                <span className="kicker">Objects</span>
                <div className="chips">{pr.coreObjects.map((o) => <span key={o} className="pill pill-accent">{o}</span>)}</div>
              </div>
              <div>
                <span className="kicker">Actions</span>
                <div className="chips">{pr.coreActions.map((a) => <span key={a} className="pill">{a}</span>)}</div>
              </div>
            </div>
          ) : null}
          {pr.atomicUnitOfValue ? <p className="moment"><span className="kicker">Unit of value</span>{pr.atomicUnitOfValue}</p> : null}
          {pr.ahaMoment ? <p className="moment"><span className="kicker">The moment it clicks</span>{pr.ahaMoment.description}</p> : null}
          <div>
            <span className="kicker">Surfaces</span>
            <div className="chips">{pr.keySurfaces.map((s) => <span key={s.name} className="pill" title={s.purpose}>{s.name}</span>)}</div>
          </div>
        </div>
      )
    }

    case 'business-model': {
      const bm = product.businessModel
      const gm25 = evidence.get('gross-margin.fy2025')
      const gm24 = evidence.get('gross-margin.fy2024')
      const cor = evidence.get('cost-of-revenue.fy2025')
      return (
        <div className="stack">
          <div className="tiers">
            {bm.pricing.tiers.map((t) => (
              <div key={t.name} className="tier">
                <div className="tier-name">{t.name}</div>
                <div className="tier-price">{t.priceNote}</div>
                <ul className="tier-gates">{t.gates.map((g) => <li key={g}>{g}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="tiles">
            {gm24 ? <MetricTile entry={gm24} /> : null}
            {gm25 ? <MetricTile entry={gm25} /> : null}
            {cor ? <MetricTile entry={cor} /> : null}
          </div>
          <p className="moment">
            <span className="kicker">Monetisation moment</span>
            {bm.monetizationMoment}
          </p>
        </div>
      )
    }

    case 'moats':
      return null // MoatStack renders the structured state

    case 'bets':
      return <BetsChain bets={strategy.bets} evidence={evidence} />

    case 'verdict': {
      const loop = data.loops.loops.find((l) => l.id === data.loops.primaryLoopId)
      const proven = loop?.edges.find((e) => e.evidenceStatus === 'evidenced')
      const documented = loop?.edges.find((e) => e.evidenceStatus === 'partially-evidenced')
      const bet = strategy.bets[0]
      const { profile } = data
      return (
        <div className="verdict-card">
          <span className="kicker kicker-accent">Our call</span>
          <p className="verdict-thesis">{product.thesis}</p>
          <div className="verdict-grid">
            <div>
              <span className="kicker">How it grows</span>
              <p>
                {proven
                  ? proven.label
                  : documented
                    ? `${documented.label} (documented, not yet measured)`
                    : 'Not established from the evidence yet'}
              </p>
            </div>
            <div>
              <span className="kicker">How it sells</span>
              <p>{axisPhrase('distributionMotion', profile.distributionMotion.classification)}.</p>
            </div>
            <div>
              <span className="kicker">How it charges</span>
              <p>
                {axisPhrase('valueMetric', profile.valueMetric.classification)}.{' '}
                {axisPhrase('buyerUserAlignment', profile.buyerUserAlignment.classification)}.
              </p>
            </div>
            <div>
              <span className="kicker">What would stop a rival</span>
              <p>
                {strategy.moats.length > 0
                  ? `${moatTypeLabel(strategy.moats[0].type)}: ${durabilityLabel(strategy.moats[0].durability).toLowerCase()}.`
                  : 'Nothing the evidence supports yet.'}
              </p>
            </div>
            <div>
              <span className="kicker">The bet in play</span>
              <p>{bet ? bet.title : 'No strategic bet documented'}</p>
            </div>
          </div>
          {product.verdict ? (
            <a className="verdict-jump" href="#for-pms">
              What they got right, what they got wrong, and what I'd do next <span className="arrow">→</span>
            </a>
          ) : null}
        </div>
      )
    }

    default:
      return null
  }
}

export { EvidenceChip, titleCase }
