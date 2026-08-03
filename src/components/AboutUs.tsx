"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplets, Leaf, Sparkles } from "lucide-react";
import LivingPortrait from "./LivingPortrait";

const VALUES = [
  {
    icon: Leaf,
    title: "Organic Botanicals",
    copy: "Every citrus, leaf, and root is sourced from certified organic growers and hand-selected at peak potency.",
  },
  {
    icon: Droplets,
    title: "Slow Fermentation",
    copy: "A patient, small-batch ferment coaxes out complexity you can't rush — depth over speed, always.",
  },
  {
    icon: Sparkles,
    title: "Adaptogenic Calm",
    copy: "Reishi and rose work quietly beneath the surface, engineered for stillness rather than stimulation.",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-24 bg-aura-cream px-6 py-28 md:px-14"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
        <FadeIn>
          <LivingPortrait src="/images/founder.jpg" alt="Founder of AURA-SIP" />
        </FadeIn>

        <div>
          <FadeIn>
            <p className="text-luxe mb-4 text-xs text-aura-gold">About Us</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-serif text-4xl leading-[1.05] md:text-5xl">
              Crafted in stillness,
              <br />
              poured with intention.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-aura-ink/65 md:text-base">
              AURA-SIP began as a simple question: what would a tonic taste
              like if it were designed for calm instead of a rush? We
              partner with small organic farms for our citrus and botanicals,
              ferment every batch slowly by hand, and bottle each pressing in
              frosted glass built to be kept, not discarded. No shortcuts,
              no filler — just a quiet ritual you can hold.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p className="mt-4 max-w-lg text-sm italic leading-relaxed text-aura-ink/50">
              &ldquo;We wanted a drink that felt like an exhale.&rdquo;
              <span className="not-italic"> — Founder, AURA-SIP</span>
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={0.3 + i * 0.08}>
                <v.icon size={18} className="mb-3 text-aura-botanical" />
                <h3 className="font-serif text-lg leading-tight">{v.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-aura-ink/55">
                  {v.copy}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
