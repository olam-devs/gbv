import { PageShell } from "@/components/site/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { media } from "@/lib/media";

export const metadata = {
  title: "Donate & Support",
};

export default function DonatePage() {
  return (
    <PageShell
      eyebrow="Donate"
      title="Support survivors — your gift creates safety"
      heroImageSrc={media.hero.donate}
    >
      <AnimatedSection>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <p className="text-sm leading-7 text-zinc-700">
              GI-Desk welcomes all types of donations including cash, food, clothing,
              medical supplies, and items for the psychosocial support of children and
              adolescents affected by GBV. Every contribution — however small — directly
              funds case management, counselling, and community prevention programmes.
            </p>

            <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
              <div className="text-sm font-semibold">How to donate</div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-violet-50 p-4 ring-1 ring-violet-200">
                  <div className="text-sm font-semibold">Mobile / Phone</div>
                  <div className="mt-2 text-sm text-zinc-700">
                    Call or WhatsApp us to arrange a donation:
                    <br />
                    <a href="tel:+255755629863" className="font-semibold text-[var(--primary)]">
                      +255 755 629 863
                    </a>
                  </div>
                </div>
                <div className="rounded-xl bg-violet-50 p-4 ring-1 ring-violet-200">
                  <div className="text-sm font-semibold">Email</div>
                  <div className="mt-2 text-sm text-zinc-700">
                    Email us for bank transfer details or in-kind donations:
                    <br />
                    <a
                      href="mailto:genderdeskhelp@gmail.com"
                      className="font-semibold text-[var(--primary)]"
                    >
                      genderdeskhelp@gmail.com
                    </a>
                  </div>
                </div>
                <div className="rounded-xl bg-violet-50 p-4 ring-1 ring-violet-200 sm:col-span-2">
                  <div className="text-sm font-semibold">In-kind donations</div>
                  <div className="mt-2 text-sm text-zinc-700">
                    We welcome donations of food, clothing, medical supplies, and
                    materials for child and adolescent psychosocial support. Contact us to
                    arrange collection or drop-off.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-violet-50 p-6 ring-1 ring-violet-200">
              <div className="text-sm font-semibold text-violet-950">Volunteer with us</div>
              <p className="mt-2 text-sm leading-6 text-violet-950/90">
                A minimum commitment of two weeks is required. To volunteer, email
                us at{" "}
                <a
                  href="mailto:genderdeskhelp@gmail.com"
                  className="font-semibold underline"
                >
                  genderdeskhelp@gmail.com
                </a>
                .
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-[var(--primary)] p-6 text-white">
              <div className="text-sm font-semibold">
                Want to talk first?
              </div>
              <p className="mt-2 text-sm leading-6 text-white/90">
                We can share programme details, impact updates and partnership
                opportunities.
              </p>
              <div className="mt-4">
                <ButtonLink href="/contact" variant="secondary">
                  Contact GI-Desk
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
