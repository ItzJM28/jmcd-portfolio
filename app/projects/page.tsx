"use client";
import { TypeAnimation } from "react-type-animation";
import ProjectsList from "@/components/ui/projects";

function Projects() {
  return (
    <main className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-7xl">
        <TypeAnimation
          sequence={["Projects.", 1000]}
          wrapper="span"
          speed={50}
          className="mx-auto block w-fit scroll-m-20 text-center text-3xl font-extrabold tracking-normal sm:text-4xl"
          repeat={Infinity}
        />
        <ProjectsList />
      </section>
    </main>
  );
}

export default Projects;
