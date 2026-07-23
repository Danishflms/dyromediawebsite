import { unstable_cache } from "next/cache";
import { client } from "./client";
import { isSanityConfigured } from "../env";
import type { Project } from "@/data/types";

import { hero, whatWeDo, selectedWork, stats, clients } from "@/data/home";
import { editingHero, editingProjects, editingProcess } from "@/data/editing";
import {
  productionHero,
  shootTypes,
  productionCategories,
  productionProjects,
} from "@/data/production";
import { aboutHero, whoWeAre, philosophy, capabilities } from "@/data/about";
import { servicesHero, services as localServices } from "@/data/services";
import { testimonials as localTestimonials } from "@/data/testimonials";
import { site } from "@/data/site";

import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  EDITING_PAGE_QUERY,
  PRODUCTION_PAGE_QUERY,
  ABOUT_PAGE_QUERY,
  SERVICES_PAGE_QUERY,
  PORTFOLIO_ITEMS_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
} from "./queries";

/**
 * Every fetcher below follows the same shape: try Sanity, merge whatever
 * fields are actually filled in over the site's local placeholder content,
 * and fall back to that placeholder content entirely on any error or when
 * a field is left blank in the Studio. Nothing on the live site can go
 * blank because of a missing Sanity document, a typo, or a network hiccup.
 */

/** Overlay Sanity's fields onto a fallback object, skipping unset ones. */
function mergeDefined<T extends Record<string, unknown>>(
  base: T,
  overrides: Partial<T> | null | undefined,
): T {
  if (!overrides) return base;
  const result = { ...base };
  for (const key of Object.keys(base) as (keyof T)[]) {
    const value = overrides[key];
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    result[key] = value as T[keyof T];
  }
  return result;
}

/** Wraps a Sanity fetch so any failure (bad env, network, empty dataset) is silent. */
async function safeFetch<T>(query: string, tag: string): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch<T>(query);
  } catch (err) {
    console.error(`[sanity] fetch failed for "${tag}", using local fallback:`, err);
    return null;
  }
}

/** Cache indefinitely; only a webhook-triggered revalidateTag(tag) invalidates it. */
function cached<T>(fn: () => Promise<T>, tag: string) {
  return unstable_cache(fn, ["sanity", tag], { tags: [tag] });
}

// ── Site settings ──────────────────────────────────────────────────────

type SiteSettingsDoc = {
  tagline?: string;
  description?: string;
  footerBlurb?: string;
  calendlyUrl?: string;
  contactEmail?: string;
  whatsappUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  ctaEyebrow?: string;
  ctaLine?: string;
  ctaButtonLabel?: string;
};

export type SiteSettingsContent = {
  tagline: string;
  description: string;
  footerBlurb: string;
  calendlyUrl: string;
  contactEmail: string;
  whatsappUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  ctaEyebrow: string;
  ctaLine: string;
  ctaButtonLabel: string;
};

export const getSiteSettings = cached(async (): Promise<SiteSettingsContent> => {
  const doc = await safeFetch<SiteSettingsDoc>(SITE_SETTINGS_QUERY, "siteSettings");
  const base: SiteSettingsContent = {
    tagline: site.tagline,
    description: site.description,
    footerBlurb: site.footerBlurb,
    calendlyUrl: site.calendlyUrl,
    contactEmail: site.contact.email,
    whatsappUrl: site.contact.whatsapp,
    instagramUrl: site.social.instagram,
    linkedinUrl: site.social.linkedin,
    ctaEyebrow: site.ctaBand.eyebrow,
    ctaLine: site.ctaBand.line,
    ctaButtonLabel: site.ctaBand.button,
  };
  return mergeDefined(base, doc);
}, "siteSettings");

// ── Home page ───────────────────────────────────────────────────────────

type HomePageDoc = {
  heroEyebrow?: string;
  heroHeadlineLine1?: string;
  heroHeadlineLine2?: string;
  heroSubhead?: string;
  heroPrimaryCtaLabel?: string;
  heroSecondaryCtaLabel?: string;
  heroBackgroundImageUrl?: string;
  heroBackgroundVideoUrl?: string;
  whatWeDoEditingTitle?: string;
  whatWeDoEditingDescription?: string;
  whatWeDoProductionTitle?: string;
  whatWeDoProductionDescription?: string;
  stats?: { value: string; label: string }[];
  clients?: ClientEntry[];
  clientNames?: string[];
};

/** A brand or creator in the client strip — logo, styled text, or either plus a link. */
export type ClientEntry = {
  name: string;
  url?: string;
  logoUrl?: string;
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    headline: [string, string];
    subhead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    backgroundImageUrl?: string;
    backgroundVideoUrl?: string;
  };
  whatWeDo: { title: string; href: string; description: string }[];
  stats: { value: string; label: string }[];
  clients: ClientEntry[];
};

