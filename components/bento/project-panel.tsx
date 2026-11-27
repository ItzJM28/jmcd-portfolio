"use client";

import { ArrowUpRight, X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { TechIcon, tech } from "@/components/tech-icon";
import type { Project } from "@/lib/content";
import { ProjectLogo } from "./project-logo";

const button =
  "inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

/**
 * A project's details. It scales and fades in over the page (no shared layout with the tile:
 * a second layout tracker on the tile could be stranded by hover while the grid glides).
 * Closes on ×, Escape, a backdrop click, or when the filter in the URL changes.
 * Rendered at the end of <body> so the header and page behind it can be made inert.
 */
export function ProjectPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Keep keyboard and screen-reader focus inside the panel: everything behind it goes inert.
    const behind = [...document.querySelectorAll<HTMLElement>("header, main")];
    behind.forEach((el) => el.setAttribute("inert", ""));
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onClose);
    return () => {
      behind.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onClose);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-8">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex max-h-dvh w-full flex-col overflow-hidden rounded-t-[22px] border border-line bg-navy-2 lg:max-h-[85vh] lg:max-w-3xl lg:rounded-[22px]"
      >
        <div className="flex items-center gap-3 border-b border-line p-4">
          <ProjectLogo id={project.logo} className="w-10 shrink-0" />
          <h2 id={titleId} className="min-w-0 flex-1 truncate text-lg font-semibold">
            {project.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full bg-navy-3 text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-gold"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="overflow-hidden rounded-xl border border-line bg-navy">
            {project.image ? (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={1440}
                height={900}
                sizes="(min-width: 1024px) 720px, 100vw"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            ) : (
              <div className="grid aspect-[16/10] place-items-center">
                <ProjectLogo id={project.logo} className="w-1/4" />
              </div>
            )}
          </div>

          <p className="mt-5 text-lg font-semibold text-pretty">{project.summary}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2 text-pretty">{project.detail}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Built with">
            {project.stack.map((id) => (
              <li key={id} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-ink-2">
                <TechIcon id={id} size={14} />
                {tech[id].name}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`${button} bg-gold text-navy hover:brightness-105`}>
                Visit site <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${button} border border-line text-ink hover:border-ink-2`}
            >
              Source code <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
