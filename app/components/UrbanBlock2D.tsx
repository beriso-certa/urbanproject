// components/UrbanBlock2D.tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Block3D = ({ letter, position, innerRef }: { 
  letter: string; 
  position: { x: number; y: number; z: number; rotateX?: number; rotateY?: number; rotateZ?: number }; 
  innerRef: (el: HTMLDivElement | null) => void;
}) => {
  const depth = 24; // Reduced depth for a more subtle 3D effect
  const blockSize = 60; // Slightly smaller blocks
  
  return (
    <div 
      ref={innerRef}
      className="absolute"
      style={{
        width: `${blockSize}px`,
        height: `${blockSize}px`,
        transform: `
          translate3d(${position.x}px, ${position.y}px, ${position.z}px)
          rotateX(${position.rotateX || 0}deg)
          rotateY(${position.rotateY || 0}deg)
          rotateZ(${position.rotateZ || 0}deg)
        `,
        transformStyle: 'preserve-3d',
        transition: 'all 0.4s ease-out',
      }}
    >
      {/* Front face */}
      <div 
        className="absolute w-full h-full bg-red-600 flex items-center justify-center text-2xl font-bold text-white"
        style={{
          transform: `translateZ(${depth/2}px)`,
          backfaceVisibility: 'hidden',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        {letter}
      </div>
      
      {/* Back face */}
      <div 
        className="absolute w-full h-full bg-red-700 flex items-center justify-center text-2xl font-bold text-white"
        style={{
          transform: `rotateY(180deg) translateZ(${depth/2}px)`,
          backfaceVisibility: 'hidden',
        }}
      />
      
      {/* Right face */}
      <div 
        className="absolute top-0 right-0 h-full bg-red-700"
        style={{
          width: `${depth}px`,
          transform: `rotateY(90deg) translateZ(${blockSize/2}px)`,
          transformOrigin: 'right center',
        }}
      />
      
      {/* Left face */}
      <div 
        className="absolute top-0 left-0 h-full bg-red-500"
        style={{
          width: `${depth}px`,
          transform: `rotateY(-90deg) translateZ(${blockSize/2}px)`,
          transformOrigin: 'left center',
        }}
      />
      
      {/* Top face */}
      <div 
        className="absolute top-0 left-0 w-full bg-red-500"
        style={{
          height: `${depth}px`,
          transform: `rotateX(90deg) translateZ(${blockSize/2}px)`,
          transformOrigin: 'center top',
        }}
      />
      
      {/* Bottom face */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-red-700"
        style={{
          height: `${depth}px`,
          transform: `rotateX(-90deg) translateZ(${blockSize/2}px)`,
          transformOrigin: 'center bottom',
        }}
      />
    </div>
  );
};

export const UrbanBlock2D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blockSize = 60;
  const gap = 70; // Reduced gap between blocks

  // Position the letters in a cross pattern
  const positions = [
    // Center block (N)
    { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
    // Top block (U)
    { x: 0, y: -gap, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
    // Right block (A)
    { x: gap, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
    // Bottom block (B)
    { x: 0, y: gap, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
    // Left block (R)
    { x: -gap, y: 0, z: 0, rotateX: 0, rotateY: 0, rotateZ: 0 },
  ];

  const letters = ['U', 'R', 'B', 'A', 'N'];

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial animation
    gsap.set(blockRefs.current, { 
      opacity: 0,
      scale: 0.7,
      y: 50,
    });

    // Staggered entrance animation
    gsap.to(blockRefs.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 0.3
    });

    // Hover effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(containerRef.current, {
        rotationY: x * 0.05,
        rotationX: -y * 0.05,
        duration: 1,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: 'power2.out',
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Auto-rotation
    const rotationTween = gsap.to(container, {
      rotationY: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
      paused: true
    });
    
    rotationTween.play();

    // Pause auto-rotation on hover
    container.addEventListener('mouseenter', () => {
      rotationTween.pause();
    });

    container.addEventListener('mouseleave', () => {
      rotationTween.play();
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      rotationTween.kill();
    };
  }, []);

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {positions.map((pos, index) => (
          <Block3D
            key={index}
            letter={letters[index]}
            position={pos}
          
            innerRef={(el) => blockRefs.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
};