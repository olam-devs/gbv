import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { media } from "@/lib/media";
import { MapPin, Clock, Calendar } from "lucide-react";

type CareerItem = {
  _id: string;
  title: string;
  slug: string;
  department?: string;
  location?: string;
  type: string;
  deadline?: string;
  summary: string;
};

const query = groq`
  *[_type == "career"] | order(deadline asc) {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    type,
    deadline,
    summary
  }
`;

async function getCareers(): Promise<CareerItem[]> {
  if (!sanityConfigured) return [];
  try {
    return await sanityClient.fetch<CareerItem[]>(query);
  } catch {
    return [];
  }
}

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <PageShell
      eyebrow="Careers & Volunteering"
      title="Join us in the fight against gender-based violence"
      heroImageSrc={media.hero.careers}
    >
      <div className="space-y-6">
        <AnimatedSection>
          <p className="text-sm leading-7 text-zinc-800">
            GI-Desk is always looking for passionate individuals — health workers, educators,
            counsellors, and community advocates — to join our team. We offer paid roles,
            volunteer positions, and internships across our Bagamoyo and Dar es Salaam offices.
          </p>
        </AnimatedSection>

        {careers.length > 0 ? (
          <div className="space-y-4">
            {careers.map((c, i) => (
              <AnimatedSection key={c._id} staggerIndex={i} delay={0.06}>
                <div className="rounded-2xl border-2 border-[var(--primary)] bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-zinc-950">{c.title}</h2>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.type}
                        </span>
                        {c.location ? (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {c.location}
                          </span>
                        ) : null}
                        {c.deadline ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                            Deadline: {c.deadline}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {c.department ? (
                      <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-[var(--primary)] ring-1 ring-[var(--primary)]/30">
                        {c.department}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">{c.summary}</p>
                  <div className="mt-4">
                    <ButtonLink href="/contact" size="sm">
                      Apply / Enquire
                    </ButtonLink>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection delay={0.06}>
            <div className="rounded-2xl border border-dashed border-[var(--primary)]/40 bg-violet-50/50 p-8 text-center">
              <p className="text-sm font-medium text-zinc-700">No open positions at the moment.</p>
              <p className="mt-1 text-sm text-zinc-500">
                Check back soon — or send a speculative application below.
              </p>
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl bg-violet-50 p-6 ring-1 ring-violet-200">
            <h2 className="text-sm font-semibold text-zinc-950">
              Don&apos;t see a suitable role?
            </h2>
            <p className="mt-1 text-sm leading-6 text-zinc-700">
              We welcome unsolicited applications. Send your CV and a short cover letter
              to{" "}
              <a
                href="mailto:genderdeskhelp@gmail.com"
                className="font-semibold text-[var(--primary)] underline"
              >
                genderdeskhelp@gmail.com
              </a>{" "}
              telling us how you can contribute to ending GBV in Tanzania.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </PageShell>
  );
}
