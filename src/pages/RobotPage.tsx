import { PageHeader } from '../components/layout/PageHeader'
import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import { BuildTimeline, RobotOverview, RobotPlan } from '../components/sections/RobotShowcase'
import { teamConfig } from '../config/teamConfig'
import { robotName } from '../data/robotFeatures'

export default function RobotPage() {
  return (
    <>
      <Seo
        title="Robot"
        description={`${robotName} is ${teamConfig.teamName}'s offseason ${teamConfig.offseasonGame} robot, currently in design. Follow the build.`}
      />

      <PageHeader
        kicker="The robot"
        title={`Meet ${robotName}`}
        description={`${robotName} is our offseason build for ${teamConfig.offseasonGame} — a whole robot, start to finish, as practice before the ${teamConfig.seasonGame} season. It is still being designed. Here is what we are working out.`}
      />

      <RobotOverview />
      <RobotPlan />
      <BuildTimeline />

      <CallToAction
        title="Want to follow the build?"
        description={`We will publish the full write-up when ${robotName} is finished — design decisions, test data and all. Get in touch if you would like to hear about it.`}
      />
    </>
  )
}
