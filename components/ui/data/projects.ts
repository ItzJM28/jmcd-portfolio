import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Hiraya's Grill",
    description:
      "Restaurant website with responsive design and online menu.",
    image: "/hirayasgrill.png",
    featured: true,
    liveUrl: "https://hiraya-web-app.vercel.app/",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React, TypeScript, and Tailwind.",
    image: "/portfolio.png",
    liveUrl: "https://example.com",
  },
];
