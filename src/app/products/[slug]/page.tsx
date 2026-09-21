import { MDXRemote } from 'next-mdx-remote/rsc'
import { CanvasArt } from '../../../components/art/CanvasArt'
import { Marquee } from '../../../components/chrome/Marquee'
import { RevealObserver } from '../../../components/chrome/Reveal'
import { GrowthChain, type LoopSource } from '../../../components/growth-loop/GrowthChain'
import { mdxComponentsFor } from '../../../components/mdx'
import { MoatStack } from '../../../components/moats/MoatStack'
import { ProfileStrip } from '../../../components/strategic-profile/ProfileStrip'
import { MetricTile, SectionSummary } from '../../../components/teardown/SectionSummary'
import { buildLoopRenderModel } from '../../../derive/loop-geometry'
import { brandFor, brandVars } from '../../../lib/brand'
import { listProductSlugs, loadProduct } from '../../../lib/content'
import { screensFor } from '../../../lib/screens'
import { deriveSectionStatuses, SECTION_EVIDENCE_LABEL } from '../../../lib/section-status'
import { SECTION_IDS } from '../../../schema'
import type { EvidenceEntryT } from '../../../schema/evidence'

export function generateStaticParams() {
  return listProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { product } = loadProduct(slug)
  return { title: product.name, description: product.thesis }
}

/** The subset of an evidence entry the loop needs to name its sources. Serialisable. */
function loopSources(ids: Iterable<string>, evidence: Map<string, EvidenceEntryT>): Record<string, LoopSource> {
  const out: Record<string, LoopSource> = {}
  for (const id of ids) {
    const e = evidence.get(id)
    if (!e) continue
    out[id] = { title: e.source.title, publisher: e.source.publisher, url: e.source.url, confidence: e.confidence, asOf: e.asOf }
  }
  return out
}

function human(v: string) {
  return v.replace(/-/g, ' ')
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

  const keyNumbers = product.vitals.keyMetricIds.map((id) => evidence.get(id)).filter(Boolean) as EvidenceEntryT[]
  const provenLink = loopModel.edges.find((e) => e.evidenceStatus === 'evidenced')
  const sources = loopSources(
    [...loopModel.edges.flatMap((e) => e.evidenceIds), ...loopModel.nodes.flatMap((n) => n.metricIds)],
    evidence,
  )

  // Marquee: the product's own facts, never the method.
  const ribbon = [
    brand.refrain,
    human(product.vitals.category),
    `est. ${product.vitals.founded}`,
    product.vitals.headquarters,
    product.vitals.stage,
    profile.distributionMotion.classification !== 'unestablished' ? human(profile.distributionMotion.classification) : null,
    profile.valueMetric.classification !== 'unestablished' ? `priced by ${human(profile.valueMetric.classification)}` : null,
  ].filter(Boolean) as string[]

  return (
    <article className="td" style={brandVars(brand) as React.CSSProperties}>
      <RevealObserver />

      {/* ---------------- HERO ---------------- */}
      <header className="hero hero-split">
        <div className="hero-copy">
          <div className="hero-top">
            <span className="kicker">{human(product.vitals.category)}</span>
          </div>
          <h1 className="hero-name">{product.name}</h1>
          <p className="hero-thesis">
            <span className="hero-thesis-label">Our take</span>
            {product.thesis}
          </p>
          <div className="hero-facts">
            <span>{product.vitals.stage}</span>
            <span>{product.vitals.headquarters}</span>
            <span>est. {product.vitals.founded}</span>
            {product.vitals.headcountBand !== 'unestablished' ? <span>headcount {product.vitals.headcountBand}</span> : null}
          </div>
        </div>
        <div className="hero-art" data-reveal>
          <CanvasArt motif={brand.motif} palette={brand.palette} />
        </div>

        <div className="hero-meta hero-meta-numbers">
          <div className="tiles tiles-hero">
            {keyNumbers.map((e) => (
              <MetricTile key={e.id} entry={e} />
            ))}
          </div>
          <a href="#growth-loops" className="hero-loop-pill" data-status={loopModel.summary.status}>
            <span className="kicker">Growth engine</span>
            <span className="hero-loop-status">{provenLink ? provenLink.label : loopModel.name}</span>
            <span className="hero-loop-count">
              {loopModel.summary.counts.evidenced} of {loopModel.edges.length} links proven · see the loop →
            </span>
          </a>
        </div>
        <p className="hero-updated">
          Updated {product.lastUpdated} · {evidence.size} sources · {product.status}
        </p>
      </header>

      <Marquee items={ribbon} />

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
                <a href={`#${id}`} data-status={statuses[id]} title={SECTION_EVIDENCE_LABEL[statuses[id]]}>
                  <span className="rail-dot" aria-hidden="true" />
                  <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="rail-title">{title.get(id)}</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="rail-legend" aria-hidden="true">
            <span data-status="rich">well sourced</span>
            <span data-status="bounded">partly</span>
            <span data-status="gap">open</span>
            <span data-status="judgment">our call</span>
          </div>
        </nav>

        <div className="body">
          {SECTION_IDS.map((id, i) => (
            <section key={id} id={id} className="sec" data-status={statuses[id]} data-reveal>
              <header className="sec-head">
                <span className="sec-num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="sec-title">{title.get(id)}</h2>
                <span className="pill pill-status pill-quiet" data-status={statuses[id]}>
                  {SECTION_EVIDENCE_LABEL[statuses[id]]}
                </span>
              </header>
              {standfirst.get(id) ? <p className="sec-standfirst">{standfirst.get(id)}</p> : null}

              <div className="sec-card">
                {id === 'vitals' ? <ProfileStrip profile={profile} /> : null}
                {id === 'growth-loops' ? <GrowthChain model={loopModel} sources={sources} /> : null}
                {id === 'moats' ? <MoatStack moats={strategy.moats} /> : null}
                <SectionSummary id={id} data={data} statuses={statuses} />
              </div>

              <details className="prose-fold" open={id === 'verdict'}>
                <summary>
                  <span>{id === 'verdict' ? 'The verdict in full' : 'Read the full analysis'}</span>
                  <span className="prose-fold-hint">sources inline, hover any ● to open one</span>
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
