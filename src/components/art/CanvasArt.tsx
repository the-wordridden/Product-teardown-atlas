/**
 * Hero artwork. Motif-driven and palette-driven, so it reads as the product's world
 * without ever depicting a real screen or making a claim.
 *
 * `canvas` evokes a design canvas: dotted grid, a few frames, live cursors with name
 * tags drifting across, a selection box. `ledger` evokes a payment flow: a checkout
 * card, a rail with settlements travelling along it, a balance ticking over. Pure SVG +
 * CSS keyframes, reduced-motion safe.
 */

import type { ArtMotif } from '../../lib/brand'
import './canvas-art.css'

const CURSORS = [
  { name: 'Mira', x: 22, y: 30, dur: 14 },
  { name: 'Theo', x: 61, y: 58, dur: 18 },
  { name: 'Ada', x: 78, y: 26, dur: 16 },
]

export function CanvasArt({ motif, palette }: { motif: ArtMotif; palette: string[] }) {
  if (motif === 'ledger') return <LedgerArt palette={palette} />
  if (motif === 'blocks') return <BlocksArt palette={palette} />
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

const SETTLEMENTS = [0, 2.6, 5.1, 7.9]

function LedgerArt({ palette }: { palette: string[] }) {
  const [p1, p2, p3, p4, p5] = palette
  return (
    <div className="art art-ledger" aria-hidden="true">
      <svg viewBox="0 0 800 460" className="art-svg">
        <defs>
          <linearGradient id="ledger-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p1} stopOpacity="0.18" />
            <stop offset="1" stopColor={p3} stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="ledger-card" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p1} />
            <stop offset="1" stopColor={p4} />
          </linearGradient>
        </defs>
        <rect width="800" height="460" fill="url(#ledger-sky)" />

        {/* the rail: a payment travels left to right and settles */}
        <path id="ledger-rail" d="M 40 300 C 200 300, 260 140, 420 140 S 640 300, 760 300" className="art-rail" />
        {SETTLEMENTS.map((delay, i) => (
          <circle key={delay} r="7" fill={palette[(i + 2) % palette.length]} className="art-settle" style={{ animationDelay: `-${delay}s` }}>
            <animateMotion dur="8s" repeatCount="indefinite" begin={`-${delay}s`}>
              <mpath href="#ledger-rail" />
            </animateMotion>
          </circle>
        ))}

        {/* checkout card */}
        <g className="art-frame art-float-1">
          <rect x="80" y="90" width="270" height="170" rx="16" fill="url(#ledger-card)" />
          <rect x="104" y="116" width="46" height="32" rx="6" fill="#fff" opacity="0.85" />
          <rect x="104" y="172" width="150" height="12" rx="6" fill="#fff" opacity="0.7" />
          <rect x="104" y="196" width="90" height="12" rx="6" fill="#fff" opacity="0.5" />
          <rect x="250" y="220" width="76" height="26" rx="13" fill="#fff" opacity="0.95" />
          <rect x="266" y="230" width="44" height="6" rx="3" fill={p1} opacity="0.9" />
        </g>

        {/* balance ledger */}
        <g className="art-frame art-float-2">
          <rect x="470" y="200" width="270" height="190" rx="14" fill="var(--bg-elev)" stroke="var(--rule)" />
          <rect x="494" y="224" width="110" height="10" rx="5" fill={p2} opacity="0.9" />
          <rect x="494" y="252" width="222" height="1.5" fill="var(--rule-strong)" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(0 ${row * 30})`} className="art-row" style={{ animationDelay: `${row * 0.9}s` }}>
              <rect x="494" y="268" width="120" height="9" rx="4.5" fill="var(--ink-faint)" opacity="0.55" />
              <rect x="650" y="268" width="66" height="9" rx="4.5" fill={row === 1 ? p5 : p3} opacity="0.9" />
            </g>
          ))}
        </g>

        {/* wallet chip: the consumer that follows */}
        <g className="art-frame art-float-3">
          <rect x="560" y="70" width="170" height="64" rx="32" fill={p3} opacity="0.95" />
          <circle cx="592" cy="102" r="16" fill="#fff" opacity="0.95" />
          <rect x="618" y="90" width="80" height="10" rx="5" fill="#fff" opacity="0.85" />
          <rect x="618" y="108" width="52" height="8" rx="4" fill="#fff" opacity="0.55" />
        </g>
      </svg>
    </div>
  )
}

/* `blocks`: a page assembling itself out of stacked blocks, some nesting inside others,
   with a cursor dropping the next one in. The primitive, drawn. */
const ROWS = [
  { x: 120, w: 300, kind: 'h' },
  { x: 120, w: 420, kind: 'p' },
  { x: 120, w: 360, kind: 'p' },
  { x: 160, w: 300, kind: 'todo' },
  { x: 160, w: 260, kind: 'todo' },
  { x: 120, w: 400, kind: 'db' },
]

function BlocksArt({ palette }: { palette: string[] }) {
  const [, p2, p3, p4, p5] = palette
  const accents = [p2, p3, p4, p5]
  return (
    <div className="art art-blocks" aria-hidden="true">
      <svg viewBox="0 0 800 460" className="art-svg">
        <defs>
          <linearGradient id="blocks-wash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p4} stopOpacity="0.10" />
            <stop offset="1" stopColor={p2} stopOpacity="0.10" />
          </linearGradient>
        </defs>
        <rect width="800" height="460" fill="url(#blocks-wash)" />

        {/* the page */}
        <rect x="80" y="50" width="520" height="360" rx="14" fill="var(--bg-elev)" stroke="var(--rule)" />

        {ROWS.map((r, i) => (
          <g key={i} className="art-block" style={{ ['--i' as string]: i }} transform={`translate(0 ${90 + i * 48})`}>
            {r.kind === 'todo' ? (
              <rect x={r.x - 26} y="-9" width="16" height="16" rx="4" fill="none" stroke={accents[i % accents.length]} strokeWidth="2.5" />
            ) : null}
            {r.kind === 'db' ? (
              <g>
                <rect x={r.x} y="-12" width={r.w} height="46" rx="8" fill="none" stroke={accents[i % accents.length]} strokeWidth="2" strokeDasharray="5 4" />
                <rect x={r.x + 14} y="-2" width="90" height="10" rx="5" fill={accents[i % accents.length]} opacity="0.75" />
                <rect x={r.x + 120} y="-2" width="60" height="10" rx="5" fill="var(--ink-faint)" opacity="0.5" />
                <rect x={r.x + 14} y="16" width="120" height="8" rx="4" fill="var(--ink-faint)" opacity="0.35" />
              </g>
            ) : (
              <rect
                x={r.x}
                y={r.kind === 'h' ? -14 : -7}
                width={r.w}
                height={r.kind === 'h' ? 22 : 12}
                rx={r.kind === 'h' ? 6 : 6}
                fill={r.kind === 'h' ? 'var(--ink)' : 'var(--ink-faint)'}
                opacity={r.kind === 'h' ? 0.9 : 0.42}
              />
            )}
            {/* the handle that says this is a block you can grab */}
            <circle cx={r.x - 44} cy="0" r="3" fill="var(--ink-faint)" opacity="0.5" />
            <circle cx={r.x - 36} cy="0" r="3" fill="var(--ink-faint)" opacity="0.5" />
          </g>
        ))}

        {/* a loose block waiting to be dropped in */}
        <g className="art-drop">
          <rect x="620" y="120" width="150" height="54" rx="10" fill={p3} opacity="0.92" />
          <rect x="638" y="138" width="80" height="9" rx="4.5" fill="#fff" opacity="0.9" />
          <rect x="638" y="153" width="50" height="7" rx="3.5" fill="#fff" opacity="0.6" />
        </g>
        <g className="art-drop-2">
          <rect x="640" y="250" width="120" height="44" rx="10" fill={p5} opacity="0.9" />
          <rect x="656" y="266" width="64" height="8" rx="4" fill="#fff" opacity="0.85" />
        </g>
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
