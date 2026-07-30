import { useState } from 'react'
import { hasTeamNumber, teamConfig } from '../../config/teamConfig'
import { cn } from './cn'

type TeamLogoProps = {
  /** Rendered pixel size of the square mark. */
  size?: number
  /** Show the team name (and number) beside the mark. */
  showName?: boolean
  /** Larger, looser type for the hero and footer. */
  emphasis?: 'compact' | 'hero'
  className?: string
}

/** The 3x3 network drawn inline, used when the PNG is unavailable. */
function MarkFallback({ size }: { size: number }) {
  const coords = [4, 12, 20]
  const rowFill = ['var(--color-signal)', 'var(--color-node-high)', 'var(--color-ink)']

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0"
      role="presentation"
    >
      {/* Edges first, so nodes sit on top. */}
      <g stroke="var(--color-node-high)" strokeWidth="1.1" opacity="0.85">
        {coords.map((y) => (
          <line key={`h${y}`} x1={coords[0]} y1={y} x2={coords[2]} y2={y} />
        ))}
        {coords.map((x) => (
          <line key={`v${x}`} x1={x} y1={coords[0]} x2={x} y2={coords[2]} />
        ))}
      </g>
      {coords.map((y, row) =>
        coords.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill={rowFill[row]} />),
      )}
    </svg>
  )
}

/**
 * The team mark.
 *
 * Loads `/team-logo.png`. If that file is missing or fails to decode, it falls
 * back to an inline SVG of the same 3x3 network, so the site never shows a
 * broken image and never loses its identity.
 */
export function TeamLogo({
  size = 36,
  showName = false,
  emphasis = 'compact',
  className,
}: TeamLogoProps) {
  const [logoFailed, setLogoFailed] = useState(false)
  const isHero = emphasis === 'hero'

  return (
    <span className={cn('inline-flex items-center', isHero ? 'gap-3.5' : 'gap-2.5', className)}>
      {logoFailed ? (
        <MarkFallback size={size} />
      ) : (
        <img
          src={teamConfig.logoPath}
          width={size}
          height={size}
          alt={`${teamConfig.teamName} logo`}
          className="shrink-0 rounded-md"
          style={{ width: size, height: size }}
          loading="eager"
          decoding="async"
          onError={() => setLogoFailed(true)}
        />
      )}

      {showName && (
        // `min-w-0` + `truncate` keep a long placeholder team number on one
        // line instead of wrapping and pushing the header around.
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              'truncate font-semibold tracking-[-0.01em] text-ink',
              isHero ? 'text-lg' : 'text-base',
            )}
          >
            {teamConfig.teamName}
          </span>
          {/* In the header there is little room beside the name, so the number
              only appears once the viewport can spare the width. */}
          <span
            className={cn('kicker mt-1.5 truncate', isHero ? 'block' : 'hidden sm:block')}
          >
            {hasTeamNumber() ? `Team ${teamConfig.teamNumber}` : teamConfig.teamNumber}
          </span>
        </span>
      )}
    </span>
  )
}
