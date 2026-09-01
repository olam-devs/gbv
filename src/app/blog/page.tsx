import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { getBlogCategories, getBlogPosts } from "@/lib/blog";
import { media } from "@/lib/media";

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);

  return (
    <PageShell
      eyebrow="Stories & updates"
      title="Latest from PASADA"
      heroImageSrc={media.hero.blog}
    >
      <AnimatedSection>
        <p className="max-w-3xl text-sm leading-7 text-zinc-800">
          News, events, and community stories. Browse by category, read structured
          articles, and watch short videos when available.
        </p>
      </AnimatedSection>

      <BlogCategoryFilter posts={posts} categories={categories} />
    </PageShell>
  );
}
