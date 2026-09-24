/** Lists real screengrabs placed under public/products/<slug>/screens/. Build-time only. */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const EXT = /\.(png|jpe?g|webp|avif)$/i

export interface Shot {
  src: string
  /** The section this capture evidences; it renders inside that section. */
  section: string
  caption: string
  /** The public page captured, shown as the frame's address bar and in the credit. */
  source: string
  capturedOn: string
}

/**
 * Screenshots of public, logged-out product pages, placed under
 * public/products/<slug>/screens/ with a screens.json sidecar giving each one's section,
 * caption and source. Captures are used for commentary and credited to their source;
 * pages that refused automated capture are simply absent rather than worked around.
 */
export function screensFor(slug: string): Shot[] {
  const dir = join(process.cwd(), 'public', 'products', slug, 'screens')
  const meta = join(dir, 'screens.json')
  if (!existsSync(meta)) return []
  const entries = JSON.parse(readFileSync(meta, 'utf-8')) as (Omit<Shot, 'src'> & { file: string })[]
  return entries
    .filter((e) => EXT.test(e.file) && existsSync(join(dir, e.file)))
    .map(({ file, ...rest }) => ({ src: `/products/${slug}/screens/${file}`, ...rest }))
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
