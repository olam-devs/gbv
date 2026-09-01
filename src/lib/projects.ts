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
  status: "Ongoing" | "Completed";
  partner?: string;
  duration?: string;
  imageUrl: string;
  galleryUrls: string[];
  videoUrl?: string;
  content?: PortableTextBlock[];
  featured?: boolean;
  sortOrder?: number;
};

function textBlock(text: string, style: "normal" | "h2" | "h3" = "normal") {
  return {
    _type: "block" as const,
    style,
    children: [{ _type: "span" as const, text, marks: [] }],
    markDefs: [],
  };
}

const SAMPLE: ProjectItem[] = [
  {
    _id: "p1",
    title: "Afya Thabiti Project (AMREF)",
    slug: "afya-thabiti-amref",
    summary:
      "A five-year project (Oct 2023-Sep 2028) supporting the Government of Tanzania to deliver comprehensive HIV and TB prevention, care and treatment services across 19 health facilities in Dar es Salaam.",
    tag: "HIV & TB",
    category: "Health",
    categorySlug: "health",
    status: "Ongoing",
    partner: "Amref Health Africa Tanzania",
    duration: "October 2023 - September 2028",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-8.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-8.jpg"],
    sortOrder: 1,
    featured: true,
    content: [
      textBlock("Project overview", "h2"),
      textBlock(
        "The Afya Thabiti Project is implemented by Amref Health Africa Tanzania as the prime partner, in collaboration with PASADA, with the partnership commencing in January 2026 and continuing to date. The project supports the Government of Tanzania in delivering comprehensive HIV and TB prevention, care, and treatment services.",
      ),
      textBlock(
        "It is implemented in Dar es Salaam across 19 health facilities under the Dar es Salaam Archdiocese, in all five councils of the region, in collaboration with the Ministry of Health, the President's Office - Regional Administration and Local Government (PO-RALG), and the respective Regional and Council Health Management Teams (R/CHMTs).",
      ),
      textBlock(
        "Through its interventions, the project contributes to Tanzania's commitment to ending AIDS as a public health threat by 2030, in line with the UNAIDS 95-95-95 targets.",
      ),
    ],
  },
  {
    _id: "p2",
    title: "Afya Hatua Project (THPS)",
    slug: "afya-hatua-thps",
    summary:
      "A five-year initiative (2021-2026) supporting comprehensive HIV and TB prevention, care and treatment services across 6 health facilities in Pwani region.",
    tag: "HIV & TB",
    category: "Health",
    categorySlug: "health",
    status: "Ongoing",
    partner: "Tanzania Health Promotion Support (THPS)",
    duration: "2021-2026 (PASADA partnership from October 2023)",
    imageUrl: "https://pasada.or.tz/uploads/service-3.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-3.jpg"],
    sortOrder: 2,
    featured: true,
    content: [
      textBlock("Project overview", "h2"),
      textBlock(
        "The Afya Hatua Project is implemented through a collaboration between THPS as the prime partner and PASADA, with the partnership commencing in October 2023 and continuing to date. The project is implemented in Pwani region across 6 health facilities under the Dar es Salaam Archdiocese, in collaboration with the Ministry of Health, PO-RALG, and the respective R/CHMTs.",
      ),
      textBlock("Targets", "h3"),
      textBlock(
        "The implementation aims to ensure that 95% of people living with HIV know their status, 95% of those diagnosed receive sustained antiretroviral therapy (ART), and 95% of individuals on treatment achieve viral suppression.",
      ),
    ],
  },
  {
    _id: "p3",
    title: "GLRA - Integrated TB Approach",
    slug: "glra-integrated-tb",
    summary:
      "Integrating TB screening and care with diabetes, Covid-19, malnutrition and leprosy services to improve community health outcomes.",
    tag: "TB",
    category: "Health",
    categorySlug: "health",
    status: "Ongoing",
    partner: "GLRA (German Leprosy and TB Relief Association)",
    duration: "1 June 2025 - 1 May 2027",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-10.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-10.jpg"],
    sortOrder: 3,
    featured: true,
    content: [
      textBlock("Integrated health approach", "h2"),
      textBlock(
        "This project strengthens TB outcomes by integrating screening, education, and referrals with related conditions such as diabetes, Covid-19, malnutrition and leprosy. Community engagement improves early detection and adherence to care.",
      ),
    ],
  },
  {
    _id: "p4",
    title: "SLF (OVC Support)",
    slug: "slf-ovc-support",
    summary:
      "Supporting orphans and vulnerable children, young women and teenage girls across districts in Pwani.",
    tag: "OVC",
    category: "OVC",
    categorySlug: "ovc",
    status: "Ongoing",
    duration: "April 2026 - March 2029",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-12.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-12.jpg"],
    sortOrder: 4,
    content: [
      textBlock("Supporting vulnerable families", "h2"),
      textBlock(
        "PASADA supports OVC and caregivers through community follow-up, psychosocial support, referrals and practical guidance, strengthening protection, wellbeing and access to services.",
      ),
    ],
  },
  {
    _id: "p5",
    title: "APOPO - SUA",
    slug: "apopo-sua",
    summary:
      "Research using innovative detection methods to improve TB diagnosis from samples that appeared negative.",
    tag: "Research",
    category: "Research",
    categorySlug: "research",
    status: "Ongoing",
    partner: "Sokoine University of Agriculture (SUA) / APOPO",
    duration: "2010 to date",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-13.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-13.jpg"],
    sortOrder: 5,
    content: [
      textBlock("Innovation and research", "h2"),
      textBlock(
        "This long-running research partnership strengthens diagnostic pathways and improves outcomes, using innovative detection methods to improve TB diagnosis from samples that initially appeared negative, supporting public health goals through evidence-informed practice.",
      ),
    ],
  },
  {
    _id: "p6",
    title: "Afya Jumuishi Project (MDH)",
    slug: "afya-jumuishi-mdh",
    summary:
      "A five-year initiative (2021-2026) supporting the Government of Tanzania to deliver comprehensive HIV and TB prevention, care and treatment services; PASADA's partnership ran October 2024-December 2025.",
    tag: "HIV & TB",
    category: "Health",
    categorySlug: "health",
    status: "Completed",
    partner: "Management and Development for Health (MDH)",
    duration: "October 2024 - December 2025",
    imageUrl: "https://pasada.or.tz/uploads/service-4.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-4.jpg"],
    sortOrder: 6,
    content: [
      textBlock("Project overview", "h2"),
      textBlock(
        "The Afya Jumuishi Project was implemented through a collaboration between Management and Development for Health (MDH) as the prime partner and PASADA, supporting the Government of Tanzania in delivering comprehensive HIV and TB prevention, care, and treatment services.",
      ),
    ],
  },
  {
    _id: "p7",
    title: "Kizazi Hodari Southern Zone (Deloitte)",
    slug: "kizazi-hodari-deloitte",
    summary:
      "A USAID-funded, five-year project (2022-2026) improving the health, wellbeing and protection of orphans and vulnerable children (OVC) and youth across 58 councils in 11 regions of southern Tanzania.",
    tag: "OVC",
    category: "OVC",
    categorySlug: "ovc",
    status: "Completed",
    partner: "Deloitte Consulting Limited (USAID)",
    duration: "2022-2026",
    imageUrl: "https://pasada.or.tz/uploads/service-7.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-7.jpg"],
    sortOrder: 7,
    content: [
      textBlock("Project overview", "h2"),
      textBlock(
        "USAID Kizazi Hodari Southern Zone supported the Government of Tanzania to improve the health, wellbeing, and protection of OVC and youth in high HIV-burden communities across Mtwara, Iringa, Njombe, Ruvuma, Lindi, Morogoro, Pwani, Songwe, Rukwa, Katavi and Mjini Magharibi Zanzibar.",
      ),
      textBlock(
        "Activities were delivered through families and communities, engaging Community Case Workers (CCWs), Lead Case Workers (LCWs) and National Integrated Case Management System (NICMS) Assigned Officers, coordinated with the health workforce and PEPFAR clinical partners to improve bi-directional referrals between clinical and community services.",
      ),
    ],
  },
  {
    _id: "p8",
    title: "ACHIEVE - PACT",
    slug: "achieve-pact",
    summary:
      "PASADA implemented community-level activities supporting HIV prevention, care and referral pathways as a sub-grantee partner.",
    tag: "Community",
    category: "Community",
    categorySlug: "community",
    status: "Completed",
    partner: "PACT",
    imageUrl: "https://pasada.or.tz/uploads/project-featured-photo-9.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/project-featured-photo-9.jpg"],
    sortOrder: 8,
    content: [
      textBlock("Program overview", "h2"),
      textBlock(
        "ACHIEVE - PACT supported community-level activities that strengthened prevention, care, and referral pathways. PASADA worked alongside partners to deliver outreach, education, and client follow-up in priority areas.",
      ),
    ],
  },
];

