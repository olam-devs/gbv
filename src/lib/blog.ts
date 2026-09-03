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

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const SAMPLE: BlogPost[] = [
  {
    _id: "b1",
    title: "Understanding the 16 Days of Activism Against GBV",
    slug: "understanding-16-days-of-activism",
    excerpt:
      "Every year from 25 November to 10 December the world unites against gender-based violence. Here is how GI-Desk marks the campaign and what communities can do to get involved.",
    category: "Awareness",
    categorySlug: "awareness",
    imageUrl: U("1594608661623-aa0bd3a69d98"),
    publishedAt: "2025-11-25",
    featured: true,
  },
  {
    _id: "b2",
    title: "5 Warning Signs of Intimate Partner Violence",
    slug: "5-warning-signs-ipv",
    excerpt:
      "Intimate partner violence often begins subtly. Recognising the early warning signs can help survivors and their support networks act before the situation escalates.",
    category: "Education",
    categorySlug: "education",
    imageUrl: U("1488521787991-ed7bbaae773c"),
    publishedAt: "2025-10-10",
    featured: true,
  },
  {
    _id: "b3",
    title: "GI-Desk Launches School Awareness Programme in Bagamoyo",
    slug: "school-awareness-programme-bagamoyo",
    excerpt:
      "GI-Desk has begun a structured GBV awareness programme in primary and secondary schools in Bagamoyo District, reaching over 300 students in the pilot phase.",
    category: "Events",
    categorySlug: "events",
    imageUrl: U("1503676260728-1c00da094a0b"),
    publishedAt: "2025-09-01",
    featured: true,
  },
];

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
      if (rows?.length) items = rows.map((r) => ({ ...r, imageUrl: r.imageUrl ? urlFor(r.imageUrl).width(800).url() : media.placeholder }));
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

export async function getBlogCategories(): Promise<{ title: string; slug: string; count: number }[]> {
  const all = await getBlogPosts();
  const map = new Map<string, { title: string; slug: string; count: number }>();
  for (const p of all) {
    const existing = map.get(p.categorySlug);
    if (existing) existing.count++;
    else map.set(p.categorySlug, { title: p.category, slug: p.categorySlug, count: 1 });
  }
  return Array.from(map.values());
}
