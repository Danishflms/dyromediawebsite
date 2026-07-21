import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/**
 * A single piece of work. `offering` decides whether it shows on the
 * Editing page or the Production page (and can feature on the home
 * teaser); `category` is the small label rendered on the card (e.g.
 * "Long-form", "Weddings").
 */
export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  icon: makeIcon("play"),
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "offering",
      title: "Offering",
      type: "string",
      description: "Which page this item belongs to.",
      options: {
        list: [
          { title: "Video Editing", value: "editing" },
          { title: "Full-Service Production", value: "production" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        'The small label shown on the card. Editing examples: "Long-form", "Short-form", "Ads". Production examples: "Weddings", "Events", "Brand", "PR", "Commercial".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientType",
      title: "Client type tag",
      type: "string",
      description:
        'Optional small tag under the title on Editing items, e.g. "Creator", "Brand", "Studio". Leave blank to hide.',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Not shown on the site yet — stored for a future caption/detail view.",
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
      options: {
        list: [
          { title: "16:9 (widescreen)", value: "16:9" },
          { title: "9:16 (vertical)", value: "9:16" },
          { title: "1:1 (square)", value: "1:1" },
        ],
        layout: "radio",
      },
      initialValue: "16:9",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "videoEmbed",
      description: "YouTube or Vimeo embed. Leave empty to show the placeholder frame.",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.warning("Add alt text for accessibility."),
        }),
      ],
      description: "Leave empty to keep the on-brand placeholder frame.",
    }),
    defineField({
      name: "featuredOnHome",
      title: "Feature on home page",
      type: "boolean",
      description: "Show this item in the homepage's Selected Work teaser.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers show first.",
      validation: (rule) => rule.required().integer(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      offering: "offering",
      category: "category",
      media: "thumbnail",
    },
    prepare: ({ title, offering, category, media }) => ({
      title,
      subtitle: `${offering === "editing" ? "Editing" : "Production"} · ${category ?? ""}`,
      media,
    }),
  },
});
