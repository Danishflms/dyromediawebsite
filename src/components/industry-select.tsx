"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { industries } from "@/data/industries";
import { cn } from "@/lib/cn";

/**
 * "Select your industry" menu. The only route into the per-industry work
 * pages — they aren't linked from the nav, the footer, or the sitemap.
 *
 * Built as a disclosure button over a list of links rather than a faked
 * listbox: these navigate, so real links keep the keyboard and
 * middle-click/open-in-new-tab behaviour people expect for free.
 */
export function IndustrySelect({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    // Close if focus tabs out of the menu entirely.
    const onFocusIn = (e: FocusEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="industry-menu"
        className={cn(
          "btn-ghost inline-flex h-12 cursor-pointer items-center justify-between gap-3 px-6",
          "font-mono text-xs tracking-[0.2em] uppercase",
        )}
      >
        Select your industry
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-300",
            open && "rotate-180",
          )}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <motion.div
          id="industry-menu"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 0.84, 0.44, 1] }}
          className={cn(
            "glass absolute left-1/2 z-40 mt-2 max-h-[19rem] w-[17rem] -translate-x-1/2 overflow-y-auto",
            "border border-line p-2 text-left shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9)]",
          )}
        >
          <ul className="flex flex-col">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-sm text-fg/80 transition-colors",
                    "hover:bg-white/[0.06] hover:text-fg focus-visible:bg-white/[0.06] focus-visible:text-fg",
                  )}
                >
                  {industry.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
