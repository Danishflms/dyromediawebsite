"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/** Cap on how far the element is allowed to drift from its resting spot. */
const MAX_OFFSET_PX = 24;

const clamp = (v: number, limit: number) => Math.min(Math.max(v, -limit), limit);

function isDisabled() {
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Wraps an interactive element so it drifts toward the cursor and springs
 * back on leave — the small "hand-crafted" tell on primary controls.
 * No-ops on touch and under reduced motion.
 *
 * By default it only reacts while the pointer is over the element. Pass a
 * `radius` (px) to switch to proximity mode: the element starts reaching
 * for the cursor as soon as it comes within that distance of the element's
 * edge, with the pull easing in as it gets closer so there's no jump at
 * the boundary.
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  radius,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 170, damping: 15, mass: 0.1 });

  // Proximity mode: track the cursor across the whole window.
  useEffect(() => {
    if (!radius) return;
    if (isDisabled()) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();

        // Distance from the cursor to the nearest edge of the element, so
        // `radius` means the same thing regardless of the element's size.
        const outX = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
        const outY = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
        const distance = Math.hypot(outX, outY);

        if (distance > radius) {
          x.set(0);
          y.set(0);
          return;
        }

        // Full pull when the cursor is on the element, fading to nothing
        // at the edge of the radius.
        const falloff = 1 - distance / radius;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(clamp(dx * strength * falloff, MAX_OFFSET_PX));
        y.set(clamp(dy * strength * falloff, MAX_OFFSET_PX));
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [radius, strength, x, y]);

  // Hover mode (the original behaviour) — only when no radius is given.
  const hoverHandlers = radius
    ? {}
    : {
        onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
          const el = ref.current;
          if (!el || isDisabled()) return;
          const rect = el.getBoundingClientRect();
          x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
          y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
        },
        onPointerLeave: () => {
          x.set(0);
          y.set(0);
        },
      };

  return (
    <motion.div
      ref={ref}
      {...hoverHandlers}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
