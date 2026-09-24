/**
 * The 60-second version: what a reader should be able to say out loud after the page.
 *
 * Four lines of the analyst's synthesis, the patterns this product exhibits, and a way
 * straight to interview practice. Nothing here introduces a claim that is not argued in
 * a section below; each row names the section where the argument lives.
 */

import type { ProductFileT } from '../../schema/product'
import type { PatternRefT } from '../../schema/loop'

type Brief = NonNullable<ProductFileT['brief']>

const ROWS: { key: keyof Brief; label: string; section: string }[] = [
  { key: 'grows', label: 'How it grows', section: 'growth-loops' },
  { key: 'earns', label: 'How it makes money', section: 'business-model' },
  { key: 'tradeoff', label: 'The trade-off it made', section: 'bets' },
  { key: 'unverified', label: 'What nobody outside can verify', section: 'verdict' },
]

export function QuickTake({
  brief,
  patterns,
  patternNames,
  hasInterview,
}: {
  brief: Brief
  patterns: PatternRefT[]
  patternNames: Map<string, string>
  hasInterview: boolean
}) {
  return (
    <section className="qt" aria-labelledby="qt-title" data-reveal>
      <div className="qt-head">
        <span className="kicker kicker-accent">If you only have a minute</span>
        <h2 id="qt-title" className="qt-title">
          The 60-second version
        </h2>
      </div>
      <dl className="qt-rows">
        {ROWS.map((r) => (
          <div key={r.key} className="qt-row" data-kind={r.key}>
            <dt>
              <a href={`#${r.section}`}>{r.label}</a>
            </dt>
            <dd>{brief[r.key]}</dd>
          </div>
        ))}
      </dl>
      <div className="qt-foot">
        {patterns.length > 0 ? (
          <div className="qt-patterns">
            <span className="kicker">Patterns you can reuse</span>
            <div className="qt-chips">
              {patterns.map((p) => (
                <a key={p.slug} className="qt-chip" href={`/patterns#${p.slug}`} title={p.note}>
                  {patternNames.get(p.slug) ?? p.slug}
                </a>
              ))}
            </div>
          </div>
        ) : null}
        {hasInterview ? (
          <a className="btn btn-primary qt-cta" href="#for-pms">
            Practise the interview questions <span className="arrow">→</span>
          </a>
        ) : null}
      </div>
    </section>
  )
}
