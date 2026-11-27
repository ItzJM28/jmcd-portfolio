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

it("shows the poster as a play button and loads no video until pressed", () => {
  const { container } = render(<VideoTile src="/video/demo.mp4" poster="/video/demo.jpg" label="PeraFlow demo" />);
  expect(container.querySelector("video")).toBeNull();
  const play = screen.getByRole("button", { name: "Play PeraFlow demo" });
  expect(play.querySelector("img")?.getAttribute("src")).toBe("/video/demo.jpg");
});

it("swaps in the playing video, with controls and focus, when play is pressed", () => {
  const { container } = render(<VideoTile src="/video/demo.mp4" poster="/video/demo.jpg" label="PeraFlow demo" />);
  fireEvent.click(screen.getByRole("button", { name: "Play PeraFlow demo" }));
  const v = container.querySelector("video")!;
  expect(v.getAttribute("src")).toBe("/video/demo.mp4");
  expect(v.getAttribute("poster")).toBe("/video/demo.jpg");
  expect(v.hasAttribute("controls")).toBe(true);
  expect(v.autoplay).toBe(true);
  expect(v.getAttribute("aria-label")).toBe("PeraFlow demo");
  expect(document.activeElement).toBe(v);
});

it("points the portfolio showreel at the PeraFlow demo", () => {
  expect(profile.showreel).toBe("/video/peraflow-demo.mp4");
  expect(profile.showreelPoster).toBe("/video/peraflow-demo-poster.webp");
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
