"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Makes every Motion animation respect the visitor's reduce-motion setting. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
