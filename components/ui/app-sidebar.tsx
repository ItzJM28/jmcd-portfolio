"use client";

import Link from "next/link";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowBigLeftDashIcon,
  Call02Icon,
  Globe02Icon,
  Location01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();

  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <Sidebar className="w-[min(18rem,85vw)] max-w-[18rem] bg-slate-950 text-slate-50 border-r border-slate-800">
      <SidebarHeader className="relative border-b border-slate-800">
        <button
          type="button"
          onClick={closeSidebar}
          className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-800 hover:text-slate-50"
          aria-label="Close Sidebar"
        >
          <HugeiconsIcon
            icon={ArrowBigLeftDashIcon}
            size={14}
            strokeWidth={2}
          />
        </button>

        <div className="flex flex-col items-center px-4 pb-5 pt-12 text-center sm:px-5 sm:pb-6">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 group-data-[collapsible=icon]:hidden">
            <AvatarImage src="/profile.jpg" alt="John Martin Demonteverde" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>

          <div className="mt-4 group-data-[collapsible=icon]:hidden">
            <h2 className="text-sm font-bold leading-tight sm:text-base">
              John Martin Demonteverde
            </h2>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Software Engineer & Front-End Developer
            </p>

            <Badge
              variant="outline"
              className="mt-3 border-blue-500/30 bg-blue-950"
            >
              <span className="mr-1 text-blue-500">●</span>
              Open to Work
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="min-h-0 overflow-y-auto px-1 pb-2">
        <SidebarGroup>
          <SidebarGroupLabel>Identity</SidebarGroupLabel>

          <div className="space-y-2 px-3 py-1.5 text-xs sm:space-y-3 sm:py-2 sm:text-sm group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={2} />
              <span>Bacolod City, Philippines</span>
            </div>

            <div>
              <span className="font-medium">Nationality:</span>{" "}
              <span className="font-extralight">Filipino</span>
            </div>

            <div>
              <span className="font-medium">Residence:</span>{" "}
              <span className="font-extralight">Philippines</span>
            </div>

            <div>
              <span className="font-medium">Age:</span>
              <span className="font-extralight"> 24</span>
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Languages</SidebarGroupLabel>

          <div className="space-y-2 px-3 py-2 text-sm group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Globe02Icon} size={16} strokeWidth={2} />
              English
            </div>

            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Globe02Icon} size={16} strokeWidth={2} />
              Filipino
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Contact</SidebarGroupLabel>

          <div className="space-y-3 px-3 py-2 text-sm group-data-[collapsible=icon]:hidden">
            <div className="flex items-start gap-2">
              <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={2} />

              <span className="break-all text-slate-300">
                jmc.demonteverde@gmail.com
              </span>
            </div>

            <div className="flex items-start gap-2">
              <HugeiconsIcon icon={Call02Icon} size={16} strokeWidth={2} />

              <span className="text-slate-300">+63 960 443 6812</span>
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tech Stack</SidebarGroupLabel>

          <div className="flex flex-wrap gap-2 px-3 py-2 group-data-[collapsible=icon]:hidden">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind</Badge>
            <Badge variant="secondary">Node.js</Badge>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800 px-3 py-3 sm:px-4 sm:py-4">
        <div className="mt-1 w-full group-data-[collapsible=icon]:hidden">
          <Link
            href="/resume.pdf"
            target="_blank"
            download
            className="block w-full"
          >
            <Button variant="outline" className="w-full">
              <HugeiconsIcon icon={Download04Icon} size={18} strokeWidth={2} />
              <span>Download Resume</span>
            </Button>
          </Link>
        </div>

        <div className="group-data-[collapsible=icon]:hidden">
          <p className="text-xs text-slate-500">Developed by</p>
          <p className="mt-1 text-sm font-semibold">JMCD</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
