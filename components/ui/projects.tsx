import ProjectCard from "./project-card";
import { projects } from "./data/projects";

export default function ProjectsList() {
  return (
    <section className="w-full pt-6 sm:pt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
