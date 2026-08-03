"use client";

import * as THREE from "three";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, PerformanceMonitor } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuraBottleModel, { AuraBottleHandle } from "./AuraBottleModel";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Ambient idle float — runs every frame regardless of scroll         */
/* ------------------------------------------------------------------ */
function AmbientFloat({ modelRef }: { modelRef: React.RefObject<AuraBottleHandle> }) {
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta;
    const bottle = modelRef.current?.bottleGroup;
    if (bottle) {
      bottle.position.y = -1.3 + Math.sin(t.current * 0.8) * 0.06;
    }
    const citrus = modelRef.current?.citrusGroup;
    if (citrus && citrus.scale.x > 0.05) {
      citrus.rotation.y += delta * 0.15;
    }
    const mint = modelRef.current?.mintGroup;
    if (mint && mint.scale.x > 0.05) {
      mint.rotation.y -= delta * 0.1;
    }
  });
  return null;
}

/* ------------------------------------------------------------------ */
/*  Scroll-driven timeline — lives inside the Canvas so it can reach   */
/*  the camera via useThree() and the mesh refs via modelRef            */
/* ------------------------------------------------------------------ */
function ScrollDirector({ modelRef }: { modelRef: React.RefObject<AuraBottleHandle> }) {
  const { camera } = useThree();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const model = modelRef.current;
      if (!model || !model.bottleGroup || !model.corkGroup) return;

      camera.position.set(0, 0.3, 6.2);
      camera.lookAt(0, 0.6, 0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        defaults: { ease: "power2.inOut" },
      });

      // ---- Frame 1 (0 -> 0.35): ambient hero rotation ----
      tl.to(
        model.bottleGroup.rotation,
        { y: Math.PI * 0.9, duration: 0.35 },
        0
      );

      // ---- Frame 2 (0.35 -> 0.65): cork pop + mist burst + macro orbit ----
      tl.to(
        model.corkGroup.position,
        { y: 3.7, duration: 0.18, ease: "back.out(1.7)" },
        0.35
      );
      tl.to(
        model.corkGroup.rotation,
        { z: Math.PI * 0.25, duration: 0.18 },
        0.35
      );
      if (model.mistMaterial) {
        tl.to(model.mistMaterial, { opacity: 0.9, duration: 0.15 }, 0.37);
        tl.to(model.mistMaterial, { opacity: 0.15, duration: 0.15 }, 0.55);
      }
      tl.to(
        camera.position,
        { x: 0.55, y: 1.35, z: 2.1, duration: 0.3 },
        0.35
      );
      tl.to(
        model.bottleGroup.rotation,
        { y: Math.PI * 1.15, duration: 0.3 },
        0.35
      );

      // ---- Frame 3 (0.7 -> 1.0): flavor orbit expansion ----
      tl.to(model.bottleGroup.position, { y: -2.1, duration: 0.3 }, 0.7);
      tl.to(
        camera.position,
        { x: 0, y: 0.4, z: 8.2, duration: 0.3 },
        0.7
      );
      if (model.citrusGroup) {
        tl.to(model.citrusGroup.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, 0.7);
      }
      if (model.mintGroup) {
        tl.to(model.mintGroup.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, 0.72);
      }
      if (model.iceGroup) {
        tl.to(model.iceGroup.scale, { x: 1, y: 1, z: 1, duration: 0.3 }, 0.74);
      }
    });

    return () => ctx.revert();
  }, [camera, modelRef]);

  useFrame(() => {
    camera.lookAt(0, 0.6, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */
export default function Canvas3D() {
  const modelRef = useRef<AuraBottleHandle>(null);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0.3, 6.2] }}
      >
        <PerformanceMonitor>
          <color attach="background" args={["#f4ede2"]} />
          <fog attach="fog" args={["#f4ede2", 8, 16]} />

          <ambientLight intensity={0.4} />
          <directionalLight
            position={[3, 5, 4]}
            intensity={1.4}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#fff3e0" />
          <pointLight position={[0, 2, 2]} intensity={0.3} color="#b89664" />

          <Suspense fallback={null}>
            <Environment preset="studio" environmentIntensity={1.1} />
            <AuraBottleModel ref={modelRef} />
            <ContactShadows
              position={[0, -3.35, 0]}
              opacity={0.55}
              scale={10}
              blur={2.4}
              far={4}
              color="#1b1a17"
            />
            <ScrollDirector modelRef={modelRef} />
            <AmbientFloat modelRef={modelRef} />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
