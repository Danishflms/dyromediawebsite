/**
 * Services page content.
 * TODO: adjust offerings, bullets, and "starting from" placeholders.
 */

export type Service = {
  title: string;
  description: string;
  bullets: string[];
  /** Optional "starting from" placeholder. TODO: set real pricing or remove. */
  startingFrom?: string;
};

export const servicesHero = {
  eyebrow: "Services",
  headline: "Everything the work needs.",
  subhead:
    "Six offerings, one team. Hire us for a single edit or hand us the whole production.",
};

export const services: Service[] = [
  {
    title: "Video Editing / Post-Production",
    description: "The edit-only offering for creators and brands worldwide.",
    bullets: [
      "Short-form & reels",
      "Long-form YouTube",
      "Ad cutdowns & versioning",
      "Color grading & sound design",
    ],
    startingFrom: "From $500 / project", // TODO: real pricing or remove
  },
  {
    title: "Videography",
    description: "Cinematic coverage for stories that need moving pictures.",
    bullets: ["Single & multi-cam shoots", "Interviews & documentary", "Aerial coverage"],
  },
  {
    title: "Photography",
    description: "Stills that hold up in print, press, and pixels.",
    bullets: ["Editorial & lifestyle", "Product & studio", "Retouching included"],
  },
  {
    title: "Event Coverage",
    description: "Full coverage of the day, delivered as highlights and archives.",
    bullets: ["Conferences & summits", "Weddings & private events", "Same-week highlight cuts"],
  },
  {
    title: "Brand & PR Shoots",
    description: "Campaign imagery and coverage built around your message.",
    bullets: ["Campaign & lookbook shoots", "Press day coverage", "Social-ready deliverables"],
  },
  {
    title: "Commercial Production",
    description: "Concept to delivery for spots and launch films.",
    bullets: ["Concept & pre-production", "Full crew & direction", "Broadcast-ready masters"],
  },
];
