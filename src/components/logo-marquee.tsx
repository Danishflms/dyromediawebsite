import { cn } from "@/lib/cn";
import type { ClientEntry } from "@/sanity/lib/fetch";

/**
 * One client mark: an uploaded logo, or the name set as a typographic
 * wordmark when there's no logo (creators who only have a profile
 * picture). Dimmed at rest, lit on hover, and clickable when a link is set.
 *
 * The strip renders the list twice to loop seamlessly; the second pass is
 * hidden from assistive tech and taken out of the tab order so the links
 * aren't announced or focusable twice.
 */
function ClientMark({
  client,
  duplicate = false,
}: {
  client: ClientEntry;
  duplicate?: boolean;
}) {
  const mark = client.logoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${client.logoUrl}?h=96&fit=max&auto=format`}
      alt={duplicate ? "" : client.name}
      loading="lazy"
      draggable={false}
      className={cn(
        "h-7 w-auto max-w-[150px] object-contain opacity-55 grayscale",
        "transition duration-300 ease-out",
        "group-hover/mark:opacity-100 group-hover/mark:grayscale-0 md:h-8",
      )}
    />
  ) : (
    <span
      className={cn(
        "whitespace-nowrap text-[15px] font-semibold uppercase tracking-[0.16em] text-muted/60",
        "transition-colors duration-300 ease-out group-hover/mark:text-fg md:text-[17px]",
      )}
    >
      {client.name}
    </span>
  );

  const shared =
    "group/mark flex h-8 shrink-0 items-center transition-transform duration-300 ease-out hover:scale-[1.06] motion-reduce:hover:scale-100";

  if (!client.url) {
    return (
      <span aria-hidden={duplicate || undefined} className={shared}>
        {mark}
      </span>
    );
  }

  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className={cn(shared, "cursor-pointer")}
    >
      {mark}
    </a>
  );
}

/**
 * Scrolling client strip. Pure CSS animation, paused on hover/focus so the
 * links are actually catchable, and fully stopped under prefers-reduced-motion.
 */
export function LogoMarquee({ clients }: { clients: ClientEntry[] }) {
  if (!clients.length) return null;

  return (
    <div
      className="marquee-pause relative overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center gap-16 pr-16">
        {clients.map((client, i) => (
          <ClientMark key={`a-${client.name}-${i}`} client={client} />
        ))}
        {clients.map((client, i) => (
          <ClientMark key={`b-${client.name}-${i}`} client={client} duplicate />
        ))}
      </div>
    </div>
  );
}
