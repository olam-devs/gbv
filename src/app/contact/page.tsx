import { PageShell } from "@/components/site/PageShell";
import { media } from "@/lib/media";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  FormInput,
  FormLabel,
  FormSubmit,
  FormTextarea,
} from "@/components/ui/FormFields";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Reach out to PASADA"
      heroImageSrc={media.hero.contact}
    >
      <AnimatedSection>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-zinc-800">
              Whether you want to donate, volunteer, partner, or learn more about
              our services—contact us and we&apos;ll respond as soon as possible.
            </p>

            <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-black">Quick contacts</div>
              <div className="mt-3 space-y-2 text-sm text-zinc-800">
                <div>
                  Email:{" "}
                  <a
                    className="font-semibold text-black underline"
                    href="mailto:info@pasada.or.tz"
                  >
                    info@pasada.or.tz
                  </a>
                </div>
                <div>
                  Phone:{" "}
                  <a
                    className="font-semibold text-black underline"
                    href="tel:+255222866618"
                  >
                    +255 22 286 6618
                  </a>
                </div>
                <div>Location: Dar es Salaam, Tanzania</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-sm sm:p-8">
            <div className="text-lg font-semibold text-black">Send a message</div>
            <p className="mt-2 text-sm leading-6 text-zinc-800">
              Fill in the form below. Your message opens in your email client for
              now—we can connect this to a server endpoint later.
            </p>

            <form
              className="mt-6 grid gap-4"
              action="mailto:info@pasada.or.tz"
              method="post"
              encType="text/plain"
            >
              <label className="grid gap-1.5">
                <FormLabel>Name</FormLabel>
                <FormInput name="name" required placeholder="Your full name" />
              </label>

              <label className="grid gap-1.5">
                <FormLabel>Email</FormLabel>
                <FormInput
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                />
              </label>

              <label className="grid gap-1.5">
                <FormLabel>Subject</FormLabel>
                <FormInput name="subject" placeholder="How can we help?" />
              </label>

              <label className="grid gap-1.5">
                <FormLabel>Message</FormLabel>
                <FormTextarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                />
              </label>

              <FormSubmit>Send message</FormSubmit>
            </form>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
