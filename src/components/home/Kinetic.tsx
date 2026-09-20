'use client'

/**
 * Small motion primitives for the homepage. No libraries. Every effect degrades to
 * static under prefers-reduced-motion and none of them touch layout properties.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'

function reduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** A soft radial glow that follows the pointer across its container. */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])
  return (
    <div ref={ref} className={`spotlight ${className}`}>
      {children}
    </div>
  )
}

/** Cycles through words. The outgoing word stays until the incoming one has landed,
 *  so there is never an empty slot, even if a background tab pauses the animation. */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])
  const prev = (i - 1 + words.length) % words.length
  return (
    <span className="rotator" aria-live="polite">
      {/* widest word reserves the width so the line never jumps */}
      <span className="rotator-ghost" aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      {i > 0 || words.length === 1 ? (
        <span key={`out-${i}`} className="rotator-word rotator-out" aria-hidden="true">
          {words[prev]}
        </span>
      ) : null}
      <span key={`in-${i}`} className="rotator-word rotator-in">
        {words[i]}
      </span>
    </span>
  )
}

/** 3D tilt toward the pointer, with a moving sheen. */
export function Tilt({ children, className = '', max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', `${(-py * max).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${(px * max).toFixed(2)}deg`)
      el.style.setProperty('--sx', `${((px + 0.5) * 100).toFixed(1)}%`)
      el.style.setProperty('--sy', `${((py + 0.5) * 100).toFixed(1)}%`)
    }
    const reset = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
    }
  }, [max])
  return (
    <div ref={ref} className={`tilt ${className}`}>
      {children}
    </div>
  )
}

/** Counts up from 0 when it scrolls into view. */
export function CountUp({ to, suffix = '', duration = 1200 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState(reduced() ? to : 0)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setV(Math.round(to * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])
  return (
    <span ref={ref} className="countup">
      {v}
      {suffix}
    </span>
  )
}

/** Splits a headline into words that rise in with a stagger once visible. */
export function SplitWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <span ref={ref} className={`split ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="split-w" style={{ ['--i' as string]: i }} aria-hidden="true">
          {w}
        </span>
      ))}
    </span>
  )
}
