import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { heroContainer, heroItem } from '../../config/motion'
import { hasTeamNumber, organisation, teamConfig } from '../../config/teamConfig'
import { Section } from '../layout/Section'
import { ButtonLink } from '../ui/Button'
import { NetworkGraph } from '../ui/NetworkGraph'

/**
 * Home page hero.
 *
 * The live network graph sits behind the copy rather than beside it, so the
 * headline stays the focus and the animation reads as the page's own texture.
 */
export function Hero() {
  return (
    <div className="relative isolate">
      {/*
       * The graph, bled to the full width. `hero-graph` (in globals.css) masks
       * it away from the headline: faint on phones, and weighted to the empty
       * right-hand side on wide screens.
       */}
      <div aria-hidden="true" className="hero-graph absolute inset-0 -z-10">
        <NetworkGraph columns={7} rows={4} />
      </div>

      <Section spacing="lg" className="pt-10 sm:pt-16">
        <motion.div variants={heroContainer} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.p variants={heroItem} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-signal" />
            <span className="kicker text-signal">
              FIRST Tech Challenge
              {hasTeamNumber() && ` · Team ${teamConfig.teamNumber}`}
            </span>
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl"
          >
            {teamConfig.slogan}
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {teamConfig.description}
          </motion.p>

          <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink to="/robot" size="lg">
              See the robot
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink to="/sponsors" variant="secondary" size="lg">
              Sponsor the team
            </ButtonLink>
          </motion.div>

          <motion.p variants={heroItem} className="kicker mt-12">
            {organisation()} · {teamConfig.location}
          </motion.p>
        </motion.div>
      </Section>
    </div>
  )
}
