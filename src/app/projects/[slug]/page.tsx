import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DetailLayout } from "@/components/content/DetailLayout";
import { ButtonLink } from "@/components/ui/Button";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
import { cn } from "@/lib/cn";

export async function generateStaticParams() {
  const projects = await getProjects();
  const slugs = new Set([...getAllProjectSlugs(), ...projects.map((p) => p.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageShell eyebrow="Projects" title={project.title} heroImageSrc={project.imageUrl}>
      <AnimatedSection>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-xs font-semibold ring-1",
              project.status === "Ongoing"
                ? "bg-emerald-50 text-emerald-700 ring-emerald-300"
                : "bg-zinc-100 text-zinc-600 ring-zinc-300",
            )}
          >
            {project.status}
          </span>
          {project.partner ? (
            <span className="text-sm text-zinc-700">Partner: {project.partner}</span>
          ) : null}
          {project.duration ? (
            <span className="text-sm text-zinc-700">Duration: {project.duration}</span>
          ) : null}
        </div>

        <DetailLayout
          backHref="/projects"
          backLabel="All projects"
          title={project.title}
          summary={project.summary}
          badge={project.tag ?? project.category}
          imageUrl={project.imageUrl}
          galleryUrls={project.galleryUrls}
          videoUrl={project.videoUrl}
          content={project.content}
        >
          <p>
            This project reflects PASADA&apos;s commitment to compassionate,
            community-centered health programming across Dar es Salaam and partner
            regions.
          </p>
          <p>
            We work with communities and partners to strengthen prevention,
            improve referral pathways, and support clients and caregivers with
            dignity and respect.
          </p>
        </DetailLayout>

        <div className="mt-12 rounded-2xl border-2 border-[var(--primary)] bg-red-50 p-6">
          <p className="text-sm text-zinc-800">Interested in partnering on this program?</p>
          <div className="mt-4">
            <ButtonLink href="/contact">Contact PASADA</ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
