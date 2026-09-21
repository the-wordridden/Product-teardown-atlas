import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { ThemeToggle } from '../components/chrome/ThemeToggle'
import '../styles/tokens.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'Product Teardown Atlas', template: '%s | Product Teardown Atlas' },
  description: 'Structured product teardowns where every claim is labelled fact, inference or judgment, and the gaps are published too.',
}

/* Sets the theme before first paint so there's no flash. Reads a saved choice, then
   falls back to the system preference. Tiny and inline. */
const themeInit = `(function(){try{var t=localStorage.getItem('atlas-theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`

/* Microsoft Clarity, the only analytics on the site (Section 4 decision). Loaded after
   hydration so it never competes with first paint. Hosts are allow-listed in the CSP. */
const CLARITY_ID = 'ylo4y212wv'
const clarityInit = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`

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
          <p>Teardowns of products you already use. Every number traces to a source; hover any ● to see it.</p>
        </footer>
        <Script id="ms-clarity" strategy="afterInteractive">{clarityInit}</Script>
      </body>
    </html>
  )
}
