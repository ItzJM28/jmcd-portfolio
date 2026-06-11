import HeaderTop from "@/components/ui/header-top";
import DescriptionHero from "@/components/ui/description-hero";
import UseCompiler from "@/components/ui/compiler-ui";
import AboutMe from "@/components/ui/about-me";
import TechStack from "@/components/ui/techstack";

export default function Home() {
  return (
    <main className="w-full">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-6 sm:px-6 sm:py-8 md:gap-10 lg:px-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-12 xl:py-12">
        <div className="w-full min-w-0 text-center xl:text-left">
          <HeaderTop />
          <DescriptionHero />
        </div>

        <div className="w-full min-w-0">
          <UseCompiler />
        </div>
      </section>

      <div className="mt-4 md:mt-8 lg:mt-10">
        <AboutMe />
      </div>

      <div className="mt-4 md:mt-8 lg:mt-10">
        <TechStack />
      </div>
    </main>
  );
}
