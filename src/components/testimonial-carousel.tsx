"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/data/testimonials";
import { TestimonialCard } from "./testimonial-card";
import { cn } from "@/lib/cn";

const EASE = [0.21, 0.6, 0.35, 1] as const;

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

/**
 * One testimonial at a time with arrows, clickable dots, drag/swipe, and
 * gentle autoplay. Autoplay pauses on hover/focus and is disabled under
 * prefers-reduced-motion. New testimonials just need to be added to the
 * data file — the controls scale automatically.
 */
export function TestimonialCarousel({
  items,
  autoPlayMs = 6000,
}: {
  items: Testimonial[];
  autoPlayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const paused = useRef(false);
  const count = items.length;

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  // Autoplay — forward, paused on interaction, off under reduced motion.
  useEffect(() => {
    if (count <= 1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const id = window.setInterval(() => {
      if (paused.current) return;
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [count, autoPlayMs]);

  if (count === 0) return null;

  return (
    <div
      className="mx-auto max-w-3xl"
      role="group"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
    >
      <div className="relative overflow-hidden">
        {/* Invisible sizer: stacks every testimonial in one grid cell so the
            box is always as tall as the LONGEST quote. Keeps the section
            below from jumping up and down as slides change. */}
        <div aria-hidden="true" className="grid">
          {items.map((item, i) => (
            <div key={i} className="invisible [grid-area:1/1]">
              <TestimonialCard testimonial={item} large />
            </div>
          ))}
        </div>

        {/* Active slide, overlaid on the fixed-height box. */}
        <div className="absolute inset-0">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction > 0 ? 56 : -56 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) next();
              else if (info.offset.x > 60) prev();
            }}
            className={cn("h-full", count > 1 && "cursor-grab active:cursor-grabbing")}
          >
            <TestimonialCard testimonial={items[index]} large />
          </motion.div>
        </div>
      </div>

      {/* Screen-reader announcement of the current slide. */}
      <p className="sr-only" aria-live="polite">
        Testimonial {index + 1} of {count}
      </p>

      {count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-muted transition-colors hover:border-white/40 hover:text-white"
          >
            <Chevron dir="left" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/60",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-muted transition-colors hover:border-white/40 hover:text-white"
          >
            <Chevron dir="right" />
          </button>
        </div>
      )}
    </div>
  );
}
