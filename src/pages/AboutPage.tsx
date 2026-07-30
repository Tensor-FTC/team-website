import { Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import { StatsSection } from '../components/sections/StatsSection'
import { Panel } from '../components/ui/Panel'
import { MediaFrame } from '../components/ui/MediaFrame'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { seasonLabel, teamConfig } from '../config/teamConfig'
import { awards, teamValues } from '../data/statistics'

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description={`Learn how ${teamConfig.teamName} works — our story, the way we run a season, and the awards we have earned.`}
      />

      <PageHeader
        kicker="About us"
        title="A brand new, student-led team"
        description="Tensor formed in 2026. Seven students, one coach, two mentors, and a first competition season ahead of us. Everything on this site is what we are actually doing, not what we wish we had already done."
        meta={[
          { label: 'Founded', value: teamConfig.foundedYear },
          { label: 'First season', value: seasonLabel() },
          { label: 'Team', value: teamConfig.orgLabel },
          { label: 'Based in', value: teamConfig.location },
        ]}
      />

      {/* Story */}
      <Section spacing="sm">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <MediaFrame
              src="/images/team-photo.jpg"
              alt={`${teamConfig.teamName} at a competition`}
              label="Add /public/images/team-photo.jpg"
              aspect="aspect-[4/3]"
              parallax
            />
          </Reveal>

          <div className="flex flex-col gap-5">
            <SectionHeading
              kicker="Our story"
              title="Started by students, run by students"
              description="Placeholder copy — replace this with how Tensor actually came together: who started it, what you wanted to build, and why you picked robotics."
            />
            <Reveal delay={0.1} className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                Placeholder paragraph — describe a typical week: when you meet, how work splits
                between software, hardware and outreach, and how decisions get made.
              </p>
              <p>
                Being a rookie team means we get to decide how we work from scratch. We are spending
                the offseason building a practice robot for DECODE so that our first real season is
                not also our first attempt at building anything.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <StatsSection />

      {/* Values */}
      <Section spacing="md" id="values">
        <SectionHeading
          kicker="How we work"
          title="Four things we are holding to"
          description="We have not been tested on these yet. Writing them down now is how we intend to stay honest about them."
        />

        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2">
          {teamValues.map((value, index) => (
            <RevealItem as="li" key={value.id}>
              <Panel
                padding="md"
                className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold tabular-nums text-signal"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{value.description}</p>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Awards — empty until we win something */}
      <Section spacing="md" id="awards">
        <SectionHeading
          kicker="Recognition"
          title="Awards and results"
          description="We have not competed yet, so there is nothing here. Add entries to src/data/statistics.ts as they come and this section fills itself in."
        />

        {awards.length === 0 ? (
          <Reveal className="mt-10 flex items-start gap-4 border-t border-edge pt-8">
            <Trophy
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-ink-faint"
              strokeWidth={1.75}
            />
            <div>
              <p className="text-base font-medium text-ink">No awards yet</p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">
                This is our rookie season. Ask us again after our first event — and if you want to
                follow how it goes, the build plan is on the{' '}
                <Link to="/robot" className="font-medium text-signal hover:underline">
                  robot page
                </Link>
                .
              </p>
            </div>
          </Reveal>
        ) : (
          <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
            {awards.map((award) => (
              <RevealItem as="li" key={award.id} className="min-w-0">
                <Panel padding="sm" className="flex h-full items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-md border border-edge bg-surface-high">
                    <Trophy aria-hidden="true" className="size-5 text-signal" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight text-ink">
                      {award.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{award.event}</p>
                    <p className="kicker mt-1.5">{award.season}</p>
                  </div>
                </Panel>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>

      <CallToAction
        title="Thinking about joining?"
        description="No experience needed — none of us had much when we started this year. Tell us what you are curious about and we will find you a place on a subteam."
      />
    </>
  )
}
