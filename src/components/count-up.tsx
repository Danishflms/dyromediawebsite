"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Splits a stat like "300+", "$500", or "14" into an animatable number
 * plus whatever wraps it. Returns null for values with no digits.
 */
function parse(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3],
  };
}

/**
 * Counts from 0 up to the target value when it first scrolls into view.
 * Renders the exact original string on the server, at rest, and once the
 * count finishes — so no-JS and reduced-motion visitors always see the
 * real number, and the final frame matches character-for-character.
 */
export function CountUp({ value, durationMs = 1600 }: { value: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const parsed = parse(value);
    if (!el || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const start = performance.now();
        setDisplay(`${parsed.prefix}0${parsed.suffix}`);
        const tick = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          if (t < 1) {
            const current = Math.round(eased * parsed.number).toLocaleString();
            setDisplay(`${parsed.prefix}${current}${parsed.suffix}`);
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(value); // exact original on the final frame
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
