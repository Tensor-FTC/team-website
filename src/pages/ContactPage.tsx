import { CalendarClock, Mail, MapPin, Users, type LucideIcon } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Seo } from '../components/layout/Seo'
import { ContactForm } from '../components/sections/ContactForm'
import { Panel } from '../components/ui/Panel'
import { Reveal } from '../components/ui/Reveal'
import { socialMeta } from '../components/ui/socialMeta'
import { activeSocialLinks, teamConfig } from '../config/teamConfig'

type Detail = {
  label: string
  value: string
  href?: string
  icon: LucideIcon
}

export default function ContactPage() {
  const socials = activeSocialLinks()

  const details: Detail[] = [
    {
      label: 'Email',
      value: teamConfig.email,
      href: `mailto:${teamConfig.email}`,
      icon: Mail,
    },
    { label: 'Team', value: teamConfig.orgLabel, icon: Users },
    { label: 'Location', value: teamConfig.location, icon: MapPin },
    {
      label: 'We meet',
      value: `${teamConfig.meetingSchedule} · ${teamConfig.meetingLocation}`,
      icon: CalendarClock,
    },
  ]

  return (
    <>
      <Seo
        title="Contact"
        description={`Get in touch with ${teamConfig.teamName} about joining, sponsorship, outreach or mentoring.`}
      />

      <PageHeader
        kicker="Contact"
        title="Get in touch"
        description="Students, parents, sponsors, schools, other teams — all welcome. We read everything and usually reply within a few days."
      />

      <Section spacing="sm">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* min-w-0 lets these grid tracks shrink below their content's
              intrinsic width instead of widening the page on small screens. */}
          <Reveal className="min-w-0">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12} className="flex min-w-0 flex-col gap-6">
            {/* Details */}
            <Panel padding="md">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Team details</h2>

              <dl className="mt-6 flex flex-col gap-5">
                {details.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-edge bg-surface-high">
                      <detail.icon
                        aria-hidden="true"
                        className="size-4.5 text-signal"
                        strokeWidth={1.75}
                      />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                        {detail.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-ink">
                        {detail.href ? (
                          <a href={detail.href} className="break-all hover:text-signal">
                            {detail.value}
                          </a>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Panel>

            {/* Socials */}
            <Panel padding="md">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Follow the season</h2>

              {socials.length > 0 ? (
                <ul className="mt-5 flex flex-col gap-2">
                  {socials.map(({ key, url }) => {
                    const { label, icon: Icon } = socialMeta[key]
                    return (
                      <li key={key}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center gap-3 rounded-md border border-edge bg-surface px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-high hover:text-ink"
                        >
                          <Icon aria-hidden="true" className="size-4 text-signal" />
                          {label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  Social links have not been added yet. Fill in{' '}
                  <code className="rounded-md border border-edge bg-surface-high px-1.5 py-0.5 font-mono text-xs break-all">
                    socialLinks
                  </code>{' '}
                  in{' '}
                  <code className="rounded-md border border-edge bg-surface-high px-1.5 py-0.5 font-mono text-xs break-all">
                    src/config/teamConfig.ts
                  </code>{' '}
                  and they will appear here and in the footer.
                </p>
              )}
            </Panel>

            {/* Join note */}
            <Panel padding="md" tone="flat">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Thinking of joining?</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                Placeholder copy. Explain who is eligible, when recruitment opens, and what a new
                member's first few weeks look like.
              </p>
            </Panel>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
