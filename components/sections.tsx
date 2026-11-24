import Image from "next/image";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { GithubIcon } from "@dev.icons/react/mono";
import { BrowserFrame, CodeWindow } from "@/components/code-window";
import { TechIcon, tech } from "@/components/tech-icon";
import { SplitWords, TypeIn, delay } from "@/components/text";
import { ResumeLink } from "@/components/resume-dialog";
import {
  education,
  experience,
  profile,
  projects,
  skills,
  type Hue,
  type Project,
} from "@/lib/content";

const hueText: Record<Hue, string> = {
  terracotta: "text-terracotta",
  gold: "text-gold",
  blue: "text-blue",
  sandy: "text-sandy",
  green: "text-green",
};

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.5 4.8 5.76V21h-4v-5.2c0-1.24-.02-2.84-1.85-2.84-1.85 0-2.13 1.35-2.13 2.75V21h-4V9.75Z" />
    </svg>
  );
}

/** Heading written as a component tag; the name types itself in on scroll. */
function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      data-reveal="up"
      aria-label={children.replace(/([a-z])([A-Z])/g, "$1 $2")}
      className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl"
    >
      <span aria-hidden="true" className="font-mono font-normal text-terracotta">&lt;</span>
      <TypeIn text={children} start={250} />
      <span aria-hidden="true" className="font-mono font-normal text-blue"> /&gt;</span>
    </h2>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

