import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";

const highlights = [
  "2+ years of experience",
  "Front-end development",
  "Responsive web applications",
  "API integration",
];

const experience = [
  {
    period: "Nov 2024 - Feb 2026",
    role: "Software Engineer Associate",
    company: "Accenture",
    location: "IT Park, Cebu",
    details: [
      "Developed and maintained responsive front-end applications using React, Vue.js, Angular, HTML, CSS, and JavaScript.",
      "Worked in Agile Scrum teams, contributing to sprint planning, backlog refinement, and continuous delivery.",
      "Debugged web application issues and handled maintenance tasks to improve reliability, data accuracy, and system stability.",
    ],
  },
  {
    period: "Jun 2023 - Aug 2023",
    role: "Frontend Web Developer Intern",
    company: "Crave Digital Advertising Supplies & Services",
    location: "Bacolod City",
    details: [
      "Built front-end web application features using CodeIgniter, JavaScript, HTML, and CSS.",
      "Updated web pages and participated in user testing to improve interface design and user experience.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    school: "University of St. La Salle - Bacolod",
    period: "2020 - 2024",
    distinction: "Cum Laude",
  },
];

const achievements = [
  "Graduated Cum Laude with a Bachelor of Science in Computer Science.",
  "Completed Generative Artificial Intelligence certification from Accenture in 2025.",
];

export default function AboutMe() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <div className="border-b border-border px-4 py-3 font-semibold uppercase tracking-wide">
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={20}
              color="currentColor"
              strokeWidth={1.5}
              className="shrink-0"
            />
            <span className="font-semibold uppercase tracking-wide text-green-500">
              About Me
            </span>
          </div>
        </div>

        <div className="grid gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-8">
          <div className="flex flex-col gap-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                John Martin Demonteverde
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal sm:text-3xl">
                Software Engineer focused on thoughtful, reliable web experiences.
              </h2>
              <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground">
                I am a front-end developer with 2+ years of hands-on experience
                building modern, responsive, and user-friendly web applications.
                I enjoy turning ideas into clean interfaces, connecting them with
                APIs, and keeping the experience fast, accessible, and easy to
                maintain.
              </p>
            </div>

            <ProfileSection title="Experience">
              <div className="relative flex flex-col gap-6 pl-5 before:absolute before:bottom-2 before:left-1.5 before:top-2 before:w-px before:bg-border">
                {experience.map((item) => (
                  <article key={`${item.company}-${item.period}`} className="relative">
                    <span className="absolute -left-5 top-1.5 size-3 border border-green-500 bg-background" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-500">
                      {item.period}
                    </p>
                    <h3 className="mt-1 text-base font-bold tracking-normal">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.company} - {item.location}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 bg-green-500" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </ProfileSection>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="border border-border bg-card px-4 py-3 text-sm font-semibold"
                >
                  {highlight}
                </div>
              ))}
            </div>

            <ProfileSection title="Education">
              {education.map((item) => (
                <div key={item.degree} className="border border-border bg-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-500">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-base font-bold tracking-normal">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.school}
                  </p>
                  <p className="mt-3 text-sm font-semibold">{item.distinction}</p>
                </div>
              ))}
            </ProfileSection>

            <ProfileSection title="Achievements">
              <ul className="space-y-3">
                {achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="border border-border bg-card px-4 py-3 text-sm leading-6 text-muted-foreground"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </ProfileSection>
          </aside>
        </div>
      </div>
    </section>
  );
}

type ProfileSectionProps = {
  title: string;
  children: ReactNode;
};

function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
