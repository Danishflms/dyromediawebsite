import type { SchemaTypeDefinition } from "sanity";

import { videoEmbed } from "./objects/videoEmbed";

import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import { editingPage } from "./documents/editingPage";
import { productionPage } from "./documents/productionPage";
import { aboutPage } from "./documents/aboutPage";
import { servicesPage } from "./documents/servicesPage";
import { portfolioItem } from "./documents/portfolioItem";
import { service } from "./documents/service";
import { testimonial } from "./documents/testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    videoEmbed,
    // Singletons
    siteSettings,
    homePage,
    editingPage,
    productionPage,
    aboutPage,
    servicesPage,
    // Lists
    portfolioItem,
    service,
    testimonial,
  ],
};

/** Singleton document types — fixed `_id`, excluded from generic list views. */
export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "editingPage",
  "productionPage",
  "aboutPage",
  "servicesPage",
] as const;
