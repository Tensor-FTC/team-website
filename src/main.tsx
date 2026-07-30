import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/globals.css'

/**
 * `BASE_URL` is injected by Vite from the `base` option in vite.config.ts, so
 * the router keeps working when the site is served from a sub-path (GitHub
 * Pages). Strip the trailing slash — React Router wants "/team-website" — but
 * keep a lone "/" intact, since an empty basename is not a valid value.
 */
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
