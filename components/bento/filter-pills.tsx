"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FILTERS, type Filter, filterToHash } from "@/lib/filter";
import { useFilter } from "@/lib/use-filter";

const LABEL: Record<Filter, string> = { all: "All", about: "About", work: "Work", contact: "Contact" };

const pill =
  "relative h-8 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-9 sm:px-4 sm:text-sm";

export function FilterPills() {
  const onHome = usePathname() === "/";
  const [filter, setFilter] = useFilter();

  return (
    <div role="group" aria-label="Filter tiles" className="flex items-center gap-0.5 rounded-full border border-line bg-navy-2 p-[3px]">
      {FILTERS.map((f) => {
        const active = onHome && f === filter;
        const inner = (
          <>
            {active && (
              <motion.span
                layoutId="pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gold"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{LABEL[f]}</span>
          </>
        );
        const tone = active ? "text-navy" : "text-ink-2 hover:text-ink";
        return onHome ? (
          <button key={f} type="button" aria-pressed={active} onClick={() => setFilter(f)} className={`${pill} ${tone}`}>
            {inner}
          </button>
        ) : (
          <Link key={f} href={`/${filterToHash(f)}`} className={`${pill} ${tone} inline-flex items-center`}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
