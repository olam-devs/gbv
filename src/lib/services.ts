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

const SAMPLE: ServiceItem[] = [
  {
    _id: "s1",
    title: "HIV testing and counseling",
    slug: "hiv-testing-and-counseling",
    summary:
      "Confidential HIV testing and compassionate counseling, with privacy and respect.",
    imageUrl: "https://pasada.or.tz/uploads/service-1.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-1.jpg"],
    sortOrder: 1,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "What this service provides" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "PASADA provides confidential HIV testing and counseling in a supportive environment. Clients receive accurate information, risk-reduction guidance, and referrals based on their needs.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Client journey" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Pre-test counseling and informed consent" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Testing and results with clear explanations" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Post-test counseling and linkage to care when needed" }],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s2",
    title: "Home-based and palliative care",
    slug: "home-based-and-palliative-care",
    summary: "Comfort-focused care and supportive follow-up for clients and families.",
    imageUrl: "https://pasada.or.tz/uploads/service-2.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-2.jpg"],
    sortOrder: 2,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Comfort-focused support" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Home-based and palliative care offers comfort, follow-up, and psychosocial support for clients and families—especially during difficult periods. PASADA teams work with caregivers and health facilities to ensure continuity of care.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s3",
    title: "Comprehensive HIV care and treatment support",
    slug: "comprehensive-hiv-care",
    summary: "Holistic, client-centered support to help individuals manage their health.",
    imageUrl: "https://pasada.or.tz/uploads/service-3.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-3.jpg"],
    sortOrder: 3,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Holistic treatment support" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "PASADA supports clients to access and continue HIV care through counseling, adherence support, follow-up and referrals. Services are delivered with respect, confidentiality and compassion.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s4",
    title: "PMTCT screening",
    slug: "pmtct-screening",
    summary: "Screening and support to prevent mother-to-child transmission.",
    imageUrl: "https://pasada.or.tz/uploads/service-4.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-4.jpg"],
    sortOrder: 4,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Protecting mother and child" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "PMTCT screening supports early identification and timely referrals. PASADA promotes education and respectful counseling for mothers and families, strengthening prevention and continuity of care.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s5",
    title: "Cervical cancer screening",
    slug: "cervical-cancer-screening",
    summary: "Protecting women's health through early detection and referral pathways.",
    imageUrl: "https://pasada.or.tz/uploads/service-5.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-5.jpg"],
    sortOrder: 5,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Women’s health" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Cervical cancer screening increases awareness and supports early detection. PASADA works with referral pathways to ensure clients receive appropriate follow-up and guidance.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s6",
    title: "NCD screening",
    slug: "ncd-screening",
    summary: "Early detection and wellness support for non-communicable diseases.",
    imageUrl: "https://pasada.or.tz/uploads/service-6.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-6.jpg"],
    sortOrder: 6,
    featured: true,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Preventing complications early" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "NCD screening helps communities identify risk factors early and take practical steps toward healthier living. PASADA supports education, screening awareness and referrals when needed.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s7",
    title: "Support to OVC and caregivers",
    slug: "ovc-caregiver-support",
    summary: "Empowering vulnerable children and caregivers with care and dignity.",
    imageUrl: "https://pasada.or.tz/uploads/service-7.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-7.jpg"],
    sortOrder: 7,
  },
  {
    _id: "s8",
    title: "Psychosocial support and counseling",
    slug: "psychosocial-support",
    summary: "Mental health and emotional support for individuals and families.",
    imageUrl: "https://pasada.or.tz/uploads/service-8.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-8.jpg"],
    sortOrder: 8,
  },
  {
    _id: "s9",
    title: "Community sensitization and education",
    slug: "community-sensitization",
    summary: "Reducing stigma and strengthening prevention through community engagement.",
    imageUrl: "https://pasada.or.tz/uploads/service-9.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-9.jpg"],
    sortOrder: 9,
  },
  {
    _id: "s10",
    title: "Capacity development",
    slug: "capacity-development",
    summary: "Training, mentorship and supervision for sustainable program outcomes.",
    imageUrl: "https://pasada.or.tz/uploads/service-10.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-10.jpg"],
    sortOrder: 10,
  },
  {
    _id: "s11",
    title: "Provision of ART",
    slug: "provision-of-art",
    summary:
      "Antiretroviral Therapy (ART) at our Care and Treatment Clinics to increase access for adults and children living with HIV.",
    imageUrl: "https://pasada.or.tz/uploads/service-1.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-1.jpg"],
    sortOrder: 11,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "ART at our Care and Treatment Clinics" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "PASADA's Antiretroviral Therapy (ART) program, implemented in Care and Treatment Clinics (CTC), aims to increase access to ART services among adult and child populations living with HIV. The provision and efficacy of ART is monitored through routine laboratory investigations including CD4, viral load, full blood count, and liver and renal function tests.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s12",
    title: "Fast Track Services",
    slug: "fast-track-services",
    summary:
      "Upendano Fast Track Unit provides expedited outpatient, HIV/Hepatitis B prevention, laboratory and diagnostic imaging services—having served over 200,000 clients since 2012.",
    imageUrl: "https://pasada.or.tz/uploads/service-2.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-2.jpg"],
    sortOrder: 12,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Upendano Fast Track Unit" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Established in 2012, the Upendano Fast Track Unit provides expedited healthcare to clients who need urgent attention, including NHIF beneficiaries and individuals who are unaware of their HIV status or facing other health challenges.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "h3",
        children: [{ _type: "span", text: "Services provided" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Fast-track outpatient services for urgent cases" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "HIV and Hepatitis B prevention services" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Laboratory services delivered by skilled professionals" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Diagnostic imaging, including X-ray and ultrasound" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Since 2012, the unit has served over 200,000 clients, improving access to timely healthcare for NHIF beneficiaries and strengthening preventive HIV and Hepatitis B services.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s13",
    title: "Laboratory Services",
    slug: "laboratory-services",
    summary:
      "Upendano Dispensary Laboratory provides technical expertise, reagents and supplies supporting HIV/TB testing and monitoring across the Archdiocese of Dar es Salaam.",
    imageUrl: "https://pasada.or.tz/uploads/service-5.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-5.jpg"],
    sortOrder: 13,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Upendano Dispensary Laboratory" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Staffed by a laboratory technologist, laboratory assistant and data officer, the laboratory provides technical expertise, essential reagents and supplies to dispensaries across the Archdiocese of Dar es Salaam, supporting HIV/TB/AIDS prevention, care, treatment and support services.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Tests conducted include determining HIV status, disease staging and treatment eligibility, and monitoring viral load and CD4 count, along with identifying potential toxicities, adverse reactions and treatment failure.",
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s14",
    title: "TB & HIV Services",
    slug: "tb-hiv-services",
    summary:
      "Integrated TB screening, TPT provision, HIV counselling and testing, and directly observed treatment at Upendano Dispensary.",
    imageUrl: "https://pasada.or.tz/uploads/service-6.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-6.jpg"],
    sortOrder: 14,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Integrated TB and HIV care" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "TB screening for all PLHIV attending CTC and other clients at all facility entry points" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Provision of TB Preventive Therapy (TPT) to PLHIV and to children of smear-positive parents/caregivers" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "HIV counselling and testing for clients diagnosed with TB and other eligible clients" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "TB diagnosis via GeneXpert, TrueNat, TB LAM and ZN stain microscopy, plus X-ray and ultrasound screening" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Directly Observed Treatment (DOT) and contact tracing for smear-positive clients" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Integrated TB/HIV, TB/diabetes and TB/malnutrition services under one roof" }],
        markDefs: [],
      },
    ],
  },
  {
    _id: "s15",
    title: "Case Management Services",
    slug: "case-management-services",
    summary:
      "Monthly household case management visits for OVC and caregivers, with care plans, direct support and referral linkages.",
    imageUrl: "https://pasada.or.tz/uploads/service-8.jpg",
    galleryUrls: ["https://pasada.or.tz/uploads/service-8.jpg"],
    sortOrder: 15,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Community case management" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Community Case Workers (CCWs) conduct regular monthly household visits to provide case management services to OVC and caregivers. CCWs assess family needs and develop care plans reflecting required services and support.",
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "CCWs serve households directly and link them to other service providers, including health facilities, religious institutions and educational institutions.",
          },
        ],
        markDefs: [],
      },
    ],
  },
];

