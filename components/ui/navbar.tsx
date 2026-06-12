"use client";

import * as React from "react";
import NextLink from "next/link";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { useMediaQuery } from "@base-ui/react/unstable-use-media-query";
import { audienceMenus } from "./data/data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import styles from "./css/index.module.css";

export default function ExampleNavigationMenu() {
  const [isContactDialogOpen, setContactDialogOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 700px)", {
    defaultMatches: true,
  });

  function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setContactDialogOpen(false);
  }

  return (
    <NavigationMenu.Root className={styles.Root}>
      <NavigationMenu.List className={styles.List}>
        {/* New Navbar Items */}
        <NavigationMenu.Item>
          <Link className={styles.Trigger} href="/">
            About
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link className={styles.Trigger} href="/projects">
            Projects
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link className={styles.Trigger} href="/resume">
            Resume
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className={styles.Trigger}>
            Services
            <NavigationMenu.Icon className={styles.Icon}>
              <CaretDownIcon />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content
            className={`${styles.Content} ${styles.ProductContent}`}
          >
            <NavigationMenu.Root
              className={styles.SubmenuRoot}
              orientation={isDesktop ? "vertical" : "horizontal"}
              defaultValue={audienceMenus[0].value}
            >
              <div className={styles.SubmenuLayout}>
                <NavigationMenu.List className={styles.SubmenuList}>
                  {audienceMenus.map((menu) => (
                    <NavigationMenu.Item key={menu.value} value={menu.value}>
                      <NavigationMenu.Trigger className={styles.SubmenuTrigger}>
                        <span className={styles.SubmenuLabel}>
                          {menu.label}
                        </span>
                        <span className={styles.SubmenuHint}>{menu.hint}</span>
                      </NavigationMenu.Trigger>

                      <NavigationMenu.Content className={styles.SubmenuContent}>
                        <div>
                          <h4 className={styles.SubmenuTitle}>{menu.title}</h4>
                          <p className={styles.SubmenuDescription}>
                            {menu.description}
                          </p>
                        </div>

                        <ul className={styles.LinkList}>
                          {menu.links.map((link) => (
                            <li key={`${menu.value}-${link.title}`}>
                              <Link
                                className={styles.LinkCard}
                                href={link.href}
                              >
                                <h5 className={styles.LinkTitle}>
                                  {link.title}
                                </h5>
                                <p className={styles.LinkDescription}>
                                  {link.description}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  ))}
                </NavigationMenu.List>

                <NavigationMenu.Viewport className={styles.SubmenuViewport} />
              </div>
            </NavigationMenu.Root>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <AlertDialog
            open={isContactDialogOpen}
            onOpenChange={setContactDialogOpen}
          >
            <AlertDialogTrigger className={styles.Trigger}>
              Contact Me
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[calc(100vw-1.5rem)] gap-0 overflow-hidden rounded-none border border-[#2f333a] bg-[#07080a] p-0 font-mono text-[#d7e0ff] shadow-2xl ring-0 sm:max-w-[40rem]">
              <div className="flex h-7 items-center justify-between border-b border-[#2f333a] bg-[#17191d] px-3 text-[0.625rem] uppercase tracking-normal text-[#9aa7cf]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#ff5f56]" />
                  <span className="size-2 rounded-full bg-[#ffbd2e]" />
                  <span className="size-2 rounded-full bg-[#27c93f]" />
                  <span className="ml-2 text-[#00ff66]">Online</span>
                  <span>/ contact.tsx</span>
                </div>
                <span>01</span>
              </div>

              <form className="grid gap-0" onSubmit={handleContactSubmit}>
                <div className="grid gap-3 px-4 py-4 sm:px-6">
                  <AlertDialogHeader className="grid-cols-[2rem_1fr] place-items-start gap-x-3 text-left">
                    <span className="pt-0.5 text-right text-xs text-[#6f7ba3]">
                      1
                    </span>
                    <div>
                      <AlertDialogTitle className="font-mono text-sm font-semibold text-[#00ff66]">
                        {"// Start a conversation"}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="mt-1 font-mono text-xs text-[#8da2d9]">
                        Fill out the fields below and I will follow up soon.
                      </AlertDialogDescription>
                    </div>
                  </AlertDialogHeader>

                  <div className="grid gap-3">
                    <label className="grid grid-cols-[2rem_1fr] gap-x-3 text-xs font-medium">
                      <span className="pt-2 text-right text-[#6f7ba3]">2</span>
                      <span className="grid gap-1">
                        <span>
                          <span className="text-[#ff5f6d]">name</span>
                          <span className="text-white">:</span>
                        </span>
                        <Input
                          className="h-9 rounded-none border-[#303642] bg-[#0b0d10] text-[#f8f8f2] caret-[#00ff66] focus-visible:border-[#00ff66] focus-visible:ring-[#00ff66]/25"
                          name="name"
                          autoComplete="name"
                          required
                        />
                      </span>
                    </label>

                    <label className="grid grid-cols-[2rem_1fr] gap-x-3 text-xs font-medium">
                      <span className="pt-2 text-right text-[#6f7ba3]">3</span>
                      <span className="grid gap-1">
                        <span>
                          <span className="text-[#ff5f6d]">email</span>
                          <span className="text-white">:</span>
                        </span>
                        <Input
                          className="h-9 rounded-none border-[#303642] bg-[#0b0d10] text-[#f8f8f2] caret-[#00ff66] focus-visible:border-[#00ff66] focus-visible:ring-[#00ff66]/25"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                        />
                      </span>
                    </label>

                    <label className="grid grid-cols-[2rem_1fr] gap-x-3 text-xs font-medium">
                      <span className="pt-2 text-right text-[#6f7ba3]">4</span>
                      <span className="grid gap-1">
                        <span>
                          <span className="text-[#ff5f6d]">message</span>
                          <span className="text-white">:</span>
                        </span>
                        <textarea
                          name="message"
                          required
                          rows={5}
                          className="w-full resize-none rounded-none border border-[#303642] bg-[#0b0d10] px-2 py-1.5 text-sm text-[#f8f8f2] caret-[#00ff66] outline-none transition-colors placeholder:text-[#6f7ba3] focus-visible:border-[#00ff66] focus-visible:ring-2 focus-visible:ring-[#00ff66]/25 md:text-xs/relaxed"
                        />
                      </span>
                    </label>

                    <div className="grid grid-cols-[2rem_1fr] gap-x-3 text-xs">
                      <span className="text-right text-[#6f7ba3]">5</span>
                      <span>
                        <span className="text-[#ff5f6d]">available</span>
                        <span className="text-white">: </span>
                        <span className="text-[#00ff66]">true</span>
                      </span>
                    </div>
                  </div>
                </div>

                <AlertDialogFooter className="border-t border-[#2f333a] bg-[#17191d] px-3 py-2 sm:justify-between">
                  <span className="hidden text-[0.625rem] uppercase text-[#9aa7cf] sm:block">
                    TypeScript / UTF-8
                  </span>
                  <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <AlertDialogCancel
                      className="rounded-none border-[#303642] bg-transparent font-mono text-[#9aa7cf] hover:bg-[#23262d] hover:text-white"
                      type="button"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="rounded-none bg-[#00ff66] font-mono text-[#071009] hover:bg-[#41ff8f]"
                      type="submit"
                    >
                      Send message
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link
            className={styles.Trigger}
            href="https://github.com/ItzJM28"
            target="_blank"
          >
            GitHub
          </Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          className={styles.Positioner}
          sideOffset={10}
          collisionPadding={{
            top: 5,
            bottom: 5,
            left: 20,
            right: 20,
          }}
          collisionAvoidance={{ side: "none" }}
        >
          <NavigationMenu.Popup className={styles.Popup}>
            <NavigationMenu.Arrow className={styles.Arrow} />
            <NavigationMenu.Viewport className={styles.Viewport} />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

function Link(props: NavigationMenu.Link.Props) {
  return (
    <NavigationMenu.Link
      render={<NextLink href={props.href ?? "#"} />}
      {...props}
    />
  );
}

function CaretDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}
