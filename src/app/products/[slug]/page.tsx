import { MDXRemote } from 'next-mdx-remote/rsc'
import { CanvasArt } from '../../../components/art/CanvasArt'
import { Marquee } from '../../../components/chrome/Marquee'
import { RevealObserver } from '../../../components/chrome/Reveal'
import { GrowthLoopEngine } from '../../../components/growth-loop/GrowthLoopEngine'
import { mdxComponentsFor } from '../../../components/mdx'
import { MoatStack } from '../../../components/moats/MoatStack'
import { ProfileStrip } from '../../../components/strategic-profile/ProfileStrip'
import { SectionSummary } from '../../../components/teardown/SectionSummary'
import { buildLoopRenderModel } from '../../../derive/loop-geometry'
import { brandFor, brandVars } from '../../../lib/brand'
import { listProductSlugs, loadProduct } from '../../../lib/content'
import { screensFor } from '../../../lib/screens'
import { deriveSectionStatuses, SECTION_EVIDENCE_LABEL } from '../../../lib/section-status'
import { SECTION_IDS } from '../../../schema'

export function generateStaticParams() {
  return listProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { product } = loadProduct(slug)
  return { title: product.name, description: product.thesis }
}

export default async function TeardownPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = loadProduct(slug)
  const { product, profile, loops, strategy, evidence, sections } = data
  const brand = brandFor(slug)
  const screens = screensFor(slug)
  const components = mdxComponentsFor(evidence)
  const primaryLoop = loops.loops.find((loop) => loop.id === loops.primaryLoopId)!
  const loopModel = buildLoopRenderModel(primaryLoop)
  const statuses = deriveSectionStatuses(product, profile, strategy, loopModel.summary.status, evidence)
  const title = new Map(product.sections.map((s) => [s.id, s.title]))
  const standfirst = new Map(product.sections.map((s) => [s.id, s.summary]))
  const counts = { rich: 0, bounded: 0, gap: 0, judgment: 0 }
  for (const s of Object.values(statuses)) counts[s] += 1

  return (
    <article className="td" style={brandVars(brand) as React.CSSProperties}>
      <RevealObserver />

      {/* ---------------- HERO ---------------- */}
      <header className="hero hero-split">
        <div className="hero-copy">
          <div className="hero-top">
            <span className="kicker">{product.vitals.category.replace(/-/g, ' ')}</span>
          </div>
          <h1 className="hero-name">{product.name}</h1>
          <p className="hero-thesis">
            <span className="hero-thesis-label">Analyst judgment</span>
            {product.thesis}
          </p>
          <div className="hero-facts">
            <span>{product.vitals.stage}</span>
            <span>{product.vitals.headquarters}</span>
            <span>est. {product.vitals.founded}</span>
            <span>
              headcount{' '}
              {product.vitals.headcountBand === 'unestablished' ? <em className="unest">unestablished</em> : product.vitals.headcountBand}
            </span>
          </div>
        </div>
        <div className="hero-art" data-reveal>
          <CanvasArt motif={brand.motif} palette={brand.palette} />
        </div>

        <div className="hero-meta">
          <div className="coverage" aria-label="Evidence coverage across ten sections">
            <span className="kicker">Evidence coverage</span>
            <div className="coverage-bar" role="img" aria-label={`${counts.rich} evidence rich, ${counts.bounded} evidence bounded, ${counts.gap} evidence gaps, ${counts.judgment} judgment`}>
              {SECTION_IDS.map((id) => (
                <a key={id} href={`#${id}`} className="coverage-seg" data-status={statuses[id]} title={`${title.get(id)}: ${SECTION_EVIDENCE_LABEL[statuses[id]]}`} />
              ))}
            </div>
            <div className="coverage-legend">
              <span data-status="rich">{counts.rich} rich</span>
              <span data-status="bounded">{counts.bounded} bounded</span>
              <span data-status="gap">{counts.gap} gaps</span>
              <span data-status="judgment">{counts.judgment} judgment</span>
            </div>
          </div>
          <a href="#growth-loops" className="hero-loop-pill" data-status={loopModel.summary.status}>
            <span className="kicker">Growth loop</span>
            <span className="hero-loop-status">{loopModel.summary.status.replace(/-/g, ' ')}</span>
            <span className="hero-loop-count">{loopModel.summary.counts.evidenced} of 5 transitions evidenced</span>
          </a>
        </div>
        <p className="hero-updated">
          Updated {product.lastUpdated} · framework v{product.frameworkVersion} · {product.status}
        </p>
      </header>

      <Marquee items={[brand.refrain, 'fact', 'inference', 'judgment', 'evidence gap', 'what can actually be shown']} />

      {screens.length > 0 ? (
        <section className="screens" aria-label="Product in view" data-reveal>
          <span className="kicker">Product in view</span>
          <div className="screens-row">
            {screens.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </div>
        </section>
      ) : null}

      {/* ---------------- RAIL + BODY ---------------- */}
      <div className="td-grid">
        <nav className="rail" aria-label="Sections">
          <ol>
            {SECTION_IDS.map((id, i) => (
              <li key={id}>
                <a href={`#${id}`} data-status={statuses[id]}>
                  <span className="rail-dot" aria-hidden="true" />
                  <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rail-title">{title.get(id)}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="rail-legend" aria-hidden="true">
            <span data-status="rich">rich</span>
            <span data-status="bounded">bounded</span>
            <span data-status="gap">gap</span>
            <span data-status="judgment">judgment</span>
          </div>
        </nav>

        <div className="body">
          {SECTION_IDS.map((id, i) => (
            <section key={id} id={id} className="sec" data-status={statuses[id]} data-reveal>
              <header className="sec-head">
                <span className="sec-num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="sec-title">{title.get(id)}</h2>
                <span className="pill pill-status" data-status={statuses[id]}>
                  {SECTION_EVIDENCE_LABEL[statuses[id]]}
                </span>
              </header>
              {standfirst.get(id) ? <p className="sec-standfirst">{standfirst.get(id)}</p> : null}

              <div className="sec-card">
                {id === 'vitals' ? <ProfileStrip profile={profile} /> : null}
                {id === 'growth-loops' ? <GrowthLoopEngine model={loopModel} /> : null}
                {id === 'moats' ? <MoatStack moats={strategy.moats} /> : null}
                <SectionSummary id={id} data={data} statuses={statuses} />
              </div>

              <details className="prose-fold">
                <summary>
                  <span>Read the full analysis</span>
                  <span className="prose-fold-hint">facts, inferences and judgments marked as you go</span>
                </summary>
                <div className="prose">
                  <MDXRemote source={sections[id]} components={components} />
                </div>
              </details>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
