import type { Metadata } from 'next'
import { RevealObserver } from '../../components/chrome/Reveal'
import { brandFor } from '../../lib/brand'
import { loadPatterns } from '../../lib/content'
import { logoFor } from '../../lib/screens'
import '../../components/home/home.css'

export const metadata: Metadata = {
  title: 'Patterns',
  description: 'Product mechanisms that show up in more than one teardown, defined once and traced to where each product uses them.',
}

const FAMILY: Record<string, string> = {
  acquisition: 'Acquisition',
  retention: 'Retention',
  monetization: 'Monetisation',
  defensibility: 'Defensibility',
  distribution: 'Distribution',
}

const RELATION: Record<string, [string, string]> = {
  requires: ['requires', 'is required by'],
  enables: ['enables', 'is enabled by'],
  'tensions-with': 'is in tension with|is in tension with'.split('|') as [string, string],
  'variant-of': ['is a variant of', 'has a variant in'],
  'anti-pattern-of': ['is the anti-pattern of', 'has an anti-pattern in'],
}

const SECTION_LABEL: Record<string, string> = {
  'business-model': 'Business model',
  'growth-loops': 'Growth loops',
  moats: 'Moats',
  product: 'The product',
  users: 'Users',
  bets: 'Bets',
}

export default function PatternsPage() {
  const patterns = loadPatterns()
  const name = new Map(patterns.map((p) => [p.slug, p.name]))

  return (
    <div className="home patterns-page">
      <RevealObserver />
      <section className="home-sec pat-hero">
        <span className="kicker kicker-accent">Patterns</span>
        <h1 className="home-h2 pat-h1">The same moves, in different products.</h1>
        <p className="home-sec-sub pat-lede">
          A pattern is a mechanism you can reuse. Each one here is defined without naming a product, then traced to exactly
          where each teardown shows it. The product list is derived from the teardowns, never typed in by hand, so it cannot
          claim more than the teardowns do.
        </p>
        <nav className="pat-index" aria-label="Patterns on this page">
          {patterns.map((p) => (
            <a key={p.slug} href={`#${p.slug}`}>
              <span className="pat-index-fam">{FAMILY[p.family]}</span>
              {p.name}
              <span className="pat-index-n">{p.products.length}</span>
            </a>
          ))}
        </nav>
      </section>

      {patterns.map((p) => (
        <section key={p.slug} id={p.slug} className="home-sec pattern-card" data-reveal>
          <div className="pat-top">
            <span className="pill" data-family={p.family}>
              {FAMILY[p.family]}
            </span>
            <span className="pat-shape">{p.mechanism.shape.replace(/-/g, ' ')}</span>
          </div>
          <h2 className="pat-name">{p.name}</h2>
          <p className="pat-def">{p.definition}</p>
          <p className="pat-mech">{p.mechanism.summary}</p>

          <div className="pat-where">
            <span className="kicker">Where it shows up</span>
            {p.products.length === 0 ? (
              <p className="pat-none">No published teardown shows this pattern yet.</p>
            ) : (
              <ul>
                {p.products.map((m) => {
                  const logo = logoFor(m.slug)
                  const accent = brandFor(m.slug).palette[0]
                  return (
                    <li key={m.slug} style={{ ['--pa' as string]: accent }}>
                      <a href={`/products/${m.slug}#${m.section}`} className="pat-prod">
                        <span className="pat-prod-name">
                          {logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img className="tcard-logo" src={logo} alt="" aria-hidden="true" />
                          ) : null}
                          {m.name}
                          <span className="pat-prod-sec">{SECTION_LABEL[m.section] ?? m.section} →</span>
                        </span>
                        {m.note ? <span className="pat-prod-note">{m.note}</span> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="pat-cols">
            <div>
              <span className="kicker">It works when</span>
              <ul className="pat-list">
                {p.preconditions.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="kicker">It breaks when</span>
              <ul className="pat-list pat-list-fail">
                {p.failureModes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pat-anti">
            <span className="kicker">The anti-pattern: {p.antiPattern.name}</span>
            <p>{p.antiPattern.description}</p>
          </div>

          {p.relationships.length + p.inbound.length > 0 ? (
            <div className="pat-rel">
              <span className="kicker">Related</span>
              <ul>
                {p.relationships.map((r) => (
                  <li key={`o-${r.target}`}>
                    This {RELATION[r.relation]?.[0] ?? r.relation} <a href={`#${r.target}`}>{name.get(r.target)}</a>.{' '}
                    <span className="pat-rel-why">{r.rationale}</span>
                  </li>
                ))}
                {p.inbound.map((r) => (
                  <li key={`i-${r.from}`}>
                    This {RELATION[r.relation]?.[1] ?? r.relation} <a href={`#${r.from}`}>{name.get(r.from)}</a>.{' '}
                    <span className="pat-rel-why">{r.rationale}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}
