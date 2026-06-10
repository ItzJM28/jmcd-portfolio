import { Project } from "./types/project";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <Card className="overflow-hidden pt-0 h-full">
      <img
        src={project.image}
        alt={project.title}
        className="aspect-video w-full object-cover"
      />

      <CardHeader>
        <CardAction className="col-start-2 row-span-2 row-start-1 self-start justify-self-end m-1 sm:m-2">
          {project.featured && (
            <Badge variant="secondary" className="px-2 py-1 text-[0.625rem]">
              Featured
            </Badge>
          )}
        </CardAction>

        <CardTitle>{project.title}</CardTitle>

        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto pt-0 pb-4">
        <Button
          className="w-full"
          onClick={() => window.open(project.liveUrl, "_blank")}
        >
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
}
