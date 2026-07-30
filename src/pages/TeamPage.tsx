import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import { TeamGrid } from '../components/sections/TeamGrid'
import { Panel } from '../components/ui/Panel'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { teamConfig } from '../config/teamConfig'
import { initialsFor, membersBySubteam, mentors, subteams, teamMembers } from '../data/teamMembers'

export default function TeamPage() {
  return (
    <>
      <Seo
        title="Team"
        description={`The ${teamMembers.length} students and ${mentors.length} adults behind ${teamConfig.teamName} — software, hardware and outreach.`}
      />

      <PageHeader
        kicker="The team"
        title="Seven students, three subteams"
        description="We are small enough that everyone ends up working across all three areas. Each student has a home subteam, but nobody stays in their lane for a whole season."
        meta={[
          { label: 'Students', value: String(teamMembers.length) },
          { label: 'Mentors & coach', value: String(mentors.length) },
          { label: 'Subteams', value: String(subteams.length) },
          { label: 'Founded', value: teamConfig.foundedYear },
        ]}
      />

      {/* Subteams */}
      <Section spacing="sm" id="subteams">
        <SectionHeading
          kicker="Subteams"
          title="How the work is divided"
          description="Each subteam owns its area but reviews the others' decisions — a drivetrain change is a software problem too."
        />

        <RevealGroup as="ul" className="mt-10 grid gap-x-12 sm:grid-cols-3">
          {subteams.map((subteam) => {
            const count = membersBySubteam(subteam.id).length
            return (
              <RevealItem as="li" key={subteam.id} className="min-w-0 border-t border-edge py-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {subteam.label}
                  </h3>
                  <span className="kicker">
                    {count} {count === 1 ? 'student' : 'students'}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {subteam.description}
                </p>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </Section>

      <TeamGrid />

      {/* Mentors and coach, listed apart from the student roster */}
      <Section spacing="md" id="mentors">
        <SectionHeading
          kicker="Mentors"
          title="Our coach and mentors"
          description="They teach, ask hard questions and sign the forms. They do not build the robot — that part is ours."
        />

        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
          {mentors.map((mentor) => (
            <RevealItem as="li" key={mentor.id} className="min-w-0">
              <Panel padding="md" className="flex h-full items-start gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-signal/30 bg-signal-dim font-mono text-sm text-signal"
                >
                  {initialsFor(mentor.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-ink">{mentor.name}</h3>
                  <p className="mt-1 text-sm font-medium text-signal">{mentor.role}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{mentor.bio}</p>
                </div>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CallToAction
        title="Want to be on this page?"
        description="We are a new team and still growing. If you are a student who wants in, or an adult who could mentor, tell us what you are interested in."
      />
    </>
  )
}
