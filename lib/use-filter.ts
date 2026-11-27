"use client";

import { useCallback, useSyncExternalStore } from "react";
import { type Filter, filterToHash, knownFilter } from "@/lib/filter";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

// The last filter the hash named. In-page anchors such as the skip link (#main)
// change the hash too; those keep the current filter instead of resetting it.
let last: Filter = "all";

function read(): Filter {
  const hash = window.location.hash;
  const named = knownFilter(hash);
  if (named) last = named;
  else if (hash.length <= 1) last = "all";
  return last;
}

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
