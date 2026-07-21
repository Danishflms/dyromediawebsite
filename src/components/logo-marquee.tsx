/**
 * Text-based client logo marquee. Pure CSS animation, paused entirely
 * under prefers-reduced-motion (see globals.css).
 */
export function LogoMarquee({ clients }: { clients: string[] }) {
  return (
    <div
      className="relative overflow-hidden py-2"
      role="img"
      aria-label={`Clients: ${clients.join(", ")}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-16 pr-16" aria-hidden="true">
        {[...clients, ...clients].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="whitespace-nowrap font-mono text-sm tracking-[0.3em] text-muted/60"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
