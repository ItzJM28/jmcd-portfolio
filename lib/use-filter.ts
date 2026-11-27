"use client";

import { useCallback, useSyncExternalStore } from "react";
import { type Filter, filterToHash, parseFilter } from "@/lib/filter";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const read = () => parseFilter(window.location.hash);

/** The active tile filter, kept in the URL hash so header and grid stay in sync. */
export function useFilter(): [Filter, (f: Filter) => void] {
  const filter = useSyncExternalStore(subscribe, read, () => "all" as const);
  const setFilter = useCallback((f: Filter) => {
    // replaceState avoids the page jumping to an element with that id.
    history.replaceState(null, "", filterToHash(f) || window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);
  return [filter, setFilter];
}
