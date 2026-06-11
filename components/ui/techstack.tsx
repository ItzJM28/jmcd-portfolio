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

const technologies = [
  {
    name: "TypeScript",
    icon: TypescriptIcon,
    color: "text-blue-500",
  },
  {
    name: "Javascript",
    icon: Javascript,
    color: "text-yellow-400",
  },
  {
    name: "React",
    icon: _React,
    color: "text-cyan-400",
  },
  {
    name: "Next.js",
    icon: NextjsIcon,
    color: "text-white",
  },
  {
    name: "Vue.js",
    icon: _Vue,
    color: "text-green-500",
  },
  {
    name: "Angular",
    icon: AngularIcon,
    color: "text-red-600",
  },
  {
    name: "HTML5",
    icon: Html5,
    color: "text-orange-500",
  },
  {
    name: "CSS",
    icon: Css,
    color: "text-blue-500",
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
    color: "text-cyan-400",
  },
  {
    name: "Node.js",
    icon: NodejsIcon,
    color: "text-green-500",
  },
  {
    name: "PHP",
    icon: Php,
    color: "text-indigo-500",
  },
  {
    name: "Python",
    icon: Python,
    color: "text-yellow-500",
  },
  {
    name: "PostgreSQL",
    icon: Postgresql,
    color: "text-sky-500",
  },
  {
    name: "Mongodb",
    icon: MongodbIcon,
    color: "text-green-600",
  },
  {
    name: "Git",
    icon: GitIcon,
    color: "text-orange-600",
  },
  {
    name: "Postman",
    icon: PostmanIcon,
    color: "text-orange-500",
  },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 border border-border mx-4 sm:mx-8 md:mx-12 lg:mx-20">
      {/* Header Cell */}

      <div
        className="
      col-span-4
      lg:col-span-8
      border-b
      border-border
      px-4
      py-3
      font-semibold
      tracking-wide
      uppercase
    "
      >
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

      {technologies.map((tech) => {
        const Icon = tech.icon;

        return (
          <div
            key={tech.name}
            className="
    group
    flex
    flex-col
    items-center
    border-r
    border-b
    border-border
    px-1 py-3
    sm:px-2 sm:py-4
    lg:py-5
    transition-colors
    hover:bg-accent/10
  "
          >
            <div className="flex h-8 sm:h-9 lg:h-10 items-center justify-center">
              <Icon
                size={20}
                className={`
    ${tech.color}
    sm:[width:24px] sm:[height:24px]
    lg:[width:28px] lg:[height:28px]
    transition-transform
    group-hover:scale-110
  `}
              />
            </div>

            <div className="mt-1 sm:mt-2 flex h-8 sm:h-9 lg:h-10 items-center justify-center">
              <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                {tech.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
