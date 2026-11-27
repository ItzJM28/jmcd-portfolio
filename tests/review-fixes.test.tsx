import { readFileSync } from "node:fs";
import path from "node:path";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { BentoGrid } from "@/components/bento/bento-grid";
import { FilterPills } from "@/components/bento/filter-pills";
import { CopyEmailTile, IntroTile, LinkTile } from "@/components/bento/tiles";
import { profile } from "@/lib/content";

it("makes the page behind the project panel inert while it is open", async () => {
  render(
    <>
      <header>
        <button type="button">pill</button>
      </header>
      <main>
        <BentoGrid />
      </main>
    </>,
  );
  fireEvent.click(screen.getByRole("button", { name: /^PeraFlow/ }));
  const dialog = await screen.findByRole("dialog");
  expect(document.querySelector("main")!.hasAttribute("inert")).toBe(true);
  expect(document.querySelector("header")!.hasAttribute("inert")).toBe(true);
  expect(dialog.closest("[inert]")).toBeNull();
});

it("gives the home page one h1 with the name and role", () => {
  render(<IntroTile />);
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1.textContent).toContain(profile.name);
  expect(h1.textContent).toContain(profile.role);
});

it("keeps the filter when the skip link changes the hash to #main", () => {
  render(<FilterPills />);
  fireEvent.click(screen.getByRole("button", { name: "Work" }));
  act(() => {
    history.replaceState(null, "", "/#main");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  expect(screen.getByRole("button", { name: "Work" }).getAttribute("aria-pressed")).toBe("true");
});

it("keeps the copy button's name as just 'Copy email' after copying", async () => {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
  render(<CopyEmailTile />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy email" })));
  expect(screen.getByRole("button", { name: "Copy email" })).toBeTruthy();
  expect(screen.getByRole("status").textContent).toBe("Email copied");
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
});

it("only moves tile glyphs on hover when motion is allowed", () => {
  const { container } = render(<LinkTile href="https://example.com" label="GitHub" glyph={<span>g</span>} />);
  const glyph = container.querySelector("a > span[aria-hidden]")!;
  expect(glyph.className).toContain("motion-safe:group-hover:scale-110");
  expect(glyph.className).not.toMatch(/(^|\s)group-hover:scale-110/);
});

it("keeps the corner-chip swing out of reduced motion", () => {
  const css = readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf8").split(String.fromCharCode(13)).join("");
  const swing = css.indexOf("rotate: 45deg");
  const guard = css.lastIndexOf("@media (prefers-reduced-motion: no-preference)", swing);
  expect(swing).toBeGreaterThan(-1);
  expect(guard).toBeGreaterThan(-1);
  // No media block closes between the guard and the swing rule.
  expect(css.slice(guard, swing)).not.toMatch(/\}\s*\}/);
});
