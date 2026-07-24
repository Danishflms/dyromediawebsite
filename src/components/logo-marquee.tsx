"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
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
 * Info card shown while a client is hovered. Portalled to <body> so the
 * marquee's overflow-hidden and its transformed track can't clip it, and
 * positioned as fixed above the mark (which is held still by the pause).
 */
function InfoCard({ client, anchor }: { client: ClientEntry; anchor: DOMRect }) {
  const WIDTH = 288;
  const GAP = 14;
  const x = Math.min(Math.max(anchor.left + anchor.width / 2, WIDTH / 2 + 12), window.innerWidth - WIDTH / 2 - 12);

  return createPortal(
    <div
      aria-hidden="true"
      className="glass pointer-events-none fixed z-[80] border border-line p-5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.95)]"
      style={{
        width: WIDTH,
        left: x,
        top: anchor.top - GAP,
        transform: "translate(-50%, -100%)",
      }}
    >
      <p className="text-sm font-medium text-fg">{client.name}</p>
      {client.about && (
        <p className="mt-2 text-xs leading-relaxed text-muted">{client.about}</p>
      )}
      {client.work && (
        <p className="mt-3 border-t border-line pt-3 text-xs leading-relaxed text-fg/75">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted">
            What we did
          </span>
          <br />
          {client.work}
        </p>
      )}
      {client.result && (
        <div className="mt-3 border-t border-line pt-3">
          <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted">
            Result
          </span>
          <p className="text-metal font-display text-2xl leading-tight tracking-tight tabular-nums">
            {client.result}
          </p>
        </div>
      )}
    </div>,
    document.body,
  );
}

/**
 * One client mark: an uploaded logo, or the name set as a typographic
 * wordmark when there's no logo. Dimmed at rest, lit on hover, clickable
 * when a link is set, and — when the client carries hover copy — anchors
 * an info card above itself.
 */
function ClientMark({
  client,
  duplicate = false,
}: {
  client: ClientEntry;
  duplicate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const hasCard = Boolean(client.about || client.work || client.result);

  const show = () => {
    if (hasCard && ref.current) setAnchor(ref.current.getBoundingClientRect());
  };
  const hide = () => setAnchor(null);

  const mark = client.logoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${client.logoUrl}?h=240&fit=max&auto=format`}
      alt={duplicate ? "" : client.name}
      loading="lazy"
      draggable={false}
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

  const shared =
    "group/mark flex min-h-14 shrink-0 items-center transition-transform duration-300 ease-out hover:scale-[1.06] motion-reduce:hover:scale-100";

  const handlers = { onMouseEnter: show, onMouseLeave: hide };

  const inner = client.url ? (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className={cn(shared, "cursor-pointer")}
      {...handlers}
    >
      {mark}
    </a>
  ) : (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      aria-hidden={duplicate || undefined}
      className={shared}
      {...handlers}
    >
      {mark}
    </span>
  );

  return (
    <>
      {inner}
      {anchor && <InfoCard client={client} anchor={anchor} />}
    </>
  );
}

/**
 * Scrolling client strip. Pure CSS animation, paused on hover/focus so the
 * links are catchable and the info cards can be read, and fully stopped
 * under prefers-reduced-motion.
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
