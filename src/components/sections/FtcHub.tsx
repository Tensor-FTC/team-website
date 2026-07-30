import { Check, Mail } from 'lucide-react'
import { teamConfig } from '../../config/teamConfig'
import { ftcHub, resources } from '../../data/resources'
import { Section } from '../layout/Section'
import { ButtonExternal } from '../ui/Button'
import { ComingSoon } from '../ui/ComingSoon'
import { Panel } from '../ui/Panel'
import { Pill } from '../ui/Pill'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** The FTCHub feature block: reveal notice, the problem, and what ships first. */
export function FtcHubFeature() {
  return (
    <>
      <Section spacing="md" id="ftchub">
        <ComingSoon
          kicker="Our software"
          title={ftcHub.name}
          description={ftcHub.tagline}
          actions={
            <ButtonExternal
              href={`mailto:${teamConfig.email}?subject=${encodeURIComponent(
                'FTCHub — early access',
              )}`}
            >
              <Mail aria-hidden="true" className="size-4" />
              Ask for early access
            </ButtonExternal>
          }
        />
      </Section>

      <Section spacing="sm">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              kicker="Why we are building it"
              title="Running a team is a bookkeeping problem"
              description={ftcHub.description}
            />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
              {ftcHub.secondaryDescription}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="kicker">In the first release</h3>
            <RevealGroup as="ul" className="mt-5 border-t border-edge">
              {ftcHub.features.map((feature) => (
                <RevealItem as="li" key={feature.title} className="min-w-0 border-b border-edge py-4">
                  <div className="flex items-start gap-3">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-signal"
                      strokeWidth={2.25}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{feature.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>
    </>
  )
}

/** Everything else we plan to publish for other teams. */
export function ResourceList() {
  return (
    <Section spacing="md" id="downloads">
      <SectionHeading
        kicker="Also coming"
        title="What else we will share"
        description="We are a rookie team, so most of this does not exist yet. It will as our first season goes on."
      />

      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
        {resources.map((resource) => (
          <RevealItem as="li" key={resource.id} className="min-w-0">
            <Panel padding="md" hover={!resource.comingSoon} className="flex h-full flex-col">
              <resource.icon
                aria-hidden="true"
                className="size-5 text-signal"
                strokeWidth={1.75}
              />
              <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">
                {resource.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {resource.description}
              </p>

              <div className="mt-5 border-t border-edge pt-4">
                {resource.comingSoon ? (
                  <Pill tone="muted">Coming soon</Pill>
                ) : (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm font-medium text-signal hover:underline"
                  >
                    Open
                  </a>
                )}
              </div>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
