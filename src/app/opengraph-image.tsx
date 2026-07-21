import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Generated Open Graph image (placeholder).
 * TODO: replace with a real branded image by dropping
 * `opengraph-image.png` (1200x630) into src/app/ and deleting this file.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0A0B",
          color: "#F4F4F2",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.3em",
            color: "#C6A15B",
          }}
        >
          DYRO MEDIA.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 72,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            width: 96,
            height: 2,
            backgroundColor: "#C6A15B",
          }}
        />
      </div>
    ),
    size,
  );
}
