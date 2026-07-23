import type { Project } from "./types";

/**
 * Home page content.
 * TODO: replace stats, client names, and selected work with real data.
 */

export const hero = {
  eyebrow: "Creative Media Agency",
  headline: ["One Stop Solution", "to Your Production Needs"],
  subhead:
    "Dyro Media is a creative media agency and post-production house. We shoot, cut, and finish work for brands and creators worldwide.",
  primaryCta: { label: "Book a Call", href: "/book" },
  secondaryCta: { label: "View Our Work", href: "/editing" },
  /**
   * TODO: drop a muted looping showreel here (e.g. "/showreel.mp4" in /public).
   * Leave undefined to keep the on-brand placeholder.
   */
  showreelSrc: undefined as string | undefined,
};

export const whatWeDo = [
  {
    title: "Editing",
    href: "/editing",
    description:
      "Post-production for creators and brands worldwide. Short-form, long-form, ads, color, and sound — cut with intent.",
  },
  {
    title: "Production",
    href: "/production",
    description:
      "Full-service shoots. Photography, videography, events, brand, PR, and commercial work — from call sheet to final delivery.",
  },
] as const;

/** A tight teaser mixing both sides of the work. TODO: curate real projects. */
export const selectedWork: Project[] = [
  { id: "sw-1", title: "Northline — Launch Film", category: "Commercial", tag: "Production", aspect: "16:9" },
  { id: "sw-2", title: "Creator Series, Vol. 4", category: "Long-form", tag: "Editing", aspect: "16:9" },
  { id: "sw-3", title: "Halcyon — Brand Story", category: "Brand", tag: "Production", aspect: "16:9" },
  { id: "sw-4", title: "Verve — Product Reel", category: "Short-form", tag: "Editing", aspect: "16:9" },
  { id: "sw-5", title: "Meridian Summit", category: "Events", tag: "Production", aspect: "16:9" },
  { id: "sw-6", title: "Atlas & Co — Ad Cutdowns", category: "Ads", tag: "Editing", aspect: "16:9" },
];

/** Credibility strip. TODO: replace with real numbers. */
export const stats = [
  { value: "7+", label: "Years of craft" },
  { value: "300+", label: "Projects delivered" },
  { value: "14", label: "Countries served" },
  { value: "60+", label: "Clients worldwide" },
] as const;

/**
 * Placeholder client strip. Real entries live in Sanity (Home Page →
 * Clients), where each can carry a logo image and a link.
 */
export const clients: { name: string; url?: string; logoUrl?: string }[] = [
  { name: "NORTHLINE" },
  { name: "ATLAS & CO" },
  { name: "VERVE" },
  { name: "HALCYON" },
  { name: "MERIDIAN" },
  { name: "OAKFRAME" },
  { name: "LUMEN" },
  { name: "STATE & MAIN" },
];
