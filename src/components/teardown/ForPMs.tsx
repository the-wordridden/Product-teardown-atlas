/**
 * For PMs: the teardown turned into things a product person can use.
 *
 * What the company got right and wrong (each point argued and cited), what I would do
 * next with the risk of doing it, and interview questions whose answer outlines are
 * hidden until the reader has tried. The verdict fields are pure JUDGMENT (L5); the
 * block is labelled as ours throughout.
 */

import type { EvidenceEntryT } from '../../schema/evidence'
import type { ProductFileT } from '../../schema/product'
import type { SectionIdT } from '../../schema/enums'
import { EvidenceChip } from '../evidence/EvidenceChip'

type Verdict = NonNullable<ProductFileT['verdict']>
type Interview = NonNullable<ProductFileT['interview']>

function Cites({ ids, evidence }: { ids: string[]; evidence: Map<string, EvidenceEntryT> }) {
  return (
    <>
      {ids.map((id) => {
        const e = evidence.get(id)
        return e ? <EvidenceChip key={id} entry={e} /> : null
      })}
    </>
  )
}

export function ForPMs({
  productName,
  verdict,
  interview,
  evidence,
  sectionTitle,
}: {
  productName: string
  verdict?: Verdict
  interview?: Interview
  evidence: Map<string, EvidenceEntryT>
  sectionTitle: Map<SectionIdT, string>
}) {
  if (!verdict && !interview) return null
  return (
    <section id="for-pms" className="pms" aria-labelledby="pms-title" data-reveal>
      <header className="pms-head">
        <span className="sec-num">PM</span>
        <h2 id="pms-title" className="sec-title">
          For PMs
        </h2>
        <span className="pill pill-status pill-quiet" data-status="judgment">
          Our call
        </span>
      </header>
      <p className="sec-standfirst">
        {productName}, turned into things you can use: what they got right, what they got wrong, what I would do next, and
        questions to practise on. What nothing public can settle is in "How far to trust this page", at the top.
      </p>

      {verdict ? (
        <div className="pms-grid">
          <div className="pms-col" data-kind="right">
            <h3 className="pms-col-title">
              <span aria-hidden="true">✓</span> What they got right
            </h3>
            <ol>
              {verdict.getRight.map((p) => (
                <li key={p.id}>
                  <strong>{p.claim}</strong>
                  <p>
                    {p.argument} <Cites ids={p.evidenceIds} evidence={evidence} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="pms-col" data-kind="wrong">
            <h3 className="pms-col-title">
              <span aria-hidden="true">✕</span> What they got wrong
            </h3>
            <ol>
              {verdict.getWrong.map((p) => (
                <li key={p.id}>
                  <strong>{p.claim}</strong>
                  <p>
                    {p.argument} <Cites ids={p.evidenceIds} evidence={evidence} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div className="pms-col" data-kind="next">
            <h3 className="pms-col-title">
              <span aria-hidden="true">→</span> What I would do next
            </h3>
            <ol>
              {verdict.whatIdDoNext.map((m) => (
                <li key={m.id}>
                  <strong>{m.move}</strong>
                  <p>{m.rationale}</p>
                  <p className="pms-risk">
                    <span className="kicker">The risk</span> {m.risk}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : null}

      {interview && interview.length > 0 ? (
        <div className="pms-practice">
          <h3 className="pms-practice-title">Practise on these</h3>
          <p className="pms-practice-sub">Try answering out loud first. Then open the outline to see what a strong answer covers.</p>
          <ol className="pms-qs">
            {interview.map((q, i) => (
              <li key={q.id} className="pms-q">
                <details>
                  <summary>
                    <span className="pms-q-n">Q{i + 1}</span>
                    <span className="pms-q-text">{q.question}</span>
                    <span className="pms-q-hint">Show outline</span>
                  </summary>
                  <ol className="pms-outline">
                    {q.outline.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ol>
                  <a className="pms-q-src" href={`#${q.seeSection}`}>
                    The material is in {sectionTitle.get(q.seeSection) ?? q.seeSection} <span className="arrow">→</span>
                  </a>
                </details>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

    </section>
  )
}
