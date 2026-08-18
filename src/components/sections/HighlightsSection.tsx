import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '../layout/Section'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SpotlightPanel } from '../ui/SpotlightPanel'

type Highlight = {
  to: string
  index: string
  title: string
  description: string
}

const highlights: Highlight[] = [
  {
    to: '/robot',
    index: '01',
    title: 'BIOBUZZ',
    description:
      'Our first robot, still in design. What each subteam is working out, and the plan for getting it onto a field.',
  },
  {
    to: '/resources',
    index: '02',
    title: 'FTCHome',
    description:
      'An app we are building to handle the admin side of running a robotics team — budgets, sponsors, parts, deadlines.',
  },
  {
    to: '/team',
    index: '03',
    title: 'The team',
    description:
      'Seven students across software, hardware and outreach, plus a coach and two mentors.',
  },
  {
    to: '/projects',
    index: '04',
    title: 'What we are building',
    description:
      'An offseason DECODE robot, FTCHome, and the engineering portfolio that records all of it.',
  },
]

/**
 * Home page index of the site.
 *
 * Four numbered cards. The number is set large and dim so it works as an
 * ordering cue you can skim past, rather than as another line of text to read.
 */
export function HighlightsSection() {
  return (
    <Section spacing="md" id="explore">
      <SectionHeading
        kicker="Index"
        title="Where to start"
        description="We are a first-year team, so most of this is in progress. Here is what we are actually working on."
      />

      <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
        {highlights.map((highlight) => (
          <RevealItem as="li" key={highlight.to} className="min-w-0">
            <SpotlightPanel className="h-full">
              <Link
                to={highlight.to}
                className="group flex h-full flex-col p-6 sm:p-7"
                /* The card is the hit target; the spotlight sits behind it. */
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-3xl leading-none font-semibold tracking-[0.02em] text-ink-faint/50 transition-colors duration-200 group-hover:text-signal/70">
                    {highlight.index}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-signal">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {highlight.description}
                </p>
              </Link>
            </SpotlightPanel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
