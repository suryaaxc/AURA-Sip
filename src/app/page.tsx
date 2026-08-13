"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import ExperienceHUD from "@/components/ExperienceHUD";
import AboutUs from "@/components/AboutUs";
import IngredientsSection from "@/components/IngredientsSection";
import ReserveSection from "@/components/ReserveSection";
import SiteFooter from "@/components/SiteFooter";

// Canvas3D is loaded strictly on client-side with a loading fallback.
// This prevents WebGL context glitches and layout shifts during hydration.
const Canvas3D = dynamic(() => import("@/components/Canvas3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90 text-white/50 text-xs tracking-widest uppercase font-mono animate-pulse">
      Loading 3D Scene...
    </div>
  ),
});

export default function Home() {
  const experienceRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative w-full bg-black text-white overflow-x-hidden">
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