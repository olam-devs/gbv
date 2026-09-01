import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  categorySlug?: string;
  imageUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  featured?: boolean;
  sortOrder?: number;
};

export type BlogPostDetail = BlogPost & {
  content?: PortableTextBlock[];
};

const SAMPLE_POSTS: BlogPostDetail[] = [
  {
    _id: "sample-1",
    title: "PASADA Women's Day Celebration 2023",
    slug: "womens-day-2023",
    excerpt:
      "Celebrating achievements and advancing dignity, health and opportunity for women and girls—through community outreach and supportive services.",
    publishedAt: "2023-03-08",
    category: "Events",
    categorySlug: "events",
    imageUrl: "https://pasada.or.tz/uploads/service-5.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-5.jpg"],
    sortOrder: 1,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Celebrating women and community strength" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "International Women’s Day is an opportunity to celebrate achievements while reaffirming our commitment to dignity and health for women and girls. PASADA activities focus on practical support, community education and respectful care.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Highlights" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Health education and stigma reduction conversations" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Client-centered referrals and follow-up support" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Women’s health awareness and early screening information" }],
        markDefs: [],
      },
    ],
  },
  {
    _id: "sample-2",
    title: "PASADA AIDS Day 2022",
    slug: "aids-day-2022",
    excerpt:
      "Solidarity, education and advocacy toward a world free from stigma and discrimination—strengthening community understanding and support.",
    publishedAt: "2022-12-01",
    category: "Awareness",
    categorySlug: "awareness",
    imageUrl: "https://pasada.or.tz/uploads/service-1.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-1.jpg"],
    sortOrder: 2,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Why AIDS Day matters" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "World AIDS Day is a moment to unite, remember, and act. PASADA uses this day to strengthen awareness, encourage testing, and support those living with or affected by HIV.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Focus areas" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our messaging emphasizes dignity, confidentiality, and practical steps that families can take—while addressing stigma and misinformation.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "HIV testing and counseling awareness" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Linkage to care and treatment support" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Psychosocial support for clients and caregivers" }],
        markDefs: [],
      },
    ],
  },
  {
    _id: "sample-3",
    title: "Tanzania Health Summit 2023",
    slug: "health-summit-2023",
    excerpt:
      "A milestone gathering that strengthened collaboration, practical solutions, and community-centered approaches to public health.",
    publishedAt: "2023-07-01",
    category: "Partnerships",
    categorySlug: "partnerships",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-10.jpg"],
    sortOrder: 3,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Collaboration for better outcomes" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The summit brought together partners working across prevention, care, and community programming. PASADA’s work centers on dignity—supporting clients, caregivers and communities with services that are compassionate and accessible.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "sample-4",
    title: "Community outreach in Dar es Salaam",
    slug: "community-outreach-2024",
    excerpt:
      "Field teams sharing health education, testing awareness, and compassionate follow-up support—building trust one household at a time.",
    publishedAt: "2024-02-14",
    category: "Community",
    categorySlug: "community",
    imageUrl: "https://pasada.or.tz/uploads/service-9.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-9.jpg"],
    sortOrder: 4,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Outreach that builds trust" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Community outreach helps families access accurate information and timely referrals. PASADA teams support stigma reduction, encourage health-seeking behavior, and follow up with clients and caregivers who need additional support.",
          },
        ],
        markDefs: [],
      },
    ],
  },
];

const postsQuery = groq`
  *[_type == "post"] | order(sortOrder asc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    sortOrder,
    featured,
    "category": category->title,
    "categorySlug": category->slug.current,
    mainImage,
    gallery,
    "videoUrl": video.asset->url
  }
`;

const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "category": category->title,
    "categorySlug": category->slug.current,
    mainImage,
    gallery,
    content,
    "videoUrl": video.asset->url
  }
`;

const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`;

export type BlogCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

const SAMPLE_CATEGORIES: BlogCategory[] = [
  { _id: "c1", title: "Events", slug: "events" },
  { _id: "c2", title: "Awareness", slug: "awareness" },
  { _id: "c3", title: "Partnerships", slug: "partnerships" },
  { _id: "c4", title: "Community", slug: "community" },
];

function mapPost(
  row: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt?: string;
    category?: string;
    categorySlug?: string;
    mainImage?: unknown;
    gallery?: unknown[];
    videoUrl?: string;
    content?: PortableTextBlock[];
    featured?: boolean;
    sortOrder?: number;
  },
  fallbackImg?: string,
): BlogPostDetail {
  const imageUrl = row.mainImage
    ? urlFor(row.mainImage as Parameters<typeof urlFor>[0])
        .width(1200)
        .height(800)
        .fit("crop")
        .url()
    : fallbackImg ?? media.hero.blog;

  const galleryUrls =
    row.gallery?.map((img) =>
      urlFor(img as Parameters<typeof urlFor>[0]).width(1000).url(),
    ) ?? [];
  if (!galleryUrls.length) galleryUrls.push(imageUrl);

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? "",
    publishedAt: row.publishedAt?.slice(0, 10) ?? "",
    category: row.category,
    categorySlug: row.categorySlug,
    imageUrl,
    galleryUrls,
    videoUrl: row.videoUrl,
    content: row.content,
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

function filterPosts(list: BlogPostDetail[], opts?: { featuredOnly?: boolean; limit?: number }) {
  let out = [...list].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  if (opts?.featuredOnly) out = out.filter((p) => p.featured);
  if (opts?.limit) out = out.slice(0, opts.limit);
  return out;
}

export async function getBlogPosts(opts?: { featuredOnly?: boolean; limit?: number }) {
  if (!sanityConfigured) return filterPosts(SAMPLE_POSTS, opts);
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapPost>[0][]>(postsQuery);
    if (!rows?.length) return filterPosts(SAMPLE_POSTS, opts);
    const list = rows.map((r, i) => mapPost(r, SAMPLE_POSTS[i % SAMPLE_POSTS.length]?.imageUrl));
    return filterPosts(list, opts);
  } catch {
    return filterPosts(SAMPLE_POSTS, opts);
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  const sample = SAMPLE_POSTS.find((p) => p.slug === slug);
  if (!sanityConfigured) return sample ?? null;
  try {
    const row = await sanityClient.fetch<Parameters<typeof mapPost>[0] | null>(
      postBySlugQuery,
      { slug },
    );
    if (row) return mapPost(row);
    return sample ?? null;
  } catch {
    return sample ?? null;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  if (!sanityConfigured) return SAMPLE_CATEGORIES;
  try {
    const rows = await sanityClient.fetch<BlogCategory[]>(categoriesQuery);
    return rows?.length ? rows : SAMPLE_CATEGORIES;
  } catch {
    return SAMPLE_CATEGORIES;
  }
}

export function getAllBlogSlugs(): string[] {
  return SAMPLE_POSTS.map((p) => p.slug);
}
