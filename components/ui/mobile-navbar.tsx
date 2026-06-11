import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";

type Props = {};

function MobileNavbar() {
  return (
    <div className="flex items-center justify-between w-full p-4">
      <div className="font-bold">JM</div>

      <Sheet>
        <SheetTrigger>
          <Menu className="h-6 w-6" />
        </SheetTrigger>

        <SheetContent side="right">
          <div className="flex flex-col gap-4 mt-8">
            <a href="/">About</a>
            <a href="/projects">Projects</a>
            <a href="/resume">Resume</a>
            <a href="https://github.com/ItzJM28">GitHub</a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
