import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/**
 * Services page singleton — hero copy only. The service cards and
 * testimonials shown on this page are their own document types
 * (Service, Testimonial) so they can be reordered independently.
 */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  icon: makeIcon("stack-compact"),
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow label", type: "string" }),
    defineField({ name: "heroHeadline", title: "Headline", type: "string" }),
    defineField({ name: "heroSubhead", title: "Subhead", type: "text", rows: 3 }),
  ],
  preview: {
    prepare: () => ({ title: "Services Page" }),
  },
});
