/**
 * Hero artwork. Motif-driven and palette-driven, so it reads as the product's world
 * without ever depicting a real screen or making a claim.
 *
 * `canvas` evokes a design canvas: dotted grid, a few frames, live cursors with name
 * tags drifting across, a selection box. Pure SVG + CSS keyframes, reduced-motion safe.
 */

import type { ArtMotif } from '../../lib/brand'
import './canvas-art.css'

const CURSORS = [
  { name: 'Mira', x: 22, y: 30, dur: 14 },
  { name: 'Theo', x: 61, y: 58, dur: 18 },
  { name: 'Ada', x: 78, y: 26, dur: 16 },
]

export function CanvasArt({ motif, palette }: { motif: ArtMotif; palette: string[] }) {
  if (motif !== 'canvas') return <NeutralArt palette={palette} />
  const [p1, p2, p3, p4, p5] = palette
  return (
    <div className="art art-canvas" aria-hidden="true">
      <svg viewBox="0 0 800 460" className="art-svg">
        <defs>
          <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="art-dot" />
          </pattern>
        </defs>
        <rect width="800" height="460" fill="url(#dots)" />

        {/* frames */}
        <g className="art-frame art-float-1">
          <rect x="70" y="80" width="260" height="170" rx="10" fill={p1} opacity="0.92" />
          <rect x="94" y="104" width="120" height="14" rx="7" fill="#fff" opacity="0.85" />
          <rect x="94" y="130" width="200" height="10" rx="5" fill="#fff" opacity="0.5" />
          <rect x="94" y="150" width="160" height="10" rx="5" fill="#fff" opacity="0.5" />
          <rect x="94" y="196" width="88" height="30" rx="15" fill="#fff" opacity="0.95" />
        </g>
        <g className="art-frame art-float-2">
          <rect x="380" y="140" width="200" height="220" rx="10" fill={p2} opacity="0.92" />
          <circle cx="480" cy="210" r="34" fill="#fff" opacity="0.9" />
          <rect x="420" y="270" width="120" height="10" rx="5" fill="#fff" opacity="0.6" />
          <rect x="420" y="292" width="80" height="10" rx="5" fill="#fff" opacity="0.6" />
        </g>
        <g className="art-frame art-float-3">
          <rect x="620" y="60" width="120" height="120" rx="60" fill={p3} opacity="0.92" />
        </g>
        <g className="art-frame art-float-1" style={{ animationDelay: '-6s' }}>
          <rect x="560" y="300" width="180" height="90" rx="10" fill={p4} opacity="0.92" />
          <rect x="584" y="324" width="60" height="10" rx="5" fill="#fff" opacity="0.7" />
        </g>
        <path d="M 120 330 C 220 380, 300 300, 360 350" stroke={p5} strokeWidth="5" fill="none" strokeLinecap="round" className="art-stroke" />

        {/* selection box */}
        <rect x="372" y="132" width="216" height="236" rx="4" className="art-select" />

        {/* cursors */}
        {CURSORS.map((c, i) => (
          <g key={c.name} className="art-cursor" style={{ ['--x' as string]: `${c.x}%`, ['--y' as string]: `${c.y}%`, ['--dur' as string]: `${c.dur}s` }}>
            <path d="M0 0 L0 16 L4.5 12 L7.5 19 L10 18 L7 11 L13 11 Z" fill={palette[(i + 1) % palette.length]} stroke="#fff" strokeWidth="1.2" />
            <g transform="translate(14 14)">
              <rect width={c.name.length * 8 + 14} height="18" rx="9" fill={palette[(i + 1) % palette.length]} />
              <text x="7" y="13" fontSize="11" fill="#fff" fontFamily="Inter, system-ui" fontWeight="600">{c.name}</text>
            </g>
          </g>
        ))}
      </svg>
    </div>
  )
}

function NeutralArt({ palette }: { palette: string[] }) {
  return (
    <div className="art art-neutral" aria-hidden="true">
      <svg viewBox="0 0 800 460" className="art-svg">
        {palette.map((c, i) => (
          <circle key={c} cx={140 + i * 130} cy={230 + (i % 2 ? -40 : 40)} r={70} fill={c} opacity="0.85" className={`art-frame art-float-${(i % 3) + 1}`} />
        ))}
      </svg>
    </div>
  )
}
