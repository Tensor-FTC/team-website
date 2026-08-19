/**
 * Things we are making available to other teams.
 *
 * FTCHome is the headline item and gets its own feature block on the Resources
 * page. Everything in `resources` renders as a list below it — set `comingSoon`
 * to false and fill in `link` as each one goes live.
 */
import type { LucideIcon } from 'lucide-react'
import { BookOpen, FileText, Wrench } from 'lucide-react'

/** The FTCHome feature block. */
export const ftcHome = {
  name: 'FTCHome',
  tagline: 'Season management for robotics teams.',
  status: 'In development',
  /** Public repository. Built in the open, so the code is readable before it ships. */
  repo: 'https://github.com/Tensor-FTC/FTCHome',
  /**
   * The long-form write-up, for anyone who wants more than this page gives.
   *
   * `size` and `pages` are stated up front because the file is a few megabytes
   * — worth knowing before you tap it on phone data.
   */
  document: {
    title: 'FTC Home — Sponsor Overview',
    summary:
      'The full write-up: why we built it, what each screen does, how the data and security model work, and what sponsorship pays for.',
    file: '/documents/ftc-home-sponsor-overview.pdf',
    cover: '/images/documents/ftc-home-sponsor-overview-cover.jpg',
    pages: 13,
    size: '3.7 MB',
  },
  description:
    'Running a team is a bookkeeping problem as much as an engineering one. Sponsor money arrives in pieces, parts orders pile up, registration and event deadlines land in the middle of build season, and most teams track all of it across a few spreadsheets and a group chat.',
  secondaryDescription:
    'FTCHome is the tool we wanted on our first day: one place for a team budget, sponsor and expense tracking, a parts inventory, and the season calendar. We are building it as a rookie team for rookie teams, and it will be free for teams to use.',
  /** What the first release will cover. */
  features: [
    {
      title: 'Budget and expenses',
      description:
        'Track a season budget against what has actually been spent, and keep sponsor contributions separate from general funds.',
    },
    {
      title: 'Sponsor records',
      description:
        'Who has given what, at which tier, and when they last heard from you — so nobody gets thanked twice and nobody gets missed.',
    },
    {
      title: 'Parts inventory',
      description:
        'What you own, what is on order and what broke. Fewer duplicate orders the week before an event.',
    },
    {
      title: 'Season calendar',
      description:
        'Registration windows, event dates and portfolio deadlines in one shared place instead of three chats.',
    },
  ],
} as const

export type Resource = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  comingSoon: boolean
  /** Outbound link, or '' while unavailable. */
  link: string
}

export const resources: Resource[] = [
  {
    id: 'resource-portfolio',
    name: 'Engineering portfolio',
    description:
      'Our season notebook — design reviews, test data and the reasoning behind each decision. Published once our first season is underway.',
    icon: FileText,
    comingSoon: true,
    link: '',
  },
  {
    id: 'resource-code',
    name: 'Robot code',
    description:
      'The software that runs our robot, open for other teams to read and borrow from. Released alongside BIOBUZZ.',
    icon: Wrench,
    comingSoon: true,
    link: '',
  },
  {
    id: 'resource-rookie-guide',
    name: 'Rookie team guide',
    description:
      'The things nobody told us when we started — forming a team, budgeting a season, and what to buy first. Written as we learn them.',
    icon: BookOpen,
    comingSoon: true,
    link: '',
  },
]
