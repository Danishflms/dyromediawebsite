import { defineQuery } from "next-sanity";

const imageFragment = /* groq */ `{
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  alt
}`;

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    tagline,
    description,
    footerBlurb,
    calendlyUrl,
    contactEmail,
    whatsappUrl,
    instagramUrl,
    linkedinUrl,
    ctaEyebrow,
    ctaLine,
    ctaButtonLabel
  }
`);

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage"][0]{
    heroEyebrow,
    heroHeadlineLine1,
    heroHeadlineLine2,
    heroSubhead,
    heroPrimaryCtaLabel,
    heroSecondaryCtaLabel,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    "heroBackgroundVideoUrl": heroBackgroundVideo.asset->url,
    whatWeDoEditingTitle,
    whatWeDoEditingDescription,
    whatWeDoProductionTitle,
    whatWeDoProductionDescription,
    stats[]{ value, label },
    clients[]{
      name,
      url,
      logoScale,
      "logoUrl": logo.asset->url,
      "logoAspect": logo.asset->metadata.dimensions.aspectRatio
    },
    clientNames
  }
`);

export const EDITING_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "editingPage"][0]{
    heroEyebrow,
    heroHeadline,
    heroSubhead,
    process[]{ step, title, description }
  }
`);

export const PRODUCTION_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "productionPage"][0]{
    heroEyebrow,
    heroHeadline,
    heroSubhead,
    shootTypes,
    categoryOrder
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "aboutPage"][0]{
    heroEyebrow,
    heroHeadline,
    heroSubhead,
    whoWeAreEyebrow,
    whoWeAreTitle,
    whoWeAreParagraphs,
    philosophyEyebrow,
    philosophyTitle,
    philosophyItems[]{ title, description },
    capabilitiesEyebrow,
    capabilitiesTitle,
    capabilitiesItems
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "servicesPage"][0]{
    heroEyebrow,
    heroHeadline,
    heroSubhead
  }
`);

export const PORTFOLIO_ITEMS_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolioItem"] | order(order asc) {
    _id,
    title,
    offering,
    category,
    clientType,
    description,
    aspectRatio,
    video{ provider, videoId },
    "thumbnail": thumbnail${imageFragment},
    featuredOnHome,
    order
  }
`);

export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    bullets,
    startingFrom,
    order
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    name,
    role,
    order
  }
`);
