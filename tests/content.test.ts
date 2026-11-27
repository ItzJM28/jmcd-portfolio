import { expect, it } from "vitest";
import { profile, projects } from "@/lib/content";

it("has a short location label for the map tile", () => {
  expect(profile.locationShort).toBe("Bacolod, PH");
});
it("gives every project a logo id in order", () => {
  expect(projects.map((p) => p.logo)).toEqual(["peraflow", "jdcreates", "qr", "lynko"]);
});
it("leaves Lynko without a screenshot", () => {
  expect(projects.find((p) => p.slug === "lynko")!.image).toBeUndefined();
});
it("glows Lynko in its logo blue", () => {
  expect(projects.find((p) => p.slug === "lynko")!.glow).toBe("#2f5bff");
});
it("gives every project a glow colour", () => {
  expect(projects.every((p) => p.glow.length > 0)).toBe(true);
});
