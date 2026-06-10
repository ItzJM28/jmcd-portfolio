import HeaderTop from "@/components/ui/header-top";
import DescriptionHero from "@/components/ui/description-hero";
import UseCompiler from "@/components/ui/compiler-ui";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-start w-full">
        <div className="flex-1 min-w-0">
          <HeaderTop />
          <DescriptionHero />
        </div>

        <div className="hidden lg:block ml-30 mr-17 flex-shrink-0">
          <UseCompiler />
        </div>
      </div>
    </main>
  );
}
