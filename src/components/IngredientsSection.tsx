"use client";

import React from "react";
import { motion } from "framer-motion";

const INGREDIENTS = [
  {
    name: "Blood Orange",
    origin: "Sicily, Italy",
    note: "Bright citrus lift, hand-pressed within a day of harvest.",
  },
  {
    name: "Ginger Root",
    origin: "Kerala, India",
    note: "Slow-dried and cold-extracted for a clean, warming finish.",
  },
  {
    name: "Garden Mint",
    origin: "Provence, France",
    note: "Picked at dawn for maximum oil concentration and clarity.",
  },
  {
    name: "White Tea",
    origin: "Fujian, China",
    note: "Lightly oxidized leaves lend a whisper-soft tannic edge.",
  },
  {
    name: "Reishi Mushroom",
    origin: "Pacific Northwest, USA",
    note: "Dual-extracted for its full spectrum of adaptogenic compounds.",
  },
  {
    name: "Rose Botanicals",
    origin: "Isparta, Turkey",
    note: "Steam-distilled petals for a grounding, floral undertone.",
  },
];

export default function IngredientsSection() {
  return (
    <section
      id="ingredients"
      className="relative z-10 scroll-mt-24 bg-aura-bone px-6 py-28 md:px-14"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-luxe mb-4 text-center text-xs text-aura-gold"
        >
          What&apos;s Inside
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mx-auto max-w-2xl text-center font-serif text-4xl leading-tight md:text-5xl"
        >
          Six botanicals. One quiet ritual.
        </motion.h2>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="glass-panel rounded-2xl p-6"
            >
              <p className="text-luxe text-[10px] text-aura-gold">
                {ing.origin}
              </p>
              <h3 className="mt-2 font-serif text-2xl">{ing.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-aura-ink/55">
                {ing.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
