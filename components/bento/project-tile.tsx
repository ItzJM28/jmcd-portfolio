"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import { ProjectLogo } from "./project-logo";
import type { Span } from "./tile";
import { Chip, eyebrow, focusRing } from "./tiles";

const EYEBROW: Record<string, string> = {
  peraflow: "Featured · Finance app",
  jdcreates: "Brand portfolio",
  qr: "QR generator",
  lynko: "Link shortener",
};

/** A project as a tile: its own logo on a soft glow in the app's colour. Opens the project panel. */
export function ProjectTile({
  project,
  span,
  onOpen,
}: {
  project: Project;
  span: Span;
  onOpen: (slug: string, trigger: HTMLElement) => void;
}) {
  const tall = span === "2x2" || span === "1x2";
  return (
    <motion.button
      type="button"
      layoutId={`project-${project.slug}`}
      aria-haspopup="dialog"
      aria-label={`${project.title}, view project`}
      onClick={(e) => onOpen(project.slug, e.currentTarget)}
      initial="rest"
      animate="rest"
      whileHover="lift"
      whileFocus="lift"
      className={`group absolute inset-0 overflow-hidden rounded-[22px] border border-line p-4 text-left ${focusRing}`}
      style={{
        "--glow": project.glow,
        background: `radial-gradient(120% 90% at 50% 40%, color-mix(in srgb, ${project.glow} 14%, transparent), transparent 65%), var(--color-navy-2)`,
      } as CSSProperties}
    >
      {tall && <span className={`absolute left-4 right-12 top-4 truncate ${eyebrow}`}>{EYEBROW[project.slug]}</span>}
      <Chip>
        <ArrowUpRight size={14} aria-hidden="true" />
      </Chip>

      <span
        className={
          tall ? "absolute inset-x-0 bottom-14 top-8 grid place-items-center" : "absolute left-4 top-4 block w-[50px]"
        }
      >
        <motion.span
          className={`logo-bob block ${tall ? "w-[min(42%,120px)]" : "w-full"}`}
          variants={{ rest: { y: 0, scale: 1, rotate: 0 }, lift: { y: -6, scale: 1.08, rotate: -4 } }}
          transition={{ type: "spring", stiffness: 300, damping: 14 }}
        >
          <ProjectLogo
            id={project.logo}
            className="w-full transition-shadow duration-500 group-hover:[box-shadow:0_22px_44px_-12px_var(--glow)] group-focus-visible:[box-shadow:0_22px_44px_-12px_var(--glow)] [box-shadow:0_10px_30px_-10px_var(--glow)]"
          />
        </motion.span>
      </span>

      <span className="absolute inset-x-4 bottom-4 block">
        <span className="block truncate text-[15px] font-semibold">{project.title}</span>
        <span className="block truncate text-[11px] text-ink-3">{project.summary}</span>
      </span>
      {project.slug === "lynko" && (
        <span className="absolute right-4 top-12 font-mono text-[9px] text-ink-3">stand-in logo</span>
      )}
    </motion.button>
  );
}
