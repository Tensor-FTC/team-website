import { PageHeader } from '../components/layout/PageHeader'
import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import { FtcHomeFeature, ResourceList } from '../components/sections/FtcHome'
import { teamConfig } from '../config/teamConfig'
import { ftcHome } from '../data/resources'

export default function ResourcesPage() {
  return (
    <>
      <Seo
        title="Resources"
        description={`${ftcHome.name} — season management software for robotics teams, in development by ${teamConfig.teamName}. Plus the portfolios, code and guides we are publishing.`}
      />

      <PageHeader
        kicker="Resources"
        title="Tools we are building for other teams"
        description="Everything we make that is useful outside our own team goes here. FTCHome is the big one: an app for the admin side of running a robotics team."
      />

      <FtcHomeFeature />
      <ResourceList />

      <CallToAction
        title="Want FTCHome when it launches?"
        description="Tell us what your team struggles to keep track of and we will factor it in. Teams that get in touch early get first access."
      />
    </>
  )
}
