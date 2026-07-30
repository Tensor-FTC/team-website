import type { ReactNode } from 'react'
import { cn } from './cn'

type PillProps = {
  children: ReactNode
  tone?: 'neutral' | 'signal' | 'muted'
  className?: string
}

const tones = {
  neutral: 'border-edge text-ink-soft',
  signal: 'border-signal/35 bg-signal-dim text-signal',
  muted: 'border-edge text-ink-faint',
}

/** Small squared-off label for tags, statuses and tiers. */
export function Pill({ children, tone = 'neutral', className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.1em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
