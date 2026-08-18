import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, transitions, viewportOnce } from '../../config/motion'
import { AnimatedHeading } from './AnimatedHeading'
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
 *
 * Each part reveals itself rather than the block revealing as one: the rule
 * draws in, the title resolves word by word, and the copy fades up behind it.
 * Wrapping the whole thing in a single reveal would stack a lift on top of the
 * title's own animation and read as mush.
 */
export function SectionHeading({
  kicker,
  title,
  description,
  level = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col', className)} id={id}>
      {kicker && (
        <motion.span
          className="mb-4 flex items-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
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
        </motion.span>
      )}

      <AnimatedHeading
        as={level}
        text={title}
        stagger={45}
        className={cn(
          'display text-ink',
          level === 'h2' ? 'text-3xl sm:text-4xl lg:text-[2.75rem]' : 'text-2xl sm:text-3xl',
        )}
      />

      {description && (
        <motion.div
          className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.12 }}
        >
          {description}
        </motion.div>
      )}
    </div>
  )
}
