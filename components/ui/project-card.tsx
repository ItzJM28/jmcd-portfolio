import { Project } from "./types/project";
import Image from "next/image";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const fileName = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <article className="flex h-full min-h-[30rem] flex-col overflow-hidden border border-[#2f333a] bg-[#07080a] font-mono text-[#d7e0ff] shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:border-[#00ff66]/70 hover:shadow-[0_1rem_2rem_rgba(0,255,102,0.08)]">
      <div className="flex h-8 items-center justify-between border-b border-[#2f333a] bg-[#17191d] px-3 text-[0.625rem] uppercase text-[#9aa7cf]">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f56]" />
          <span className="size-2.5 shrink-0 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 shrink-0 rounded-full bg-[#27c93f]" />
          <span className="ml-2 shrink-0 text-[#00ff66]">Online</span>
          <span className="truncate">/ {fileName || "project"}.tsx</span>
        </div>
        <span className="shrink-0 tabular-nums">
          {String(project.id).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col bg-[#08090c]">
        <div className="border-b border-[#303642] bg-[#0d0f13] p-2">
          <Image
            src={project.image}
            alt={project.title}
            width={960}
            height={540}
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 px-4 py-4 sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-tight text-[#f8f8f2]">
              {project.title}
            </h3>
            {project.featured && (
              <span className="shrink-0 border border-[#00ff66]/50 bg-[#00ff66]/10 px-2 py-1 text-[0.625rem] font-medium uppercase text-[#00ff66]">
                Featured
              </span>
            )}
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-[#9aa7cf]">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-[#2f333a] bg-[#17191d] px-3 py-2 text-[0.625rem] uppercase text-[#9aa7cf] sm:flex-row sm:items-center sm:justify-between">
        <span>TypeScript / UTF-8</span>
        <a
          className="inline-flex h-8 items-center justify-center bg-[#00ff66] px-3 text-xs font-medium normal-case text-[#071009] transition-colors hover:bg-[#41ff8f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff66]"
          href={project.liveUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </div>
    </article>
  );
}
