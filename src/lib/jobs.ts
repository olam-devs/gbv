import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

export type JobListing = {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  postedAt: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  applyEmail?: string;
  isActive: boolean;
};

const SAMPLE_JOBS: JobListing[] = [
  {
    _id: "job-1",
    title: "Community Health Outreach Officer",
    slug: "community-health-outreach-officer",
    department: "Programs",
    location: "Dar es Salaam",
    employmentType: "Full-time",
    postedAt: "2026-01-15",
    summary:
      "Support field outreach, client follow-up, and community education activities across PASADA service areas.",
    responsibilities: [
      "Coordinate community sensitization sessions",
      "Support referral pathways and client follow-up",
      "Prepare activity reports and program data",
    ],
    requirements: [
      "Diploma or degree in public health or related field",
      "Experience in community-based HIV programs",
      "Strong communication in Kiswahili and English",
    ],
    applyEmail: "info@pasada.or.tz",
    isActive: true,
  },
  {
    _id: "job-2",
    title: "Counselor (HTC & Psychosocial Support)",
    slug: "counselor-htc-psychosocial",
    department: "Clinical Services",
    location: "Dar es Salaam",
    employmentType: "Full-time",
    postedAt: "2026-02-01",
    summary:
      "Provide compassionate HIV testing & counseling and psychosocial support for clients and families.",
    responsibilities: [
      "Conduct confidential HTC sessions",
      "Provide psychosocial support and referrals",
      "Maintain accurate client documentation",
    ],
    requirements: [
      "Certification in counseling or social work",
      "Experience in HIV/AIDS service delivery",
      "Commitment to dignity, confidentiality, and ethics",
    ],
    applyEmail: "info@pasada.or.tz",
    isActive: true,
  },
];

const jobsQuery = groq`
  *[_type == "job" && isActive == true] | order(postedAt desc) {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    employmentType,
    postedAt,
    summary,
    responsibilities,
    requirements,
    applyEmail,
    isActive
  }
`;

const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    "slug": slug.current,
    department,
    location,
    employmentType,
    postedAt,
    summary,
    responsibilities,
    requirements,
    applyEmail,
    isActive
  }
`;

export async function getJobs(): Promise<JobListing[]> {
  if (!sanityConfigured) return SAMPLE_JOBS;

  try {
    const rows = await sanityClient.fetch<JobListing[]>(jobsQuery);
    return rows?.length ? rows : SAMPLE_JOBS;
  } catch {
    return SAMPLE_JOBS;
  }
}

export async function getJobBySlug(slug: string): Promise<JobListing | null> {
  const sample = SAMPLE_JOBS.find((j) => j.slug === slug);
  if (!sanityConfigured) return sample ?? null;

  try {
    const row = await sanityClient.fetch<JobListing | null>(jobBySlugQuery, {
      slug,
    });
    return row ?? sample ?? null;
  } catch {
    return sample ?? null;
  }
}

export function getAllJobSlugs(): string[] {
  return SAMPLE_JOBS.map((j) => j.slug);
}
