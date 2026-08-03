"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { X, Leaf, Sparkles, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Custom smooth cursor                                               */
/* ------------------------------------------------------------------ */
function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 7}px, ${
          e.clientY - 7
        }px)`;
      }
    };
    window.addEventListener("mousemove", move);

    let raf: number;
    const animateRing = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14;
      ring.current.y += (pos.current.y - ring.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${
          ring.current.y - 20
        }px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="aura-cursor" />
      <div ref={ringRef} className="aura-cursor-ring" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Flavor picker data                                                 */
/* ------------------------------------------------------------------ */
const FLAVORS = [
  {
    id: "citrus",
    name: "Blood Orange & Ginger Root",
    note: "Bright, effervescent, warming",
  },
  {
    id: "mint",
    name: "Garden Mint & White Tea",
    note: "Cooling, herbaceous, clean",
  },
  {
    id: "adaptogen",
    name: "Reishi & Rose Botanicals",
    note: "Grounding, floral, calm",
  },
];

/* ------------------------------------------------------------------ */
/*  Pre-order modal                                                    */
/* ------------------------------------------------------------------ */
function PreOrderModal({
  open,
  onClose,
  flavor,
}: {
  open: boolean;
  onClose: () => void;
  flavor: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-aura-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="glass-panel relative w-full max-w-md rounded-2xl p-8"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-aura-ink/60 hover:text-aura-ink transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <p className="text-luxe text-xs text-aura-gold mb-2">
                  Reserve your ritual
                </p>
                <h3 className="font-serif text-3xl mb-1">AURA-SIP</h3>
                <p className="text-sm text-aura-ink/60 mb-6">
                  {FLAVORS.find((f) => f.id === flavor)?.name ??
                    "Signature Botanical Blend"}
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col gap-3"
                >
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
                    className="flex items-center justify-center gap-2 rounded-full bg-aura-ink px-5 py-3 text-sm text-aura-cream transition-transform hover:scale-[1.02]"
                  >
                    Reserve Bottle <ArrowRight size={15} />
                  </button>
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
                  We&apos;ll reach out the moment your pressing is ready.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */
function FluidHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`font-serif leading-[0.95] ${className}`}
    >
      {children}
    </motion.h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */
export default function HUDOverlay() {
  const [flavor, setFlavor] = useState(FLAVORS[0].id);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();
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

  const finalCardOpacity = useTransform(
    smoothProgress,
    [0.7, 0.8],
    [0, 1]
  );
  const finalCardY = useTransform(smoothProgress, [0.7, 0.85], [40, 0]);

  return (
    <div className="hud-stage pointer-events-none">
      <SmoothCursor />

      {/* Top nav */}
      <div className="pointer-events-auto fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-8 py-6 md:px-14">
        <span className="text-luxe font-serif text-lg">AURA·SIP</span>
        <button
          onClick={() => setModalOpen(true)}
          className="glass-pill text-luxe rounded-full px-5 py-2 text-[11px] transition-transform hover:scale-105"
        >
          Reserve
        </button>
      </div>

      {/* ---------------- Frame 1: Hero ---------------- */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-luxe mb-4 text-xs text-aura-gold">
          A Ritual, Bottled
        </p>
        <FluidHeading className="text-[13vw] md:text-[7.5vw] tracking-tight">
          AURA-SIP
        </FluidHeading>
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
        className="pointer-events-none fixed bottom-24 left-0 right-0 z-20 flex flex-col items-center px-6 text-center"
      >
        <span className="text-luxe mb-2 text-xs text-aura-gold">
          The Uncorking
        </span>
        <h3 className="font-serif text-3xl md:text-4xl">
          Released, Slowly.
        </h3>
        <p className="mt-3 max-w-xs text-sm text-aura-ink/55">
          A whisper of botanical mist escapes — the first note of the ritual.
        </p>
      </motion.div>

      {/* ---------------- Frame 3: Ingredient breakdown ---------------- */}
      <motion.div
        style={{ opacity: finalCardOpacity, y: finalCardY }}
        className="pointer-events-auto fixed inset-x-0 bottom-10 z-20 flex justify-center px-6"
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
            onClick={() => setModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-aura-ink px-6 py-3 text-sm text-aura-cream transition-transform hover:scale-[1.01]"
          >
            Reserve This Pressing <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>

      <PreOrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        flavor={flavor}
      />
    </div>
  );
}
