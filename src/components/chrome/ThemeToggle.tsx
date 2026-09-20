'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function readInitial(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  useEffect(() => {
    let initial: Theme | null = null
    try {
      const saved = localStorage.getItem('atlas-theme')
      if (saved === 'light' || saved === 'dark') initial = saved
    } catch {
      /* ignore */
    }
    const resolved = initial ?? readInitial()
    document.documentElement.setAttribute('data-theme', resolved)
    setTheme(resolved)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('atlas-theme', next)
    } catch {
      /* private mode etc. */
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Theme">
      <span className="theme-track" data-theme={theme}>
        <span className="theme-knob" />
      </span>
      <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
