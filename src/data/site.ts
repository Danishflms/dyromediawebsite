/**
 * Global site configuration.
 * Every external link, contact detail, and shared line of copy lives here —
 * swap the TODO values and the whole site updates.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Dyro Media",
  wordmark: "DYRO MEDIA",
  tagline: "One Stop Solution to Your Production Needs",
  description:
    "Dyro Media is a full-service creative media agency and post-production house. We shoot, edit, and finish work for brands and creators worldwide.",

  // Footer "about" paragraph. TODO: confirm the numbers (years, projects, reach).
  footerBlurb:
    "For over seven years, Dyro Media has been a full-service creative media agency and post-production house. We're a tight team of editors, cinematographers, and directors who've delivered hundreds of projects for brands and creators across the globe — handling everything from the shoot to the final grade in-house. We treat every frame as if it carried our own name, and we deliver on the deadlines we set.",

  // TODO: replace with the production domain before deploying.
  url: "https://dyromedia.com",

  // TODO: replace with the real Calendly event URL.
  calendlyUrl: "https://calendly.com/dyro-media/intro",

  contact: {
    // TODO: replace with the real inbox.
    email: "hello@dyromedia.com",
    // TODO: replace with the real WhatsApp number (wa.me/<countrycode><number>).
    whatsapp: "https://wa.me/10000000000",
  },

  social: {
    // TODO: replace with real profile URLs.
    instagram: "https://instagram.com/dyromedia",
    linkedin: "https://linkedin.com/company/dyromedia",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Editing", href: "/editing" },
    { label: "Production", href: "/production" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
  ] satisfies NavLink[],

  ctaBand: {
    eyebrow: "Next step",
    line: "Let's build something worth watching.",
    button: "Book a Call",
  },
} as const;
