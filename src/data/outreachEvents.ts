/**
 * Community outreach events.
 *
 * We have not run any yet — our first season starts in 2026–2027 — so this list
 * is intentionally empty and the Outreach page shows what we are planning
 * instead. Add real events here as they happen and the page fills itself in:
 * the timeline, the totals and the home page all read from this file.
 *
 * Copy this shape for a new event, newest first:
 *
 *   {
 *     id: 'outreach-1',
 *     title: 'Elementary STEM Day',
 *     date: 'October 2026',
 *     location: 'Lincoln Elementary',
 *     category: 'workshop',
 *     description: 'What we ran and who attended.',
 *     peopleReached: 120,
 *     volunteerHours: 36,
 *     image: '/images/outreach/stem-day.jpg',
 *   }
 */

export type OutreachCategory = 'workshop' | 'demo' | 'mentoring' | 'community' | 'fundraiser'

export type OutreachEvent = {
  id: string
  title: string
  /** Human-readable date, e.g. "March 2027". */
  date: string
  location: string
  category: OutreachCategory
  description: string
  /** People reached, for the impact summary. */
  peopleReached: number
  /** Volunteer hours contributed by the team. */
  volunteerHours: number
  /** Path under /public, or '' for the placeholder panel. */
  image: string
}

export const outreachCategoryLabels: Record<OutreachCategory, string> = {
  workshop: 'Workshop',
  demo: 'Robot demo',
  mentoring: 'Mentoring',
  community: 'Community',
  fundraiser: 'Fundraiser',
}

export const outreachEvents: OutreachEvent[] = []

/** What we intend to run in our first season. Shown while `outreachEvents` is empty. */
export type OutreachPlan = {
  id: string
  category: OutreachCategory
  title: string
  description: string
}

export const outreachPlans: OutreachPlan[] = [
  {
    id: 'plan-workshop',
    category: 'workshop',
    title: 'Elementary STEM workshops',
    description:
      'A short hands-on session for grades 4–6: build a simple mechanism, then drive it. We are looking for local schools to host the first one.',
  },
  {
    id: 'plan-demo',
    category: 'demo',
    title: 'Library robot demos',
    description:
      'Bring the robot somewhere families already go, let kids drive it, and answer whatever they ask. Planned for once BIOBUZZ is running.',
  },
  {
    id: 'plan-mentoring',
    category: 'mentoring',
    title: 'Helping the next rookie team',
    description:
      'We are learning what nobody tells a first-year team. We want to write that down and hand it to the team that starts after us.',
  },
]

/** Totals for the outreach impact summary. Zero until the first event happens. */
export function outreachTotals(): {
  events: number
  peopleReached: number
  volunteerHours: number
} {
  return outreachEvents.reduce(
    (totals, event) => ({
      events: totals.events + 1,
      peopleReached: totals.peopleReached + event.peopleReached,
      volunteerHours: totals.volunteerHours + event.volunteerHours,
    }),
    { events: 0, peopleReached: 0, volunteerHours: 0 },
  )
}
