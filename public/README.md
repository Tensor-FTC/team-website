# The `public/` folder

Files in here are served as-is from the root of the site. `public/team-logo.png`
becomes `/team-logo.png` in the browser.

## Putting in the team logo

**Save your logo image as `team-logo.png` and drop it in this folder, replacing the
file that is already here.** That is the whole job — no code changes.

- Path: `public/team-logo.png`
- A **square** image works best; it is displayed at 34px in the header and 40px in
  the footer, and doubles as the favicon and the social share image.
- PNG with a transparent or dark background. 512×512 is plenty.

The file currently here is a generated version of the Tensor node grid, without the
platypus mascot. Replace it with the real artwork.

If you would rather use a different filename or format, change `logoPath` in
`src/config/teamConfig.ts` — every component reads the path from there, so that one
line is the only place it is defined.

If the file is missing or fails to load, `<TeamLogo>` falls back to an inline SVG of
the same 3×3 network, so the site never shows a broken image.

## Everything else in here

- `images/` — photos used around the site. See `images/README.md`.
