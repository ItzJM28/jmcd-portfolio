import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { ProjectLogo } from "@/components/bento/project-logo";

it("draws the QR glyph from the app's favicon", () => {
  const { container } = render(<ProjectLogo id="qr" />);
  expect(container.querySelector("[data-logo=qr] path")?.getAttribute("d")).toMatch(/^M5 5h6v6H5z/);
});

it("uses the real Lynko logo image", () => {
  const { container } = render(<ProjectLogo id="lynko" />);
  expect(container.querySelector("[data-logo=lynko] img")?.getAttribute("src")).toContain("lynko.png");
  expect(container.querySelector("[data-logo=lynko] circle")).toBeNull();
});

it("uses the JD mark for JD Creates", () => {
  const { container } = render(<ProjectLogo id="jdcreates" />);
  expect(container.querySelector("[data-logo=jdcreates] path")?.getAttribute("d")).toMatch(/^M586 0h73/);
});

it("uses the real PeraFlow logo image", () => {
  const { container } = render(<ProjectLogo id="peraflow" />);
  const img = container.querySelector("[data-logo=peraflow] img");
  expect(img?.getAttribute("src")).toContain("peraflow.png");
  expect(img?.getAttribute("alt")).toBe("");
  expect(container.querySelector("[data-logo=peraflow] svg")).toBeNull();
});
