import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";

const nav = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => nav.pathname }));

import { FilterPills } from "@/components/bento/filter-pills";

beforeEach(() => {
  nav.pathname = "/";
});

it("presses the clicked pill and writes the hash", () => {
  render(<FilterPills />);
  fireEvent.click(screen.getByRole("button", { name: "Work" }));
  expect(screen.getByRole("button", { name: "Work" }).getAttribute("aria-pressed")).toBe("true");
  expect(screen.getByRole("button", { name: "All" }).getAttribute("aria-pressed")).toBe("false");
  expect(location.hash).toBe("#work");
});

it("follows the hash when it changes from outside", () => {
  render(<FilterPills />);
  act(() => {
    history.replaceState(null, "", "/#experience");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByRole("button", { name: "About" }).getAttribute("aria-pressed")).toBe("true");
});

it("clearing back to All removes the hash", () => {
  render(<FilterPills />);
  fireEvent.click(screen.getByRole("button", { name: "Work" }));
  fireEvent.click(screen.getByRole("button", { name: "All" }));
  expect(location.hash).toBe("");
});

it("renders links back to the home page off the home page", () => {
  nav.pathname = "/resume";
  render(<FilterPills />);
  expect(screen.getByRole("link", { name: "Work" }).getAttribute("href")).toBe("/#work");
  expect(screen.getByRole("link", { name: "All" }).getAttribute("href")).toBe("/");
});
