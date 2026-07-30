import { Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../config/navigation'
import { activeSocialLinks, organisation, seasonLabel, teamConfig } from '../../config/teamConfig'
import { TeamLogo } from '../ui/TeamLogo'
import { socialMeta } from '../ui/socialMeta'

export function Footer() {
  const socials = activeSocialLinks()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-28 border-t border-edge">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Identity */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="w-fit rounded-md" aria-label={`${teamConfig.teamName} — home`}>
              <TeamLogo size={40} showName emphasis="hero" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">{teamConfig.slogan}</p>

            {socials.length > 0 && (
              <ul className="flex items-center gap-2">
                {socials.map(({ key, url }) => {
                  const { label, icon: Icon } = socialMeta[key]
                  return (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${teamConfig.teamName} on ${label}`}
                        className="grid size-9 place-items-center rounded-md border border-edge text-ink-faint transition-colors hover:border-signal/50 hover:text-signal"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer">
            <h2 className="kicker">Pages</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-soft transition-colors hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="kicker">Contact</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${teamConfig.email}`}
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-signal"
                >
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-faint" />
                  {teamConfig.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-faint" />
                <span>
                  {organisation()}
                  <br />
                  {teamConfig.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col gap-2 border-t border-edge py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {teamConfig.teamName} · Team {teamConfig.teamNumber}
          </p>
          <p className="kicker">{seasonLabel()}</p>
        </div>
      </div>
    </footer>
  )
}
