import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "Hiraya's Grill",
    description:
      "Restaurant website with responsive design and online menu.",
    image: "/hirayasgrill.png",
    featured: true,
    liveUrl: "https://example.com",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description:
      "Personal portfolio built with React, TypeScript, and Tailwind.",
    image: "/portfolio.png",
    liveUrl: "https://example.com",
  },
  {
    id: 3,
    title: "Inventory System",
    description:
      "Inventory management system with reporting and analytics.",
    image: "/inventory.png",
    liveUrl: "https://example.com",
  },
];