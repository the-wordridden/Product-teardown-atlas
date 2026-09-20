/**
 * Controlled vocabularies and shared primitives for the Product Teardown Atlas.
 *
 * This is the leaf module of the schema graph: it imports nothing from the rest of
 * `src/schema` and everything else imports from here. Adding a value to a vocabulary
 * is a deliberate act — these enums are the analytical discipline of the Atlas
 * expressed as types. If a product does not fit a vocabulary, that is a finding to
 * write about in prose, not a reason to widen the enum.
 */

import { z } from 'zod'

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

export const Slug = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Must be lowercase kebab-case, e.g. "figma" or "bottom-up-land-and-expand".',
  )

export const EvidenceId = z
  .string()
  .regex(
    /^[a-z0-9]+(?:[-.][a-z0-9]+)*$/,
    'Evidence ids are lowercase, dot- or hyphen-separated, e.g. "arr.2025" or "weekly-active-editors".',
  )

export const IsoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be an ISO date in YYYY-MM-DD form.')
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Must be a real calendar date.')

export const Url = z.string().url('Must be an absolute URL including protocol.')

export const HexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, 'Must be a 6-digit hex colour, e.g. "#0ACF83".')

export const Year = z.number().int().min(1970).max(2100)

/**
 * Graded string lengths enforce the two-sentence rule from the content architecture:
 * anything longer than a couple of sentences belongs in MDX, not in JSON, because
 * JSON fields are what the comparison and pattern layers operate on.
 */
export const Label = z.string().trim().min(2).max(80)
export const Line = z.string().trim().min(1).max(240)
export const TwoSentences = z.string().trim().min(20).max(400)
export const Paragraph = z.string().trim().min(40).max(900)

export const EvidenceIdList = z.array(EvidenceId).default([])

/**
 * The single controlled uncertainty state, shared by every vocabulary that needs one.
 *
 * It exists so an evidence ceiling can be recorded honestly rather than forcing a value
 * the research does not support. It is deliberately the ONLY such value across the whole
 * schema — no `unknown`, no `not-established`, no `insufficient`, no per-field variants.
 * Wherever it is permitted, an accompanying rationale or note is mandatory.
 */
export const UNESTABLISHED = 'unestablished' as const
export const Unestablished = z.literal(UNESTABLISHED)

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

/** Returns the duplicated keys in a list, in first-seen order. */
export function findDuplicates<T>(items: readonly T[], key: (item: T) => string): string[] {
  const seen = new Set<string>()
  const duplicated = new Set<string>()
  for (const item of items) {
    const k = key(item)
    if (seen.has(k)) duplicated.add(k)
    seen.add(k)
  }
  return [...duplicated]
}

/* -------------------------------------------------------------------------- */
/* Teardown structure                                                          */
/* -------------------------------------------------------------------------- */

/** The ten sections, in canonical reading order. Anchors derive from these ids. */
export const SECTION_IDS = [
  'vitals',
  'problem',
  'users',
  'jtbd',
  'product',
  'business-model',
  'growth-loops',
  'moats',
  'bets',
  'verdict',
] as const
export const SectionId = z.enum(SECTION_IDS)
export type SectionIdT = z.infer<typeof SectionId>

export const SectionIdList = z.array(SectionId).default([])

/* -------------------------------------------------------------------------- */
/* Epistemics                                                                  */
/* -------------------------------------------------------------------------- */

/** What kind of claim this is. Applies to prose blocks and structured claims alike. */
export const CLAIM_TYPES = ['fact', 'inference', 'judgment'] as const
export const ClaimType = z.enum(CLAIM_TYPES)
export type ClaimTypeT = z.infer<typeof ClaimType>

/** How well a factual claim is supported. Meaningful only for claims of type fact. */
export const CONFIDENCE_LEVELS = ['verified', 'reported', 'estimated'] as const
export const Confidence = z.enum(CONFIDENCE_LEVELS)
export type ConfidenceT = z.infer<typeof Confidence>

