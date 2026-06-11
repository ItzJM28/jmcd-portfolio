import React from "react";
import { GithubIcon } from "@dev.icons/react/mono";
import { Card, Link } from "@heroui/react";
import { Badge } from "@/components/ui/badge";
import { Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type Props = {
  className?: string;
};

function DescriptionHero({ className }: Props) {
  return (
    <section className={className}>
      <Card className="mx-auto mt-5 w-full max-w-3xl border-border/80 bg-card/70 shadow-sm xl:mx-0">
        <Card.Header className="px-4 pt-5 sm:px-6">
          <Card.Description className="mx-auto max-w-2xl text-pretty text-center text-base leading-7 text-muted-foreground sm:text-lg xl:mx-0 xl:text-left">
            Passionate about building modern, responsive, and user-friendly web
            applications. Focused on creating seamless digital experiences that
            combine performance, functionality, and thoughtful design.
          </Card.Description>
        </Card.Header>

        <Card.Footer className="justify-center px-4 pb-5 pt-2 sm:px-6 xl:justify-start">
          <Link
            aria-label="Go to Creator Hub (opens in new tab)"
            href="https://github.com/ItzJM28?tab=repositories"
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            <Badge variant="outline" className="text-md h-9 gap-2 px-3">
              <div className="text-white">
                <HugeiconsIcon icon={Linkedin01Icon} size={20} />
              </div>
              LinkedIn
            </Badge>
          </Link>
        </Card.Footer>
      </Card>
    </section>
  );
}

export default DescriptionHero;
