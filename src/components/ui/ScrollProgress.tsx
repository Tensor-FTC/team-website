import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * A hairline bar across the top of the viewport tracking read progress.
 *
 * Driven by `useScroll`, so it only observes scroll position — it never
 * intercepts it.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-signal"
    />
  )
}
