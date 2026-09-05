/**
 * Our robots.
 *
 * Fable is our offseason build for DECODE — the game from the season
 * before ours. It is practice: a whole robot, start to finish, so that the
 * BIOBUZZ season is not also our first attempt at building anything.
 *
 * It is not finished, so there are no real specs to publish yet. Rather than
 * invent numbers, the Robot page shows a reveal notice, what each subteam is
 * working out, and the plan for getting there.
 *
 * When it is done: set `robotStatus` to 'released', fill in `robotSpecs`, and
 * add `/public/images/robot-full.jpg`.
 */
import { teamConfig } from '../config/teamConfig'

/** Our offseason robot's name. */
export const robotName = 'Fable'

/** The game Fable is built for. */
export const robotGame = teamConfig.offseasonGame

/** Flip to 'released' once there is a finished robot to show. */
export const robotStatus: 'coming-soon' | 'released' = 'coming-soon'

export type RobotSpec = {
  label: string
  value: string
}

/**
 * Headline specifications. Everything unknown reads "TBA" on purpose — a spec
 * sheet full of invented values is worse than an honest blank one.
 */
export const robotSpecs: RobotSpec[] = [
  { label: 'Robot', value: robotName },
  { label: 'Built for', value: `${robotGame} (offseason)` },
  { label: 'Starting size', value: '18" × 18" × 18"' },
  { label: 'Controller', value: 'REV Control Hub' },
  { label: 'Weight', value: 'TBA' },
  { label: 'Drivetrain', value: 'TBA' },
]

export type PlannedSystem = {
  id: string
  name: string
  /** What we are actually figuring out right now. */
  description: string
  /** Which subteam owns it. */
  owner: 'Software' | 'Hardware' | 'Outreach'
}

/** The three things we are working out first. */
export const plannedSystems: PlannedSystem[] = [
  {
    id: 'planned-drivetrain',
    name: 'Drivetrain',
    description:
      'Choosing between a mecanum and a simpler tank setup, and prototyping both before we commit. Whichever we pick has to be repairable between matches.',
    owner: 'Hardware',
  },
  {
    id: 'planned-scoring',
    name: 'Intake and scoring',
    description:
      'Prototyping ways to pick up and place game elements. This is the subsystem we expect to rebuild the most, so we are keeping it modular.',
    owner: 'Hardware',
  },
  {
    id: 'planned-software',
    name: 'Driver controls and autonomous',
    description:
      'Getting a clean teleop base working first, then layering on odometry so autonomous is repeatable rather than lucky.',
    owner: 'Software',
  },
]

export type BuildMilestone = {
  id: string
  phase: string
  window: string
  description: string
  /** Marks how far along we are, so the timeline can show real progress. */
  status: 'done' | 'active' | 'upcoming'
}

export const buildMilestones: BuildMilestone[] = [
  {
    id: 'milestone-1',
    phase: 'Team formed',
    window: '2026',
    description:
      'Seven students, one coach and two mentors. Split into software, hardware and outreach, and worked out how we want to run a season.',
    status: 'done',
  },
  {
    id: 'milestone-2',
    phase: 'Learning the tools',
    window: 'Offseason',
    description:
      'CAD, the control system and the game manual. Everyone builds something small and breaks something small before we start on the real robot.',
    status: 'active',
  },
  {
    id: 'milestone-3',
    phase: `${robotName} — offseason ${robotGame} robot`,
    window: 'Offseason',
    description:
      'Build a full robot for the previous season’s game as practice. No pressure, no judging — just the whole process once through, end to end.',
    status: 'active',
  },
  {
    id: 'milestone-4',
    phase: `${teamConfig.seasonGame} kickoff`,
    window: 'Ahead of the season',
    description:
      'Read the new game manual, score the strategies worth building for, and start prototyping the mechanisms our competition robot needs.',
    status: 'upcoming',
  },
  {
    id: 'milestone-5',
    phase: 'First competition',
    window: `${teamConfig.season} season`,
    description:
      'Compete for the first time, log everything that breaks, and fix the highest-impact problems before the next event.',
    status: 'upcoming',
  },
]
