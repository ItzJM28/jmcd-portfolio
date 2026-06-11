import HeaderTop from "@/components/ui/header-top";
import DescriptionHero from "@/components/ui/description-hero";
import UseCompiler from "@/components/ui/compiler-ui";
import TechStack from "@/components/ui/techstack";

export default function Home() {
  return (
    <main className="w-full">
      <div className="mx-auto flex flex-col xl:flex-row items-center xl:items-center justify-center gap-8 md:gap-12 xl:gap-16 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Left Content */}
        <div className="w-full xl:flex-1 max-w-2xl text-center xl:text-left">
          <HeaderTop />
          <DescriptionHero />
        </div>

        {/* Compiler */}
        <div className="w-full xl:flex-1 max-w-2xl">
          <UseCompiler />
        </div>
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16">
        <TechStack />
      </div>
    </main>
  );
}
