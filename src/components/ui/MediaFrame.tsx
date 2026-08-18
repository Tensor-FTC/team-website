import { motion } from 'framer-motion'
import { ImageIcon, type LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { asset } from '../../config/asset'
import { useParallax } from '../../hooks/useParallax'
import { cn } from './cn'

type MediaFrameProps = {
  /** Path under /public. Empty (or a broken path) shows the placeholder. */
  src: string
  alt: string
  /** Shown in the placeholder to hint at what belongs here. */
  label?: string
  /** Placeholder icon. */
  icon?: LucideIcon
  /** Tailwind aspect-ratio class. */
  aspect?: string
  /** Drift the image slightly as it passes through the viewport. */
  parallax?: boolean
  className?: string
}

/**
 * A framed image with a graceful placeholder.
 *
 * Every image on the site goes through here, so a photo that has not been added
 * yet renders as a quiet blueprint panel rather than a broken image icon.
 */
export function MediaFrame({
  src,
  alt,
  label,
  icon: Icon = ImageIcon,
  aspect = 'aspect-[4/3]',
  parallax = false,
  className,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const y = useParallax(frameRef, parallax ? 14 : 0)
  const showPlaceholder = failed || src.trim().length === 0

  return (
    <div
      ref={frameRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-edge bg-canvas-deep',
        aspect,
        className,
      )}
    >
      {showPlaceholder ? (
        <div
          className="blueprint absolute inset-0 grid place-items-center"
          role="img"
          aria-label={alt}
        >
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <Icon aria-hidden="true" className="size-6 text-ink-faint" strokeWidth={1.5} />
            {label && <span className="kicker">{label}</span>}
          </div>
        </div>
      ) : (
        <motion.img
          src={asset(src)}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={parallax ? { y, scale: 1.05 } : undefined}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  )
}
