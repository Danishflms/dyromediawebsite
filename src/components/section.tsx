import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

/** Standard content container: ~1200px, centered, generous gutters. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-8", className)}>
      {children}
    </div>
  );
}

/** Mono uppercase label used above headings. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.25em] uppercase text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="mr-3 inline-block h-px w-6 translate-y-[-3px] bg-accent" />
      {children}
    </p>
  );
}

/**
 * Page section with hairline top divider, big vertical rhythm, and an
 * optional eyebrow + heading block. Reused across every page.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  divider = true,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section id={id} className={cn(divider && "border-t border-line", className)}>
      <Container className="py-20 md:py-36">
        {(eyebrow || title) && (
          <Reveal className="mb-10 max-w-2xl md:mb-16">
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="font-display text-metal-soft text-4xl leading-[1.05] tracking-tight md:text-5xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
