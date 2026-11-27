import { preload } from "react-dom";
import { BentoGrid } from "@/components/bento/bento-grid";
import { SideFilters } from "@/components/bento/side-filters";
import { profile } from "@/lib/content";

export default function Home() {
  // The video poster is the largest thing on the first screen: fetch it first.
  if (profile.showreelPoster) preload(profile.showreelPoster, { as: "image", fetchPriority: "high" });
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:grid lg:grid-cols-[2.75rem_1fr] lg:gap-4 lg:pl-3">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <SideFilters />
        </div>
      </aside>
      <BentoGrid />
    </div>
  );
}
