import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { mobilePanel, mobilePanelItem } from '../../config/motion'
import { navLinks } from '../../config/navigation'
import { cn } from '../ui/cn'

type MobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Compact navigation for narrow viewports.
 *
 * Closes on Escape, on outside click and on route change (handled by the
 * parent). Body scroll is locked while it is open so the page behind cannot
 * drift.
 */
export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onOpenChange(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onOpenChange])

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="grid size-10 place-items-center rounded-md border border-edge text-ink transition-colors hover:border-signal/50"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="grid place-items-center"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            variants={mobilePanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-6rem)] origin-top overflow-y-auto rounded-xl border border-edge bg-surface p-2 shadow-lift sm:inset-x-6"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <motion.li key={link.to} variants={mobilePanelItem}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => onOpenChange(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline justify-between gap-4 rounded-md px-3 py-3 transition-colors',
                        isActive ? 'bg-surface-high text-ink' : 'text-ink-soft hover:text-ink',
                      )
                    }
                  >
                    <span className="text-sm font-medium">{link.label}</span>
                    <span className="truncate text-xs text-ink-faint">{link.blurb}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
