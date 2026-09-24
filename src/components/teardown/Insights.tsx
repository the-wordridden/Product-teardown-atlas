/**
 * Three analyst blocks added by ADR-004, each labelled as ours:
 *
 *   MetricsCard      the north-star and activation metrics I would own
 *   CompetitionCard  who a customer would pick instead, and why, with sources
 *   TrustBox         how far to trust this page, stated once instead of in every section
 */

import type { EvidenceEntryT } from '../../schema/evidence'
import type { ProductFileT } from '../../schema/product'
import { EvidenceChip } from '../evidence/EvidenceChip'

type Metrics = NonNullable<ProductFileT['metrics']>
type Competition = NonNullable<ProductFileT['competition']>

export function MetricsCard({ metrics }: { metrics: Metrics }) {
  const rows = [
    { key: 'north', label: 'North-star metric', m: metrics.northStar },
    { key: 'activation', label: 'Activation metric', m: metrics.activation },
  ]
  return (
    <div className="mx" aria-label="Metrics I would own">
      <span className="kicker kicker-accent">If I ran it, I would own these · our proposal</span>
      <div className="mx-grid">
        {rows.map(({ key, label, m }) => (
          <div key={key} className="mx-card" data-kind={key}>
            <span className="mx-label">{label}</span>
            <strong className="mx-name">{m.name}</strong>
            <p className="mx-def">{m.definition}</p>
            <p className="mx-why">
              <span className="kicker">Why this one</span> {m.why}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CompetitionCard({
  productName,
  competition,
  evidence,
}: {
  productName: string
  competition: Competition
  evidence: Map<string, EvidenceEntryT>
}) {
  return (
    <div className="cx" aria-label="Who it competes with">
      <span className="kicker kicker-accent">Who a customer would pick instead · our read</span>
      <div className="cx-table" role="table">
        <div className="cx-row cx-head" role="row">
          <span role="columnheader">Alternative</span>
          <span role="columnheader">Why they pick it</span>
          <span role="columnheader">Why they pick {productName}</span>
        </div>
        {competition.map((c) => (
          <div key={c.name} className="cx-row" role="row">
            <span className="cx-name" role="cell">
              {c.name}
            </span>
            <span className="cx-them" role="cell">
              {c.theyWin}
            </span>
            <span className="cx-us" role="cell">
              {c.weWin}{' '}
              {c.evidenceIds.map((id) => {
                const e = evidence.get(id)
                return e ? <EvidenceChip key={id} entry={e} /> : null
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TrustBox({
  ceiling,
  unverified,
  openQuestions,
}: {
  ceiling: string
  unverified?: string
  openQuestions: string[]
}) {
  return (
    <details className="trust" data-reveal>
      <summary>
        <span className="trust-mark" aria-hidden="true">
          ◐
        </span>
        <span className="trust-title">How far to trust this page</span>
        <span className="trust-line">{ceiling.split('. ')[0]}.</span>
      </summary>
      <div className="trust-body">
        <p>{ceiling}</p>
        {unverified ? (
          <p>
            <strong>The most important thing nobody outside can verify:</strong> {unverified.charAt(0).toLowerCase() + unverified.slice(1)}
          </p>
        ) : null}
        {openQuestions.length > 0 ? (
          <>
            <span className="kicker">Still open</span>
            <ul>
              {openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </>
        ) : null}
        <p className="trust-key">
          <span aria-hidden="true">●</span> verified from a primary source&ensp;
          <span aria-hidden="true">◐</span> reported by the company or the press&ensp;
          <span aria-hidden="true">○</span> estimated. Hover any mark in the text to see its source.
        </p>
      </div>
    </details>
  )
}
