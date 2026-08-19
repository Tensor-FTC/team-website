import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Download, FileText, X } from 'lucide-react'
import { useState } from 'react'
import { asset } from '../../config/asset'
import { transitions } from '../../config/motion'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Button, ButtonExternal } from './Button'
import { cn } from './cn'

type DocumentPanelProps = {
  title: string
  summary: string
  /** Path under /public. */
  file: string
  /** Path under /public to a rendered image of the first page. */
  cover: string
  pages: number
  /** Human-readable file size, e.g. "3.7 MB". */
  size: string
  className?: string
}

/*
 * Corner marks, matching the identity plate in the hero. Inset rather than
 * flush: this panel clips its overflow so the reader can slide open, and a
 * flush bracket would be shaved off by the rounded corner.
 */
const CORNERS = [
  'left-3 top-3 border-l border-t',
  'right-3 top-3 border-r border-t',
  'left-3 bottom-3 border-l border-b',
  'right-3 bottom-3 border-r border-b',
]

/**
 * A document, presented as an object rather than as a link.
 *
 * The cover is a real render of the first page, so the panel shows what the
 * document actually looks like instead of a generic file icon. Reading happens
 * in one of two places: an inline viewer that opens on demand, or a new tab.
 *
 * The PDF itself is several megabytes and is never fetched on page load — the
 * <iframe> only mounts once someone asks for it. The inline viewer is offered
 * only to pointer devices, because mobile browsers largely refuse to render a
 * PDF inside an iframe and would show an empty box; on a phone the buttons open
 * the file in the OS viewer, which is what a phone reader wants anyway.
 */
export function DocumentPanel({
  title,
  summary,
  file,
  cover,
  pages,
  size,
  className,
}: DocumentPanelProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const finePointer = useFinePointer()
  const prefersReducedMotion = usePrefersReducedMotion()

  const href = asset(file)
  const meta = `PDF · ${pages} pages · ${size}`

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-2xl border border-edge bg-surface/60 shadow-panel',
        className,
      )}
    >
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={cn('pointer-events-none absolute z-10 size-4 border-signal/45', corner)}
        />
      ))}

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10 lg:p-10">
        {/* Cover */}
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="group relative block overflow-hidden rounded-lg border border-edge bg-plate transition-colors duration-200 hover:border-signal/50"
        >
          <img
            src={asset(cover)}
            alt={`First page of ${title}`}
            width={622}
            height={880}
            loading="lazy"
            decoding="async"
            className="block w-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* A soft wash so the white page does not glare against the dark panel. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas-deep/50 via-transparent to-transparent"
          />
        </a>

        {/* Detail */}
        <div className="flex min-w-0 flex-col">
          <p className="kicker flex items-center gap-2">
            <FileText aria-hidden="true" className="size-3.5 text-signal" strokeWidth={2} />
            {meta}
          </p>

          <h3 className="display mt-4 text-xl text-ink sm:text-2xl">{title}</h3>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">{summary}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {finePointer ? (
              <Button onClick={() => setViewerOpen((open) => !open)}>
                {viewerOpen ? (
                  <>
                    <X aria-hidden="true" className="size-4" />
                    Close the reader
                  </>
                ) : (
                  <>
                    <FileText aria-hidden="true" className="size-4" />
                    Read it here
                  </>
                )}
              </Button>
            ) : (
              <ButtonExternal href={href}>
                <FileText aria-hidden="true" className="size-4" />
                Read the document
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </ButtonExternal>
            )}

            <ButtonExternal href={href} variant="secondary" download>
              <Download aria-hidden="true" className="size-4" />
              Download
            </ButtonExternal>
          </div>

          <p className="kicker mt-6 text-ink-faint">
            {finePointer ? 'Opens below' : 'Opens in a new tab'} · no sign-in
          </p>
        </div>
      </div>

      {/* The reader. Mounted only once asked for, so the file is never a page-load cost. */}
      <AnimatePresence initial={false}>
        {viewerOpen && (
          <motion.div
            key="viewer"
            initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={transitions.base}
            className="overflow-hidden border-t border-edge"
          >
            {/*
             * <object> rather than <iframe> so there is somewhere to put a
             * fallback. A browser with no built-in PDF viewer renders the
             * children instead of an empty grey box, and the reader still has a
             * way through to the file.
             */}
            <object
              data={`${href}#view=FitH`}
              type="application/pdf"
              title={title}
              className="block h-[75vh] w-full bg-plate"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
                <FileText aria-hidden="true" className="size-6 text-ink-faint" strokeWidth={1.5} />
                <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
                  Your browser will not display a PDF inline. Open it in a new tab instead — it is
                  the same file.
                </p>
                <ButtonExternal href={href} variant="secondary">
                  Open the document
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </ButtonExternal>
              </div>
            </object>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
