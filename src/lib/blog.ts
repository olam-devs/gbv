import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";
import type { PortableTextBlock } from "@portabletext/react";

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  imageUrl: string;
  publishedAt?: string;
  featured?: boolean;
  content?: PortableTextBlock[];
};

// Resources are managed entirely in Sanity Studio → Resources (post type).
// No sample posts — admin adds real content via Studio.
const SAMPLE: BlogPost[] = [];

type GetBlogPostsOptions = {
  featuredOnly?: boolean;
  limit?: number;
  category?: string;
};

const query = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "category": category->title,
    "categorySlug": category->slug.current,
    "imageUrl": mainImage.asset->url,
    publishedAt,
    featured,
    content
  }
`;

export async function getBlogPosts(opts: GetBlogPostsOptions = {}): Promise<BlogPost[]> {
  let items: BlogPost[] = SAMPLE;

  if (sanityConfigured) {
    try {
      const rows = await sanityClient.fetch<BlogPost[]>(query);
      if (rows?.length) items = rows.map((r, idx) => ({ ...r, imageUrl: r.imageUrl ? urlFor(r.imageUrl).width(800).url() : (SAMPLE.find((b) => b.slug === r.slug)?.imageUrl ?? [U("1602306115889-fe8d26d2439a"), U("1607868894064-2b6e7ed1b324"), U("1779357807569-18d3df9df645")][idx % 3]) }));
    } catch {}
  }

  if (opts.featuredOnly) items = items.filter((p) => p.featured);
  if (opts.category) items = items.filter((p) => p.categorySlug === opts.category || p.category === opts.category);
  if (opts.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export const getBlogPostBySlug = getBlogPost;

export function getAllBlogSlugs(): string[] {
  return SAMPLE.map((p) => p.slug);
}

export type BlogCategory = { title: string; slug: string; count: number };

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const all = await getBlogPosts();
  const map = new Map<string, { title: string; slug: string; count: number }>();
  for (const p of all) {
    const existing = map.get(p.categorySlug);
    if (existing) existing.count++;
    else map.set(p.categorySlug, { title: p.category, slug: p.categorySlug, count: 1 });
  }
  return Array.from(map.values());
}
