# Jeffrey Ko — UX/UI Portfolio

Personal portfolio at **[jeffreyko.com](https://www.jeffreyko.com)**. Case studies,
product thinking, and selected work.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

## Work

| # | Project | What it is | Type | Live |
| --- | --- | --- | --- | --- |
| 01 | iDriver | Delivery app with clearer maps and reliable proof-of-delivery | Self-initiated redesign | — |
| 02 | Port Jeffrey | Explorable 3D island built with Three.js | Designed and built | [portjeffrey.vercel.app](https://portjeffrey.vercel.app/) |
| 03 | Peter Parking | One app for street parking across every operator | Concept | — |
| 04 | Sigma | Finance app that forecasts what you *can* spend | Concept | — |
| 05 | Revo Fitness | Gym app restructured so members can see what their plan includes | Self-initiated redesign | — |
| 06 | Rooted | Habit tracker framed through a plant metaphor | Concept | — |
| 07 | Katsu Seiba | Japanese restaurant concept — menu browsing and reservations | Concept | [katsuseiba.vercel.app](https://katsuseiba.vercel.app) |
| 08 | Fruitea | Learning site for produce benefits, risks, and recipes | — | [fruitea.vercel.app](https://fruitea.vercel.app) |

The numbers match the order on the site. The type label is the `kind` field
in `lib/data.ts`.

## Running it locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build — catches font and image problems dev mode hides |
| `npm run lint` | ESLint |

## How the theming works

There is no light or dark mode. Everything is CSS custom properties in
`app/globals.css`, so no component hard-codes a colour.

- **Home page:** sections alternate white and black, and each brings one
  colour of its own through a `tone-*` class (violet, marigold, vermilion,
  and a YouTube red for the Shorts row). `--essence` is that colour at full strength for display type and
  shapes; `--site-accent` is the cut that clears 7:1 as small text.
- **Project pages:** `[data-project='<slug>']` sets two cuts of the project's
  colour, `--pj-dark` for black sections and `--pj-light` for white ones, each
  measured at 7:1 or better. `tone-pj-dark` and `tone-pj-light` apply them.
- **Type:** Bricolage Grotesque for text, the same face narrow and heavy for
  display (`type-display`), and Instrument Serif for asides (`type-aside`).
- **Corners** are square, set by `--radius-control` and `--radius-frame`.

## Deploying

Pushes to `main` deploy through Vercel to
[jeffreyko.com](https://www.jeffreyko.com). See [CONTRIBUTING.md](CONTRIBUTING.md)
for commit conventions and the pre-push checklist.
