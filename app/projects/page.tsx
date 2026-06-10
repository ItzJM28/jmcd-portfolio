import React from "react";
import { Breadcrumbs } from "@heroui/react";

type Props = {};

function Projects({}: Props) {
  return (
    <>
      <main>
        <div className="ml-15">
          <h1
            className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance typewriter"
            style={{
              ["--typing-duration" as any]: "1.5s",
              ["--typing-steps" as any]: "9",
            }}
          >
            Projects.
          </h1>
        </div>
      </main>
    </>
  );
}

export default Projects;
