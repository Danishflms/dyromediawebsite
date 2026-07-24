"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// Edit this list to change the cycling words.
const WORDS = ["Plan", "Script", "Shoot", "Edit", "Deliver"] as const;

// Widest word — rendered invisibly to reserve width + baseline so nothing
// shifts as words change.
const SIZER = WORDS.reduce((a, b) => (b.length > a.length ? b : a));

const LINE = 1.3; // em — height of one word slot
const SLIDE_MS = 560;

/**
 * "We" + a word that auto-advances like a vertical carousel: the current
 * word slides up and out while the next slides in from below, on a timer.
 * Loops seamlessly. Auto-advance is disabled under prefers-reduced-motion.
 *
 * @param interval  Milliseconds each word is shown before advancing.
 */
export function RollingWords({
  interval = 2000,
  className,
}: {
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(true);

  // Advance on an interval (skip entirely under reduced motion).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    const id = window.setInterval(() => setIndex((i) => i + 1), interval);
    return () => window.clearInterval(id);
  }, [interval]);

  // Seamless loop: after sliding onto the appended clone of the first word,
  // snap back to the real first word with no transition.
  useEffect(() => {
    if (index === WORDS.length) {
      const t = window.setTimeout(() => {
        setAnimating(false);
        setIndex(0);
      }, SLIDE_MS);
      return () => window.clearTimeout(t);
    }
    if (!animating) {
      const r = requestAnimationFrame(() => setAnimating(true));
      return () => cancelAnimationFrame(r);
    }
  }, [index, animating]);

  const list = [...WORDS, WORDS[0]];

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.3em] font-display text-5xl leading-none tracking-tight md:text-6xl lg:text-7xl",
        className,
      )}
    >
      <span className="text-fg">We</span>
      {/* Outer box has no overflow so its baseline (from the inline spacer)
          aligns with "We"; clipping happens on the absolute child. */}
      <span className="relative inline-block" style={{ height: `${LINE}em` }}>
        <span aria-hidden="true" className="invisible" style={{ lineHeight: LINE }}>
          {SIZER}
        </span>
        <span className="absolute inset-0 overflow-hidden">
          <span
            className="flex flex-col"
            style={{
              transform: `translateY(-${index * LINE}em)`,
              transition: animating
                ? `transform ${SLIDE_MS}ms cubic-bezier(0.16,0.84,0.44,1)`
                : "none",
            }}
          >
            {list.map((word, i) => (
              <span
                key={i}
                aria-hidden={i !== index}
                className="text-metal block"
                style={{ height: `${LINE}em`, lineHeight: LINE }}
              >
                {word}
              </span>
            ))}
          </span>
        </span>
      </span>
    </span>
  );
}
