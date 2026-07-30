/**
 * Single source of truth for team information.
 *
 * Replace the PLACEHOLDER values below with your team's real details. Every
 * component reads from here, so nothing needs to be edited twice and the team
 * number is never hardcoded in a component.
 */
export const teamConfig = {
  teamName: 'Tensor',
  teamNumber: 'TEAM_NUMBER_PLACEHOLDER',
  slogan: 'We design, build and program competition robots.',
  email: 'tensorftcteam@gmail.com',
  /**
   * Parent school or organisation. We are an independent community team, so this
   * is blank on purpose — every component that shows it checks first and falls
   * back to `orgLabel`.
   */
  school: '',
  location: 'Redmond, Washington',
  socialLinks: {
    instagram: '',
    youtube: '',
    github: '',
  },

  /* --- Additional details used around the site --- */

  /** Shown wherever `school` would go while we have no parent organisation. */
  orgLabel: 'Independent community team',
  /** Shown in the footer copyright line and the About page. */
  foundedYear: '2026',
  /** Our first competition season, and the game it is played on. */
  season: '2026–2027',
  /** The FIRST Tech Challenge game for our first competition season. */
  seasonGame: 'BIOBUZZ',
  /** The previous season's game, which our offseason robot is built for. */
  offseasonGame: 'DECODE',
  /** True until we have competed a full season. Drives the rookie copy. */
  isRookieSeason: true,
  /** Free-text meeting cadence, shown on the Contact page. */
  meetingSchedule: 'MEETING_SCHEDULE_PLACEHOLDER',
  /** Where the team meets, shown on the Contact page. */
  meetingLocation: 'MEETING_LOCATION_PLACEHOLDER',
  /** Where sponsorship enquiries should go. Falls back to `email` if blank. */
  sponsorEmail: '',
  /**
   * Canonical, absolute site URL, used for <link rel="canonical"> and Open
   * Graph tags. Leave blank to skip emitting absolute URLs.
   */
  siteUrl: '',
  /** Path to the logo in /public. Used by the <TeamLogo> component. */
  logoPath: '/team-logo.png',
  /** One-sentence description used as the default meta description. */
  description:
    'Tensor is a rookie FIRST Tech Challenge team of seven students. We are building our first competition robot, writing the software that drives it, and building tools to help other teams.',
} as const

/** `"#### — Team Name"`, or just the name until a real number is filled in. */
export function teamTitle(): string {
  return hasTeamNumber() ? `${teamConfig.teamNumber} — ${teamConfig.teamName}` : teamConfig.teamName
}

/**
 * What to show where a school or organisation name would go. Falls back to
 * `orgLabel` while we are an independent team with no parent organisation.
 */
export function organisation(): string {
  return teamConfig.school.trim() || teamConfig.orgLabel
}

/** `"BIOBUZZ · 2026–2027"` — the season we are competing in. */
export function seasonLabel(): string {
  return `${teamConfig.seasonGame} · ${teamConfig.season}`
}

/** False while the team number is still the placeholder. */
export function hasTeamNumber(): boolean {
  return !teamConfig.teamNumber.includes('PLACEHOLDER')
}

/** The address sponsorship enquiries should be sent to. */
export function sponsorContactEmail(): string {
  return teamConfig.sponsorEmail || teamConfig.email
}

/** Social links that have actually been filled in. */
export function activeSocialLinks(): { key: keyof typeof teamConfig.socialLinks; url: string }[] {
  return (Object.keys(teamConfig.socialLinks) as (keyof typeof teamConfig.socialLinks)[])
    .filter((key) => teamConfig.socialLinks[key].trim().length > 0)
    .map((key) => ({ key, url: teamConfig.socialLinks[key] }))
}
