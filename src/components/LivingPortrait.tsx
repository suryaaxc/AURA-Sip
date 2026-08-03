"use client";

import Image from "next/image";
import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

/**
 * LivingPortrait
 * ----------------------------------------------------------------
 * An animated founder portrait: a slow ambient "breathing" scale, a
 * rotating conic-gradient halo behind the frame, and a subtle
 * cursor-parallax tilt — giving a static photo a living, premium
 * presence without misrepresenting it as a real-time face capture.
 *
 * (A true rigged 3D facial animation reconstructed from a single
 * photo needs a photogrammetry / neural face-reconstruction pipeline
 * — outside what can be generated as static front-end code. This
 * component is the tasteful, deployable alternative: a photograph
 * treated as a living object.)
 */
export default function LivingPortrait({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 16 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 16 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(-py * 14);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto h-[380px] w-[300px] md:h-[440px] md:w-[350px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* rotating botanical-gold halo */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-6 rounded-[2.5rem]"
        style={{
          background:
            "conic-gradient(from 0deg, #b8966400, #b89664aa, #4a5c3e88, #b89664aa, #b8966400)",
          filter: "blur(18px)",
          opacity: 0.55,
        }}
      />

      {/* breathing frame */}
      <motion.div
        style={{ transform }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/50 shadow-[0_20px_60px_rgba(27,26,23,0.18)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 300px, 350px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-aura-ink/25 via-transparent to-transparent" />

        {/* subtle animated scan sheen */}
        <motion.div
          aria-hidden
          className="absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(100deg, transparent, rgba(255,255,255,0.22), transparent)",
          }}
          animate={{ x: ["-120%", "220%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
