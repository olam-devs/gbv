import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { testimonialCategoryImage } from "@/lib/media";

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  category?: string;
  categorySlug?: string;
  avatarUrl?: string;
  sortOrder?: number;
  featured?: boolean;
};

export type TestimonialCategory = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string;
};

const SAMPLE_CATEGORIES: TestimonialCategory[] = [
  { _id: "tc1", title: "Clients", slug: "clients" },
  { _id: "tc2", title: "Caregivers", slug: "caregivers" },
  { _id: "tc3", title: "Volunteers", slug: "volunteers" },
  { _id: "tc4", title: "Partners", slug: "partners" },
];

const SAMPLE: Testimonial[] = [
  // Clients
  {
    _id: "t1",
    category: "Clients",
    categorySlug: "clients",
    quote:
      "PASADA helped my family access care with dignity and without judgement. The support gave us strength during a difficult season.",
    name: "Community Member",
    role: "Client support",
    sortOrder: 1,
    featured: true,
  },
  {
    _id: "t1b",
    category: "Clients",
    categorySlug: "clients",
    quote:
      "From the first visit I felt welcomed. Staff explained every step with patience and treated us with respect.",
    name: "Family member",
    role: "Outpatient support",
    sortOrder: 2,
    featured: true,
  },
  {
    _id: "t1c",
    category: "Clients",
    categorySlug: "clients",
    quote:
      "Medication support and counseling were coordinated in one place. That made it easier for us to stay on treatment.",
    name: "Client",
    role: "Integrated care",
    sortOrder: 3,
  },
  {
    _id: "t1d",
    category: "Clients",
    categorySlug: "clients",
    quote:
      "We were never turned away because of faith or background. PASADA serves everyone with the same compassion.",
    name: "Parent",
    role: "Family support",
    sortOrder: 4,
  },
  {
    _id: "t1e",
    category: "Clients",
    categorySlug: "clients",
    quote:
      "Home visits helped when transport was difficult. The team listened and adjusted support to our situation.",
    name: "Community member",
    role: "Home-based care",
    sortOrder: 5,
  },
  {
    _id: "t1f",
    category: "Clients",
    categorySlug: "clients",
    quote:
      "Peer support groups reminded us we are not alone. Sharing experiences gave us courage to keep going.",
    name: "Support group participant",
    role: "Peer support",
    sortOrder: 6,
  },
  // Caregivers
  {
    _id: "t2",
    category: "Caregivers",
    categorySlug: "caregivers",
    quote:
      "The counseling services gave me hope and practical guidance. I felt listened to and respected throughout the process.",
    name: "Caregiver",
    role: "Psychosocial support",
    sortOrder: 10,
    featured: true,
  },
  {
    _id: "t2b",
    category: "Caregivers",
    categorySlug: "caregivers",
    quote:
      "Training and supervision at PASADA helped me support clients with confidence and compassion every day.",
    name: "Home-based caregiver",
    role: "Care team",
    sortOrder: 11,
  },
  {
    _id: "t2c",
    category: "Caregivers",
    categorySlug: "caregivers",
    quote:
      "Clear protocols and respectful supervision help us deliver safe, dignified care in the community.",
    name: "Field caregiver",
    role: "Community care",
    sortOrder: 12,
  },
  {
    _id: "t2d",
    category: "Caregivers",
    categorySlug: "caregivers",
    quote:
      "When cases are complex, the team coordinates quickly so clients do not fall through the gaps.",
    name: "Case support worker",
    role: "Care coordination",
    sortOrder: 13,
  },
  {
    _id: "t2e",
    category: "Caregivers",
    categorySlug: "caregivers",
    quote:
      "Spiritual and emotional support is offered gently—clients choose what helps them without pressure.",
    name: "Pastoral care volunteer",
    role: "Holistic support",
    sortOrder: 14,
  },
  {
    _id: "t2f",
    category: "Caregivers",
    categorySlug: "caregivers",
    quote:
      "Regular reflection sessions help us process difficult days and return to clients with renewed empathy.",
    name: "Counselor",
    role: "Mental health",
    sortOrder: 15,
  },
  // Volunteers
  {
    _id: "t3",
    category: "Volunteers",
    categorySlug: "volunteers",
    quote:
      "PASADA’s outreach programs make health information easier to understand and act on. The community response has been encouraging.",
    name: "Volunteer",
    role: "Community sensitization",
    sortOrder: 20,
    featured: true,
  },
  {
    _id: "t3b",
    category: "Volunteers",
    categorySlug: "volunteers",
    quote:
      "Volunteering here connected me to people who care deeply about dignity and health in our neighborhoods.",
    name: "Community volunteer",
    role: "Outreach",
    sortOrder: 21,
  },
  {
    _id: "t3c",
    category: "Volunteers",
    categorySlug: "volunteers",
    quote:
      "Door-to-door awareness sessions helped families learn about prevention and where to seek help early.",
    name: "Outreach volunteer",
    role: "Health education",
    sortOrder: 22,
  },
  {
    _id: "t3d",
    category: "Volunteers",
    categorySlug: "volunteers",
    quote:
      "I help organize events and welcome visitors—small tasks that make the center feel warm and open.",
    name: "Youth volunteer",
    role: "Events & welcome",
    sortOrder: 23,
  },
  {
    _id: "t3e",
    category: "Volunteers",
    categorySlug: "volunteers",
    quote:
      "Translating information into Swahili during sessions helped more people participate and ask questions.",
    name: "Language volunteer",
    role: "Community dialogue",
    sortOrder: 24,
  },
  {
    _id: "t3f",
    category: "Volunteers",
    categorySlug: "volunteers",
    quote:
      "Weekend clinics need many hands; volunteering showed me how teamwork keeps services running smoothly.",
    name: "Clinical volunteer",
    role: "Service support",
    sortOrder: 25,
  },
  // Partners
  {
    _id: "t4",
    category: "Partners",
    categorySlug: "partners",
    quote:
      "Working with PASADA strengthened referral pathways and community trust. Their team is responsive and committed to dignity in service delivery.",
    name: "Program Partner",
    role: "Collaboration",
    sortOrder: 30,
  },
  {
    _id: "t4b",
    category: "Partners",
    categorySlug: "partners",
    quote:
      "Our joint programs reached more families because PASADA coordinates referrals and follow-up with care.",
    name: "Faith-based partner",
    role: "Referral network",
    sortOrder: 31,
  },
  {
    _id: "t4c",
    category: "Partners",
    categorySlug: "partners",
    quote:
      "Shared data and regular meetings help us align outreach and avoid duplicating efforts in the same wards.",
    name: "NGO collaborator",
    role: "Program alignment",
    sortOrder: 32,
  },
  {
    _id: "t4d",
    category: "Partners",
    categorySlug: "partners",
    quote:
      "PASADA’s documentation standards made reporting to donors transparent and focused on client outcomes.",
    name: "Funding partner",
    role: "Accountability",
    sortOrder: 33,
  },
  {
    _id: "t4e",
    category: "Partners",
    categorySlug: "partners",
    quote:
      "Hospital linkages improved when PASADA escorts clients and shares care plans with clinical teams.",
    name: "Health facility partner",
    role: "Referrals",
    sortOrder: 34,
  },
  {
    _id: "t4f",
    category: "Partners",
    categorySlug: "partners",
    quote:
      "Archdiocese parishes appreciate clear communication—PASADA keeps partners informed and involved.",
    name: "Parish partner",
    role: "Faith community",
    sortOrder: 35,
  },
];

