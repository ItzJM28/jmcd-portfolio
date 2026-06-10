import HeaderTop from "@/components/ui/header-top";
import DescriptionHero from "@/components/ui/description-hero";
import UseCompiler from "@/components/ui/compiler-ui";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className="flex flex-col gap-6">
          <HeaderTop />
          <DescriptionHero />
        </div>

        <div className="hidden lg:block ml-auto">
          <UseCompiler />
        </div>
      </div>
    </main>
  );
}
