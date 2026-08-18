import type { ReactNode } from 'react'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import Magnet from '../reactbits/Magnet'

type MagneticProps = {
  children: ReactNode
  /** How far out the pull starts, in pixels. */
  reach?: number
  /**
   * Divisor on the offset, so a larger number is a *weaker* pull. Upstream
   * defaults to 2, which drags a button halfway to the cursor.
   */
  strength?: number
  className?: string
}

/**
 * Leans its child toward the cursor as the cursor approaches.
 *
 * React Bits' <Magnet>, tuned down hard — the point is that a button feels
 * responsive before you reach it, not that it chases the mouse. Renders the
 * child untouched on touch devices and under reduced motion, where the effect
 * is either meaningless or unwelcome.
 */
export function Magnetic({ children, reach = 80, strength = 7, className }: MagneticProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const finePointer = useFinePointer()

  if (prefersReducedMotion || !finePointer) return <>{children}</>

  return (
    <Magnet
      padding={reach}
      magnetStrength={strength}
      wrapperClassName={className}
      activeTransition="transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)"
      inactiveTransition="transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)"
    >
      {children}
    </Magnet>
  )
}
