import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import { Hero } from '../components/sections/Hero'
import { HighlightsSection } from '../components/sections/HighlightsSection'
import { StatsSection } from '../components/sections/StatsSection'
import { RobotOverview } from '../components/sections/RobotShowcase'

export default function HomePage() {
  return (
    <>
      <Seo title="Home" />
      <Hero />
      <StatsSection />
      <HighlightsSection />
      <RobotOverview />
      <CallToAction />
    </>
  )
}
