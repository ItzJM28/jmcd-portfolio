import { act, fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { BentoGrid } from "@/components/bento/bento-grid";
import { FilterPills } from "@/components/bento/filter-pills";
import { resetLayoutArm } from "@/lib/layout-arm";

const armed = (c: HTMLElement) => c.querySelectorAll("[data-tile][data-layout-armed]").length;

it("does no layout tracking on page load", () => {
  resetLayoutArm();
  const { container } = render(<BentoGrid />);
  expect(armed(container)).toBe(0);
});

it("switches the glide on as soon as a visitor reaches for the filter menu", () => {
  resetLayoutArm();
  const { container } = render(<><FilterPills /><BentoGrid /></>);
  act(() => { fireEvent.pointerEnter(screen.getByRole("group", { name: "Filter tiles" })); });
  expect(armed(container)).toBe(16);
});

it("also switches it on from keyboard focus", () => {
  resetLayoutArm();
  const { container } = render(<><FilterPills /><BentoGrid /></>);
  act(() => { fireEvent.focus(screen.getByRole("button", { name: "Work" })); });
  expect(armed(container)).toBe(16);
});
