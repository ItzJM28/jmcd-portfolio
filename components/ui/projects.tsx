import ProjectCard from "./project-card";
import { projects } from "./data/projects";

export default function ProjectsList() {
  return (
    <main className="w-full pt-4 pr-4 sm:pr-8 md:pr-12 lg:pr-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
