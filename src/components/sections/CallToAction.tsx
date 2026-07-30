import { ArrowRight } from 'lucide-react'
import { teamConfig } from '../../config/teamConfig'
import { Section } from '../layout/Section'
import { ButtonExternal, ButtonLink } from '../ui/Button'
import { NetworkGraph } from '../ui/NetworkGraph'
import { Reveal } from '../ui/Reveal'

type CallToActionProps = {
  title?: string
  description?: string
}

/**
 * Closing block used at the bottom of most pages.
 *
 * Reprises the network graph at low intensity, which ties the end of a page
 * back to the hero without repeating a boxed panel on every route.
 */
export function CallToAction({
  title = 'Want to work with us?',
  description = 'Whether you are a student thinking about joining, a company considering sponsorship, or a school looking for a workshop — we would like to hear from you.',
}: CallToActionProps) {
  return (
    <Section spacing="lg">
      <Reveal className="relative isolate overflow-hidden rounded-xl border border-edge bg-surface/60 px-6 py-14 text-center sm:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            maskImage: 'radial-gradient(70% 100% at 50% 0%, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(70% 100% at 50% 0%, black, transparent 80%)',
          }}
        >
          <NetworkGraph columns={6} rows={3} interactive={false} />
        </div>

        <h2 className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          {description}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink to="/contact" size="lg">
            Contact the team
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </ButtonLink>
          <ButtonExternal href={`mailto:${teamConfig.email}`} variant="secondary" size="lg">
            {teamConfig.email}
          </ButtonExternal>
        </div>
      </Reveal>
    </Section>
  )
}
