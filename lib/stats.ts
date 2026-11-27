import { projects, skills } from "@/lib/content";

/** Shipped projects shown on the site. Counted, never typed in. */
export function projectCount(): number {
  return projects.length;
}

/** Distinct tools across every skills group. Counted, never typed in. */
export function toolCount(): number {
  return new Set(skills.flatMap((g) => g.items)).size;
}
