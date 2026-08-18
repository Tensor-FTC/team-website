import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { heroContainer, heroItem } from '../../config/motion'
import { AnimatedHeading } from '../ui/AnimatedHeading'
import { Section } from './Section'

type PageHeaderProps = {
  kicker: string
  title: string
  description: string
  /** Buttons or links rendered under the copy. */
  actions?: ReactNode
  /** Key/value pairs rendered as a spec row beneath the header. */
  meta?: { label: string; value: string }[]
}

/**
 * The masthead at the top of every inner page.
 *
 * Holds the page's single <h1>. The copy animates in on mount rather than on
 * scroll, since it is already in view. The optional meta row reads like a spec
 * sheet: monospace keys, hairline dividers, no boxes.
 */
export function PageHeader({ kicker, title, description, actions, meta }: PageHeaderProps) {
  return (
    <Section spacing="md" className="pt-8">
      <motion.div variants={heroContainer} initial="hidden" animate="visible" className="max-w-3xl">
        <motion.span variants={heroItem} className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-signal" />
          <span className="kicker text-signal">{kicker}</span>
        </motion.span>

        <motion.div variants={heroItem}>
          <AnimatedHeading
            as="h1"
            text={title}
            immediate
            stagger={55}
            className="display mt-5 text-3xl text-ink sm:text-4xl lg:text-5xl"
          />
        </motion.div>

        <motion.p
          variants={heroItem}
          className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          {description}
        </motion.p>

        {actions && (
          <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center gap-3">
            {actions}
          </motion.div>
        )}
      </motion.div>

      {meta && meta.length > 0 && (
        <motion.dl
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="mt-14 grid grid-cols-1 border-t border-edge sm:grid-cols-2 lg:grid-cols-4"
        >
          {meta.map((item) => (
            <motion.div
              key={item.label}
              variants={heroItem}
              className="min-w-0 border-b border-edge py-4 sm:border-b-0 sm:pr-6 lg:border-r lg:last:border-r-0"
            >
              <dt className="kicker">{item.label}</dt>
              <dd className="mt-2 text-sm font-medium text-ink">{item.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      )}
    </Section>
  )
}
