import React from "react";

interface Developer {
  name: string;
  role: string;
  stack: string[];
  status: string;
  shipping: boolean;
}

type Props = {
  developer?: Developer;
};

const UseCompiler = ({ developer }: Props) => {
  const defaultDeveloper: Developer = {
    name: "John Martin Demonteverde",
    role: "Software Engineer | Front End Developer",
    stack: ["TypeScript", "React", "Next.js"],
    status: "available",
    shipping: true,
  };

  const dev = developer || defaultDeveloper;

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <div className="rounded-lg overflow-hidden shadow-lg border border-border bg-card">
        {/* Header */}
        <div className="bg-card px-3 py-2 flex items-center gap-2 border-b border-border">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <span className="text-muted-foreground text-[11px] ml-2">
            <span className="text-green-500">●</span> DEVELOPER.TS
          </span>

          <span className="text-muted-foreground text-[11px] ml-auto">01</span>
        </div>

        {/* Code Editor */}
        <div className="bg-background p-4 sm:p-5 font-mono text-xs sm:text-[13px] overflow-x-auto">
          <div className="space-y-1 min-w-max">
            {/* Line 1 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                1
              </span>
              <span>
                <span className="text-purple-600">const</span>
                <span className="text-blue-500"> developer </span>
                <span className="text-foreground">=</span>
                <span className="text-foreground"> {"{"}</span>
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                2
              </span>
              <span>
                <span className="text-destructive ml-4">name</span>
                <span className="text-foreground">:</span>
                <span className="text-primary"> "{dev.name}"</span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 3 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                3
              </span>
              <span>
                <span className="text-destructive ml-4">role</span>
                <span className="text-foreground">:</span>
                <span className="text-primary"> "{dev.role}"</span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 4 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                4
              </span>
              <span>
                <span className="text-destructive ml-4">stack</span>
                <span className="text-foreground">:</span>
                <span className="text-foreground"> [</span>
                <span className="text-primary">"{dev.stack.join('", "')}"</span>
                <span className="text-foreground">],</span>
              </span>
            </div>

            {/* Line 5 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                5
              </span>
              <span>
                <span className="text-destructive ml-4">status</span>
                <span className="text-foreground">:</span>
                <span className="text-sidebar-primary"> "{dev.status}"</span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 6 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                6
              </span>
              <span>
                <span className="text-destructive ml-4">shipping</span>
                <span className="text-foreground">:</span>
                <span className="text-sidebar-primary">
                  {" "}
                  {dev.shipping ? "true" : "false"}
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 7 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-4 text-right shrink-0">
                7
              </span>
              <span className="text-foreground">{"}"}</span>
              <span className="text-foreground">;</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card px-3 py-2 border-t border-border flex justify-between items-center text-[11px] text-muted-foreground">
          <span>TYPESCRIPT · UTF-8</span>
          <span>LN 7 · COL 3</span>
        </div>
      </div>
    </div>
  );
};

export default UseCompiler;
