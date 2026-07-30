import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { transitions } from '../../config/motion'
import { projectStatusLabels, projectTags, projects, type Project } from '../../data/projects'
import { Section } from '../layout/Section'
import { Panel } from '../ui/Panel'
import { Pill } from '../ui/Pill'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../ui/cn'

const statusTone: Record<Project['status'], 'signal' | 'neutral' | 'muted'> = {
  active: 'signal',
  complete: 'neutral',
  planned: 'muted',
}

/** Filterable list of engineering and software projects. */
export function ProjectsGrid() {
  const [activeTag, setActiveTag] = useState<string>('All')
  const tags = useMemo(() => ['All', ...projectTags()], [])

  const visible = useMemo(
    () => (activeTag === 'All' ? projects : projects.filter((p) => p.tags.includes(activeTag))),
    [activeTag],
  )

  return (
    <Section spacing="sm" id="projects">
      {/* Keeps the heading order h1 -> h2 -> h3; the cards below use h3. */}
      <SectionHeading
        kicker="Portfolio"
        title="Everything we have worked on"
        description="Pick a tag to narrow the list. Entries live in src/data/projects.ts."
      />

      <div
        role="group"
        aria-label="Filter projects by tag"
        className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
      >
        {tags.map((tag) => {
          const isActive = activeTag === tag
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={isActive}
              className={cn(
                'relative py-1 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200',
                isActive ? 'text-signal' : 'text-ink-faint hover:text-ink',
              )}
            >
              {tag}
              {isActive && (
                <motion.span
                  layoutId="project-filter-underline"
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-signal"
                  transition={transitions.spring}
                />
              )}
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}.
      </p>

      <RevealGroup key={activeTag} as="ul" className="mt-8 grid gap-4 lg:grid-cols-2">
        {visible.map((project) => (
          <RevealItem as="li" key={project.id} className="min-w-0">
            <Panel as="article" padding="md" hover className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <project.icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-signal"
                  strokeWidth={1.75}
                />
                <div className="flex flex-wrap items-center justify-end gap-2">
                  {project.comingSoon ? (
                    <Pill tone="signal">
                      <span
                        aria-hidden="true"
                        className="size-1.5 animate-pulse rounded-full bg-signal"
                      />
                      Releasing soon
                    </Pill>
                  ) : (
                    <Pill tone={statusTone[project.status]}>
                      {projectStatusLabels[project.status]}
                    </Pill>
                  )}
                  <span className="kicker">{project.period}</span>
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                {project.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-ink-soft">{project.summary}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-faint">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-edge pt-4">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Pill tone="muted">{tag}</Pill>
                  </li>
                ))}
              </ul>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-signal hover:underline"
                >
                  View project
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              )}
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
