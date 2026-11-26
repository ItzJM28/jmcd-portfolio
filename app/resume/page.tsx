import type { Metadata } from "next";
import { Download } from "lucide-react";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Résumé · John Martin Demonteverde",
  description: "Résumé of John Martin Demonteverde, front-end developer.",
};

export default function ResumePage() {
  return (
    <section aria-labelledby="resume" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h1
          id="resume"
          className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl"
        >
          Résumé
        </h1>
        <a
          href={profile.resume}
          download
          className="inline-flex h-12 items-center justify-center gap-2 bg-gold px-5 font-medium text-navy transition-colors hover:bg-vanilla"
        >
          <Download size={18} aria-hidden="true" />
          Download PDF
        </a>
      </div>

      <div className="mt-10 border border-line bg-navy-2">
        <object data={profile.resume} type="application/pdf" className="h-[80vh] w-full">
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6 text-center text-ink-2">
            <p className="max-w-md">
              Your browser can’t show the PDF here. Download it to read the résumé.
            </p>
            <a href={profile.resume} download className="font-medium text-gold underline decoration-2">
              Download PDF
            </a>
          </div>
        </object>
      </div>
    </section>
  );
}
