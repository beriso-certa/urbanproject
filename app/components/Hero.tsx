"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UrbanBlock2D } from "./UrbanBlock2D";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
    .fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.7"
    )
    .fromTo(
      buttonsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Scroll-based animations
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      }
    })
    .to(titleRef.current, { 
      y: -100,
      scale: 0.95,
      opacity: 0.7
    })
    .to(taglineRef.current, {
      y: -50,
      opacity: 0.7
    }, 0)
    .to(buttonsRef.current, {
      y: -30,
      opacity: 0.8
    }, 0);

    // Parallax effect for video
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center bg-black p-6 md:p-12 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]"></div>
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <UrbanBlock2D />
            <div 
              ref={buttonsRef}
              className="w-full flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Link 
                href="/works"
                className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-base font-medium tracking-wider"
              >
                SEE OUR WORK
                <ArrowRight 
                  size={18} 
                  className="group-hover:translate-x-1 transition-transform duration-300" 
                />
              </Link>
              <Link 
                href="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 text-base font-medium tracking-wider"
              >
                START A PROJECT
                <ArrowRight 
                  size={18} 
                  className="group-hover:translate-x-1 transition-transform duration-300" 
                />
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 
              ref={titleRef}
              className="text-8xl md:text-[180px] lg:text-[220px] xl:text-[260px] font-black text-red-600 leading-[0.8] tracking-tight mb-12 will-change-transform"
            >
              urban
            </h1>
            
            <div 
              ref={taglineRef}
              className="max-w-2xl mb-16 will-change-transform"
            >
              <p className="text-white text-xl md:text-2xl leading-relaxed opacity-90 mb-4">
                We create stories through content, strategy, and imagination work that makes people stop, feel, and remember.
              </p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12 w-full will-change-transform">
          <div className="relative w-full max-w-[1280px] mx-auto px-8 py-8">
            <div className="relative w-full h-[506px] mx-auto overflow-hidden rounded-lg bg-black/20">
              <video
                ref={videoRef}
                src="/images/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};