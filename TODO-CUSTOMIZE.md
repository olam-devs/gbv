# TODO: customize this template for the GBV NGO

This codebase is a direct copy of the PASADA (T) website's structure, components, and styling. Nothing NGO-specific has been rewritten yet — that's deliberate, so it could be handed to a fresh session with the real details. Below is everything found (via `grep -rn "PASADA\|pasada"` across `src/`) that still needs replacing before this is its own site.

## Already handled (don't redo)

- ✅ `src/sanity/sanity.config.ts` — removed the hardcoded fallback to PASADA's real Sanity project ID (`4mu2imft`). It now falls back to `"pending"`, matching `src/sanity/client.ts`. **Never** hardcode a real project ID here again without confirming it's this NGO's own project.
- ✅ No `.git`, `node_modules`, `.next`, or `.env.local` were copied over — this is a clean start with no PASADA secrets or history.
- ✅ `public/brand/logo.jpg` and `favicon.png` were removed (PASADA's real logo) — the folder is currently empty.
- ✅ `scripts/seed-content.mjs` (PASADA's real seed data) was removed — a new one should be written once real content exists.
- ✅ `_pasada_home_raw.html`, `run-dev.bat`, `run-prod.bat` (old scrape file / PASADA-path-specific launch scripts) were removed.

## Needs real content/branding (not done — needs your input)

**Identity & branding**
- `public/brand/` — add this NGO's logo + favicon (currently empty; `next/image` will error until something is there)
- `src/app/layout.tsx` — page title/description, `metadataBase` URL, OpenGraph copy, favicon icon path
- `src/app/globals.css` — `--primary` / `--brand-blue` / `--accent` color tokens (currently PASADA's red/blue)
- `src/components/site/Header.tsx` — org name, tagline, phone, email, nav items (does "Tenders" or "Whistle-blower" even apply to this NGO? Decide per-item, don't just relabel)
- `src/components/site/Footer.tsx` — org name, description, address, phone, email, copyright line

**Sanity schema defaults** (`src/sanity/schemaTypes/`)
- `siteSettings.ts` — every `initialValue` (title, tagline, email, phone, address, donationEmail, careersEmail, volunteerEmail)
- `job.ts`, `tender.ts` — `applyEmail`/`contactEmail` initial values

**Page copy** — every file under `src/app/**/page.tsx` has PASADA-specific prose (About, Contact, Donate, Get Involved, Jobs, Privacy, Projects, Services, Tenders, Whistle-blower, homepage hero). Read each page and rewrite for this NGO's actual mission/services — don't just find-and-replace "PASADA" with the new name, since the underlying content (HIV/AIDS services, faith-based framing, PASADA's specific programs) won't fit a women's-rights/GBV org at all.

**Fallback sample data** (`src/lib/*.ts`) — these are what the site shows before Sanity has real content, and what PASADA's own site still falls back to if Sanity is ever empty/unreachable. Replace entirely with this NGO's own placeholder-but-plausible content, or empty arrays if you'd rather show nothing until Sanity is seeded:
- `blog.ts` — 4 sample posts + categories (Events/Awareness/Partnerships/Community)
- `jobs.ts` — 2 sample job listings
- `media.ts` — every image URL points at `pasada.or.tz/uploads/...` — needs this NGO's own stock/placeholder images (the user's instruction pattern elsewhere has been "use web pictures for now until real photos exist")
- `projects.ts` — 8 sample PASADA projects
- `services.ts` — 15 sample PASADA services
- `settings.ts` — default donation/careers/volunteer emails
- `testimonials.ts` — ~24 sample quotes across 4 categories
- `tenders.ts` — 1 sample tender

## Decide before building further

- Does a GBV-focused NGO need a **Tenders** page and a **Whistle-blower/Tupe taarifa** page at all, or should those be replaced with something more relevant (e.g. a confidential reporting/SOS hotline page, a resources/legal-aid page)? Don't assume PASADA's page set maps 1:1.
- What are this NGO's actual program/service categories (the equivalent of PASADA's HIV/TB services)?
- What are its actual current/past projects (ongoing vs completed)?
- Contact routing: which email(s) for which purpose (donations, volunteers, reporting, general)?
- Org name, tagline, logo, color palette.
- Domain name (for `metadataBase` and eventual deploy).

## Infra (deferred on purpose, per the user)

- Not yet connected to Sanity, Vercel, or GitHub — local dev only for now (`npm install && npm run dev`).
- When ready: create a **new** Sanity project (don't reuse PASADA's `4mu2imft`), a **new** GitHub repo, a **new** Vercel project.
- Remember PASADA's hard-won lessons: Studio needs its CORS origins added in Sanity's dashboard before login works; the root layout needs `export const revalidate = 60` (already present) or Studio publishes won't reach the live site without a full redeploy.
