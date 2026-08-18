import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../../config/navigation'
import { teamConfig } from '../../config/teamConfig'
import { ButtonLink } from '../ui/Button'
import { TeamLogo } from '../ui/TeamLogo'
import { cn } from '../ui/cn'
import { MobileNav } from './MobileNav'

/**
 * Sticky top navigation.
 *
 * The current route is marked two ways: a thin signal-blue underline that
 * slides between items (a shared `layoutId`) and `aria-current="page"` for
 * assistive tech. Once the page scrolls, the bar gains a background and a
 * bottom hairline so it separates from the content behind it.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 8))

  // Never leave the mobile menu hanging open across a navigation. Adjusting
  // during render rather than in an effect avoids a second render pass with the
  // menu still visible — clicking a link closes it directly, but browser
  // back/forward needs this.
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled ? 'border-edge bg-canvas/85 backdrop-blur-md' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="min-w-0 shrink-0 rounded-md transition-opacity hover:opacity-85"
          aria-label={`${teamConfig.teamName} — home`}
        >
          {/* The number is the first thing a judge or another team looks for,
              but it needs room the narrowest phones do not have. */}
          <TeamLogo size={38} showName showNumber numberClassName="hidden sm:block" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative block py-1.5 text-sm transition-colors duration-200',
                      isActive ? 'text-ink' : 'text-ink-faint hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-underline"
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full bg-signal"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/contact" variant="secondary" size="sm" className="hidden sm:inline-flex">
            Get in touch
          </ButtonLink>

          <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </div>
    </header>
  )
}
