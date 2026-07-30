import { Camera, CirclePlay, GitBranch, type LucideIcon } from 'lucide-react'
import type { teamConfig } from '../../config/teamConfig'

/**
 * Label and icon for each social platform in `teamConfig.socialLinks`.
 *
 * Lucide dropped brand marks in v1, so these are generic icons chosen to
 * suggest the platform. Every social link also carries a text label or an
 * `aria-label` naming the platform, so nothing depends on the icon alone.
 */
export const socialMeta: Record<
  keyof typeof teamConfig.socialLinks,
  { label: string; icon: LucideIcon }
> = {
  instagram: { label: 'Instagram', icon: Camera },
  youtube: { label: 'YouTube', icon: CirclePlay },
  github: { label: 'GitHub', icon: GitBranch },
}
