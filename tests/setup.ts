import { cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "motion/react";
import { afterEach } from "vitest";

// jsdom cannot run animations to completion, so exits would never finish.
MotionGlobalConfig.skipAnimations = true;

afterEach(() => {
  cleanup();
  history.replaceState(null, "", "/");
});

// jsdom has no matchMedia; Motion and our reduced-motion checks read it.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({ matches: false, media: query, onchange: null, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false }) as MediaQueryList;
}
