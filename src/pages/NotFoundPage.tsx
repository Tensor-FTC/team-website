import { motion } from 'framer-motion'
import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '../components/layout/Section'
import { Seo } from '../components/layout/Seo'
import { ButtonLink } from '../components/ui/Button'
import { Panel } from '../components/ui/Panel'
import { heroContainer, heroItem } from '../config/motion'
import { navLinks } from '../config/navigation'

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page not found"
        description="That page does not exist. Use the links to get back on track."
        noIndex
      />

      <Section spacing="lg" width="default">
        <motion.div variants={heroContainer} initial="hidden" animate="visible">
          <Panel padding="lg" tone="high" >
            <motion.span
              variants={heroItem}
              className="inline-grid size-12 place-items-center rounded-md border border-edge bg-surface-high"
            >
              <Compass aria-hidden="true" className="size-6 text-signal" strokeWidth={1.75} />
            </motion.span>

            <motion.p
              variants={heroItem}
              className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint"
            >
              Error 404
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            >
              We cannot find that page
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              The link may be out of date, or the page may have moved. Everything on the site is one
              click away below.
            </motion.p>

            <motion.div variants={heroItem} className="mt-8">
              <ButtonLink to="/" size="lg">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to the home page
              </ButtonLink>
            </motion.div>
          </Panel>

          <motion.ul variants={heroItem} className="mt-6 grid gap-3 sm:grid-cols-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex flex-col gap-1 rounded-md border border-edge bg-surface px-5 py-4 shadow-panel transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-high hover:shadow-lift"
                >
                  <span className="text-sm font-semibold text-ink">{link.label}</span>
                  <span className="text-xs text-ink-faint">{link.blurb}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Section>
    </>
  )
}
