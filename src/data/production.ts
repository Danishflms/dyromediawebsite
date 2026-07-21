import type { Project } from "./types";

/**
 * Production page content — the full-service offering.
 * TODO: replace projects with real work.
 */

export const productionHero = {
  eyebrow: "Full-Service Production",
  headline: "From call sheet to final cut.",
  subhead:
    "Photography, videography, event coverage, brand shoots, PR, and commercial production — planned, shot, and delivered by one crew.",
};

/** Services-at-a-glance list of shoot types. */
export const shootTypes = [
  "Photography",
  "Videography",
  "Event Coverage",
  "Brand Shoots",
  "PR Coverage",
  "Commercial Production",
] as const;

export const productionCategories = [
  "Weddings",
  "Events",
  "Brand",
  "PR",
  "Commercial",
] as const;

export type ProductionCategory = (typeof productionCategories)[number];

export const productionProjects: (Project & { category: ProductionCategory })[] = [
  { id: "pr-1", title: "Ayla & Marcus", category: "Weddings", aspect: "16:9" },
  { id: "pr-2", title: "The Winter Estate", category: "Weddings", aspect: "1:1" },
  { id: "pr-3", title: "Meridian Summit 2026", category: "Events", aspect: "16:9" },
  { id: "pr-4", title: "Gallery Night — Opening", category: "Events", aspect: "1:1" },
  { id: "pr-5", title: "Halcyon — Brand Story", category: "Brand", aspect: "16:9" },
  { id: "pr-6", title: "Oakframe — Lookbook", category: "Brand", aspect: "1:1" },
  { id: "pr-7", title: "State & Main — Press Day", category: "PR", aspect: "16:9" },
  { id: "pr-8", title: "Product Launch Coverage", category: "PR", aspect: "1:1" },
  { id: "pr-9", title: "Northline — Launch Film", category: "Commercial", aspect: "16:9" },
  { id: "pr-10", title: "Lumen — 30s Spot", category: "Commercial", aspect: "16:9" },
];
