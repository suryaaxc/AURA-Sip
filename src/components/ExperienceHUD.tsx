"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { FLAVORS, useSite } from "./SiteContext";

/**
 * ExperienceHUD renders the text/UI that is choreographed against the
 * 3D scroll experience (hero title, cork-pop caption, final flavor
 * card). It reads scroll progress scoped to `scrollTarget` — the same
 * 400vh element that drives the GSAP ScrollTrigger timeline in
 * Canvas3D — so both systems stay in perfect sync.
 */
export default function ExperienceHUD({
  scrollTarget,
}: {
  scrollTarget: React.RefObject<HTMLElement>;
}) {
  const { flavor, setFlavor, setReserveOpen } = useSite();

  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.12], [0, -40]);

  const corkCaptionOpacity = useTransform(
    smoothProgress,
    [0.32, 0.4, 0.6, 0.68],
    [0, 1, 1, 0]
  );

  const finalCardOpacity = useTransform(smoothProgress, [0.7, 0.8], [0, 1]);
  const finalCardY = useTransform(smoothProgress, [0.7, 0.85], [40, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* ---------------- Frame 1: Hero ---------------- */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-luxe mb-4 text-xs text-aura-gold">
          A Ritual, Bottled
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[15vw] leading-[0.9] tracking-tight md:text-[7.5vw]"
        >
          AURA-SIP
        </motion.h1>
        <p className="mt-6 max-w-sm text-sm text-aura-ink/60">
          Organic botanicals. Slow fermentation. A tonic engineered for
          stillness.
        </p>
        <p className="text-luxe mt-14 animate-pulseSoft text-[10px] text-aura-ink/40">
          Scroll to Uncork
        </p>
      </motion.div>

      {/* ---------------- Frame 2: Cork pop caption ---------------- */}
      <motion.div
        style={{ opacity: corkCaptionOpacity }}
        className="pointer-events-none absolute bottom-24 left-0 right-0 flex flex-col items-center px-6 text-center"
      >
        <span className="text-luxe mb-2 text-xs text-aura-gold">
          The Uncorking
        </span>
        <h3 className="font-serif text-3xl md:text-4xl">Released, Slowly.</h3>
        <p className="mt-3 max-w-xs text-sm text-aura-ink/55">
          A whisper of botanical mist escapes — the first note of the ritual.
        </p>
      </motion.div>

      {/* ---------------- Frame 3: Ingredient breakdown ---------------- */}
      <motion.div
        style={{ opacity: finalCardOpacity, y: finalCardY }}
        className="pointer-events-auto absolute inset-x-0 bottom-8 flex justify-center px-6"
      >
        <div className="glass-panel w-full max-w-lg rounded-3xl p-7 md:p-9">
          <div className="mb-5 flex items-center gap-2">
            <Leaf size={16} className="text-aura-botanical" />
            <span className="text-luxe text-xs text-aura-ink/60">
              Choose Your Botanical
            </span>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {FLAVORS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFlavor(f.id)}
                className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                  flavor === f.id
                    ? "border-aura-gold bg-white/50"
                    : "border-transparent bg-white/20 hover:bg-white/35"
                }`}
              >
                <p className="font-serif text-base leading-tight">{f.name}</p>
                <p className="mt-1 text-[11px] text-aura-ink/50">{f.note}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => setReserveOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-aura-ink px-6 py-3 text-sm text-aura-cream transition-transform hover:scale-[1.01]"
          >
            Reserve This Pressing <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
