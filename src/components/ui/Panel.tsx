import type { ElementType, ReactNode } from 'react'
import { cn } from './cn'

type PanelProps = {
  children: ReactNode
  /** Render as a different element — `section`, `article`, `li`, etc. */
  as?: ElementType
  /** How far the surface sits off the page. */
  tone?: 'flat' | 'base' | 'high'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  radius?: 'md' | 'lg'
  /** Border turns to signal blue and the panel lifts slightly on hover. */
  hover?: boolean
  /** Adds technical corner marks, like a drawing callout. */
  brackets?: boolean
  className?: string
  id?: string
}

const tones = {
  flat: 'bg-canvas-deep',
  base: 'bg-surface',
  high: 'bg-surface-high',
}

const paddings = {
  none: '',
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-7 sm:p-9',
}

const radii = {
  md: 'rounded-lg',
  lg: 'rounded-xl',
}

/** One L-shaped corner mark. Four of these frame a panel. */
const CORNERS = [
  'left-0 top-0 border-l border-t rounded-tl-lg',
  'right-0 top-0 border-r border-t rounded-tr-lg',
  'left-0 bottom-0 border-l border-b rounded-bl-lg',
  'right-0 bottom-0 border-r border-b rounded-br-lg',
]

/**
 * The standard content surface: a flat panel with a hairline border.
 *
 * Depth comes from the border and a single soft shadow, not from stacked blur
 * and gradient layers. `brackets` adds corner marks that brighten on hover —
 * a small engineering-drawing cue that costs nothing in clutter.
 */
export function Panel({
  children,
  as: Tag = 'div',
  tone = 'base',
  padding = 'md',
  radius = 'lg',
  hover = false,
  brackets = false,
  className,
  id,
}: PanelProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'group/panel relative border border-edge shadow-panel',
        tones[tone],
        paddings[padding],
        radii[radius],
        hover &&
          'transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-signal/40 hover:shadow-lift',
        className,
      )}
    >
      {brackets &&
        CORNERS.map((corner) => (
          <span
            key={corner}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute size-3 border-signal/40 transition-colors duration-200 group-hover/panel:border-signal',
              corner,
            )}
          />
        ))}
      {children}
    </Tag>
  )
}
