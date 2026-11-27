import { act, fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { IntroCard, StatTile, VideoTile, Wordmark } from "@/components/bento/hero";
import { profile } from "@/lib/content";
import { projectCount, toolCount } from "@/lib/stats";

it("counts projects and tools from content", () => {
  expect(projectCount()).toBe(4);
  expect(toolCount()).toBe(24);
});

it("puts the page's h1 in the intro card with name and role", () => {
  render(<IntroCard />);
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1.textContent?.replace(/\s+/g, " ")).toContain("I’m John Martin Demonteverde");
  expect(h1.textContent).toContain(profile.name);
  expect(h1.textContent).toContain(profile.role);
});

it("links the email and shows the open-to-work badge", () => {
  const { container } = render(<IntroCard />);
  expect(screen.getByRole("link", { name: new RegExp(profile.email) }).getAttribute("href")).toBe(`mailto:${profile.email}`);
  expect(container.querySelector(".badge-spin")?.textContent).toContain("OPEN TO WORK");
});

it("holds the animated JD mark in the photo ring", () => {
  const { container } = render(<IntroCard />);
  expect(container.querySelectorAll(".photo-ring rect.mark-piece")).toHaveLength(12);
});

it("says the showreel is coming soon when there is no video", async () => {
  render(<VideoTile />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: /play showreel/i })));
  expect(screen.getByRole("status").textContent).toBe("Showreel coming soon");
});

it("plays a real video in place once one is set", () => {
  const { container } = render(<VideoTile src="/showreel.mp4" />);
  expect(container.querySelector("video")?.getAttribute("src")).toBe("/showreel.mp4");
});

it("shows a poster and downloads nothing until play is pressed", () => {
  const { container } = render(<VideoTile src="/video/demo.mp4" poster="/video/demo.jpg" label="PeraFlow demo" />);
  const v = container.querySelector("video")!;
  expect(v.getAttribute("poster")).toBe("/video/demo.jpg");
  expect(v.getAttribute("preload")).toBe("none");
  expect(v.hasAttribute("controls")).toBe(true);
  expect(v.getAttribute("aria-label")).toBe("PeraFlow demo");
});

it("points the portfolio showreel at the PeraFlow demo", () => {
  expect(profile.showreel).toBe("/video/peraflow-demo.mp4");
  expect(profile.showreelPoster).toBe("/video/peraflow-demo.jpg");
});

it("shows the stat's final number in the first render", () => {
  render(<StatTile value={24} label="Tools I build with" tone="green" />);
  expect(screen.getByText("24")).toBeTruthy();
  expect(screen.getByText("Tools I build with")).toBeTruthy();
});

it("renders the Portfolio wordmark", () => {
  render(<Wordmark />);
  expect(screen.getByText("Portfolio")).toBeTruthy();
});
