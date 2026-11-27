import { act, render } from "@testing-library/react";
import { expect, it } from "vitest";
import { BentoGrid } from "@/components/bento/bento-grid";

it("shows all 12 tiles undimmed with no hash", () => {
  const { container } = render(<BentoGrid />);
  expect(container.querySelectorAll("[data-category]")).toHaveLength(12);
  expect(container.querySelectorAll("[inert]")).toHaveLength(0);
});

it("dims and disables every non-work tile under #work", () => {
  history.replaceState(null, "", "/#work");
  const { container } = render(<BentoGrid />);
  const tiles = [...container.querySelectorAll<HTMLElement>("[data-category]")];
  const work = tiles.filter((t) => t.dataset.category === "work");
  const others = tiles.filter((t) => t.dataset.category !== "work");
  expect(work).toHaveLength(4);
  work.forEach((t) => expect(t.hasAttribute("inert")).toBe(false));
  others.forEach((t) => {
    expect(t.hasAttribute("inert")).toBe(true);
    expect(t.hasAttribute("data-dimmed")).toBe(true);
  });
});

it("no longer labels Lynko as a stand-in logo", () => {
  const { container } = render(<BentoGrid />);
  expect(container.textContent).not.toContain("stand-in logo");
});

it("re-dims when the filter changes", () => {
  const { container } = render(<BentoGrid />);
  act(() => {
    history.replaceState(null, "", "/#contact");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  const live = [...container.querySelectorAll<HTMLElement>("[data-category]:not([inert])")];
  expect(live.map((t) => t.dataset.category)).toEqual(["contact", "contact", "contact", "contact"]);
});
