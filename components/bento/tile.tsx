"use client";

import { animate } from "motion";
import { useEffect, useRef, type ReactNode } from "react";
import { type Category, type Filter, matches } from "@/lib/filter";

export type Span = "1x1" | "2x1" | "1x2" | "2x2";

const SPAN: Record<Span, string> = {
  "1x1": "",
  "2x1": "col-span-2",
  "1x2": "row-span-2",
  "2x2": "col-span-2 row-span-2",
};

export const tileSurface = "rounded-[22px] border border-line bg-navy-2";

/**
 * One cell of the bento grid. Tiles that don't match the active filter stay
 * where they are but fade out and become inert, so the layout never jumps.
 */
export function Tile({
  category,
  span = "1x1",
  filter,
  index = 0,
  className = "",
  children,
}: {
  category: Category;
  span?: Span;
  filter: Filter;
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dimmed = !matches(category, filter);
  const first = useRef(true);

  // A small staggered "pop" on the tiles that match a newly picked filter.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el || dimmed || filter === "all") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(el, { scale: [0.96, 1] }, { duration: 0.35, delay: index * 0.025, ease: [0.16, 1, 0.3, 1] });
  }, [filter, dimmed, index]);

  return (
    <div
      ref={ref}
      data-category={category}
      data-dimmed={dimmed ? "" : undefined}
      inert={dimmed}
      aria-hidden={dimmed || undefined}
      className={`relative min-w-0 transition-[opacity,filter] duration-300 ${SPAN[span]} ${
        dimmed ? "opacity-15 blur-[2px] grayscale" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
