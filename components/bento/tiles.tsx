"use client";

import { ArrowUpRight, Copy } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState, type ReactNode } from "react";
import { ResumeLink } from "@/components/resume-dialog";
import { tech } from "@/components/tech-icon";
import { education, experience, type Hue, profile, skills } from "@/lib/content";
import { localTime } from "@/lib/local-time";
import { tileSurface } from "./tile";

export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-tuscan";
const fill = `absolute inset-0 overflow-hidden ${tileSurface} ${focusRing}`;
export const eyebrow = "font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3";

/**
 * Text whose words rise into place one after another (CSS `.rise-word`, staggered
 * by --w). It still reads as one sentence to screen readers and copy-paste.
 */
export function RiseWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="rise-word inline-block" style={{ "--w": String(start + i) } as CSSProperties}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/** The small round icon in a tile's top-right corner. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="chip absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-navy-3 text-ink-2 transition-[transform,background-color,color] duration-300">
      {children}
    </span>
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
    <>
    <button type="button" onClick={copy} className={`${fill} group p-4 text-left`}>
      <span
        className="absolute inset-0 grid place-items-center text-4xl transition-transform duration-500 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110"
        aria-hidden="true"
      >
        <span className="icon-float inline-block">✉️</span>
      </span>
      <Chip>
        <Copy size={13} aria-hidden="true" />
      </Chip>
      <span className="absolute bottom-4 left-4 text-[13px] font-semibold text-tuscan transition-transform duration-300 motion-safe:group-hover:translate-x-1">
        Copy email
      </span>
    </button>
    <span
      role="status"
      aria-live="polite"
      className={`pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald px-2.5 py-1 text-[11px] font-semibold text-navy transition-all duration-300 motion-reduce:transition-none ${
        copied ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
      }`}
    >
      {copied ? "Email copied" : ""}
    </span>
    </>
  );
}

export function LinkTile({ href, label, glyph }: { href: string; label: string; glyph: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${fill} group p-4`}>
      <span
        className="absolute inset-0 grid place-items-center transition-transform duration-500 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110"
        aria-hidden="true"
      >
        <span className="icon-float inline-block" style={{ "--d": label === "GitHub" ? "-1.3s" : "-2.6s" } as CSSProperties}>
          {glyph}
        </span>
      </span>
      <Chip>
        <ArrowUpRight size={14} aria-hidden="true" />
      </Chip>
      <span className="absolute bottom-4 left-4 text-[13px] font-semibold transition-transform duration-300 motion-safe:group-hover:translate-x-1">
        {label}
      </span>
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
              <div className={`marquee inline-block ${i % 2 ? "marquee-rev text-sandy" : "text-banana"}`}>
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
  terracotta: "bg-grape",
  sandy: "bg-sandy",
  gold: "bg-tuscan",
  green: "bg-emerald",
  blue: "bg-cyan",
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

/** A real map of Bacolod (built once by scripts/make-map.mjs) with a live local-time line. */
export function LocationTile() {
  // Local time only renders in the browser, so server HTML never shows a stale or mismatched time.
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(localTime());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={fill}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a small static image; no optimiser needed */}
      <img
        src="/map/bacolod-dark.webp"
        alt="Map of Bacolod City, Philippines"
        width={1200}
        height={400}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-2 via-navy-2/30 to-transparent" aria-hidden="true" />
      <span
        className="ping-dot ping-blue absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan ring-2 ring-navy"
        aria-hidden="true"
      />
      <span className="absolute bottom-4 left-4">
        <span className="block text-[13px] font-semibold">{profile.locationShort}</span>
        <span className="block font-mono text-[11px] text-ink-2">{time ? `${time} in Bacolod` : " "}</span>
      </span>
      <span className="absolute bottom-1.5 right-3 text-[9px] text-ink-3">© OpenStreetMap contributors</span>
    </div>
  );
}

export function ResumeTile() {
  return (
    <ResumeLink
      className="absolute inset-0 rounded-[22px] bg-tuscan p-4 text-navy transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tuscan"
    >
      <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-navy/10">
        <ArrowUpRight size={14} aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-4 text-[15px] font-semibold">View résumé</span>
    </ResumeLink>
  );
}
