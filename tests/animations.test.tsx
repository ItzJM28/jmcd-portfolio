import { readFileSync } from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { AnimatedMark, MARK_RECTS } from "@/components/logo";
import { BentoGrid } from "@/components/bento/bento-grid";
import { IntroCard } from "@/components/bento/hero";
import { RiseWords } from "@/components/bento/tiles";

it("splits the JD mark into its 12 rectangles", () => {
  expect(MARK_RECTS).toHaveLength(12);
  expect(MARK_RECTS[0]).toEqual({ x: 586, y: 0, w: 73, h: 127 });
});

it("draws the animated mark as 12 staggered pieces", () => {
  const { container } = render(<AnimatedMark />);
  const pieces = container.querySelectorAll("rect.mark-piece");
  expect(pieces).toHaveLength(12);
  expect((pieces[11] as SVGElement).style.getPropertyValue("--i")).toBe("11");
});

it("uses the JD mark in the hero photo ring", () => {
  const { container } = render(<IntroCard />);
  expect(container.querySelectorAll(".photo-ring rect.mark-piece")).toHaveLength(12);
  expect(container.querySelector(".photo-ring")!.textContent).toBe("");
});

it("rises words in one at a time but keeps the sentence readable as one", () => {
  const { container } = render(<RiseWords text="Hey there, recruiter" />);
  const words = container.querySelectorAll(".rise-word");
  expect(words).toHaveLength(3);
  expect((words[2] as HTMLElement).style.getPropertyValue("--w")).toBe("2");
  expect(container.textContent).toBe("Hey there, recruiter");
});

it("staggers the tiles' entrance in grid order", () => {
  const { container } = render(<BentoGrid />);
  const tiles = [...container.querySelectorAll<HTMLElement>("[data-category]")];
  expect(tiles.every((t) => t.classList.contains("tile-in"))).toBe(true);
  expect(tiles.map((t) => t.style.getPropertyValue("--i"))).toEqual(tiles.map((_, i) => String(i)));
});

it("turns every new entrance and idle animation off for reduced motion", () => {
  const css = readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf8");
  // Every reduced-motion block in the stylesheet, joined.
  const reduce = css.split("@media (prefers-reduced-motion: reduce)").slice(1).join(" ");
  for (const cls of [".tile-in", ".mark-piece", ".rise-word", ".icon-float", ".badge-spin", ".play-pulse", "[data-reveal"]) {
    expect(reduce).toContain(cls);
  }
});
