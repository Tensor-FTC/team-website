import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { transitions } from '../../config/motion'
import {
  displayDetail,
  displayName,
  initialsFor,
  subteams,
  teamMembers,
  type Subteam,
} from '../../data/teamMembers'
import { Section } from '../layout/Section'
import { MediaFrame } from '../ui/MediaFrame'
import { Panel } from '../ui/Panel'
import { Pill } from '../ui/Pill'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { cn } from '../ui/cn'

type Filter = Subteam | 'all'

/** The full roster, filterable by subteam. */
export function TeamGrid() {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () => (filter === 'all' ? teamMembers : teamMembers.filter((m) => m.subteam === filter)),
    [filter],
  )

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Everyone' },
    ...subteams.map((subteam) => ({ id: subteam.id as Filter, label: subteam.label })),
  ]

  return (
    <Section spacing="sm" id="roster">
      <div
        role="group"
        aria-label="Filter roster by subteam"
        className="flex flex-wrap gap-x-5 gap-y-2"
      >
        {filters.map((option) => {
          const isActive = filter === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={isActive}
              className={cn(
                'relative py-1 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-200',
                isActive ? 'text-signal' : 'text-ink-faint hover:text-ink',
              )}
            >
              {option.label}
              {isActive && (
                <motion.span
                  layoutId="roster-filter-underline"
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-signal"
                  transition={transitions.spring}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Announce filter results to assistive tech, which cannot see the grid change. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? 'member' : 'members'}.
      </p>

      <RevealGroup
        key={filter}
        as="ul"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((member) => {
          const year = displayDetail(member.year)
          const bio = displayDetail(member.bio)

          return (
            <RevealItem as="li" key={member.id} className="min-w-0">
              <Panel
                padding="none"
                hover
                as="article"
                className="flex h-full flex-col overflow-hidden"
              >
                {member.image ? (
                  <MediaFrame
                    src={member.image}
                    alt={displayName(member.name)}
                    aspect="aspect-[4/3]"
                    className="rounded-none border-0 border-b border-edge"
                  />
                ) : (
                  <div className="blueprint grid aspect-[4/3] place-items-center border-b border-edge bg-canvas-deep">
                    <span
                      aria-hidden="true"
                      className="grid size-16 place-items-center rounded-full border border-signal/30 bg-signal-dim font-mono text-lg text-signal"
                    >
                      {initialsFor(member.name)}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {displayName(member.name)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-signal">{member.role}</p>
                  {year && <p className="kicker mt-2">{year}</p>}

                  {/* The spacer keeps the skill pills on the bottom edge of
                      every card, including the ones with no bio written yet. */}
                  {bio ? (
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">{bio}</p>
                  ) : (
                    <span aria-hidden="true" className="flex-1" />
                  )}

                  {member.skills.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-edge pt-4">
                      {member.skills.map((skill) => (
                        <li key={skill}>
                          <Pill tone="muted">{skill}</Pill>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Panel>
            </RevealItem>
          )
        })}
      </RevealGroup>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink-faint">
          No members listed for this subteam yet.
        </p>
      )}
    </Section>
  )
}
