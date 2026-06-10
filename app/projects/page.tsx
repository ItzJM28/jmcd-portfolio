"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import ProjectsList from "@/components/ui/projects";

type Props = {};

function Projects({}: Props) {
  return (
    <div className="flex flex-col lg:flex-row items-start w-full">
      <div className="w-full ml-4 sm:ml-8 md:ml-12 lg:ml-20">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Projects.",
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="scroll-m-20 text-center font-extrabold tracking-tight text-balance w-fit mx-auto text-[clamp(0.5rem,3vw,2.25rem)] sm:text-lg lg:text-2xl inline-block"
          repeat={Infinity}
        />
        <ProjectsList />
      </div>
    </div>
  );
}

export default Projects;
