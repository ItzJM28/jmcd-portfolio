"use client";

import { AnimatePresence } from "motion/react";
import { type ReactNode, useCallback, useRef, useState } from "react";
import { TechIcon } from "@/components/tech-icon";
import { profile, projects } from "@/lib/content";
import { useFilter } from "@/lib/use-filter";
import { projectCount, toolCount } from "@/lib/stats";
import { IntroCard, StatTile, VideoTile, Wordmark } from "./hero";
import { ProjectPanel } from "./project-panel";
import { ProjectTile } from "./project-tile";
import { arrange, type TileKey } from "./layout";
import { Tile } from "./tile";
import { CopyEmailTile, ExperienceTile, LinkTile, LocationTile, ResumeTile, ToolkitTile } from "./tiles";

/** The whole home page: 16 tiles. Picking a filter moves its tiles to the top and resizes them to fill whole rows. */
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

  const content: Record<TileKey, ReactNode> = {
    wordmark: <Wordmark />,
    intro: <IntroCard />,
    video: <VideoTile src={profile.showreel} poster={profile.showreelPoster} label="PeraFlow demo video" />,
    projects: <StatTile value={projectCount()} label="Projects shipped" tone="vanilla" />,
    tools: <StatTile value={toolCount()} label="Tools I build with" tone="green" />,
    email: <CopyEmailTile />,
    linkedin: <LinkTile href={profile.linkedin} label="LinkedIn" glyph={<span className="text-4xl font-extrabold tracking-tight">in</span>} />,
    peraflow: <ProjectTile project={peraflow} span="2x2" onOpen={onOpen} />,
    jdcreates: <ProjectTile project={jdcreates} span="1x2" onOpen={onOpen} />,
    toolkit: <ToolkitTile />,
    experience: <ExperienceTile />,
    qr: <ProjectTile project={qr} span="2x1" onOpen={onOpen} />,
    lynko: <ProjectTile project={lynko} span="1x1" onOpen={onOpen} />,
    location: <LocationTile />,
    github: <LinkTile href={profile.github} label="GitHub" glyph={<TechIcon id="github" size={40} />} />,
    resume: <ResumeTile />,
  };

  return (
    <>
      <section
        aria-label="Portfolio"
        className="grid auto-rows-[140px] grid-cols-2 gap-3 [grid-auto-flow:dense] lg:auto-rows-[150px] lg:grid-cols-4"
      >
        {arrange(filter).map((t, i) => (
          <Tile key={t.key} tileKey={t.key} category={t.category} filter={filter} index={i} place={t.cls} dimmed={t.dimmed}>
            {content[t.key]}
          </Tile>
        ))}
      </section>

      <AnimatePresence onExitComplete={restoreFocus}>
        {open && <ProjectPanel key={open.slug} project={open} onClose={onClose} />}
      </AnimatePresence>
    </>
  );
}
