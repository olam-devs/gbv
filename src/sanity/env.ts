import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().optional(),
  SANITY_API_READ_TOKEN: z.string().optional(),
});

export const sanityEnv = schema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
});

export const sanityConfigured =
  !!sanityEnv.NEXT_PUBLIC_SANITY_PROJECT_ID && !!sanityEnv.NEXT_PUBLIC_SANITY_DATASET;

