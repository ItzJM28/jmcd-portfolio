import React from "react";
import { GithubIcon, Github } from "@dev.icons/react/mono";
import { Card, Link } from "@heroui/react";

type Props = {
  className?: string;
};

function DescriptionHero({ className }: Props) {
  return (
    <main className={className}>
      <Card className="w-full max-w-[400px] ml-4 sm:ml-8 md:ml-12 lg:ml-20">
        <Card.Header>
          {/* <Card.Title>Become an Acme Creator!</Card.Title> */}
          <Card.Description className="text-[clamp(0.6rem,1.5vw,1rem)] text-muted-foreground leading-relaxed max-w-prose">
            Passionate about building modern, responsive, and user-friendly web
            applications. Focused on creating seamless digital experiences that
            combine performance, functionality, and thoughtful design.
          </Card.Description>
        </Card.Header>
        <Card.Footer className="mt-4">
          <Link
            aria-label="Go to Creator Hub (opens in new tab)"
            href="https://github.com/ItzJM28?tab=repositories"
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <div className="text-white">
              <GithubIcon size={15} />
            </div>
            Creator Hub
            {/* <Link.Icon aria-hidden="true" /> */}
          </Link>
        </Card.Footer>
      </Card>
    </main>
  );
}

export default DescriptionHero;
