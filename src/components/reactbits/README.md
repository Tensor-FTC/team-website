# React Bits components

Third-party animation components from [React Bits](https://reactbits.dev), copied
in rather than installed — that is how the library is distributed (`jsrepo`
copies source into your project; there is no runtime package to depend on).

Files here are kept as close to upstream as possible so they can be re-synced.
Every deviation is listed in the header comment of the file it applies to. The
common one is the import path: upstream imports `motion/react`, this project
already depends on `framer-motion`, which is the same library under its older
package name.

Upstream source: `src/ts-tailwind/**` in
[github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits).

## What is here, and where it is used

| Component       | Used by                                            |
| --------------- | -------------------------------------------------- |
| `BlurText`      | Hero and page headlines, via `<AnimatedHeading>`   |
| `ShinyText`     | The identity chip in the hero                      |
| `CountUp`       | `<StatCounter>`, behind the numbers on stat rows   |
| `DecryptedText` | The team-number readout and reveal titles, via `<ScrambleText>` |
| `SpotlightCard` | `<SpotlightPanel>` — cards that track the pointer  |
| `Magnet`        | `<Magnetic>` — primary calls to action             |

## Reduced motion

Upstream does not check `prefers-reduced-motion`. The wrappers in
`src/components/ui/` do, and fall back to plain static content — so import those
rather than reaching for these files directly.
