"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FILTERS, type Filter, filterToHash } from "@/lib/filter";
import { useFilter } from "@/lib/use-filter";

const LABEL: Record<Filter, string> = { all: "All", about: "About", work: "Work", contact: "Contact" };

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const STYLE = {
  horizontal: {
    group: "flex items-center gap-0.5 rounded-full border border-line bg-navy-2 p-[3px]",
    item: `relative h-8 rounded-full px-3 text-xs font-semibold transition-colors sm:h-9 sm:px-4 sm:text-sm ${focus}`,
    label: "relative",
  },
  vertical: {
    group: "hidden flex-col items-center gap-1 rounded-full border border-line bg-navy-2 p-[3px] lg:flex",
    item: `relative w-9 rounded-full py-4 text-sm font-semibold transition-colors ${focus}`,
    // Sideways text, read bottom to top like the reference's side menu.
    label: "relative block rotate-180 [writing-mode:vertical-rl]",
  },
} as const;

/** When the grid has scrolled above the viewport, bring it back so the filter's effect is visible. */
function revealGrid() {
  const grid = document.querySelector<HTMLElement>('[aria-label="Portfolio"]');
  if (!grid || grid.getBoundingClientRect().top >= 0) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  grid.scrollIntoView?.({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** The tile filters: pills across the header on phones and tablets, a sideways menu beside the grid on desktop. */
export function FilterPills({ vertical = false }: { vertical?: boolean }) {
  const onHome = usePathname() === "/";
  const [filter, setFilter] = useFilter();
  const s = STYLE[vertical ? "vertical" : "horizontal"];
  // Order reads top-to-bottom in the side menu, as in the reference.
  const order = vertical ? [...FILTERS].reverse() : FILTERS;

  return (
    <div role="group" aria-label="Filter tiles" className={s.group}>
      {order.map((f) => {
        const active = onHome && f === filter;
        const inner = (
          <>
            {active && (
              <motion.span
                layoutId={vertical ? "side-pill" : "pill"}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className={s.label}>{LABEL[f]}</span>
          </>
        );
        const tone = active ? "text-navy" : "text-ink-2 hover:text-ink";
        return onHome ? (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => {
              setFilter(f);
              revealGrid();
            }}
            className={`${s.item} ${tone}`}
          >
            {inner}
          </button>
        ) : (
          <Link key={f} href={`/${filterToHash(f)}`} className={`${s.item} ${tone} inline-flex items-center justify-center`}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
