/**
 * <Evidence id /> — inline evidence chip.
 *
 * Inline-only markup (span + button + span) so it can legally live inside a <p>.
 * The detail popover opens on hover and on focus/click of the button; CSS handles
 * both, so it works before hydration and for keyboard users.
 *
 * Confidence is SHAPE-encoded (● verified / ◐ reported / ○ estimated) so it survives
 * colour-blindness and greyscale; colour is reinforcement only.
 *
 * Hard contract: this displays exactly what the evidence record says and never more.
 */

import type { EvidenceEntryT } from '../../schema/evidence'

const GLYPH: Record<EvidenceEntryT['confidence'], string> = { verified: '●', reported: '◐', estimated: '○' }

const CONF_LABEL: Record<EvidenceEntryT['confidence'], string> = {
  verified: 'Verified',
  reported: 'Reported: relayed from the named source, not independently audited',
  estimated: 'Estimated: derived by the author, see note',
}

export function EvidenceChip({ entry }: { entry: EvidenceEntryT }) {
  return (
    <span className="ev-chip" data-confidence={entry.confidence}>
      <button
        type="button"
        className="ev-chip-summary"
        aria-label={`Evidence: ${entry.claim}. ${CONF_LABEL[entry.confidence]}. Value ${entry.value}, as of ${entry.asOf}.`}
      >
        <span aria-hidden="true" className="ev-glyph">
          {GLYPH[entry.confidence]}
        </span>
        <span className="ev-value">{entry.value}</span>
      </button>
      <span className="ev-pop" role="note">
        <strong className="ev-pop-claim">{entry.claim}</strong>
        <span className="ev-pop-row">
          <span className="ev-pop-k">Confidence</span> {CONF_LABEL[entry.confidence]}
        </span>
        <span className="ev-pop-row">
          <span className="ev-pop-k">As of</span> {entry.asOf}
        </span>
        <span className="ev-pop-row">
          <span className="ev-pop-k">Source</span>{' '}
          {entry.source.url ? (
            <a href={entry.source.url} rel="noopener noreferrer" target="_blank">
              {entry.source.title}
            </a>
          ) : (
            entry.source.title
          )}
        </span>
        {entry.note ? <span className="ev-pop-note">{entry.note}</span> : null}
      </span>
    </span>
  )
}

/** Rendered when an MDX file references an id missing from the registry. Loud on purpose. */
export function EvidenceMissing({ id }: { id: string }) {
  return (
    <span className="ev-chip ev-chip-missing" role="alert">
      ⚠ unresolved evidence “{id}”
    </span>
  )
}
