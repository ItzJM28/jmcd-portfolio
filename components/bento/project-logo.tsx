import Image from "next/image";
import type { CSSProperties } from "react";
import { Mark } from "@/components/logo";
import type { ProjectLogoId } from "@/lib/content";

const QR_PATH =
  "M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h2v2h-2zM17 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2z";

const tile: Record<ProjectLogoId, { className: string; style?: CSSProperties }> = {
  // The PeraFlow logo file already includes its green rounded square.
  peraflow: { className: "overflow-hidden" },
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
        <Image src="/logos/peraflow.png" alt="" width={512} height={512} sizes="160px" className="size-full" />
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
