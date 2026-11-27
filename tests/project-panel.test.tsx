import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { expect, it, vi } from "vitest";

// jsdom has no layout, so Motion's shared-layout (layoutId) exit never settles
// and the panel would never unmount. Strip layoutId here only; the real
// tile-to-panel morph is checked in the browser.
vi.mock("motion/react", async (importOriginal) => {
  const React = await import("react");
  const m = await importOriginal<typeof import("motion/react")>();
  const cache = new Map<string | symbol, unknown>();
  const motion = new Proxy(m.motion, {
    get(target, key) {
      if (!cache.has(key)) {
        const Inner = Reflect.get(target, key) as React.ElementType;
        cache.set(
          key,
          React.forwardRef(function NoLayoutId(props: Record<string, unknown>, ref) {
            const rest = { ...props };
            delete rest.layoutId;
            return React.createElement(Inner, { ...rest, ref });
          }),
        );
      }
      return cache.get(key);
    },
  });
  return { ...m, motion };
});

import { BentoGrid } from "@/components/bento/bento-grid";

const tile = (name: string) => screen.getByRole("button", { name: new RegExp(`^${name}`) });

it("opens PeraFlow's panel with its live link and focuses close", async () => {
  render(<BentoGrid />);
  fireEvent.click(tile("PeraFlow"));
  const dialog = await screen.findByRole("dialog", { name: "PeraFlow" });
  expect(within(dialog).getByRole("link", { name: /visit site/i }).getAttribute("href")).toBe("https://peraflowph.vercel.app");
  await waitFor(() => expect(document.activeElement).toBe(within(dialog).getByRole("button", { name: /close/i })));
});

it("closes on Escape and gives focus back to the tile", async () => {
  render(<BentoGrid />);
  const trigger = tile("PeraFlow");
  fireEvent.click(trigger);
  await screen.findByRole("dialog", { name: "PeraFlow" });
  fireEvent.keyDown(document, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  await waitFor(() => expect(document.activeElement).toBe(tile("PeraFlow")));
});

it("shows Lynko's logo in place of a screenshot and has no live link", async () => {
  render(<BentoGrid />);
  fireEvent.click(tile("Lynko"));
  const dialog = await screen.findByRole("dialog", { name: "Lynko" });
  expect(within(dialog).queryByRole("link", { name: /visit site/i })).toBeNull();
  // No screenshot: the only images are the logo itself.
  expect([...dialog.querySelectorAll("img")].filter((img) => !img.closest("[data-logo]"))).toHaveLength(0);
  expect(dialog.querySelector("[data-logo=lynko]")).not.toBeNull();
  expect(within(dialog).getByRole("link", { name: /source code/i }).getAttribute("href")).toBe("https://github.com/ItzJM28/lynko");
});

it("closes when the filter changes behind it and keeps focus off inert tiles", async () => {
  render(<BentoGrid />);
  fireEvent.click(tile("Free QR Code Generator"));
  await screen.findByRole("dialog", { name: "Free QR Code Generator" });
  act(() => {
    history.replaceState(null, "", "/#about");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(document.activeElement?.closest("[inert]")).toBeNull();
});
