import { CanvasArt } from '../components/art/CanvasArt'
import { RevealObserver } from '../components/chrome/Reveal'
import { CountUp, RotatingWord, SplitWords, Spotlight, Tilt } from '../components/home/Kinetic'
import { MetricTile } from '../components/teardown/SectionSummary'
import { brandFor, brandVars } from '../lib/brand'
import { listProductSlugs, loadProduct } from '../lib/content'
import { SECTION_IDS } from '../schema'
import type { EvidenceEntryT } from '../schema/evidence'
import '../components/home/home.css'

const STEP_BLURB: Record<string, string> = {
  vitals: 'Who they are, how big, who holds the votes.',
  problem: 'The world before, and what changed.',
  users: 'Who shows up, and what the packaging tells you.',
  jtbd: 'What teams hire it for, in their own words.',
  product: 'How the machine actually works.',
  'business-model': 'Where the money enters and what it costs to keep.',
  'growth-loops': 'How one user turns into the next, and where that chain is proven.',
  moats: 'What would stop a rival.',
  bets: 'The choices, what they cost, and the tension left behind.',
  verdict: 'Our call, in one sentence you can argue with.',
}

function human(v: string) {
  return v.replace(/-/g, ' ')
}

export default function HomePage() {
  const products = listProductSlugs().map((slug) => {
    const data = loadProduct(slug)
    const loop = data.loops.loops.find((l) => l.id === data.loops.primaryLoopId)!
    const proven = loop.edges.find((e) => e.evidenceStatus === 'evidenced')
    const numbers = data.product.vitals.keyMetricIds.map((id) => data.evidence.get(id)).filter(Boolean) as EvidenceEntryT[]
    const motion = data.profile.distributionMotion.classification
    const metric = data.profile.valueMetric.classification
    return {
      slug,
      product: data.product,
      brand: brandFor(slug),
      proven,
      numbers,
      bet: data.strategy.bets[0],
      inflections: data.strategy.inflections,
      tags: [motion !== 'unestablished' ? human(motion) : null, metric !== 'unestablished' ? `priced by ${human(metric)}` : null].filter(Boolean) as string[],
      evidenceCount: data.evidence.size,
    }
  })
  const totalEvidence = products.reduce((n, p) => n + p.evidenceCount, 0)
  const totalInflections = products.reduce((n, p) => n + p.inflections.length, 0)
  const sectionTitles = products[0]?.product.sections ?? []
  const bandA = sectionTitles.filter((s) => s.id !== 'vitals').map((s) => s.title)
  const closeBand = Array.from({ length: 4 }, () => products.flatMap((p) => [`${p.product.name} teardown`, '→'])).flat()

  return (
    <div className="home">
      <RevealObserver />

      {/* ------------------------------------------------ HERO */}
      <Spotlight className="home-hero">
        <div className="home-eyebrow">
          <span className="dot" aria-hidden="true" />
          <span className="kicker">Product Teardown Atlas</span>
        </div>
        <h1 className="home-h1">
          <SplitWords text="Learn how great products" />
          <br />
          <span className="thin">actually</span> <RotatingWord words={['think.', 'grow.', 'charge.', 'defend.', 'get stuck.']} />
        </h1>
        <p className="home-lede">
          Deep teardowns of products you already use: the problem they picked, who really pays, how one user turns into the next, and what would stop a rival. Opinionated, sourced, built to be argued with.
        </p>
        <div className="home-ctas">
          <a className="btn btn-primary" href="#teardowns">
            Read a teardown <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#method">
            The ten questions
          </a>
        </div>
      </Spotlight>

      {/* ------------------------------------------------ BAND */}
      <div className="band" aria-hidden="true">
        <div className="band-row a">
          {[...bandA, ...bandA].map((t, i) => (
            <span key={i} className={i % 2 ? 'hi' : undefined}>{t}</span>
          ))}
        </div>
        <div className="band-row b">
          {['How they think', '·', 'How they grow', '·', 'How they charge', '·', 'How they defend', '·', 'Where they get stuck', '·', 'How they think', '·', 'How they grow', '·', 'How they charge', '·', 'How they defend', '·', 'Where they get stuck', '·'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------ TEARDOWNS */}
      <section id="teardowns" className="home-sec" data-reveal>
        <div className="home-sec-head">
          <span className="home-sec-num">01</span>
          <h2 className="home-h2">Teardowns</h2>
          <p className="home-sec-sub">One product at a time, done properly. Each opens on our take, then goes as deep as you want.</p>
        </div>
        <div className="cards">
          {products.map(({ slug, product, brand, tags }) => (
            <Tilt key={slug}>
              <a href={`/products/${slug}`} className="tcard" style={brandVars(brand) as React.CSSProperties}>
                <div>
                  <div className="tcard-band" aria-hidden="true" />
                  <div className="hero-top" style={{ marginTop: 'var(--sp-4)' }}>
                    <span className="kicker">{human(product.vitals.category)}</span>
                    <span className="chips">
                      {tags.map((t) => (
                        <span key={t} className="pill">{t}</span>
                      ))}
                    </span>
                  </div>
                  <h3 className="tcard-name">{product.name}</h3>
                </div>
                <div className="tcard-art">
                  <CanvasArt motif={brand.motif} palette={brand.palette} />
                </div>
                <div>
                  <p className="tcard-thesis">
                    <span className="hero-thesis-label">Our take</span>
                    {product.thesis}
                  </p>
                  <div className="tcard-foot">
                    <span className="hero-updated" style={{ margin: 0 }}>Updated {product.lastUpdated}</span>
                    <span className="tcard-cta">
                      Open teardown <span className="arrow">→</span>
                    </span>
                  </div>
                </div>
              </a>
            </Tilt>
          ))}
          <Tilt>
            <div className="tcard tcard-soon">
              <div>
                <div className="tcard-band" aria-hidden="true" style={{ background: 'var(--rule-strong)' }} />
                <div className="hero-top" style={{ marginTop: 'var(--sp-4)' }}>
                  <span className="kicker">next up</span>
                </div>
                <h3 className="tcard-name">Stripe</h3>
              </div>
              <p className="tcard-thesis">Developer infrastructure, a very different engine. In research now.</p>
              <div className="tcard-foot">
                <span className="hero-updated" style={{ margin: 0 }}>In research</span>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* ------------------------------------------------ HIGHLIGHTS */}
      {products.map(({ slug, product, numbers, proven, bet, inflections }) => (
        <section key={slug} className="home-sec" data-reveal>
          <div className="home-sec-head">
            <span className="home-sec-num">02</span>
            <h2 className="home-h2">{product.name}, in brief</h2>
            <p className="home-sec-sub">Straight out of the teardown. Every number links to where it came from.</p>
          </div>
          <div className="brief">
            <div className="tiles brief-numbers">
              {numbers.map((e) => (
                <MetricTile key={e.id} entry={e} />
              ))}
            </div>
            <div className="brief-grid">
              <a href={`/products/${slug}#growth-loops`} className="brief-item">
                <span className="kicker">The growth engine</span>
                <p>{proven ? proven.label : 'Not established yet'}</p>
                <span className="brief-more">See the loop →</span>
              </a>
              {bet ? (
                <a href={`/products/${slug}#bets`} className="brief-item">
                  <span className="kicker">The bet in play</span>
                  <p>{bet.title}</p>
                  <span className="brief-more">What it costs →</span>
                </a>
              ) : null}
              <a href={`/products/${slug}#bets`} className="brief-item">
                <span className="kicker">Turning points</span>
                <ul className="brief-years">
                  {inflections.map((f) => (
                    <li key={f.id}>
                      <span className="brief-year">{f.year}</span> {f.label}
                    </li>
                  ))}
                </ul>
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* ------------------------------------------------ METHOD STRIP */}
      <section id="method" className="home-sec" data-reveal>
        <div className="home-sec-head">
          <span className="home-sec-num">03</span>
          <h2 className="home-h2">Ten questions, every time</h2>
          <p className="home-sec-sub">Every teardown walks the same ten sections in the same order, so two products can be laid side by side.</p>
        </div>
        <div className="steps">
          {SECTION_IDS.map((id, i) => {
            const t = sectionTitles.find((s) => s.id === id)?.title ?? id
            return (
              <div key={id} className="step" tabIndex={0}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <span className="t">{t}</span>
                <span className="d">{STEP_BLURB[id]}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------ STATS */}
      <section className="home-sec" data-reveal>
        <div className="stats">
          <div className="stat">
            <div className="v"><CountUp to={products.length} /></div>
            <div className="k">Teardowns published. Slowly, on purpose.</div>
          </div>
          <div className="stat">
            <div className="v"><CountUp to={totalEvidence} /></div>
            <div className="k">Sources opened by hand. Filings, docs, first-hand accounts.</div>
          </div>
          <div className="stat">
            <div className="v"><CountUp to={10} /></div>
            <div className="k">Questions per teardown. Always the same ten.</div>
          </div>
          <div className="stat">
            <div className="v"><CountUp to={totalInflections} /></div>
            <div className="k">Turning points traced back to what actually happened.</div>
          </div>
        </div>
        <p className="home-howto">
          How to read one: plain text is what a source says, <em>inference</em> is what it suggests, and our calls are marked as ours. Hover any ● to open the source.
        </p>
      </section>

      {/* ------------------------------------------------ CLOSE */}
      <div className="band" aria-hidden="true">
        <div className="band-row a">
          {closeBand.map((t, i) => (
            <span key={i} className={t === '→' ? 'hi' : undefined}>{t}</span>
          ))}
        </div>
      </div>
      <section className="home-close" data-reveal>
        <h2 className="home-h2">
          <SplitWords text="Start with the one that's ready." />
        </h2>
        <div className="home-ctas" style={{ justifyContent: 'center' }}>
          {products[0] ? (
            <a className="btn btn-primary" href={`/products/${products[0].slug}`}>
              {products[0].product.name} teardown <span className="arrow">→</span>
            </a>
          ) : null}
        </div>
      </section>
    </div>
  )
}
