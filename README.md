# Dyro Media

Marketing/portfolio site for Dyro Media — a full-service creative media agency and post-production house.

Next.js (App Router, TypeScript) · Tailwind CSS v4 · Framer Motion · Geist via `next/font` · react-calendly.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
npm run lint
```

## Structure

```
src/
  app/                 routes: / /editing /production /about /services /book
                       + sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
  components/          nav, footer, section, cta-band, cta-link, reveal (motion),
                       work-card, media-placeholder, lightbox, editing-gallery,
                       logo-marquee, calendly-embed, testimonial-card
  data/                ALL copy and placeholder content lives here
  lib/                 cn() class helper
```

Design tokens (colors, fonts) are defined once in `src/app/globals.css` under `@theme`.

## TODO — placeholders to replace

All in `src/data/` and marked with `TODO:` comments:

| What | Where |
|------|-------|
| Production domain | `site.ts` → `url` |
| Calendly event URL | `site.ts` → `calendlyUrl` |
| Email + WhatsApp | `site.ts` → `contact` |
| Instagram + LinkedIn | `site.ts` → `social` |
| Stats & client names | `home.ts` → `stats`, `clients`, `selectedWork` |
| Editing projects + video IDs | `editing.ts` (add `video: { provider, id }` to light up the lightbox) |
| Production projects | `production.ts` |
| Services & pricing | `services.ts` |
| Testimonials | `testimonials.ts` |
| Hero showreel video | `home.ts` → `showreelSrc` (drop a file in `/public`) |
| OG image | replace `src/app/opengraph-image.tsx` with a real `opengraph-image.png` (1200×630) |

Real media: swap `<MediaPlaceholder>` usages for `next/image` / `<video>` — aspect ratios are already correct, so layout won't shift.

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In [vercel.com/new](https://vercel.com/new), import the repo — Next.js is auto-detected, no config needed.
3. Deploy. Then add your custom domain under Project → Settings → Domains.
4. Update `site.ts` → `url` to the final domain and redeploy (fixes sitemap/OG URLs).
