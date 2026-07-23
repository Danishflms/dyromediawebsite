"use client";

import { useEffect, useRef } from "react";

/**
 * How quickly the spotlight catches up to the cursor each frame.
 * Lower = slower and smoother. It previously snapped 1:1 to the pointer,
 * which read as twitchy; easing lets it drift after the cursor instead.
 */
const SPOTLIGHT_EASE = 0.05;

/** Stop the loop once we're within this many px of the cursor. */
const SETTLE_PX = 0.4;

/**
 * Site-wide ambient layer: a slowly drifting silver aurora, a soft
 * cursor-follow spotlight, and a fine film grain. Fixed behind all
 * content. The spotlight only runs on fine pointers with motion allowed.
 */
export function BackgroundFX() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    if (reduce.matches || !fine.matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let running = false;
    let seeded = false;

    const write = () => {
      el.style.setProperty("--mx", `${x.toFixed(1)}px`);
      el.style.setProperty("--my", `${y.toFixed(1)}px`);
    };

    // Start centred when the viewport is already measurable; if it isn't
    // yet, the first cursor position seeds it instead. Either way the glow
    // never eases in from the top-left corner.
    if (window.innerWidth > 0) {
      x = targetX = window.innerWidth / 2;
      y = targetY = window.innerHeight / 2;
      seeded = true;
      write();
    }

    const tick = () => {
      x += (targetX - x) * SPOTLIGHT_EASE;
      y += (targetY - y) * SPOTLIGHT_EASE;
      write();

      // Idle out once it has caught up, rather than burning a frame forever.
      if (Math.abs(targetX - x) < SETTLE_PX && Math.abs(targetY - y) < SETTLE_PX) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!seeded) {
        seeded = true;
        x = targetX;
        y = targetY;
        write();
        return;
      }

      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="fx-root">
      <div className="fx-aurora" />
      <div className="fx-spotlight" />
      <div className="fx-grain" />
    </div>
  );
}
