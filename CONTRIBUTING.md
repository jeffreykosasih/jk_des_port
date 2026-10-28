# Working on this repo

Notes to self (and to anyone reading the history later). The point of all of it is
that `git log` should read like a changelog without needing to open a single diff.

## Commit messages

Format:

```
<type>(<scope>): <subject>

<why, if it isn't obvious>
```

`type` is one of:

| type | use it for |
| --- | --- |
| `feat` | a new project page, section, or capability |
| `fix` | something was broken and now isn't |
| `style` | visual/CSS change with no behaviour change |
| `a11y` | contrast, focus, labels, reduced motion |
| `content` | copy, images, videos, case-study text |
| `perf` | image compression, bundle size, font loading |
| `refactor` | same behaviour, different code |
| `chore` | deps, config, tooling |

`scope` is optional and is usually a project id or an area: `pj05`, `work`,
`contact`, `theme`, `seo`.

Three rules that matter more than the format:

**Imperative mood.** "Add the Rooted case study", not "Added" and not "Adding".
The test: the subject should complete the sentence *"If applied, this commit
will ___"*. Past tense reads oddly there, which is the whole point.

**One concern per commit.** A past commit here was
`Add video play buttons, speech-bubble email tooltip, and photo-sampled AAA accent colors`
— three unrelated changes welded together. If it turns out the tooltip broke
something, that commit can't be reverted without also losing the play buttons and
the colour work. Three commits would have cost nothing at the time and would be
worth a lot later.

**Say what changed, not that something changed.** `Polish some parts` and
`Polish some parts on contact and work section` are both in this history, and
neither tells you anything six months on. If the honest answer really is "lots of
small tweaks", list them in the body.

Before/after from this repo's own log:

```
- Added gradient background color and bug fixed on mobile design
+ style: add gradient page background
+ fix(mobile): stop the work grid overflowing below 380px

- Polish some parts on contact and work section
+ style(contact): tighten spacing above the email tooltip
+ style(work): align project numbers to the title baseline

- Add Sigma as project 08 with per-project accents and Mockuuups credit
+ feat(pj08): add the Sigma case study
+ style(theme): give each project its own accent colour
+ content(pj08): credit Mockuuups Studio for the mockup
```

The good ones already in the log — keep writing these:

```
Rename case study routes from /cs0X to /pj0X with permanent redirects
Compress project demo videos to 720p H.264 MP4
Open resume in a new tab with a document icon
```

## Branches

`main` is what Vercel deploys, so it should always be in a state you'd be happy
for someone to load. Work on a branch named `<type>/<short-slug>`:

```
feat/pj09-case-study
fix/mobile-nav-overlap
a11y/aaa-contrast
```

## Before you push

```bash
npm run lint
npx tsc --noEmit
npm run build      # catches font and image issues that dev mode hides
```

If you touched a project's `accent` in `lib/data.ts`, also run:

```bash
npm run theme      # regenerates app/project-themes.css and re-checks contrast
```

Never `git push --force` to `main`. It's the deploy branch, and Vercel will
happily ship whatever lands there.

## Pull requests

Solo project, so PRs are optional — but opening one against `main` for anything
non-trivial gives you a Vercel preview deployment to click through before it goes
live, and a place to leave yourself notes. `.github/pull_request_template.md`
covers what's worth writing down.
