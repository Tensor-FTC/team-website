import { useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * A gentle vertical offset tied to an element's position in the viewport.
 *
 * This only ever *reads* scroll position — normal scrolling is never
 * intercepted or hijacked. Returns a constant 0 when the user asks for reduced
 * motion.
 *
 * @param ref      Element to track.
 * @param distance Pixels of travel across the full pass through the viewport.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 40,
): MotionValue<number> {
  const prefersReducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [distance, -distance],
  )

  // Smooth the raw value so the movement never feels twitchy.
  return useSpring(raw, { stiffness: 90, damping: 26, restDelta: 0.5 })
}