const listQuery = groq`
  *[_type == "service"] | order(sortOrder asc, title asc) {
    _id, title, "slug": slug.current, summary, sortOrder, featured,
    "category": category->title, "categorySlug": category->slug.current,
    mainImage, gallery
  }
`;

const detailQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, summary, sortOrder, featured,
    "category": category->title, "categorySlug": category->slug.current,
    mainImage, gallery, content
  }
`;

const categoriesQuery = groq`
  *[_type == "serviceCategory"] | order(title asc) {
    _id, title, "slug": slug.current
  }
`;

function mapRow(
  row: {
    _id: string;
    title: string;
    slug: string;
    summary?: string;
    category?: string;
    categorySlug?: string;
    mainImage?: unknown;
    gallery?: unknown[];
    content?: PortableTextBlock[];
    featured?: boolean;
    sortOrder?: number;
  },
  fallbackImg?: string,
): ServiceItem {
  const imageUrl = row.mainImage
    ? urlFor(row.mainImage as Parameters<typeof urlFor>[0]).width(1200).url()
    : fallbackImg ?? media.hero.services;

  const galleryUrls =
    row.gallery?.map((img) =>
      urlFor(img as Parameters<typeof urlFor>[0]).width(1000).url(),
    ) ?? [];
  if (!galleryUrls.length) galleryUrls.push(imageUrl);

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    category: row.category,
    categorySlug: row.categorySlug,
    imageUrl,
    galleryUrls,
    content: row.content,
    featured: row.featured,
    sortOrder: row.sortOrder,
  };
}

function filterServices(list: ServiceItem[], opts?: { featuredOnly?: boolean; limit?: number }) {
  let out = [...list].sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  if (opts?.featuredOnly) out = out.filter((s) => s.featured);
  if (opts?.limit) out = out.slice(0, opts.limit);
  return out;
}

export async function getServices(opts?: { featuredOnly?: boolean; limit?: number }) {
  if (!sanityConfigured) return filterServices(SAMPLE, opts);
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapRow>[0][]>(listQuery);
    if (!rows?.length) return filterServices(SAMPLE, opts);
    const list = rows.map((r, i) => mapRow(r, SAMPLE[i % SAMPLE.length]?.imageUrl));
    return filterServices(list, opts);
  } catch {
    return filterServices(SAMPLE, opts);
  }
}

export async function getServiceBySlug(slug: string) {
  const sample = SAMPLE.find((s) => s.slug === slug);
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

export async function getServiceCategories() {
  if (!sanityConfigured) {
    return [{ _id: "sc1", title: "Clinical", slug: "clinical" }];
  }
  try {
    return (
      (await sanityClient.fetch<{ _id: string; title: string; slug: string }[]>(
        categoriesQuery,
      )) ?? []
    );
  } catch {
    return [];
  }
}

export function getAllServiceSlugs() {
  return SAMPLE.map((s) => s.slug);
}
