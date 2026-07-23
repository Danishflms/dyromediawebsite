import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Project } from "@/data/types";
import { MediaPlaceholder } from "./media-placeholder";

/**
 * Presentational project card. Wrap it in a <button> (lightbox) or
 * leave it static — it renders identically either way. Pass `media` to
 * replace the placeholder frame with a custom node (e.g. an inline
 * autoplay video on the home Selected Work grid).
 */
export function WorkCard({
  project,
  icon = "play",
  media,
  className,
}: {
  project: Project;
  icon?: "play" | "camera" | "frame";
  media?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {/* Marks the frame as playable media so the custom cursor switches
          to its play state over it. */}
      <div data-cursor="play" className="sheen overflow-hidden">
        {media ?? (
          <MediaPlaceholder
            aspect={project.aspect}
            icon={icon}
            imageUrl={project.thumbnailUrl}
            imageAlt={project.thumbnailAlt}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-medium text-fg transition-colors duration-300 group-hover:text-white">
          <span className="relative inline-block">
            {project.title}
            {/* Accent underline draws in on hover. */}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </span>
        </h3>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] uppercase text-muted transition-colors duration-300 group-hover:text-fg">
          {project.category}
        </span>
      </div>
      {project.tag && (
        <p className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-muted/60">
          {project.tag}
        </p>
      )}
    </div>
  );
}
