/** Lists real screengrabs placed under public/products/<slug>/screens/. Build-time only. */

import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const EXT = /\.(png|jpe?g|webp|avif)$/i

export function screensFor(slug: string): string[] {
  const dir = join(process.cwd(), 'public', 'products', slug, 'screens')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => EXT.test(f))
    .sort()
    .map((f) => `/products/${slug}/screens/${f}`)
}

/**
 * The product's own mark, if one has been placed at public/products/<slug>/logo.svg.
 *
 * Marks are used nominatively: to identify the company a teardown is about, which is
 * what trademark law's nominative fair use covers for commentary and analysis. They are
 * rendered unaltered, never as a badge of approval, and the footer states that they
 * belong to their owners and that this site is not affiliated with them.
 */
export function logoFor(slug: string): string | null {
  const file = join(process.cwd(), 'public', 'products', slug, 'logo.svg')
  return existsSync(file) ? `/products/${slug}/logo.svg` : null
}
