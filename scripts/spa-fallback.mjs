/**
 * Copies dist/index.html to dist/404.html after a build.
 *
 * GitHub Pages has no rewrite rules, so a deep link like /team is a real 404.
 * Serving the app shell as the 404 page lets React Router pick the request up
 * and render the right route. Harmless on Vercel and Netlify, which use the
 * rewrite rules in vercel.json / netlify.toml instead.
 */
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')
const source = resolve(dist, 'index.html')
const target = resolve(dist, '404.html')

if (!existsSync(source)) {
  console.error('spa-fallback: dist/index.html not found — did the build run?')
  process.exit(1)
}

copyFileSync(source, target)
console.log('spa-fallback: wrote dist/404.html')
