import { Mail } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Seo } from '../components/layout/Seo'
import { ButtonExternal, ButtonLink } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { teamConfig } from '../config/teamConfig'
import { joinFacts, joinSteps } from '../data/joinSteps'
import { subteams } from '../data/teamMembers'

export default function JoinPage() {
  const mailto = `mailto:${teamConfig.email}?subject=${encodeURIComponent(
    `Joining ${teamConfig.teamName}`,
  )}&body=${encodeURIComponent(
    'Hi Tensor,\n\nMy name is:\nMy grade is:\nI am most interested in (software / hardware / outreach):\n\nThanks!',
  )}`

  return (
    <>
      <Seo
        title="How to join"
        description={`How to join ${teamConfig.teamName}, a student-led FIRST Tech Challenge team in ${teamConfig.location}. No experience needed.`}
      />

      <PageHeader
        kicker="How to join"
        title="No experience needed"
        description="We are a first-year team and still growing. If you want to build robots, write the code that drives them, or run the outreach side of a team, there is room for you."
        actions={
          <>
            <ButtonExternal href={mailto} size="lg">
              <Mail aria-hidden="true" className="size-4" />
              Email us to join
            </ButtonExternal>
            <ButtonLink to="/team" variant="secondary" size="lg">
              Meet the team first
            </ButtonLink>
          </>
        }
        meta={[
          { label: 'Open to', value: 'Middle & high school' },
          { label: 'Experience', value: 'None required' },
          { label: 'Based in', value: teamConfig.location },
          { label: 'Applications', value: 'Open now' },
        ]}
      />

      {/* The four steps */}
      <Section spacing="md" id="steps">
        <SectionHeading
          kicker="The process"
          title="Four steps, no application form"
          description="We are seven students, not an admissions office. This is genuinely the whole process."
        />

        <RevealGroup as="ol" className="mt-10 border-t border-edge">
          {joinSteps.map((step, index) => (
            <RevealItem as="li" key={step.id} className="min-w-0 border-b border-edge py-7">
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="kicker shrink-0 text-signal">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Where you could land */}
      <Section spacing="md" id="where">
        <SectionHeading
          kicker="Where you would fit"
          title="Pick a starting point, not a career"
          description="You will try more than one. Nobody on a seven-person team stays in a single lane for a whole season."
        />

        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
          {subteams.map((subteam) => (
            <RevealItem as="li" key={subteam.id} className="min-w-0">
              <Panel padding="md" hover brackets className="h-full">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{subteam.label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {subteam.description}
                </p>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Questions people actually ask */}
      <Section spacing="md" id="questions">
        <SectionHeading
          kicker="Questions"
          title="What people ask us"
          description="If your question is not here, just email it to us."
        />

        <RevealGroup as="dl" className="mt-10 border-t border-edge">
          {joinFacts.map((fact) => (
            <RevealItem key={fact.id} className="min-w-0 border-b border-edge py-6">
              <dt className="text-base font-semibold text-ink">{fact.question}</dt>
              <dd className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
                {fact.answer}
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Closing action — a plain block rather than another boxed CTA */}
      <Section spacing="lg">
        <RevealGroup className="border-t border-edge pt-10 text-center">
          <RevealItem>
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Send us a couple of sentences about yourself. We read everything and reply within a
              few days.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonExternal href={mailto} size="lg">
                <Mail aria-hidden="true" className="size-4" />
                {teamConfig.email}
              </ButtonExternal>
            </div>
          </RevealItem>
        </RevealGroup>
      </Section>
    </>
  )
}
