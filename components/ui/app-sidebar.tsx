import { HugeiconsIcon } from "@hugeicons/react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Home01Icon,
  GridIcon,
  BookIcon,
  Settings01Icon,
  LicenseIcon,
  WorkIcon,
  UserArrowLeftRightIcon,
} from "@hugeicons/core-free-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  return (
    <>
      <Sidebar
        collapsible="icon"
        className="max-w-[18rem] bg-slate-950 text-slate-50 "
      >
        <SidebarHeader className="space-y-2 px-4 py-4">
          <SidebarContent>
            <div className="flex items-center gap-3">
              <a href="/">
                <SidebarMenuButton
                  tooltip="Dashboard"
                  className="h-auto min-h-[56px] items-start py-2"
                >
                  {/* <HugeiconsIcon icon={Home01Icon} strokeWidth={2} /> */}
                  <span className="icon"></span>
                  {/* <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@jd"
                    className="grayscale"
                  />
                </Avatar> */}
                  <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-semibold">
                      John Martin Demonteverde
                    </p>

                    <Badge variant="outline" className="mt-1 h-fit">
                      <span className="text-green-500">•</span>
                      Open to Work
                    </Badge>
                  </div>
                </SidebarMenuButton>
              </a>
            </div>
          </SidebarContent>
        </SidebarHeader>

        <SidebarContent className="space-y-4 px-2 py-2">
          <SidebarGroup className="space-y-2">
            <SidebarGroupLabel className="px-2">Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <a href="/" className="hre">
                  <SidebarMenuButton tooltip="About">
                    <HugeiconsIcon
                      icon={UserArrowLeftRightIcon}
                      strokeWidth={2}
                    />
                    <span>About</span>
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <a href="/projects" className="hre">
                  <SidebarMenuButton tooltip="Projects">
                    <HugeiconsIcon icon={BookIcon} strokeWidth={2} />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Apps">
                  <HugeiconsIcon icon={LicenseIcon} strokeWidth={2} />
                  <span>Resume</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Apps">
                  <HugeiconsIcon icon={WorkIcon} strokeWidth={2} />
                  <span>Services</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="space-y-2">
            <SidebarGroupLabel className="px-2">Settings</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Preferences">
                  <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
                  <span>Preferences</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border px-4 py-4">
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="text-xs text-muted-foreground">Developed by</div>
            <div className="mt-2 text-sm font-semibold">JMCD</div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
