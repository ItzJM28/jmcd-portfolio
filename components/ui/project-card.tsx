import { Project } from "./types/project";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Card className="h-full overflow-hidden pt-0 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Image
        src={project.image}
        alt={project.title}
        width={960}
        height={540}
        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
        className="aspect-video w-full object-cover"
      />

      <CardHeader className="gap-2">
        <CardAction className="col-start-2 row-span-2 row-start-1 self-start justify-self-end m-1 sm:m-2">
          {project.featured && (
            <Badge variant="secondary" className="px-2 py-1 text-[0.625rem]">
              Featured
            </Badge>
          )}
        </CardAction>

        <CardTitle className="text-base leading-tight">{project.title}</CardTitle>

        <CardDescription className="line-clamp-3 min-h-12 text-sm leading-6">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto pt-0 pb-4">
        <a
          className={cn(buttonVariants({ size: "lg" }), "w-full")}
          href={project.liveUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </CardFooter>
    </Card>
  );
}
