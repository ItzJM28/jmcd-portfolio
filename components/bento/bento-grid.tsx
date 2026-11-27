"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { TechIcon } from "@/components/tech-icon";
import { profile, projects } from "@/lib/content";
import { useFilter } from "@/lib/use-filter";
import { ProjectPanel } from "./project-panel";
import { ProjectTile } from "./project-tile";
import { Tile } from "./tile";
import { CopyEmailTile, ExperienceTile, IntroTile, LinkTile, LocationTile, ResumeTile, ToolkitTile } from "./tiles";

/** The whole home page: 12 tiles, filtered by the pills in the header. */
export function BentoGrid() {
  const [filter] = useFilter();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [peraflow, jdcreates, qr, lynko] = projects;
  const open = projects.find((p) => p.slug === openSlug);

  const onOpen = useCallback((slug: string, el: HTMLElement) => {
    trigger.current = el;
    setOpenSlug(slug);
  }, []);
  const onClose = useCallback(() => setOpenSlug(null), []);

  // Give focus back to the tile that opened the panel, unless a filter has since dimmed it.
  const restoreFocus = () => {
    const el = trigger.current;
    if (el && el.isConnected && !el.closest("[inert]")) el.focus();
    trigger.current = null;
  };

  return (
    <>
      <section
        aria-label="Portfolio"
        className="grid auto-rows-[140px] grid-cols-2 gap-3 [grid-auto-flow:dense] lg:auto-rows-[150px] lg:grid-cols-4"
      >
        <Tile category="about" span="2x1" filter={filter} index={0}>
          <IntroTile />
        </Tile>
        <Tile category="contact" filter={filter} index={1}>
          <CopyEmailTile />
        </Tile>
        <Tile category="contact" filter={filter} index={2}>
          <LinkTile
            href={profile.linkedin}
            label="LinkedIn"
            glyph={<span className="text-4xl font-extrabold tracking-tight">in</span>}
          />
        </Tile>
        <Tile category="work" span="2x2" filter={filter} index={3}>
          <ProjectTile project={peraflow} span="2x2" onOpen={onOpen} />
        </Tile>
        <Tile category="work" span="1x2" filter={filter} index={4}>
          <ProjectTile project={jdcreates} span="1x2" onOpen={onOpen} />
        </Tile>
        <Tile category="about" filter={filter} index={5}>
          <ToolkitTile />
        </Tile>
        <Tile category="about" span="2x1" filter={filter} index={6}>
          <ExperienceTile />
        </Tile>
        <Tile category="work" span="2x1" filter={filter} index={7}>
          <ProjectTile project={qr} span="2x1" onOpen={onOpen} />
        </Tile>
        <Tile category="work" filter={filter} index={8}>
          <ProjectTile project={lynko} span="1x1" onOpen={onOpen} />
        </Tile>
        <Tile category="about" filter={filter} index={9}>
          <LocationTile />
        </Tile>
        <Tile category="contact" filter={filter} index={10}>
          <LinkTile href={profile.github} label="GitHub" glyph={<TechIcon id="github" size={40} />} />
        </Tile>
        <Tile category="contact" filter={filter} index={11}>
          <ResumeTile />
        </Tile>
      </section>

      <AnimatePresence onExitComplete={restoreFocus}>
        {open && <ProjectPanel key={open.slug} project={open} onClose={onClose} />}
      </AnimatePresence>
    </>
  );
}
