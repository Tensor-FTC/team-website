import type { ReactNode } from 'react'
import { Navbar } from '../navigation/Navbar'
import { ScrollProgress } from '../ui/ScrollProgress'
import { Backdrop } from './Backdrop'
import { Footer } from './Footer'

type LayoutProps = {
  children: ReactNode
}

/** App chrome shared by every route: backdrop, progress bar, nav and footer. */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Backdrop />
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only z-70 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:border focus:border-signal focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* Offsets the fixed navigation bar. */}
      <div className="flex-1 pt-20">{children}</div>

      <Footer />
    </div>
  )
}
