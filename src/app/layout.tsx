import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ThemeToggle } from '../components/chrome/ThemeToggle'
import '../styles/tokens.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'Product Teardown Atlas', template: '%s | Product Teardown Atlas' },
  description: 'Structured product teardowns where every claim is labelled fact, inference or judgment, and the gaps are published too.',
}

/* Sets the theme before first paint so there's no flash. Reads a saved choice, then
   falls back to the system preference. Tiny, inline, and the only inline script. */
const themeInit = `(function(){try{var t=localStorage.getItem('atlas-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <header className="site-header">
          <a className="wordmark" href="/">
            Product Teardown Atlas
          </a>
          <nav aria-label="Primary">
            <a href="/">Teardowns</a>
            <ThemeToggle />
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>Every claim here is labelled: fact, inference or judgment. Every number links to a source someone actually opened. The gaps are published, not hidden.</p>
        </footer>
      </body>
    </html>
  )
}
