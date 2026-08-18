import { hasTeamNumber, teamConfig } from '../../config/teamConfig'
import ShinyText from '../reactbits/ShinyText'
import { cn } from './cn'

type IdentityLineProps = {
  /** Draw the short rule before the text. */
  rule?: boolean
  /** Sweep a highlight across the text. Reserved for the home page hero. */
  shine?: boolean
  className?: string
}

/** `FTC TEAM #37372 · REDMOND, WASHINGTON` */
function identityText(): string {
  const number = hasTeamNumber() ? `FTC Team #${teamConfig.teamNumber} · ` : 'FIRST Tech Challenge · '
  return `${number}${teamConfig.location}`.toUpperCase()
}

/**
 * Who we are, in one monospace line.
 *
 * This is where the team number lives. It used to be a chip clipped to the
 * header logo, which read as a badge stuck onto the mark rather than part of
 * the identity — set as a spec line beside the location, the number is the
 * first fact you read instead of an ornament hanging off the logo.
 */
export function IdentityLine({ rule = true, shine = false, className }: IdentityLineProps) {
  const text = identityText()

  return (
    <p className={cn('flex items-start gap-3 leading-[1.7]', className)}>
      {/* `mt-[0.6em]` keeps the rule on the first line's optical centre when the
          label wraps onto a second line. */}
      {rule && <span aria-hidden="true" className="mt-[0.6em] h-px w-6 shrink-0 bg-signal" />}
      {shine ? (
        <ShinyText
          text={text}
          className="kicker text-signal"
          color="oklch(0.795 0.104 226)"
          shineColor="#ffffff"
          speed={4}
          delay={2.5}
        />
      ) : (
        <span className="kicker text-signal">{text}</span>
      )}
    </p>
  )
}
