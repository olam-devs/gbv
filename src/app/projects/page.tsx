import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectStatusTabs } from "@/components/content/ProjectStatusTabs";
import { getProjectCategories, getProjects } from "@/lib/projects";
import { media } from "@/lib/media";

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories(),
  ]);

  const items = projects.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    imageUrl: p.imageUrl,
    badge: p.status,
    categorySlug: p.categorySlug,
    status: p.status,
  }));

  return (
    <PageShell
      eyebrow="Projects"
      title="Our projects"
      heroImageSrc={media.hero.projects}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          PASADA works with partners on community-based initiatives that strengthen
          prevention, care and resilience. Filter by status or category, and open
          any project for full details.
        </p>
      </AnimatedSection>

      <ProjectStatusTabs items={items} categories={categories} basePath="/projects" />
    </PageShell>
  );
}
