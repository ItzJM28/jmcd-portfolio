import React from "react";
import { Breadcrumbs } from "@heroui/react";

type Props = {};

function Projects({}: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl px-2 sm:px-0">
        <h1
          className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance typewriter sm:text-4xl md:text-5xl"
          style={{
            ["--typing-duration" as any]: "1.5s",
            ["--typing-steps" as any]: "9",
          }}
        >
          Projects.
        </h1>
      </div>
    </main>
  );
}

export default Projects;
