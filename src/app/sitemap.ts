import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * Public routes only. The /industries/[slug] pages are deliberately left
 * out — they're unlisted, reachable only through the "Select your
 * industry" menu, and each one also sends robots: noindex.
 *
 * They're intentionally NOT added to robots.txt as a Disallow either:
 * that file is public, so listing the path there would advertise exactly
 * what we're trying to keep out of sight.
 */
const routes = ["", "/editing", "/production", "/about", "/services", "/book"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
