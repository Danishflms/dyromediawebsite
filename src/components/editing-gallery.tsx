"use client";

import { useState } from "react";
import type { Project } from "@/data/types";
import { WorkCard } from "./work-card";
import { Lightbox } from "./lightbox";
import { RevealGroup, RevealItem } from "./reveal";

/** Masonry grid of editing projects; each card opens the lightbox. */
export function EditingGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <RevealGroup className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {projects.map((project) => (
          <RevealItem key={project.id} className="mb-6 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(project)}
              className="block w-full cursor-pointer text-left"
              aria-haspopup="dialog"
              aria-label={`Open ${project.title}`}
            >
              <WorkCard project={project} />
            </button>
          </RevealItem>
        ))}
      </RevealGroup>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </>
  );
}
