import { PageShell } from "@/components/site/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function DonatePage() {
  return (
    <PageShell
      eyebrow="Donate"
      title="Support care, hope and community impact"
      heroImageSrc="https://pasada.or.tz/uploads/appointment_bg.jpeg"
    >
      <AnimatedSection>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <p className="text-sm leading-7 text-zinc-700">
            Your donation helps PASADA provide compassionate services and
            support to people infected and affected by HIV and AIDS—especially
            the poorest and most vulnerable.
          </p>

          <div className="rounded-2xl bg-white p-6 ring-1 ring-[var(--border)]">
            <div className="text-sm font-semibold">Donation options</div>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              Replace the details below with your preferred methods (Mobile
              Money, bank accounts, partner portals). We’ll also make this page
              easy to update as PASADA’s donation methods evolve.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-[var(--border)]">
                <div className="text-sm font-semibold">Mobile Money</div>
                <div className="mt-2 text-sm text-zinc-700">
                  Provider: (TBD)
                  <br />
                  Number: (TBD)
                  <br />
                  Reference: PASADA DONATION
                </div>
              </div>
              <div className="rounded-xl bg-zinc-50 p-4 ring-1 ring-[var(--border)]">
                <div className="text-sm font-semibold">Bank Transfer</div>
                <div className="mt-2 text-sm text-zinc-700">
                  Bank: (TBD)
                  <br />
                  Account: (TBD)
                  <br />
                  SWIFT: (TBD)
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-200">
            <div className="text-sm font-semibold text-blue-950">
              Want to talk first?
            </div>
            <p className="mt-2 text-sm leading-6 text-blue-950/90">
              We can share program details, impact updates and partnership
              opportunities.
            </p>
            <div className="mt-4">
              <ButtonLink href="/contact" variant="secondary">
                Contact PASADA
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
      </AnimatedSection>
    </PageShell>
  );
}

