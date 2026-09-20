/** A slow refrain ribbon. Pure CSS animation; pauses on hover; still under reduced motion. */

export function Marquee({ items }: { items: string[] }) {
  const row = items.join('  ·  ') + '  ·  '
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{row}</span>
        <span>{row}</span>
      </div>
    </div>
  )
}
