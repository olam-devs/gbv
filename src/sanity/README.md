# Sanity integration (pending project)

This repo already includes Sanity client dependencies. You said you’ll create the Sanity project later, so the website is currently **content-stubbed** (hardcoded data).

When your Sanity project is ready, we will:

- Add a proper embedded Studio route at `/studio`
- Add schemas for:
  - Site settings (logo, contact info, donation methods)
  - Pages (portable text + sections)
  - Services
  - Projects
  - Testimonials
  - Blog posts
- Add GROQ queries and replace stub data on pages

You will provide:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- (optional) `SANITY_API_READ_TOKEN` for drafts/preview

