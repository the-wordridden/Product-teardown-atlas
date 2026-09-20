/**
 * The claim-class components: <Inference>, <Judgment>, <EvidenceGap>.
 *
 * Contract (Stage 3 / renderer brief): these three states plus evidence must never be
 * visually flattened into equivalent claims. Each carries BOTH a persistent text label
 * and a distinct structural treatment (left rule for inference/judgment; bordered
 * panel for gaps), so the distinction never rests on colour alone.
 *
 * EvidenceGap is explicitly NOT an error state. It renders as considered analytical
 * output — "not established" must never read as "disproved" (methodology §7.3), and
 * must not resemble a failure banner.
 */

import type { ReactNode } from 'react'

export function Inference({ children }: { children: ReactNode }) {
  return (
    <aside className="claim-block claim-inference">
      <span className="claim-label">Inference</span>
      <div className="claim-body">{children}</div>
    </aside>
  )
}

export function Judgment({ children }: { children: ReactNode }) {
  return (
    <aside className="claim-block claim-judgment">
      <span className="claim-label">Judgment</span>
      <div className="claim-body">{children}</div>
    </aside>
  )
}

/**
 * The MDX authoring convention writes the four gap facets as bold-led paragraphs
 * ("**What we can establish:** …"). This component provides the frame; the facets
 * flow through as children so the prose stays in content, not in props.
 */
export function EvidenceGap({ children }: { children: ReactNode }) {
  return (
    <section className="evidence-gap" aria-label="Evidence gap">
      <header className="evidence-gap-head">
        <span className="evidence-gap-label">Evidence gap</span>
        <span className="evidence-gap-hint">Not established is not disproved</span>
      </header>
      <div className="evidence-gap-body">{children}</div>
    </section>
  )
}
