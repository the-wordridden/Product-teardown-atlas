import { CanvasArt } from '../components/art/CanvasArt'
import { RevealObserver } from '../components/chrome/Reveal'
import { CountUp, RotatingWord, SplitWords, Spotlight, Tilt } from '../components/home/Kinetic'
import { buildLoopRenderModel } from '../derive/loop-geometry'
import { brandFor, brandVars } from '../lib/brand'
import { listProductSlugs, loadProduct } from '../lib/content'
import { deriveSectionStatuses } from '../lib/section-status'
import { SECTION_IDS } from '../schema'
import '../components/home/home.css'

const STEP_BLURB: Record<string, string> = {
  vitals: 'Who they are, how big, who holds the votes.',
  problem: 'The world before, in their words and ours.',
  users: 'Who shows up, and what the packaging tells you.',
  jtbd: 'What teams hire it for, in their own words.',
  product: 'How the machine actually works.',
  'business-model': 'Where the money enters and what it costs to keep.',
  'growth-loops': 'Five transitions. We draw the ring only as far as evidence goes.',
  moats: 'What would stop a rival. We only list what holds up.',
  bets: 'The choices, what they cost, and the tension left behind.',
  verdict: 'Our call, labelled as a call.',
}

export default function HomePage() {
  const products = listProductSlugs().map((slug) => {
    const data = loadProduct(slug)
    const loop = data.loops.loops.find((l) => l.id === data.loops.primaryLoopId)!
    const model = buildLoopRenderModel(loop)
    const statuses = deriveSectionStatuses(data.product, data.profile, data.strategy, model.summary.status, data.evidence)
    return { slug, product: data.product, brand: brandFor(slug), statuses, loopStatus: model.summary.status, evidenced: model.summary.counts.evidenced, evidenceCount: data.evidence.size }
  })
  const totalEvidence = products.reduce((n, p) => n + p.evidenceCount, 0)
  const sectionTitles = products[0]?.product.sections ?? []

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
          Deep teardowns where every claim is labelled fact, inference or judgment, and every number links to a source someone actually opened. Built to be argued with.
        </p>
        <div className="home-ctas">
          <a className="btn btn-primary" href="#teardowns">
            Read a teardown <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#method">
            How we read a product
          </a>
        </div>
      </Spotlight>

      {/* ------------------------------------------------ BAND */}
      <div className="band" aria-hidden="true">
        <div className="band-row a">
          <span>Fact</span><span className="hi">Inference</span><span>Judgment</span><span className="hi">Evidence gap</span><span>Fact</span><span className="hi">Inference</span><span>Judgment</span><span className="hi">Evidence gap</span>
        </div>
        <div className="band-row b">
          <span>What can actually be shown</span><span>·</span><span>Not established is not disproved</span><span>·</span><span>What can actually be shown</span><span>·</span><span>Not established is not disproved</span><span>·</span>
        </div>
      </div>

      {/* ------------------------------------------------ TEARDOWNS */}
      <section id="teardowns" className="home-sec" data-reveal>
        <div className="home-sec-head">
          <span className="home-sec-num">01</span>
          <h2 className="home-h2">Teardowns</h2>
          <p className="home-sec-sub">One product at a time, done properly. Each page opens on its evidence coverage so you can see what's solid before you read a word.</p>
        </div>
        <div className="cards">
          {products.map(({ slug, product, brand, statuses, loopStatus, evidenced }) => (
            <Tilt key={slug}>
              <a href={`/products/${slug}`} className="tcard" style={brandVars(brand) as React.CSSProperties}>
                <div>
                  <div className="tcard-band" aria-hidden="true" />
                  <div className="hero-top" style={{ marginTop: 'var(--sp-4)' }}>
                    <span className="kicker">{product.vitals.category.replace(/-/g, ' ')}</span>
                    <span className="pill pill-status" data-status={loopStatus === 'fully-evidenced' ? 'rich' : 'bounded'}>
                      loop {evidenced}/5 evidenced
                    </span>
                  </div>
                  <h3 className="tcard-name">{product.name}</h3>
                </div>
                <div className="tcard-art">
                  <CanvasArt motif={brand.motif} palette={brand.palette} />
                </div>
                <div>
                  <p className="tcard-thesis">
                    <span className="hero-thesis-label">Analyst judgment</span>
                    {product.thesis}
                  </p>
                  <div className="coverage-bar" aria-hidden="true" style={{ maxWidth: 'none', marginBottom: 'var(--sp-4)' }}>
                    {SECTION_IDS.map((id) => (
                      <span key={id} className="coverage-seg" data-status={statuses[id]} />
                    ))}
                  </div>
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
              <p className="tcard-thesis">Developer infrastructure, a very different loop. Research hasn't started, so there's nothing to claim yet. That's the point.</p>
              <div className="tcard-foot">
                <span className="hero-updated" style={{ margin: 0 }}>In research</span>
              </div>
            </div>
          </Tilt>
        </div>
      </section>

      {/* ------------------------------------------------ METHOD STRIP */}
      <section id="method" className="home-sec" data-reveal>
        <div className="home-sec-head">
          <span className="home-sec-num">02</span>
          <h2 className="home-h2">Ten questions, every time</h2>
          <p className="home-sec-sub">Every teardown walks the same ten sections in the same order. Hover one to see what it answers.</p>
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

      {/* ------------------------------------------------ CLAIM CLASSES */}
      <section className="home-sec" data-reveal>
        <div className="home-sec-head">
          <span className="home-sec-num">03</span>
          <h2 className="home-h2">Four kinds of sentence</h2>
          <p className="home-sec-sub">Most product writing blurs them. We keep them apart on the page, and you can always see which one you're reading.</p>
        </div>
        <div className="claims">
          <div className="claim-tile" data-kind="fact">
            <span className="glyph" aria-hidden="true">●</span>
            <div>
              <h3>Fact</h3>
              <p>Something a source you can open actually says. Every number carries its date and confidence.</p>
              <div className="ex">Revenue for fiscal 2025: $1,055.8 million. From the 10-K, verified.</div>
            </div>
          </div>
          <div className="claim-tile" data-kind="inference">
            <span className="glyph" aria-hidden="true">◐</span>
            <div>
              <h3>Inference</h3>
              <p>What the evidence reasonably suggests. Labelled so it never gets mistaken for a fact.</p>
              <div className="ex">The numbers fit expansion led growth better than acquisition led growth.</div>
            </div>
          </div>
          <div className="claim-tile" data-kind="judgment">
            <span className="glyph" aria-hidden="true">◆</span>
            <div>
              <h3>Judgment</h3>
              <p>Our call. Prominent on the page, and always marked as ours rather than the world's.</p>
              <div className="ex">The virality claim currently rests on the company's word alone.</div>
            </div>
          </div>
          <div className="claim-tile" data-kind="gap">
            <span className="glyph" aria-hidden="true">○</span>
            <div>
              <h3>Evidence gap</h3>
              <p>What we couldn't establish, why, and what would settle it. Not established isn't disproved.</p>
              <div className="ex">No job to be done is evidenced for Figma. The section says so instead of inventing one.</div>
            </div>
          </div>
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
            <div className="k">Evidence records, each one opened by hand.</div>
          </div>
          <div className="stat">
            <div className="v"><CountUp to={10} /></div>
            <div className="k">Sections per teardown. Always the same ten.</div>
          </div>
          <div className="stat">
            <div className="v"><CountUp to={4} /></div>
            <div className="k">Kinds of claim, never blurred together.</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ CLOSE */}
      <div className="band" aria-hidden="true">
        <div className="band-row a">
          <span>Read the teardown</span><span className="hi">→</span><span>Read the teardown</span><span className="hi">→</span><span>Read the teardown</span><span className="hi">→</span><span>Read the teardown</span><span className="hi">→</span>
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
