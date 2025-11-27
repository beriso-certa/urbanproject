"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { UrbanBlock2D } from "./UrbanBlock2D";

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the "urban" text
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
    }

    // Animate the tagline
    if (taglineRef.current) {
      gsap.from(taglineRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center bg-black p-4 md:p-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - 3D Urban Blocks */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <UrbanBlock2D />
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 
              ref={titleRef}
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-red-600 leading-none mb-8 md:mb-12"
            >
              urban
            </h1>
            
            <div 
              ref={taglineRef}
              className="max-w-md mt-auto pt-8 border-t border-gray-800"
            >
              <p className="text-white text-lg md:text-xl leading-relaxed opacity-80">
                We create stories through content, strategy, and imagination work that makes people stop, feel, and remember.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};