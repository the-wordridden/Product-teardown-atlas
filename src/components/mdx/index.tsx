/**
 * The MDX component allowlist — the security boundary from Section 4.15 and the
 * semantic contract from Stage 3. MDX may use exactly these components and standard
 * markdown output. Nothing here accepts raw HTML, and no component renders
 * dangerouslySetInnerHTML.
 *
 * <Evidence id /> is bound per-product: the factory closes over that product's
 * registry so a chip can only ever display what the evidence record says.
 */

import type { EvidenceEntryT } from '../../schema/evidence'
import { EvidenceChip, EvidenceMissing } from '../evidence/EvidenceChip'
import { EvidenceGap, Inference, Judgment } from '../evidence/SemanticBlocks'

export function mdxComponentsFor(evidence: Map<string, EvidenceEntryT>) {
  return {
    Evidence: ({ id }: { id: string }) => {
      const entry = evidence.get(id)
      return entry ? <EvidenceChip entry={entry} /> : <EvidenceMissing id={id} />
    },
    Inference,
    Judgment,
    EvidenceGap,
  }
}
