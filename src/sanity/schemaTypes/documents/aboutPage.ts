import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/** About page singleton — hero, "who we are", philosophy, and capabilities. */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: makeIcon("users"),
  groups: [
    { name: "hero", title: "Hero" },
    { name: "whoWeAre", title: "Who We Are" },
    { name: "philosophy", title: "Philosophy" },
    { name: "capabilities", title: "Capabilities" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow label", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string", group: "hero" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3, group: "hero" }),

    defineField({ name: "whoWeAreEyebrow", title: "Eyebrow label", type: "string", group: "whoWeAre" }),
    defineField({ name: "whoWeAreTitle", title: "Title", type: "string", group: "whoWeAre" }),
    defineField({
      name: "whoWeAreParagraphs",
      title: "Paragraphs",
      type: "array",
      group: "whoWeAre",
      of: [{ type: "text", rows: 3 }],
      description: "Leave empty to keep the current placeholder copy.",
    }),

    defineField({ name: "philosophyEyebrow", title: "Eyebrow label", type: "string", group: "philosophy" }),
    defineField({ name: "philosophyTitle", title: "Title", type: "string", group: "philosophy" }),
    defineField({
      name: "philosophyItems",
      title: "Items",
      type: "array",
      group: "philosophy",
      of: [
        {
          type: "object",
          name: "philosophyItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),

    defineField({ name: "capabilitiesEyebrow", title: "Eyebrow label", type: "string", group: "capabilities" }),
    defineField({ name: "capabilitiesTitle", title: "Title", type: "string", group: "capabilities" }),
    defineField({
      name: "capabilitiesItems",
      title: "Items",
      type: "array",
      group: "capabilities",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
