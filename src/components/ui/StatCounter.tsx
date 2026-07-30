import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type StatCounterProps = {
  value: number
  prefix?: string
  suffix?: string
  /** Seconds the count-up takes. */
  duration?: number
  className?: string
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Renders the final value immediately when reduced motion is requested. The
 * number is exposed to assistive tech as a single final value rather than a
 * stream of intermediate ones.
 */
export function StatCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const prefersReducedMotion = usePrefersReducedMotion()
  const [counted, setCounted] = useState(0)

  // Derived, not stored: with reduced motion the final value is shown outright
  // and the animation below never runs.
  const display = prefersReducedMotion ? value : counted

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCounted(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isInView, value, duration, prefersReducedMotion])

  const formatted = `${prefix}${display.toLocaleString()}${suffix}`
  const final = `${prefix}${value.toLocaleString()}${suffix}`

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the settled value; the animation is decorative. */}
      <span className="sr-only">{final}</span>
      <span aria-hidden="true">{formatted}</span>
    </span>
  )
}
