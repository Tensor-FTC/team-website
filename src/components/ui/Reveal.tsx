import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from '../../config/motion'

type RevealProps = {
  children: ReactNode
  as?: ElementType
  /** Seconds to wait before starting. */
  delay?: number
  className?: string
  id?: string
}

/** Fades and lifts its children into view the first time they are scrolled to. */
export function Reveal({ children, as = 'div', delay = 0, className, id }: RevealProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Tag
      id={id}
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

/**
 * Reveals its direct children one after another. Wrap each child in
 * <RevealItem> — or use `motion` elements with the `staggerItem` variants.
 */
export function RevealGroup({ children, as = 'div', delay = 0, className, id }: RevealProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Tag
      id={id}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delayChildren: delay }}
    >
      {children}
    </Tag>
  )
}

/** A single staggered child of <RevealGroup>. */
export function RevealItem({
  children,
  as = 'div',
  className,
  id,
}: Omit<RevealProps, 'delay'>) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div

  return (
    <Tag id={id} className={className} variants={staggerItem}>
      {children}
    </Tag>
  )
}
