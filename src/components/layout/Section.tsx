import type { ReactNode } from 'react'
import { cn } from '../ui/cn'

type SectionProps = {
  children: ReactNode
  /** Anchor target for in-page links. */
  id?: string
  /** Vertical rhythm. */
  spacing?: 'sm' | 'md' | 'lg'
  width?: 'narrow' | 'default' | 'wide'
  className?: string
  /** Accessible name, when the section has no visible heading. */
  ariaLabel?: string
}

const spacings = {
  sm: 'py-10',
  md: 'py-14 sm:py-16',
  lg: 'py-16 sm:py-24',
}

const widths = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
}

/** Consistent page section: centred column, standard padding and spacing. */
export function Section({
  children,
  id,
  spacing = 'md',
  width = 'wide',
  className,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('px-4 sm:px-6 lg:px-8', spacings[spacing], className)}
    >
      <div className={cn('mx-auto', widths[width])}>{children}</div>
    </section>
  )
}
