import {
  TypescriptIcon,
  NextjsIcon,
  NodejsIcon,
  TailwindIcon,
  AngularIcon,
  _React,
  _Vue,
  Html5,
} from "@dev.icons/react/mono";

const technologies = [
  {
    name: "TypeScript",
    icon: TypescriptIcon,
  },

  {
    name: "Next.js",
    icon: NextjsIcon,
  },

  {
    name: "Node.js",
    icon: NodejsIcon,
  },
  {
    name: "Tailwind CSS",
    icon: TailwindIcon,
  },
  {
    name: "Angular",
    icon: AngularIcon,
  },
  {
    name: "React",
    icon: _React,
  },
  {
    name: "Vue.js",
    icon: _Vue,
  },
  {
    name: "HTML5",
    icon: Html5,
  },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 border border-border mx-20">
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
        Tech Stack
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
    px-2
    py-5
    transition-colors
    hover:bg-accent/10
  "
          >
            {/* Fixed icon area */}
            <div className="flex h-10 items-center justify-center">
              <Icon
                size={28}
                className="transition-transform group-hover:scale-110"
              />
            </div>

            {/* Fixed text area */}
            <div className="mt-2 flex h-10 items-center justify-center">
              <span className="text-center text-xs font-medium leading-tight">
                {tech.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
