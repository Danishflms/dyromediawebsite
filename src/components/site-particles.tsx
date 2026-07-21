"use client";

import { useEffect, useState } from "react";
import { Particles } from "@/components/ui/particles";

/**
 * Site-wide ambient particle field. Fixed behind all content, sitting
 * underneath the aurora/grain layer. White points at low opacity read as
 * a faint drifting starfield — present but never legible enough to
 * distract. `animate` is off deliberately so the field stays monochrome.
 *
 * On phones the count is cut sharply — a continuous WebGL loop is a real
 * battery cost, and the field only needs to whisper.
 */
export function SiteParticles() {
  const [count, setCount] = useState(12000);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCount(mq.matches ? 4000 : 12000);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.2 }}
    >
      <Particles
        color="#ffffff"
        particleCount={count}
        particleSize={5}
        animate={false}
      />
    </div>
  );
}
