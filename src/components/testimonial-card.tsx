import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/cn";

export function TestimonialCard({
  testimonial,
  large = false,
}: {
  testimonial: Testimonial;
  large?: boolean;
}) {
  return (
    <figure className={cn("glass-panel h-full", large ? "p-7 md:p-14" : "p-6 md:p-10")}>
      <span
        aria-hidden="true"
        className={cn(
          "text-metal font-display leading-none",
          large ? "text-6xl" : "text-5xl",
        )}
      >
        &ldquo;
      </span>
      <blockquote
        className={cn(
          "mt-3 leading-relaxed text-fg/90",
          large ? "text-xl md:text-2xl" : "text-base",
        )}
      >
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6">
        <p className="text-sm font-medium text-fg">{testimonial.name}</p>
        <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
          {testimonial.role}
        </p>
      </figcaption>
    </figure>
  );
}
