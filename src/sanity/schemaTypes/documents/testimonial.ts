import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/** A client quote shown in the testimonial carousel. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: makeIcon("comment"),
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / company",
      type: "string",
      description: 'Combine title and company on one line, e.g. "Head of Brand, Northline".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Client photo",
      type: "image",
      options: { hotspot: true },
      description: "Shown as a round avatar next to the name. A head-and-shoulders shot works best.",
    }),
    defineField({
      name: "result",
      title: "Result",
      type: "string",
      description:
        "Optional, and highlighted separately from the quote. A single hard outcome, e.g. \"+2.4M views\", \"3x subscribers\", \"+180% watch time\".",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Controls the order testimonials appear in the carousel.",
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
    select: { title: "name", subtitle: "role" },
  },
});