export const SOURCE_TYPES = [
  'company-filing',
  'company-communication',
  'press',
  'analyst-report',
  'third-party-data',
  'interview',
  'product-observation',
  /**
   * First-hand accounts by users or practitioners in public venues — support forums,
   * community threads, practitioner write-ups. Describes the evidentiary nature of the
   * source, never the publisher: there is deliberately no `reddit`, `hacker-news` or
   * `design-forum` type, because the venue does not determine the weight of the claim.
   */
  'practitioner-report',
  'personal-analysis',
] as const
export const SourceType = z.enum(SOURCE_TYPES)
export type SourceTypeT = z.infer<typeof SourceType>

/* -------------------------------------------------------------------------- */
/* Company and product identity                                                */
/* -------------------------------------------------------------------------- */

export const PRODUCT_CATEGORIES = [
  'design-collaboration',
  'developer-infrastructure',
  'payments',
  'productivity',
  'communication',
  'data-analytics',
  'learning',
  'commerce',
  'security',
  'ai-tooling',
  'vertical-saas',
  'consumer-social',
] as const
export const ProductCategory = z.enum(PRODUCT_CATEGORIES)

export const COMPANY_STAGES = [
  'seed',
  'early-growth',
  'scaling',
  'late-stage',
  'public',
  'acquired',
  'subsidiary',
] as const
export const CompanyStage = z.enum(COMPANY_STAGES)

export const OWNERSHIP_TYPES = [
  'founder-led-private',
  'vc-backed-private',
  'bootstrapped',
  'public',
  'pe-owned',
  'subsidiary',
  'nonprofit',
] as const
export const OwnershipType = z.enum(OWNERSHIP_TYPES)

export const HEADCOUNT_BANDS = ['1-50', '51-250', '251-1000', '1001-5000', '5000+'] as const
export const HeadcountBand = z.enum(HEADCOUNT_BANDS)

export const PLATFORMS = [
  'web',
  'ios',
  'android',
  'desktop-mac',
  'desktop-windows',
  'desktop-linux',
  'api',
  'cli',
  'embedded-sdk',
] as const
export const Platform = z.enum(PLATFORMS)

/* -------------------------------------------------------------------------- */
/* Business model                                                              */
/* -------------------------------------------------------------------------- */

export const BUSINESS_MODELS = [
  'subscription-seat',
  'subscription-tier',
  'usage-based',
  'transaction-fee',
  'marketplace-take-rate',
  'freemium',
  'licence',
  'advertising',
  'services',
] as const
export const BusinessModel = z.enum(BUSINESS_MODELS)

export const REVENUE_LINE_TYPES = [
  'subscription',
  'transaction',
  'usage',
  'services',
  'hardware',
  'interest-float',
  'advertising',
  'other',
] as const
export const RevenueLineType = z.enum(REVENUE_LINE_TYPES)

export const PRICING_AXES = ['per-seat', 'per-usage', 'per-transaction', 'flat-tier', 'hybrid'] as const
export const PricingAxis = z.enum(PRICING_AXES)

/** Deliberately banded rather than numeric — precise revenue splits are rarely knowable. */
export const SHARE_BANDS = ['dominant', 'major', 'significant', 'niche'] as const
export const ShareBand = z.enum(SHARE_BANDS)

/* -------------------------------------------------------------------------- */
/* Growth loops                                                                */
/* -------------------------------------------------------------------------- */

/**
 * The five canonical roles, in ring order. This vocabulary is frozen by design:
 * fixed geometry is what makes two very different products visually comparable.
 */
export const LOOP_ROLES = [
  'acquisition',
  'activation',
  'core-action',
  'output',
  'reinvestment',
] as const
export const LoopRole = z.enum(LOOP_ROLES)
export type LoopRoleT = z.infer<typeof LoopRole>

/** The five transitions that must exist for a loop to actually close. */
export const CANONICAL_LOOP_EDGES: ReadonlyArray<readonly [LoopRoleT, LoopRoleT]> = LOOP_ROLES.map(
  (role, index) => [role, LOOP_ROLES[(index + 1) % LOOP_ROLES.length]] as const,
)

export const LOOP_TYPES = ['viral', 'content', 'sales', 'paid', 'usage', 'ecosystem'] as const
export const LoopType = z.enum(LOOP_TYPES)

