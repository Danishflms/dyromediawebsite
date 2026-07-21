"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/types";
import { MediaPlaceholder } from "./media-placeholder";
import { cn } from "@/lib/cn";

function embedUrl(video: NonNullable<Project["video"]>) {
  return video.provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${video.id}?autoplay=1`;
}

/**
 * Minimal video lightbox. If the project has a video ID it embeds it;
 * otherwise it shows an on-brand placeholder frame.
 * Entrance is animated; close unmounts immediately so nothing can
 * linger over the page.
 */
export function Lightbox({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const vertical = project.aspect === "9:16";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
        className={cn(
          "relative w-full",
          vertical ? "max-w-[min(88vw,48vh)]" : "max-w-5xl",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-fg">{project.title}</h2>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
              {project.category}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {project.video ? (
          <div className={cn("bg-surface", vertical ? "aspect-[9/16]" : "aspect-video")}>
            <iframe
              src={embedUrl(project.video)}
              title={project.title}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <MediaPlaceholder
            aspect={project.aspect}
            icon="play"
            label="Video placeholder — add an ID in src/data"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