const CATEGORY_SLUGS = new Set(SAMPLE_CATEGORIES.map((c) => c.slug));

function normalizeCategorySlug(
  slug?: string | null,
  category?: string | null,
): string | undefined {
  if (slug) {
    const s = slug.toLowerCase().trim();
    if (CATEGORY_SLUGS.has(s)) return s;
    if (s.endsWith("s") && CATEGORY_SLUGS.has(s.slice(0, -1))) return s.slice(0, -1);
  }
  if (!category) return undefined;
  const key = category.toLowerCase().trim();
  const aliases: Record<string, string> = {
    client: "clients",
    clients: "clients",
    caregiver: "caregivers",
    caregivers: "caregivers",
    volunteer: "volunteers",
    volunteers: "volunteers",
    partner: "partners",
    partners: "partners",
  };
  return aliases[key];
}

function normalizeTestimonial(t: Testimonial): Testimonial {
  const categorySlug = normalizeCategorySlug(t.categorySlug, t.category);
  return categorySlug ? { ...t, categorySlug } : t;
}

/** Sanity rows may lack categories; always keep rich sample quotes per category. */
function mergeWithSample(remote: Testimonial[]): Testimonial[] {
  const byId = new Map<string, Testimonial>();
  for (const t of remote.map(normalizeTestimonial)) {
    byId.set(t._id, t);
  }
  for (const t of SAMPLE) {
    if (!byId.has(t._id)) byId.set(t._id, t);
  }
  return filterList([...byId.values()]);
}

