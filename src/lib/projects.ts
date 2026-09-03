import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";
import type { PortableTextBlock } from "@portabletext/react";

export type ProjectItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tag?: string;
  category?: string;
  categorySlug?: string;
  imageUrl: string;
  galleryUrls: string[];
  status?: "ongoing" | "completed" | "planned";
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  content?: PortableTextBlock[];
};

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const SAMPLE: ProjectItem[] = [
  {
    _id: "p1",
    title: "GBV Awareness in Schools",
    slug: "gbv-awareness-schools",
    summary:
      "In-school and out-of-school GBV awareness for adolescents in primary and secondary schools — shaping attitudes and behaviours so young people build healthier, more respectful relationships and contribute to a violence-free future.",
    imageUrl: U("1503676260728-1c00da094a0b"),
    galleryUrls: [],
    status: "ongoing",
    tag: "Education",
    category: "Education",
    categorySlug: "education",
    featured: true,
  },
  {
    _id: "p2",
    title: "16 Days of Activism Campaign",
    slug: "16-days-activism",
    summary:
      "Annual campaign aligned with the international 16 Days of Activism Against Gender-Based Violence (25 Nov – 10 Dec), featuring community dialogues, social media campaigns, and survivor solidarity events.",
    imageUrl: U("1594608661623-aa0bd3a69d98"),
    galleryUrls: [],
    status: "ongoing",
    tag: "Campaigns",
    category: "Campaigns",
    categorySlug: "campaigns",
    featured: true,
  },
  {
    _id: "p3",
    title: "Social Media GBV Campaigns",
    slug: "social-media-campaigns",
    summary:
      "Planned digital campaigns — #StopGBV, #EndGBV, #BreakTheSilence — using survivor stories, educational infographics, live expert Q&As, and influencer partnerships to raise awareness and mobilise action across Tanzania.",
    imageUrl: U("1488521787991-ed7bbaae773c"),
    galleryUrls: [],
    status: "planned",
    tag: "Digital",
    category: "Campaigns",
    categorySlug: "campaigns",
    featured: true,
  },
];

type GetProjectsOptions = {
  featuredOnly?: boolean;
  limit?: number;
  status?: string;
};

const query = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    tag,
    "category": category->title,
    "categorySlug": category->slug.current,
    "imageUrl": image.asset->url,
    "galleryUrls": gallery[].asset->url,
    status,
    startDate,
    endDate,
    featured,
    content
  }
`;

export async function getProjects(opts: GetProjectsOptions = {}): Promise<ProjectItem[]> {
  let items: ProjectItem[] = SAMPLE;

  if (sanityConfigured) {
    try {
      const rows = await sanityClient.fetch<ProjectItem[]>(query);
      if (rows?.length) items = rows.map((r) => ({ ...r, imageUrl: r.imageUrl ? urlFor(r.imageUrl).width(800).url() : media.placeholder }));
    } catch {}
  }

  if (opts.featuredOnly) items = items.filter((p) => p.featured);
  if (opts.status) items = items.filter((p) => p.status === opts.status);
  if (opts.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getProject(slug: string): Promise<ProjectItem | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export const getProjectBySlug = getProject;

export function getAllProjectSlugs(): string[] {
  return SAMPLE.map((p) => p.slug);
}

export async function getProjectCategories(): Promise<{ slug: string; title: string }[]> {
  const projects = await getProjects();
  const seen = new Set<string>();
  const cats: { slug: string; title: string }[] = [];
  for (const p of projects) {
    if (p.categorySlug && p.category && !seen.has(p.categorySlug)) {
      seen.add(p.categorySlug);
      cats.push({ slug: p.categorySlug, title: p.category });
    }
  }
  return cats;
}