export const getHomeContent = cached(async (): Promise<HomeContent> => {
  const doc = await safeFetch<HomePageDoc>(HOME_PAGE_QUERY, "homePage");

  return {
    hero: {
      eyebrow: doc?.heroEyebrow?.trim() || hero.eyebrow,
      headline: [
        doc?.heroHeadlineLine1?.trim() || hero.headline[0],
        doc?.heroHeadlineLine2?.trim() || hero.headline[1],
      ],
      subhead: doc?.heroSubhead?.trim() || hero.subhead,
      primaryCta: {
        label: doc?.heroPrimaryCtaLabel?.trim() || hero.primaryCta.label,
        href: hero.primaryCta.href,
      },
      secondaryCta: {
        label: doc?.heroSecondaryCtaLabel?.trim() || hero.secondaryCta.label,
        href: hero.secondaryCta.href,
      },
      backgroundImageUrl: doc?.heroBackgroundImageUrl,
      backgroundVideoUrl: doc?.heroBackgroundVideoUrl || hero.showreelSrc,
    },
    whatWeDo: [
      {
        title: doc?.whatWeDoEditingTitle?.trim() || whatWeDo[0].title,
        href: whatWeDo[0].href,
        description: doc?.whatWeDoEditingDescription?.trim() || whatWeDo[0].description,
      },
      {
        title: doc?.whatWeDoProductionTitle?.trim() || whatWeDo[1].title,
        href: whatWeDo[1].href,
        description: doc?.whatWeDoProductionDescription?.trim() || whatWeDo[1].description,
      },
    ],
    stats: doc?.stats?.length ? doc.stats : [...stats],
    // Prefer the richer Clients field; fall back to the older plain-text
    // client names so nothing disappears before they're migrated.
    clients: doc?.clients?.length
      ? doc.clients
      : doc?.clientNames?.length
        ? doc.clientNames.map((name) => ({ name }))
        : [...clients],
  };
}, "homePage");

// ── Editing page ────────────────────────────────────────────────────────

type EditingPageDoc = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubhead?: string;
  process?: { step: string; title: string; description: string }[];
};

export type EditingContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  process: { step: string; title: string; description: string }[];
};

export const getEditingPageContent = cached(async (): Promise<EditingContent> => {
  const doc = await safeFetch<EditingPageDoc>(EDITING_PAGE_QUERY, "editingPage");
  return {
    hero: {
      eyebrow: doc?.heroEyebrow?.trim() || editingHero.eyebrow,
      headline: doc?.heroHeadline?.trim() || editingHero.headline,
      subhead: doc?.heroSubhead?.trim() || editingHero.subhead,
    },
    process: doc?.process?.length ? doc.process : [...editingProcess],
  };
}, "editingPage");

// ── Production page ─────────────────────────────────────────────────────

type ProductionPageDoc = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubhead?: string;
  shootTypes?: string[];
  categoryOrder?: string[];
};

export type ProductionContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  shootTypes: string[];
  categoryOrder: string[];
};

export const getProductionPageContent = cached(async (): Promise<ProductionContent> => {
  const doc = await safeFetch<ProductionPageDoc>(PRODUCTION_PAGE_QUERY, "productionPage");
  return {
    hero: {
      eyebrow: doc?.heroEyebrow?.trim() || productionHero.eyebrow,
      headline: doc?.heroHeadline?.trim() || productionHero.headline,
      subhead: doc?.heroSubhead?.trim() || productionHero.subhead,
    },
    shootTypes: doc?.shootTypes?.length ? doc.shootTypes : [...shootTypes],
    categoryOrder: doc?.categoryOrder?.length ? doc.categoryOrder : [...productionCategories],
  };
}, "productionPage");

// ── About page ───────────────────────────────────────────────────────────

type AboutPageDoc = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubhead?: string;
  whoWeAreEyebrow?: string;
  whoWeAreTitle?: string;
  whoWeAreParagraphs?: string[];
  philosophyEyebrow?: string;
  philosophyTitle?: string;
  philosophyItems?: { title: string; description: string }[];
  capabilitiesEyebrow?: string;
  capabilitiesTitle?: string;
  capabilitiesItems?: string[];
};

export type AboutContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
  whoWeAre: { eyebrow: string; title: string; paragraphs: string[] };
  philosophy: { eyebrow: string; title: string; items: { title: string; description: string }[] };
  capabilities: { eyebrow: string; title: string; items: string[] };
};

