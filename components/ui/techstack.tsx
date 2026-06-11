import {
  TypescriptIcon,
  NextjsIcon,
  NodejsIcon,
  TailwindIcon,
  AngularIcon,
  _React,
  _Vue,
  Html5,
  Javascript,
  Css,
  MongodbIcon,
  Postgresql,
  Express,
  Php,
  CodeigniterIcon,
  GitIcon,
  Python,
  PostmanIcon,
  VisualStudio,
  VisualStudioCode,
  Figma,
  GithubIcon,
  VercelIcon,
  GoogleCloud,
} from "@dev.icons/react/mono";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ElementType } from "react";

type Tech = {
  name: string;
  icon: ElementType<{ size?: number; className?: string }>;
  color: string;
};

type TechCategory = {
  label: string;
  items: Tech[];
};

const frontend: TechCategory = {
  label: "Front End",
  items: [
    { name: "TypeScript", icon: TypescriptIcon, color: "text-blue-500" },
    { name: "JavaScript", icon: Javascript, color: "text-yellow-400" },
    { name: "React", icon: _React, color: "text-cyan-400" },
    { name: "Next.js", icon: NextjsIcon, color: "text-white" },
    { name: "Vue.js", icon: _Vue, color: "text-green-500" },
    { name: "Angular", icon: AngularIcon, color: "text-red-600" },
    { name: "HTML5", icon: Html5, color: "text-orange-500" },
    { name: "CSS", icon: Css, color: "text-blue-500" },
    { name: "Tailwind CSS", icon: TailwindIcon, color: "text-cyan-400" },
  ],
};

const backend: TechCategory = {
  label: "Back End",
  items: [
    { name: "Node.js", icon: NodejsIcon, color: "text-green-500" },
    { name: "Express.js", icon: Express, color: "text-foreground" },
    { name: "PHP", icon: Php, color: "text-indigo-500" },
    { name: "CodeIgniter", icon: CodeigniterIcon, color: "text-orange-500" },
    { name: "Python", icon: Python, color: "text-yellow-500" },
  ],
};

const database: TechCategory = {
  label: "Database",
  items: [
    { name: "PostgreSQL", icon: Postgresql, color: "text-sky-500" },
    { name: "MongoDB", icon: MongodbIcon, color: "text-green-600" },
  ],
};

const tools: TechCategory = {
  label: "Tools",
  items: [
    { name: "Git", icon: GitIcon, color: "text-orange-600" },
    { name: "Postman", icon: PostmanIcon, color: "text-orange-500" },
    { name: "VS Code", icon: VisualStudioCode, color: "text-blue-500" },
    { name: "Visual Studio", icon: VisualStudio, color: "text-violet-500" },
    { name: "Figma", icon: Figma, color: "text-pink-500" },
    { name: "GitHub", icon: GithubIcon, color: "text-foreground" },
    { name: "Vercel", icon: VercelIcon, color: "text-foreground" },
    { name: "Google Cloud", icon: GoogleCloud, color: "text-sky-500" },
  ],
};

const categories = [frontend, backend, database, tools];

export default function TechStack() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <div className="flex flex-col gap-2 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              color="currentColor"
              strokeWidth={1.5}
              className="shrink-0"
            />
            <span className="font-semibold text-green-500 tracking-wide uppercase">
              Tech Stack
            </span>
          </div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {categories.reduce(
              (total, category) => total + category.items.length,
              0,
            )}{" "}
            technologies
          </p>
        </div>

        <div className="space-y-5  p-4 sm:space-y-6 sm:p-6">
          <TechCategory category={frontend} size="wide" />

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <TechCategory category={backend} />
            <TechCategory category={database} compact />
          </div>

          <TechCategory category={tools} size="wide" />
        </div>
      </div>
    </section>
  );
}

type TechCategoryProps = {
  category: TechCategory;
  compact?: boolean;
  size?: "default" | "wide";
};

function TechCategory({
  category,
  compact = false,
  size = "default",
}: TechCategoryProps) {
  return (
    <section className="border border-border bg-muted/10 px-4 py-5 sm:px-6 sm:py-6">
      <h3 className="text-center text-2xl font-medium uppercase tracking-normal text-foreground sm:text-3xl">
        {category.label}
      </h3>

      <div
        className={[
          "mt-5 flex flex-wrap items-start justify-center",
          compact ? "gap-6 sm:gap-10" : "gap-4 sm:gap-6",
          size === "wide" ? "lg:gap-8" : "",
        ].join(" ")}
      >
        {category.items.map((tech) => {
          return (
            <TechItem
              key={tech.name}
              icon={tech.icon}
              name={tech.name}
              color={tech.color}
            />
          );
        })}
      </div>
    </section>
  );
}

type TechItemProps = {
  icon: Tech["icon"];
  name: string;
  color: string;
};

function TechItem({ icon: Icon, name, color }: TechItemProps) {
  return (
    <div className="group flex w-20 flex-col items-center gap-2 text-center sm:w-24">
      <div className="flex size-14 items-center justify-center border border-border bg-background transition-colors group-hover:bg-accent/10 sm:size-16">
        <Icon
          size={30}
          className={`${color} transition-transform group-hover:scale-110`}
        />
      </div>

      <span className="text-xs font-semibold leading-tight text-foreground">
        {name}
      </span>
    </div>
  );
}
