import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProjectLogo } from "@/components/bento/project-logo";

it("draws the QR glyph from the app's favicon", () => {
  const { container } = render(<ProjectLogo id="qr" />);
  expect(container.querySelector("[data-logo=qr] path")?.getAttribute("d")).toMatch(/^M5 5h6v6H5z/);
});

it("draws Lynko as two rings", () => {
  const { container } = render(<ProjectLogo id="lynko" />);
  expect(container.querySelectorAll("[data-logo=lynko] circle")).toHaveLength(2);
});

it("uses the JD mark for JD Creates", () => {
  const { container } = render(<ProjectLogo id="jdcreates" />);
  expect(container.querySelector("[data-logo=jdcreates] path")?.getAttribute("d")).toMatch(/^M586 0h73/);
});

it("draws the PeraFlow peso mark", () => {
  const { container } = render(<ProjectLogo id="peraflow" />);
  const paths = [...container.querySelectorAll("[data-logo=peraflow] path")].map((p) => p.getAttribute("d"));
  expect(paths).toEqual(["M6 20V5h7a4.5 4.5 0 0 1 0 9H6", "M3 9.5h12M3 13h9"]);
});
