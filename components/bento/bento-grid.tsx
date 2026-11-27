"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { TechIcon } from "@/components/tech-icon";
import { profile, projects } from "@/lib/content";
import { useFilter } from "@/lib/use-filter";
import { projectCount, toolCount } from "@/lib/stats";
import { IntroCard, StatTile, VideoTile, Wordmark } from "./hero";
import { ProjectPanel } from "./project-panel";
import { ProjectTile } from "./project-tile";
import { Tile } from "./tile";
import { CopyEmailTile, ExperienceTile, LinkTile, LocationTile, ResumeTile, ToolkitTile } from "./tiles";

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
        {/* Hero. Phones keep this DOM order; desktop pins each piece with lg: placement. */}
        <Tile category="about" filter={filter} index={0} place="col-span-2 lg:col-span-3 lg:col-start-2 lg:row-start-1">
          <Wordmark />
        </Tile>
        <Tile category="about" filter={filter} index={1} place="col-span-2 row-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1">
          <IntroCard />
        </Tile>
        <Tile category="about" filter={filter} index={2} place="col-span-2 lg:col-start-2 lg:row-start-2 lg:row-span-2">
          <VideoTile src={profile.showreel} poster={profile.showreelPoster} label="PeraFlow demo video" />
        </Tile>
        <Tile category="work" filter={filter} index={3} place="lg:col-start-4 lg:row-start-2">
          <StatTile value={projectCount()} label="Projects shipped" tone="vanilla" />
        </Tile>
        <Tile category="about" filter={filter} index={4} place="lg:col-start-4 lg:row-start-3">
          <StatTile value={toolCount()} label="Tools I build with" tone="green" />
        </Tile>
        <Tile category="contact" filter={filter} index={5}>
          <CopyEmailTile />
        </Tile>
        <Tile category="contact" filter={filter} index={6}>
          <LinkTile
            href={profile.linkedin}
            label="LinkedIn"
            glyph={<span className="text-4xl font-extrabold tracking-tight">in</span>}
          />
        </Tile>
        <Tile category="work" span="2x2" filter={filter} index={7}>
          <ProjectTile project={peraflow} span="2x2" onOpen={onOpen} />
        </Tile>
        <Tile category="work" span="1x2" filter={filter} index={8}>
          <ProjectTile project={jdcreates} span="1x2" onOpen={onOpen} />
        </Tile>
        <Tile category="about" span="2x1" filter={filter} index={9}>
          <ToolkitTile />
        </Tile>
        <Tile category="about" span="2x1" filter={filter} index={10}>
          <ExperienceTile />
        </Tile>
        <Tile category="work" span="2x1" filter={filter} index={11}>
          <ProjectTile project={qr} span="2x1" onOpen={onOpen} />
        </Tile>
        <Tile category="work" filter={filter} index={12}>
          <ProjectTile project={lynko} span="1x1" onOpen={onOpen} />
        </Tile>
        <Tile category="about" span="2x1" filter={filter} index={13}>
          <LocationTile />
        </Tile>
        <Tile category="contact" filter={filter} index={14}>
          <LinkTile href={profile.github} label="GitHub" glyph={<TechIcon id="github" size={40} />} />
        </Tile>
        <Tile category="contact" span="2x1" filter={filter} index={15}>
          <ResumeTile />
        </Tile>
      </section>

      <AnimatePresence onExitComplete={restoreFocus}>
        {open && <ProjectPanel key={open.slug} project={open} onClose={onClose} />}
      </AnimatePresence>
    </>
  );
}
