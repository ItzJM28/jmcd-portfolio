export type Filter = "all" | "about" | "work" | "contact";
export type Category = Exclude<Filter, "all">;

export const FILTERS: readonly Filter[] = ["all", "about", "work", "contact"];

/** Old anchors from the stacked page that should still land somewhere sensible. */
const ALIASES: Record<string, Filter> = { experience: "about" };

/** The filter a hash names, or null when the hash is about something else (e.g. #main). */
export function knownFilter(hash: string): Filter | null {
  const key = hash.replace(/^#/, "").toLowerCase();
  if ((FILTERS as readonly string[]).includes(key)) return key as Filter;
  return ALIASES[key] ?? null;
}

export function parseFilter(hash: string): Filter {
  return knownFilter(hash) ?? "all";
}

export function filterToHash(f: Filter): string {
  return f === "all" ? "" : `#${f}`;
}

export function matches(category: Category, f: Filter): boolean {
  return f === "all" || f === category;
}
