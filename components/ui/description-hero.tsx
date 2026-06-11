import React from "react";
import { GithubIcon } from "@dev.icons/react/mono";
import { Card, Link } from "@heroui/react";
import { Badge } from "@/components/ui/badge";

type Props = {
  className?: string;
};

function DescriptionHero({ className }: Props) {
  return (
    <main className={className}>
      <Card className="w-full max-w-3xl mx-auto xl:mx-0">
        <Card.Header>
          <Card.Description className="text-[clamp(1rem,1vw+0.75rem,1.35rem)] text-muted-foreground leading-relaxed max-w-prose mt-4 text-center xl:text-left">
            Passionate about building modern, responsive, and user-friendly web
            applications. Focused on creating seamless digital experiences that
            combine performance, functionality, and thoughtful design.
          </Card.Description>
        </Card.Header>

        <Card.Footer className="mt-4 justify-center xl:justify-start">
          <Link
            aria-label="Go to Creator Hub (opens in new tab)"
            href="https://github.com/ItzJM28?tab=repositories"
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Badge variant="outline" className="mt-1 h-fit">
              <div className="text-white">
                <GithubIcon size={15} />
              </div>
              Creator Hub
            </Badge>
          </Link>
        </Card.Footer>
      </Card>
    </main>
  );
}

export default DescriptionHero;
