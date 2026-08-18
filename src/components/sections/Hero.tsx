import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { asset } from '../../config/asset'
import { heroContainer, heroItem } from '../../config/motion'
import { hasTeamNumber, organisation, seasonLabel, teamConfig } from '../../config/teamConfig'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Section } from '../layout/Section'
import { AnimatedHeading } from '../ui/AnimatedHeading'
import { ButtonLink } from '../ui/Button'
import { IdentityLine } from '../ui/IdentityLine'
import { Magnetic } from '../ui/Magnetic'
import { NetworkGraph } from '../ui/NetworkGraph'
import { ScrambleText } from '../ui/ScrambleText'

/** Corner marks framing the identity plate, like a drawing callout. */
const CORNERS = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'left-0 bottom-0 border-l border-b',
  'right-0 bottom-0 border-r border-b',
]

/**
 * The logo, framed and labelled.
 *
 * The plate behind the artwork is painted `bg-plate`, the exact colour the PNG
 * itself sits on, so the image has no visible edge — the mark reads as though it
 * were drawn straight onto the panel.
 *
 * On phones this is a compact masthead above the copy; from `lg` it becomes the
 * full-width right-hand column.
 */
function IdentityPlate() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="relative isolate w-full max-w-md lg:max-w-none">
      {/* A soft bloom, so the plate sits in light rather than on flat black. */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-full bg-node/25 blur-3xl"
      />

      <div className="relative flex items-center gap-5 rounded-2xl border border-edge bg-plate p-4 shadow-lift sm:gap-6 sm:p-5 lg:flex-col lg:items-stretch lg:gap-6 lg:p-7">
        {CORNERS.map((corner) => (
          <span
            key={corner}
            aria-hidden="true"
            className={`pointer-events-none absolute size-4 border-signal/45 ${corner}`}
          />
        ))}

        <img
          src={asset(teamConfig.logoPath)}
          alt={teamConfig.teamName}
          width={606}
          height={630}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="size-24 shrink-0 object-contain sm:size-28 lg:size-auto lg:w-full"
        />

        {/*
         * The readout. The season is deliberately absent — the bezel across the
         * top of the hero already carries it, and the plate repeating it made
         * the same fact appear twice within one screen.
         */}
        <div className="flex min-w-0 items-end justify-between gap-4 lg:items-center lg:border-t lg:border-edge lg:pt-5">
          <div className="min-w-0">
            <p className="kicker hidden lg:block">FIRST Tech Challenge</p>

            {hasTeamNumber() && (
              <p className="font-display text-2xl leading-none font-bold tracking-[0.04em] text-ink sm:text-3xl lg:mt-2.5 lg:text-4xl">
                {/* `!` because DecryptedText hardcodes `whitespace-pre-wrap` on
                    its own wrapper, and it renders one span per character — the
                    number would otherwise break mid-digit on a narrow phone. */}
                <ScrambleText
                  text={`#${teamConfig.teamNumber}`}
                  speed={46}
                  className="whitespace-nowrap!"
                />
              </p>
            )}
          </div>

          {/* Rookie-season marker — true today, and it dates the site honestly. */}
          {teamConfig.isRookieSeason && (
            <p className="hidden shrink-0 items-center gap-2 sm:flex">
              <span aria-hidden="true" className="relative grid size-2 place-items-center">
                <motion.span
                  className="absolute size-2 rounded-full bg-signal"
                  animate={prefersReducedMotion ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </span>
              <span className="hud text-signal">Rookie</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Home page hero.
 *
 * Two columns from `lg`: the pitch on the left, the mark and team number on the
 * right. The live network graph runs behind both and is masked away from the
 * words, so the animation reads as the page's own texture rather than as
 * decoration sitting on top of it.
 */
export function Hero() {
  return (
    <div className="relative isolate">
      {/*
       * The graph, bled to the full width. `hero-graph` (in globals.css) masks
       * it: faint on phones, and weighted toward the centre on wide screens so
       * it runs between the headline and the plate rather than under either.
       */}
      <div aria-hidden="true" className="hero-graph absolute inset-0 -z-10">
        <NetworkGraph columns={7} rows={4} />
      </div>

      {/*
       * The bezel. A hairline rule with a label at each end frames the hero as
       * an instrument viewport rather than as a page section. It carries facts
       * that used to sit loose under the copy, so it adds a line of chrome and
       * removes a line of text.
       */}
      <Section spacing="sm" className="pt-6 pb-0 sm:pt-8">
        <motion.div
          variants={heroItem}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between gap-4 border-b border-edge pb-3"
        >
          <span className="hud hidden truncate sm:block">{organisation()}</span>
          <span className="hud shrink-0 text-signal/70">{seasonLabel()}</span>
        </motion.div>
      </Section>

      <Section spacing="lg" className="pt-8 sm:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="order-2 min-w-0 max-w-2xl lg:order-1"
          >
            <motion.div variants={heroItem}>
              <IdentityLine shine />
            </motion.div>

            <motion.div variants={heroItem}>
              <AnimatedHeading
                as="h1"
                text={teamConfig.slogan}
                immediate
                stagger={70}
                className="display mt-6 text-[1.75rem] text-ink sm:text-4xl lg:text-[2.75rem]"
              />
            </motion.div>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              {teamConfig.description}
            </motion.p>

            <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink to="/robot" size="lg">
                  See the robot
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink to="/sponsors" variant="secondary" size="lg">
                  Sponsor the team
                </ButtonLink>
              </Magnetic>
            </motion.div>

            <motion.p variants={heroItem} className="kicker mt-12">
              Founded {teamConfig.foundedYear}
            </motion.p>
          </motion.div>

          <motion.div
            variants={heroItem}
            initial="hidden"
            animate="visible"
            className="order-1 mx-auto w-full max-w-md min-w-0 lg:order-2 lg:mx-0 lg:max-w-none"
          >
            <IdentityPlate />
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
