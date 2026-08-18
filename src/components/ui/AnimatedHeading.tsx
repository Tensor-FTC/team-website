import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import BlurText from '../reactbits/BlurText'
import { cn } from './cn'

type AnimatedHeadingProps = {
  /** Plain text. Headings animate word by word, so markup is not supported. */
  text: string
  /** Heading level — keep one <h1> per page. */
  as?: 'h1' | 'h2' | 'h3' | 'p'
  /** Milliseconds between one word starting and the next. */
  stagger?: number
  /** Start the reveal on mount rather than waiting to be scrolled to. */
  immediate?: boolean
  className?: string
}

/**
 * A headline that resolves out of a blur, one word at a time.
 *
 * React Bits' <BlurText> does the work; this wrapper is what keeps it on-brand:
 * a real heading element rather than a <p>, a slower per-word stagger and a
 * shorter travel than upstream's default, and plain static text whenever the
 * visitor has asked for reduced motion.
 *
 * BlurText lays its words out with `flex flex-wrap`, so alignment comes from
 * flex utilities — pass `justify-center` rather than `text-center`.
 */
export function AnimatedHeading({
  text,
  as = 'h2',
  stagger = 60,
  immediate = false,
  className,
}: AnimatedHeadingProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const Tag = as

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <BlurText
      as={as}
      text={text}
      className={cn(className)}
      delay={stagger}
      stepDuration={0.32}
      easing={[0.22, 0.61, 0.36, 1]}
      // A headline already on screen should not wait for a scroll that never
      // comes; one below the fold should wait until it is nearly in view.
      threshold={immediate ? 0 : 0.15}
      // Upstream lifts words 50px, which reads as a bounce at display sizes.
      // 18px is enough to feel like the words settle into place.
      animationFrom={{ filter: 'blur(12px)', opacity: 0, y: -18 }}
      animationTo={[
        { filter: 'blur(6px)', opacity: 0.6, y: -4 },
        { filter: 'blur(0px)', opacity: 1, y: 0 },
      ]}
    />
  )
}
