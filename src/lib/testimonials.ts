import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

export type TestimonialItem = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  category: string;
  categorySlug: string;
  featured?: boolean;
};

const SAMPLE: TestimonialItem[] = [
  {
    _id: "t1",
    quote: "GI-Desk gave me a safe space to speak without fear. The counsellor helped me understand that what happened was not my fault. Today I am rebuilding my life with confidence.",
    name: "Survivor, Bagamoyo",
    role: "GBV Survivor",
    category: "Survivors",
    categorySlug: "survivors",
    featured: true,
  },
  {
    _id: "t2",
    quote: "After years of silence, GI-Desk was the first place that truly listened. The case manager walked with me through every step — from the hospital to the legal process.",
    name: "Survivor, Dar es Salaam",
    role: "GBV Survivor",
    category: "Survivors",
    categorySlug: "survivors",
    featured: true,
  },
  {
    _id: "t3",
    quote: "The awareness sessions in our school changed how my classmates talk about relationships. We now understand what respect means and how to recognise warning signs.",
    name: "Secondary School Student",
    role: "Programme Participant",
    category: "Community",
    categorySlug: "community",
    featured: true,
  },
  {
    _id: "t4",
    quote: "As a community leader, GI-Desk's capacity building workshops gave me the tools to respond when a neighbour discloses violence. I no longer turn away — I know what to do.",
    name: "Community Leader, Pwani",
    role: "Community Leader",
    category: "Community",
    categorySlug: "community",
    featured: true,
  },
  {
    _id: "t5",
    quote: "Volunteering with GI-Desk has been the most meaningful thing I have done. I see lives change in real time and I know every hour I give matters.",
    name: "Volunteer",
    role: "GI-Desk Volunteer",
    category: "Volunteers",
    categorySlug: "volunteers",
    featured: true,
  },
  {
    _id: "t6",
    quote: "Our partnership with GI-Desk strengthened our referral pathways enormously. Survivors who come through us now receive coordinated, holistic support instead of being passed around.",
    name: "Partner Organisation",
    role: "GBV Sub-cluster Partner",
    category: "Partners",
    categorySlug: "partners",
    featured: true,
  },
];

type GetTestimonialsOptions = {
  featuredOnly?: boolean;
  limit?: number;
  category?: string;
};

const query = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    quote,
    name,
    role,
    "category": category->title,
    "categorySlug": category->slug.current,
    featured
  }
`;

export async function getTestimonials(opts: GetTestimonialsOptions = {}): Promise<TestimonialItem[]> {
  let items: TestimonialItem[] = SAMPLE;

  if (sanityConfigured) {
    try {
      const rows = await sanityClient.fetch<TestimonialItem[]>(query);
      if (rows?.length) items = rows;
    } catch {}
  }

  if (opts.featuredOnly) items = items.filter((t) => t.featured);
  if (opts.category) items = items.filter((t) => t.categorySlug === opts.category || t.category === opts.category);
  if (opts.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getTestimonialCategories(): Promise<{ title: string; slug: string; count: number }[]> {
  const all = await getTestimonials();
  const map = new Map<string, { title: string; slug: string; count: number }>();
  for (const t of all) {
    const existing = map.get(t.categorySlug);
    if (existing) existing.count++;
    else map.set(t.categorySlug, { title: t.category, slug: t.categorySlug, count: 1 });
  }
  return Array.from(map.values());
}
