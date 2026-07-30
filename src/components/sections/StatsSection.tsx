import { statistics } from '../../data/statistics'
import { Section } from '../layout/Section'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { StatCounter } from '../ui/StatCounter'

/**
 * Headline numbers as a divided row rather than four floating cards — closer to
 * a spec sheet, and far less busy.
 */
export function StatsSection() {
  return (
    <Section spacing="sm" ariaLabel="Team statistics">
      <RevealGroup
        as="dl"
        className="grid grid-cols-1 border-t border-edge sm:grid-cols-3"
      >
        {statistics.map((stat) => (
          <RevealItem
            key={stat.id}
            className="min-w-0 border-b border-edge py-6 sm:pr-6 sm:not-last:border-r sm:not-first:pl-6"
          >
            <dt className="kicker">{stat.label}</dt>
            <dd className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-ink">
              <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
            <p className="mt-2 text-sm leading-relaxed text-ink-faint">{stat.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
