/**
 * Per-product visual identity. Presentation config, not analytical content: a palette
 * and an artwork motif so a Figma page feels like Figma and a Stripe page will feel
 * like Stripe. Nothing here makes a claim about the product.
 *
 * Falls back to a neutral identity for any product without an entry, so adding a
 * teardown never requires touching this file.
 */

export type ArtMotif = 'canvas' | 'ledger' | 'neutral'

export interface Brand {
  /** Ordered palette; index 0 is the primary accent. */
  palette: string[]
  motif: ArtMotif
  /** A short line used as the marquee refrain; describes the product category, not a claim. */
  refrain: string
  /** Screengrabs found under public/products/<slug>/screens/ are shown if present. */
  screensNote?: string
}

const BRANDS: Record<string, Brand> = {
  figma: {
    palette: ['#A259FF', '#1ABCFE', '#0ACF83', '#FF7262', '#F24E1E'],
    motif: 'canvas',
    refrain: 'design · collaborate · ship',
  },
  stripe: {
    palette: ['#635BFF', '#0A2540', '#00D4FF', '#7A73FF', '#FFB74A'],
    motif: 'ledger',
    refrain: 'charge · settle · attach',
  },
}

const NEUTRAL: Brand = {
  palette: ['#9b83f5', '#5ac8fa', '#3ddc84', '#f2b544', '#ff6b7a'],
  motif: 'neutral',
  refrain: 'product · evidence · judgment',
}

export function brandFor(slug: string): Brand {
  return BRANDS[slug] ?? NEUTRAL
}

/** CSS custom properties for the palette, applied on the teardown root. */
export function brandVars(brand: Brand): Record<string, string> {
  const vars: Record<string, string> = {}
  brand.palette.forEach((c, i) => {
    vars[`--brand-${i + 1}`] = c
  })
  vars['--accent'] = brand.palette[0]
  vars['--accent-soft'] = `color-mix(in srgb, ${brand.palette[0]} 16%, transparent)`
  return vars
}
