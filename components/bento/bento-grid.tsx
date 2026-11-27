"use client";

import { TechIcon } from "@/components/tech-icon";
import { profile, projects } from "@/lib/content";
import { useFilter } from "@/lib/use-filter";
import { Tile } from "./tile";
import { CopyEmailTile, ExperienceTile, IntroTile, LinkTile, LocationTile, ResumeTile, ToolkitTile } from "./tiles";

/** The whole home page: 12 tiles, filtered by the pills in the header. */
export function BentoGrid() {
  const [filter] = useFilter();
  const [peraflow, jdcreates, qr, lynko] = projects;

  const project = (p: (typeof projects)[number]) => (
    <div className="absolute inset-0 rounded-[22px] border border-line bg-navy-2 p-4">
      <span className="text-sm font-semibold">{p.title}</span>
    </div>
  );

  return (
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
        {project(peraflow)}
      </Tile>
      <Tile category="work" span="1x2" filter={filter} index={4}>
        {project(jdcreates)}
      </Tile>
      <Tile category="about" filter={filter} index={5}>
        <ToolkitTile />
      </Tile>
      <Tile category="about" span="2x1" filter={filter} index={6}>
        <ExperienceTile />
      </Tile>
      <Tile category="work" span="2x1" filter={filter} index={7}>
        {project(qr)}
      </Tile>
      <Tile category="work" filter={filter} index={8}>
        {project(lynko)}
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
  );
}
