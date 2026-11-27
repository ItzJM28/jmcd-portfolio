"use client";

import { animate, motion } from "motion/react";
import { type CSSProperties, useEffect, useRef, type ReactNode } from "react";
import { type Category, type Filter, matches } from "@/lib/filter";
import { useReveal } from "@/lib/use-reveal";

export type Span = "1x1" | "2x1" | "1x2" | "2x2";

export const tileSurface = "rounded-[22px] border border-line bg-navy-2";

// Moving and resizing between filters: a soft spring, no visible bounce.
const LAYOUT = { type: "spring", duration: 0.55, bounce: 0.12 } as const;

/**
 * One cell of the bento grid. Picking a filter reorders and resizes the tiles (see layout.ts);
 * Motion's layout animation glides each tile from its old cell to its new one.
 * Tiles outside the filter fade, blur and become inert.
 */
export function Tile({
  tileKey,
  category,
  filter,
  index = 0,
  place = "",
  dimmed: dimmedProp,
  className = "",
  children,
}: {
  tileKey?: string;
  category: Category;
  filter: Filter;
  index?: number;
  /** Grid span and placement classes for the current layout. */
  place?: string;
  /** Override for dimming (defaults to "doesn't match the filter"). */
  dimmed?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dimmed = dimmedProp ?? !matches(category, filter);
  const first = useRef(true);
  useReveal(ref);

  // A small staggered "pop" on the tiles that match a newly picked filter.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || dimmed || filter === "all") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(el, { scale: [0.96, 1] }, { duration: 0.35, delay: 0.12 + index * 0.025, ease: [0.16, 1, 0.3, 1] });
  }, [filter, dimmed, index]);

  return (
    <motion.div
      ref={ref}
      layout
      transition={{ layout: LAYOUT }}
      data-tile={tileKey}
      data-category={category}
      data-dimmed={dimmed ? "" : undefined}
      inert={dimmed}
      style={{ "--i": String(index) } as CSSProperties}
      aria-hidden={dimmed || undefined}
      className={`tile-in relative min-w-0 transition-[opacity,filter] duration-300 ${place} ${
        dimmed ? "opacity-15 blur-[2px] grayscale" : ""
      } ${className}`}
    >
      {/* Counter-scales the content while the tile resizes, so text never stretches. */}
      <motion.div layout transition={{ layout: LAYOUT }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  );
}
