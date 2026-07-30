/**
 * Headline numbers shown on the home page and About page.
 *
 * Only true, non-zero facts belong here. A rookie team has nothing to brag about
 * yet, and a row of animated zeroes reads worse than a shorter honest row.
 */
import type { LucideIcon } from 'lucide-react'
import { HeartHandshake, Users, Wrench } from 'lucide-react'

export type Statistic = {
  id: string
  label: string
  /** Numeric part — animated by <StatCounter>. */
  value: number
  /** Rendered after the number, e.g. '+' or 'h'. */
  suffix: string
  /** Rendered before the number, e.g. '$'. */
  prefix: string
  description: string
  icon: LucideIcon
}

export const statistics: Statistic[] = [
  {
    id: 'stat-students',
    label: 'Students',
    value: 7,
    suffix: '',
    prefix: '',
    description: 'Across software, hardware and outreach.',
    icon: Users,
  },
  {
    id: 'stat-mentors',
    label: 'Mentors & coach',
    value: 3,
    suffix: '',
    prefix: '',
    description: 'One head coach and two technical mentors.',
    icon: Wrench,
  },
  {
    id: 'stat-subteams',
    label: 'Subteams',
    value: 3,
    suffix: '',
    prefix: '',
    description: 'Small enough that everyone works across all three.',
    icon: HeartHandshake,
  },
]

export type Award = {
  id: string
  name: string
  event: string
  season: string
}

/**
 * Empty until we win something. The About page renders an honest empty state
 * rather than fake entries — add awards here as they come.
 */
export const awards: Award[] = []

export type Value = {
  id: string
  title: string
  description: string
}

/** The "how we work" cards on the About page. */
export const teamValues: Value[] = [
  {
    id: 'value-1',
    title: 'Students lead',
    description:
      'Students make the design calls, write the code and present to judges. Our mentors ask questions and teach; they do not build the robot for us.',
  },
  {
    id: 'value-2',
    title: 'Prototype before committing',
    description:
      'Rough prototypes settle arguments faster than debate. We build the cheap version first, measure it, then commit to the real one.',
  },
  {
    id: 'value-3',
    title: 'Write it down',
    description:
      'Every design review, test result and dead end goes in the engineering portfolio. As a first-year team, the record we start now is what next season builds on.',
  },
  {
    id: 'value-4',
    title: 'Build tools, not just robots',
    description:
      'The problems we hit as a rookie team are the same ones every new team hits. FTCHub came out of that — if we can solve it once, we can share it.',
  },
]
