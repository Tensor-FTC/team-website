import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { pageTransition } from './config/motion'
import { useScrollToTop } from './hooks/useScrollToTop'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import NotFoundPage from './pages/NotFoundPage'
import OutreachPage from './pages/OutreachPage'
import ProjectsPage from './pages/ProjectsPage'
import ResourcesPage from './pages/ResourcesPage'
import RobotPage from './pages/RobotPage'
import SponsorsPage from './pages/SponsorsPage'
import TeamPage from './pages/TeamPage'

export default function App() {
  const location = useLocation()
  useScrollToTop()

  return (
    /*
     * `reducedMotion="user"` makes every Framer Motion animation in the tree
     * honour the OS "reduce motion" setting — transforms are dropped, opacity
     * fades are kept. Nothing below needs to opt in.
     */
    <MotionConfig reducedMotion="user">
      <Layout>
        {/*
         * `mode="wait"` lets the outgoing page finish animating out before the
         * next one enters, so only one page is ever mounted — which keeps a
         * single <main> landmark and a stable #main skip-link target.
         *
         * Keying on pathname rather than the whole location means an in-page
         * hash change does not retrigger the transition. `initial={false}`
         * skips the fade on first load, so the hero animation greets you
         * instead of a blank page.
         */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={location.pathname}
            id="main"
            variants={pageTransition}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col"
          >
            {/*
             * Pinning `location` keeps the outgoing page rendering its own
             * route while it animates out, instead of flipping to the new one.
             */}
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/robot" element={<RobotPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/outreach" element={<OutreachPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  )
}
