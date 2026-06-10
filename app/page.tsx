import HeaderTop from "@/components/ui/header-top";
import DescriptionHero from "@/components/ui/description-hero";
import UseCompiler from "@/components/ui/compiler-ui";
import TechStack from "@/components/ui/techstack";

export default function Home() {
  return (
    <main className="w-full">
      <div className="flex flex-col lg:flex-row items-start w-full">
        <div className="flex-1 min-w-0">
          <HeaderTop />
          <DescriptionHero />
        </div>

        <div className="hidden lg:block ml-20 mr-12 flex-shrink-0">
          <UseCompiler />
        </div>
      </div>

      <div className="mt-16">
        <TechStack />
      </div>
    </main>
  );
}
