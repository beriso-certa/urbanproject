"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

/* ✅ CREATE REAL TEXTURE WITH LETTER */
function useLetterTexture(letter: string) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#e10600"; // red block
    ctx.fillRect(0, 0, 256, 256);

    ctx.fillStyle = "black"; // black letter
    ctx.font = "bold 160px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, 128, 140);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  }, [letter]);
}

/* ✅ SINGLE BLOCK */
function Block({
  position,
  letter,
}: {
  position: [number, number, number];
  letter: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const letterTexture = useLetterTexture(letter);

  useEffect(() => {
    if (!meshRef.current) return;

    gsap.fromTo(
      meshRef.current.scale,
      { x: 0, y: 0, z: 0 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "back.out(1.7)",
        delay: Math.random() * 0.4,
      }
    );

    gsap.fromTo(
      meshRef.current.position,
      { y: position[1] - 2 },
      {
        y: position[1],
        duration: 1,
        ease: "power3.out",
      }
    );
  }, [position]);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 0.6]} />

      {/* ✅ MATERIALS PER FACE */}
      <meshStandardMaterial attach="material-0" color="#b00000" /> {/* Right */}
      <meshStandardMaterial attach="material-1" color="#b00000" /> {/* Left */}
      <meshStandardMaterial attach="material-2" color="#c00000" /> {/* Top */}
      <meshStandardMaterial attach="material-3" color="#900000" /> {/* Bottom */}

      {/* ✅ FRONT FACE WITH LETTER */}
      <meshStandardMaterial
        attach="material-4"
        map={letterTexture}
        metalness={0.6}
        roughness={0.2}
      />

      {/* ✅ BACK FACE */}
      <meshStandardMaterial
        attach="material-5"
        color="#700000"
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

/* ✅ GROUP MODEL */
function UrbanModel() {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 18,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* CENTER (N) */}
      <Block position={[0, 0, 0]} letter="N" />

      {/* TOP (U) */}
      <Block position={[0, 1.3, 0]} letter="U" />

      {/* RIGHT (A) */}
      <Block position={[1.3, 0, 0]} letter="A" />

      {/* BOTTOM (B) */}
      <Block position={[0, -1.3, 0]} letter="B" />

      {/* LEFT (R) */}
      <Block position={[-1.3, 0, 0]} letter="R" />
    </group>
  );
}

/* ✅ MAIN EXPORT */
export default function UrbanBlock3D() {
  return (
    <div className="w-full h-[420px] bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* ✅ PRO LIGHTING */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 6, 6]} intensity={1.8} />
        <spotLight position={[-6, 6, 6]} intensity={1} angle={0.3} />

        {/* ✅ ENVIRONMENT */}
        <Environment preset="city" />

        {/* ✅ 3D MODEL */}
        <UrbanModel />

        {/* ✅ CONTROLS */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
