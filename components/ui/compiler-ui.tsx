const codeLines = [
  {
    line: 1,
    content: (
      <span className="text-green-500">
        {"// Front-End Developer & Software Engineer"}
      </span>
    ),
  },
  {
    line: 2,
    content: (
      <span className="text-green-500">
        {"// Building modern web experiences"}
      </span>
    ),
  },
  {
    line: 3,
    content: (
      <span>
        <span className="text-purple-600">const</span>
        <span className="text-blue-300"> developer </span>
        <span className="text-foreground">= {"{"}</span>
      </span>
    ),
  },
  {
    line: 4,
    content: <CodeField name="name" value='"John Martin Demonteverde",' />,
  },
  {
    line: 5,
    content: (
      <CodeField
        name="role"
        value='"Software Engineer | Front-End Developer",'
      />
    ),
  },
  {
    line: 6,
    content: <CodeField name="location" value='"Bacolod City, Philippines",' />,
  },
  { line: 7, content: <CodeField name="experience" value='"2+ years",' /> },
  {
    line: 8,
    content: (
      <CodeField name="education" value='"BS Computer Science - Cum Laude",' />
    ),
  },
  {
    line: 9,
    content: (
      <CodeField
        name="frontend"
        value='["React", "Next.js", "Vue", "Angular"],'
      />
    ),
  },
  {
    line: 10,
    content: <CodeField name="backend" value='["Node.js", "PHP", ".NET"],' />,
  },
  {
    line: 11,
    content: (
      <CodeField
        name="database"
        value='["PostgreSQL", "MongoDB", "Cloud SQL"],'
      />
    ),
  },
  {
    line: 12,
    content: (
      <CodeField name="tools" value='["Git", "Azure DevOps", "Postman"],' />
    ),
  },
  {
    line: 13,
    content: (
      <CodeField name="certification" value='"Generative AI - Accenture",' />
    ),
  },
  {
    line: 14,
    content: (
      <span>
        <span className="ml-4 text-red-400">status</span>
        <span className="text-foreground">:</span>
        <span className="text-green-500">{' "Open to Opportunities"'}</span>
        <span className="text-foreground">,</span>
      </span>
    ),
  },
  {
    line: 15,
    content: (
      <span>
        <span className="ml-4 text-red-400">availableForHire</span>
        <span className="text-foreground">:</span>
        <span className="text-blue-300"> true</span>
        <span className="text-foreground">,</span>
      </span>
    ),
  },
  { line: 16, content: <span className="text-foreground">{"};"}</span> },
];

function CodeField({ name, value }: { name: string; value: string }) {
  return (
    <span>
      <span className="ml-4 text-red-400">{name}</span>
      <span className="text-foreground">:</span>
      <span className="text-yellow-200"> {value}</span>
    </span>
  );
}

export default function UseCompiler() {
  return (
    <div className="w-full min-w-0">
      <div className="flex h-full min-h-[360px] w-full min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg sm:min-h-[420px] lg:min-h-[520px]">
        <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <span className="ml-2 truncate text-[11px] text-muted-foreground">
            <span className="text-green-500">ONLINE</span> / DEVELOPER.TS
          </span>

          <span className="ml-auto text-[11px] text-muted-foreground">01</span>
        </div>

        <div className="flex-1 overflow-auto bg-background p-3 font-mono text-[11px] sm:p-4 sm:text-xs md:p-5 md:text-[13px]">
          <div className="min-w-[36rem] space-y-1 md:min-w-0">
            {codeLines.map(({ line, content }) => (
              <div key={line} className="flex gap-2.5">
                <span className="w-5 shrink-0 select-none text-right text-muted-foreground">
                  {line}
                </span>
                <span className="whitespace-nowrap">{content}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-1 border-t border-border bg-card px-3 py-2 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:gap-0 sm:text-[11px]">
          <span>TYPESCRIPT / UTF-8</span>
          <span>LN 7 / COL 3</span>
        </div>
      </div>
    </div>
  );
}
