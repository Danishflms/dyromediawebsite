import type { Project } from "./types";

/**
 * Editing page content — the edit-only offering for international
 * creators and brands.
 * TODO: replace projects with real work and add video IDs (see types.ts).
 */

export const editingHero = {
  eyebrow: "Post-Production",
  headline: "Editing that earns the watch.",
  subhead:
    "We cut short-form, long-form YouTube, ads, and reels for creators and brands worldwide — color, sound, and pacing handled by one team.",
};

export const editingProjects: Project[] = [
  { id: "ed-1", title: "Creator Series, Vol. 4", category: "Long-form", tag: "Creator", aspect: "16:9" },
  { id: "ed-2", title: "Verve — Product Reel", category: "Short-form", tag: "Brand", aspect: "9:16" },
  { id: "ed-3", title: "Atlas & Co — Ad Cutdowns", category: "Ads", tag: "Brand", aspect: "16:9" },
  { id: "ed-4", title: "Podcast Highlights, Ep. 89", category: "Short-form", tag: "Creator", aspect: "9:16" },
  { id: "ed-5", title: "Documentary — First Light", category: "Long-form", tag: "Studio", aspect: "16:9" },
  { id: "ed-6", title: "Lumen — Launch Teaser", category: "Ads", tag: "Brand", aspect: "16:9" },
  { id: "ed-7", title: "Travel Diaries — Kyoto", category: "Short-form", tag: "Creator", aspect: "9:16" },
  { id: "ed-8", title: "Oakframe — Year in Review", category: "Long-form", tag: "Brand", aspect: "16:9" },
];

export const editingProcess = [
  {
    step: "01",
    title: "Brief",
    description:
      "We align on the story, the audience, and the references. One call, one shared doc.",
  },
  {
    step: "02",
    title: "Assembly",
    description:
      "First cut built around structure and pacing. You see progress, not silence.",
  },
  {
    step: "03",
    title: "Refine",
    description:
      "Color, sound design, and graphics. Feedback lands in timestamped rounds.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Final masters in every format and ratio you need, named and ready to publish.",
  },
] as const;
