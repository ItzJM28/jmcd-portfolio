import Link from "next/link";
import { FilterPills } from "@/components/bento/filter-pills";
import { Logo } from "@/components/logo";
import { ResumeLink } from "@/components/resume-dialog";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6"
      >
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center" aria-label="John Martin Demonteverde, home">
            <Logo className="h-6 sm:h-7" />
          </Link>
        </div>

        <div className="lg:hidden">
          <FilterPills />
        </div>

        <div className="hidden flex-1 justify-end lg:flex">
          <ResumeLink className="inline-flex h-9 items-center rounded-lg border border-tuscan/70 px-3.5 text-sm font-medium text-tuscan transition-colors hover:bg-tuscan hover:text-navy">
            Résumé
          </ResumeLink>
        </div>
        <div className="flex-1 lg:hidden" aria-hidden="true" />
      </nav>
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-0.5" />
    </header>
  );
}
