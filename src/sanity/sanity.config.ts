import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { sanityEnv } from "@/sanity/env";

export const sanityConfig = defineConfig({
  basePath: "/studio",
  name: "default",
  title: "GBV Content Studio",
  // No hardcoded project fallback on purpose: this project must never silently
  // point at another NGO's Sanity dataset. Set NEXT_PUBLIC_SANITY_PROJECT_ID /
  // NEXT_PUBLIC_SANITY_DATASET in .env.local once this project's own Sanity
  // project exists.
  projectId: sanityEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || "pending",
  dataset: sanityEnv.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
