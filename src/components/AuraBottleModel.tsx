///
"use client";

import * as THREE from "three";
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { RoundedBox, Sparkles } from "@react-three/drei";

/* ------------------------------------------------------------------ */
/*  Imperative handle exposed to the GSAP ScrollTrigger driver         */
/* ------------------------------------------------------------------ */
export interface AuraBottleHandle {
  bottleGroup: THREE.Group | null;
  corkGroup: THREE.Group | null;
  mistGroup: THREE.Group | null;
  mistMaterial: THREE.PointsMaterial | null;
  citrusGroup: THREE.Group | null;
  mintGroup: THREE.Group | null;
  iceGroup: THREE.Group | null;
  neckWorldPosition: THREE.Vector3;
}

/* ------------------------------------------------------------------ */
/*  Utility: procedural canvas texture for the brand label             */
/* ------------------------------------------------------------------ */
function useLabelTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "rgba(244, 237, 226, 0.0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // soft botanical backdrop wash
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "rgba(244,237,226,0.92)");
    grad.addColorStop(1, "rgba(234,226,212,0.92)");
    ctx.fillStyle = grad;
    ctx.fillRect(60, 60, canvas.width - 120, canvas.height - 120);

    ctx.strokeStyle = "#b89664";
    ctx.lineWidth = 3;
    ctx.strokeRect(84, 84, canvas.width - 168, canvas.height - 168);

    ctx.textAlign = "center";
    ctx.fillStyle = "#1b1a17";
    ctx.font = "600 96px Georgia, serif";
    ctx.fillText("AURA · SIP", canvas.width / 2, 240);

    ctx.font = "300 34px Georgia, serif";
    ctx.fillStyle = "#4a5c3e";
    ctx.letterSpacing = "10px";
    ctx.fillText("ORGANIC BOTANICALS & FERMENTED TONIC", canvas.width / 2, 300);

    ctx.font = "300 24px Georgia, serif";
    ctx.fillStyle = "#7a7264";
    ctx.fillText("CITRUS  ·  MINT  ·  ADAPTOGEN", canvas.width / 2, 400);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Bottle silhouette — lathe profile for a contoured luxury bottle    */
/* ------------------------------------------------------------------ */
function useBottleGeometry() {
  return useMemo(() => {
    const pts: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.62, 0.0),
      new THREE.Vector2(0.66, 0.05),
      new THREE.Vector2(0.68, 0.55),
      new THREE.Vector2(0.64, 0.95),
      new THREE.Vector2(0.55, 1.35),
      new THREE.Vector2(0.5, 1.7),
      new THREE.Vector2(0.5, 2.05),
      new THREE.Vector2(0.44, 2.3),
      new THREE.Vector2(0.3, 2.5),
      new THREE.Vector2(0.16, 2.6),
      new THREE.Vector2(0.14, 2.78),
      new THREE.Vector2(0.14, 2.98),
      new THREE.Vector2(0.0, 2.98),
    ];
    const geo = new THREE.LatheGeometry(pts, 64);
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Citrus slice — rind torus + fleshy segmented disc                  */
/* ------------------------------------------------------------------ */
function useCitrusTexture(base: string, flesh: string) {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 6;

    ctx.fillStyle = flesh;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    const segments = 11;
    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r * 0.92, a0, a1);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.55)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 16;
    ctx.strokeStyle = base;
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [base, flesh]);
}

function CitrusSlice({
  position,
  rotation,
  scale = 1,
  variant = "grapefruit",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  variant?: "grapefruit" | "orange";
}) {
  const colors =
    variant === "grapefruit"
      ? { base: "#e2635a", flesh: "#f4a29a" }
      : { base: "#e08a2b", flesh: "#f7b955" };

  const texture = useCitrusTexture(colors.base, colors.flesh);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* fleshy translucent disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.035, 48]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.35}
          transmission={0.55}
          thickness={0.4}
          ior={1.33}
          clearcoat={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* rind ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.335, 0.02, 16, 48]} />
        <meshPhysicalMaterial
          color={colors.base}
          roughness={0.4}
          clearcoat={0.6}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Mint leaf — bezier shape extruded, veined material                */
