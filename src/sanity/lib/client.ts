import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-side read client. `useCdn: false` so content is always fresh —
 * the `production` dataset is public, so no token is required to read
 * published documents. Revalidation is handled by tag-based Next.js
 * caching (see src/sanity/lib/fetch.ts), not by the Sanity CDN.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
