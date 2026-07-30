import { PageHeader } from '../components/layout/PageHeader'
import { Seo } from '../components/layout/Seo'
import { CallToAction } from '../components/sections/CallToAction'
import { ProjectsGrid } from '../components/sections/ProjectsGrid'
import { seasonLabel, teamConfig } from '../config/teamConfig'
import { projects } from '../data/projects'

export default function ProjectsPage() {
  const active = projects.filter((project) => project.status === 'active').length
  const complete = projects.filter((project) => project.status === 'complete').length

  return (
    <>
      <Seo
        title="Projects"
        description={`Engineering and software projects from ${teamConfig.teamName} — prototypes, autonomous routines, tooling and documentation.`}
      />

      <PageHeader
        kicker="Projects"
        title="What we are building"
        description="A short, honest list. We formed in 2026, so most of this is in progress rather than finished — including our first robot."
        meta={[
          { label: 'Projects', value: String(projects.length) },
          { label: 'In progress', value: String(active) },
          { label: 'Complete', value: String(complete) },
          { label: 'Season', value: seasonLabel() },
        ]}
      />

      <ProjectsGrid />

      <CallToAction
        title="Want the details?"
        description="Our engineering portfolio will have the full write-up for each of these as it happens. Get in touch if you would like a copy once it is up."
      />
    </>
  )
}
