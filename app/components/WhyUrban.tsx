'use client';

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface WhyUrbanProps {
  title?: string;
  characteristics?: {
    emotional: string;
    fearless: string;
    authentic: string;
  };
  tagline?: string;
  personImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

const WhyUrban = ({
  title = "WHY URBAN",
  characteristics = {
    emotional: "EMOTIONAL",
    fearless: "FEARLESS",
    authentic: "AUTHENTIC"
  },
  tagline = "We don't just film what brands do. We capture what they mean.",
  personImage
}: WhyUrbanProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Buttons animation
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Person image animation
    if (personRef.current) {
      gsap.fromTo(
        personRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Tagline animation
    gsap.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none"
        }
      }
    );

    // Button hover effects
    const buttons = buttonsRef.current?.children;
    if (buttons) {
      Array.from(buttons).forEach((button) => {
        const btn = button as HTMLElement;
        
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/whyimage.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Title */}
          <div className="lg:col-span-3 flex justify-start">
            <h1 
              ref={titleRef}
              className="text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-none"
            >
              {title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
          </div>

          {/* Center - Person Image */}
          <div ref={personRef} className="lg:col-span-6 flex justify-center items-center">
            {personImage && (
              <div className="relative w-full h-[70vh] max-h-[800px]">
                <Image
                  src={urlFor(personImage).url()}
                  alt="Urban team member"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
          </div>

          {/* Right side - Buttons */}
          <div 
  ref={buttonsRef} 
  className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4 mt-8 lg:mt-0 w-full lg:w-auto"
>
  <button className="flex-1 lg:flex-none bg-transparent border border-white text-white py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
    {characteristics.emotional}
  </button>
  <button className="flex-1 lg:flex-none bg-transparent border border-white text-white py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
    {characteristics.fearless}
  </button>
  <button className="flex-1 lg:flex-none bg-transparent border border-white text-white py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
    {characteristics.authentic}
  </button>
</div>
        </div>

        {/* Bottom right - Tagline */}
        <div className="py-8 lg:py-12">
          <p 
            ref={taglineRef}
            className="text-white text-sm md:text-base text-right max-w-md ml-auto"
          >
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUrban;