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
  Php,
  GitIcon,
  Python,
  PostmanIcon,
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
  label: "Frontend",
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

const sideCategories: TechCategory[] = [
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: NodejsIcon, color: "text-green-500" },
      { name: "PHP", icon: Php, color: "text-indigo-500" },
      { name: "Python", icon: Python, color: "text-yellow-500" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "PostgreSQL", icon: Postgresql, color: "text-sky-500" },
      { name: "MongoDB", icon: MongodbIcon, color: "text-green-600" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: GitIcon, color: "text-orange-600" },
      { name: "Postman", icon: PostmanIcon, color: "text-orange-500" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="mx-2 sm:mx-3 md:mx-4 lg:mx-7">
      <div className="overflow-hidden border border-border bg-background">
        <div className="border-b border-border px-4 py-3 font-semibold uppercase tracking-wide">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
          <div className="border-b border-border lg:border-b-0 lg:border-r">
            <TechCategory category={frontend} columns={3} />
          </div>

          <div className="grid">
            {sideCategories.map((category) => (
              <div key={category.label} className="border-b border-border last:border-b-0">
                <TechCategory category={category} columns={3} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type TechCategoryProps = {
  category: TechCategory;
  columns: 2 | 3;
  compact?: boolean;
};

function TechCategory({ category, columns, compact = false }: TechCategoryProps) {
  const gridColumns = columns === 2 ? "grid-cols-2" : "grid-cols-3";
  const cellHeight = compact
    ? "min-h-[126px] sm:min-h-[144px] lg:min-h-[136px]"
    : "min-h-[132px] sm:min-h-[154px] lg:min-h-[166px]";

  return (
    <>
      <div className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {category.label}
      </div>

      <div className={`grid ${gridColumns}`}>
        {Array.from({
          length: Math.ceil(category.items.length / columns) * columns,
        }).map((_, index) => {
          const tech = category.items[index];
          const isLastColumn = (index + 1) % columns === 0;
          const isLastRow =
            index >=
            Math.ceil(category.items.length / columns) * columns - columns;

          return (
            <div
              key={tech?.name ?? `${category.label}-empty-${index}`}
              className={[
                "group flex flex-col items-center justify-center px-3 py-5 text-center transition-colors hover:bg-accent/10",
                cellHeight,
                !isLastColumn ? "border-r border-border" : "",
                !isLastRow ? "border-b border-border" : "",
              ].join(" ")}
            >
              {tech ? (
                <TechItem
                  icon={tech.icon}
                  name={tech.name}
                  color={tech.color}
                  compact={compact}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

type TechItemProps = {
  icon: Tech["icon"];
  name: string;
  color: string;
  compact: boolean;
};

function TechItem({ icon: Icon, name, color, compact }: TechItemProps) {
  return (
    <>
      <Icon
        size={compact ? 26 : 30}
        className={`${color} transition-transform group-hover:scale-110`}
      />

      <span className="mt-3 text-xs font-semibold leading-tight text-foreground">
        {name}
      </span>
    </>
  );
}
