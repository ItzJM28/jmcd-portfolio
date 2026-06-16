"use client";

import * as React from "react";
import NextLink from "next/link";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { useMediaQuery } from "@base-ui/react/unstable-use-media-query";
import { Menu } from "lucide-react";
import { audienceMenus } from "./data/data";

import styles from "./css/index.module.css";

export default function ExampleNavigationMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 700px)", {
    defaultMatches: true,
  });

  return (
    <NavigationMenu.Root className={styles.Root}>
      <button
        type="button"
        className={styles.MobileMenuButton}
        aria-controls="portfolio-navigation"
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation"
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
      >
        <Menu aria-hidden="true" size={18} />
        <span>Menu</span>
      </button>

      <NavigationMenu.List
        id="portfolio-navigation"
        className={styles.List}
        data-open={isMobileMenuOpen}
      >
        {/* New Navbar Items */}
        <NavigationMenu.Item>
          <Link
            className={styles.Trigger}
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link
            className={styles.Trigger}
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link
            className={styles.Trigger}
            href="/resume"
            onClick={() => setMobileMenuOpen(false)}
          >
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
          <Link
            className={styles.Trigger}
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Me
          </Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <Link
            className={styles.Trigger}
            href="https://github.com/ItzJM28"
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
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
