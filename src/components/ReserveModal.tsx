"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { FLAVORS, useSite } from "./SiteContext";

export default function ReserveModal() {
  const { reserveOpen, setReserveOpen, flavor } = useSite();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const close = () => {
    setReserveOpen(false);
    setStatus("idle");
    setEmail("");
  };

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
    <AnimatePresence>
      {reserveOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-aura-ink/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            className="glass-panel relative w-full max-w-md rounded-2xl p-8"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 text-aura-ink/60 transition-colors hover:text-aura-ink"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {status !== "done" ? (
              <>
                <p className="text-luxe mb-2 text-xs text-aura-gold">
                  Reserve your ritual
                </p>
                <h3 className="font-serif text-3xl mb-1">AURA-SIP</h3>
                <p className="mb-6 text-sm text-aura-ink/60">
                  {FLAVORS.find((f) => f.id === flavor)?.name ??
                    "Signature Botanical Blend"}
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="glass-pill rounded-full px-5 py-3 text-sm outline-none placeholder:text-aura-ink/40"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 rounded-full bg-aura-ink px-5 py-3 text-sm text-aura-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === "loading" ? "Reserving…" : "Reserve Bottle"}
                    <ArrowRight size={15} />
                  </button>
                  {status === "error" && (
                    <p className="text-center text-xs text-red-500">
                      Something went wrong — please try again.
                    </p>
                  )}
                </form>
                <p className="mt-4 text-[11px] text-aura-ink/40">
                  Limited first-run pressing. Ships early access, priority.
                </p>
              </>
            ) : (
              <div className="py-8 text-center">
                <Sparkles className="mx-auto mb-4 text-aura-gold" size={28} />
                <h3 className="font-serif text-2xl mb-2">You&apos;re on the list</h3>
                <p className="text-sm text-aura-ink/60">
                  We&apos;ll reach out at <strong>{email}</strong> the moment
                  your pressing is ready.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
