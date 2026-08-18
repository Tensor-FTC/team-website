import { statistics } from '../../data/statistics'
import { Section } from '../layout/Section'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SpotlightPanel } from '../ui/SpotlightPanel'
import { StatCounter } from '../ui/StatCounter'

/**
 * Headline numbers.
 *
 * Three cards rather than four, because there are only three honest numbers to
 * show. Each lights up under the pointer, which is the one place on the page
 * where a plain figure benefits from something to look at.
 */
export function StatsSection() {
  return (
    <Section spacing="sm" ariaLabel="Team statistics">
      <RevealGroup as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statistics.map((stat) => (
          <RevealItem as="li" key={stat.id} className="min-w-0">
            <SpotlightPanel className="h-full">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="kicker">{stat.label}</span>
                  <stat.icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-signal/70"
                    strokeWidth={1.75}
                  />
                </div>

                <p className="mt-5 text-5xl font-semibold tabular-nums tracking-[-0.03em] text-ink">
                  <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>

                {/* A short rule under the figure, so the number has a base. */}
                <span aria-hidden="true" className="mt-5 block h-px w-10 bg-signal/50" />

                <p className="mt-4 text-sm leading-relaxed text-ink-faint">{stat.description}</p>
              </div>
            </SpotlightPanel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
