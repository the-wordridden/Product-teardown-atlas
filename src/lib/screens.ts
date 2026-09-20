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
