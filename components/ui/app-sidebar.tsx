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
    <Sidebar className="w-[min(16rem,82vw)] max-w-[16rem] border-r border-[#2f333a] bg-[#07080a] font-mono text-[#d7e0ff]">
      <SidebarHeader className="relative gap-0 border-b border-[#2f333a] p-0">
        <button
          type="button"
          onClick={closeSidebar}
          className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center border border-[#303642] bg-[#0b0d10] text-[#9aa7cf] transition hover:border-[#00ff66]/70 hover:bg-[#17191d] hover:text-[#00ff66]"
          aria-label="Close Sidebar"
        >
          <HugeiconsIcon
            icon={ArrowBigLeftDashIcon}
            size={14}
            strokeWidth={2}
          />
        </button>

        <div className="flex flex-col items-center bg-[#07080a]/50 px-4 pb-4 pt-16 text-center sm:px-5">
          <Avatar className="h-16 w-16 border border-[#303642] bg-[#0d0f13] p-1 sm:h-18 sm:w-18 group-data-[collapsible=icon]:hidden">
            <AvatarImage src="/profile.jpg" alt="John Martin Demonteverde" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>

          <div className="mt-3 group-data-[collapsible=icon]:hidden">
            <h2 className="text-xs font-bold leading-tight text-[#f8f8f2] sm:text-sm">
              John Martin Demonteverde
            </h2>

            <p className="mt-1 text-[0.6875rem] leading-4 text-[#9aa7cf]">
              Software Engineer & Front-End Developer
            </p>

            <Badge
              variant="outline"
              className="mt-2 rounded-none border-[#00ff66]/50 bg-[#00ff66]/10 px-2 py-0.5 font-mono text-[0.5625rem] uppercase"
            >
              <span className="mr-1 text-[#00ff66]">Available</span>
              Open to Work
            </Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="min-h-0 overflow-y-auto bg-[#08090c] px-1 pb-1">
        <SidebarGroup className="border-b border-[#1d222b] py-2">
          <SidebarGroupLabel className="h-auto px-3 pb-1.5 text-[0.5625rem] uppercase text-[#00ff66]">
            Identity
          </SidebarGroupLabel>

          <div className="space-y-1.5 px-3 py-1 text-[0.6875rem] leading-4 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Location01Icon}
                size={14}
                strokeWidth={2}
                className="text-[#ff5f6d]"
              />
              <span className="text-[#fef3c7]">Bacolod City, Philippines</span>
            </div>

            <div>
              <span className="font-medium text-[#ff5f6d]">Nationality:</span>{" "}
              <span className="font-extralight text-[#d7e0ff]">Filipino</span>
            </div>

            <div>
              <span className="font-medium text-[#ff5f6d]">Residence:</span>{" "}
              <span className="font-extralight text-[#d7e0ff]">
                Philippines
              </span>
            </div>

            <div>
              <span className="font-medium text-[#ff5f6d]">Age:</span>
              <span className="font-extralight text-[#d7e0ff]"> 24</span>
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup className="border-b border-[#1d222b] py-2">
          <SidebarGroupLabel className="h-auto px-3 pb-1.5 text-[0.5625rem] uppercase text-[#00ff66]">
            Languages
          </SidebarGroupLabel>

          <div className="space-y-1.5 px-3 py-1 text-[0.6875rem] leading-4 text-[#d7e0ff] group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Globe02Icon}
                size={14}
                strokeWidth={2}
                className="text-[#fef3c7]"
              />
              English
            </div>

            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Globe02Icon}
                size={14}
                strokeWidth={2}
                className="text-[#fef3c7]"
              />
              Filipino
            </div>
          </div>
        </SidebarGroup>

        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="h-auto px-3 pb-1.5 text-[0.5625rem] uppercase text-[#00ff66]">
            Contact
          </SidebarGroupLabel>

          <div className="space-y-2 px-3 py-1 text-[0.6875rem] leading-4 group-data-[collapsible=icon]:hidden">
            <div className="flex items-start gap-2">
              <HugeiconsIcon
                icon={Mail01Icon}
                size={14}
                strokeWidth={2}
                className="mt-0.5 text-[#9aa7cf]"
              />

              <span className="break-all text-[#00ff66]">
                jmc.demonteverde@gmail.com
              </span>
            </div>

            <div className="flex items-start gap-2">
              <HugeiconsIcon
                icon={Call02Icon}
                size={14}
                strokeWidth={2}
                className="mt-0.5 text-[#9aa7cf]"
              />

              <span className="text-[#00ff66]">+63 960 443 6812</span>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-[#2f333a] bg-[#17191d] px-3 py-2 sm:px-4">
        <div className="mt-1 w-full group-data-[collapsible=icon]:hidden">
          <Link
            href="/Resume_Demonteverde.pdf"
            target="_blank"
            download
            className="block w-full"
          >
            <Button
              variant="outline"
              className="h-7 w-full rounded-none border-[#303642] bg-[#0b0d10] font-mono text-[0.6875rem] text-[#d7e0ff] hover:border-[#00ff66]/70 hover:bg-[#00ff66] hover:text-[#071009]"
            >
              <HugeiconsIcon icon={Download04Icon} size={15} strokeWidth={2} />
              <span>Download Resume</span>
            </Button>
          </Link>
        </div>

        <div className="group-data-[collapsible=icon]:hidden">
          <p className="text-[0.5625rem] uppercase text-[#9aa7cf]">
            TypeScript / UTF-8
          </p>
          <p className="mt-0.5 text-xs font-semibold text-[#f8f8f2]">JMCD</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
