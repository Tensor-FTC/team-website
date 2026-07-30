import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { transitions, viewportOnce } from '../../config/motion'
import { Reveal } from './Reveal'
import { cn } from './cn'

type SectionHeadingProps = {
  /** Small monospace label above the title. */
  kicker?: string
  title: string
  description?: ReactNode
  /** Heading level — keep one <h1> per page. */
  level?: 'h2' | 'h3'
  /** Anchor id, so the title can be linked to. */
  id?: string
  className?: string
}

/**
 * Kicker + title + supporting copy.
 *
 * The kicker is a plain monospace label with a short rule, not a floating pill —
 * it reads like a spec sheet rather than a marketing badge.
 */
export function SectionHeading({
  kicker,
  title,
  description,
  level: Heading = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('flex flex-col', className)} id={id}>
      {kicker && (
        <span className="mb-4 flex items-center gap-3">
          {/* The rule draws itself in as the heading arrives. */}
          <motion.span
            aria-hidden="true"
            className="h-px bg-signal"
            initial={{ width: 0 }}
            whileInView={{ width: '1.5rem' }}
            viewport={viewportOnce}
            transition={{ ...transitions.base, delay: 0.1 }}
          />
          <span className="kicker text-signal">{kicker}</span>
        </span>
      )}

      <Heading
        className={cn(
          'font-semibold tracking-tight text-ink',
          Heading === 'h2' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl',
        )}
      >
        {title}
      </Heading>

      {description && (
        <div className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{description}</div>
      )}
    </Reveal>
  )
}
