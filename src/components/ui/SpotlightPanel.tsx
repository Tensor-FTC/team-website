import type { ReactNode } from 'react'
import SpotlightCard from '../reactbits/SpotlightCard'
import { cn } from './cn'

type SpotlightPanelProps = {
  children: ReactNode
  className?: string
}

/**
 * A <Panel>-shaped surface with a cursor-tracking highlight.
 *
 * Wraps React Bits' <SpotlightCard>. Upstream ships opinionated chrome baked
 * into the component — `rounded-3xl`, `border-neutral-800`, `bg-neutral-900`,
 * `p-8` — so the four utilities below carry `!` to win against them and put the
 * card back on this site's tokens. Everything else, including the spotlight
 * itself, is upstream's.
 *
 * The highlight is signal blue at low alpha rather than upstream's white: on a
 * near-black canvas white reads as a smudge, while the logo's blue reads as the
 * surface catching light.
 */
export function SpotlightPanel({ children, className }: SpotlightPanelProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(91, 194, 231, 0.16)"
      className={cn(
        'rounded-xl! border-edge! bg-surface! p-0!',
        'shadow-panel transition-colors duration-200 hover:border-signal/40!',
        className,
      )}
    >
      {children}
    </SpotlightCard>
  )
}
