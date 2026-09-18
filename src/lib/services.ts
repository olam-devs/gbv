import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";
import type { PortableTextBlock } from "@portabletext/react";

export type ServiceItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category?: string;
  categorySlug?: string;
  imageUrl: string;
  galleryUrls: string[];
  content?: PortableTextBlock[];
  featured?: boolean;
  sortOrder?: number;
};

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const SAMPLE: ServiceItem[] = [
  {
    _id: "s1",
    title: "GBV Case Management",
    slug: "gbv-case-management",
    summary:
      "Individualised case management for GBV survivors — needs assessment, safety planning, referral coordination, and ongoing follow-up until the survivor reaches safety and stability.",
    imageUrl: U("1607868894064-2b6e7ed1b324"),
    galleryUrls: [],
    sortOrder: 1,
    featured: true,
    category: "Direct Support",
    categorySlug: "direct-support",
  },
  {
    _id: "s2",
    title: "Psychosocial Support",
    slug: "psychosocial-support",
    summary:
      "Individual and group psychosocial support through women and girl-friendly spaces, helping survivors process trauma and rebuild their wellbeing in a safe, non-judgmental environment.",
    imageUrl: U("1612365245810-0d73ad771b2d"),
    galleryUrls: [],
    sortOrder: 2,
    featured: true,
    category: "Direct Support",
    categorySlug: "direct-support",
  },
  {
    _id: "s3",
    title: "Clinical Management of Rape (CMR)",
    slug: "clinical-management-of-rape",
    summary:
      "Provision and strengthening of clinical management of rape services, including medical care, forensic documentation, and linkage to post-exposure prophylaxis and emergency contraception.",
    imageUrl: U("1696483150935-2f719f1dfa6a"),
    galleryUrls: [],
    sortOrder: 3,
    featured: true,
    category: "Health Services",
    categorySlug: "health-services",
  },
  {
    _id: "s4",
    title: "Community Mobilisation & Capacity Building",
    slug: "community-mobilisation",
    summary:
      "Building the capacity of community structures — community leaders, women's and men's groups — and GBV partner organisations to prevent and effectively respond to violence.",
    imageUrl: U("1779357807569-18d3df9df645"),
    galleryUrls: [],
    sortOrder: 4,
    featured: true,
    category: "Prevention",
    categorySlug: "prevention",
  },
  {
    _id: "s5",
    title: "Referral Pathway Strengthening",
    slug: "referral-pathways",
    summary:
      "Coordinating workshops and partnerships to map and strengthen referral pathways across the GBV sub-cluster, ensuring survivors reach the right services without falling through the gaps.",
    imageUrl: U("1509099863731-ef4bff19e808"),
    galleryUrls: [],
    sortOrder: 5,
    featured: true,
    category: "Coordination",
    categorySlug: "coordination",
  },
  {
    _id: "s6",
    title: "Women's Leadership & Confidence Building",
    slug: "womens-leadership",
    summary:
      "Training and mentorship programmes that equip women and girls with leadership skills, confidence, and the tools to advocate for their own rights and safety.",
    imageUrl: U("1544476613-98c049cad9d7"),
    galleryUrls: [],
    sortOrder: 6,
    featured: true,
    category: "Empowerment",
    categorySlug: "empowerment",
  },
  {
    _id: "s7",
    title: "GBV Awareness & Campaigns",
    slug: "awareness-campaigns",
    summary:
      "Community awareness campaigns on GBV consequences, available services, and risks — including school-based education and community dialogues to shift harmful social norms.",
    imageUrl: U("1602306115889-fe8d26d2439a"),
    galleryUrls: [],
    sortOrder: 7,
    featured: false,
    category: "Prevention",
    categorySlug: "prevention",
  },
  {
    _id: "s8",
    title: "GBV Prevention Dialogues",
    slug: "prevention-dialogues",
    summary:
      "Facilitated community dialogues addressing the root causes and harmful social norms that drive gender-based violence and intimate partner violence.",
    imageUrl: U("1553775927-a071d5a6a39a"),
    galleryUrls: [],
    sortOrder: 8,
    featured: false,
    category: "Prevention",
    categorySlug: "prevention",
  },
  {
    _id: "s9",
    title: "Addressing Root Causes of GBV & IPV",
    slug: "root-causes-gbv",
    summary:
      "Working to address all root causes that motivate gender-based violence (GBV) and intimate partner violence (IPV) — and providing sustained support to survivors on their journey to safety and healing.",
    imageUrl: U("1774870292182-d59afbebf09e"),
    galleryUrls: [],
    sortOrder: 9,
    featured: false,
    category: "Prevention",
    categorySlug: "prevention",
  },
  {
    _id: "s10",
    title: "Gender Equality & Women's Empowerment",
    slug: "gender-equality",
    summary:
      "Ensuring gender equality for people of all genders through the elimination of GBV, and increasing the visibility, voice, and opportunities of women and girls in leadership and education.",
    imageUrl: U("1528654787581-6cad22f4da3c"),
    galleryUrls: [],
    sortOrder: 10,
    featured: false,
    category: "Empowerment",
    categorySlug: "empowerment",
  },
];

type GetServicesOptions = {
  featuredOnly?: boolean;
  limit?: number;
  category?: string;
};

const query = groq`
  *[_type == "service" ${""} ] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    "category": category->title,
    "categorySlug": category->slug.current,
    "imageUrl": image.asset->url,
    "galleryUrls": gallery[].asset->url,
    featured,
    sortOrder,
    content
  }
`;

export async function getServices(opts: GetServicesOptions = {}): Promise<ServiceItem[]> {
  let items: ServiceItem[] = SAMPLE;

  if (sanityConfigured) {
    try {
      const rows = await sanityClient.fetch<ServiceItem[]>(query);
      if (rows?.length) items = rows.map((r, idx) => ({ ...r, imageUrl: r.imageUrl ? urlFor(r.imageUrl).width(800).url() : (SAMPLE.find((s) => s.slug === r.slug)?.imageUrl ?? media.serviceFallbacks[idx % media.serviceFallbacks.length]) }));
    } catch {}
  }

  if (opts.featuredOnly) items = items.filter((s) => s.featured);
  if (opts.category) items = items.filter((s) => s.categorySlug === opts.category || s.category === opts.category);
  if (opts.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getService(slug: string): Promise<ServiceItem | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export const getServiceBySlug = getService;

export function getAllServiceSlugs(): string[] {
  return SAMPLE.map((s) => s.slug);
}

export async function getServiceCategories(): Promise<{ title: string; slug: string; count: number }[]> {
  const all = await getServices();
  const map = new Map<string, { title: string; slug: string; count: number }>();
  for (const s of all) {
    if (!s.category || !s.categorySlug) continue;
    const existing = map.get(s.categorySlug);
    if (existing) existing.count++;
    else map.set(s.categorySlug, { title: s.category, slug: s.categorySlug, count: 1 });
  }
  return Array.from(map.values());
}