const listQuery = groq`
  *[_type == "project"] | order(sortOrder asc, title asc) {
    _id, title, "slug": slug.current, summary, tag, sortOrder, featured, status, partner, duration,
    "category": category->title, "categorySlug": category->slug.current,
    mainImage, gallery, "videoUrl": video.asset->url
  }
`;

const detailQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, summary, tag, sortOrder, featured, status, partner, duration,
    "category": category->title, "categorySlug": category->slug.current,
    mainImage, gallery, content, "videoUrl": video.asset->url
  }
`;

const categoriesQuery = groq`
  *[_type == "projectCategory"] | order(title asc) {
    _id, title, "slug": slug.current
  }
`;

function imageFromSanity(mainImage?: unknown, fallback?: string) {
  if (mainImage) {
    return urlFor(mainImage as Parameters<typeof urlFor>[0])
      .width(1200)
      .height(800)
      .fit("crop")
      .url();
  }
  return fallback ?? media.hero.projects;
}

function mapRow(row: {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  tag?: string;
  category?: string;
  categorySlug?: string;
  status?: string;
  partner?: string;
  duration?: string;
  mainImage?: unknown;
  gallery?: unknown[];
  videoUrl?: string;
  content?: PortableTextBlock[];
  featured?: boolean;
  sortOrder?: number;
}, fallbackImg?: string): ProjectItem {
  const galleryUrls =
    row.gallery?.map((img) =>
      urlFor(img as Parameters<typeof urlFor>[0]).width(1000).url(),
    ) ?? [];

  const imageUrl = imageFromSanity(row.mainImage, fallbackImg);
  if (!galleryUrls.length) galleryUrls.push(imageUrl);

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    tag: row.tag ?? row.category,
    category: row.category,
    categorySlug: row.categorySlug,
    status: row.status === "Completed" ? "Completed" : "Ongoing",
    partner: row.partner,
    duration: row.duration,
    imageUrl,
    galleryUrls,
    videoUrl: row.videoUrl,
    content: row.content,
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

function filterProjects(list: ProjectItem[], opts?: { featuredOnly?: boolean; limit?: number }) {
  let out = [...list].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  if (opts?.featuredOnly) {
    out = out.filter((p) => p.featured);
  }
  if (opts?.limit) out = out.slice(0, opts.limit);
  return out;
}

export async function getProjects(opts?: { featuredOnly?: boolean; limit?: number }) {
  if (!sanityConfigured) {
    return filterProjects(SAMPLE, opts);
  }
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapRow>[0][]>(listQuery);
    if (!rows?.length) return filterProjects(SAMPLE, opts);
    const list = rows.map((r, i) => mapRow(r, SAMPLE[i % SAMPLE.length]?.imageUrl));
    return filterProjects(list, opts);
  } catch {
    return filterProjects(SAMPLE, opts);
  }
}

export async function getProjectBySlug(slug: string) {
  const sample = SAMPLE.find((p) => p.slug === slug);
  if (!sanityConfigured) return sample ?? null;
  try {
    const row = await sanityClient.fetch<Parameters<typeof mapRow>[0] | null>(
      detailQuery,
      { slug },
    );
    if (row) return mapRow(row);
    return sample ?? null;
  } catch {
    return sample ?? null;
  }
}

export async function getProjectCategories() {
  if (!sanityConfigured) {
    return [
      { _id: "pc1", title: "Community", slug: "community" },
      { _id: "pc2", title: "Health", slug: "health" },
      { _id: "pc3", title: "OVC", slug: "ovc" },
      { _id: "pc4", title: "Research", slug: "research" },
    ];
  }
  try {
    const rows = await sanityClient.fetch<{ _id: string; title: string; slug: string }[]>(
      categoriesQuery,
    );
    return rows?.length
      ? rows
      : [
          { _id: "pc1", title: "Community", slug: "community" },
          { _id: "pc2", title: "Health", slug: "health" },
        ];
  } catch {
    return [];
  }
}

export function getAllProjectSlugs() {
  return SAMPLE.map((p) => p.slug);
}
