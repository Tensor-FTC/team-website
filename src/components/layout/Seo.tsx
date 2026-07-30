import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { teamConfig, teamTitle } from '../../config/teamConfig'

type SeoProps = {
  /** Page title. Rendered as "Title · Team Name". */
  title: string
  description?: string
  /** Set for the 404 page so search engines skip it. */
  noIndex?: boolean
}

/**
 * Per-page document metadata.
 *
 * The team logo doubles as the Open Graph image. Absolute URLs are only emitted
 * once `teamConfig.siteUrl` is filled in, since Open Graph requires them.
 */
export function Seo({ title, description = teamConfig.description, noIndex = false }: SeoProps) {
  const { pathname } = useLocation()
  const fullTitle = `${title} · ${teamTitle()}`
  const siteUrl = teamConfig.siteUrl.replace(/\/$/, '')
  const canonical = siteUrl ? `${siteUrl}${pathname}` : ''
  const imageUrl = siteUrl ? `${siteUrl}${teamConfig.logoPath}` : ''

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={teamTitle()} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  )
}
