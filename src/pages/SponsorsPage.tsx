import { Mail } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { Section } from '../components/layout/Section'
import { Seo } from '../components/layout/Seo'
import { SponsorWall, SponsorshipTiers } from '../components/sections/SponsorWall'
import { ButtonExternal, ButtonLink } from '../components/ui/Button'
import { SectionHeading } from '../components/ui/SectionHeading'
import { seasonLabel, sponsorContactEmail, teamConfig } from '../config/teamConfig'
import { realSponsors } from '../data/sponsors'

export default function SponsorsPage() {
  const email = sponsorContactEmail()
  const signed = realSponsors().length

  return (
    <>
      <Seo
        title="Sponsors"
        description={`${teamConfig.teamName} is supported by local businesses and organisations. See our sponsors and how to become one.`}
      />

      <PageHeader
        kicker="Sponsors"
        title="Help us get our first season off the ground"
        description="We are a brand new team with no equipment and no budget history. Registration, a control system, parts and travel all come first — and every sponsor who backs a rookie team gets credited for the whole story that follows."
        actions={
          <>
            <ButtonExternal
              href={`mailto:${email}?subject=${encodeURIComponent(
                `Sponsorship enquiry — ${teamConfig.teamName}`,
              )}`}
              size="lg"
            >
              <Mail aria-hidden="true" className="size-4" />
              Talk to us about sponsoring
            </ButtonExternal>
            <ButtonLink to="/outreach" variant="secondary" size="lg">
              See our community impact
            </ButtonLink>
          </>
        }
        meta={[
          // 'Seeking first' rather than a flat 0 — the same fact, framed as the
          // ask this page is actually making.
          { label: 'Sponsors', value: signed > 0 ? String(signed) : 'Seeking first' },
          { label: 'Season', value: seasonLabel() },
          { label: 'Based in', value: teamConfig.location },
          { label: 'Contact', value: email },
        ]}
      />

      <Section spacing="sm">
        {signed > 0 ? (
          <SectionHeading
            kicker="Thank you"
            title="Our current sponsors"
            description="Every organisation below backs a first-year team that has yet to prove itself. That is a harder thing to ask for than a renewal, and we do not take it lightly."
          />
        ) : (
          <SectionHeading
            kicker="Our sponsors"
            title="This page is empty, and we would like to change that"
            description="Backing a rookie team is a harder ask than renewing with an established one. It is also the version where a sponsor is part of how the team got started, rather than a logo added later."
          />
        )}
      </Section>

      <SponsorWall />
      <SponsorshipTiers />

      <Section spacing="md">
        <div className="overflow-hidden rounded-xl border border-edge bg-surface-high p-8 shadow-panel sm:p-11">
          <SectionHeading
            kicker="Next step"
            title="Sponsoring is a short conversation"
            description="Email us and we will send a one-page sponsorship packet with our season budget, the outreach we run, and exactly where the money goes. No obligation."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonExternal
              href={`mailto:${email}?subject=${encodeURIComponent(
                `Sponsorship packet request — ${teamConfig.teamName}`,
              )}`}
              size="lg"
            >
              <Mail aria-hidden="true" className="size-4" />
              Request the packet
            </ButtonExternal>
            <ButtonLink to="/contact" variant="secondary" size="lg">
              Other questions
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
