import type { CSSProperties } from "react";

type Tok = [kind: "kw" | "str" | "key" | "bool" | "pun" | "com" | "id" | "txt", text: string];

const K = (t: string): Tok => ["kw", t];
const S = (t: string): Tok => ["str", `"${t}"`];
const P = (t: string): Tok => ["pun", t];
const Y = (t: string): Tok => ["key", t];
const T = (t: string): Tok => ["txt", t];

const lines: Tok[][] = [
  [["com", "// developer.ts"]],
  [K("export const "), ["id", "developer"], P(" = {")],
  [T("  "), Y("name"), P(": "), S("John Martin Demonteverde"), P(",")],
  [T("  "), Y("role"), P(": "), S("Front-End Developer"), P(",")],
  [T("  "), Y("stack"), P(": ["), S("React"), P(", "), S("Next.js"), P(", "), S("TypeScript"), P("],")],
  [T("  "), Y("styling"), P(": "), S("Tailwind CSS"), P(",")],
  [T("  "), Y("based"), P(": "), S("Bacolod City, PH"), P(",")],
  [T("  "), Y("openToWork"), P(": "), ["bool", "true"], P(",")],
  [P("};")],
];

const color: Record<Tok[0], string> = {
  kw: "text-terracotta",
  str: "text-gold",
  key: "text-sandy",
  bool: "text-green",
  pun: "text-ink-3",
  com: "text-ink-3 italic",
  id: "text-ink",
  txt: "",
};

// Each line starts typing when the one before it finishes.
const CHAR_MS = 11;
const lineLength = lines.map((l) => l.reduce((n, [, t]) => n + t.length, 0) + 1);
const lineStart = lineLength.map(
  (_, i) => 450 + lineLength.slice(0, i).reduce((a, b) => a + b, 0) * CHAR_MS + i * 60,
);

export function CodeWindow({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <figure
      data-reveal="up"
      style={style}
      className={`overflow-hidden border border-line bg-navy-2 shadow-[0_24px_48px_-12px_rgb(0_0_0/0.7)] ${className}`}
    >
      <div className="flex h-10 items-center gap-2 border-b border-line px-4">
        <span className="size-3 rounded-full bg-terracotta" aria-hidden="true" />
        <span className="size-3 rounded-full bg-gold" aria-hidden="true" />
        <span className="size-3 rounded-full bg-green" aria-hidden="true" />
        <figcaption className="ml-3 font-mono text-xs text-ink-3">developer.ts</figcaption>
      </div>
      <pre className="overflow-x-auto py-5 font-mono text-[0.72rem] leading-7 sm:text-sm">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="flex">
              <span aria-hidden="true" className="w-12 shrink-0 select-none pr-4 text-right tabular-nums text-ink-3/60">
                {i + 1}
              </span>
              <span
                className="type pr-5"
                style={{ "--n": lineLength[i], "--t": `${lineStart[i]}ms`, "--speed": `${CHAR_MS}ms` } as CSSProperties}
              >
                {line.map(([k, t], j) => (
                  <span key={j} className={color[k]}>{t}</span>
                ))}
                {i === lines.length - 1 && <span aria-hidden="true" className="caret ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-gold" />}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

/** Browser window chrome around a project screenshot. */
export function BrowserFrame({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-line bg-navy-2 shadow-[0_24px_48px_-12px_rgb(0_0_0/0.7)]">
      <div className="flex h-9 items-center gap-2 border-b border-line px-3 sm:h-10 sm:px-4">
        <span className="size-2.5 rounded-full bg-terracotta sm:size-3" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-gold sm:size-3" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-green sm:size-3" aria-hidden="true" />
        <span className="ml-2 min-w-0 flex-1 truncate bg-navy px-3 py-1 font-mono text-[0.7rem] text-ink-2 sm:ml-3 sm:text-xs">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
