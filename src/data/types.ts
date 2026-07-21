/** Shared content types used across the data files. */

export type AspectRatio = "16:9" | "9:16" | "1:1";

/**
 * A real video reference. Add one to any project and the lightbox
 * will embed it automatically — no component changes needed.
 */
export type VideoSource = {
  provider: "youtube" | "vimeo";
  /** The video ID only (e.g. "dQw4w9WgXcQ"), not the full URL. */
  id: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  /** Optional small tag, e.g. the client type. */
  tag?: string;
  aspect: AspectRatio;
  /** TODO: add a real YouTube/Vimeo ID to light up the lightbox. */
  video?: VideoSource;
  /** Optional real thumbnail — set once a Sanity portfolio item has an image. */
  thumbnailUrl?: string;
  thumbnailAlt?: string;
};
