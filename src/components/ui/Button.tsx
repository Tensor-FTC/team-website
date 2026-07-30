import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { transitions } from '../../config/motion'
import { cn } from './cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-md font-medium ' +
  'whitespace-nowrap transition-colors duration-200 select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ' +
  'disabled:pointer-events-none disabled:opacity-55'

const variants: Record<Variant, string> = {
  // Signal blue is light, so the label is the dark page colour. `sheen` adds a
  // light sweep on hover (see globals.css).
  primary: 'sheen bg-signal text-canvas-deep hover:bg-signal/90',
  secondary:
    'border border-edge-strong bg-surface text-ink hover:border-signal/50 hover:bg-surface-high',
  ghost: 'text-ink-soft hover:text-signal',
}

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-4.5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

/** A restrained lift on hover — no scaling, no glow. */
const interaction = {
  whileHover: { y: -1 },
  whileTap: { y: 0 },
  transition: transitions.spring,
}

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}

type SharedProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

/** A real <button>. Use for actions that do not navigate. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: SharedProps & Omit<ComponentProps<typeof motion.button>, keyof SharedProps>) {
  return (
    <motion.button className={classesFor(variant, size, className)} {...interaction} {...props}>
      {children}
    </motion.button>
  )
}

const MotionLink = motion.create(Link)

/** An in-app link styled as a button. Routes through React Router. */
export function ButtonLink({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: SharedProps & { to: string } & Omit<
    ComponentProps<typeof MotionLink>,
    keyof SharedProps | 'to'
  >) {
  return (
    <MotionLink to={to} className={classesFor(variant, size, className)} {...interaction} {...props}>
      {children}
    </MotionLink>
  )
}

/** An outbound link styled as a button. Opens in a new tab. */
export function ButtonExternal({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: SharedProps & { href: string } & Omit<
    ComponentProps<typeof motion.a>,
    keyof SharedProps | 'href'
  >) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={classesFor(variant, size, className)}
      {...interaction}
      {...props}
    >
      {children}
    </motion.a>
  )
}
