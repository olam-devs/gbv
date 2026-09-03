import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PasadaImage } from "@/components/ui/PasadaImage";
import { media } from "@/lib/media";
import { Eye, Heart, Scale, Shield, Target, Users } from "lucide-react";

const values = [
  { icon: Scale, title: "Nonpartisan", desc: "We serve all survivors regardless of political, religious, or social affiliation." },
  { icon: Shield, title: "Confidentiality", desc: "Every case and disclosure is handled with strict privacy and respect." },
  { icon: Users, title: "Community-centred", desc: "Walking alongside families and communities to shift harmful norms." },
  { icon: Target, title: "Sustainability", desc: "Long-term programmes built for lasting impact in Tanzanian communities." },
  { icon: Heart, title: "Compassion", desc: "Survivor-centred support rooted in dignity, safety and healing." },
  { icon: Eye, title: "Accountability", desc: "Transparent stewardship of resources and partnerships." },
];

const team = [
  { name: "Dr. Alick Kayange, MD, M.Phil. Global Health, PhD", role: "Director / Chairperson (Founder)" },
  { name: "Dr. Faraja C. Kiwanga, MD, M. Med", role: "Program Manager / Secretary General (Co-founder)" },
  { name: "Mrs. Lucy Kunzi", role: "Accounts Officer / Treasurer" },
  { name: "Mr. Frank Christopher, Dipl. Env. Health Science", role: "Project Coordinator — Health" },
  { name: "Mr. Lusubilo Kayange, BSc. Wildlife, MSc. Marine Biology", role: "Administrative Officer" },
  { name: "Mr. Fadhili Austine, B.Sc. Education", role: "Project Coordinator — Education" },
  { name: "Mrs. Regina Maendeleo, Dipl. Env. Health Science", role: "Project Coordinator — Livelihood" },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About GI-Desk"
      title="Nonpartisan, nonreligious — united against gender-based violence"
      heroImageSrc={media.hero.about}
    >
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <AnimatedSection>
            <div className="relative h-56 overflow-hidden rounded-3xl border-2 border-[var(--primary)] bg-violet-100 sm:h-72">
              <PasadaImage
                src={media.about.community}
                alt="GI-Desk community work"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 700px, 92vw"
                priority
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <p className="text-sm leading-7 text-zinc-800">
              Gender Based and Intimate (GI-Desk) is a nonpartisan, apolitical, nonreligious,
              charitable non-profit organisation registered in August 2023 under the
              Non-Governmental Organisations Act No. 24 of 2002 (Reg. No. ooNGO/R/5824).
              We exist to support people experiencing gender-based and intimate partner violence
              across Tanzania — providing direct survivor services, community education, and
              advocacy to address the root causes of GBV.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Mission</h2>
              <p className="text-sm leading-7 text-zinc-800">
                A nonpartisan, apolitical, nonreligious, charitable non-profit to support
                people experiencing gender-based and intimate partner violence.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Vision</h2>
              <p className="text-sm leading-7 text-zinc-800">
                To deal with all forms of gender-based violence including intimate partner
                violence, harassment, exploitation and abuse, child/early/forced marriage,
                harmful gender norms, and economic exploitation — ensuring gender equality
                for people of all genders through the elimination of GBV and the increased
                visibility, voice, and opportunity of women and girls.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Our story</h2>
              <p className="text-sm leading-7 text-zinc-800">
                GI-Desk was founded in 2023 in response to rising cases of gender-based violence
                in underserved communities across Mainland Tanzania. Driven by the lived reality
                of GBV survivors — physical and sexual intimate partner violence, non-partner
                sexual violence, female genital mutilation, and early and forced marriage — our
                founders started with counselling services and community education, relying on
                donations and volunteer work. We operate from our head office in Bagamoyo
                District, Pwani Region, with a branch in Mbezi Beach, Dar es Salaam.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <aside className="space-y-8">
          <AnimatedSection delay={0.06}>
            <div className="rounded-2xl border-2 border-[var(--primary)] bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-zinc-950">Our values</h2>
              <ul className="mt-4 space-y-4">
                {values.map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex gap-3">
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-50 text-[var(--primary)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{title}</div>
                      <div className="text-xs leading-5 text-zinc-600">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </aside>
      </div>

      <AnimatedSection delay={0.15}>
        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Our team</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">
            GI-Desk is led by a multidisciplinary team of health professionals, educators, and community experts.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
              >
                <div className="text-sm font-semibold text-zinc-950">{member.name}</div>
                <div className="mt-1 text-xs text-[var(--brand-blue)]">{member.role}</div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </PageShell>
  );
}
