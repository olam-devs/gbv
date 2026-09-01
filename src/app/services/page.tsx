import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CategoryGrid } from "@/components/content/CategoryGrid";
import { getServiceCategories, getServices } from "@/lib/services";
import { media } from "@/lib/media";

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getServiceCategories(),
  ]);

  const items = services.map((s) => ({
    _id: s._id,
    title: s.title,
    slug: s.slug,
    summary: s.summary,
    imageUrl: s.imageUrl,
    badge: s.category,
    categorySlug: s.categorySlug,
  }));

  return (
    <PageShell
      eyebrow="Services"
      title="Comprehensive support services"
      heroImageSrc={media.hero.services}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          Holistic services for people infected and affected by HIV and AIDS—open
          each service for detailed information and photo galleries.
        </p>
      </AnimatedSection>

      <CategoryGrid
        items={items}
        categories={categories}
        basePath="/services"
        allLabel="All services"
      />
    </PageShell>
  );
}