export const LOOP_SPEED_BANDS = ['hours', 'days', 'weeks', 'months', 'quarters'] as const
export const LoopSpeedBand = z.enum(LOOP_SPEED_BANDS)

export const EDGE_STRENGTHS = ['strong', 'moderate', 'weak'] as const
export const EdgeStrength = z.enum(EDGE_STRENGTHS)

export const LEAK_SEVERITIES = ['minor', 'material', 'severe'] as const
export const LeakSeverity = z.enum(LEAK_SEVERITIES)

/**
 * Evidence status of a single loop transition.
 *
 * The canonical five-role ring is a STRUCTURAL FRAMEWORK. It says what a growth loop
 * would have to look like. It does not assert that the mechanism has been established
 * for any particular product. That is what this field carries, per transition.
 *
 * Values are kebab-case to match every other vocabulary in this module.
 */
export const TRANSITION_EVIDENCE_STATUSES = [
  'evidenced',
  'partially-evidenced',
  'contested',
  'insufficient',
] as const
export const TransitionEvidenceStatus = z.enum(TRANSITION_EVIDENCE_STATUSES)
export type TransitionEvidenceStatusT = z.infer<typeof TransitionEvidenceStatus>

/**
 * Loop-level evidence status. DERIVED at build time from the transition statuses —
 * never authored. See `src/derive/loop-status.ts` for the deterministic rules.
 */
export const LOOP_EVIDENCE_STATUSES = [
  'fully-evidenced',
  'partially-evidenced',
  'evidence-bounded',
  'contested',
] as const
export const LoopEvidenceStatus = z.enum(LOOP_EVIDENCE_STATUSES)
export type LoopEvidenceStatusT = z.infer<typeof LoopEvidenceStatus>

/* -------------------------------------------------------------------------- */
/* Moats, bets, inflections                                                    */
/* -------------------------------------------------------------------------- */

export const MOAT_TYPES = [
  'network-effects',
  'switching-costs',
  'economies-of-scale',
  'brand',
  'regulatory',
  'data',
  'ecosystem',
  'distribution',
  'counter-positioning',
  'cornered-resource',
] as const
export const MoatType = z.enum(MOAT_TYPES)

/** The falsifiable verdict every moat claim must commit to. */
export const MOAT_DURABILITIES = [
  'copyable-in-6-months',
  'copyable-with-sustained-effort',
  'structurally-hard',
  'effectively-permanent',
] as const
export const MoatDurability = z.enum(MOAT_DURABILITIES)

export const BET_STATUSES = ['paid-off', 'mixed', 'unresolved', 'backfired'] as const
export const BetStatus = z.enum(BET_STATUSES)

export const INFLECTION_SHIFT_TYPES = [
  'wedge',
  'expansion',
  'business-model',
  'platform',
  'ownership',
] as const
export const InflectionShiftType = z.enum(INFLECTION_SHIFT_TYPES)

/** Hard cap. Raising this turns the inflection spine into a timeline product. */
export const MAX_INFLECTIONS = 7

/* -------------------------------------------------------------------------- */
/* Jobs to be done and product mechanics                                       */
/* -------------------------------------------------------------------------- */

export const JOB_DIMENSIONS = ['functional', 'emotional', 'social'] as const
export const JobDimension = z.enum(JOB_DIMENSIONS)

export const TIME_TO_VALUE_BANDS = ['minutes', 'hours', 'days', 'weeks', 'quarters'] as const
export const TimeToValueBand = z.enum(TIME_TO_VALUE_BANDS)

export const WHY_NOW_TRIGGERS = ['technology', 'behaviour', 'regulatory', 'economic', 'platform'] as const
export const WhyNowTrigger = z.enum(WHY_NOW_TRIGGERS)

/* -------------------------------------------------------------------------- */
/* Patterns                                                                    */
/* -------------------------------------------------------------------------- */

export const PATTERN_FAMILIES = [
  'acquisition',
  'retention',
  'monetization',
  'defensibility',
  'distribution',
] as const
export const PatternFamily = z.enum(PATTERN_FAMILIES)

