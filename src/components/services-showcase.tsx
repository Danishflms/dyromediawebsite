import Link from "next/link";
import { servicesShowcase } from "@/data/home";
import { cn } from "@/lib/cn";
import { Container, Eyebrow } from "./section";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";

/**
 * Per-row direction and pace. Alternating direction keeps the rows from
 * reading as one block, and the odd durations stop them syncing up.
 * All sit in the slow 40–60s band so they never pull focus.
 */
const ROWS = [
  { animation: "animate-marquee-reverse", duration: "52s" }, // drifts right
  { animation: "animate-marquee", duration: "46s" }, // drifts left
  { animation: "animate-marquee-reverse", duration: "58s" }, // drifts right
] as const;

/**
 * Tint cycle for the pills. Deliberately neutral rather than pastel — the
 * site runs a strict black/white/silver system, so variation comes from
 * how much light each pill catches, not from hue.
 */
const TINTS = [
  "bg-white/[0.06] border-white/[0.10]",
  "bg-white/[0.03] border-white/[0.07]",
  "bg-white/[0.08] border-white/[0.13]",
  "bg-white/[0.04] border-white/[0.09]",
] as const;

const DOTS = ["bg-white/80", "bg-silver/70", "bg-muted/70", "bg-white/55"] as const;

function Pill({ label, index }: { label: string; index: number }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-fg/80",
        "md:gap-2.5 md:px-4 md:py-2 md:text-sm",
        TINTS[index % TINTS.length],
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOTS[index % DOTS.length])}
      />
      {label}
    </span>
  );
}

function MarqueeRow({
  tags,
  label,
  animation,
  duration,
}: {
  tags: readonly string[];
  label: string;
  animation: string;
  duration: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      // Deliberately no `marquee-pause` here: these tags aren't
      // interactive, so the rows keep drifting through hover. The client
      // strip still pauses, since those marks are links.
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={cn("flex w-max items-center gap-3 pr-3 md:gap-4 md:pr-4", animation)}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {tags.map((tag, i) => (
          <Pill key={`a-${tag}`} label={tag} index={i} />
        ))}
        {/* Second pass makes the loop seamless; hidden from assistive tech
            so the list isn't announced twice. */}
        {tags.map((tag, i) => (
          <span key={`b-${tag}`} aria-hidden="true" className="contents">
            <Pill label={tag} index={i} />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Everything we offer, as three drifting rows of capability tags with the
 * services CTA floating over them.
 */
export function ServicesShowcase() {
  const { headline, rows, cta } = servicesShowcase;

  return (
    <section className="border-t border-line">
      <Container className="py-20 md:py-36">
        <Reveal className="mb-10 max-w-2xl md:mb-16">
          <Eyebrow className="mb-5">What we offer</Eyebrow>
          <h2 className="font-display text-metal-soft text-4xl leading-[1.05] tracking-tight md:text-5xl">
            {headline.lead}{" "}
            <em className="text-metal italic">{headline.emphasis}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="flex flex-col gap-3 md:gap-4">
              {rows.map((row, i) => (
                <MarqueeRow
                  key={row.label}
                  tags={row.tags}
                  label={row.label}
                  animation={ROWS[i].animation}
                  duration={ROWS[i].duration}
                />
              ))}
            </div>

            {/* Floats over the rows; the wrapper stays click-through so
                hovering the tags still pauses them. */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Magnetic radius={96} className="pointer-events-auto">
                <Link
                  href={cta.href}
                  className={cn(
                    "inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-6 md:px-7",
                    "font-mono text-[11px] tracking-[0.2em] uppercase text-bg md:text-xs",
                    "shadow-[0_16px_44px_-12px_rgba(0,0,0,0.9)]",
                    "transition-colors duration-300 hover:bg-white active:scale-[0.97]",
                  )}
                >
                  {cta.label}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
