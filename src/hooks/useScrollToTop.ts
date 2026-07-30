import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Resets scroll position on route changes so a new page starts at the top.
 *
 * `scroll-behavior: smooth` on <html> would otherwise animate this jump, which
 * looks wrong between pages, so the reset is forced to be instant. In-page
 * anchors (`/about#values`) are left alone — the browser handles those, and it
 * uses the smooth behaviour there, which is what we want.
 */
export function useScrollToTop(): void {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
}
