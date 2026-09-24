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

/** Bar widths for the schema's share bands. Deliberately coarse: bands are estimates. */
const SHARE_WIDTH: Record<string, number> = { dominant: 100, major: 72, significant: 44, niche: 18 }

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
      if (product.users.segments.length === 0) {
        return <GapCard title="Who uses it is not established yet." body="No source describes the user base." />
      }
      return (
        <div className="stack">
          <div className="segbars" aria-label="Relative size of each segment, our estimate">
            <span className="kicker">Relative size · our estimate from the evidence, not a measured share</span>
            {product.users.segments.map((seg) => (
              <div key={seg.id} className="segbar" data-primary={seg.isPrimary}>
                <span className="segbar-name">
                  {seg.name}
                  {seg.isPrimary ? <span className="segbar-primary">primary</span> : null}
                </span>
                <span className="segbar-track" aria-hidden="true">
                  <span className="segbar-fill" style={{ width: `${SHARE_WIDTH[seg.shareBand]}%` }} />
                </span>
                <span className="segbar-band">{seg.shareBand}</span>
              </div>
            ))}
          </div>
          <div className="segs">
            {product.users.segments.map((seg) => (
              <div key={seg.id} className="seg" data-primary={seg.isPrimary}>
                <span className="seg-name">{seg.name}</span>
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
              <div className="forces4" aria-label="The four forces on this switch">
                <div className="f4 f4-push">
                  <span className="f4-k">Push · away from the old way</span>
                  <p>{job.forces.push}</p>
                </div>
                <div className="f4 f4-pull">
                  <span className="f4-k">Pull · toward this product</span>
                  <p>{job.forces.pull}</p>
                </div>
                <div className="f4-core" aria-hidden="true">
                  <span>switch</span>
                </div>
                <div className="f4 f4-anxiety">
                  <span className="f4-k">Anxiety · about the new way</span>
                  <p>{job.forces.anxiety}</p>
                </div>
                <div className="f4 f4-habit">
                  <span className="f4-k">Habit · of the old way</span>
                  <p>{job.forces.habit}</p>
                </div>
              </div>
              <p className="job-alt">
                <span className="kicker">Instead of</span> {job.competingAlternatives.map((a) => a.name).join(' · ')}
              </p>
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
      const tiles = bm.evidenceIds
        .map((eid) => evidence.get(eid))
        .filter((e): e is EvidenceEntryT => Boolean(e && (e.display || e.value.length <= 28)))
        .slice(0, 3)
      return (
        <div className="stack">
          <div className="ladder" aria-label="The pricing ladder, lowest to highest">
            {bm.pricing.tiers.map((t, i) => (
              <div key={t.name} className="rung" style={{ ['--h' as string]: String(Math.round(24 + (i * 72) / Math.max(1, bm.pricing.tiers.length - 1))) }}>
                <div className="rung-bar" aria-hidden="true" />
                <div className="rung-body">
                  <div className="rung-name">{t.name}</div>
                  <div className="rung-price">{t.priceNote}</div>
                  <ul className="rung-gates">{t.gates.map((g) => <li key={g}>{g}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
          <div className="revmix" aria-label="Where the money comes from, our estimate">
            <span className="kicker">Where the money comes from · relative weight, our estimate</span>
            {bm.revenueLines.map((r) => (
              <div key={r.id} className="segbar">
                <span className="segbar-name">{r.name}</span>
                <span className="segbar-track" aria-hidden="true">
                  <span className="segbar-fill" style={{ width: `${SHARE_WIDTH[r.shareBand]}%` }} />
                </span>
                <span className="segbar-band">{r.shareBand}</span>
              </div>
            ))}
          </div>
          {tiles.length > 0 ? <div className="tiles">{tiles.map((e) => <MetricTile key={e.id} entry={e} />)}</div> : null}
          <p className="moment">
            <span className="kicker">The moment it starts charging</span>
            {bm.monetizationMoment}
          </p>
        </div>
      )
    }

    case 'moats':
      return null // MoatStack renders the structured state

    case 'bets':
      return (
        <div className="stack">
          <ol className="timeline" aria-label="Turning points">
            {strategy.inflections.map((f) => (
              <li key={f.id} className="tl-item">
                <span className="tl-year">{f.year}</span>
                <span className="tl-dot" aria-hidden="true" />
                <span className="tl-label">{f.label}</span>
                <span className="tl-why">{f.whyItMattered}</span>
              </li>
            ))}
          </ol>
          <BetsChain bets={strategy.bets} evidence={evidence} />
        </div>
      )

    case 'verdict': {
      const loop = data.loops.loops.find((l) => l.id === data.loops.primaryLoopId)
      const proven = loop?.edges.find((e) => e.evidenceStatus === 'evidenced')
      const documented = loop?.edges.find((e) => e.evidenceStatus === 'partially-evidenced')
      const bet = strategy.bets[0]
      const { profile } = data
      return (
        <div className="verdict-card">
          {/* The page already leads with the thesis; the card closes on what would overturn it. */}
          {product.verdict?.changeMyMind ? (
            <>
              <span className="kicker kicker-accent">What would change my mind</span>
              <p className="verdict-thesis">{product.verdict.changeMyMind}</p>
            </>
          ) : (
            <>
              <span className="kicker kicker-accent">Our call</span>
              <p className="verdict-thesis">{product.thesis}</p>
            </>
          )}
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
