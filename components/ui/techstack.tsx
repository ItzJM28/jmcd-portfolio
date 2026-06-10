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
  {
    name: "Javascript",
    icon: Javascript,
  },
  {
    name: "CSS",
    icon: Css,
  },
  {
    name: "Mongodb",
    icon: MongodbIcon,
  },
  {
    name: "PostgreSQL",
    icon: Postgresql,
  },
  {
    name: "PHP",
    icon: Php,
  },
  {
    name: "Git",
    icon: GitIcon,
  },
  {
    name: "Python",
    icon: Python,
  },
  {
    name: "Postman",
    icon: PostmanIcon,
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
                className="
        sm:[width:24px] sm:[height:24px]
        lg:[width:28px] lg:[height:28px]
        transition-transform
        group-hover:scale-110
      "
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