export const getAboutPageContent = cached(async (): Promise<AboutContent> => {
  const doc = await safeFetch<AboutPageDoc>(ABOUT_PAGE_QUERY, "aboutPage");
  return {
    hero: {
      eyebrow: doc?.heroEyebrow?.trim() || aboutHero.eyebrow,
      headline: doc?.heroHeadline?.trim() || aboutHero.headline,
      subhead: doc?.heroSubhead?.trim() || aboutHero.subhead,
    },
    whoWeAre: {
      eyebrow: doc?.whoWeAreEyebrow?.trim() || whoWeAre.eyebrow,
      title: doc?.whoWeAreTitle?.trim() || whoWeAre.title,
      paragraphs: doc?.whoWeAreParagraphs?.length ? doc.whoWeAreParagraphs : [...whoWeAre.paragraphs],
    },
    philosophy: {
      eyebrow: doc?.philosophyEyebrow?.trim() || philosophy.eyebrow,
      title: doc?.philosophyTitle?.trim() || philosophy.title,
      items: doc?.philosophyItems?.length ? doc.philosophyItems : [...philosophy.items],
    },
    capabilities: {
      eyebrow: doc?.capabilitiesEyebrow?.trim() || capabilities.eyebrow,
      title: doc?.capabilitiesTitle?.trim() || capabilities.title,
      items: doc?.capabilitiesItems?.length ? doc.capabilitiesItems : [...capabilities.items],
    },
  };
}, "aboutPage");

// ── Services page (hero only — cards below) ─────────────────────────────

type ServicesPageDoc = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubhead?: string;
};

export type ServicesPageContent = {
  hero: { eyebrow: string; headline: string; subhead: string };
};

export const getServicesPageContent = cached(async (): Promise<ServicesPageContent> => {
  const doc = await safeFetch<ServicesPageDoc>(SERVICES_PAGE_QUERY, "servicesPage");
  return {
    hero: {
      eyebrow: doc?.heroEyebrow?.trim() || servicesHero.eyebrow,
      headline: doc?.heroHeadline?.trim() || servicesHero.headline,
      subhead: doc?.heroSubhead?.trim() || servicesHero.subhead,
    },
  };
}, "servicesPage");

// ── Portfolio items ──────────────────────────────────────────────────────

type PortfolioItemDoc = {
  _id: string;
  title: string;
  offering: "editing" | "production";
  category: string;
  clientType?: string;
  aspectRatio: Project["aspect"];
  video?: { provider: "youtube" | "vimeo"; videoId: string };
  thumbnail?: { url: string; alt?: string } | null;
  featuredOnHome?: boolean;
  order: number;
};

function toProject(doc: PortfolioItemDoc): Project {
  return {
    id: doc._id,
    title: doc.title,
    category: doc.category,
    tag: doc.clientType,
    aspect: doc.aspectRatio,
    video: doc.video ? { provider: doc.video.provider, id: doc.video.videoId } : undefined,
    thumbnailUrl: doc.thumbnail?.url,
    thumbnailAlt: doc.thumbnail?.alt,
  };
}

const getPortfolioItems = cached(async (): Promise<PortfolioItemDoc[]> => {
  const docs = await safeFetch<PortfolioItemDoc[]>(PORTFOLIO_ITEMS_QUERY, "portfolioItem");
  return docs ?? [];
}, "portfolioItem");

export async function getEditingPortfolio(): Promise<Project[]> {
  const docs = await getPortfolioItems();
  const editingDocs = docs.filter((d) => d.offering === "editing");
  return editingDocs.length ? editingDocs.map(toProject) : [...editingProjects];
}

export async function getProductionPortfolio(): Promise<(Project & { category: string })[]> {
  const docs = await getPortfolioItems();
  const productionDocs = docs.filter((d) => d.offering === "production");
  return productionDocs.length
    ? productionDocs.map(toProject)
    : productionProjects.map((p) => ({ ...p }));
}

export async function getHomeSelectedWork(): Promise<Project[]> {
  const docs = await getPortfolioItems();
  const featured = docs.filter((d) => d.featuredOnHome);
  if (!featured.length) return [...selectedWork];
  return featured.map((d) => ({
    ...toProject(d),
    tag: d.offering === "editing" ? "Editing" : "Production",
  }));
}

// ── Services (list) ──────────────────────────────────────────────────────

export type ServiceContent = {
  title: string;
  description: string;
  bullets: string[];
  startingFrom?: string;
};

export const getServices = cached(async (): Promise<ServiceContent[]> => {
  const docs = await safeFetch<ServiceContent[]>(SERVICES_QUERY, "service");
  return docs?.length ? docs : [...localServices];
}, "service");

// ── Testimonials ─────────────────────────────────────────────────────────

export type TestimonialContent = { quote: string; name: string; role: string };

export const getTestimonials = cached(async (): Promise<TestimonialContent[]> => {
  const docs = await safeFetch<TestimonialContent[]>(TESTIMONIALS_QUERY, "testimonial");
  return docs?.length ? docs : [...localTestimonials];
}, "testimonial");
