import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";
import { urlFor } from "@/lib/sanity-image";
import { media } from "@/lib/media";
import type { PortableTextBlock } from "@portabletext/react";

export type TenderItem = {
  _id: string;
  title: string;
  slug: string;
  tenderNumber?: string;
  status: "Open" | "Closed";
  publishedAt?: string;
  deadline?: string;
  summary: string;
  imageUrl: string;
  documentUrl?: string;
  content?: PortableTextBlock[];
  contactEmail?: string;
};

const SAMPLE: TenderItem[] = [
  {
    _id: "tender-sample-1",
    title: "Tender for Delivery of Car Hire Service",
    slug: "tender-for-delivery-of-car-hire-service",
    tenderNumber: "PASADA/T/SAMPLE/01",
    status: "Closed",
    publishedAt: "2026-01-10",
    deadline: "2026-01-31T17:00:00+03:00",
    summary:
      "PASADA invited competent and licensed car hire service providers to submit bids for the provision of vehicle hire services. This is a sample listing shown until a live tender is posted in Sanity Studio.",
    imageUrl: media.hero.careers,
    content: [
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Scope of the tender" }],
        markDefs: [],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Interested and eligible car hire companies were invited to submit technical and financial proposals for the provision of vehicle hire services to support PASADA's program activities.",
          },
        ],
        markDefs: [],
      },
    ],
    contactEmail: "info@pasada.or.tz",
  },
];

const listQuery = groq`
  *[_type == "tender"] | order(deadline asc) {
    _id, title, "slug": slug.current, tenderNumber, status, publishedAt, deadline,
    summary, mainImage, "documentUrl": document.asset->url, content, contactEmail
  }
`;

const detailQuery = groq`
  *[_type == "tender" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, tenderNumber, status, publishedAt, deadline,
    summary, mainImage, "documentUrl": document.asset->url, content, contactEmail
  }
`;

function mapRow(row: {
  _id: string;
  title: string;
  slug: string;
  tenderNumber?: string;
  status?: string;
  publishedAt?: string;
  deadline?: string;
  summary?: string;
  mainImage?: unknown;
  documentUrl?: string;
  content?: PortableTextBlock[];
  contactEmail?: string;
}): TenderItem {
  const imageUrl = row.mainImage
    ? urlFor(row.mainImage as Parameters<typeof urlFor>[0]).width(1200).url()
    : media.hero.careers;

  return {
    _id: row._id,
    title: row.title,
    slug: row.slug,
    tenderNumber: row.tenderNumber,
    status: row.status === "Closed" ? "Closed" : "Open",
    publishedAt: row.publishedAt,
    deadline: row.deadline,
    summary: row.summary ?? "",
    imageUrl,
    documentUrl: row.documentUrl,
    content: row.content,
    contactEmail: row.contactEmail,
  };
}

function sortTenders(list: TenderItem[]) {
  return [...list].sort((a, b) => {
    if (a.status !== b.status) return a.status === "Open" ? -1 : 1;
    const ad = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const bd = b.deadline ? new Date(b.deadline).getTime() : Infinity;
    return ad - bd;
  });
}

export async function getTenders(): Promise<TenderItem[]> {
  if (!sanityConfigured) return sortTenders(SAMPLE);
  try {
    const rows = await sanityClient.fetch<Parameters<typeof mapRow>[0][]>(listQuery);
    if (!rows?.length) return sortTenders(SAMPLE);
    return sortTenders(rows.map(mapRow));
  } catch {
    return sortTenders(SAMPLE);
  }
}

export async function getTenderBySlug(slug: string): Promise<TenderItem | null> {
  const sample = SAMPLE.find((t) => t.slug === slug);
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

export function getAllTenderSlugs(): string[] {
  return SAMPLE.map((t) => t.slug);
}
