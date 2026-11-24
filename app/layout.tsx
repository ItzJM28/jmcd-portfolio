import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/motion";
import { ResumeDialog } from "@/components/resume-dialog";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-unbounded",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jmcd-portfolio.vercel.app"),
  title: "John Martin Demonteverde · Front-End Developer",
  description:
    "Front-end developer building responsive, accessible web apps with React, Next.js and TypeScript. Based in Bacolod City, Philippines.",
  openGraph: {
    title: "John Martin Demonteverde · Front-End Developer",
    description:
      "Projects, experience and résumé of John Martin Demonteverde, front-end developer.",
    url: "/",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c120c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh overflow-x-clip">
        {/* Lets reveal animations start hidden only when JS can show them again. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <RevealObserver />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ResumeDialog />
      </body>
    </html>
  );
}
