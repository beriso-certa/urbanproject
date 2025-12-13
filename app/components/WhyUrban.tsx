'use client';

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SlideContent {
  id: number;
  image: string;
  title: string;
  characteristics: {
    emotional: string;
    fearless: string;
    authentic: string;
  };
  tagline: string;
}

const WhyUrban = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const dragStartRef = useRef(0);

  const slides: SlideContent[] = [
    {
      id: 1,
      image: "images/emotion01.png",
      title: "WHY URBAN",
      characteristics: { emotional: "EMOTIONAL", fearless: "FEARLESS", authentic: "AUTHENTIC" },
      tagline: "We don't just film what brands do. We capture what they mean."
    },
    {
      id: 2,
      image: "images/emotion01.png",
      title: "OUR VISION",
      characteristics: { emotional: "BOLD", fearless: "CREATIVE", authentic: "REAL" },
      tagline: "Creating stories that resonate with audiences worldwide."
    },
    {
      id: 3,
      image: "images/emotion02.png",
      title: "OUR MISSION",
      characteristics: { emotional: "IMPACTFUL", fearless: "INNOVATIVE", authentic: "HONEST" },
      tagline: "Transforming visions into compelling visual narratives."
    },
    {
      id: 4,
      image: "images/emotion03.png",
      title: "OUR MISSION",
      characteristics: { emotional: "IMPACTFUL", fearless: "INNOVATIVE", authentic: "HONEST" },
      tagline: "Transforming visions into compelling visual narratives."
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let x = 0;
    let isDrag = false;
    let startPos = 0;
    let currentX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDrag = true;
      startPos = e.clientX;
      dragStartRef.current = x;
      setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDrag) return;
      
      currentX = e.clientX - startPos;
      const translateX = dragStartRef.current + currentX;
      
      gsap.to(container, {
        x: translateX,
        duration: 0,
        overwrite: false
      });
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDrag) return;
      isDrag = false;
      setIsDragging(false);

      const threshold = 100;
      const finalX = dragStartRef.current + currentX;

      if (currentX < -threshold && currentSlide < slides.length - 1) {
        // Dragged left - go to next slide
        setCurrentSlide(prev => prev + 1);
        x = -(currentSlide + 1) * window.innerWidth;
      } else if (currentX > threshold && currentSlide > 0) {
        // Dragged right - go to previous slide
        setCurrentSlide(prev => prev - 1);
        x = -currentSlide * window.innerWidth;
      } else {
        // Snap back to current slide
        x = -currentSlide * window.innerWidth;
      }

      gsap.to(container, {
        x: x,
        duration: 0.6,
        ease: "power2.inOut"
      });
    };

    container.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    // Touch support
    container.addEventListener("touchstart", (e) => {
      isDrag = true;
      startPos = e.touches[0].clientX;
      dragStartRef.current = x;
      setIsDragging(true);
    });

    document.addEventListener("touchmove", (e) => {
      if (!isDrag) return;
      currentX = e.touches[0].clientX - startPos;
      const translateX = dragStartRef.current + currentX;
      
      gsap.to(container, {
        x: translateX,
        duration: 0,
        overwrite: false
      });
    });

    document.addEventListener("touchend", (e) => {
      if (!isDrag) return;
      isDrag = false;
      setIsDragging(false);

      const threshold = 50;

      if (currentX < -threshold && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1);
        x = -(currentSlide + 1) * window.innerWidth;
      } else if (currentX > threshold && currentSlide > 0) {
        setCurrentSlide(prev => prev - 1);
        x = -currentSlide * window.innerWidth;
      } else {
        x = -currentSlide * window.innerWidth;
      }

      gsap.to(container, {
        x: x,
        duration: 0.6,
        ease: "power2.inOut"
      });
    });

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", (e) => {});
      document.removeEventListener("touchmove", (e) => {});
      document.removeEventListener("touchend", (e) => {});
    };
  }, [currentSlide, slides.length]);

  // Animate elements when slide changes
  useEffect(() => {
    const slide = containerRef.current?.children[currentSlide];
    if (!slide) return;

    const titleEl = slide.querySelector('[data-title]');
    const buttonsEl = slide.querySelector('[data-buttons]');
    const taglineEl = slide.querySelector('[data-tagline]');
    const imageEl = slide.querySelector('[data-image]');

    gsap.fromTo(imageEl, { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" });

    gsap.fromTo(titleEl, { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" });

    gsap.fromTo(
      buttonsEl?.querySelectorAll('button'),
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(taglineEl, { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 });
  }, [currentSlide]);

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="relative w-full h-full flex cursor-grab active:cursor-grabbing"
        style={{ willChange: "transform" }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex-shrink-0 flex items-center bg-black overflow-hidden"
          >
            {/* Background Image */}
            <div
              data-image
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col w-full">
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left side - Title */}
                <div className="lg:col-span-3 flex justify-start">
                  <h1
                    data-title
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none"
                  >
                    {slide.title.split(' ').map((word, i) => (
                      <span key={i} className="block">
                        {word}
                      </span>
                    ))}
                  </h1>
                </div>

                {/* Center - Empty space for image visibility */}
                <div className="hidden lg:block lg:col-span-6"></div>

                {/* Right side - Buttons */}
                <div
                  data-buttons
                  className="lg:col-span-3 flex flex-row gap-2 sm:gap-3 mt-8 lg:mt-0 w-full"
                >
                  <button className="flex-1 bg-transparent border border-white text-white py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
                    {slide.characteristics.emotional}
                  </button>
                  <button className="flex-1 bg-transparent border border-white text-white py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
                    {slide.characteristics.fearless}
                  </button>
                  <button className="flex-1 bg-transparent border border-white text-white py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-black whitespace-nowrap">
                    {slide.characteristics.authentic}
                  </button>
                </div>
              </div>

              {/* Bottom right - Tagline */}
              <div className="py-6 sm:py-8 lg:py-12">
                <p
                  data-tagline
                  className="text-white text-xs sm:text-sm md:text-base text-right max-w-md ml-auto"
                >
                  {slide.tagline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Drag Hint */}
      {currentSlide < slides.length - 1 && (
        <div className="absolute bottom-20 right-8 z-20 text-white/60 text-sm animate-pulse hidden sm:block">
          ← Drag to explore
        </div>
      )}
    </div>
  );
};

export default WhyUrban;