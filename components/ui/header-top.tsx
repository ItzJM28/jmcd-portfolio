"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Badge } from "@/components/ui/badge";

type Props = {};

function HeaderTop({}: Props) {
  return (
    <div className="w-full max-w-5xl ml-4 sm:ml-8 md:ml-12 lg:ml-20">
      <h1 className="leading-tight font-bold text-[clamp(1.75rem,5vw,4.5rem)]">
        Hello, I'm John Martin Demonteverde.
      </h1>

      <TypeAnimation
        sequence={["Software Engineer", 1000, "Front-End Developer", 1000]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="mt-2 inline-block font-extrabold tracking-tight text-primary text-[clamp(1.75rem,5vw,4.5rem)] "
      />
    </div>
  );
}

export default HeaderTop;
