import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/cn";

/** Initials fallback when a testimonial has no photo. */
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialCard({
  testimonial,
  large = false,
}: {
  testimonial: Testimonial;
  large?: boolean;
}) {
  const { quote, name, role, result, photoUrl } = testimonial;

  return (
    <figure className={cn("glass-panel flex h-full flex-col", large ? "p-7 md:p-14" : "p-6 md:p-10")}>
      <span
        aria-hidden="true"
        className={cn("text-metal font-display leading-none", large ? "text-6xl" : "text-5xl")}
      >
        &ldquo;
      </span>

      <blockquote
        className={cn(
          "mt-3 leading-relaxed text-fg/90",
          large ? "text-xl md:text-2xl" : "text-base",
        )}
      >
        {quote}
      </blockquote>

      {/* Result — deliberately set apart from the quote: chrome display
          type, tabular figures, its own labelled row. Emphasis comes from
          scale and contrast, not colour (the palette is monochrome). */}
      {result && (
        <div className="mt-6 flex items-baseline gap-3 border-t border-line pt-6">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
            Result
          </span>
          <span
            className={cn(
              "text-metal font-display leading-none tracking-tight tabular-nums",
              large ? "text-3xl md:text-4xl" : "text-2xl",
            )}
          >
            {result}
          </span>
        </div>
      )}

      <figcaption className="mt-auto flex items-center gap-4 pt-8">
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
            "border border-white/15 bg-white/[0.06]",
            large ? "h-12 w-12" : "h-10 w-10",
          )}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${photoUrl}?w=112&h=112&fit=crop&crop=center&auto=format`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-mono text-[11px] tracking-[0.1em] text-silver">
              {initials(name)}
            </span>
          )}
        </span>
        <div>
          <p className="text-sm font-medium text-fg">{name}</p>
          <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
            {role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
