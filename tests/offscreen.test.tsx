import { readFileSync } from "node:fs";
import path from "node:path";
import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import { Tile } from "@/components/bento/tile";
import { resetOffscreen } from "@/lib/offscreen";

type Entry = { target: Element; isIntersecting: boolean };
let fire: (entries: Entry[]) => void = () => {};

afterEach(() => {
  vi.unstubAllGlobals();
  resetOffscreen();
});

function stubObserver() {
  const observed: Element[] = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: (e: Entry[]) => void) {
        fire = cb;
      }
      observe(el: Element) {
        observed.push(el);
      }
      unobserve() {}
      disconnect() {}
    },
  );
  return observed;
}

it("server HTML starts every tile's endless loops paused", () => {
  const html = renderToString(
    <Tile tileKey="toolkit" category="about" filter="all">
      x
    </Tile>,
  );
  expect(html).toContain("data-offscreen");
});

it("plays a tile's loops while it is on screen and pauses them when it leaves", () => {
  const observed = stubObserver();
  const { container } = render(
    <Tile tileKey="toolkit" category="about" filter="all">
      x
    </Tile>,
  );
  const tile = container.querySelector("[data-tile=toolkit]")!;
  expect(observed).toContain(tile);
  fire([{ target: tile, isIntersecting: true }]);
  expect(tile.hasAttribute("data-offscreen")).toBe(false);
  fire([{ target: tile, isIntersecting: false }]);
  expect(tile.hasAttribute("data-offscreen")).toBe(true);
});

it("never leaves loops paused where it cannot observe", () => {
  vi.stubGlobal("IntersectionObserver", undefined);
  const { container } = render(
    <Tile tileKey="toolkit" category="about" filter="all">
      x
    </Tile>,
  );
  expect(container.querySelector("[data-tile=toolkit]")!.hasAttribute("data-offscreen")).toBe(false);
});

it("pauses only the endless loops, never an entrance", () => {
  const css = readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf8");
  const rule = css.slice(css.indexOf("[data-offscreen]"), css.indexOf("}", css.indexOf("[data-offscreen]")));
  for (const loop of [".marquee", ".logo-bob", ".icon-float", ".badge-spin", ".ping-dot::after"]) expect(rule).toContain(loop);
  for (const entrance of [".tile-in", ".mark-piece", ".rise-word"]) expect(rule).not.toContain(entrance);
});
