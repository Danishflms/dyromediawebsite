"use client";

import { useEffect, useRef } from "react";

/**
 * Fraction of a viewport of scrolling over which the hero fades out.
 * Higher = the hero stays visible longer as the next section climbs up;
 * lower = it clears out sooner. This is the one dial for the effect's feel.
 */
const FADE_VIEWPORT_FRACTION = 0.75;

/**
 * Pins the hero (sticky) and fades it out over the first stretch of scroll,
 * so the next section rises up and takes its place while the hero stays put
 * rather than scrolling away with it.
 *
 * Why fade rather than cover with an opaque panel: the sections that scroll
 * over the hero stay transparent, so the site's ambient particle field
 * still shows through them. The hero is fully faded before the incoming
 * section reaches it, so the two never overlap while both are visible.
 */
export function HeroScrollFade({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const apply = () => {
      const fadeOver = window.innerHeight * FADE_VIEWPORT_FRACTION;
      const progress = Math.min(window.scrollY / fadeOver, 1);
      el.style.opacity = String(1 - progress);
      // Once invisible, drop out of hit-testing so nothing behind the
      // covering content can be clicked.
      el.style.pointerEvents = progress > 0.98 ? "none" : "";
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Negative z so the (non-positioned) sections below paint over the
    // pinned hero as they scroll up — still above the ambient FX, which
    // sit behind <main>.
    <div ref={ref} className="sticky top-0 -z-10">
      {children}
    </div>
  );
}
