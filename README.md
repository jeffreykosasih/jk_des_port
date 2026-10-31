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
| `npm run theme` | Regenerates the per-project theme CSS (see below) |

## How the theming works

Every project page has its own background, display face, and accent colour, in
both themes. It's driven entirely by CSS custom properties, so no component
hard-codes a colour.

```
lib/data.ts                    accent: '#e04848'   ← source of truth
        │
        ▼
scripts/palette.py             solves a full palette from that one hue
        │                      and audits every pair for WCAG AAA
        ▼
app/project-themes.css         [data-project='01'] { --site-*: … }   (generated)
        │
        ▼
components/ProjectView.tsx     <section data-project="01">
                               everything inside inherits the project's tokens
```

To change a project's colour, edit its `accent` in `lib/data.ts` and run:

```bash
npm run theme
```

That regenerates `app/project-themes.css` and re-runs the contrast audit. Don't
hand-edit the generated file — the next run will overwrite it.

### On the contrast targets

Small text clears **7:1** and large display text clears **4.5:1** — WCAG AAA — on
every project page in both themes. Two things the generator handles that are easy
to get wrong by hand:

- **Opacity is not a colour.** `text-primary/70` looked muted and landed around
  5.3–6.9:1, which fails AAA. Muted text uses solved `--site-text-muted` /
  `--site-text-faint` tokens instead.
- **The background isn't flat.** Two brand-tinted radial glows sit on top of the
  surface, so text near a glow centre is on a lighter colour than the surface
  token suggests. Everything is solved against the worst-case composite, not the
  flat fill.

A brand hue that can't reach 7:1 as small text is used for large display type and
non-text decor instead, with a darkened or lightened sibling doing the text work —
so the colour essence survives even where the literal hex can't.

### One naming quirk

In this codebase the `.dark` class on `<html>` is the **cream/light** theme, not
the dark one. The default (no class) is the dark theme. It's inverted relative to
what the name suggests — worth knowing before editing `globals.css`.

## Deploying

Pushes to `main` deploy through Vercel to
[jeffreyko.com](https://www.jeffreyko.com). See [CONTRIBUTING.md](CONTRIBUTING.md)
for commit conventions and the pre-push checklist.
