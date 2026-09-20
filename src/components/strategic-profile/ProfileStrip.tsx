/**
 * Strategic Profile strip — six locked axes, named stops, no numbers.
 *
 * `unestablished` renders as a first-class evidence state: its own marker glyph (○),
 * its own label, and the mandatory rationale surfaced exactly like any other — never
 * greyed out as missing data, never an error. Recording an evidence ceiling is a
 * result, and the UI treats it as one.
 */

import type { ProfileFileT } from '../../schema/profile'
import { PROFILE_AXIS_IDS, type ProfileAxisIdT } from '../../schema/enums'
import './profile-strip.css'

const AXIS_LABEL: Record<ProfileAxisIdT, string> = {
  distributionMotion: 'Distribution motion',
  valueMetric: 'Value metric',
  moatSource: 'Moat source',
  timeToValue: 'Time to value',
  buyerUserAlignment: 'Buyer / user alignment',
  expansionMechanism: 'Expansion mechanism',
}

function stopTitle(value: string): string {
  return value
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

export function ProfileStrip({ profile }: { profile: ProfileFileT }) {
  return (
    <dl className="profile-strip">
      {PROFILE_AXIS_IDS.map((axisId) => {
        const axis = profile[axisId]
        const unestablished = axis.classification === 'unestablished'
        return (
          <div key={axisId} className="ps-axis" data-unestablished={unestablished}>
            <dt className="ps-name">{AXIS_LABEL[axisId]}</dt>
            <dd className="ps-value">
              <span aria-hidden="true" className="ps-marker">
                {unestablished ? '○' : '●'}
              </span>
              <span className="ps-stop">
                {unestablished ? 'Unestablished' : stopTitle(axis.classification)}
              </span>
              {unestablished ? <span className="ps-badge">evidence ceiling</span> : null}
              <details className="ps-why">
                <summary>Why</summary>
                <p>{axis.rationale}</p>
              </details>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}
