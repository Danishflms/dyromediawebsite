/**
 * Reads Sanity connection details from the environment.
 * Set these in .env.local — see .env.example for the full list.
 *
 * Deliberately non-throwing: the site's own data fetching (src/sanity/lib/fetch.ts)
 * falls back to the local /src/data files whenever Sanity isn't configured or
 * unreachable, so a missing/blank env var never breaks `next build` or the
 * live site — it only means the Studio route itself won't load.
 */

export const apiVersion = "2026-07-21";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const isSanityConfigured = Boolean(projectId && dataset);
