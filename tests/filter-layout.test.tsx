import { act, render } from "@testing-library/react";
import { expect, it } from "vitest";
import { BentoGrid } from "@/components/bento/bento-grid";

const order = (c: HTMLElement) => [...c.querySelectorAll<HTMLElement>("[data-tile]")].map((t) => t.dataset.tile);
const tile = (c: HTMLElement, k: string) => c.querySelector<HTMLElement>(`[data-tile="${k}"]`)!;
const go = (hash: string) =>
  act(() => {
    history.replaceState(null, "", "/" + hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

const DEFAULT = ["wordmark", "intro", "video", "projects", "tools", "email", "linkedin", "peraflow", "jdcreates", "toolkit", "experience", "qr", "lynko", "location", "github", "resume"];

it("keeps the default layout under All", () => {
  const { container } = render(<BentoGrid />);
  expect(order(container)).toEqual(DEFAULT);
  expect(tile(container, "intro").className).toContain("lg:col-start-1");
});

it("moves Work tiles to the top and widens QR to fill its row", () => {
  const { container } = render(<BentoGrid />);
  go("#work");
  expect(order(container).slice(0, 5)).toEqual(["peraflow", "jdcreates", "projects", "lynko", "qr"]);
  expect(tile(container, "qr").className).toContain("lg:col-span-4");
  // dimmed tiles drop their pinned hero positions so they can't collide with the moved group
  expect(tile(container, "intro").className).not.toContain("lg:col-start-1");
  expect(tile(container, "intro").hasAttribute("inert")).toBe(true);
});

it("moves Contact tiles to the top, proportioned into two full rows", () => {
  const { container } = render(<BentoGrid />);
  go("#contact");
  expect(order(container).slice(0, 4)).toEqual(["email", "linkedin", "github", "resume"]);
  expect(tile(container, "email").className).toContain("col-span-2");
  expect(tile(container, "resume").className).toContain("lg:col-span-4");
});

it("moves About tiles to the top and lets the tools number fill the hero gap", () => {
  const { container } = render(<BentoGrid />);
  go("#about");
  expect(order(container).slice(0, 7)).toEqual(["wordmark", "intro", "video", "tools", "toolkit", "experience", "location"]);
  expect(tile(container, "tools").className).toContain("lg:row-span-2");
  expect(tile(container, "location").className).toContain("lg:col-span-4");
  // the hero keeps its shape: intro card on the left, wordmark across the top right
  expect(tile(container, "intro").className).toContain("lg:col-start-1 lg:row-start-1");
  expect(tile(container, "wordmark").className).toContain("lg:col-start-2 lg:row-start-1");
});

it("goes back to the default layout when All is picked again", () => {
  const { container } = render(<BentoGrid />);
  go("#work");
  go("");
  expect(order(container)).toEqual(DEFAULT);
  expect(tile(container, "qr").className).not.toContain("lg:col-span-4");
});

it("plays a tile's entrance only once, so moving it later can't replay it mid-measure", () => {
  const { container } = render(<BentoGrid />);
  const intro = tile(container, "intro");
  expect(intro.classList.contains("tile-in")).toBe(true);
  act(() => { intro.dispatchEvent(new Event("animationend", { bubbles: true })); });
  expect(intro.classList.contains("tile-in")).toBe(false);
  go("#work");
  go("");
  expect(tile(container, "intro").classList.contains("tile-in")).toBe(false);
});