export function Hero() {
  return (
    <section aria-labelledby="intro" className="relative isolate">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-20" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-8 pt-14 sm:px-6 sm:pt-24 lg:grid-cols-12 lg:gap-12">
        <div className="flex min-w-0 flex-col gap-7 lg:col-span-6">
          <p data-reveal="up" className="flex items-center gap-3 font-mono text-sm text-ink-2">
            <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-green opacity-60 motion-reduce:hidden" />
              <span className="relative size-2.5 rounded-full bg-green" />
            </span>
            <span>Open to front-end roles · {profile.location}</span>
          </p>
          <h1
            id="intro"
            data-reveal="words"
            className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]"
          >
            <SplitWords text="John Martin Demonteverde" start={100} step={110} />
          </h1>
          <p data-reveal="up" style={delay(450)} className="max-w-[36rem] text-lg leading-relaxed text-ink-2 sm:text-xl">
            <span className="text-vanilla">Front-end developer</span> building
            responsive, accessible web apps with React, Next.js and TypeScript.
            Previously a Software Engineer Associate at Accenture.
          </p>

          <div data-reveal="up" style={delay(600)} className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 bg-gold px-5 font-medium text-navy transition-colors hover:bg-vanilla"
            >
              See my work
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 items-center gap-2 border border-line px-5 font-medium text-ink transition-colors hover:border-ink-2"
            >
              <Mail size={18} aria-hidden="true" />
              Email me
            </a>
          </div>

          <ul data-reveal="up" style={delay(720)} className="flex gap-5 text-ink-2">
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-ink">
                <GithubIcon size={18} aria-hidden="true" />
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-ink">
                <LinkedInIcon />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div className="relative isolate min-w-0 lg:col-span-6">
          <div aria-hidden="true" data-reveal="pop" style={delay(300)} className="drift absolute -right-4 -top-8 -z-10 aspect-square w-[45%] rounded-full bg-blue sm:-right-8 sm:-top-10" />
          <div aria-hidden="true" data-reveal="pop" style={delay(450)} className="drift absolute -bottom-8 -left-4 -z-10 aspect-[2/1] w-[40%] origin-bottom rounded-t-full bg-sandy sm:-left-8" />
          <CodeWindow style={delay(200)} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Work ───────────────────────── */

const backdrop: Record<Hue, string> = {
  green: "-left-6 -top-8 aspect-square w-[58%] rounded-full bg-green sm:-left-10 sm:-top-12",
  sandy: "-right-6 -bottom-8 aspect-[2/1] w-[64%] rounded-t-full bg-sandy sm:-right-10 sm:-bottom-10",
  blue: "-right-6 -top-8 aspect-square w-[50%] rounded-tl-full bg-blue sm:-right-10 sm:-top-10",
  gold: "-left-6 -top-8 aspect-square w-[50%] rounded-full bg-gold sm:-left-10 sm:-top-10",
  terracotta: "-left-6 -bottom-8 aspect-square w-[44%] bg-terracotta sm:-left-10 sm:-bottom-10",
};

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div data-reveal="frame" className="relative isolate">
      <div aria-hidden="true" data-reveal="pop" style={delay(250)} className={`drift absolute -z-10 ${backdrop[project.hue]}`} />
      <div className="wipe">
      <BrowserFrame url={(project.liveUrl ?? project.sourceUrl).replace(/^https:\/\//, "")}>
        {project.image ? (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden">
            <span className="sr-only">Open {project.title} live site</span>
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
            />
          </a>
        ) : (
          <div className="flex aspect-[16/10] flex-col items-center justify-center gap-6 bg-navy">
            {/* Two overlapping rings: a chain link, drawn in the palette. */}
            <svg viewBox="0 0 200 100" className="w-2/5" aria-hidden="true">
              <circle cx="70" cy="50" r="38" fill="none" strokeWidth="18" className="stroke-terracotta" style={{ mixBlendMode: "screen" }} />
              <circle cx="130" cy="50" r="38" fill="none" strokeWidth="18" className="stroke-terracotta" style={{ mixBlendMode: "screen" }} />
            </svg>
            <p className="font-mono text-xs text-ink-3 sm:text-sm">source on GitHub · no live demo yet</p>
          </div>
        )}
      </BrowserFrame>
      </div>
    </div>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <ProjectVisual project={project} />
      </div>

      <div className="lg:col-span-5">
        <h3
          data-reveal="words"
          className={`font-display text-2xl font-medium tracking-[-0.02em] sm:text-3xl ${hueText[project.hue]}`}
        >
          <SplitWords text={project.title} start={150} />
        </h3>
        <p data-reveal="up" style={delay(250)} className="mt-3 text-lg text-ink">{project.summary}</p>
        <p data-reveal="up" style={delay(350)} className="mt-3 leading-relaxed text-ink-2">{project.detail}</p>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.8rem] text-ink-2" aria-label="Built with">
          {project.stack.map((id, i) => (
            <li key={id} data-reveal="up" style={delay(400 + i * 60)} className="flex items-center gap-1.5">
              <TechIcon id={id} size={16} />
              {tech[id].name}
            </li>
          ))}
        </ul>

        <div data-reveal="up" style={delay(600)} className="mt-7 flex flex-wrap gap-x-6 gap-y-3 font-medium">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink underline decoration-gold decoration-2 hover:text-gold"
            >
              Visit site <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink-2 underline decoration-line hover:text-ink"
          >
            Source code <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section aria-labelledby="work" className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36">
      <SectionHeading id="work">SelectedWork</SectionHeading>
      <div className="mt-14 flex flex-col gap-24 sm:gap-32">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Experience ───────────────────────── */

const hueDot: Record<Hue, string> = {
  terracotta: "bg-terracotta",
  gold: "bg-gold",
  blue: "bg-blue",
  sandy: "bg-sandy",
  green: "bg-green",
};

export function Experience() {
  return (
    <section aria-labelledby="experience" className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading id="experience">Experience</SectionHeading>
        </div>

        <ol className="flex flex-col lg:col-span-8">
          {experience.map((job) => (
            <li key={job.company} data-reveal="up" className="border-t border-line py-8 first:pt-0 first:border-t-0 lg:first:pt-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em] sm:text-xl">{job.role}</h3>
                <p className="shrink-0 font-mono text-xs tabular-nums text-ink-3">{job.period}</p>
              </div>
              <p className="mt-2 flex items-center gap-2.5 text-ink-2">
                <span className={`size-2.5 ${hueDot[job.hue]}`} aria-hidden="true" />
                {job.company} · {job.place}
              </p>
              <ul className="mt-4 flex max-w-[65ch] flex-col gap-2 leading-relaxed text-ink-2">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-3" />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}

          <li data-reveal="up" className="border-t border-line pt-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-display text-lg font-medium tracking-[-0.01em] sm:text-xl">{education.degree}</h3>
              <p className="shrink-0 font-mono text-xs tabular-nums text-ink-3">{education.period}</p>
            </div>
            <p className="mt-2 flex items-center gap-2.5 text-ink-2">
              <span className="size-2.5 rounded-full bg-sandy" aria-hidden="true" />
              {education.school}
            </p>
            <p className="mt-4 text-ink-2">{education.certification}</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────── Skills ───────────────────────── */

export function Skills() {
  return (
    <section aria-labelledby="skills" className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading id="skills">Toolkit</SectionHeading>
        </div>
        <dl className="flex flex-col lg:col-span-8">
          {skills.map((group, gi) => (
            <div key={group.label} className={`grid gap-4 py-6 sm:grid-cols-[10rem_1fr] ${gi ? "border-t border-line" : "pt-0 lg:pt-2"}`}>
              <dt className="font-mono text-xs text-ink-3 sm:pt-2">{group.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((id, i) => (
                    <li
                      key={id}
                      data-reveal="up"
                      style={delay(i * 45)}
                      className={`flex items-center gap-2 border px-3 py-1.5 font-mono text-sm ${
                        gi === 0 ? "border-ink-3/50 text-ink" : "border-line text-ink-2"
                      }`}
                    >
                      <TechIcon id={id} size={gi === 0 ? 18 : 16} />
                      {tech[id].name}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

export function Contact() {
  return (
    <section aria-labelledby="contact" className="relative isolate mt-28 overflow-hidden sm:mt-36">
      {/* Big geometric field, one shape per hue, bleeding off the edge. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 200"
        preserveAspectRatio="xMaxYMax slice"
        className="drift absolute inset-0 -z-10 h-full w-full opacity-90"
      >
        <g style={{ mixBlendMode: "screen" }}>
          <circle cx="330" cy="70" r="70" className="fill-blue/35" />
          <path d="M260,200 A70,70 0 0 1 400,200 Z" className="fill-sandy/40" />
        </g>
      </svg>

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <h2
          id="contact"
          data-reveal="words"
          className="max-w-[16ch] font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
        >
          <SplitWords text="Hiring a front-end developer?" step={90} />
        </h2>
        <p data-reveal="up" style={delay(350)} className="mt-6 max-w-[40rem] text-lg text-ink-2">
          I’d like to hear about the role. Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${profile.email}`}
          data-reveal="up"
          style={delay(500)}
          className="mt-10 inline-block break-words font-display text-[1.05rem] sm:text-xl font-medium text-gold underline decoration-gold/40 decoration-2 underline-offset-8 transition-colors hover:text-vanilla hover:decoration-vanilla md:text-3xl"
        >
          {profile.email}
        </a>
        <ul data-reveal="up" style={delay(650)} className="mt-10 flex flex-wrap gap-3">
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 border border-line bg-navy px-4 transition-colors hover:border-ink-2">
              <LinkedInIcon /> LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 border border-line bg-navy px-4 transition-colors hover:border-ink-2">
              <GithubIcon size={18} aria-hidden="true" /> GitHub
            </a>
          </li>
          <li>
            <ResumeLink className="inline-flex h-11 items-center gap-2 border border-line bg-navy px-4 transition-colors hover:border-ink-2">
              <FileText size={18} aria-hidden="true" /> Résumé
            </ResumeLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
