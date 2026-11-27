"use client";

import { type RefObject, useEffect } from "react";

/**
 * Scroll reveal. After mount, a tile that sits below the viewport is marked
 * data-reveal="pending" (hidden by CSS) and flips to "in" when it scrolls into
 * view. Server HTML, tiles already on screen, browsers without
 * IntersectionObserver and reduced-motion visitors are never hidden.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      // Never leave a tile hidden if the effect is torn down early.
      if (el.dataset.reveal === "pending") el.dataset.reveal = "in";
    };
  }, [ref]);
}
