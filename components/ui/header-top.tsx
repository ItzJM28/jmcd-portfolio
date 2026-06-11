"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

function HeaderTop() {
  return (
    <div className="w-full min-w-0">
      <h1 className="mx-auto max-w-3xl text-pretty text-3xl font-thin leading-tight sm:text-3xl md:text-4xl xl:mx-0">
        Hello, I&apos;m
        <span className="text-violet-500 font-semibold">
          {" "}
          John Martin Demonteverde
        </span>
        .
      </h1>
      <TypeAnimation
        sequence={[
          "Software Engineer.",
          2000,
          "Web Developer.",
          200,
          "Graphic Designer.",
          20000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="mt-3 block min-h-16 max-w-full text-pretty text-2xl font-extrabold tracking-normal sm:text-4xl md:min-h-20 md:text-5xl"
      />
    </div>
  );
}

export default HeaderTop;
