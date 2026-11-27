import { act, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { LocationTile } from "@/components/bento/tiles";
import { localTime } from "@/lib/local-time";

afterEach(() => vi.useRealTimers());

it("shows a real map of Bacolod, saved in the site", () => {
  render(<LocationTile />);
  const img = screen.getByRole("img", { name: /map of bacolod/i });
  expect(img.getAttribute("src")).toContain("/map/bacolod-dark.webp");
});

it("credits OpenStreetMap, whose data the map is built from", () => {
  render(<LocationTile />);
  expect(screen.getByText("© OpenStreetMap contributors")).toBeTruthy();
  expect(screen.queryByText(/CARTO/)).toBeNull();
});

it("formats Bacolod's local time from any clock", () => {
  // 07:42 UTC is 3:42 PM in the Philippines (UTC+8, no daylight saving)
  expect(localTime(new Date("2026-11-27T07:42:00Z"))).toBe("3:42 PM");
  expect(localTime(new Date("2026-11-27T16:05:00Z"))).toBe("12:05 AM");
});

it("shows the live local time once the page is running, not in server HTML", () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-27T07:42:00Z"));
  render(<LocationTile />);
  act(() => { vi.advanceTimersByTime(0); });
  expect(screen.getByText("3:42 PM in Bacolod")).toBeTruthy();
  // a minute later (advancing the timers moves the fake clock too)
  act(() => { vi.advanceTimersByTime(60_000); });
  expect(screen.getByText("3:43 PM in Bacolod")).toBeTruthy();
});
