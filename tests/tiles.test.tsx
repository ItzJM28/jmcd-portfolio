import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { CopyEmailTile, LocationTile, ResumeTile } from "@/components/bento/tiles";
import { profile } from "@/lib/content";

const realLocation = window.location;
let assigned = "";

beforeEach(() => {
  assigned = "";
  Object.defineProperty(window, "location", {
    configurable: true,
    value: { ...realLocation, set href(v: string) { assigned = v; }, get href() { return realLocation.href; } },
  });
});
afterEach(() => {
  Object.defineProperty(window, "location", { configurable: true, value: realLocation });
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
});

it("copies the email and confirms it", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<CopyEmailTile />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: /copy email/i })));
  expect(writeText).toHaveBeenCalledWith(profile.email);
  expect(screen.getByText("Email copied")).toBeTruthy();
  expect(assigned).toBe("");
});

it("opens the mail app when there is no clipboard", async () => {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
  render(<CopyEmailTile />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: /copy email/i })));
  expect(assigned).toBe(`mailto:${profile.email}`);
});

it("opens the mail app when copying is refused", async () => {
  const writeText = vi.fn().mockRejectedValue(new Error("denied"));
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<CopyEmailTile />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: /copy email/i })));
  expect(assigned).toBe(`mailto:${profile.email}`);
});

it("labels the map with the short location", () => {
  render(<LocationTile />);
  expect(screen.getByText("Bacolod, PH")).toBeTruthy();
});

it("links the résumé tile to the résumé", () => {
  render(<ResumeTile />);
  const link = screen.getByRole("link", { name: /view résumé/i });
  expect(link.getAttribute("href")).toBe("/resume");
});
