import { ArrowUpRight, Check, HeartHandshake } from 'lucide-react'
import {
  realSponsors,
  sponsorTierLabels,
  sponsorTierOrder,
  sponsorsByTier,
  sponsorshipAmount,
  sponsorshipLevels,
  type Sponsor,
} from '../../data/sponsors'
import { Section } from '../layout/Section'
import { Panel } from '../ui/Panel'
import { Pill } from '../ui/Pill'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../ui/cn'

/** Logo or name card. Renders as a link only when a URL is provided. */
function SponsorCard({ sponsor, featured }: { sponsor: Sponsor; featured: boolean }) {
  const inner = (
    <>
      <div
        className={cn(
          'grid place-items-center rounded-md border border-edge bg-canvas-deep px-4',
          featured ? 'h-24' : 'h-18',
        )}
      >
        {sponsor.logo ? (
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span
            className={cn(
              'text-center font-semibold tracking-tight text-ink-soft',
              featured ? 'text-base' : 'text-sm',
            )}
          >
            {sponsor.name}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{sponsor.description}</p>

      {sponsor.url && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
          Visit site
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      )}
    </>
  )

  if (!sponsor.url) {
    return (
      <Panel padding="md" className="flex h-full flex-col">
        {inner}
      </Panel>
    )
  }

  return (
    <Panel as="div" padding="none" hover className="h-full">
      <a
        href={sponsor.url}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex h-full flex-col p-6"
      >
        {inner}
      </a>
    </Panel>
  )
}

/**
 * Every sponsor, grouped into tier sections.
 *
 * Until the first one signs, this is a single honest panel rather than a grid
 * of empty cards. Being new is not something to paper over — it is the reason a
 * sponsor would be the first name on the robot.
 */
export function SponsorWall() {
  if (realSponsors().length === 0) {
    return (
      <Section spacing="sm" id="our-sponsors">
        <Reveal>
          <Panel padding="lg" brackets className="flex flex-col items-start gap-5 sm:flex-row">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-edge bg-surface-high">
              <HeartHandshake
                aria-hidden="true"
                className="size-5 text-signal"
                strokeWidth={1.75}
              />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                No sponsors yet — the first slot is open
              </h2>
              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink-soft">
                We are a first-year team looking for our first backers. Whoever comes in first gets
                the top of this page, the front of the shirts and a place in the story of how this
                team got off the ground. The levels below are where to start.
              </p>
            </div>
          </Panel>
        </Reveal>
      </Section>
    )
  }

  return (
    <Section spacing="sm" id="our-sponsors">
      <div className="flex flex-col gap-12">
        {sponsorTierOrder.map((tier) => {
          const tierSponsors = sponsorsByTier(tier)
          if (tierSponsors.length === 0) return null

          const featured = tier === 'platinum'

          return (
            <div key={tier}>
              <Reveal className="flex items-center gap-4 border-b border-edge pb-3">
                <h2 className="kicker text-ink">{sponsorTierLabels[tier]}</h2>
                <span aria-hidden="true" className="h-px flex-1 bg-edge" />
                <span className="kicker">
                  {tierSponsors.length} {tierSponsors.length === 1 ? 'partner' : 'partners'}
                </span>
              </Reveal>

              <RevealGroup
                as="ul"
                className={cn(
                  'mt-5 grid gap-4',
                  featured ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {tierSponsors.map((sponsor) => (
                  <RevealItem as="li" key={sponsor.id} className="min-w-0">
                    <SponsorCard sponsor={sponsor} featured={featured} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/** Sponsorship levels and what each one includes. */
export function SponsorshipTiers() {
  return (
    <Section spacing="md" id="levels">
      <SectionHeading
        kicker="Sponsorship"
        title="Ways to support the team"
        description="Every level covers real season costs — parts, registration, travel and the outreach events we run for free. In-kind donations of materials or machine time are just as valuable as cash."
      />

      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
        {sponsorshipLevels.map((level) => {
          const featured = level.tier === 'platinum'

          return (
            <RevealItem as="li" key={level.tier} className="min-w-0">
              <Panel
                padding="md"
                hover
                brackets={featured}
                tone={featured ? 'high' : 'base'}
                className={cn('h-full', featured && 'border-signal/30')}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{level.label}</h3>
                  {featured && <Pill tone="signal">Most impact</Pill>}
                </div>

                <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-signal">
                  {sponsorshipAmount(level)}
                </p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-edge pt-5">
                  {level.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-signal"
                        strokeWidth={2.25}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Panel>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
