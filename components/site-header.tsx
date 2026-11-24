import Link from "next/link";
import { Logo } from "@/components/logo";
import { ResumeLink } from "@/components/resume-dialog";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience", wide: true },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6"
      >
        <Link href="/" className="mr-auto text-lg" aria-label="John Martin Demonteverde, home">
          <Logo />
        </Link>

        <ul className="flex items-center gap-5 text-[0.95rem] text-ink-2">
          {links.map((l) => (
            <li key={l.href} className={l.wide ? "hidden md:block" : undefined}>
              <Link href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <ResumeLink className="inline-flex h-9 items-center border border-gold/70 px-3.5 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-navy">
          Résumé
        </ResumeLink>
      </nav>
      <div aria-hidden="true" className="scroll-progress absolute inset-x-0 -bottom-px h-0.5" />
    </header>
  );
}
