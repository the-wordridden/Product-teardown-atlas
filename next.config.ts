import type { NextConfig } from 'next'

/**
 * 100% prerendered, zero serverless functions (ADR #1/#2). Standard Vercel
 * deployment, deliberately NOT `output: 'export'`, so redirects() and headers()
 * stay available at the edge.
 *
 * CSP: strict in production. Next's dev runtime needs `unsafe-eval` for hot
 * reload, so it's allowed only when NODE_ENV=development. The production header
 * never includes it.
 */
const isDev = process.env.NODE_ENV === 'development'

/* Microsoft Clarity: tag script from www.clarity.ms, session data to *.clarity.ms and c.bing.com. */
const CLARITY_HOSTS = ['https://www.clarity.ms', 'https://*.clarity.ms', 'https://c.bing.com']

const scriptSrc = ["'self'", "'unsafe-inline'", 'https://www.clarity.ms', 'https://*.clarity.ms', ...(isDev ? ["'unsafe-eval'"] : [])].join(' ')

const csp = [
  "default-src 'self'",
  `img-src 'self' data: ${CLARITY_HOSTS.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  `script-src ${scriptSrc}`,
  `connect-src 'self' ${CLARITY_HOSTS.join(' ')}` + (isDev ? ' ws: wss:' : ''),
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default nextConfig
