/**
 * Plain-language labels for schema vocabularies.
 *
 * The schema speaks in enums because enums are comparable across products. Readers
 * should never see them raw: "bottom-up-end-user" is a database value, "people adopt it
 * on their own" is a sentence. Every enum that reaches the page goes through here.
 */

const DISTRIBUTION: Record<string, string> = {
  'bottom-up-end-user': 'People adopt it on their own, before anyone buys it',
  'bottom-up-developer': 'Developers adopt it first, and the company follows',
  'product-led-hybrid': 'Self-serve at the bottom, a sales team at the top',
  'sales-led': 'Sold by a sales team',
  'top-down-enterprise': 'Bought centrally and rolled out to staff',
  unestablished: 'Not established from the evidence',
}

const VALUE_METRIC: Record<string, string> = {
  seats: 'Priced per person',
  usage: 'Priced by how much you use it',
  transactions: 'Priced per transaction',
  outcomes: 'Priced on results',
  flat: 'A flat fee',
  unestablished: 'Not established from the evidence',
}

const MOAT_SOURCE: Record<string, string> = {
  network: 'Each new user makes it better for the others',
  'switching-costs': 'Leaving is harder than arriving',
  scale: 'Being bigger makes it cheaper',
  brand: 'The name does the selling',
  data: 'Its data improves the product',
  ecosystem: 'Others build on top of it',
  unestablished: 'Nothing the evidence supports yet',
}

const TIME_TO_VALUE: Record<string, string> = {
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  weeks: 'Weeks',
  quarters: 'Quarters',
  unestablished: 'Not measured by anyone',
}

const ALIGNMENT: Record<string, string> = {
  aligned: 'The person using it is the person paying',
  'partially-split': 'The user and the buyer are sometimes different people',
  'fully-split': 'The person using it is not the person paying',
  unestablished: 'Not established from the evidence',
}

const EXPANSION: Record<string, string> = {
  seats: 'More people join the account',
  usage: 'The same people use more',
  'cross-sell': 'More products attach to the account',
  'tier-upgrade': 'The account moves to a higher plan',
  'platform-adoption': 'Others build on it inside the account',
  unestablished: 'Not established from the evidence',
}

export const AXIS_PHRASES = {
  distributionMotion: DISTRIBUTION,
  valueMetric: VALUE_METRIC,
  moatSource: MOAT_SOURCE,
  timeToValue: TIME_TO_VALUE,
  buyerUserAlignment: ALIGNMENT,
  expansionMechanism: EXPANSION,
} as const

export type AxisKey = keyof typeof AXIS_PHRASES

/** A reader-facing sentence for a profile classification; falls back to spaced words. */
export function axisPhrase(axis: AxisKey, value: string): string {
  return AXIS_PHRASES[axis][value] ?? value.replace(/-/g, ' ')
}

const MOAT_TYPE: Record<string, string> = {
  'network-effects': 'Network effects',
  'switching-costs': 'Switching costs',
  'economies-of-scale': 'Economies of scale',
  brand: 'Brand',
  regulatory: 'Regulation',
  data: 'Data advantage',
  ecosystem: 'Ecosystem',
  distribution: 'Distribution',
  'counter-positioning': 'Counter-positioning',
  'cornered-resource': 'Cornered resource',
}

export function moatTypeLabel(value: string): string {
  return MOAT_TYPE[value] ?? value.replace(/-/g, ' ')
}

const DURABILITY: Record<string, string> = {
  'copyable-in-6-months': 'A rival could copy it within six months',
  'copyable-with-sustained-effort': 'Copyable, but only with sustained effort',
  'structurally-hard': 'Structurally hard to copy',
  'effectively-permanent': 'Effectively permanent',
}

export function durabilityLabel(value: string): string {
  return DURABILITY[value] ?? value.replace(/-/g, ' ')
}