function mapCategory(row: {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: unknown;
}): TestimonialCategory {
  const imageUrl = row.image
    ? urlFor(row.image as Parameters<typeof urlFor>[0])
        .width(800)
        .height(600)
        .fit("crop")
        .url()
    : undefined;

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    imageUrl,
  };
}

function withCategoryImages(categories: TestimonialCategory[]) {
  return categories.map((c) => ({
    ...c,
    imageUrl: c.imageUrl ?? testimonialCategoryImage(c.slug),
  }));
}

const listQuery = groq`
  *[_type == "testimonial"] | order(sortOrder asc, name asc) {
    _id,
    quote,
    name,
    role,
    sortOrder,
    featured,
    avatar,
    "category": category->title,
    "categorySlug": category->slug.current
  }
`;

const categoriesQuery = groq`
  *[_type == "testimonialCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image
  }
`;

function filterList(list: Testimonial[], opts?: { featuredOnly?: boolean; limit?: number }) {
  let out = [...list].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  if (opts?.featuredOnly) out = out.filter((t) => t.featured);
  if (opts?.limit) out = out.slice(0, opts.limit);
  return out;
}

function mapRow(row: {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  sortOrder?: number;
  featured?: boolean;
  avatar?: unknown;
  category?: string;
  categorySlug?: string;
}): Testimonial {
  const avatarUrl = row.avatar
    ? urlFor(row.avatar as Parameters<typeof urlFor>[0])
        .width(400)
        .height(400)
        .fit("crop")
        .url()
    : undefined;

  return {
    _id: row._id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    sortOrder: row.sortOrder,
    featured: row.featured,
    category: row.category,
    categorySlug: row.categorySlug,
    avatarUrl,
  };
}

export async function getTestimonialCategories(): Promise<TestimonialCategory[]> {
  if (!sanityConfigured) return withCategoryImages(SAMPLE_CATEGORIES);
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapCategory>[0][]>(
      categoriesQuery,
    );
    return withCategoryImages(
      rows?.length ? rows.map(mapCategory) : SAMPLE_CATEGORIES,
    );
  } catch {
    return withCategoryImages(SAMPLE_CATEGORIES);
  }
}

export async function getTestimonials(opts?: { featuredOnly?: boolean; limit?: number }) {
  if (!sanityConfigured) return filterList(SAMPLE, opts);
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapRow>[0][]>(listQuery);
    const merged = rows?.length ? mergeWithSample(rows.map(mapRow)) : SAMPLE;
    return filterList(merged, opts);
  } catch {
    return filterList(SAMPLE, opts);
  }
}

