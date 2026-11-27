"use client";

import { useSyncExternalStore } from "react";

/**
 * The tile glide (Motion layout animation) is costly to set up: every tile is measured.
 * Nobody can use it before reaching for the filter menu, so it stays off at page load and
 * switches on the moment a pointer enters the menu, it gets focus or it is tapped, which is
 * always before the click that changes the filter.
 */
let armed = false;
const listeners = new Set<() => void>();

export function armLayout() {
  if (armed) return;
  armed = true;
  listeners.forEach((l) => l());
}

/** Test helper: back to the page-load state. */
export function resetLayoutArm() {
  armed = false;
}

export function useLayoutArmed() {
  return useSyncExternalStore(
    (l) => { listeners.add(l); return () => listeners.delete(l); },
    () => armed,
    () => false,
  );
}
