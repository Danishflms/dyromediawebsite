import { cn } from "@/lib/cn";

/**
 * Dyro Media wordmark — the official "DYRO" logo (public/dyro-logo.svg,
 * cropped to the artwork bounds) paired with a spaced "MEDIA" descriptor.
 * The SVG is transparent, so it blends on any background.
 *
 * To update the logo, replace /public/dyro-logo.svg.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-flex items-center gap-[0.55em] leading-none", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/dyro-logo.svg"
        alt=""
        className="h-[0.9em] w-auto select-none"
        draggable={false}
      />
      <span className="font-mono text-[0.68em] font-medium tracking-[0.42em] text-muted">
        MEDIA
      </span>
    </span>
  );
}
