import { PageHeader } from '../components/layout/PageHeader'
import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import {
  OutreachImpact,
  OutreachPlans,
  OutreachTimeline,
} from '../components/sections/OutreachTimeline'
import { seasonLabel, teamConfig } from '../config/teamConfig'
import { outreachPlans, outreachTotals } from '../data/outreachEvents'

export default function OutreachPage() {
  const totals = outreachTotals()
  const hasEvents = totals.events > 0

  return (
    <>
      <Seo
        title="Outreach"
        description={`Workshops, robot demos and mentoring planned by ${teamConfig.teamName} in ${teamConfig.location} and beyond.`}
      />

      <PageHeader
        kicker="Outreach"
        title="Robotics beyond our own team"
        description="A robot only reaches the students in one room. Workshops, demos and mentoring reach everyone else — and we would rather commit to that from our first season than bolt it on later."
        meta={
          hasEvents
            ? [
                { label: 'Events', value: String(totals.events) },
                { label: 'People reached', value: totals.peopleReached.toLocaleString() },
                { label: 'Volunteer hours', value: totals.volunteerHours.toLocaleString() },
                { label: 'Season', value: seasonLabel() },
              ]
            : [
                { label: 'Events so far', value: 'None yet' },
                { label: 'Planned', value: String(outreachPlans.length) },
                { label: 'First season', value: seasonLabel() },
                { label: 'Founded', value: teamConfig.foundedYear },
              ]
        }
      />

      <OutreachImpact />
      <OutreachPlans />
      <OutreachTimeline />

      <CallToAction
        title="Can you host our first event?"
        description="We will bring the robot, a hands-on activity and students who can explain how it works. Schools, libraries and community groups — please get in touch."
      />
    </>
  )
}
