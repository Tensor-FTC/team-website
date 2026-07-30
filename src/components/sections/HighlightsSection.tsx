import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '../layout/Section'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

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
    title: 'FTCHub',
    description:
      'An app we are building to handle the admin side of running a robotics team — budgets, sponsors, parts, deadlines.',
  },
  {
    to: '/team',
    index: '03',
    title: 'The team',
    description: 'Seven students across software, hardware and outreach, plus a coach and two mentors.',
  },
  {
    to: '/projects',
    index: '04',
    title: 'What we are building',
    description:
      'An offseason DECODE robot, FTCHub, and the engineering portfolio that records all of it.',
  },
]

/**
 * Home page index of the site.
 *
 * A numbered list with hairline dividers instead of a grid of bordered cards —
 * fewer boxes, easier to scan.
 */
export function HighlightsSection() {
  return (
    <Section spacing="md" id="explore">
      <SectionHeading
        kicker="Index"
        title="Where to start"
        description="We are a first-year team, so most of this is in progress. Here is what we are actually working on."
      />

      <RevealGroup as="ul" className="mt-10 border-t border-edge">
        {highlights.map((highlight) => (
          <RevealItem as="li" key={highlight.to}>
            <Link
              to={highlight.to}
              className="group flex items-baseline gap-5 border-b border-edge py-6 transition-colors hover:bg-surface/40 sm:gap-8 sm:px-2"
            >
              <span className="kicker shrink-0 transition-colors group-hover:text-signal">
                {highlight.index}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-signal">
                  {highlight.title}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-soft">
                  {highlight.description}
                </span>
              </span>

              <ArrowRight
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-signal"
              />
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
