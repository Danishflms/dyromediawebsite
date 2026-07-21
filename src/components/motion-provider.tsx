"use client";

import { MotionConfig } from "framer-motion";

/** Disables transform animations globally when the user prefers reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
