export type Hue = "terracotta" | "sandy" | "gold" | "green" | "blue";

export type TechId =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "html"
  | "css"
  | "angular"
  | "vue"
  | "vite"
  | "nodejs"
  | "express"
  | "php"
  | "codeigniter"
  | "dotnet"
  | "supabase"
  | "postgresql"
  | "mongodb"
  | "git"
  | "github"
  | "figma"
  | "postman"
  | "vercel"
  | "vscode"
  | "azure";

export type ProjectLogoId = "peraflow" | "jdcreates" | "qr" | "lynko";

export type Project = {
  slug: string;
  logo: ProjectLogoId;
  /** CSS colour for the soft glow behind the logo tile. */
  glow: string;
  title: string;
  summary: string;
  detail: string;
  hue: Hue;
  stack: TechId[];
  image?: { src: string; alt: string };
  liveUrl?: string;
  sourceUrl: string;
};

export const profile = {
  name: "John Martin Demonteverde",
  role: "Front-End Developer",
  location: "Bacolod City, Philippines",
  locationShort: "Bacolod, PH",
  email: "jmc.demonteverde@gmail.com",
  github: "https://github.com/ItzJM28",
  linkedin: "https://www.linkedin.com/in/johnmarts/",
  resume: "/Resume_Demonteverde.pdf",
};

export const projects: Project[] = [
  {
    slug: "peraflow",
    logo: "peraflow",
    glow: "#34b98a",
    title: "PeraFlow",
    summary: "Personal finance for the Philippines, all in pesos.",
    detail:
      "Tracks accounts, spending, budgets, bills and savings goals. Email and Google sign-in through Supabase, with money math done in whole centavos so totals never drift.",
    hue: "green",
    stack: ["react", "typescript", "supabase", "postgresql", "vercel"],
    image: {
      src: "/work/peraflow.png",
      alt: "PeraFlow sign-in screen with the tagline “Every peso, in one calm place.”",
    },
    liveUrl: "https://peraflowph.vercel.app",
    sourceUrl: "https://github.com/ItzJM28/budget-app",
  },
  {
    slug: "jdcreates",
    logo: "jdcreates",
    glow: "var(--color-gold)",
    title: "JD Creates",
    summary: "My graphic design portfolio, built as a bento grid.",
    detail:
      "Brand identities, social campaigns and print work for local businesses like Bugtong’s and Alon Brew, laid out in an animated bento grid with filters by category and motion previews.",
    hue: "gold",
    stack: ["nextjs", "react", "typescript", "tailwind", "vercel"],
    image: {
      src: "/work/jdcreates.png",
      alt: "JD Creates homepage: the headline “Designs that make brands unforgettable.” beside purple, green and Bugtong’s featured tiles.",
    },
    liveUrl: "https://jdcreates.vercel.app",
    sourceUrl: "https://github.com/ItzJM28/graphic-design-portfolio",
  },
  {
    slug: "qr",
    logo: "qr",
    glow: "#f55a00",
    title: "Free QR Code Generator",
    summary: "Paste a link, get a QR code. No sign-up.",
    detail:
      "Builds codes for links, Wi-Fi, email, phone and SMS, then downloads them as PNG or SVG. Everything runs in the browser and nothing typed is stored.",
    hue: "blue",
    stack: ["react", "typescript", "vite", "tailwind"],
    image: {
      src: "/work/qr-generator.png",
      alt: "QR code generator in a bento grid of orange and blue tiles: type picker, details form, a live QR code preview, and size and color options.",
    },
    liveUrl: "https://qr-gf.vercel.app",
    sourceUrl: "https://github.com/ItzJM28/web-qr-code-generator",
  },
  {
    slug: "lynko",
    logo: "lynko",
    glow: "#2f5bff",
    title: "Lynko",
    summary: "A clean, minimal link shortener.",
    detail: "Short links from long URLs, built on the Next.js App Router.",
    hue: "terracotta",
    stack: ["nextjs", "typescript", "tailwind"],
    sourceUrl: "https://github.com/ItzJM28/lynko",
  },
];

export const experience = [
  {
    role: "Software Engineer Associate",
    company: "Accenture",
    place: "IT Park, Cebu",
    period: "Nov 2024 – Feb 2026",
    hue: "blue" as Hue,
    points: [
      "Built and maintained responsive front-end applications in React, Vue and Angular.",
      "Worked in Agile Scrum teams through sprint planning, backlog refinement and continuous delivery.",
      "Debugged web application issues and handled maintenance to improve reliability and data accuracy.",
    ],
  },
  {
    role: "Frontend Web Developer Intern",
    company: "Crave Digital Advertising",
    place: "Bacolod City",
    period: "Jun – Aug 2023",
    hue: "gold" as Hue,
    points: [
      "Built front-end features with CodeIgniter, JavaScript, HTML and CSS.",
      "Updated pages and ran user testing to improve the interface.",
    ],
  },
];

export const education = {
  degree: "BS Computer Science, Cum Laude",
  school: "University of St. La Salle – Bacolod",
  period: "2020 – 2024",
  certification: "Generative AI certification, Accenture, 2025",
};

export const skills: { label: string; items: TechId[] }[] = [
  {
    label: "Every day",
    items: ["typescript", "react", "nextjs", "tailwind", "javascript", "html", "css"],
  },
  {
    label: "Also shipped with",
    items: ["angular", "vue", "vite", "nodejs", "express", "php", "codeigniter", "supabase", "postgresql", "mongodb"],
  },
  {
    label: "Tools",
    items: ["git", "github", "figma", "postman", "vercel", "vscode", "azure"],
  },
];
