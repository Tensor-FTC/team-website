import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The base path is "/" for Vercel, Netlify and local development.
// A GitHub Pages *project* site is served from a sub-path, so set VITE_BASE at
// build time, e.g. `VITE_BASE=/team-website/ npm run build`.
const base = process.env.VITE_BASE ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
