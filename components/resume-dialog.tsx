"use client";

import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { profile } from "@/lib/content";

const OPEN_EVENT = "resume:open";

/**
 * Link to /resume that opens the résumé in a modal instead. Without JavaScript
 * (or with a modifier key held) it still goes to the /resume page.
 */
export function ResumeLink({ className, children }: { className?: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    window.dispatchEvent(new Event(OPEN_EVENT));
  };
  return (
    <a href="/resume" onClick={onClick} className={className} aria-haspopup="dialog">
      {children}
    </a>
  );
}

/** The résumé modal. Mounted once in the layout. */
export function ResumeDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  // Only load the PDF the first time the modal opens.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const open = () => {
      setLoaded(true);
      ref.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="resume-title"
      className="resume-dialog m-auto flex h-fit sm:h-[min(52rem,calc(100dvh-2rem))] w-[min(60rem,calc(100vw-2rem))] max-h-none max-w-none flex-col overflow-hidden border border-line bg-navy-2 p-0 text-ink shadow-[0_32px_64px_-16px_rgb(0_0_0/0.7)] [&:not([open])]:hidden"
      // A click on the backdrop lands on the dialog element itself.
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
        <span className="hidden gap-2 sm:flex" aria-hidden="true">
          <span className="size-3 rounded-full bg-grape" />
          <span className="size-3 rounded-full bg-tuscan" />
          <span className="size-3 rounded-full bg-emerald" />
        </span>
        <h2 id="resume-title" className="min-w-0 flex-1 truncate font-mono text-sm text-ink-2 sm:ml-2">
          Resume_Demonteverde.pdf
        </h2>
        <a
          href={profile.resume}
          download
          className="inline-flex h-9 items-center gap-2 bg-tuscan px-3.5 text-sm font-medium text-navy transition-colors hover:bg-banana"
        >
          <Download size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Download</span>
          <span className="sr-only sm:hidden">Download PDF</span>
        </a>
        <button
          type="button"
          onClick={close}
          className="inline-flex size-9 items-center justify-center border border-line text-ink-2 transition-colors hover:border-ink-2 hover:text-ink"
          aria-label="Close résumé"
          autoFocus
        >
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      <div className="relative flex-1 bg-navy">
        {loaded && (
          <iframe
            src={`${profile.resume}#view=FitH`}
            title="John Martin Demonteverde résumé"
            className="hidden h-full w-full sm:block"
          />
        )}
        {/* Phone browsers can't show a PDF inside a page, so offer to open it. */}
        <div className="flex flex-col items-center justify-center gap-5 px-6 py-14 text-center sm:hidden">
          <p className="max-w-xs text-ink-2">Open the PDF to read it full screen, or download a copy.</p>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 border border-line px-5 font-medium transition-colors hover:border-ink-2"
          >
            <ExternalLink size={18} aria-hidden="true" />
            Open PDF
          </a>
        </div>
      </div>
    </dialog>
  );
}
