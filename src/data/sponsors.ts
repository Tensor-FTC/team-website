/**
 * Team sponsors, grouped into tiers.
 *
 * Put sponsor logos in `public/images/sponsors/` and set `logo` to e.g.
 * `/images/sponsors/acme.png`. Leave `logo` empty to show the sponsor's name in
 * a frosted panel instead — the site looks finished either way.
 */

export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'community'

export type Sponsor = {
  id: string
  name: string
  tier: SponsorTier
  /** Outbound link, or '' to render a non-clickable card. */
  url: string
  /** Path under /public, or '' for the name-only fallback. */
  logo: string
  /** One sentence on what the sponsor contributes. */
  description: string
}

export type SponsorshipLevel = {
  tier: SponsorTier
  label: string
  amount: string
  benefits: string[]
}

export const sponsorTierLabels: Record<SponsorTier, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  community: 'Community',
}

/** Render order for tier sections. */
export const sponsorTierOrder: SponsorTier[] = ['platinum', 'gold', 'silver', 'community']

export const sponsors: Sponsor[] = [
  {
    id: 'sponsor-1',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'platinum',
    url: '',
    logo: '',
    description:
      'Placeholder description. What this sponsor provides — funding, materials, machine time, or mentorship.',
  },
  {
    id: 'sponsor-2',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'gold',
    url: '',
    logo: '',
    description: 'Placeholder description. A sentence about this sponsor’s support for the team.',
  },
  {
    id: 'sponsor-3',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'gold',
    url: '',
    logo: '',
    description: 'Placeholder description. A sentence about this sponsor’s support for the team.',
  },
  {
    id: 'sponsor-4',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'silver',
    url: '',
    logo: '',
    description: 'Placeholder description. A sentence about this sponsor’s support for the team.',
  },
  {
    id: 'sponsor-5',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'silver',
    url: '',
    logo: '',
    description: 'Placeholder description. A sentence about this sponsor’s support for the team.',
  },
  {
    id: 'sponsor-6',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'community',
    url: '',
    logo: '',
    description: 'Placeholder description. In-kind support such as printing, food, or transport.',
  },
  {
    id: 'sponsor-7',
    name: 'SPONSOR_NAME_PLACEHOLDER',
    tier: 'community',
    url: '',
    logo: '',
    description: 'Placeholder description. In-kind support such as printing, food, or transport.',
  },
]

export const sponsorshipLevels: SponsorshipLevel[] = [
  {
    tier: 'platinum',
    label: 'Platinum',
    amount: 'AMOUNT_PLACEHOLDER',
    benefits: [
      'Logo on the robot and team shirts',
      'Featured placement on this website',
      'Named in every competition presentation',
      'Invitation to an end-of-season demo',
    ],
  },
  {
    tier: 'gold',
    label: 'Gold',
    amount: 'AMOUNT_PLACEHOLDER',
    benefits: [
      'Logo on team shirts',
      'Logo on this website',
      'Named in the engineering portfolio',
      'Season progress updates',
    ],
  },
  {
    tier: 'silver',
    label: 'Silver',
    amount: 'AMOUNT_PLACEHOLDER',
    benefits: ['Logo on this website', 'Named in the engineering portfolio', 'Season summary email'],
  },
  {
    tier: 'community',
    label: 'Community & in-kind',
    amount: 'Any amount or donated goods',
    benefits: [
      'Named on this website',
      'Thank-you from the team',
      'Great for materials, printing or food donations',
    ],
  },
]

/** Sponsors in a given tier. */
export function sponsorsByTier(tier: SponsorTier): Sponsor[] {
  return sponsors.filter((sponsor) => sponsor.tier === tier)
}
