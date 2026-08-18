import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import DecryptedText from '../reactbits/DecryptedText'
import { cn } from './cn'

type ScrambleTextProps = {
  text: string
  /** `view` resolves once on scroll-in; `hover` re-scrambles on every pass. */
  animateOn?: 'view' | 'hover'
  /** Milliseconds per character step. */
  speed?: number
  className?: string
}

/**
 * Text that resolves character by character out of noise.
 *
 * React Bits' <DecryptedText>, restricted to the two triggers this site uses
 * and to a character set that keeps the scramble the same visual weight as the
 * settled text — upstream's default alphabet mixes ascenders, descenders and
 * punctuation, which makes the line jitter as it resolves. Unresolved
 * characters are dimmed to `ink-faint` so the reveal reads as a wipe.
 *
 * Static text under reduced motion.
 */
export function ScrambleText({
  text,
  animateOn = 'view',
  speed = 34,
  className,
}: ScrambleTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <DecryptedText
      text={text}
      animateOn={animateOn}
      sequential
      revealDirection="start"
      speed={speed}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      parentClassName={cn(className)}
      encryptedClassName="text-ink-faint"
    />
  )
}
