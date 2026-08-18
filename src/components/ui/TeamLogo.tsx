import { useState } from 'react'
import { asset } from '../../config/asset'
import { hasTeamNumber, teamConfig } from '../../config/teamConfig'
import { cn } from './cn'

type TeamLogoProps = {
  /** Rendered pixel size of the mark. The artwork is very nearly square. */
  size?: number
  /**
   * Set the team name in type beside the mark.
   *
   * The artwork carries its own wordmark, but only legibly at display sizes —
   * in a 38px header tile it is a smudge. Turn this on wherever the mark is
   * small, and leave it off wherever the mark is big enough to read.
   */
  showName?: boolean
  /** Show the team number chip beside the mark. */
  showNumber?: boolean
  /** Classes for the number chip — the header hides it on narrow phones. */
  numberClassName?: string
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

/** `37372`, set like a part number. */
export function TeamNumberChip({ className }: { className?: string }) {
  if (!hasTeamNumber()) return null

  return (
    <span
      className={cn(
        'inline-flex items-center rounded border border-signal/30 bg-signal-dim px-2 py-1',
        'font-mono text-xs leading-none font-medium tracking-[0.14em] text-signal',
        className,
      )}
    >
      {teamConfig.teamNumber}
    </span>
  )
}

/**
 * The team mark, exactly as drawn.
 *
 * Loads `/team-logo.png` at its native proportions — no crop, no recolour. Its
 * `alt` is the team name, because to a screen reader the image *is* the
 * wordmark; when `showName` also sets the name in type, the image drops out of
 * the accessibility tree instead of announcing "Tensor" twice.
 *
 * If the file is missing or fails to decode it falls back to an inline SVG of
 * the same 3x3 network, with the name always in type beside it — the site never
 * shows a broken image and never loses its identity.
 */
export function TeamLogo({
  size = 40,
  showName = false,
  showNumber = false,
  numberClassName,
  className,
}: TeamLogoProps) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      {logoFailed ? (
        <MarkFallback size={size} />
      ) : (
        <img
          src={asset(teamConfig.logoPath)}
          width={size}
          height={size}
          alt={showName ? '' : teamConfig.teamName}
          aria-hidden={showName || undefined}
          /*
           * The artwork sits on its own near-black plate. Rounding it and
           * ringing it in a hairline turns that plate into a deliberate tile
           * instead of a stray black square on the navy canvas.
           */
          className="shrink-0 rounded-lg bg-plate ring-1 ring-edge"
          style={{ width: size, height: size }}
          loading="eager"
          decoding="async"
          onError={() => setLogoFailed(true)}
        />
      )}

      {(showName || logoFailed) && (
        <span className="truncate text-base font-semibold tracking-[-0.01em] text-ink">
          {teamConfig.teamName}
        </span>
      )}

      {/* Wrapped rather than restyled: `cn` is a plain join, so a `hidden`
          passed straight to the chip would fight its own `inline-flex` and lose
          on CSS order rather than on class order. */}
      {showNumber && (
        <span className={numberClassName}>
          <TeamNumberChip />
        </span>
      )}
    </span>
  )
}
