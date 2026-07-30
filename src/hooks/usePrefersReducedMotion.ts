import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the OS "reduce motion" setting and updates if the user changes it.
 *
 * Framer Motion's <MotionConfig reducedMotion="user"> already suppresses
 * transform animations globally. Use this hook for the extras Framer cannot
 * know about — parallax offsets, counters and looping decorative motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)

    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  return prefersReducedMotion
}
