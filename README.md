# Tensor — FTC Team Website

The website for Tensor, a *FIRST* Tech Challenge team. A static React app: dark,
type-led design taken off the team mark, a live network-graph animation in the hero,
ten content pages, and all team content kept in plain TypeScript files so you can
edit it without touching components.

Built with React, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion, Lucide
React and React Helmet Async.

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

The dev server prints a local URL (usually <http://localhost:5173>).

### All scripts

| Script            | What it does                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                                        |
| `npm run build`   | Type-checks, builds to `dist/`, and writes the `404.html` fallback |
| `npm run preview` | Serves the built `dist/` locally, exactly as deployed             |
| `npm run lint`    | ESLint over the whole project                                     |

---

## First things to edit

### 1. Your team details

Everything identifying the team lives in one file: **`src/config/teamConfig.ts`**.

Replace `TEAM_NUMBER_PLACEHOLDER` with your real FTC team number, then fill in the
rest:

```ts
export const teamConfig = {
  teamName: 'Tensor',
  teamNumber: 'TEAM_NUMBER_PLACEHOLDER', // <- your number here
  slogan: 'We design, build and program competition robots.',
  email: 'team@example.com',
  school: 'SCHOOL_OR_ORGANIZATION_PLACEHOLDER',
  location: 'CITY_STATE_PLACEHOLDER',
  socialLinks: { instagram: '', youtube: '', github: '' },
  // ...plus foundedYear, season, meetingSchedule, siteUrl and more
}
```

No component hardcodes the team number — every page reads it from here. Social links
left as `''` are hidden automatically, so you only fill in the ones you actually use.

Set `siteUrl` to your final URL (e.g. `https://ourteam.org`) once you know it, and the
canonical and Open Graph tags start pointing at real absolute URLs.

### 2. Your logo

> **Put the logo here: `public/team-logo.png`**
>
> Save your logo image as `team-logo.png` and drop it into the `public/` folder at the
> top of the project, replacing the file already there. That is the whole job — no code
> changes. There is a `public/README.md` with the same note.
>
> The path is set once in `src/config/teamConfig.ts` as `logoPath`, and every component
> reads it from there.

It is used in the navigation bar, footer, favicon and social share image.

The file shipped here is a square, generated version of the Tensor node grid — it does
not include the platypus mascot. Drop the real artwork in at the same path to replace
it; a square crop reads best at 34px in the header.

If the file is ever missing or fails to load, `<TeamLogo>` falls back to an inline SVG
of the same 3x3 network, so the site never shows a broken image and never loses its
identity.

### 3. Your content

Each data file is typed and commented, and contains placeholder entries to copy:

| File                         | Drives                                                     |
| ---------------------------- | ---------------------------------------------------------- |
| `src/data/teamMembers.ts`    | The 7 students, 3 subteams, and the coach and mentors       |
| `src/data/robotFeatures.ts`  | BIOBUZZ's status, specs and build plan on `/robot`          |
| `src/data/projects.ts`       | Project cards and tag filter on `/projects`                 |
| `src/data/outreachEvents.ts` | Outreach events and planned events on `/outreach`           |
| `src/data/resources.ts`      | FTCHub and the resource list on `/resources`                |
| `src/data/joinSteps.ts`      | The steps and questions on `/join`                          |
| `src/data/sponsors.ts`       | Sponsor tiers and levels on `/sponsors`                     |
| `src/data/statistics.ts`     | Headline numbers, awards and team values                    |

Search the project for `PLACEHOLDER` to find everything still waiting on real content —
mostly names, your school, and contact details.

### A few things wired to flip automatically

Because the site reads from those files, several sections change on their own:

- **The robot.** `robotStatus` in `robotFeatures.ts` is `'coming-soon'`, so `/robot` shows
  the Singularity reveal notice. Set it to `'released'`, fill in `robotSpecs` and add
  `/public/images/robot-full.jpg`, and the page becomes the normal photo-and-specs layout.
- **Season names.** `seasonGame` (BIOBUZZ, the season we compete in) and `offseasonGame`
  (DECODE, what Singularity is built for) live in `teamConfig.ts` and are used everywhere
  those names appear.
- **No parent organisation.** `school` is blank, so anywhere it would appear falls back to
  `orgLabel` ("Independent community team"). Fill in `school` and it takes over.
- **Outreach.** `outreachEvents` is empty, so `/outreach` shows what you are planning and
  hides the totals. Add your first real event and the timeline and the impact numbers
  appear by themselves.
- **Awards.** `awards` in `statistics.ts` is empty, so the About page says "No awards yet".
  Add one and it switches to the awards grid.
- **Projects.** `comingSoon: true` on a project shows a "Releasing soon" marker instead of
  a status badge.

### 4. Your images

Drop images into `public/images/` and reference them with an absolute path such as
`/images/robot-hero.jpg`. See `public/images/README.md` for the filenames the
placeholder content already expects.

Any image that is missing renders as a quiet blueprint panel instead of a broken image,
so you can add photos one at a time.

---

## Deploying

The build output in `dist/` is fully static. Because React Router owns the URL, the
host has to serve `index.html` for paths that are not real files — otherwise
refreshing `/team` returns a 404. Config for all three hosts is already included.

### Vercel

Import the repository and accept the defaults. `vercel.json` sets the build command,
the output directory and the catch-all rewrite.

### Netlify

Connect the repository. `netlify.toml` sets the build command, `publish = "dist"` and
the `/* -> /index.html` redirect with status 200.

### GitHub Pages

A workflow is included at `.github/workflows/deploy-pages.yml`. Once:

1. Push to `main`.
2. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Every later push to `main` lints, builds and deploys automatically.

Two details the workflow already handles, worth knowing about:

- **Sub-path.** A project site is served from `https<!---->://<user>.github.io/<repo>/`, so the
  workflow builds with `VITE_BASE=/<repo>/`. Vite uses that for asset URLs and
  `src/main.tsx` feeds it to the router as `basename`. Building a **user/org** site
  (`<user>.github.io`) instead? Delete the `VITE_BASE` line from the workflow.
- **Deep links.** GitHub Pages has no rewrite rules, so `npm run build` also copies
  `index.html` to `404.html` (`scripts/spa-fallback.mjs`). Pages serves that for
  unknown paths, and the router then renders the right page.

To build for Pages locally:

```bash
VITE_BASE=/your-repo-name/ npm run build
```

---

## How it is put together

```text
src/
  components/
    layout/      Layout shell, page header, footer, section wrapper, SEO
    navigation/  Navigation bar and animated mobile menu
    sections/    Composable page sections (hero, lists, timelines, form)
    ui/          Primitives: panel, buttons, reveals, logo, counters, network graph
  config/        teamConfig, navigation links, shared animation variants
  data/          All editable content
  hooks/         Reduced motion, parallax, scroll restoration
  pages/         One file per route
  styles/        globals.css — design tokens and base styles
```

**Routes** — `/`, `/about`, `/team`, `/join`, `/robot`, `/projects`, `/outreach`,
`/resources`, `/sponsors`, `/contact`, plus a catch-all 404. Defined in `src/App.tsx`; the navigation bar and
footer read the same list from `src/config/navigation.ts`, so adding a page to that
array puts it in both menus.

**Design tokens** — colours, shadows and radii are CSS variables declared in a
Tailwind `@theme` block in `src/styles/globals.css`. The palette is the logo:
`--color-signal` is the light blue of the top row, `--color-node` the deep navy of the
middle row, over a near-black canvas. Change `--color-signal` and the whole site
follows. The site is dark-only, which is why there is no second palette to keep in
sync. Every text colour was measured against its background — all pass WCAG AA and
most reach AAA.

**Design approach** — flat surfaces with hairline borders, not stacked blur and
gradient layers. Section labels are small monospace kickers rather than pill badges,
and lists are separated by rules instead of being boxed into cards. The intent is that
the network graph and the typography carry the personality, so everything else can
stay quiet.

**Animation** — `src/components/ui/NetworkGraph.tsx` is the signature piece: a canvas
grid of nodes wired like the logo, with signals travelling the edges and nodes
brightening and leaning toward the pointer. It pauses via `IntersectionObserver` when
scrolled off screen, and draws a single static frame when reduced motion is requested.
Everything else uses the shared variants in `src/config/motion.ts`, and
`<MotionConfig reducedMotion="user">` in `App.tsx` makes all of it respect the OS
setting.

**Accessibility** — one `<h1>` per page, ordered headings, a skip link, visible focus
rings, `aria-current` on the active nav item, labelled form fields with error messages
wired up through `aria-describedby`, and live regions announcing filter results. Every
page was checked for horizontal overflow down to a 320px-wide screen.

### The contact form

There is no server, so a valid submission opens the visitor's email client with the
message pre-filled. To collect submissions properly instead, replace `handleSubmit` in
`src/components/sections/ContactForm.tsx` with a POST to a form service (Formspree,
Netlify Forms, Google Forms). The markup and validation can stay as they are.

---

## Notes

- `index.html` deliberately has no `<title>` or `<meta name="description">`.
  `src/components/layout/Seo.tsx` sets both per route; declaring them in the HTML too
  would leave duplicates in the document head.
- *FIRST*® and *FIRST*® Tech Challenge are trademarks of FIRST, which does not
  sponsor, support or endorse this site.
