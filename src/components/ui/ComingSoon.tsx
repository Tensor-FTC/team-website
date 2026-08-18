import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { transitions } from '../../config/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { NetworkGraph } from './NetworkGraph'
import { ScrambleText } from './ScrambleText'
import { cn } from './cn'

type ComingSoonProps = {
  /** Small label above the title, e.g. "Offseason DECODE robot". */
  kicker?: string
  /** The thing being revealed, e.g. "Singularity". */
  title: string
  /** One or two sentences on what it is and when to expect it. */
  description: ReactNode
  /** Optional buttons or links. */
  actions?: ReactNode
  className?: string
}

/** Corner marks framing the panel, like a drawing callout. */
const CORNERS = [
  'left-0 top-0 border-l-2 border-t-2',
  'right-0 top-0 border-r-2 border-t-2',
  'left-0 bottom-0 border-l-2 border-b-2',
  'right-0 bottom-0 border-r-2 border-b-2',
]

/**
 * A reveal notice for work that is not finished yet.
 *
 * Used for Singularity and FTCHome. The corner brackets, the slow scanline and
 * the network graph behind it make an unfinished thing read as deliberate
 * rather than as an empty page. The scanline is skipped under reduced motion.
 */
export function ComingSoon({ kicker, title, description, actions, className }: ComingSoonProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-xl border border-edge bg-surface/60 px-6 py-14 text-center sm:px-10 sm:py-20',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          maskImage: 'radial-gradient(65% 100% at 50% 0%, black, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(65% 100% at 50% 0%, black, transparent 78%)',
        }}
      >
        <NetworkGraph columns={6} rows={3} interactive={false} />
      </div>

      {/* Corner brackets */}
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={cn('pointer-events-none absolute size-5 border-signal/50', corner)}
        />
      ))}

      {/* A slow light sweep, like a display refreshing. */}
      {!prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-signal/8 to-transparent"
          initial={{ top: '-6rem' }}
          animate={{ top: '100%' }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
        />
      )}

      {kicker && <p className="kicker">{kicker}</p>}

      <p className="mt-5 flex items-center justify-center gap-2.5">
        <span aria-hidden="true" className="relative grid size-2 place-items-center">
          <motion.span
            className="absolute size-2 rounded-full bg-signal"
            animate={{ opacity: [1, 0.35, 1], scale: [1, 1.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <span className="kicker text-signal">Releasing soon</span>
      </p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitions.base}
        className="display mt-4 text-3xl text-ink sm:text-5xl"
      >
        {/* The name resolves out of noise — the panel is announcing something
            that is not finished yet, and this is what that looks like. */}
        <ScrambleText text={title} speed={42} />
      </motion.h2>

      <div className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
        {description}
      </div>

      {actions && (
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{actions}</div>
      )}
    </div>
  )
}
