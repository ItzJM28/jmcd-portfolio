import { Logo } from "@/components/logo";
import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </div>
        <span className="font-mono text-xs">Built with Next.js + Tailwind CSS</span>
      </div>
    </footer>
  );
}
