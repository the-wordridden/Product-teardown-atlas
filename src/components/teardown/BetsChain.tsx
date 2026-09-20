/**
 * Bets & Tensions chain — Tier 1 interactive from the Section 3 spec.
 *
 * BET → EXPECTED ADVANTAGE → TRADE-OFF → RESULT → CURRENT TENSION, with Result and
 * Tension collapsed by default (the spec's one deliberate reveal: the reader forms a
 * view before seeing what happened). Native <details>, zero JS.
 */

import type { EvidenceEntryT } from '../../schema/evidence'
import type { StrategicBetT } from '../../schema/strategy'

const STATUS: Record<StrategicBetT['status'], string> = {
  'paid-off': 'Paid off',
  mixed: 'Mixed',
  unresolved: 'Unresolved',
  backfired: 'Backfired',
}

export function BetsChain({ bets, evidence }: { bets: StrategicBetT[]; evidence: Map<string, EvidenceEntryT> }) {
  if (bets.length === 0) {
    return (
      <div className="gap-card">
        <span className="gap-card-kicker">Evidence gap</span>
        <p className="gap-card-title">No strategic bet has a complete evidence chain.</p>
      </div>
    )
  }
  return (
    <div className="bets">
      {bets.map((bet) => (
        <article key={bet.id} className="bet" data-status={bet.status}>
          <header className="bet-head">
            <h4 className="bet-title">{bet.title}</h4>
            <span className="pill pill-status">{STATUS[bet.status]}</span>
          </header>
          <ol className="chain">
            <li className="chain-step">
              <span className="chain-label">Bet</span>
              <p>{bet.bet}</p>
            </li>
            <li className="chain-step">
              <span className="chain-label">Expected advantage · company claim</span>
              <p>{bet.expectedAdvantage}</p>
            </li>
            <li className="chain-step">
              <span className="chain-label">Trade-off · disclosed</span>
              <p>{bet.tradeoff}</p>
            </li>
            <li className="chain-step chain-reveal">
              <details>
                <summary>
                  <span className="chain-label">Result</span>
                  <span className="reveal-hint">Reveal</span>
                </summary>
                <p>{bet.result}</p>
              </details>
            </li>
            <li className="chain-step chain-reveal">
              <details>
                <summary>
                  <span className="chain-label">Current tension</span>
                  <span className="reveal-hint">Reveal</span>
                </summary>
                <p>{bet.currentTension}</p>
              </details>
            </li>
          </ol>
          <footer className="bet-foot">
            {bet.evidenceIds.map((id) => {
              const e = evidence.get(id)
              return e ? (
                <span key={id} className="pill pill-ev" data-confidence={e.confidence} title={e.claim}>
                  {e.value}
                </span>
              ) : null
            })}
          </footer>
        </article>
      ))}
    </div>
  )
}
