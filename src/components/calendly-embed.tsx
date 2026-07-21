"use client";

import { InlineWidget } from "react-calendly";

/**
 * Calendly inline embed themed to match the site.
 * `calendlyUrl` comes from Sanity siteSettings (falls back to src/data/site.ts).
 */
export function CalendlyEmbed({ calendlyUrl }: { calendlyUrl: string }) {
  return (
    <div className="border border-line bg-surface">
      <InlineWidget
        url={calendlyUrl}
        styles={{ height: "700px" }}
        pageSettings={{
          backgroundColor: "141416",
          textColor: "f4f4f2",
          primaryColor: "c6a15b",
          hideGdprBanner: true,
        }}
      />
    </div>
  );
}
