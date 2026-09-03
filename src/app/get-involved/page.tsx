import { PageShell } from "@/components/site/PageShell";
import { media } from "@/lib/media";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { InvolvementForms } from "@/components/forms/InvolvementForms";
import { ButtonLink } from "@/components/ui/Button";
import { Briefcase } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";

export default async function GetInvolvedPage() {
  const settings = await getSiteSettings();
  return (
    <PageShell
      eyebrow="Get involved"
      title="Donate, volunteer, partner — be part of ending GBV"
      heroImageSrc={media.hero.getInvolved}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          Choose how you want to support GI-Desk. Complete the form for
          volunteering, partnerships, or donations — all enquiries go directly to our team.
        </p>
      </AnimatedSection>

      <div className="mt-8">
        <InvolvementForms
          volunteerEmail={settings.volunteerEmail}
          partnerEmail={settings.donationEmail}
          donateEmail={settings.donationEmail}
        />
      </div>

      <AnimatedSection>
        <section className="mt-14 rounded-2xl border-2 border-[var(--primary)] bg-gradient-to-br from-violet-50 via-white to-teal-50 p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-black bg-white text-[var(--primary)]">
                <Briefcase className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-black">Careers at GI-Desk</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-800">
                  View open positions and apply online. Browse current opportunities
                  and contact us if you have questions about a role.
                </p>
              </div>
            </div>
            <ButtonLink href="/jobs" className="shrink-0 justify-center">
              Browse job openings
            </ButtonLink>
          </div>
        </section>
      </AnimatedSection>
    </PageShell>
  );
}
