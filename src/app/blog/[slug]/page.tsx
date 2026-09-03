import { notFound } from "next/navigation";
import { PageShell } from "@/components/site/PageShell";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DetailLayout } from "@/components/content/DetailLayout";
import { ButtonLink } from "@/components/ui/Button";
import { getAllBlogSlugs, getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { Calendar } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const slugs = new Set([...getAllBlogSlugs(), ...posts.map((p) => p.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageShell
      eyebrow={post.category ?? "Blog"}
      title={post.title}
      heroImageSrc={post.imageUrl}
    >
      <AnimatedSection>
        <div className="mb-2 flex items-center gap-2 text-sm text-zinc-700">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          {post.publishedAt}
        </div>

        <DetailLayout
          backHref="/blog"
          backLabel="All stories"
          title={post.title}
          summary={post.excerpt}
          badge={post.category}
          imageUrl={post.imageUrl}
          galleryUrls={post.galleryUrls}
          videoUrl={post.videoUrl}
          content={post.content}
        >
          <p>
            GI-Desk works to end gender-based and intimate partner violence in Tanzania
            through direct survivor support, community prevention, and advocacy.
          </p>
          <p>
            Our programmes combine case management, counselling, community education,
            and women&apos;s empowerment — working with partners to build a violence-free future.
          </p>
        </DetailLayout>

        <div className="mt-12 rounded-2xl border-2 border-[var(--primary)] bg-violet-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-black">Support GI-Desk&apos;s mission</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-800">
            Your partnership helps us deliver care, education, and community programs.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/donate">Donate</ButtonLink>
            <ButtonLink href="/get-involved" variant="secondary">
              Get involved
            </ButtonLink>
          </div>
        </div>
      </AnimatedSection>
    </PageShell>
  );
}
