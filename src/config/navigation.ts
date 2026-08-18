/** Route definitions shared by the navigation bar, footer and sitemap. */
export type NavLink = {
  /** Router path. */
  to: string
  /** Visible label. */
  label: string
  /** Short blurb used in the footer and on the 404 page. */
  blurb: string
}

export const navLinks: NavLink[] = [
  { to: '/', label: 'Home', blurb: 'Season highlights and quick links' },
  { to: '/about', label: 'About', blurb: 'Who we are and how we work' },
  { to: '/team', label: 'Team', blurb: 'Students and mentors' },
  { to: '/join', label: 'Join', blurb: 'How to join the team' },
  { to: '/robot', label: 'Robot', blurb: 'This season’s design and systems' },
  { to: '/projects', label: 'Projects', blurb: 'Engineering and software work' },
  { to: '/outreach', label: 'Outreach', blurb: 'Community events and workshops' },
  { to: '/resources', label: 'Resources', blurb: 'FTCHome and tools for other teams' },
  { to: '/sponsors', label: 'Sponsors', blurb: 'Partners who make it possible' },
  { to: '/contact', label: 'Contact', blurb: 'Get in touch with the team' },
]
