import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { getBlogCategories, getBlogPosts } from "@/lib/blog";
import { media } from "@/lib/media";

export default async function ResourcesPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  return (
    <PageShell
      eyebrow="Knowledge & updates"
      title="Resources from GI-Desk"
      heroImageSrc={media.hero.blog}
    >
      <AnimatedSection>
        <p className="text-sm leading-7 text-zinc-800">
          Articles, news, and community stories from GI-Desk. Browse by category
          to find information on GBV awareness, survivor support, and community action.
        </p>
      </AnimatedSection>

      <BlogCategoryFilter posts={posts} categories={categories} />
    </PageShell>
  );
}
