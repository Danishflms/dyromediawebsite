import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/**
 * Site-wide settings singleton — footer blurb, contact details, socials,
 * the Calendly link, and the SEO description. Navigation links, the logo,
 * and the domain stay in code (structural, not content).
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: makeIcon("cog"),
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: 'Used in the browser tab title, e.g. "One Stop Solution to Your Production Needs".',
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "The default meta description used across search and social previews.",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer paragraph",
      type: "text",
      rows: 5,
      description: "The about-us paragraph shown under the logo in the footer.",
    }),
    defineField({
      name: "calendlyUrl",
      title: "Calendly URL",
      type: "url",
      description: "Every \"Book a Call\" button and the /book page point here.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.email().warning("Should be a valid email address."),
    }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp link",
      type: "url",
      description: 'A wa.me link, e.g. "https://wa.me/15551234567".',
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "ctaEyebrow",
      title: "CTA band label",
      type: "string",
      description: 'Small label above the closing call-to-action, e.g. "Next step".',
    }),
    defineField({
      name: "ctaLine",
      title: "CTA band default headline",
      type: "string",
      description: "Shown on pages that don't set their own closing line.",
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "CTA button label",
      type: "string",
      initialValue: "Book a Call",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
