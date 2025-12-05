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
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Red Panel */}
          <div 
            ref={leftPanelRef}
            className="w-full md:w-1/2 h-[500px] bg-[#F40000] text-white p-12 relative overflow-hidden"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="text-xs font-medium tracking-widest mb-4 inline-block">TESTIMONIAL</span>
                <div className="text-5xl opacity-20 mb-8">"</div>
              </div>
               <div className="flex justify-center mt-4">
                <img 
                  src="/images/cotation.png" 
                  alt="Quotation mark"
                  className="h-16 w-auto opacity-80"
                />
              </div>
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight"
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.5)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                WHAT OUR <br /> CLIENTS SAY
              </h2>
             
            </div>
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "url('/images/pattern.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          </div>
           <div className="flex justify-center mb-8 space-x-6">
              <button className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
                &larr;
              </button>
              <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                &rarr;
              </button>
            </div>

          {/* Right Testimonial Card */}
          <div 
            ref={cardRef}
            className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-xl relative -mt-20 md:mt-20 md:-ml-20 z-10"
            style={{
              border: '2px solid #F40000',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
              
            }}
          >

           
            <div className="text-gray-600 text-lg leading-relaxed mb-8">
              "Working with this team was a game-changer for our brand. Their creative approach and technical expertise are unmatched. The attention to detail and commitment to excellence is evident in every project they deliver."
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-xl text-gray-900">Emily Rodriguez</h4>
              <p className="text-gray-500 text-sm mt-1">Founder, Creative Solutions</p>
            </div>
            
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;