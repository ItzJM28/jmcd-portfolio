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
    <div className="w-full">
      <div className="w-full h-full min-h-[320px] sm:min-h-[380px] md:min-h-[450px] lg:min-h-[520px] rounded-lg overflow-hidden shadow-lg border border-border bg-card flex flex-col">
        {/* Header */}
        <div className="bg-card px-3 py-2 flex items-center gap-2 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>

          <span className="text-muted-foreground text-[11px] ml-2">
            <span className="text-green-500">●</span> DEVELOPER.TS
          </span>

          <span className="text-muted-foreground text-[11px] ml-auto">01</span>
        </div>

        {/* Code Editor */}
        <div className="flex-1 bg-background p-3 sm:p-4 md:p-5 font-mono text-[11px] sm:text-xs md:text-[13px] overflow-x-auto overflow-y-auto">
          <div className="space-y-1 min-w-max">
            {/* Line 1 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                1
              </span>
              <span className="text-green-500">
                // Front-End Developer & Software Engineer
              </span>
            </div>

            {/* Line 2 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                2
              </span>
              <span className="text-green-500">
                // Building modern web experiences
              </span>
            </div>

            {/* Line 3 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                3
              </span>
              <span>
                <span className="text-purple-600">const</span>
                <span className="text-blue-300"> developer </span>
                <span className="text-foreground">=</span>
                <span className="text-foreground"> {"{"}</span>
              </span>
            </div>

            {/* Line 4 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                4
              </span>
              <span>
                <span className="text-red-400 ml-4">name</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  "John Martin Demonteverde"
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 5 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                5
              </span>
              <span>
                <span className="text-red-400 ml-4">role</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  "Software Engineer | Front-End Developer"
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 6 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                6
              </span>
              <span>
                <span className="text-red-400 ml-4">location</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  "Bacolod City, Philippines"
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 7 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                7
              </span>
              <span>
                <span className="text-red-400 ml-4">experience</span>
                <span className="text-foreground">:</span>
                <span className="text-primary"> "2+ years"</span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 8 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                8
              </span>
              <span>
                <span className="text-red-400 ml-4">education</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  "BS Computer Science - Cum Laude"
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 9 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                9
              </span>
              <span>
                <span className="text-red-400 ml-4">frontend</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  ["React", "Next.js", "Vue", "Angular"]
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 10 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                10
              </span>
              <span>
                <span className="text-red-400 ml-4">backend</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  ["Node.js", "PHP", ".NET"]
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 11 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                11
              </span>
              <span>
                <span className="text-red-400 ml-4">database</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  ["PostgreSQL", "MongoDB", "Cloud SQL"]
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 12 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                12
              </span>
              <span>
                <span className="text-red-400 ml-4">tools</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  ["Git", "Azure DevOps", "Postman"]
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 13 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                13
              </span>
              <span>
                <span className="text-red-400 ml-4">certification</span>
                <span className="text-foreground">:</span>
                <span className="text-primary">
                  {" "}
                  "Generative AI - Accenture"
                </span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 14 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                14
              </span>
              <span>
                <span className="text-red-400 ml-4">status</span>
                <span className="text-foreground">:</span>
                <span className="text-green-500"> "Open to Opportunities"</span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 15 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                15
              </span>
              <span>
                <span className="text-red-400 ml-4">availableForHire</span>
                <span className="text-foreground">:</span>
                <span className="text-blue-300"> true</span>
                <span className="text-foreground">,</span>
              </span>
            </div>

            {/* Line 16 */}
            <div className="flex gap-2.5">
              <span className="text-muted-foreground select-none w-5 text-right shrink-0">
                16
              </span>
              <span className="text-foreground">{"};"}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-card px-3 py-2 border-t border-border flex flex-col sm:flex-row gap-1 sm:gap-0 justify-between items-start sm:items-center text-[10px] sm:text-[11px] text-muted-foreground">
          <span>TYPESCRIPT · UTF-8</span>
          <span>LN 7 · COL 3</span>
        </div>
      </div>
    </div>
  );
};

export default UseCompiler;
