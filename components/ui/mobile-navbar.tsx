import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNavbar() {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <div className="font-bold">JM</div>

      <Sheet>
        <SheetTrigger aria-label="Open navigation">
          <Menu className="h-6 w-6" />
        </SheetTrigger>

        <SheetContent side="right">
          <div className="mt-8 flex flex-col gap-4">
            <Link href="/">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/resume">Resume</Link>
            <a href="https://github.com/ItzJM28" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
