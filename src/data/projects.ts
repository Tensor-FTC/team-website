/**
 * What we are building.
 *
 * A short honest list beats a long invented one. Add entries as work starts —
 * `comingSoon: true` renders a reveal notice instead of pretending the work is
 * finished. Images go in `public/images/projects/`.
 */
import type { LucideIcon } from 'lucide-react'
import { Bot, Code2, FileText } from 'lucide-react'

export type ProjectStatus = 'active' | 'complete' | 'planned'

export type Project = {
  id: string
  title: string
  /** One line, used at the top of the card. */
  summary: string
  /** Longer paragraph. */
  description: string
  status: ProjectStatus
  /** Season or period the work belongs to. */
  period: string
  tags: string[]
  icon: LucideIcon
  /** Marks the project as not yet revealed. */
  comingSoon: boolean
  /** Path under /public, or '' for the placeholder panel. */
  image: string
  /** Optional outbound link (repo, CAD, portfolio entry). */
  link: string
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  active: 'In progress',
  complete: 'Complete',
  planned: 'Planned',
}

export const projects: Project[] = [
  {
    id: 'project-fable',
    title: 'Fable — offseason DECODE robot',
    summary: 'A full robot for DECODE, built as practice before the BIOBUZZ season starts.',
    description:
      'Fable is a complete robot for DECODE, the game from the season before ours. Nothing about it is judged, which is exactly the point — it gets us through the whole cycle once (strategy, CAD, fabrication, code, driver practice) so that our first competition season is not also our first attempt at building a robot.',
    status: 'active',
    period: 'Offseason 2026',
    tags: ['Hardware', 'Software'],
    icon: Bot,
    comingSoon: true,
    image: '',
    link: '',
  },
  {
    id: 'project-ftchome',
    title: 'FTCHome',
    summary: 'An app to help robotics teams manage their finances, inventory and season logistics.',
    description:
      'Running a team turns out to be as much bookkeeping as engineering — budgets, sponsor money, parts, registration deadlines. We are building the tool we wanted on day one, and releasing it for other teams to use.',
    status: 'active',
    period: '2026',
    tags: ['Software', 'Tooling'],
    icon: Code2,
    comingSoon: true,
    image: '',
    link: '',
  },
  {
    id: 'project-portfolio',
    title: 'Engineering portfolio',
    summary: 'The written record of our first season: decisions, tests and everything we got wrong.',
    description:
      'Every design review, test result and dead end gets written down as it happens rather than reconstructed the week before an event. As a first-year team this is the thing we most want to get right, because next season starts from it.',
    status: 'active',
    period: '2026–2027',
    tags: ['Documentation'],
    icon: FileText,
    comingSoon: false,
    image: '',
    link: '',
  },
]

/** Every tag used across projects, sorted, for the filter row. */
export function projectTags(): string[] {
  return [...new Set(projects.flatMap((project) => project.tags))].sort((a, b) => a.localeCompare(b))
}
