"use client";

import { motion } from "motion/react";
import { type CSSProperties, useEffect, useRef, useState, type ReactNode } from "react";
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
 *
 * Motion is the only thing that moves a tile: the CSS entrance runs once and is then removed
 * (moving a node in the DOM would replay it mid-measure), and layout is only re-measured
 * when the filter changes, never on unrelated re-renders.
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
  const [entered, setEntered] = useState(false);
  useReveal(ref);
  // Drop the entrance class once it has played, so reordering never replays it.
  useEffect(() => {
    const el = ref.current;
    if (!el || entered) return;
    const done = (e: Event) => { if (e.target === el) setEntered(true); };
    el.addEventListener("animationend", done);
    return () => el.removeEventListener("animationend", done);
  }, [entered]);

  return (
    <motion.div
      ref={ref}
      layout
      layoutDependency={filter}
      transition={{ layout: LAYOUT }}
      data-tile={tileKey}
      data-category={category}
      data-dimmed={dimmed ? "" : undefined}
      inert={dimmed}
      style={{ "--i": String(index) } as CSSProperties}
      aria-hidden={dimmed || undefined}
      className={`${entered ? "" : "tile-in "}relative min-w-0 transition-[opacity,filter] duration-300 ${place} ${
        dimmed ? "opacity-15 blur-[2px] grayscale" : ""
      } ${className}`}
    >
      {/* Counter-scales the content while the tile resizes, so text never stretches. */}
      <motion.div layout layoutDependency={filter} transition={{ layout: LAYOUT }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  );
}
