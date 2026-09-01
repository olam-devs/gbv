import { groq } from "next-sanity";
import { sanityClient } from "@/sanity/client";
import { sanityConfigured } from "@/sanity/env";

export type SiteSettings = {
  maxFeaturedPosts: number;
  maxFeaturedProjects: number;
  maxFeaturedServices: number;
  donationEmail: string;
  careersEmail: string;
  volunteerEmail: string;
  whistleblowerChannel1Url: string;
  whistleblowerChannel2Url: string;
};

const defaults: SiteSettings = {
  maxFeaturedPosts: 3,
  maxFeaturedProjects: 3,
  maxFeaturedServices: 6,
  donationEmail: "info@pasada.or.tz",
  careersEmail: "recruitment@pasada.or.tz",
  volunteerEmail: "volunteer@pasada.or.tz",
  whistleblowerChannel1Url:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAob4kyZUME5RVlRHVlZUWEVKUE42TEw2OEFMRDhFMy4u",
  whistleblowerChannel2Url:
    "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__qiYUi9UQUpVNDhPWk1QQTNRVkY5TFZBNjdXUElUWi4u",
};

const query = groq`
  *[_type == "siteSettings"][0] {
    maxFeaturedPosts,
    maxFeaturedProjects,
    maxFeaturedServices,
    donationEmail,
    careersEmail,
    volunteerEmail,
    whistleblowerChannel1Url,
    whistleblowerChannel2Url
  }
`;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured) return defaults;
  try {
    const row = await sanityClient.fetch<Partial<SiteSettings> | null>(query);
    return { ...defaults, ...row };
  } catch {
    return defaults;
  }
}
