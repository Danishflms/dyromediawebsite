"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type CursorState = "default" | "link" | "play" | "hidden";

const DOT_PX = 7;
const RING_PX = 34;

/** How much of the gap the ring closes each frame — lower = more lag. */
const RING_EASE = 0.16;
/** Stop the loop once the ring is within this many px of the pointer. */
const SETTLE_PX = 0.15;

/** Ring size per state. Links get a nudge; playable media opens up more. */
const RING_SCALE: Record<CursorState, number> = {
  default: 1,
  link: 1.45,
  play: 2,
  hidden: 0.6,
};

/** Anything that should read as interactive without becoming a play cursor. */
const INTERACTIVE = 'a, button, [role="button"], summary, [data-cursor="link"]';
/** Form fields keep the native caret — a dot is useless for typing. */
const FIELDS = 'input, textarea, select, [contenteditable="true"]';

/**
 * Subscribes to the pointer-type media query. Server-renders as `false`
 * so touch devices (and the initial HTML) never get the custom cursor,
 * and it re-evaluates if the pointer type changes on a hybrid device.
 */
function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

/**
 * Two-part cursor: a dot pinned to the pointer and a ring that trails it.
 *
 * Position is written straight to `transform` from a rAF loop (never React
 * state, never a per-frame CSS transition) so tracking stays smooth; the
 * state changes — scaling the ring, morphing the dot into a play triangle —
 * are ordinary CSS transitions on *inner* elements, so the two never fight.
 *
 * Only runs on fine pointers. Touch devices keep the native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("hidden");
  // Only take over the cursor when there's a real mouse to track.
  const enabled = useFinePointer();

  // Hide the native cursor only while ours is actually running.
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");
    return () => root.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Honour reduced motion by dropping the lag, not the cursor itself.
    const ease = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : RING_EASE;

    let px = 0;
    let py = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let running = false;
    let seeded = false;

    const draw = () => {
      dot.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };

    const tick = () => {
      rx += (px - rx) * ease;
      ry += (py - ry) * ease;
      draw();
      if (Math.abs(px - rx) < SETTLE_PX && Math.abs(py - ry) < SETTLE_PX) {
        rx = px;
        ry = py;
        draw();
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;

      if (!seeded) {
        // First sighting: drop both parts on the pointer rather than
        // letting the ring fly in from the corner.
        seeded = true;
        rx = px;
        ry = py;
        draw();
        setState((s) => (s === "hidden" ? "default" : s));
        return;
      }

      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      // Order matters: a portfolio card is usually also a button.
      if (target.closest(FIELDS) || target.closest("iframe")) setState("hidden");
      else if (target.closest('[data-cursor="play"]')) setState("play");
      else if (target.closest(INTERACTIVE)) setState("link");
      else setState("default");
    };

    // relatedTarget is null when the pointer leaves the window entirely or
    // crosses into an iframe — in both cases we stop getting moves, so park
    // the cursor rather than leaving it frozen mid-page.
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setState("hidden");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isPlay = state === "play";
  const visible = state !== "hidden";
  const transition = "transform 180ms ease-out, opacity 180ms ease-out";

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      >
        <div
          className="rounded-full border"
          style={{
            width: RING_PX,
            height: RING_PX,
            borderColor: "rgba(255, 255, 255, 0.28)",
            transform: `translate(-50%, -50%) scale(${RING_SCALE[state]})`,
            opacity: visible ? 1 : 0,
            transition,
          }}
        />
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] text-fg will-change-transform"
      >
        <div className="relative flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span
            className="absolute rounded-full bg-fg"
            style={{
              width: DOT_PX,
              height: DOT_PX,
              transform: `scale(${isPlay ? 0.2 : 1})`,
              opacity: visible && !isPlay ? 1 : 0,
              transition,
            }}
          />
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute h-3.5 w-3.5"
            style={{
              transform: `scale(${isPlay ? 1 : 0.4})`,
              opacity: isPlay ? 1 : 0,
              transition,
            }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </>
  );
}
