import { defineField, defineType } from "sanity";
import { makeIcon } from "../icon";

/**
 * A YouTube/Vimeo embed reference — matches the site's existing
 * `VideoSource` shape (src/data/types.ts) so portfolio items map straight
 * across with no lightbox changes required.
 */
export const videoEmbed = defineType({
  name: "videoEmbed",
  title: "Video embed",
  type: "object",
  icon: makeIcon("play"),
  fields: [
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
        ],
        layout: "radio",
      },
      initialValue: "youtube",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "videoId",
      title: "Video ID",
      type: "string",
      description:
        'The video ID only — e.g. "dQw4w9WgXcQ" from a YouTube URL, or the numeric ID from a Vimeo URL. Not the full link.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { provider: "provider", videoId: "videoId" },
    prepare: ({ provider, videoId }) => ({
      title: videoId || "No video ID set",
      subtitle: provider,
    }),
  },
});
