import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/** Production page singleton — hero copy, shoot-type chips, and category order. */
export const productionPage = defineType({
  name: "productionPage",
  title: "Production Page",
  type: "document",
  icon: makeIcon("presentation"),
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow label", type: "string" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3 }),
    defineField({
      name: "shootTypes",
      title: "Shoot types (chips)",
      type: "array",
      of: [{ type: "string" }],
      description: 'e.g. "Photography", "Videography". Leave empty to keep the current placeholder list.',
    }),
    defineField({
      name: "categoryOrder",
      title: "Portfolio category order",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Controls which Production portfolio categories appear, and in what order — must match the "Category" values used on Portfolio Items with Offering set to Production, e.g. "Weddings", "Events", "Brand", "PR", "Commercial". Leave empty to keep the current order.',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Production Page" }),
  },
});
