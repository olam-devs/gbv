import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/settings";
import { media } from "@/lib/media";
import { ShieldAlert, Lock } from "lucide-react";

export const metadata = {
  title: "Whistle-blower / Tupe taarifa",
};

export default async function WhistleblowerPage() {
  const settings = await getSiteSettings();

  return (
    <PageShell
      eyebrow="Whistle-blower policy"
      title="Tupe taarifa — report a concern safely"
      heroImageSrc={media.hero.contact}
    >
      <AnimatedSection>
        <div className="max-w-3xl space-y-4">
          <p className="text-sm leading-7 text-zinc-800">
            PASADA is committed to the highest standards of integrity, transparency
            and accountability. If you have witnessed misconduct, fraud, abuse,
            safeguarding concerns, or any breach of our code of conduct, you can
            report it confidentially through either of the two channels below.
            Reports are sent directly to PASADA leadership.
          </p>
          <div className="flex items-start gap-3 rounded-2xl border-2 border-black bg-zinc-50 p-5">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
            <p className="text-sm leading-6 text-zinc-800">
              You may report anonymously. All reports are treated with strict
              confidentiality and reviewed by PASADA&apos;s leadership team.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-[var(--primary)] bg-white p-6 shadow-sm">
            <ShieldAlert className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-semibold text-black">Channel 1</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-800">
              Submit your report via our first Tupe taarifa online form.
            </p>
            <div className="mt-5">
              <ButtonLink
                href={settings.whistleblowerChannel1Url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Channel 1 form
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[var(--primary)] bg-white p-6 shadow-sm">
            <ShieldAlert className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-semibold text-black">Channel 2</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-800">
              Submit your report via our second Tupe taarifa online form.
            </p>
            <div className="mt-5">
              <ButtonLink
                href={settings.whistleblowerChannel2Url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Channel 2 form
              </ButtonLink>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
