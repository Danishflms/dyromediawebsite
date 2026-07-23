"use client";

import { useState } from "react";
import type { AspectRatio, VideoSource } from "@/data/types";
import { cn } from "@/lib/cn";

const aspectClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

/** Muted, looping, no-chrome autoplay — the preview state. */
function mutedSrc(v: VideoSource) {
  if (v.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=1&loop=1&playlist=${v.id}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1`;
  }
  return `https://player.vimeo.com/video/${v.id}?autoplay=1&muted=1&loop=1&background=1`;
}

/** Full playback with sound + controls — after the viewer clicks. */
function soundSrc(v: VideoSource) {
  if (v.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=0&loop=1&playlist=${v.id}&controls=1&playsinline=1&rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${v.id}?autoplay=1&muted=0&loop=1&controls=1`;
}

/**
 * Plays a portfolio video muted-on-loop inline (browsers only allow
 * autoplay when muted). Clicking swaps to a full player with sound and
 * controls — so the whole Selected Work grid stays alive but quiet until
 * a viewer chooses one.
 */
export function AutoplayVideo({
  video,
  aspect,
  title,
}: {
  video: VideoSource;
  aspect: AspectRatio;
  title: string;
}) {
  const [withSound, setWithSound] = useState(false);

  return (
    <div
      data-cursor="play"
      className={cn("relative overflow-hidden border border-white/10 bg-black", aspectClasses[aspect])}
    >
      <iframe
        src={withSound ? soundSrc(video) : mutedSrc(video)}
        title={title}
        loading="lazy"
        className={cn("absolute inset-0 h-full w-full", !withSound && "pointer-events-none")}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
      />
      {!withSound && (
        <button
          type="button"
          onClick={() => setWithSound(true)}
          aria-label={`Play ${title} with sound`}
          className="group/sound absolute inset-0 flex items-end justify-start p-3 md:p-4"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-fg transition-colors group-hover/sound:text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4z" />
              <path d="M17 9l4 6M21 9l-4 6" />
            </svg>
            Sound off
          </span>
        </button>
      )}
    </div>
  );
}
