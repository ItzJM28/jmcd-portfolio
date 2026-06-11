"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Badge } from "@/components/ui/badge";

type Props = {};

function HeaderTop({}: Props) {
  return (
    <div className="w-full px-2 sm:px-0">
      <h1 className="leading-tight font-thin text-[clamp(1.25rem,3vw,2.75rem)]">
        Hello, I'm
        <span className="text-violet-500"> John Martin Demonteverde</span>.
      </h1>
      <TypeAnimation
        sequence={["Software Engineer.", 2000, "Front-End Developer.", 2000]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="mt-2 inline-block font-extrabold tracking-tight text-[clamp(1.75rem,5vw,4rem)]"
      />
    </div>
  );
}

export default HeaderTop;
