'use client'

/**
 * Phone-width section navigation: one sticky bar showing where you are, which opens a
 * list of sections. Replaces the full rail, which on phones rendered as a ten-item block
 * above the content and pushed the first section more than two screens down.
 *
 * Tracks the section in view with an IntersectionObserver and closes itself when a
 * section is chosen. Hidden above 900px, where the desktop rail takes over.
 */

import { useEffect, useRef, useState } from 'react'

export interface MenuItem {
  id: string
  num: string
  title: string
}

export function SectionMenu({ items }: { items: MenuItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const [current, setCurrent] = useState(items[0]?.title ?? '')

  useEffect(() => {
    const byId = new Map(items.map((i) => [i.id, i.title]))
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e))
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setCurrent(byId.get(visible[0].target.id) ?? '')
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])

  return (
    <details ref={ref} className="secmenu">
      <summary>
        <span className="secmenu-k">Section</span>
        <span className="secmenu-cur">{current}</span>
        <span className="secmenu-caret" aria-hidden="true">
          ▾
        </span>
      </summary>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={() => {
                if (ref.current) ref.current.open = false
              }}
            >
              <span className="secmenu-n">{i.num}</span> {i.title}
            </a>
          </li>
        ))}
      </ol>
    </details>
  )
}
