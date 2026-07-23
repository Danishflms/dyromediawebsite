import { defineArrayMember, defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/** Home page singleton — hero, "what we do" panels, stats, and client list. */
export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: makeIcon("home"),
  groups: [
    { name: "hero", title: "Hero" },
    { name: "whatWeDo", title: "What We Do" },
    { name: "stats", title: "Stats & Clients" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Eyebrow label",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineLine1",
      title: "Headline — line 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadlineLine2",
      title: "Headline — line 2",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubhead",
      title: "Subhead",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary button label",
      type: "string",
      group: "hero",
      initialValue: "Book a Call",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary button label",
      type: "string",
      group: "hero",
      initialValue: "View Our Work",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero background image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description: "Optional. Leave empty to keep the placeholder showreel frame.",
    }),
    defineField({
      name: "heroBackgroundVideo",
      title: "Hero background video",
      type: "file",
      group: "hero",
      options: { accept: "video/*" },
      description:
        "Optional muted looping background video. Takes priority over the background image if both are set.",
    }),
    defineField({
      name: "whatWeDoEditingTitle",
      title: "Editing panel title",
      type: "string",
      group: "whatWeDo",
      initialValue: "Editing",
    }),
    defineField({
      name: "whatWeDoEditingDescription",
      title: "Editing panel description",
      type: "text",
      rows: 2,
      group: "whatWeDo",
    }),
    defineField({
      name: "whatWeDoProductionTitle",
      title: "Production panel title",
      type: "string",
      group: "whatWeDo",
      initialValue: "Production",
    }),
    defineField({
      name: "whatWeDoProductionDescription",
      title: "Production panel description",
      type: "text",
      rows: 2,
      group: "whatWeDo",
    }),
    defineField({
      name: "stats",
      title: "Credibility stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      description: 'e.g. "7+" / "Years of craft". Leave empty to keep the current placeholder numbers.',
    }),
    defineField({
      name: "clients",
      title: "Clients",
      type: "array",
      group: "stats",
      description:
        "Brands and creators in the scrolling strip. Upload a logo, or leave the logo empty to show the name as styled text instead. Add a link and the mark becomes clickable.",
      of: [
        defineArrayMember({
          type: "object",
          name: "client",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description:
                "Shown as a styled wordmark when there's no logo, and used as the logo's alt text either way.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              description:
                "Optional. A transparent PNG or SVG works best. Leave empty for creators who only have a profile picture — the name shows as styled text instead.",
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              description:
                "Optional. Where clicking this client goes — their website, channel, or social page. Opens in a new tab.",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "url", media: "logo" },
          },
        }),
      ],
    }),
    defineField({
      name: "clientNames",
      title: "Client names (old)",
      type: "array",
      group: "stats",
      of: [{ type: "string" }],
      deprecated: {
        reason: 'Use the "Clients" field above instead — it supports logos and links.',
      },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
