import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/** One offering shown as a card on the Services page. */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: makeIcon("sparkles"),
  fields: [
    defineField({
      name: "title",
      title: "Service name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "One-line description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bullets",
      title: "Bullet points",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "icon",
      title: "Icon / image",
      type: "image",
      description: "Not shown on the site yet — stored for a future icon treatment.",
    }),
    defineField({
      name: "startingFrom",
      title: "Starting-from price",
      type: "string",
      description: 'Optional placeholder pricing, e.g. "From $500 / project". Leave blank to hide.',
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
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
    select: { title: "title", subtitle: "description" },
  },
});
