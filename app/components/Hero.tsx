"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ 3D ENTRY ANIMATION
      const intro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      intro
        .set(sectionRef.current, { perspective: 1200 })
        .fromTo(
          imageRef.current,
          { opacity: 0, rotateX: 15, y: 120 },
          { opacity: 1, rotateX: 0, y: 0, duration: 1.2 }
        )
        .fromTo(
          textRef.current,
          { opacity: 0, rotateY: 15, x: -60 },
          { opacity: 1, rotateY: 0, x: 0, duration: 1 },
          "-=0.6"
        )
        .fromTo(
          buttonsRef.current?.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 },
          "-=0.4"
        );

      // ✅ PINNED 3D SCROLL DEPTH EFFECT
      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });

      scrollTL
        .to(imageRef.current, {
          scale: 0.9,
          rotateX: -8,
          y: -140,
        })
        .to(
          textRef.current,
          {
            y: -120,
            opacity: 0.6,
          },
          0
        )
        .to(
          buttonsRef.current,
          {
            y: -80,
            opacity: 0.5,
          },
          0
        );

      // ✅ VIDEO FLOATING PARALLAX
      gsap.to(videoRef.current, {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black flex flex-col justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:25px_25px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-32">
        <div className="flex flex-col gap-12">
          
          {/* ✅ 3D IMAGE BLOCK */}
          <div ref={imageRef} className="will-change-transform">
            <Image
              src="/images/herourban.png"
              alt="Hero"
              width={1280}
              height={433}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* ✅ TEXT CONTENT */}
         <div ref={textRef} className="max-w-2xl ml-auto">
  <p className="text-white font-sans font-normal text-base leading-[150%] tracking-normal">
    We create stories through content, strategy, and 
    imagination work that makes people stop, feel, and remember.
  </p>
</div>

          {/* ✅ CTA BUTTONS */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/works"
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all"
            >
              SEE OUR WORK
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-200 transition-all"
            >
              START A PROJECT
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ VIDEO PARALLAX */}
      <div className="relative z-10 mt-24 max-w-6xl mx-auto w-full px-6">
        <div className="relative w-full h-[520px] rounded-xl overflow-hidden bg-black/20">
          <video
            ref={videoRef}
            src="/images/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
};
