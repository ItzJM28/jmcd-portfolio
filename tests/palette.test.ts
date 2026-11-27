import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";

const root = path.resolve(__dirname, "..");
const css = readFileSync(path.join(root, "app/globals.css"), "utf8").toLowerCase();

// JD Creates (jdcreates.vercel.app) colour scheme
const JD_CREATES = {
  "--color-navy": "#1d1d20",
  "--color-navy-2": "#27272b",
  "--color-line": "#3a3a40",
  "--color-ink": "#f2f0eb",
  "--color-ink-3": "#a3a3ab",
  "--color-grape": "#54478c",
  "--color-baltic": "#2c699a",
  "--color-cyan": "#048ba8",
  "--color-ocean": "#0db39e",
  "--color-emerald": "#16db93",
  "--color-lightgreen": "#83e377",
  "--color-lime": "#b9e769",
  "--color-banana": "#efea5a",
  "--color-tuscan": "#f1c453",
  "--color-sandy": "#f29e4c",
};

it("uses the JD Creates colour scheme", () => {
  for (const [token, hex] of Object.entries(JD_CREATES)) expect(css).toContain(`${token}: ${hex}`);
});

it("leaves none of the old palette anywhere in the site", () => {
  const OLD = ["#0c120c", "#f2f3ae", "#edd382", "#fc9e4f", "#f4442e", "#16db65", "#2176ff"];
  const OLD_CLASSES = /\b(bg|text|border|outline|ring|fill|stroke)-(gold|vanilla|terracotta|green|blue)\b/;
  const files: string[] = [];
  const walk = (d: string) =>
    readdirSync(d).forEach((f) => {
      const p = path.join(d, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|css|svg)$/.test(f)) files.push(p);
    });
  ["app", "components", "lib"].forEach((d) => walk(path.join(root, d)));
  for (const f of files) {
    const src = readFileSync(f, "utf8").toLowerCase();
    for (const hex of OLD) expect(src.includes(hex), `${path.relative(root, f)} still has ${hex}`).toBe(false);
    expect(OLD_CLASSES.test(src), `${path.relative(root, f)} still uses an old colour class`).toBe(false);
  }
});
