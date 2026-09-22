# Product Teardown Atlas

Learn how great products actually think, grow, charge, defend, and get stuck.

Deep teardowns of products you already use, walked through the same ten questions every time so two products can be laid side by side. Every number traces to a source someone opened; every opinion is marked as ours.

**Live:** https://product-teardown-atlas.vercel.app

## Stack

Next.js 15 (App Router), React 19, TypeScript, Zod. Fully prerendered, no serverless functions. Content lives as JSON + MDX under `content/products/<slug>/` and is validated by the schema in `src/schema/` at build time.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm test
npm run build
```

## Add a teardown

1. Copy `content/products/figma/` to `content/products/<slug>/` and fill in the five JSON files and ten MDX sections.
2. Add a brand entry in `src/lib/brand.ts` (palette, motif, refrain).
3. Optional screengrabs go in `public/products/<slug>/screens/`.

The build fails on any claim that doesn't validate, any `<Evidence id />` that doesn't resolve, and any growth-loop edge marked evidenced without sources.

## How claims are labelled

Plain text is what a source says. `<Inference>` is what the evidence suggests. `<Judgment>` is our call. Growth-loop links are drawn solid, dashed, or broken depending on what the sources establish. See `docs/research-methodology.md` and `docs/adr/ADR-001-evidence-bounded-growth-loop.md`.
