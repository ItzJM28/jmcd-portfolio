"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks every [data-reveal] element with data-shown once it scrolls into view.
 * The CSS in globals.css does the actual animating. Content only starts hidden
 * when the html element has the "js" class, so the page reads fine without JS.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.shown = ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = "";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));

    // A fast scroll or an anchor jump can skip an element without it ever
    // intersecting. Anything already above the bottom of the screen is shown.
    const showPassed = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            el.dataset.shown = "";
            io.unobserve(el);
          }
        });
    };
    let frame = 0;
    const catchUp = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(showPassed);
    };

    // Reveal the first screen right away, without waiting on the observer,
    // which some browsers delay in background tabs.
    showPassed();
    window.addEventListener("scroll", catchUp, { passive: true });
    window.addEventListener("hashchange", catchUp);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", catchUp);
      window.removeEventListener("hashchange", catchUp);
    };
  }, [pathname]);

  return null;
}

