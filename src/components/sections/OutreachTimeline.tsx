import { CalendarDays, MapPin } from 'lucide-react'
import {
  outreachCategoryLabels,
  outreachEvents,
  outreachPlans,
  outreachTotals,
} from '../../data/outreachEvents'
import { Section } from '../layout/Section'
import { MediaFrame } from '../ui/MediaFrame'
import { Pill } from '../ui/Pill'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { StatCounter } from '../ui/StatCounter'

/**
 * Totals across every outreach event.
 *
 * Renders nothing while there are no events — a row of animated zeroes would
 * say less than the "what we are planning" list that follows.
 */
export function OutreachImpact() {
  const totals = outreachTotals()
  if (totals.events === 0) return null

  const cards = [
    { id: 'events', label: 'Events run', value: totals.events },
    { id: 'people', label: 'People reached', value: totals.peopleReached },
    { id: 'hours', label: 'Volunteer hours', value: totals.volunteerHours },
  ]

  return (
    <Section spacing="sm" ariaLabel="Outreach impact">
      <RevealGroup as="dl" className="grid grid-cols-1 border-t border-edge sm:grid-cols-3">
        {cards.map((card) => (
          <RevealItem
            key={card.id}
            className="min-w-0 border-b border-edge py-6 sm:pr-6 sm:not-last:border-r sm:not-first:pl-6"
          >
            <dt className="kicker">{card.label}</dt>
            <dd className="mt-3 text-4xl font-semibold tracking-[-0.02em] text-ink">
              <StatCounter value={card.value} />
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/** What we intend to run, shown until the first real event is logged. */
export function OutreachPlans() {
  return (
    <Section spacing="md" id="planned">
      <SectionHeading
        kicker="Planned"
        title="What we want to run first"
        description="Nothing on this list has happened yet — we formed in 2026 and our first season is 2026–2027. If you can host one of these, we would like to hear from you."
      />

      <RevealGroup as="ul" className="mt-10 border-t border-edge">
        {outreachPlans.map((plan) => (
          <RevealItem as="li" key={plan.id} className="min-w-0 border-b border-edge py-6">
            <div className="flex flex-wrap items-center gap-3">
              <Pill tone="signal">{outreachCategoryLabels[plan.category]}</Pill>
              <Pill tone="muted">Not yet scheduled</Pill>
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{plan.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {plan.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/** Outreach events we have actually run, newest first. Empty for now. */
export function OutreachTimeline() {
  if (outreachEvents.length === 0) return null

  return (
    <Section spacing="md" id="events">
      <SectionHeading kicker="Completed" title="Events we have run" />

      <RevealGroup as="ol" className="mt-10 flex flex-col border-t border-edge">
        {outreachEvents.map((event) => (
          <RevealItem as="li" key={event.id} className="min-w-0 border-b border-edge py-8">
            <article className="grid gap-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <MediaFrame
                src={event.image}
                alt={event.title}
                label="Event photo"
                aspect="aspect-[16/10]"
                className="min-w-0"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill tone="signal">{outreachCategoryLabels[event.category]}</Pill>
                  <span className="kicker inline-flex items-center gap-1.5">
                    <CalendarDays aria-hidden="true" className="size-3.5" />
                    {event.date}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
                  {event.title}
                </h3>

                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-ink-faint">
                  <MapPin aria-hidden="true" className="size-4 shrink-0" />
                  {event.location}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{event.description}</p>

                <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                  <div>
                    <dt className="kicker">Reached</dt>
                    <dd className="mt-1.5 text-base font-semibold text-ink">
                      {event.peopleReached.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="kicker">Hours</dt>
                    <dd className="mt-1.5 text-base font-semibold text-ink">
                      {event.volunteerHours.toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
