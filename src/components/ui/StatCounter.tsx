import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import CountUp from '../reactbits/CountUp'

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
 * React Bits' <CountUp> drives the number on a spring, so it eases into its
 * final value instead of stopping dead. It writes to `textContent` directly and
 * never re-renders, which is why the whole stat row can animate at once without
 * costing anything.
 *
 * The settled value is also rendered visually hidden: assistive tech reads one
 * final number rather than a stream of intermediate ones. With reduced motion
 * requested there is no animation and no duplicate node — just the number.
 */
export function StatCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}: StatCounterProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const final = `${prefix}${value.toLocaleString()}${suffix}`

  if (prefersReducedMotion) {
    return <span className={className}>{final}</span>
  }

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true">
        {prefix}
        <CountUp to={value} duration={duration} separator="," />
        {suffix}
      </span>
    </span>
  )
}
