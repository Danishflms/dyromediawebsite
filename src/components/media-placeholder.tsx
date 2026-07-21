import Image from "next/image";
import { cn } from "@/lib/cn";
import type { AspectRatio } from "@/data/types";

const aspectClasses: Record<AspectRatio | "fill", string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  fill: "absolute inset-0",
};

const icons = {
  play: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-6 w-6" aria-hidden="true">
      <rect x="3" y="7" width="13" height="11" rx="1.5" />
      <path d="M16 10.5 21 8v9l-5-2.5z" />
    </svg>
  ),
  frame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-6 w-6" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <circle cx="9.5" cy="9.5" r="1.75" />
      <path d="M4 17l5-5 4 4 3-3 4 4" />
    </svg>
  ),
} as const;

/**
 * On-brand stand-in for media that hasn't been supplied yet. Pass
 * `imageUrl` (e.g. from a Sanity portfolio item's thumbnail) to render a
 * real image inside the same frame — the corner marks and reflection
 * overlay stay so it reads as one consistent system either way.
 */
export function MediaPlaceholder({
  aspect = "16:9",
  icon = "play",
  label,
  imageUrl,
  imageAlt = "",
  className,
}: {
  aspect?: AspectRatio | "fill";
  icon?: keyof typeof icons;
  label?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        "border border-white/10",
        aspectClasses[aspect],
        className,
      )}
      style={
        imageUrl
          ? undefined
          : {
              background:
                "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.06), rgba(255,255,255,0) 55%), linear-gradient(180deg, #17171a, #101012)",
            }
      }
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      )}

      {/* Faint diagonal reflection line. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.06) 50%, transparent 58%)",
        }}
      />

      {/* Corner registration marks — a nod to camera framing guides. */}
      <span aria-hidden="true" className="absolute left-3 top-3 h-2.5 w-2.5 border-l border-t border-white/20" />
      <span aria-hidden="true" className="absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-white/20" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-white/20" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-white/20" />

      {!imageUrl && (
        <>
          <span className="relative text-silver/70">{icons[icon]}</span>
          {label && (
            <span className="relative mt-3 px-4 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-muted/70">
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
