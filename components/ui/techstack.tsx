import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import {
  AngularIcon,
  CodeigniterIcon,
  Css,
  Express,
  Figma,
  GitIcon,
  GithubIcon,
  GoogleCloud,
  Html5,
  Javascript,
  MongodbIcon,
  NextjsIcon,
  NodejsIcon,
  Php,
  Postgresql,
  PostmanIcon,
  Python,
  TailwindIcon,
  TypescriptIcon,
  VercelIcon,
  VisualStudio,
  VisualStudioCode,
  Vite,
  _React,
  _Vue,
} from "@dev.icons/react/mono";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ElementType } from "react";

type Tech = {
  name: string;
  icon: ElementType<{ size?: number; className?: string }>;
  color: string;
  level: number;
  proficiency: "Expert" | "Advanced" | "Proficient" | "Familiar";
};

type TechCategory = {
  label: string;
  items: Tech[];
  secondary?: boolean;
};

const frontend: TechCategory = {
  label: "Frontend",
  items: [
    {
      name: "TypeScript",
      icon: TypescriptIcon,
      color: "text-blue-500",
      level: 82,
      proficiency: "Advanced",
    },
    {
      name: "JavaScript",
      icon: Javascript,
      color: "text-yellow-400",
      level: 88,
      proficiency: "Advanced",
    },
    {
      name: "React",
      icon: _React,
      color: "text-cyan-400",
      level: 86,
      proficiency: "Advanced",
    },
    {
      name: "Next.js",
      icon: NextjsIcon,
      color: "text-foreground",
      level: 80,
      proficiency: "Advanced",
    },
    {
      name: "Angular",
      icon: AngularIcon,
      color: "text-red-600",
      level: 72,
      proficiency: "Proficient",
    },
    {
      name: "Tailwind CSS",
      icon: TailwindIcon,
      color: "text-cyan-400",
      level: 88,
      proficiency: "Advanced",
    },
    {
      name: "HTML",
      icon: Html5,
      color: "text-orange-500",
      level: 92,
      proficiency: "Expert",
    },
    {
      name: "CSS",
      icon: Css,
      color: "text-blue-500",
      level: 86,
      proficiency: "Advanced",
    },
  ],
};

const backend: TechCategory = {
  label: "Backend",
  items: [
    {
      name: "Node.js",
      icon: NodejsIcon,
      color: "text-green-500",
      level: 74,
      proficiency: "Proficient",
    },
    {
      name: "PHP",
      icon: Php,
      color: "text-indigo-500",
      level: 70,
      proficiency: "Proficient",
    },
  ],
};

const databases: TechCategory = {
  label: "Databases",
  items: [
    {
      name: "PostgreSQL",
      icon: Postgresql,
      color: "text-sky-500",
      level: 74,
      proficiency: "Proficient",
    },
    {
      name: "MongoDB",
      icon: MongodbIcon,
      color: "text-green-600",
      level: 70,
      proficiency: "Proficient",
    },
  ],
};

const tools: TechCategory = {
  label: "Tools",
  items: [
    {
      name: "Git",
      icon: GitIcon,
      color: "text-orange-600",
      level: 82,
      proficiency: "Advanced",
    },
    {
      name: "Postman",
      icon: PostmanIcon,
      color: "text-orange-500",
      level: 78,
      proficiency: "Proficient",
    },
    {
      name: "VS Code",
      icon: VisualStudioCode,
      color: "text-blue-500",
      level: 90,
      proficiency: "Expert",
    },
    {
      name: "Figma",
      icon: Figma,
      color: "text-pink-500",
      level: 76,
      proficiency: "Proficient",
    },
    {
      name: "GitHub",
      icon: GithubIcon,
      color: "text-foreground",
      level: 84,
      proficiency: "Advanced",
    },
    {
      name: "Vercel",
      icon: VercelIcon,
      color: "text-foreground",
      level: 80,
      proficiency: "Advanced",
    },
  ],
};

