"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { Magnetic } from "./magnetic";
import { Wordmark as BrandMark } from "./wordmark";

function Wordmark() {
  return (
    <Link
      href="/"
      className="text-[17px] text-fg"
      aria-label="Dyro Media — home"
    >
      <BrandMark />
    </Link>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on route change (state adjustment during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Escape closes the overlay; lock body scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line glass"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:h-20 md:px-8">
        <Wordmark />

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "link-underline font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-200",
                isActive(link.href)
                  ? "text-accent"
                  : "text-muted hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Magnetic>
            <Link
              href="/book"
              className="btn-liquid inline-flex h-10 cursor-pointer items-center px-5 font-mono text-xs tracking-[0.18em] uppercase active:scale-[0.97]"
            >
              <span className="relative z-[2]">Book a Call</span>
            </Link>
          </Magnetic>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[7px] md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-fg transition-transform duration-300",
              open && "translate-y-1 rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-fg transition-transform duration-300",
              open && "-translate-y-1 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile overlay — animated in, unmounted instantly on close. */}
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 top-16 z-40 flex flex-col bg-bg px-6 pt-10 md:hidden"
        >
            <ul className="flex flex-col gap-2">
              {site.nav.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block py-3 text-3xl tracking-tight transition-colors",
                      isActive(link.href) ? "text-accent" : "text-fg",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + site.nav.length * 0.05, duration: 0.3 }}
              className="mt-8"
            >
              <Link
                href="/book"
                className="btn-liquid inline-flex h-12 items-center px-7 font-mono text-xs tracking-[0.2em] uppercase"
              >
                <span className="relative z-[2]">Book a Call</span>
              </Link>
            </motion.div>
        </motion.nav>
      )}
    </header>
  );
}
