import { act, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useReveal } from "@/lib/use-reveal";

function Probe() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return <div ref={ref} data-testid="probe" />;
}

beforeEach(() => {
  // an observer that never reports the tile as visible, and a tile below the fold
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} unobserve() {} });
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5150, left: 0, right: 100, width: 100, height: 150, x: 0, y: 5000, toJSON() {} } as DOMRect);
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it("hides a tile below the fold until it is scrolled to", () => {
  const { getByTestId } = render(<Probe />);
  expect(getByTestId("probe").dataset.reveal).toBe("pending");
});

it("reveals every waiting tile as soon as a filter is picked", () => {
  const { getByTestId } = render(<Probe />);
  act(() => { window.dispatchEvent(new HashChangeEvent("hashchange")); });
  expect(getByTestId("probe").dataset.reveal).toBe("in");
});
