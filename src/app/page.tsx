"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import ExperienceHUD from "@/components/ExperienceHUD";
import AboutUs from "@/components/AboutUs";
import IngredientsSection from "@/components/IngredientsSection";
import ReserveSection from "@/components/ReserveSection";
import SiteFooter from "@/components/SiteFooter";

// Canvas3D touches window/document (GSAP ScrollTrigger, canvas texture
// generation) so it is loaded client-side only.
const Canvas3D = dynamic(() => import("@/components/Canvas3D"), {
  ssr: false,
});

export default function Home() {
  const experienceRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      {/*
        The 3D scroll experience: a 400vh trigger region ("#scroll-container")
        containing a viewport-height sticky panel. GSAP's ScrollTrigger and
        Framer Motion's useScroll are both scoped to this same element, so
        the bottle/cork/camera animation and the HUD text stay in sync
        while the section is pinned. Once the user scrolls past 400vh, the
        panel un-sticks and the normal page content below takes over.
      */}
      <div
        id="home"
        ref={experienceRef}
        className="relative h-[400vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Canvas3D />
          <ExperienceHUD scrollTarget={experienceRef} />
        </div>
      </div>

      <AboutUs />
      <IngredientsSection />
      <ReserveSection />
      <SiteFooter />
    </main>
  );
}
