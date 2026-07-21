import { NextStudioLayout, metadata, viewport } from "next-sanity/studio";

export { metadata, viewport };

/**
 * A separate root layout for the /studio route — it deliberately does NOT
 * share the marketing site's chrome (nav, footer, particles, fonts). This
 * is the standard next-sanity embedded-studio setup: the Studio manages
 * its own full-page UI.
 */
export default function StudioRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextStudioLayout>{children}</NextStudioLayout>
      </body>
    </html>
  );
}
