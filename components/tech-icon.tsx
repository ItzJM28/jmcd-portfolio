import {
  AngularIcon,
  CodeigniterIcon,
  Css,
  Dotnet,
  Express,
  Figma,
  GitIcon,
  GithubIcon,
  Html5,
  Javascript,
  MicrosoftAzure,
  MongodbIcon,
  NextjsIcon,
  NodejsIcon,
  Php,
  Postgresql,
  PostmanIcon,
  SupabaseIcon,
  TailwindIcon,
  TypescriptIcon,
  VercelIcon,
  VisualStudioCode,
  Vite,
  _React,
  _Vue,
} from "@dev.icons/react/mono";
import type { Icon } from "@dev.icons/react";
import type { TechId } from "@/lib/content";

export const tech: Record<TechId, { name: string; icon: Icon }> = {
  react: { name: "React", icon: _React },
  nextjs: { name: "Next.js", icon: NextjsIcon },
  typescript: { name: "TypeScript", icon: TypescriptIcon },
  javascript: { name: "JavaScript", icon: Javascript },
  tailwind: { name: "Tailwind CSS", icon: TailwindIcon },
  html: { name: "HTML", icon: Html5 },
  css: { name: "CSS", icon: Css },
  angular: { name: "Angular", icon: AngularIcon },
  vue: { name: "Vue", icon: _Vue },
  vite: { name: "Vite", icon: Vite },
  nodejs: { name: "Node.js", icon: NodejsIcon },
  express: { name: "Express", icon: Express },
  php: { name: "PHP", icon: Php },
  codeigniter: { name: "CodeIgniter", icon: CodeigniterIcon },
  dotnet: { name: ".NET", icon: Dotnet },
  supabase: { name: "Supabase", icon: SupabaseIcon },
  postgresql: { name: "PostgreSQL", icon: Postgresql },
  mongodb: { name: "MongoDB", icon: MongodbIcon },
  git: { name: "Git", icon: GitIcon },
  github: { name: "GitHub", icon: GithubIcon },
  figma: { name: "Figma", icon: Figma },
  postman: { name: "Postman", icon: PostmanIcon },
  vercel: { name: "Vercel", icon: VercelIcon },
  vscode: { name: "VS Code", icon: VisualStudioCode },
  azure: { name: "Azure DevOps", icon: MicrosoftAzure },
};

export function TechIcon({
  id,
  size = 18,
  className,
}: {
  id: TechId;
  size?: number;
  className?: string;
}) {
  const { icon: Glyph } = tech[id];
  return <Glyph size={size} className={className} aria-hidden="true" focusable="false" />;
}
