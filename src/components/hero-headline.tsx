"use client";

import { motion } from "framer-motion";

const EASE = [0.21, 0.6, 0.35, 1] as const;

/**
 * The centrepiece: oversized chrome headline that reveals word by word
 * with a soft blur lift, then holds a slow metallic shimmer. The second
 * line renders in italic display for editorial contrast.
 */
export function HeroHeadline({ lines }: { lines: string[] }) {
  const lineWords = lines.map((line) => line.split(" "));
  // Running word offset per line so stagger delays flow continuously.
  const offsets = lineWords.reduce<number[]>((acc, words, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + lineWords[i - 1].length);
    return acc;
  }, []);

  return (
    <h1 className="font-display text-[clamp(2.25rem,9vw,7.5rem)] leading-[1.06] tracking-tight md:leading-[1.02]">
      {lineWords.map((words, li) => (
        <span key={li} className="block">
          {words.map((word, wi) => (
            <motion.span
              key={`${li}-${wi}-${word}`}
              className={
                "text-metal text-metal-shimmer mr-[0.28em] inline-block last:mr-0" +
                (li === 1 ? " italic" : "")
              }
              initial={{ opacity: 0, y: "0.35em", filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.25 + (offsets[li] + wi) * 0.09,
                duration: 0.7,
                ease: EASE,
              }}
            >
              {word}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}
