/**
 * Resolves a path under /public against the deployment's base path.
 *
 * Vite rewrites asset URLs it can see at build time — the ones in index.html
 * and anything reached through an `import` — but a path held as a runtime
 * string, like `teamConfig.logoPath` in an <img src>, is invisible to it and
 * ships unchanged. That is fine at the domain root and broken everywhere else:
 * on a GitHub Pages project site the app is served from /team-website/, so a
 * bare "/team-logo.png" resolves above the site and 404s.
 *
 * Every runtime reference to a file in /public goes through here.
 *
 * @example asset('/team-logo.png')
 *   // "/team-logo.png"              when VITE_BASE is unset (Vercel, Netlify, dev)
 *   // "/team-website/team-logo.png" when built with VITE_BASE=/team-website/
 */
export function asset(path: string): string {
  if (!path) return path

  // Absolute URLs and data URIs are already resolved — leave them alone.
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path

  const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}
