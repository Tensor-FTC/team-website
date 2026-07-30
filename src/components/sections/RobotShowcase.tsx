import { Bot } from 'lucide-react'
import { teamConfig } from '../../config/teamConfig'
import {
  buildMilestones,
  plannedSystems,
  robotGame,
  robotName,
  robotSpecs,
  robotStatus,
} from '../../data/robotFeatures'
import { Section } from '../layout/Section'
import { ButtonLink } from '../ui/Button'
import { ComingSoon } from '../ui/ComingSoon'
import { MediaFrame } from '../ui/MediaFrame'
import { Pill } from '../ui/Pill'
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../ui/cn'

/**
 * The robot reveal notice, or the finished robot once there is one.
 *
 * Set `robotStatus` in src/data/robotFeatures.ts to 'released' to swap this from
 * the coming-soon panel to the photo-and-specs layout.
 */
export function RobotOverview() {
  if (robotStatus === 'coming-soon') {
    return (
      <Section spacing="md">
        <ComingSoon
          kicker={`Offseason ${robotGame} robot`}
          title={robotName}
          description={
            <>
              {robotName} is still on the CAD screen and the prototyping bench. When it is built and
              driving, this page becomes the full write-up: photos, specs, and what we would do
              differently.
            </>
          }
          actions={
            <>
              <ButtonLink to="/projects">See what we are building</ButtonLink>
              <ButtonLink to="/contact" variant="secondary">
                Follow our progress
              </ButtonLink>
            </>
          }
        />
      </Section>
    )
  }

  return (
    <Section spacing="md">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="min-w-0">
          <MediaFrame
            src="/images/robot-full.jpg"
            alt={`Full view of ${teamConfig.teamName}'s robot`}
            label="/images/robot-full.jpg"
            icon={Bot}
            aspect="aspect-[4/3]"
            parallax
          />
        </Reveal>

        <div className="min-w-0">
          <SectionHeading
            kicker="At a glance"
            title={`${robotName}, built for ${robotGame}`}
            description="The strategy the robot was designed around, the constraints that shaped it, and what it does best in a match."
          />

          <RevealGroup as="dl" className="mt-8 grid grid-cols-2 border-t border-edge">
            {robotSpecs.map((spec) => (
              <RevealItem key={spec.label} className="min-w-0 border-b border-edge py-4 pr-4">
                <dt className="kicker">{spec.label}</dt>
                <dd className="mt-2 text-sm font-medium text-ink">{spec.value}</dd>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}

/** What each subteam is working out right now, plus the known specs so far. */
export function RobotPlan() {
  return (
    <Section spacing="md" id="design">
      <SectionHeading
        kicker="In progress"
        title="What we are working out first"
        description="Three problems, one per subteam. Everything here is being prototyped rather than decided — the specs below fill in as we settle them."
      />

      <RevealGroup as="ul" className="mt-10 grid gap-x-12 sm:grid-cols-3">
        {plannedSystems.map((system) => (
          <RevealItem as="li" key={system.id} className="min-w-0 border-t border-edge py-6">
            <Pill tone="signal">{system.owner}</Pill>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{system.name}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{system.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup as="dl" className="mt-12 grid grid-cols-2 border-t border-edge sm:grid-cols-3">
        {robotSpecs.map((spec) => (
          <RevealItem key={spec.label} className="min-w-0 border-b border-edge py-4 pr-4">
            <dt className="kicker">{spec.label}</dt>
            <dd
              className={cn(
                'mt-2 text-sm font-medium',
                spec.value === 'TBA' ? 'text-ink-faint' : 'text-ink',
              )}
            >
              {spec.value}
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}

/**
 * Our plan for getting from a brand new team to a competing one.
 *
 * Completed milestones get a filled node, the current one a ring, and upcoming
 * ones a hollow node — so the timeline shows where we actually are.
 */
export function BuildTimeline() {
  return (
    <Section spacing="md" id="timeline">
      <SectionHeading
        kicker="Our plan"
        title="From a new team to a competing one"
        description="We are early in this. Marking where we actually are is more useful than pretending the whole plan is done."
      />

      <RevealGroup as="ol" className="relative mt-10 flex flex-col">
        {/* The connecting rail. */}
        <span
          aria-hidden="true"
          className="absolute bottom-8 left-[7px] top-3 w-px bg-gradient-to-b from-signal/60 via-edge-strong to-transparent"
        />

        {buildMilestones.map((milestone, index) => (
          <RevealItem as="li" key={milestone.id} className="relative min-w-0 pb-8 pl-10">
            <span
              aria-hidden="true"
              className={cn(
                'absolute left-0 top-2 size-[15px] rounded-full border-2',
                milestone.status === 'done' && 'border-signal bg-signal',
                milestone.status === 'active' && 'border-signal bg-canvas',
                milestone.status === 'upcoming' && 'border-edge-strong bg-canvas',
              )}
            />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className={cn(
                  'kicker',
                  milestone.status === 'upcoming' ? 'text-ink-faint' : 'text-signal',
                )}
              >
                {String(index + 1).padStart(2, '0')} · {milestone.window}
              </span>
              {milestone.status === 'active' && <Pill tone="signal">Now</Pill>}
              {milestone.status === 'done' && <Pill tone="muted">Done</Pill>}
            </div>

            <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
              {milestone.phase}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft">
              {milestone.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
