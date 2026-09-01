## GBV NGO Website (Next.js + Sanity, bootstrapped from the PASADA template)

This project was bootstrapped by copying the codebase, UI, and component patterns from the PASADA (T) website (`C:\Users\USER\Desktop\PASADA\web`) as a starting template. It is a **separate project** — its own git repo, its own Sanity project, its own Vercel project. Nothing here is connected to PASADA's dataset or deployments.

See [TODO-CUSTOMIZE.md](./TODO-CUSTOMIZE.md) for the full checklist of what still needs to change before this is a real, independent site.

### Tech

- Next.js App Router
- Tailwind CSS
- Embla Carousel (testimonials slider)
- Framer Motion
- Sanity (client libs in place; no project connected yet — see below)

### Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Environment variables

Copy `.env.example` to `.env.local` once a Sanity project exists for this NGO:

```bash
cp .env.example .env.local
```

Until then, the site runs on hardcoded fallback content (same pattern PASADA uses in `src/lib/*.ts`).

### Notes

- `/studio` embeds Sanity Studio (`src/app/studio/[[...tool]]/`) but has no project ID configured yet — set `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` first.
- `public/brand/` is empty — this NGO's logo and favicon still need to be added (see TODO-CUSTOMIZE.md).
- Placeholder images live in `public/placeholder/`.
- Root layout sets `export const revalidate = 60` for ISR — keep this once Sanity is connected, or Studio publishes won't show up on the live site (this bit PASADA once).

### Deploy (later)

Push to a new GitHub repo and import into a new Vercel project. Add env vars in Vercel once Sanity is ready. Don't forget Sanity's CORS origins (Studio auth fails without them) — see PASADA's history for what that looked like.
