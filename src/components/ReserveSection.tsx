"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSite } from "./SiteContext";

export default function ReserveSection() {
  const { flavor } = useSite();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, flavor }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="reserve"
      className="relative z-10 scroll-mt-24 bg-aura-cream px-6 py-28 md:px-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel mx-auto max-w-2xl rounded-3xl p-10 text-center md:p-14"
      >
        <p className="text-luxe mb-3 text-xs text-aura-gold">
          First-Run Pressing
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">
          Reserve your bottle.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-aura-ink/60">
          Leave your email and we&apos;ll notify you the moment your
          botanical pressing is ready to ship — no spam, just the ritual.
        </p>

        {status !== "done" ? (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="glass-pill flex-1 rounded-full px-5 py-3 text-sm outline-none placeholder:text-aura-ink/40"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-full bg-aura-ink px-6 py-3 text-sm text-aura-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {status === "loading" ? "Reserving…" : "Reserve"}
              <ArrowRight size={15} />
            </button>
          </form>
        ) : (
          <div className="mt-8">
            <Sparkles className="mx-auto mb-3 text-aura-gold" size={26} />
            <p className="text-sm text-aura-ink/70">
              You&apos;re on the list — check <strong>{email}</strong> soon.
            </p>
          </div>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs text-red-500">
            Something went wrong — please try again.
          </p>
        )}
      </motion.div>
    </section>
  );
}
