"use client";

import { useEffect, useRef } from "react";

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

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
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
