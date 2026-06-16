import { Code2, ExternalLink, Mail, Phone, Users } from "lucide-react";

const contactLinks = [
  {
    label: "email",
    value: "jmc.demonteverde@gmail.com",
    href: "mailto:jmc.demonteverde@gmail.com",
    icon: Mail,
  },
  {
    label: "phone",
    value: "Available on request",
    href: null,
    icon: Phone,
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/johnmarts",
    href: "https://www.linkedin.com/in/johnmarts/",
    icon: Users,
  },
  {
    label: "github",
    value: "github.com/ItzJM28",
    href: "https://github.com/ItzJM28",
    icon: Code2,
  },
] as const;

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-6 w-full max-w-7xl px-4 pb-8 sm:px-6 md:mt-10 lg:px-8"
    >
      <div className="overflow-hidden border border-[#2f333a] bg-[#07080a] font-mono text-[#d7e0ff] shadow-2xl">
        <div className="flex h-7 items-center justify-between border-b border-[#2f333a] bg-[#17191d] px-3 text-[0.625rem] uppercase tracking-normal text-[#9aa7cf]">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-[#ff5f56]" />
            <span className="size-2 shrink-0 rounded-full bg-[#ffbd2e]" />
            <span className="size-2 shrink-0 rounded-full bg-[#27c93f]" />
            <span className="ml-2 shrink-0 text-[#00ff66]">Online</span>
            <span className="truncate">/ socials.tsx</span>
          </div>
          <span>01</span>
        </div>

        <div className="grid gap-4 px-4 py-4 sm:px-6">
          <header className="grid grid-cols-[2rem_1fr] place-items-start gap-x-3 text-left">
            <span className="pt-0.5 text-right text-xs text-[#6f7ba3]">1</span>
            <div>
              <h2 className="font-mono text-sm font-semibold text-[#00ff66]">
                {"// Contact and socials"}
              </h2>
              <p className="mt-1 font-mono text-xs text-[#8da2d9]">
                Reach me directly or connect through my developer profiles.
              </p>
            </div>
          </header>

          <ul className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="flex size-9 shrink-0 items-center justify-center border border-[#303642] bg-[#0b0d10] text-[#00ff66]">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.625rem] uppercase text-[#ff5f6d]">
                      {item.label}
                    </span>
                    <span className="block truncate text-sm text-[#f8f8f2]">
                      {item.value}
                    </span>
                  </span>
                  {item.href ? (
                    <ExternalLink
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-[#6f7ba3]"
                      size={16}
                    />
                  ) : null}
                </>
              );

              return (
                <li
                  key={item.label}
                  className="grid grid-cols-[2rem_1fr] gap-x-3 text-xs"
                >
                  <span className="pt-3 text-right text-[#6f7ba3]">
                    {index + 2}
                  </span>
                  {item.href ? (
                    <a
                      className="flex min-w-0 items-center gap-3 border border-[#303642] bg-[#0b0d10] px-3 py-3 transition-colors hover:border-[#00ff66]/70 hover:bg-[#11151a]"
                      href={item.href}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex min-w-0 items-center gap-3 border border-[#303642] bg-[#0b0d10] px-3 py-3">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="grid grid-cols-[2rem_1fr] gap-x-3 text-xs">
            <span className="text-right text-[#6f7ba3]">6</span>
            <span>
              <span className="text-[#ff5f6d]">available</span>
              <span className="text-white">: </span>
              <span className="text-[#00ff66]">true</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