/**
 * Typed edges are what make the pattern layer a knowledge graph rather than a tag
 * system. The relation "tensions-with" in particular is an analytical claim that no
 * tag system can express.
 */
export const PATTERN_RELATIONS = [
  'requires',
  'enables',
  'tensions-with',
  'variant-of',
  'anti-pattern-of',
] as const
export const PatternRelation = z.enum(PATTERN_RELATIONS)
export type PatternRelationT = z.infer<typeof PatternRelation>

export const PATTERN_MECHANISM_SHAPES = ['loop', 'linear', 'stock-and-flow', 'threshold'] as const
export const PatternMechanismShape = z.enum(PATTERN_MECHANISM_SHAPES)

/**
 * Keys that must never appear in a pattern document. The product list is derived from
 * PatternRef entries across products; hand-maintaining it here would guarantee drift.
 */
export const BANNED_PATTERN_KEYS = ['products', 'productSlugs', 'examples', 'instances'] as const

/* -------------------------------------------------------------------------- */
/* Strategic Profile                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Six axes, each with named stops. Never numeric: a score like "defensibility 8/10"
 * is unfalsifiable, and every other claim in the Atlas is falsifiable.
 */
export const DISTRIBUTION_MOTIONS = [
  'bottom-up-end-user',
  'bottom-up-developer',
  'product-led-hybrid',
  'sales-led',
  'top-down-enterprise',
] as const
export const DistributionMotion = z.enum(DISTRIBUTION_MOTIONS)

export const VALUE_METRICS = ['seats', 'usage', 'transactions', 'outcomes', 'flat'] as const
export const ValueMetric = z.enum(VALUE_METRICS)

export const MOAT_SOURCES = ['network', 'switching-costs', 'scale', 'brand', 'data', 'ecosystem'] as const
export const MoatSource = z.enum(MOAT_SOURCES)

export const BUYER_USER_ALIGNMENTS = ['aligned', 'partially-split', 'fully-split'] as const
export const BuyerUserAlignment = z.enum(BUYER_USER_ALIGNMENTS)

export const EXPANSION_MECHANISMS = [
  'seats',
  'usage',
  'cross-sell',
  'tier-upgrade',
  'platform-adoption',
] as const
export const ExpansionMechanism = z.enum(EXPANSION_MECHANISMS)

export const PROFILE_AXIS_IDS = [
  'distributionMotion',
  'valueMetric',
  'moatSource',
  'timeToValue',
  'buyerUserAlignment',
  'expansionMechanism',
] as const
export const ProfileAxisId = z.enum(PROFILE_AXIS_IDS)
export type ProfileAxisIdT = z.infer<typeof ProfileAxisId>

/* -------------------------------------------------------------------------- */
/* Comparison                                                                  */
/* -------------------------------------------------------------------------- */

/** How a facet may be compared. Prose is never machine-diffed. */
export const COMPARABILITY_MODES = ['direct', 'set', 'prose', 'visual'] as const
export const ComparabilityMode = z.enum(COMPARABILITY_MODES)

/**
 * The comparable facet vocabulary. The registry in `src/derive/comparison/facets.ts`
 * binds each id to an accessor, a comparability mode and a strategic weight; the
 * vocabulary itself lives here so authored contrasts can be validated at parse time.
 */
export const FACET_IDS = [
  'category',
  'ownership',
  'business-model',
  'value-metric',
  'pricing-axis',
  'primary-buyer',
  'time-to-value',
  'distribution-motion',
  'expansion-mechanism',
  'growth-loop-type',
  'growth-loop-speed',
  'growth-loop-shape',
  'moat-composition',
  'segments',
  'patterns',
  'core-action',
  'wedge',
  'strategic-bets',
  'current-tension',
  'verdict-thesis',
] as const
export const FacetId = z.enum(FACET_IDS)
export type FacetIdT = z.infer<typeof FacetId>

/* -------------------------------------------------------------------------- */
/* Publication                                                                 */
/* -------------------------------------------------------------------------- */

export const PUBLICATION_STATUSES = ['draft', 'published'] as const
export const PublicationStatus = z.enum(PUBLICATION_STATUSES)
