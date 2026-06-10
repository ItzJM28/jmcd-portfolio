"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Badge } from "@/components/ui/badge";

type Props = {};

function HeaderTop({}: Props) {
  return (
    <div className="w-full ml-4 sm:ml-8 md:ml-12 lg:ml-20">
      <div className="flex items-center gap-3">
        <h1 className="leading-none text-[clamp(0.5rem,3vw,2.25rem)] sm:text-lg lg:text-2xl">
          Hello, I'm John Martin Demonteverde.
        </h1>
      </div>

      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "Software Engineer",
          1000,
          "Front End Developer",
          1000, // wait 1s before replacing "Mice" with "Hamsters"
        ]}
        wrapper="span"
        speed={50}
        className="scroll-m-20 text-center font-extrabold tracking-tight text-balance w-fit mx-auto text-[clamp(0.5rem,3vw,2.25rem)] sm:text-lg lg:text-2xl inline-block"
        repeat={Infinity}
      />
    </div>
  );
}

export default HeaderTop;
