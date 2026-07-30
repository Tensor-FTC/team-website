import type { Transition, Variants } from 'framer-motion'

/**
 * Shared animation vocabulary.
 *
 * Distances are deliberately small. The network graph in the hero carries the
 * personality; everything else should read as content settling into place, not
 * as an effect. Keeping the easing and travel in one file is what makes the
 * whole site feel like a single system.
 *
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * in App.tsx, which strips transforms and keeps opacity fades.
 */

/** Soft deceleration curve used for almost everything. */
export const easeOut: Transition['ease'] = [0.22, 0.61, 0.36, 1]

export const transitions = {
  quick: { duration: 0.2, ease: easeOut } satisfies Transition,
  base: { duration: 0.42, ease: easeOut } satisfies Transition,
  spring: { type: 'spring', stiffness: 320, damping: 30 } satisfies Transition,
}

/** Fade up — the default entrance for a single element. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
}

/** Parent variant that staggers its children in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

/** Child variant to pair with `staggerContainer` — used for card grids. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
}

/** Hero and page headers: lines rise in one after another. */
export const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
}

/** Page-level enter/exit, driven by <AnimatePresence mode="wait">. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: easeOut } },
}

/** Mobile menu panel. */
export const mobilePanel: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easeOut, staggerChildren: 0.035, delayChildren: 0.04 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: easeOut } },
}

export const mobilePanelItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: transitions.quick },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

/** Shared `whileInView` settings — reveal once, slightly before fully visible. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' } as const
