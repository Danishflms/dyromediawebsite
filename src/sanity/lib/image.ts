import createImageUrlBuilder from "@sanity/image-url";
import type { Image as SanityImageValue } from "sanity";
import { dataset, projectId } from "../env";

const builder = projectId && dataset ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Returns a Sanity image URL builder, or null if Sanity isn't configured. */
export function urlFor(source: SanityImageValue | undefined | null) {
  if (!source || !builder) return null;
  return builder.image(source);
}
