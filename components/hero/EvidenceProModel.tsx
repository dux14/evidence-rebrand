"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Preload, Environment } from "@react-three/drei";

/**
 * R3F module — only renders when FEATURES.hero_3d is true AND
 * /public/models/evidence-pro.glb is present. Imported via next/dynamic
 * with ssr:false to keep the bundle and SSR clean.
 */

function Model() {
  const { scene } = useGLTF("/models/evidence-pro.glb");
  return <primitive object={scene} position={[0, -0.4, 0]} scale={1.2} />;
}

useGLTF.preload("/models/evidence-pro.glb");

export default function EvidenceProModel() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.2], fov: 28 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[2, 2, 3]} intensity={1.2} color="#FFB68A" />
      <directionalLight position={[-2, -1, 1]} intensity={0.25} color="#9CC4FF" />
      <Suspense fallback={null}>
        <Model />
        <Environment preset="studio" />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
