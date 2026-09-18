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
        <p className="text-sm leading-7 text-zinc-800">
          GI-Desk delivers holistic GBV response services — from direct survivor
          support and clinical care to community prevention and women&apos;s empowerment.
          Filter by category or open any service for full details.
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
