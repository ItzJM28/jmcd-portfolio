import React from "react";

type Props = {};

function HeaderTop({}: Props) {
  return (
    <div className="ml-20">
      <h1>Hello, I'm John Martin Demonteverde.</h1>
      <h2
        className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance typewriter"
        style={{
          ["--typing-duration" as any]: "1.5s",
          ["--typing-steps" as any]: "17",
        }}
      >
        Software Engineer
      </h2>
    </div>
  );
}

export default HeaderTop;
