import { cn } from "@/lib/cn";
import type { ClientEntry } from "@/sanity/lib/fetch";

/** Baseline logo height, before aspect correction. */
const LOGO_BASE_PX = 38;

/** The canvas shape a logo file is assumed to have when we can't tell. */
const REFERENCE_ASPECT = 2.5;

/**
 * Works out how tall a logo should render.
 *
 * Sizing purely by height punishes square logo files: a wide wordmark
 * exported on a 320x320 canvas sits in a thin band with big transparent
 * margins, so at a fixed height the visible mark is a fraction of its box
 * while a 4:1 file of the same height reads huge. Scaling inversely with
 * the square root of the aspect ratio evens out how much ink each one puts
 * on screen. `logoScale` from the CMS is the manual override on top.
 */
function logoHeightPx(client: ClientEntry) {
  const aspect = client.logoAspect && client.logoAspect > 0 ? client.logoAspect : REFERENCE_ASPECT;
  const aspectCorrection = Math.min(Math.max(Math.sqrt(REFERENCE_ASPECT / aspect), 0.8), 1.7);
  const manual = (client.logoScale ?? 100) / 100;
  return Math.round(LOGO_BASE_PX * aspectCorrection * manual);
}

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
      // Ask for a tall source so it stays crisp when scaled up.
      src={`${client.logoUrl}?h=240&fit=max&auto=format`}
      alt={duplicate ? "" : client.name}
      loading="lazy"
      draggable={false}
      // Height drives the size; width follows the aspect ratio. Declaring
      // the ratio reserves the width before the lazy image arrives, so the
      // strip doesn't shift as logos load in.
      style={{
        height: `${logoHeightPx(client)}px`,
        aspectRatio: client.logoAspect ? String(client.logoAspect) : undefined,
      }}
      className={cn(
        "w-auto max-w-[220px] object-contain opacity-75 grayscale",
        "transition duration-300 ease-out",
        "group-hover/mark:opacity-100 group-hover/mark:grayscale-0",
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

  // min-height (not a fixed height) so a scaled-up logo grows the row
  // instead of being clipped by it.
  const shared =
    "group/mark flex min-h-14 shrink-0 items-center transition-transform duration-300 ease-out hover:scale-[1.06] motion-reduce:hover:scale-100";

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
