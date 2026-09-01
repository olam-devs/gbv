import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLink } from "@/components/ui/Button";
import { getAllJobSlugs, getJobBySlug, getJobs } from "@/lib/jobs";
import { getSiteSettings } from "@/lib/settings";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const jobs = await getJobs();
  const slugs = new Set([...getAllJobSlugs(), ...jobs.map((j) => j.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [job, settings] = await Promise.all([getJobBySlug(slug), getSiteSettings()]);
  if (!job) notFound();

  const applyHref = `mailto:${job.applyEmail ?? settings.careersEmail}?subject=Application: ${encodeURIComponent(job.title)}`;

  return (
    <PageShell eyebrow="Careers" title={job.title}>
      <AnimatedSection>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-blue)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All job openings
        </Link>

        <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-zinc-800">
          <span className="rounded-full border-2 border-black px-3 py-1">
            {job.department}
          </span>
          <span className="rounded-full border-2 border-black px-3 py-1">
            {job.location}
          </span>
          <span className="rounded-full border-2 border-[var(--primary)] px-3 py-1 text-[var(--primary)]">
            {job.employmentType}
          </span>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-800">
          {job.summary}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border-2 border-black bg-white p-6">
            <h2 className="text-base font-semibold text-black">
              Responsibilities
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-800">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl border-2 border-black bg-white p-6">
            <h2 className="text-base font-semibold text-black">Requirements</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-800">
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 rounded-2xl border-2 border-[var(--primary)] bg-red-50 p-6">
          <p className="text-sm text-zinc-800">
            Ready to apply? Send your CV and cover letter referencing this role.
          </p>
          <div className="mt-4">
            <ButtonLink href={applyHref}>Apply via email</ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
