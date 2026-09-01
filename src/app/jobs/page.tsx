import Link from "next/link";
import { PageShell } from "@/components/site/PageShell";
import { media } from "@/lib/media";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { getJobs } from "@/lib/jobs";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <PageShell
      eyebrow="Careers"
      title="Join the PASADA team"
      heroImageSrc={media.hero.careers}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          Explore open roles at PASADA. Open each listing for role details and
          application guidance.
        </p>
      </AnimatedSection>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {jobs.map((job) => (
          <article
            key={job._id}
            className="group rounded-2xl border-2 border-[var(--primary)] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-black group-hover:text-[var(--primary)]">
                <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
              </h2>
              <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[var(--primary)] ring-1 ring-[var(--primary)]">
                {job.employmentType}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-800">{job.summary}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-zinc-700">
              <span className="inline-flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                {job.department}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {job.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Posted {job.postedAt}
              </span>
            </div>
            <div className="mt-5">
              <ButtonLink href={`/jobs/${job.slug}`} variant="secondary">
                View role details
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
