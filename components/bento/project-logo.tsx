import type { CSSProperties } from "react";
import { Mark } from "@/components/logo";
import type { ProjectLogoId } from "@/lib/content";

const QR_PATH =
  "M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h2v2h-2zM17 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2z";

const tile: Record<ProjectLogoId, { className: string; style?: CSSProperties }> = {
  peraflow: { className: "", style: { background: "#34b98a", color: "#06140f" } },
  jdcreates: { className: "border border-line bg-navy text-ink" },
  qr: { className: "text-white", style: { background: "#f55a00" } },
  lynko: { className: "text-terracotta", style: { background: "#1a1f2e" } },
};

/** Each app's own logo, on its own coloured rounded square. */
export function ProjectLogo({ id, className = "" }: { id: ProjectLogoId; className?: string }) {
  const t = tile[id];
  return (
    <span
      data-logo={id}
      style={t.style}
      className={`grid aspect-square place-items-center rounded-[24%] ${t.className} ${className}`}
    >
      {id === "peraflow" && (
        <svg viewBox="0 0 24 24" className="w-[58%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 20V5h7a4.5 4.5 0 0 1 0 9H6" />
          <path d="M3 9.5h12M3 13h9" />
        </svg>
      )}
      {id === "jdcreates" && <Mark className="w-[52%]" />}
      {id === "qr" && (
        <svg viewBox="0 0 24 24" className="w-[70%]" fill="currentColor" aria-hidden="true">
          <path d={QR_PATH} />
        </svg>
      )}
      {id === "lynko" && (
        <svg viewBox="0 0 200 100" className="w-[72%]" fill="none" stroke="currentColor" strokeWidth="18" aria-hidden="true">
          <circle cx="70" cy="50" r="38" />
          <circle cx="130" cy="50" r="38" style={{ mixBlendMode: "screen" }} />
        </svg>
      )}
    </span>
  );
}