/* ------------------------------------------------------------------ */
function useMintLeafGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.28, 0.05, 0.36, 0.28, 0.2, 0.5);
    shape.bezierCurveTo(0.1, 0.62, -0.02, 0.62, -0.1, 0.5);
    shape.bezierCurveTo(-0.28, 0.28, -0.22, 0.05, 0, 0);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.015,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function MintLeaf({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const geo = useMintLeafGeometry();
  return (
    <mesh geometry={geo} position={position} rotation={rotation} scale={scale}>
      <meshPhysicalMaterial
        color="#3f6b3a"
        roughness={0.35}
        clearcoat={0.5}
        clearcoatRoughness={0.3}
        sheen={1}
        sheenColor={new THREE.Color("#8fd18a")}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Ice cube — frosted rounded box, high transmission                 */
/* ------------------------------------------------------------------ */
function IceCube({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <RoundedBox
      args={[0.34, 0.34, 0.34]}
      radius={0.05}
      smoothness={6}
      position={position}
      scale={scale}
    >
      <meshPhysicalMaterial
        color="#eaf6f3"
        roughness={0.08}
        transmission={0.92}
        thickness={0.6}
        ior={1.31}
        clearcoat={1}
        attenuationColor={new THREE.Color("#cfe9e2")}
        attenuationDistance={0.6}
      />
    </RoundedBox>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */
const AuraBottleModel = forwardRef<AuraBottleHandle>((_props, ref) => {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const corkGroupRef = useRef<THREE.Group>(null);
  const mistGroupRef = useRef<THREE.Group>(null);
  const mistMaterialRef = useRef<THREE.PointsMaterial>(null);
  const citrusGroupRef = useRef<THREE.Group>(null);
  const mintGroupRef = useRef<THREE.Group>(null);
  const iceGroupRef = useRef<THREE.Group>(null);

  const bottleGeo = useBottleGeometry();
  const labelTexture = useLabelTexture();

  useImperativeHandle(ref, () => ({
    get bottleGroup() {
      return bottleGroupRef.current;
    },
    get corkGroup() {
      return corkGroupRef.current;
    },
    get mistGroup() {
      return mistGroupRef.current;
    },
    get mistMaterial() {
      return mistMaterialRef.current;
    },
    get citrusGroup() {
      return citrusGroupRef.current;
    },
    get mintGroup() {
      return mintGroupRef.current;
    },
    get iceGroup() {
      return iceGroupRef.current;
    },
    neckWorldPosition: new THREE.Vector3(0, 2.9, 0),
  }));

  return (
    <group>
      {/* -------- Bottle + cork (this whole group is what "floats") -------- */}
      <group ref={bottleGroupRef} position={[0, -1.3, 0]}>
        {/* frosted glass body */}
        <mesh geometry={bottleGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#dceee6"
            transmission={0.95}
            roughness={0.15}
            thickness={0.9}
            ior={1.45}
            attenuationColor={new THREE.Color("#cfe4da")}
            attenuationDistance={1.2}
            clearcoat={1}
            clearcoatRoughness={0.12}
            envMapIntensity={1.2}
            iridescence={0.15}
            iridescenceIOR={1.3}
          />
        </mesh>

        {/* brand label wrap */}
        <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry
            args={[0.685, 0.685, 0.85, 64, 1, true, Math.PI * 0.35, Math.PI * 1.3]}
          />
          <meshPhysicalMaterial
            map={labelTexture}
            transparent
            roughness={0.5}
            clearcoat={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* wooden cork stopper */}
        <group ref={corkGroupRef} position={[0, 2.98, 0]}>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.145, 0.16, 0.34, 24]} />
            <meshStandardMaterial
              color="#c9a06a"
              roughness={0.85}
              metalness={0}
            />
          </mesh>
          <mesh position={[0, 0.32, 0]} castShadow>
            <cylinderGeometry args={[0.17, 0.155, 0.08, 24]} />
            <meshStandardMaterial color="#a97c4f" roughness={0.9} />
          </mesh>
        </group>

        {/* micro-mist / smoke emitter at the neck */}
        <group ref={mistGroupRef} position={[0, 3.05, 0]}>
          <Sparkles
            count={60}
            scale={[0.5, 0.9, 0.5]}
            size={2.2}
            speed={0.25}
            opacity={0}
            color="#f4ede2"
            noise={1.2}
          />
          {/* explicit points material target for opacity tweening (fog wisps) */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={40}
                array={
                  new Float32Array(
                    Array.from({ length: 40 * 3 }, (_, i) =>
                      i % 3 === 1
                        ? Math.random() * 0.9
                        : (Math.random() - 0.5) * 0.4
                    )
                  )
                }
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              ref={mistMaterialRef}
              color="#f8f4ec"
              size={0.18}
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        </group>
      </group>

      {/* -------- Orbiting botanicals (independent of bottle position) ---- */}
      <group ref={citrusGroupRef} position={[0, 0.4, 0]} scale={0.001}>
        <CitrusSlice
          position={[1.6, 0.4, 0]}
          rotation={[0.3, 0, 0.2]}
          variant="grapefruit"
        />
        <CitrusSlice
          position={[-1.7, -0.2, 0.4]}
          rotation={[-0.2, 0.4, 0]}
          variant="orange"
          scale={0.85}
        />
        <CitrusSlice
          position={[0.3, 1.3, -1.4]}
          rotation={[0.6, 0.6, 0]}
          variant="orange"
          scale={0.7}
        />
      </group>

      <group ref={mintGroupRef} position={[0, 0.4, 0]} scale={0.001}>
        <MintLeaf position={[-1.1, 0.9, 0.6]} rotation={[0.4, 0.2, 0.3]} scale={1.6} />
        <MintLeaf position={[1.3, -0.6, -0.5]} rotation={[-0.3, 0.8, -0.2]} scale={1.3} />
        <MintLeaf position={[-0.4, -1.2, 1.1]} rotation={[0.2, -0.4, 0.6]} scale={1.4} />
      </group>

      <group ref={iceGroupRef} position={[0, 0.4, 0]} scale={0.001}>
        <IceCube position={[0.9, -1.1, 0.8]} scale={1.1} />
        <IceCube position={[-1.4, 1.0, -0.6]} scale={0.9} />
        <IceCube position={[0.2, 1.5, 1.2]} scale={0.75} />
      </group>
    </group>
  );
});

AuraBottleModel.displayName = "AuraBottleModel";
export default AuraBottleModel;
