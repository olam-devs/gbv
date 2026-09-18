// Sanity data update: delete invented blog posts & old categories, add Articles + News
const fs = require("fs");
const path = require("path");
const { createClient } = require("@sanity/client");

// Try multiple known Sanity CLI config locations on Windows
const candidates = [
  path.join(process.env.USERPROFILE, ".config", "sanity", "config.json"),
  path.join(process.env.APPDATA || "", "sanity", "auth.json"),
  path.join(process.env.LOCALAPPDATA || "", "sanity", "auth.json"),
];
let token;
for (const f of candidates) {
  try {
    const parsed = JSON.parse(fs.readFileSync(f, "utf8"));
    token = parsed.authToken || parsed.token;
    if (token) break;
  } catch { /* try next */ }
}
if (!token) {
  console.error("Could not find Sanity CLI auth token. Run: npx sanity login");
  process.exit(1);
}

const client = createClient({
  projectId: "q5oqotva",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function main() {
  console.log("Connecting to Sanity project q5oqotva / production...\n");

  // 1. Delete invented blog posts
  const postsToDelete = [
    "post-16-days-activism",
    "post-warning-signs-ipv",
    "post-gbv-schools",
  ];
  for (const id of postsToDelete) {
    try {
      await client.delete(id);
      console.log(`  ✓ Deleted post: ${id}`);
    } catch {
      console.log(`  – Skipped (not found): ${id}`);
    }
  }

  // 2. Delete old blog categories
  const oldCats = ["cat-blog-awareness", "cat-blog-education", "cat-blog-events"];
  for (const id of oldCats) {
    try {
      await client.delete(id);
      console.log(`  ✓ Deleted category: ${id}`);
    } catch {
      console.log(`  – Skipped (not found): ${id}`);
    }
  }

  // 3. Create Articles + News categories
  await client.createOrReplace({
    _id: "cat-blog-articles",
    _type: "category",
    title: "Articles",
    slug: { _type: "slug", current: "articles" },
  });
  console.log("  ✓ Created category: Articles");

  await client.createOrReplace({
    _id: "cat-blog-news",
    _type: "category",
    title: "News",
    slug: { _type: "slug", current: "news" },
  });
  console.log("  ✓ Created category: News");

  // 4. Seed a default siteSettings document if it doesn't exist
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    title: "GI-Desk",
    tagline: "Stop Gender-Based Violence in Tanzania",
    donationEmail: "genderdeskhelp@gmail.com",
    volunteerEmail: "genderdeskhelp@gmail.com",
    maxFeaturedServices: 6,
    maxFeaturedProjects: 3,
    maxFeaturedPosts: 3,
  });
  console.log("  ✓ Seeded: siteSettings (if not present)");

  console.log("\nDone! Sanity data updated successfully.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
