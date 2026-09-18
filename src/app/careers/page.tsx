import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { media } from "@/lib/media";
import { MapPin, Clock, Calendar } from "lucide-react";

// Careers are managed in Sanity Studio → Careers.
// Sample openings shown until real postings are added.
const SAMPLE_CAREERS = [
  {
    _id: "c1",
    title: "GBV Case Manager",
    type: "Full-time",
    department: "Programme",
    location: "Bagamoyo, Pwani",
    deadline: "2026-10-31",
    summary:
      "Provide individualised case management to GBV survivors — needs assessment, safety planning, referral coordination, and follow-up to support survivors on their journey to safety.",
    slug: "gbv-case-manager",
  },
  {
    _id: "c2",
    title: "Community Outreach Volunteer",
    type: "Volunteer",
    department: "Programme",
    location: "Dar es Salaam / Bagamoyo",
    deadline: "",
    summary:
      "Support GI-Desk's awareness campaigns, community dialogues, and school outreach activities as a volunteer advocate against gender-based violence.",
    slug: "community-outreach-volunteer",
  },
];

export default function CareersPage() {
  const careers = SAMPLE_CAREERS;

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
          <AnimatedSection delay={0.06}>
            <div className="space-y-4">
              {careers.map((c) => (
                <div
                  key={c._id}
                  className="rounded-2xl border-2 border-[var(--primary)] bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-zinc-950">{c.title}</h2>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-zinc-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          {c.location}
                        </span>
                        {c.deadline ? (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                            Deadline: {c.deadline}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-[var(--primary)] ring-1 ring-[var(--primary)]/30">
                      {c.department}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-700">{c.summary}</p>
                  <div className="mt-4">
                    <ButtonLink href="/contact" size="sm">
                      Apply / Enquire
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        ) : null}

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
