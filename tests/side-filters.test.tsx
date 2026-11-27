import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { SideFilters } from "@/components/bento/side-filters";

it("filters from the vertical side menu", () => {
  render(<SideFilters />);
  const group = screen.getByRole("group", { name: "Filter tiles" });
  fireEvent.click(screen.getByRole("button", { name: "Work" }));
  expect(screen.getByRole("button", { name: "Work" }).getAttribute("aria-pressed")).toBe("true");
  expect(location.hash).toBe("#work");
  expect(group.className).toContain("hidden");
  expect(group.className).toContain("lg:flex");
});
