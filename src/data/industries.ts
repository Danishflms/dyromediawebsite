/**
 * Industry verticals used by the "Select your industry" menu in Selected
 * Work, and by the unlisted /industries/[slug] pages behind it.
 *
 * This list is the single source of truth: it builds the menu, generates
 * the pages, and populates the Industry dropdown on Portfolio Items in
 * Sanity Studio. Add an entry here and all three follow.
 */

export type Industry = {
  /** URL segment — lowercase, hyphenated. Changing this changes the page URL. */
  slug: string;
  /** Shown in the menu and as the page heading. */
  label: string;
};

export const industries: Industry[] = [
  { slug: "health", label: "Health & Wellness" },
  { slug: "education", label: "Education" },
  { slug: "courses", label: "Online Courses" },
  { slug: "gaming", label: "Gaming" },
  { slug: "lifestyle", label: "Lifestyle" },
  { slug: "fitness", label: "Fitness & Sports" },
  { slug: "food", label: "Food & Beverage" },
  { slug: "travel", label: "Travel" },
  { slug: "technology", label: "Technology" },
  { slug: "fashion", label: "Fashion & Beauty" },
  { slug: "real-estate", label: "Real Estate" },
  { slug: "automotive", label: "Automotive" },
  { slug: "music", label: "Music & Entertainment" },
  { slug: "ecommerce", label: "E-commerce & Retail" },
  { slug: "events", label: "Events & Weddings" },
];

export function findIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
