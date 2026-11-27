import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RevealObserver } from "@/components/motion";
import { ResumeDialog } from "@/components/resume-dialog";
import { MotionRoot } from "@/components/bento/motion-root";

// Fonts are self-hosted (Latin variable files in app/fonts) so builds never
// depend on fetching from Google Fonts.
// Inter: a free, open-licensed (SIL OFL) font designed to read like Apple's SF Pro.
// This file has the optical-size axis, so big headings get Inter Display shapes
// and body text gets Inter Text shapes automatically, the same split SF Pro makes.
const sans = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400 800",
  display: "swap",
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
      className={`${sans.variable} ${mono.variable} antialiased`}
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
        <MotionRoot>
          <SiteHeader />
          <main id="main">{children}</main>
        </MotionRoot>
        <SiteFooter />
        <ResumeDialog />
      </body>
    </html>
  );
}
