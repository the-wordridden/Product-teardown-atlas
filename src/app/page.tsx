import { CanvasArt } from '../components/art/CanvasArt'
import { RevealObserver } from '../components/chrome/Reveal'
import { CountUp, RotatingWord, SplitWords, Spotlight, Tilt } from '../components/home/Kinetic'
import { MetricTile } from '../components/teardown/SectionSummary'
import { brandFor, brandVars } from '../lib/brand'
import { listProductSlugs, loadPatterns, loadProduct, loadUpcoming } from '../lib/content'
import { logoFor } from '../lib/screens'
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

const MOTION_TAG: Record<string, string> = {
  'bottom-up-end-user': 'bottom-up',
  'bottom-up-developer': 'developer-led',
  'product-led-hybrid': 'self-serve + sales',
  'sales-led': 'sales-led',
  'top-down-enterprise': 'enterprise-led',
}
const METRIC_TAG: Record<string, string> = {
  seats: 'per seat',
  usage: 'per use',
  transactions: 'per transaction',
  outcomes: 'per outcome',
  flat: 'flat fee',
}

function human(v: string) {
  return v.replace(/-/g, ' ')
}

export default function HomePage() {
  const products = listProductSlugs().map((slug) => {
    const data = loadProduct(slug)
    const loop = data.loops.loops.find((l) => l.id === data.loops.primaryLoopId)!
    const proven = loop.edges.find((e) => e.evidenceStatus === 'evidenced') ?? loop.edges.find((e) => e.evidenceStatus === 'partially-evidenced')
    const numbers = data.product.vitals.keyMetricIds.map((id) => data.evidence.get(id)).filter(Boolean) as EvidenceEntryT[]
    const motion = data.profile.distributionMotion.classification
    const metric = data.profile.valueMetric.classification
    return {
      slug,
      product: data.product,
      brand: brandFor(slug),
      logo: logoFor(slug),
      proven,
      numbers,
      bet: data.strategy.bets[0],
      inflections: data.strategy.inflections,
      tags: [MOTION_TAG[motion] ?? null, METRIC_TAG[metric] ?? null].filter(Boolean) as string[],
      evidenceCount: data.evidence.size,
    }
  })
  const upcoming = loadUpcoming()
  const patterns = loadPatterns().filter((p) => p.products.length > 0)
  const totalEvidence = products.reduce((n, p) => n + p.evidenceCount, 0)
  let sectionNo = 0
  const num = () => String(++sectionNo).padStart(2, '0')
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
          <span className="home-sec-num">{num()}</span>
          <h2 className="home-h2">Teardowns</h2>
          <p className="home-sec-sub">One product at a time, done properly. Each opens with a 60-second version, then goes as deep as you want, and ends with questions to practise on.</p>
        </div>
        <div className="cards">
          {products.map(({ slug, product, brand, tags, logo }) => (
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
                  <h3 className="tcard-name">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="tcard-logo" src={logo} alt="" aria-hidden="true" />
                    ) : null}
                    {product.name}
                  </h3>
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
        </div>
      </section>

      {/* ------------------------------------------------ HIGHLIGHTS */}
      {products.map(({ slug, product, numbers, proven, bet, inflections }) => (
        <section key={slug} className="home-sec" data-reveal>
          <div className="home-sec-head">
            <span className="home-sec-num">{num()}</span>
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

      {/* ------------------------------------------------ QUEUE */}
      {upcoming.length > 0 ? (
        <section id="queue" className="home-sec queue-sec" data-reveal>
          <div className="home-sec-head">
            <span className="home-sec-num">{num()}</span>
            <h2 className="home-h2">Next out of the workshop</h2>
            <p className="home-sec-sub">
              {upcoming.length} products queued, each with the question we intend to ask. A question stays a question until the teardown answers it.
            </p>
          </div>
          <ol className="queue">
            {upcoming.map((u, i) => (
              <li key={u.slug} className="qitem" style={{ ['--i' as string]: i }}>
                <button type="button" className="qcard" data-status={u.status} aria-expanded="false">
                  <span className="qcard-top">
                    <span className="qcard-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="qcard-status">{u.status === 'queued' ? 'queued' : human(u.status)}</span>
                  </span>
                  <span className="qcard-name">{u.name}</span>
                  <span className="qcard-angle">{u.angle}</span>
                  <span className="qcard-focus">
                    {u.focus.map((f) => (
                      <span key={f}>{f}</span>
                    ))}
                  </span>
                  <span className="qcard-cat">{human(u.category)}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {/* ------------------------------------------------ PATTERNS */}
      {patterns.length > 0 ? (
        <section id="patterns" className="home-sec" data-reveal>
          <div className="home-sec-head">
            <span className="home-sec-num">{num()}</span>
            <h2 className="home-h2">The same moves, in different products</h2>
            <p className="home-sec-sub">
              The lessons worth carrying into an interview are the ones that repeat. Each pattern is traced to exactly where a
              teardown shows it.
            </p>
          </div>
          <div className="hpat-grid">
            {patterns.map((p) => (
              <a key={p.slug} href={`/patterns#${p.slug}`} className="hpat">
                <span className="hpat-fam">{p.family === 'monetization' ? 'Monetisation' : p.family[0].toUpperCase() + p.family.slice(1)}</span>
                <span className="hpat-name">{p.name}</span>
                <span className="hpat-def">{p.definition}</span>
                <span className="hpat-prods">
                  {p.products.map((m) => {
                    const logo = logoFor(m.slug)
                    return (
                      <span key={m.slug} className="hpat-prod">
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img className="tcard-logo" src={logo} alt="" aria-hidden="true" />
                        ) : null}
                        {m.name}
                      </span>
                    )
                  })}
                </span>
              </a>
            ))}
          </div>
          <a className="btn btn-ghost hpat-all" href="/patterns">
            All patterns, with when they work and when they break <span className="arrow">→</span>
          </a>
        </section>
      ) : null}

      {/* ------------------------------------------------ METHOD STRIP */}
      <section id="method" className="home-sec" data-reveal>
        <div className="home-sec-head">
          <span className="home-sec-num">{num()}</span>
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
            <div className="k">Teardowns published. Slowly, on purpose. {upcoming.length} in the queue.</div>
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
        <span className="kicker">Keep reading</span>
        <h2 className="home-h2">
          <SplitWords text="Pick a product. Argue with it." />
        </h2>
        <div className="close-links">
          {products.map((p) => (
            <a key={p.slug} href={`/products/${p.slug}`} className="close-link">
              <span className="close-link-name">{p.product.name}</span>
              <span className="close-link-take">{p.product.thesis}</span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
