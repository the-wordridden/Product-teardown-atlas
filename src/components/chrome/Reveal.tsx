'use client'

/**
 * Scroll reveal + active-section tracking. One IntersectionObserver per concern.
 * Adds `.in` to any [data-reveal] element as it enters, and sets `aria-current` on
 * the rail link matching the section in view. No layout work, no scroll listeners.
 */

import { useEffect } from 'react'

export function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (reduce) {
      els.forEach((el) => el.classList.add('in'))
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      )
      els.forEach((el) => io.observe(el))
    }

    const sections = document.querySelectorAll<HTMLElement>('section.sec[id]')
    const links = new Map<string, HTMLAnchorElement>()
    document.querySelectorAll<HTMLAnchorElement>('.rail a[href^="#"]').forEach((a) => links.set(a.getAttribute('href')!.slice(1), a))
    const active = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        links.forEach((a, id) => {
          if (id === visible.target.id) a.setAttribute('aria-current', 'true')
          else a.removeAttribute('aria-current')
        })
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((s) => active.observe(s))
    return () => active.disconnect()
  }, [])
  return null
}
