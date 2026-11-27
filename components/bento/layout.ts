import type { Category, Filter } from "@/lib/filter";

export type TileKey =
  | "wordmark" | "intro" | "video" | "projects" | "tools" | "email" | "linkedin" | "peraflow"
  | "jdcreates" | "toolkit" | "experience" | "qr" | "lynko" | "location" | "github" | "resume";

type TileDef = {
  key: TileKey;
  category: Category;
  /** Grid classes in the default (All) layout. Hero tiles are pinned with lg: positions. */
  all: string;
  /** Classes when the tile is part of the picked group (defaults to `rest`). */
  picked?: string;
  /** Classes when the tile is dimmed below the picked group: no pinned positions. */
  rest: string;
};

// Default order is the All layout. Spans are chosen so every filtered group fills whole
// rows on desktop (4 columns) and on phones (2 columns).
export const TILES: TileDef[] = [
  { key: "wordmark", category: "about", all: "col-span-2 lg:col-span-3 lg:col-start-2 lg:row-start-1", picked: "col-span-2 lg:col-span-3 lg:col-start-2 lg:row-start-1", rest: "col-span-2 lg:col-span-3" },
  { key: "intro", category: "about", all: "col-span-2 row-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1", picked: "col-span-2 row-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1", rest: "col-span-2 row-span-3 lg:col-span-1" },
  { key: "video", category: "about", all: "col-span-2 lg:col-start-2 lg:row-start-2 lg:row-span-2", picked: "col-span-2 lg:col-start-2 lg:row-start-2 lg:row-span-2", rest: "col-span-2 lg:row-span-2" },
  { key: "projects", category: "work", all: "lg:col-start-4 lg:row-start-2", rest: "" },
  { key: "tools", category: "about", all: "lg:col-start-4 lg:row-start-3", picked: "col-span-2 lg:col-span-1 lg:col-start-4 lg:row-start-2 lg:row-span-2", rest: "" },
  { key: "email", category: "contact", all: "", picked: "col-span-2", rest: "" },
  { key: "linkedin", category: "contact", all: "", rest: "" },
  { key: "peraflow", category: "work", all: "col-span-2 row-span-2", rest: "col-span-2 row-span-2" },
  { key: "jdcreates", category: "work", all: "row-span-2", rest: "row-span-2" },
  { key: "toolkit", category: "about", all: "col-span-2", rest: "col-span-2" },
  { key: "experience", category: "about", all: "col-span-2", rest: "col-span-2" },
  { key: "qr", category: "work", all: "col-span-2", picked: "col-span-2 lg:col-span-4", rest: "col-span-2" },
  { key: "lynko", category: "work", all: "", rest: "" },
  { key: "location", category: "about", all: "col-span-2", picked: "col-span-2 lg:col-span-4", rest: "col-span-2" },
  { key: "github", category: "contact", all: "", rest: "" },
  { key: "resume", category: "contact", all: "col-span-2", picked: "col-span-2 lg:col-span-4", rest: "col-span-2" },
];

// The order each picked group is laid out in, chosen so it packs without gaps.
const PICKED_ORDER: Record<Category, TileKey[]> = {
  work: ["peraflow", "jdcreates", "projects", "lynko", "qr"],
  about: ["wordmark", "intro", "video", "tools", "toolkit", "experience", "location"],
  contact: ["email", "linkedin", "github", "resume"],
};

export type Placed = TileDef & { cls: string; dimmed: boolean };

/** Order and grid classes of every tile for a filter. All returns the default layout. */
export function arrange(filter: Filter): Placed[] {
  if (filter === "all") return TILES.map((t) => ({ ...t, cls: t.all, dimmed: false }));
  const byKey = new Map(TILES.map((t) => [t.key, t]));
  const picked = PICKED_ORDER[filter].map((k) => byKey.get(k)!).map((t) => ({ ...t, cls: t.picked ?? t.rest, dimmed: false }));
  const rest = TILES.filter((t) => t.category !== filter).map((t) => ({ ...t, cls: t.rest, dimmed: true }));
  return [...picked, ...rest];
}
