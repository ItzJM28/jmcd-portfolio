"use client";

import { ArrowUpRight, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ResumeLink } from "@/components/resume-dialog";
import { tech } from "@/components/tech-icon";
import { education, experience, type Hue, profile, skills } from "@/lib/content";
import { tileSurface } from "./tile";

export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold";
const fill = `absolute inset-0 overflow-hidden ${tileSurface} ${focusRing}`;
export const eyebrow = "font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3";

/** The small round icon in a tile's top-right corner. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="chip absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-navy-3 text-ink-2 transition-[transform,background-color,color] duration-300">
      {children}
    </span>
  );
}

export function IntroTile() {
  return (
    <div className={`${fill} flex items-center gap-4 p-4 sm:gap-5 sm:p-5`}>
      <div className="intro-ring relative grid size-20 shrink-0 place-items-center rounded-full sm:size-24" aria-hidden="true">
        <div className="relative grid size-[calc(100%-10px)] place-items-center rounded-full bg-navy text-2xl font-extrabold tracking-[-0.05em] sm:text-3xl">
          JD
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[13px] leading-snug text-ink-2 sm:text-[15px] sm:leading-relaxed">
          Hey <span className="wave inline-block">👋</span> I&apos;m{" "}
          <strong className="font-semibold text-ink">{profile.name}</strong>, a front-end developer building responsive,
          accessible web apps with React, Next.js and TypeScript.
        </p>
        <p className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] text-green">
          <span className="ping-dot size-2 rounded-full bg-green" aria-hidden="true" />
          Open to front-end roles
        </p>
      </div>
    </div>
  );
}

export function CopyEmailTile() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("no clipboard");
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button type="button" onClick={copy} className={`${fill} group p-4 text-left`}>
      <span
        role="status"
        className={`absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-green px-2.5 py-1 text-[11px] font-semibold text-navy transition-all duration-300 ${
          copied ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        {copied ? "Email copied" : ""}
      </span>
      <span
        className="absolute inset-0 grid place-items-center text-4xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        aria-hidden="true"
      >
        ✉️
      </span>
      <Chip>
        <Copy size={13} aria-hidden="true" />
      </Chip>
      <span className="absolute bottom-4 left-4 text-[13px] font-semibold text-gold">Copy email</span>
    </button>
  );
}

export function LinkTile({ href, label, glyph }: { href: string; label: string; glyph: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${fill} group p-4`}>
      <span
        className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        aria-hidden="true"
      >
        {glyph}
      </span>
      <Chip>
        <ArrowUpRight size={14} aria-hidden="true" />
      </Chip>
      <span className="absolute bottom-4 left-4 text-[13px] font-semibold">{label}</span>
    </a>
  );
}

export function ToolkitTile() {
  const all = skills.flatMap((g) => g.items.map((id) => tech[id].name)).join(", ");
  return (
    <div className={`${fill} p-4`}>
      <h2 className={eyebrow}>Toolkit</h2>
      <p className="sr-only">{all}</p>
      <div className="mt-3 space-y-2.5 sm:mt-4" aria-hidden="true">
        {skills.map((group, i) => {
          const names = group.items.map((id) => tech[id].name).join(" · ") + " · ";
          return (
            <div key={group.label} className="overflow-hidden whitespace-nowrap font-mono text-xs font-semibold">
              <div className={`marquee inline-block ${i % 2 ? "marquee-rev text-sandy" : "text-vanilla"}`}>
                {names}
                {names}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const MARKER: Record<Hue, string> = {
  terracotta: "bg-terracotta",
  sandy: "bg-sandy",
  gold: "bg-gold",
  green: "bg-green",
  blue: "bg-blue",
};

export function ExperienceTile() {
  const rows = [
    ...experience.map((e) => ({ title: e.role, org: e.company, period: e.period, hue: e.hue })),
    { title: education.degree, org: education.school, period: education.period, hue: "gold" as Hue },
  ];
  return (
    <div className={`${fill} p-4 sm:p-5`}>
      <h2 className={eyebrow}>Experience</h2>
      <ul className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <li key={r.title} className="flex items-baseline gap-2.5 text-[13px]">
            <span className={`size-2 shrink-0 -translate-y-px rounded-[2px] ${MARKER[r.hue]}`} aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">
              <span className="font-semibold">{r.title}</span>
              <span className="text-ink-3"> · {r.org}</span>
            </span>
            <span className="hidden shrink-0 font-mono text-[11px] text-ink-3 sm:inline">{r.period}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LocationTile() {
  return (
    <div className={fill}>
      <div className="map-grid absolute inset-0" aria-hidden="true" />
      <span
        className="ping-dot ping-blue absolute left-[60%] top-[44%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue"
        aria-hidden="true"
      />
      <span className="absolute bottom-4 left-4 text-[13px] font-semibold">{profile.locationShort}</span>
    </div>
  );
}

export function ResumeTile() {
  return (
    <ResumeLink
      className="absolute inset-0 rounded-[22px] bg-gold p-4 text-navy transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-navy/10">
        <ArrowUpRight size={14} aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-4 text-[15px] font-semibold">View résumé</span>
    </ResumeLink>
  );
}
