/**
 * Moat stack — with a first-class empty state.
 *
 * When `moats` is empty the component renders the analytically correct proposition —
 * "No defensibility mechanism established from the available evidence" — and NEVER any
 * categorical equivalent. Capability discussion (capability evidenced ≠ moat evidenced)
 * lives in the MDX content layer, not in this component.
 */

import type { MoatT } from '../../schema/strategy'

const DURABILITY_LABEL: Record<MoatT['durability'], string> = {
  'copyable-in-6-months': 'Copyable in ~6 months',
  'copyable-with-sustained-effort': 'Copyable with sustained effort',
  'structurally-hard': 'Structurally hard to copy',
  'effectively-permanent': 'Effectively permanent',
}

export function MoatStack({ moats }: { moats: MoatT[] }) {
  return (
    <div className="moat-stack">
      {moats.length === 0 ? (
        <section className="evidence-gap" aria-label="Moat evidence status">
          <header className="evidence-gap-head">
            <span className="evidence-gap-label">
              No defensibility mechanism established from the available evidence
            </span>
            <span className="evidence-gap-hint">Not established is not disproved</span>
          </header>
          <div className="evidence-gap-body">
            <p>
              A moat claim in this Atlas requires a named mechanism, evidence that it operates, a
              replication-difficulty argument, and a named attack vector. No candidate cleared all
              four. The capabilities below are evidenced: as capabilities.
            </p>
          </div>
        </section>
      ) : (
        <ol className="moat-list">
          {moats.map((moat) => (
            <li key={moat.id} className="moat-item">
              <h4>{moat.claim}</h4>
              <p>{moat.argument}</p>
              <p className="moat-meta">
                <span className="moat-durability">{DURABILITY_LABEL[moat.durability]}</span>
                {' · '}
                <span className="moat-attack">Attack vector: {moat.attackVector}</span>
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
