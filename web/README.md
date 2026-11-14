# rd0.ai

The marketing site for Jinx. Next.js 15, static export, no server.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # -> web/out  (what Netlify and Vercel publish)
npm run lint
npm run typecheck
npm run data       # regenerate the numbers from research/experiments/results
```

## One gotcha

**`npm run build` stops a running dev server.** That is deliberate. `next build`
and `next dev` both write `.next` and share the SWC cache, so a build started
while the dev server is up replaces the chunks it is serving — you get
`Cannot find module './611.js'` and then 500s. The `prebuild` hook kills the dev
server first rather than letting that happen.

So after a build, start the dev server again:

```bash
npm run dev
```

## Where the numbers come from

Nothing on the page is typed by hand. `scripts/make_data.py` reads
`research/experiments/results/` and writes `src/data/rv0.json`; the components
read that. Re-run `npm run data` after any experiment re-run so the site cannot
drift from the papers.

The market comparison in `src/data/market.ts` is the exception: it is a hand-kept
table sourced from `research/docs/commercial_tools_comparison.md`, which records
the date each vendor's docs were read.

## Theme

Light and dark, light by default, OS preference on a first visit, choice stored
in `localStorage`. An inline script in `app/layout.tsx` sets the class before
first paint so there is no flash. Tokens live in `app/globals.css` and are named
for their job — `accent`, `note` — rather than for a hue, so a palette change is
one block of CSS.

## Motion

Small primitives in `src/lib/motion.ts` and `src/components/motion/`, not a
library: a 34 kB animation dependency is hard to justify on a page whose pitch is
"6 ms, no dependencies". Every effect is a no-op under `prefers-reduced-motion`,
and the demo renders in its finished state on the server, so nothing depends on
JavaScript.
