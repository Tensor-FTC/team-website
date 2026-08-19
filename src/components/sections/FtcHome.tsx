import { ArrowUpRight, Check, GitBranch, Mail } from 'lucide-react'
import { teamConfig } from '../../config/teamConfig'
import { ftcHome, resources } from '../../data/resources'
import { Section } from '../layout/Section'
import { ButtonExternal } from '../ui/Button'
import { ComingSoon } from '../ui/ComingSoon'
import { DocumentPanel } from '../ui/DocumentPanel'
import { Panel } from '../ui/Panel'
import { Pill } from '../ui/Pill'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** The FTCHome feature block: reveal notice, the problem, and what ships first. */
export function FtcHomeFeature() {
  return (
    <>
      <Section spacing="md" id="ftchome">
        <ComingSoon
          kicker="Our software"
          title={ftcHome.name}
          description={ftcHome.tagline}
          actions={
            <>
              <ButtonExternal href={ftcHome.repo}>
                <GitBranch aria-hidden="true" className="size-4" />
                View the code
              </ButtonExternal>
              <ButtonExternal
                variant="secondary"
                href={`mailto:${teamConfig.email}?subject=${encodeURIComponent(
                  'FTCHome — early access',
                )}`}
              >
                <Mail aria-hidden="true" className="size-4" />
                Ask for early access
              </ButtonExternal>
            </>
          }
        />
      </Section>

      <Section spacing="sm">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              kicker="Why we are building it"
              title="Running a team is a bookkeeping problem"
              description={ftcHome.description}
            />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
              {ftcHome.secondaryDescription}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="kicker">In the first release</h3>
            <RevealGroup as="ul" className="mt-5 border-t border-edge">
              {ftcHome.features.map((feature) => (
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

      <Section spacing="md">
        <SectionHeading
          kicker="Go deeper"
          title="Want more information?"
          description="This page is the short version. We wrote a full overview for sponsors and anyone else who wants the detail — read it below, or take it with you."
        />

        <Reveal className="mt-10">
          <DocumentPanel
            title={ftcHome.document.title}
            summary={ftcHome.document.summary}
            file={ftcHome.document.file}
            cover={ftcHome.document.cover}
            pages={ftcHome.document.pages}
            size={ftcHome.document.size}
          />
        </Reveal>
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

      {teamConfig.socialLinks.github && (
        <Reveal className="mt-6">
          <a
            href={teamConfig.socialLinks.github}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-sm font-medium text-signal"
          >
            <GitBranch aria-hidden="true" className="size-4" />
            Everything we publish lives on GitHub
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      )}

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
