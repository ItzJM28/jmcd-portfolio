import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const resumeUrl = "/Resume_Demonteverde.pdf";

export default function ResumePage() {
  return (
    <main className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Resume
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-normal sm:text-4xl">
              John Martin Demonteverde
            </h1>
          </div>

          <a
            href={resumeUrl}
            download
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            <Download className="size-4" />
            Download PDF
          </a>
        </div>

        <div className="min-h-[70vh] overflow-hidden rounded-lg border border-border bg-card">
          <object
            data={resumeUrl}
            type="application/pdf"
            className="h-[72vh] w-full"
          >
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Your browser cannot preview this PDF here. Download it to view
                the resume.
              </p>
              <a
                href={resumeUrl}
                download
                className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
              >
                <Download className="size-4" />
                Download PDF
              </a>
            </div>
          </object>
        </div>
      </section>
    </main>
  );
}
