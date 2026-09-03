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
    title: "GBV Case Manager",
    slug: "gbv-case-manager",
    department: "Programs",
    location: "Bagamoyo / Dar es Salaam",
    employmentType: "Full-time",
    postedAt: "2026-06-01",
    summary:
      "Provide individual GBV case management — needs assessments, safety planning, referral coordination, and follow-up for survivors of gender-based and intimate partner violence.",
    responsibilities: [
      "Conduct survivor-centred needs assessments and safety planning",
      "Coordinate referrals to health, legal, and psychosocial services",
      "Maintain accurate, confidential case documentation",
      "Participate in GBV sub-cluster coordination meetings",
    ],
    requirements: [
      "Degree or diploma in social work, counselling, or public health",
      "Experience in GBV case management or survivor support",
      "Fluency in Kiswahili; English an advantage",
      "Strong commitment to confidentiality and ethical practice",
    ],
    applyEmail: "genderdeskhelp@gmail.com",
    isActive: true,
  },
  {
    _id: "job-2",
    title: "Community Mobilisation Officer",
    slug: "community-mobilisation-officer",
    department: "Programs",
    location: "Bagamoyo, Pwani Region",
    employmentType: "Full-time",
    postedAt: "2026-06-01",
    summary:
      "Mobilise and build capacity of community leaders, women's groups, men's groups, and GBV partners to prevent and respond to gender-based violence.",
    responsibilities: [
      "Facilitate community dialogues on GBV prevention and social norms",
      "Conduct school-based awareness sessions for adolescents",
      "Build capacity of community structures and GBV partners",
      "Report activity data and field observations",
    ],
    requirements: [
      "Diploma or degree in social sciences, public health, or education",
      "Experience in community mobilisation or GBV prevention programmes",
      "Strong facilitation and communication skills in Kiswahili",
    ],
    applyEmail: "genderdeskhelp@gmail.com",
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