const alsoExperienced: TechCategory = {
  label: "Also Experienced With",
  secondary: true,
  items: [
    {
      name: "Vue.js",
      icon: _Vue,
      color: "text-green-500",
      level: 66,
      proficiency: "Familiar",
    },
    {
      name: "Vite",
      icon: Vite,
      color: "text-purple-500",
      level: 72,
      proficiency: "Proficient",
    },
    {
      name: "Express.js",
      icon: Express,
      color: "text-foreground",
      level: 68,
      proficiency: "Familiar",
    },
    {
      name: "CodeIgniter",
      icon: CodeigniterIcon,
      color: "text-orange-500",
      level: 62,
      proficiency: "Familiar",
    },
    {
      name: "Python",
      icon: Python,
      color: "text-yellow-500",
      level: 58,
      proficiency: "Familiar",
    },
    {
      name: "Visual Studio",
      icon: VisualStudio,
      color: "text-violet-500",
      level: 64,
      proficiency: "Familiar",
    },
    {
      name: "Google Cloud",
      icon: GoogleCloud,
      color: "text-sky-500",
      level: 55,
      proficiency: "Familiar",
    },
  ],
};

const coreCategories = [frontend, backend, databases, tools];

export default function TechStack() {
  const coreSkillCount = coreCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <div className="flex flex-col gap-2 bg-muted/10 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              color="currentColor"
              strokeWidth={1.5}
              className="shrink-0"
            />
            <span className="font-semibold uppercase tracking-wide text-green-500">
              Core Technologies
            </span>
          </div>

          <p className="text-xs font-medium uppercase tracking-wide text-blue-500/90">
            {coreSkillCount} skill count
          </p>
        </div>

        <div className="space-y-8 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-12">
            <div className="space-y-8">
              <TechCategory category={frontend} />
              <TechCategory category={databases} />
            </div>

            <div className="space-y-8">
              <TechCategory category={backend} />
              <TechCategory category={tools} className="lg:pt-8" />
            </div>
          </div>

          <TechCategory category={alsoExperienced} />
        </div>
      </div>
    </section>
  );
}

type TechCategoryProps = {
  category: TechCategory;
  className?: string;
};

function TechCategory({ category, className }: TechCategoryProps) {
  return (
    <section className={className}>
      <h3
        className={[
          "text-xl font-semibold italic text-red-500",
          category.secondary ? "mb-4" : "mb-5",
        ].join(" ")}
      >
        {category.label}
      </h3>

      <div
        className={[
          "divide-y divide-border/80 border-y border-border/80",
          category.secondary
            ? "lg:grid lg:grid-cols-2 lg:gap-x-12 lg:divide-y-0 lg:border-y-0"
            : "",
        ].join(" ")}
      >
        {category.items.map((tech) => (
          <TechRow key={tech.name} tech={tech} secondary={category.secondary} />
        ))}
      </div>
    </section>
  );
}

type TechRowProps = {
  tech: Tech;
  secondary?: boolean;
};

function TechRow({ tech, secondary = false }: TechRowProps) {
  const Icon = tech.icon;

  return (
    <div
      className={[
        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-3",
        secondary ? "lg:border-y lg:border-border/80" : "",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
          <Icon size={18} className={tech.color} />
        </span>
        <span className="min-w-0 text-sm font-medium text-foreground sm:text-base">
          {tech.name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden min-w-20 text-right text-xs text-muted-foreground sm:inline">
          {tech.proficiency}
        </span>
        <span className="w-9 text-right text-xs font-medium text-muted-foreground">
          {tech.level}%
        </span>
        <div
          className="h-1.5 w-20 overflow-hidden rounded-full bg-muted sm:w-24"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-red-500"
            style={{ width: `${tech.level}%` }}
          />
        </div>
      </div>

      <span className="text-xs text-muted-foreground sm:hidden">
        {tech.proficiency}
      </span>
    </div>
  );
}
