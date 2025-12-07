'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (leftPanelRef.current && cardRef.current) {
      // Animate left panel
      gsap.from(leftPanelRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        ease: 'power3.out'
      });

      // Animate card with slight delay
      gsap.from(cardRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          {/* Left Red Panel */}
          <div 
            ref={leftPanelRef}
            className="w-full lg:w-2/5 bg-[#F40000] text-white p-12 relative min-h-[500px] flex items-center"
          >
            <div className="relative z-10 w-full">
              <span className="text-sm font-medium tracking-widest mb-2 block">TESTIMONIAL</span>
              <div className="text-[120px] leading-none font-bold text-white/20 mb-8">"</div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
                WHAT OUR <br />CLIENTS SAY
              </h2>
            </div>
          </div>

          {/* Right Testimonial Card */}
          <div className="w-full lg:w-3/5 relative -mt-10 lg:mt-10 lg:-ml-20 z-10">
            <div 
              ref={cardRef}
              className="bg-white p-8 md:p-12 relative border-2 border-[#F40000]"
            >
              <div className="absolute top-8 left-8 text-[#F40000] text-5xl font-bold">"</div>
              
              <div className="text-gray-700 text-lg leading-relaxed mb-8 pl-8 pt-4">
                "Urban didn't just shoot a campaign they built an experience. Every frame carried our brand's soul. The response was beyond what we imagined"
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-bold text-xl text-gray-900">SAMUEL T.</h4>
                <p className="text-gray-600">Brand Manager, Safaricom Ethiopia</p>
              </div>

              <div className="absolute bottom-8 right-8 text-[#F40000] text-5xl font-bold transform rotate-180">"</div>
              
              <div className="flex justify-end mt-8 space-x-4">
                <button className="w-10 h-10 rounded-full border-2 border-[#F40000] flex items-center justify-center text-[#F40000] hover:bg-[#F40000] hover:text-white transition-colors">
                  &larr;
                </button>
                <button className="w-10 h-10 rounded-full bg-[#F40000] text-white flex items-center justify-center hover:bg-red-700 transition-colors">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;