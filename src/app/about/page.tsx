import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { media } from "@/lib/media";
import { Eye, Heart, Scale, Sparkles, Target, Users } from "lucide-react";

const values = [
  { icon: Scale, title: "Justice", desc: "Fair access to care for the poorest and neediest." },
  { icon: Users, title: "Solidarity", desc: "Walking together with families and communities." },
  { icon: Target, title: "Sustainability", desc: "Programs built for long-term community resilience." },
  { icon: Sparkles, title: "Efficiency", desc: "Responsible stewardship of resources and partnerships." },
  { icon: Heart, title: "Compassion", desc: "Client-centered support rooted in dignity." },
  { icon: Eye, title: "Respect", desc: "Confidential, non-judgmental service for all." },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About PASADA"
      title="A faith-based organization serving all with dignity"
      heroImageSrc={media.hero.about}
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <AnimatedSection>
            <div className="relative h-56 overflow-hidden rounded-3xl border-2 border-[var(--primary)] bg-zinc-100 sm:h-72">
              <PasadaImage
                src={media.about.community}
                alt="PASADA community work"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 700px, 92vw"
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <p className="text-sm leading-7 text-zinc-800">
              Pastoral Activities and Services for people with AIDS Dar es Salaam
              Archdiocese (PASADA (T)) is a faith-based Organization operating
              under the Roman Catholic Archdiocese of Dar es Salaam. PASADA was
              formed in <strong>August 1992</strong> when a small group of people with HIV
              gathered to seek mutual aid and support.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-800">
              Although sponsored by the Roman Catholic Church, the services
              offered by PASADA are available to{" "}
              <strong>all individuals without discrimination</strong> and are provided{" "}
              <strong>free of charge</strong>.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-[var(--primary)] bg-gradient-to-br from-red-50 to-white p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)] text-white">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-black">Mission</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-800">
                  Responding to the call of faith, PASADA (T) strives to provide
                  and maintain quality, caring and compassionate services and
                  support to people infected and affected by HIV and AIDS in
                  Tanzania—with particular attention to the poorest and the
                  neediest—through a holistic approach with the light of the
                  Gospel, emphasizing justice, solidarity, sustainability and
                  efficiency.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-black bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-blue)] text-white">
                  <Eye className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-black">Vision</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-800 italic">
                  &ldquo;A society in which all people can live life to their full
                  potential with dignity and respect.&rdquo;
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <h2 className="text-lg font-semibold text-black">Core values</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-3 rounded-xl border-2 border-black/10 bg-white p-4 transition hover:border-[var(--primary)] hover:shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-red-50 text-[var(--primary)] ring-1 ring-[var(--primary)]">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-black">{v.title}</div>
                    <p className="mt-1 text-xs leading-5 text-zinc-700">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border-2 border-black bg-zinc-50 p-6">
              <div className="text-sm font-semibold text-black">What we focus on</div>
              <ul className="mt-3 grid gap-2 text-sm text-zinc-800 sm:grid-cols-2">
                <li>HIV testing and counseling</li>
                <li>Home-based and palliative care</li>
                <li>Comprehensive HIV care and treatment support</li>
                <li>PMTCT screening</li>
                <li>Cervical cancer screening</li>
                <li>NCD screening</li>
                <li>Support to OVC and caregivers</li>
                <li>Psychosocial support and counseling</li>
                <li>Community sensitization and education</li>
                <li>Capacity development</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <aside className="space-y-4">
          <AnimatedSection>
            <div className="relative h-48 overflow-hidden rounded-2xl border-2 border-[var(--primary)]">
              <PasadaImage
                src={media.about.care}
                alt="PASADA care services"
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="rounded-2xl border-2 border-[var(--primary)] bg-red-50 p-6">
              <div className="text-sm font-semibold text-black">Get inspired—take action</div>
              <p className="mt-2 text-sm leading-6 text-zinc-800">
                Donors, volunteers and partners help us strengthen community
                wellbeing and bring hope to families.
              </p>
              <div className="mt-4 text-sm font-semibold text-[var(--primary)] underline">
                <a href="/get-involved">Get involved</a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border-2 border-black bg-white p-6">
              <div className="text-sm font-semibold text-black">Contact</div>
              <div className="mt-3 space-y-2 text-sm text-zinc-800">
                <div>
                  Email:{" "}
                  <a className="font-semibold text-black underline" href="mailto:info@pasada.or.tz">
                    info@pasada.or.tz
                  </a>
                </div>
                <div>
                  Phone:{" "}
                  <a className="font-semibold text-black underline" href="tel:+255222866618">
                    +255 22 286 6618
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </aside>
      </div>
    </PageShell>
  );
}
