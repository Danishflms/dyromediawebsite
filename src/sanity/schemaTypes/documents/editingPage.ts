import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/** Editing page singleton — hero copy and the "how an edit moves" process steps. */
export const editingPage = defineType({
  name: "editingPage",
  title: "Editing Page",
  type: "document",
  icon: makeIcon("edit"),
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow label", type: "string" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3 }),
    defineField({
      name: "process",
      title: "Process steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "step", title: "Step number", type: "string", description: 'e.g. "01"' }),
            defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "step" } },
        },
      ],
      description: "Leave empty to keep the current 4-step placeholder.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Editing Page" }),
  },
});
